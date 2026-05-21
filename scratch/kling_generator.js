import crypto from 'crypto';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Credentials provided by the user
const ACCESS_KEY = "AfyntKfmdFGMQdbBRBLFLapHdephGHJd";
const SECRET_KEY = "mYYg4fe8d4LkbbLQpRMmAKaKANfBLY9a";
const BASE_URL = "https://api-singapore.klingai.com";

// Base64Url Encoding helper
function base64UrlEncode(strOrBuffer) {
    const base64 = Buffer.isBuffer(strOrBuffer) 
        ? strOrBuffer.toString('base64') 
        : Buffer.from(strOrBuffer).toString('base64');
    return base64
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

// Generate JWT token for Kling AI API OpenAPI using HS256
function generateKlingToken(accessKey, secretKey) {
    const header = {
        alg: "HS256",
        typ: "JWT"
    };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iss: accessKey,
        exp: now + 1800, // Token valid for 30 minutes
        nbf: now - 5
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(signatureInput)
        .digest();
        
    const encodedSignature = base64UrlEncode(signature);
    
    return `${signatureInput}.${encodedSignature}`;
}

async function downloadFile(url, destPath) {
    console.log(`Downloading video from ${url} to ${destPath}...`);
    const writer = fs.createWriteStream(destPath);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function run() {
    console.log("====================================================");
    console.log("Kling AI Video Generation Client - 21 de Mayo");
    console.log("====================================================");

    // Original prompt & parameters from the user
    const userPayload = {
        "model": "kling-v2",
        "task_type": "image_to_video",
        "input": {
            "image": "https://tu-servidor-o-storage.com/image_5478a6.jpg",
            "prompt": "Image-to-video animation. From the starting image, the wooden chest on the floating raft in the foreground suddenly explodes violently. Massive bright orange fire, flying debris, and thick billowing black smoke erupt upward. Realistic water physics create waves that ripple outward and shake the Chilean schooner Covadonga in the background. Cinematic lighting, 8k resolution, highly detailed fire and smoke simulation."
        },
        "config": {
            "duration": 5,
            "aspect_ratio": "16:9",
            "fidelity": "high"
        }
    };

    // Swap placeholder image to the actual public URL of our diorama for successful execution
    let imageUrl = userPayload.input.image;
    if (imageUrl.includes("tu-servidor-o-storage.com")) {
        console.log("[Info] Swapping placeholder image URL with our public sovereign diorama image...");
        imageUrl = "https://www.vecinoslaserena.cl/combate_naval_iquique_diorama.png";
    }

    console.log(`Using Image URL: ${imageUrl}`);
    console.log(`Using Prompt: ${userPayload.input.prompt}`);

    // Map payload to official Kling Open API schema
    const officialPayload = {
        model_name: userPayload.model === "kling-v2" ? "kling-v2-6" : userPayload.model, // kling-v2-6 is highly recommended/supported
        image: imageUrl,
        prompt: userPayload.input.prompt,
        duration: String(userPayload.config.duration || 5),
        mode: userPayload.config.fidelity === "high" ? "pro" : "std"
    };

    console.log("\nGenerating JWT Authorization token...");
    const token = generateKlingToken(ACCESS_KEY, SECRET_KEY);
    console.log("Token successfully generated.");

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    console.log("\nSubmitting task to Kling AI API...");
    try {
        let createResponse;
        try {
            createResponse = await axios.post(`${BASE_URL}/v1/videos/image2video`, officialPayload, { headers });
        } catch (postErr) {
            if (postErr.response && postErr.response.data && postErr.response.data.code === 1102) {
                console.log("\n[Warning] Insufficient credits for high fidelity (pro). Retrying in standard fidelity (std) mode...");
                officialPayload.mode = "std";
                createResponse = await axios.post(`${BASE_URL}/v1/videos/image2video`, officialPayload, { headers });
            } else {
                throw postErr;
            }
        }
        
        console.log("Create API Response:", JSON.stringify(createResponse.data, null, 2));
        
        if (createResponse.data.code !== 0) {
            if (createResponse.data.code === 1102) {
                console.log("\n[Warning] Insufficient credits for high fidelity (pro). Retrying in standard fidelity (std) mode...");
                officialPayload.mode = "std";
                const retryResponse = await axios.post(`${BASE_URL}/v1/videos/image2video`, officialPayload, { headers });
                console.log("Retry API Response:", JSON.stringify(retryResponse.data, null, 2));
                if (retryResponse.data.code !== 0) {
                    console.error(`[Error] API rejected retry request: ${retryResponse.data.message}`);
                    return;
                }
                createResponse = retryResponse;
            } else {
                console.error(`[Error] API rejected request: ${createResponse.data.message}`);
                return;
            }
        }

        const taskId = createResponse.data.data.task_id;
        console.log(`\n[Success] Task submitted successfully! Task ID: ${taskId}`);
        console.log("Polling status every 15 seconds...");

        // Polling loop
        let attempts = 0;
        const maxAttempts = 60; // 15 mins max
        
        while (attempts < maxAttempts) {
            attempts++;
            await new Promise(r => setTimeout(r, 15000)); // Wait 15s
            
            console.log(`\nChecking status... (Attempt ${attempts}/${maxAttempts})`);
            const statusResponse = await axios.get(`${BASE_URL}/v1/videos/task/${taskId}`, { headers });
            
            const taskData = statusResponse.data.data;
            console.log(`Current Status: ${taskData.task_status}`);
            
            if (taskData.task_status === "succeed") {
                console.log("\n[Success] Video generation succeeded!");
                const videoUrl = taskData.task_result.video.url;
                console.log(`Video URL: ${videoUrl}`);

                // Define destination in artifacts folder
                const artifactsDir = path.join("c:", "Users", "estud", ".gemini", "antigravity", "artifacts");
                if (!fs.existsSync(artifactsDir)) {
                    fs.mkdirSync(artifactsDir, { recursive: true });
                }
                const destFile = path.join(artifactsDir, `iquique_diorama_${taskId}.mp4`);
                
                await downloadFile(videoUrl, destFile);
                console.log(`\n[Done] Video successfully downloaded to: ${destFile}`);
                break;
            } else if (taskData.task_status === "failed") {
                console.error(`\n[Failed] Video generation failed: ${statusResponse.data.message || 'unknown error'}`);
                break;
            }
        }

    } catch (err) {
        console.error("\n[Error] HTTP Request failed:");
        if (err.response) {
            console.error("Status Code:", err.response.status);
            console.error("Response Data:", JSON.stringify(err.response.data, null, 2));
        } else {
            console.error(err.message);
        }
    }
}

run();

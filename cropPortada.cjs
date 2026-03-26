const { Jimp } = require('jimp');

async function processPortada() {
    try {
        console.log("Cargando la nueva Portada Maravillosa...");
        // Path to the image the user uploaded containing the watermark
        let sourcePath = 'C:\\Users\\estud\\.gemini\\antigravity\\brain\\0f277490-578f-4396-ba6c-6865f79fc4bd\\media__1774483650966.jpg';
        
        let image = await Jimp.read(sourcePath);

        // Calculate safety crop to remove the diamond watermark at the bottom right.
        // It's usually about 5-10% of the image height. Let's cut 10% from the bottom.
        const w = image.bitmap.width;
        const targetH = Math.floor(image.bitmap.height * 0.90);

        console.log(`Original: ${w}x${image.bitmap.height}. Cropping bottom watermark. Nuevo alto: ${targetH}`);
        
        image.crop({ x: 0, y: 0, w: w, h: targetH });
        
        const outPath = `C:\\Users\\estud\\APP_LS_SEGURA\\public\\portada_vls_trivia.jpg`;
        await image.write(outPath);
        
        console.log(`¡Éxito! Nueva portada guardada limpia en ${outPath}`);
    } catch (e) {
        console.error("Hubo un error al procesar la portada:", e);
    }
}
processPortada();

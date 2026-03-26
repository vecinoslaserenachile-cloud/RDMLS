import { Jimp } from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processImages() {
    const assetsPath = path.join(__dirname, 'public', 'minijuegos', 'serenito-1945', 'assets');
    const files = ['player.png', 'enemy.png', 'ficha.png'];

    for (const file of files) {
        const fullPath = path.join(assetsPath, file);
        console.log(`Processing ${file}...`);
        
        try {
            const image = await Jimp.read(fullPath);
            const w = image.bitmap.width;
            const h = image.bitmap.height;

            const visited = new Uint8Array(w * h);
            const stack = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
            
            while (stack.length > 0) {
                const [x, y] = stack.pop();
                if (x < 0 || x >= w || y < 0 || y >= h) continue;
                
                const pos = y * w + x;
                if (visited[pos]) continue;
                visited[pos] = 1;

                const idx = pos * 4;
                const r = image.bitmap.data[idx];
                const g = image.bitmap.data[idx + 1];
                const b = image.bitmap.data[idx + 2];
                
                // If pixel is white or nearly white (background/grid)
                if (r > 240 && g > 240 && b > 240) {
                    image.bitmap.data[idx + 3] = 0; // Alpha 0
                    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
                }
            }

            await image.write(fullPath);
            console.log(`Done processing ${file}.`);
        } catch (e) {
            console.error(`Error processing ${file}:`, e);
        }
    }
}

processImages();

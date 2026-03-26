const Jimp = require('jimp');
const path = require('path');

async function processImages() {
    const assetsPath = path.join(__dirname, 'public', 'minijuegos', 'serenito-1945', 'assets');
    const files = ['player.png', 'enemy.png', 'ficha.png'];

    for (const file of files) {
        const fullPath = path.join(assetsPath, file);
        console.log(`Processing ${file}...`);
        
        const image = await Jimp.read(fullPath);
        const w = image.bitmap.width;
        const h = image.bitmap.height;

        // Flood fill from corners to avoid internal white parts
        const visited = new Set();
        const stack = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
        
        const targetColor = image.getPixelColor(0, 0); // Background white
        const { r: tr, g: tg, b: tb } = Jimp.intToRGBA(targetColor);

        while (stack.length > 0) {
            const [x, y] = stack.pop();
            const key = `${x},${y}`;
            if (x < 0 || x >= w || y < 0 || y >= h || visited.has(key)) continue;
            
            const color = image.getPixelColor(x, y);
            const { r, g, b, a } = Jimp.intToRGBA(color);
            
            // If color is white or nearly white (background)
            if (r > 240 && g > 240 && b > 240) {
                image.setPixelColor(Jimp.rgbaToInt(r, g, b, 0), x, y);
                visited.add(key);
                stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
            }
        }

        await image.writeAsync(fullPath);
        console.log(`Done processing ${file}.`);
    }
}

processImages().catch(err => {
    console.error(err);
    process.exit(1);
});

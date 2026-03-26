const { Jimp } = require('jimp');

async function processImage() {
    try {
        console.log("Cargando la mega-grilla de imágenes de Serenito...");
        let sourcePath = 'C:\\Users\\estud\\.gemini\\antigravity\\brain\\0f277490-578f-4396-ba6c-6865f79fc4bd\\media__1774482147919.jpg';
        
        let image;
        try {
            // jimp@1 uses await Jimp.read(...)
            image = await Jimp.read(sourcePath);
        } catch (e) {
            console.log("No se pudo cargar la mega-grilla. Verifica la ruta.");
            throw e;
        }

        const cols = 5;
        const rows = 10;
        
        const w = Math.floor(image.bitmap.width / cols);
        const h = Math.floor(image.bitmap.height / rows);

        console.log(`Tamaño total original: ${image.bitmap.width}x${image.bitmap.height}.`);
        console.log(`Tamaño recortado calculado por imagen (16:9 estimado): ${w}x${h} px`);

        let count = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const tile = image.clone();
                const x = c * w;
                const y = r * h;
                
                tile.crop({ x, y, w, h });
                
                const outPath = `C:\\Users\\estud\\APP_LS_SEGURA\\public\\img_trivia\\stage_${r + 1}_q${c + 1}.jpg`;
                
                await tile.write(outPath);
                count++;
                
                // Keep the Faro image we sent earlier for stage 1 q 4? 
                // We'll let this overwrite so there is a consistent aesthetic, or just overwrite everything.
            }
        }
        console.log(`¡Éxito! Se han extraido y guardado ${count} imágenes en public/img_trivia/`);
    } catch (e) {
        console.error("Hubo un error al recortar:", e);
    }
}
processImage();

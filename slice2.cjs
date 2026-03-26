const { Jimp } = require('jimp');

async function splitAndMerge() {
    try {
        console.log("Cargando la mega-grilla de Serenito Bisabuelo...");
        const sourcePathAlt = 'C:\\Users\\estud\\.gemini\\antigravity\\brain\\0f277490-578f-4396-ba6c-6865f79fc4bd\\media__1774482788022.jpg';
        
        let altImage = await Jimp.read(sourcePathAlt);

        const cols = 5;
        const rows = 10;
        
        const wAlt = Math.floor(altImage.bitmap.width / cols);
        const hAlt = Math.floor(altImage.bitmap.height / rows);

        console.log(`Tamaño Bisabuelo: ${altImage.bitmap.width}x${altImage.bitmap.height}. Tile: ${wAlt}x${hAlt} px`);

        let count = 0;
        let skipped = 0;
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const flatIndex = r * cols + c;
                
                // stage_1_q4 is custom Faro, skip!
                if (r === 0 && c === 3) {
                    console.log(`Saltando Stage ${r+1} Q${c+1} (Faro Monumental protegido)`);
                    skipped++;
                    continue; 
                }

                // Alternar: si el índice es impar (Bisabuelo), reemplazamos la imagen existente
                if (flatIndex % 2 !== 0) {
                    const tile = altImage.clone();
                    const x = c * wAlt;
                    const y = r * hAlt;
                    
                    tile.crop({ x, y, w: wAlt, h: hAlt });
                    
                    const outPath = `C:\\Users\\estud\\APP_LS_SEGURA\\public\\img_trivia\\stage_${r + 1}_q${c + 1}.jpg`;
                    await tile.write(outPath);
                    count++;
                }
            }
        }
        console.log(`¡Éxito! Se han entrelazado ${count} imágenes del Bisabuelo en la ruta pública (saltando ${skipped} protegidas).`);
    } catch (e) {
        console.error("Hubo un error:", e);
    }
}
splitAndMerge();

import * as jimpPkg from 'jimp';
import fs from 'fs';
import path from 'path';

// Tratar de acceder al object principal según la versión de Jimp
const Jimp = jimpPkg.default || jimpPkg.Jimp || jimpPkg;

const dir = './public/agua';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') && f.toLowerCase().includes('miguel'));

async function processImages() {
  for (const file of files) {
    console.log('Procesando', file);
    try {
      const imgPath = path.join(dir, file);
      const img = await Jimp.read(imgPath);
      
      // 1. Redimensionar a max 800px para web (12MB a ~100kb)
      if (img.getWidth() > 800) {
        img.resize(800, Jimp.AUTO);
      }
      
      const w = img.getWidth();
      const h = img.getHeight();
      
      // 2. Eliminar la marca de agua (diamante inferior derecho de IA)
      const cropHeight = Math.floor(h * 0.08); 
      
      img.crop(0, 0, w, h - cropHeight);
      
      // 3. Guardar como JPG optimizado
      img.quality(80);
      const outPath = imgPath.replace('.png', '.jpg');
      await img.writeAsync(outPath);
      
      // 4. Borrar el PNG gigante original de public
      fs.unlinkSync(imgPath);
      console.log('Guardado y optimizado:', outPath);
    } catch (e) {
      console.error('Error con', file, e);
    }
  }
}

processImages();

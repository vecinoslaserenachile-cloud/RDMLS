const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Installing ffmpeg-static...');
  execSync('npm install ffmpeg-static', { stdio: 'inherit' });

  const ffmpeg = require('ffmpeg-static');
  
  const inputFile = path.resolve('C:/Users/estud/PRENDES_MASTER/ASSETS MARRUECOS/Marruecos_y_Chile_entre_versos_y_megaproyectos.mp3');
  const outputFile = path.resolve('dist_prendes/podcast-marruecos.mp3');

  console.log(`Bitiando archivo...`);
  console.log(`Input: ${inputFile}`);
  console.log(`Output: ${outputFile}`);

  // We use -b:a 128k to target ~128kbps which is perfect for podcasts and reduces size significantly.
  // -y overwrites if exists.
  execSync(`"${ffmpeg}" -y -i "${inputFile}" -b:a 128k "${outputFile}"`, { stdio: 'inherit' });

  console.log('Compresión de audio terminada de manera exitosa.');
} catch (error) {
  console.error('Error durante la compresión:', error.message);
}

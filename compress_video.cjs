const { execSync } = require('child_process');
const path = require('path');

try {
  const ffmpeg = require('ffmpeg-static');
  
  const inputFile = path.resolve('C:/Users/estud/PRENDES_MASTER/ASSETS ALTA CORDILLERA/Video_AltaCordillera.mp4');
  const outputFile = path.resolve('dist_prendes/video-altacordillera.mp4');

  console.log(`Comprimiendo video Alta Cordillera...`);
  console.log(`Input: ${inputFile}`);
  console.log(`Output: ${outputFile}`);

  // We compress it highly to fit within 25MB constraint of Cloudflare Pages.
  // Resizing to 720p maximum, reducing CRF to 28 (higher compression), and capping audio bitrate.
  const cmd = `"${ffmpeg}" -y -i "${inputFile}" -vf "scale=-2:720" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k "${outputFile}"`;
  execSync(cmd, { stdio: 'inherit' });

  console.log('Compresión de video terminada existosamente.');
} catch (error) {
  console.error('Error durante la compresión del video:', error.message);
}

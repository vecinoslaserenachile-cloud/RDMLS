const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

try {
  const ffmpeg = require('ffmpeg-static');
  
  const inputFile = path.resolve('public/UCEN/ucen_clip_congreso_42.mp4');
  const outputFile = path.resolve('public/UCEN/ucen_clip_congreso_42_compressed.mp4');

  if (!fs.existsSync(inputFile)) {
      console.error('Input file not found:', inputFile);
      process.exit(1);
  }

  console.log(`Comprimiendo video UCEN...`);
  console.log(`Input: ${inputFile}`);
  console.log(`Output: ${outputFile}`);

  // We compress it highly to fit within 25MB constraint of Cloudflare Pages.
  // 480p, CRF 30, preset fast.
  const cmd = `"${ffmpeg}" -y -i "${inputFile}" -vf "scale=-2:480" -c:v libx264 -crf 30 -preset fast -an "${outputFile}"`;
  execSync(cmd, { stdio: 'inherit' });

  // Move back to main name
  fs.renameSync(outputFile, inputFile);

  console.log('Compresion de video UCEN terminada exitosamente.');
} catch (error) {
  console.error('Error durante la compresion del video:', error.message);
}

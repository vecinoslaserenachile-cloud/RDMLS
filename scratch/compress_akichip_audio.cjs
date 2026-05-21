const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

try {
  console.log('Detecting ffmpeg...');
  let ffmpegPath = '';
  
  // Try local ffmpeg-static first
  try {
    const ffmpegStatic = require('ffmpeg-static');
    if (ffmpegStatic) {
      ffmpegPath = ffmpegStatic;
      console.log('Using ffmpeg-static:', ffmpegPath);
    }
  } catch (e) {
    console.log('ffmpeg-static not found in node_modules, checking global system ffmpeg...');
  }
  
  if (!ffmpegPath) {
    try {
      execSync('ffmpeg -version', { stdio: 'ignore' });
      ffmpegPath = 'ffmpeg';
      console.log('Using global system ffmpeg');
    } catch (e) {
      console.log('Global ffmpeg not found. Installing ffmpeg-static locally...');
      execSync('npm install ffmpeg-static', { stdio: 'inherit' });
      ffmpegPath = require('ffmpeg-static');
      console.log('Installed and using ffmpeg-static:', ffmpegPath);
    }
  }

  const inputFile = path.resolve('public/media/akichip/Akichip_y_el_templo_del_hincha_granate.m4a');
  const tempFile = path.resolve('public/media/akichip/Akichip_y_el_templo_del_hincha_granate_temp.m4a');

  if (!fs.existsSync(inputFile)) {
    console.error('Input file not found at:', inputFile);
    process.exit(1);
  }

  console.log(`Starting compression...`);
  console.log(`Input: ${inputFile} (${(fs.statSync(inputFile).size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`Temp Output: ${tempFile}`);

  // Convert to 32k mono m4a which is perfect for speech and keeps the file size around 16MB
  execSync(`"${ffmpegPath}" -y -i "${inputFile}" -ac 1 -b:a 32k "${tempFile}"`, { stdio: 'inherit' });

  // Overwrite original with the compressed temp file
  if (fs.existsSync(tempFile)) {
    const tempSize = fs.statSync(tempFile).size;
    console.log(`Compression successful! Temp size: ${(tempSize / (1024 * 1024)).toFixed(2)} MB`);
    
    if (tempSize < 25 * 1024 * 1024) {
      fs.unlinkSync(inputFile);
      fs.renameSync(tempFile, inputFile);
      console.log('Successfully replaced oversized audio file with compressed version under 25MB!');
    } else {
      console.error('Compressed file is still larger than 25MB! Retrying with 24k bitrate...');
      execSync(`"${ffmpegPath}" -y -i "${tempFile}" -ac 1 -b:a 24k "${tempFile}_24.m4a"`, { stdio: 'inherit' });
      if (fs.existsSync(`${tempFile}_24.m4a`)) {
        fs.unlinkSync(inputFile);
        fs.unlinkSync(tempFile);
        fs.renameSync(`${tempFile}_24.m4a`, inputFile);
        console.log('Successfully replaced audio with ultra-compressed 24kbps version!');
      }
    }
  } else {
    console.error('Temp compressed file was not generated!');
  }

} catch (error) {
  console.error('Error during compression:', error.message);
  process.exit(1);
}

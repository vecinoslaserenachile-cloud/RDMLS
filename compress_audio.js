import ffmpeg from 'ffmpeg-static';
import { execSync } from 'child_process';
try {
  execSync(`"${ffmpeg}" -y -i public/archi/podcast.m4a -b:a 64k public/archi/podcast_compressed.m4a`, {stdio: 'inherit'});
} catch (e) {
  console.error(e);
}

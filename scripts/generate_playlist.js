import fs from 'fs';
import path from 'path';
import { parseFile } from 'music-metadata';

const publicDir = './public';
const audioFiles = [
    '/patrimonio/radioPlazaPoetasVLS/Entre Maestros.mp3',
    '/patrimonio/radioPlazaPoetasVLS/Guitarra de versos.mp3',
    '/patrimonio/radioPlazaPoetasVLS/Lo nuestro es pasar.mp3',
    '/patrimonio/radioPlazaPoetasVLS/Nunca buscamos a Gloria.mp3',
    '/patrimonio/radioPlazaPoetasVLS/Poetas del Rock.mp3',
    '/patrimonio/radioPlazaPoetasVLS/todo queda en La Serena.mp3',
    '/peregrino/peregrinos_tema.mp3',
    '/stella/Stella_Colorina.mp3',
    '/stella/Poeta_de_Fuego_1.mp3',
    '/tano_assets/audio/cancion_cortesia.mp3',
    '/tano_assets/audio/cancion_familia.mp3',
    '/UCEN/mp3s Radio propia encuentro ASFAE42 UCEN La Serena/Congreso ASFAE 42.mp3',
];

async function generatePlaylist() {
    let totalDuration = 0;
    const tracks = [];

    for (const relPath of audioFiles) {
        const fullPath = path.join(publicDir, relPath);
        if (fs.existsSync(fullPath)) {
            try {
                const metadata = await parseFile(fullPath);
                // Exact duration in seconds
                const duration = Math.floor(metadata.format.duration);
                
                const title = metadata.common.title || path.basename(relPath, '.mp3').replace(/_/g, ' ');

                tracks.push({
                    url: relPath,
                    duration: duration,
                    title: title
                });
                totalDuration += duration;
                console.log(`[OK] ${title} - ${duration}s`);
            } catch (err) {
                console.error(`Error parsing ${fullPath}:`, err);
            }
        } else {
            console.warn('[MISSING] File not found:', fullPath);
        }
    }

    const playlist = {
        totalDuration,
        tracks
    };

    fs.writeFileSync(path.join(publicDir, 'radio_playlist.json'), JSON.stringify(playlist, null, 2));
    console.log('Playlist generada exitosamente:', path.join(publicDir, 'radio_playlist.json'));
    console.log('Total duration:', totalDuration, 'seconds');
}

generatePlaylist();

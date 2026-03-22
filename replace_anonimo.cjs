const fs = require('fs');
const path = require('path');

const directory = './src';
const searchPhrase = /Un vecino anónimo|UN VECINO ANÓNIMO/gi;
const replacePhrase = 'vecinoslaserena.cl';
// Case specific rules for uppercase:
const searchPhraseUpper = /UN VECINO ANÓNIMO/g;
const replacePhraseUpper = 'VECINOSLASERENA.CL';
const searchPhraseNormal = /Un Vecino Anónimo|Un vecino anónimo/g;
const replacePhraseNormal = 'vecinoslaserena.cl';

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.match(searchPhrase)) {
                content = content.replace(searchPhraseUpper, replacePhraseUpper);
                content = content.replace(searchPhraseNormal, replacePhraseNormal);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated:', fullPath);
            }
        }
    });
}
walk(directory);

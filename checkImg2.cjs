const fs = require('fs');
const tsContent = fs.readFileSync('src/constants_game_v2.ts', 'utf8');

const tsToJs = tsContent.replace(/export\s+interface[\s\S]+?}/g, '')
                        .replace(/export\s+const\s+STAGES[\s\S]*?=\s*\[/, 'module.exports = [');
fs.writeFileSync('temp_stages.cjs', tsToJs);
const STAGES = require('./temp_stages.cjs');

const missing = [];
STAGES.forEach(stage => {
   stage.questions.forEach(q => {
        let imgPath = q.image;
        if (!imgPath) {
            imgPath = `/img_trivia/stage_${stage.id}_q${q.id}.jpg`;
        }
        
        // Let's check if there is an imageSeed or image override
        // wait, I also need to see if public/imgPath exists.
        if (!fs.existsSync('public' + imgPath)) {
            missing.push({ stageId: stage.id, qId: q.id, path: imgPath });
        }
   });
});

console.log("IMPLICIT AND EXPLICIT MISSING IMAGES:", missing);

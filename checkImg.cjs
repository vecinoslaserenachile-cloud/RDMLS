const fs = require('fs');

const content = fs.readFileSync('src/constants_game_v2.ts', 'utf8');

// Extract stages array
// Instead of messy regex, let's just use naive parsing or evaluate it if we can.
// Let's just regex all `{ id: NUMBER, text: "...", ... }` 
const questionRegex = /id:\s*(\d+),\s*text:\s*['"]([^'"]+)['"][\s\S]*?(?:image:\s*['"]([^'"]+)['"])?/g;

let qMatch;
const missingImages = [];

let currentStage = 1;
let qCount = 0;

while ((qMatch = questionRegex.exec(content)) !== null) {
  const qId = qMatch[1];
  const qText = qMatch[2];
  let imgPath = qMatch[3];
  
  if (!imgPath) {
    // If we can't find explicitly, let's fallback to stage_X_qY... wait, we need to know the stage!
    // VlsTrivia defaults to /img_trivia/stage_${stage}_q${qId}.jpg
    // Let's just track stage manually. (There are usually 5 questions per stage except stage 1 has 14)
    if (qId == 1) currentStage = 1;
    if (qId == 15) currentStage = 2;
    if (qId == 20) currentStage = 3;
    if (qId == 25) currentStage = 4;
    // Actually, in the real game it uses `currentStage.id` and `currentQuestion.id`.
  }
}

// Better yet, write a script that compiles the TS and just logs all questions.
// I will just use regex to find EVERY 'image: "/..."' line and check its existence.
const imageRegex = /image:\s*['"]([^'"]+)['"]/g;
let match;
while ((match = imageRegex.exec(content)) !== null) {
    const imgPath = match[1];
    if (!fs.existsSync('public' + imgPath)) {
        missingImages.push(imgPath);
    }
}
console.log("Explicit missing images:", missingImages);

// And checking where image is NOT defined!
// In VLSTriviaMain.tsx: setQuestionImage(`/img_trivia/stage_${currentStageId}_q${currentQuestion.id}.jpg`);
// Let's check which ones of these are missing!

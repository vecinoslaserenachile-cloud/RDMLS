import fs from 'fs';
const path = 'c:\\Users\\estud\\APP_LS_SEGURA\\src\\pages\\HubDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// Use a more robust regex to find the end of the categories block
const searchStr = /\{categories\.map\(pillar => \([\s\S]*?\}\)\)\s*\}[\s\n]*<\/div>[\s\n]*<\/div>/;
// Wait! I'll check my view_file output again.
// 1261: '))} ' (37 spaces)
// 1262: '</div>' (32 spaces)
// 1263: ')}' (in the parser's view? step 913 says line 1263 is '</div>')

// I'll just find BOTH patterns and replace with the correct one.
content = content.replace(/(\s*\}\)\)\s*\}\s*<\/div>)(\s*<\/div>)?(\s*\)\})?(\s*<\/div>)?/, "$1\n                            </div>\n                        )}\n                    </div>");

fs.writeFileSync(path, content);
console.log("Applied?");

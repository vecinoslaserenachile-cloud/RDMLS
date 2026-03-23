import fs from 'fs';
import path from 'path';

const files = [
    'src/pages/HomeLiviano.jsx',
    'src/pages/HubDashboard.jsx',
    'src/components/VLSGameMain.jsx',
    'src/pages/LitePortal.jsx',
    'src/pages/SeniorGames.jsx',
    'src/pages/VLSChallenges.jsx'
];

files.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('Trophy') && !content.includes('import {') && !content.includes('import { Trophy')) {
        console.log(`Fixing ${file}`);
        // Simple heuristic to add Trophy to lucide-react import
        content = content.replace(/import \{([^}]+)\} from 'lucide-react'/, (match, group) => {
            if (!group.includes('Trophy')) {
                return `import { ${group.trim()}, Trophy } from 'lucide-react'`;
            }
            return match;
        });
        fs.writeFileSync(fullPath, content);
    }
});

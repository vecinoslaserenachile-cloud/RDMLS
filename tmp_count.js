import fs from 'fs';
const path = 'c:\\Users\\estud\\APP_LS_SEGURA\\src\\pages\\HubDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const divOpenCount = (content.match(/<div/g) || []).length;
const divCloseCount = (content.match(/<\/div>/g) || []).length;
console.log(`Divs: Open=${divOpenCount}, Close=${divCloseCount}`);

const headerOpenCount = (content.match(/<header/g) || []).length;
const headerCloseCount = (content.match(/<\/header>/g) || []).length;
console.log(`Headers: Open=${headerOpenCount}, Close=${headerCloseCount}`);

const sectionOpenCount = (content.match(/<section/g) || []).length;
const sectionCloseCount = (content.match(/<\/section>/g) || []).length;
console.log(`Sections: Open=${sectionOpenCount}, Close=${sectionCloseCount}`);

const footerOpenCount = (content.match(/<footer/g) || []).length;
const footerCloseCount = (content.match(/<\/footer>/g) || []).length;
console.log(`Footers: Open=${footerOpenCount}, Close=${footerCloseCount}`);

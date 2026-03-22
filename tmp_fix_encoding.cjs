const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'HubDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// BLOQUE CHINO CORRECTO
const correctZh = `    zh: {
        title: "La Serena 智慧城市 2026", subtitle: "世界级市政创新",
        citizensTitle: "智慧市民 (Smart Citizens)", citizensSub: "市民服务、报告和数字广播",
        adminTitle: "智慧行政 (Smart Administration)", adminSub: "内部管理、人力资源和电子学习",
        eventsTitle: "拉塞雷纳全景 (La Serena Panoramas)", eventsSub: "官方市政活动日程",
        listeningTitle: "智慧聆听 (Smart Listening)", listeningSub: "智能分析与社会倾听",
        paseo3dTitle: "3D 历史漫步", paseo3dSub: "沉浸式城市导览",
        busdeltiempoTitle: "3D 时空巴士", busdeltiempoSub: "互动历史 3D 之旅",
        gameTitle: "复古街机厅", gameSub: "90年代经典游戏：吃豆人、俄罗斯方块、小行星等",
        qrText: "移动二维码",
        distancesTitle: "距离地图", distancesSub: "区域旅游路线",
        projectTitle: "关于项目", projectSub: "智能社区 2026",
        councilTitle: "市议会", councilSub: "权力透明度",
        cdlsTitle: "La Serena 体育俱乐部", cdlsSub: "石榴红的激情与福利",
        musicTitle: "AI 音乐工作室", musicSub: "歌词和和弦创作",
        retroTitle: "Radio VLS 电视", retroSub: "80 年代转播与 C5 摄像头",
        vhsTitle: "90年代 VHS 录像机", vhsSub: "怀旧视频目录",
        memoryTitle: "回忆时刻", memorySub: "上传照片、视频和杂志封面",
        sentinelTitle: "Sentinel AI 搜索", sentinelSub: "智能搜索 La Serena",
        welcomePortales: "欢迎来到拉塞雷纳统一门户网站。请在下面探索所有市民工具。"
    },`;

// REEMPLAZAR BLOQUE ZH (desde line 170 aprox)
// Buscamos el bloque ZH roto
const zhStartIdx = content.indexOf('zh: {');
const zhEndIdx = content.indexOf('},', zhStartIdx) + 2;

if (zhStartIdx !== -1 && zhEndIdx !== -1) {
    const brokenZh = content.substring(zhStartIdx, zhEndIdx);
    content = content.replace(brokenZh, correctZh);
    console.log('✅ Bloque ZH corregido.');
} else {
    console.log('❌ No se encontró el bloque ZH.');
}

// CORREGIR OTROS CARACTERES (usando lógica similar a fix_chars.cjs)
const mapping = {
    'Ã³': 'ó',
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ã': 'í',
    'Ãº': 'ú',
    'Ã±': 'ñ',
    'Â¿': '¿'
};

for (const [key, value] of Object.entries(mapping)) {
    content = content.split(key).join(value);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Caracteres de HubDashboard.jsx normalizados.');

const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        page.on('console', msg => {
            console.log('BROWSER LOG:', msg.text());
        });
        
        page.on('pageerror', err => {
            console.log('BROWSER PAGE ERROR:', err.toString());
        });

        console.log('Navegando a http://localhost:4173/ ...');
        await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2', timeout: 15000 });
        
        console.log('Espera adicional para react render...');
        await new Promise(r => setTimeout(r, 2000));
        
        await page.screenshot({ path: 'desk_screenshot.png' });
        console.log('Captura de pantalla guardada en desk_screenshot.png');
        
        const content = await page.content();
        if (content.includes("MANTENIMIENTO")) {
            console.log("¡DETECTADO PANTALLA DE MANTENIMIENTO!");
        } else {
            console.log("No se detectó pantalla de mantenimiento.");
        }

        await browser.close();
        console.log('Fin de test.');
    } catch (e) {
        console.log('TEST SCRIPT ERROR:', e);
    }
})();

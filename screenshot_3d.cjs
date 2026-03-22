const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Iniciando Puppeteer...');
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader'] // Swiftshader to force WebGL in headless
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navegando al Hub...');
  try {
      await page.goto('http://localhost:5173/hub', { 
        waitUntil: 'networkidle2', 
        timeout: 45000 
      });
      
      console.log('Buscando botón Paseo 3D...');
      // Click en Paseo Histórico 3D
      const buttons = await page.$$('.glass-panel');
      for (const btn of buttons) {
          const text = await page.evaluate(el => el.textContent, btn);
          if (text.includes('Paseo Histórico 3D') || text.includes('3D Historic Walk')) {
              await btn.click();
              break;
          }
      }

      console.log('Esperando carga del motor WebGL/Three.js...');
      await new Promise(r => setTimeout(r, 8000)); // WebGL e assets pesados
      
      const artifactDir = 'C:\\Users\\estud\\.gemini\\antigravity\\brain\\567f4b42-e550-402c-8c7a-305ce8392457';
      const screenshotPath = path.join(artifactDir, `paseo_historico_3d.png`);
      
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`Screenshot del motor 3D guardado: ${screenshotPath}`);

  } catch(e) {
      console.error(e);
  } finally {
      await browser.close();
  }
})();

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Iniciando Puppeteer...');
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navegando a VLS Motors (Local)...');
  try {
      await page.goto('http://localhost:5173/motors', { 
        waitUntil: 'networkidle0', 
        timeout: 45000 
      });
      // Esperar animaciones
      await new Promise(r => setTimeout(r, 2000));
      
      const artifactDir = 'C:\\Users\\estud\\.gemini\\antigravity\\brain\\567f4b42-e550-402c-8c7a-305ce8392457';
      const screenshot1Path = path.join(artifactDir, `vls_motors_nuevos.png`);
      
      // Capturar pestaña "Nuevos"
      await page.screenshot({ path: screenshot1Path, fullPage: false });
      console.log(`Screenshot 1 guardado: ${screenshot1Path}`);

      // Hacer click en la pestaña "Compraventa Usados"
      // Selector simplificado basado en el texto del botón
      const buttons = await page.$$('button');
      for (const btn of buttons) {
          const text = await page.evaluate(el => el.textContent, btn);
          if (text.includes('Compraventa Usados')) {
              await btn.click();
              break;
          }
      }

      // Esperar fade de Framer Motion
      await new Promise(r => setTimeout(r, 1000));
      const screenshot2Path = path.join(artifactDir, `vls_motors_usados.png`);
      await page.screenshot({ path: screenshot2Path, fullPage: false });
      console.log(`Screenshot 2 guardado: ${screenshot2Path}`);

  } catch(e) {
      console.error(e);
  } finally {
      await browser.close();
  }
})();

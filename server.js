import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  app.use(express.json());

  // GEMINI SETUP
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
      console.warn('WARNING: GEMINI_API_KEY not found in .env. AI modules will be simulated.');
  }

  // Endpoint de Moderación y Análisis
  app.post('/api/moderate', async (req, res) => {
    try {
      const { text } = req.body;
      if (!apiKey) {
          return res.json({ isToxic: false, sentiment: 'neutro', topic: 'simulacion' });
      }

      const prompt = `Analiza el comentario del vecino de La Serena: "${text}". 
      Determina toxicidad (isToxic), sentimiento (alegría, enojo, preocupación, neutro) y tema principal (tráfico, seguridad, avisos, etc.).
      IMPORTANTE: Devuelve un objeto JSON válido con las llaves isToxic (boolean), sentiment (string) y topic (string).`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           contents: [{ role: 'user', parts: [{ text: prompt }] }],
           generationConfig: { responseMimeType: 'application/json' }
        })
      });
      
      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      res.json(JSON.parse(responseText || '{"isToxic": false, "sentiment": "neutro", "topic": "desconocido"}'));
    } catch (error) {
      console.error('Gemini Error:', error);
      res.status(500).json({ error: 'AI Processing failed', details: error.message });
    }
  });

  // Chatbot "Farito"
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!apiKey) {
          return res.json({ response: "Hola, soy Farito (Modo Simulación). Por favor configura mi API KEY para ayudarte mejor." });
      }

      const systemInstruction = "Eres 'Farito', el asistente inteligente de vecinoslaserena.cl y farito.cl. Tu rol es ser un enrutador inteligente. Si el usuario reporta un problema, sugiere los canales oficiales de la plataforma (Radar Vecinal, Reportes). Mantén un tono servicial, rápido y muy local de La Serena, Chile.";
      let contents = [];
      if (history && Array.isArray(history)) {
          contents = history.map(h => ({
              role: h.role, // 'user' or 'model'
              parts: [{ text: h.parts?.[0]?.text || '' }]
          }));
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: contents
        })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No pude generar respuesta.";
      res.json({ response: reply });
    } catch (error) {
      console.error('Chat Error:', error);
      res.status(500).json({ error: 'Chat failed' });
    }
  });

  // VITE MIDDLEWARE
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.use(async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  const PORT = process.env.PORT || 5173;
  app.listen(PORT, () => {
    console.log(`\x1b[36m%s\x1b[0m`, `🚀 COMUNASMART FULL-STACK SERVER RUNNING`);
    console.log(`\x1b[32m%s\x1b[0m`, `🔗 Local: http://localhost:${PORT}`);
    console.log(`\x1b[35m%s\x1b[0m`, `✨ Vite Middleware Active`);
  });
}

createServer().catch(err => {
    console.error('Failed to start server:', err);
});

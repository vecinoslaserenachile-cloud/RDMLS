import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, SchemaType } from '@google/genai';
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
  const ai = new GoogleGenAI(apiKey);
  const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' }); // flash-preview might be restricted or named differently in stable SDK

  // Endpoint de Moderación y Análisis
  app.post('/api/moderate', async (req, res) => {
    try {
      const { text } = req.body;
      if (!apiKey) {
          return res.json({ isToxic: false, sentiment: 'neutro', topic: 'simulacion' });
      }

      const prompt = `Analiza el comentario del vecino de La Serena: "${text}". 
      Determina toxicidad (isToxic), sentimiento (alegría, enojo, preocupación, neutro) y tema principal (tráfico, seguridad, avisos, etc.).
      IMPORTANTE: Devuelve un objeto JSON válido.`;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
              isToxic: { type: SchemaType.BOOLEAN },
              sentiment: { type: SchemaType.STRING },
              topic: { type: SchemaType.STRING }
            },
            required: ['isToxic', 'sentiment', 'topic']
          }
        }
      });

      const responseText = result.response.text();
      res.json(JSON.parse(responseText));
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

      const chat = model.startChat({
        history: history || [],
        systemInstruction: "Eres 'Farito', el asistente inteligente de vecinoslaserena.cl y farito.cl. Tu rol es ser un enrutador inteligente. Si el usuario reporta un problema, sugiere los canales oficiales de la plataforma (Radar Vecinal, Reportes). Mantén un tono servicial, rápido y muy local de La Serena, Chile."
      });

      const result = await chat.sendMessage(message);
      res.json({ response: result.response.text() });
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

  app.use('*', async (req, res, next) => {
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

import express from 'express';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  app.use(cors());
  app.use(express.json());

  // 🤖 CONFIGURACIÓN GEMINI IA
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", // Usamos 1.5-flash para alto rendimiento y estabilidad institucional
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  // 📡 SOCKET.IO: MOTOR DE COMUNICACIÓN EN TIEMPO REAL
  io.on('connection', (socket) => {
    console.log(`[VLS-NODE] Vecino conectado: ${socket.id}`);
    
    socket.on('message', (msg) => {
      // Re-transmitir comentario a todos los vecinos en la Plaza
      io.emit('message', {
        ...msg,
        timestamp: new Date().toISOString()
      });
    });

    socket.on('disconnect', () => {
      console.log(`[VLS-NODE] Vecino desconectado: ${socket.id}`);
    });
  });

  // 🛡️ API MODERACIÓN IA (PLAZA VECINAL)
  app.post('/api/moderate', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: 'Falta el texto a moderar' });

      if (!apiKey) {
        return res.json({ isToxic: false, sentiment: 'neutro', topic: 'simulación' });
      }

      const prompt = `Actúa como moderador experto de la plataforma "vecinoslaserena.cl". 
      Analiza el siguiente comentario de un vecino: "${text}".
      Determina si es tóxico, el sentimiento predominante y el tema tratado.
      Devuelve ÚNICAMENTE el JSON con el siguiente esquema:
      {
        "isToxic": boolean,
        "sentiment": "alegría" | "enojo" | "preocupación" | "neutro",
        "topic": string
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error('[GEMINI-MOD] Error:', error);
      res.status(500).json({ error: 'Fallo en el análisis de IA', details: error.message });
    }
  });

  // 🤖 API ASISTENTE "FARITO" (ENRUTADOR INTELIGENTE)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) return res.status(400).json({ error: 'Mensaje vacío' });

      const chatModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Eres 'Farito', el faro inteligente y guía de la ciudad de La Serena, Chile. Tu misión es ayudar y orientar a los vecinos. Si alguien tiene un problema, sugiéreles usar los módulos de 'Seguridad' o 'Reportes' de la plataforma. Sé amable, rápido y usa modismos ligeros de la región de Coquimbo."
      });

      const chat = chatModel.startChat({
        history: history || [],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      res.json({ response: response.text() });
    } catch (error: any) {
      console.error('[FARITO-IA] Error:', error);
      res.status(500).json({ error: 'Farito está fuera de línea momentáneamente' });
    }
  });

  // 📦 INTEGRACIÓN VITE (Middlewares)
  let vite: ViteDevServer;
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      root: rootDir
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(rootDir, 'dist')));
  }

  // 📄 RENDER PRINCIPAL (SPA)
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template: string;
      if (process.env.NODE_ENV !== 'production') {
        template = fs.readFileSync(path.resolve(rootDir, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(rootDir, 'dist/index.html'), 'utf-8');
      }
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  const PORT = process.env.PORT || 3001;
  httpServer.listen(PORT, () => {
    console.clear();
    console.log(`\x1b[36m%s\x1b[0m`, `🏙️  VLS SMART CITY ECOSYSTEM v2.0 - ONLINE`);
    console.log(`\x1b[33m%s\x1b[0m`, `------------------------------------------`);
    console.log(`\x1b[32m%s\x1b[0m`, `🚀 API & GATEWAY: http://localhost:${PORT}`);
    console.log(`\x1b[35m%s\x1b[0m`, `📡 REAL-TIME: Socket.io Active`);
    console.log(`\x1b[34m%s\x1b[0m`, `🤖 IA ENGINE: Gemini 1.5 Flash Connected`);
    console.log(`\x1b[33m%s\x1b[0m`, `------------------------------------------`);
  });
}

startServer().catch(err => {
  console.error('[SYSTEM-CRITICAL] Failed to start server:', err);
});

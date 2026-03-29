# 🏙️ VLS Smart City Ecosystem

Plataforma unificada para la gestión comunal de La Serena, Chile. Este repositorio contiene el portal institucional "Absolute Presence" y la red de servicios "Smart Citizens".

## 🚀 Inicio Rápido

### Requisitos
- **Node.js**: v18+ 
- **Firebase CLI** (para funciones)
- **Wrangler** (Cloudflare Workers/D1)

### Instalación
```bash
npm install
```

### Configuración
1. Copia el archivo de ejemplo: `cp .env.example .env`
2. Configura tu `VITE_GEMINI_API_KEY` para las funciones de IA.

### Ejecución Local
```bash
# Frontend (React + Vite)
npm run dev

# Backend (Express)
npm run start:server
```

## 🏗️ Arquitectura
- **Frontend**: React 18, Framer Motion, D3.js (Visualización de datos).
- **Backend (Serverless)**: Cloudflare Workers, Express.js middleware.
- **Base de Datos**: Cloudflare D1 (SQL), Firestore (CRM).
- **IA**: Gemini 3 Flash (Moderación, Chatbot Farito).

## 🛠️ DevOps & CI/CD
- **GitHub Actions**: Pipeline automatizado en `.github/workflows/ci-cd.yml` para validación de código.
- **GitHub Sync**: Conectado con `vecinoslaserenachile-cloud`.

## 📜 Licencia
Uso exclusivo y restringido para Vecinos La Serena (Chile).

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(id) {
          // Aislar React core para evitar TDZ en inicialización de contextos
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          if (id.includes('node_modules/firebase')) {
            return 'vendor-firebase';
          }
          if (id.includes('node_modules/@react-three') || id.includes('node_modules/three')) {
            return 'vendor-3d';
          }
          // Aislar el contexto de idioma en su propio chunk para evitar colisiones de minificacion
          if (id.includes('src/context/LanguageContext')) {
            return 'context-language';
          }
        }
      }
    },
    chunkSizeWarningLimit: 2000,
  }
})


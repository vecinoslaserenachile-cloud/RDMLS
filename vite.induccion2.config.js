import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/induccion2/', 
  root: './src/apps/induccion2',
  build: {
    // Build into dist_induccion2/induccion2/ so it matches the base exactly
    outDir: resolve(__dirname, 'dist_induccion2/induccion2'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/apps/induccion2/index.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'entry-[name]-[hash].js',
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
});

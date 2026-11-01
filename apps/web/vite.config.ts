import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  root: 'apps/web',
  plugins: [react()],
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: { manualChunks: { react: ['react', 'react-dom/client'], pixi: ['pixi.js'] } },
    },
  },
  server: {
    host: '0.0.0.0',
    port: Number(process.env.WEB_PORT ?? 5173),
    fs: { deny: ['**/.data/**', '**/.env', '**/.env.*', '**/*.{crt,pem,key}', '**/.git/**'] },
    proxy: {
      '/api': { target: process.env.API_PROXY_URL ?? 'http://localhost:3001', changeOrigin: false },
    },
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // En desarrollo usar '/', en producción usar el nombre del repo
  const base = command === 'serve' ? '/' : '/app-examen-opos/';
  
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  };
})

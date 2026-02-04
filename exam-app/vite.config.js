import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // En desarrollo usar '/', en producción usar '/exam-app/' (o el nombre de tu repo)
  const base = command === 'serve' ? '/' : '/exam-app/';
  
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  };
})

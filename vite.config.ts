import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default (() => {
  return defineConfig({
    server: {
      host: 'localhost',
    },
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
    root: "./src/render",
    base: "./",
    build: {
      outDir: '../../app/render',
      emptyOutDir: true,
    }
  });
});

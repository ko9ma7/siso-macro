import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

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
    resolve: {
      alias: [
        {find: "@assets", replacement: path.resolve(__dirname, "src/render/assets")},
      ],
    },
    build: {
      outDir: '../../app/render',
      emptyOutDir: true,
    }
  });
});

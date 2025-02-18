import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: command === 'build' ? "./" : "/",
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
      ],
    },
    build: {
      emptyOutDir: true,
    }
  };
});

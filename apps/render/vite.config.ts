import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default (() => {
  return defineConfig({
    // base: "./",
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
  });
});

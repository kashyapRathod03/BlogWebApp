import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/story": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/user": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/comment": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/storyImages": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/userPhotos": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
});

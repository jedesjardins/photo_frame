import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/immich': {
        target: process.env.IMMICH_API_URL || '',
        changeOrigin: true,
        rewrite: (path) =>  path.replace(/^\/immich/, '/api'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('x-api-key', process.env.IMMICH_API_KEY || '');
          });
        },
      },
    }
  },
});

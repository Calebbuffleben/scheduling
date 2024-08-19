import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        '/api': {
            target: 'es2022',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        },
    },
},
} as UserConfig);

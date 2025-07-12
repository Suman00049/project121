import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Use the main tsconfig.json instead of tsconfig.app.json
  // esbuild: {
  //   tsconfig: './tsconfig.json'
  // }
});

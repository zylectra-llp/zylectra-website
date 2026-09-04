import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        benchmarks: resolve(__dirname, 'benchmarks.html'),
        benchmarksDataBasedModels: resolve(__dirname, 'benchmarks/data-based-models.html'),
        benchmarksZylectraVsWang: resolve(__dirname, 'benchmarks/zylectra-vs-wang.html'),
      },
    },
  },
});

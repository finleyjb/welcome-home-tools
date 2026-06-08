import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';

export default defineConfig({
  plugins: [analyzer()],
  build: {
    lib: {
      entry: 'index.ts',
      formats: ['es', 'iife'],
      name: 'welcomeHome.themeTools',
    },
    minify: true,
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});

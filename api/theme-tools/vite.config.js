import { defineConfig } from 'vite';

export default defineConfig({
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

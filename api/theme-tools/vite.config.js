import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts',
      formats: ['es', 'iife'],
      name: 'welcomeHome.themeTools',
    },
    minify: 'terser',
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});

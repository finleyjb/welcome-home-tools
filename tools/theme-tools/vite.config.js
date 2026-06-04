import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: ['index.ts'],
      name: 'welcomeHome.themeTools',
      fileName: 'theme-tools',
      formats: ['es', 'iife'],
    },
    minify: true,
    rolldownOptions: {},
  },
});

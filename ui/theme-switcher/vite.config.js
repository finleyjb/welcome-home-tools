import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts',
      formats: ['es'],
    },
    minify: true,
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  rolldownOptions: {
    external: ['preact', 'preact-custom-element'],
  },
});

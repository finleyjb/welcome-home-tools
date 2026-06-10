// SPDX-FileCopyrightText: 2026 Finley J Baker <finleyb.dev@proton.me>
//
// SPDX-License-Identifier: MPL-2.0

import preact from '@preact/preset-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [preact(), vanillaExtractPlugin(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: 'index.ts',
      formats: ['es'],
    },
    minify: 'terser',
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  rolldownOptions: {
    external: ['preact', 'preact-custom-element'],
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        vue: 'welcomeHome.themeTools',
      },
    },
  },
});

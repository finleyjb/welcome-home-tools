// SPDX-FileCopyrightText: 2026 Finley J Baker <finleyb.dev@proton.me>
//
// SPDX-License-Identifier: MPL-2.0

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

// SPDX-FileCopyrightText: 2026 Finley J Baker <finleyb.dev@proton.me>
//
// SPDX-License-Identifier: MPL-2.0

export default {
  '*.ts': (_stagedFiles) => [
    'pnpx @biomejs/biome check',
    'pnpm typecheck',
    'pnpm test',
  ],
  '*.{css,ts,js,json}': (_stagedFiles) => ['pnpx @biomejs/biome check'],
  '*.md': ['prettier --write'],
};

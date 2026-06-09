export default {
  '*.ts': (_stagedFiles) => [
    'pnpx @biomejs/biome check',
    'pnpm typecheck',
    'pnpm test',
  ],
  '*.{css,ts,js,json}': (_stagedFiles) => ['pnpx @biomejs/biome check'],
  '*.md': ['prettier --write'],
};

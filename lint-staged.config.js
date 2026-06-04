export default {
  '*.ts': (_stagedFiles) => ['pnpx @biomejs/biome check', 'pnpm test'],
  '*.{css,ts,js,json}': (_stagedFiles) => ['pnpx @biomejs/biome check'],
};

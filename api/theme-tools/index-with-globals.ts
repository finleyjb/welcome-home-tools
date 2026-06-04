import * as index from './index.ts';
import type { ThemeDict } from './src/types.ts';

declare global {
  interface Window {
    welcomeHome: {
      themeTools: {
        createThemes(currentThemeName: string, themes: ThemeDict): void;
        setCurrentThemeName(themeName: string): void;
        subscribeCurrentTheme(cb: (theme: index.Theme) => void): () => void;
      };
    };
  }
}

window.welcomeHome = window.welcomeHome || {};

if (window.welcomeHome.themeTools !== undefined) {
  throw new Error('Theme tools already installed');
}

window.welcomeHome.themeTools = {
  createThemes: index.createThemes,
  setCurrentThemeName: index.setCurrentThemeName,
  subscribeCurrentTheme: index.subscribeCurrentTheme,
};

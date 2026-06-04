import { atom, computed } from 'nanostores';
import { ThemeToolsError } from './exception.ts';
import { _listenForThemeChange } from './theme-execution.ts';
import { type Theme, type ThemeDict, ThemeDictSchema } from './types.ts';

class ThemeStore {
  readonly $themes;
  readonly $currentThemeName;
  readonly $currentTheme;
  readonly themeListenerUnsubscribe;

  constructor(currentThemeName: string, themes: ThemeDict) {
    this.$themes = atom<Theme[]>(themes.themes);
    this.$currentThemeName = atom<string>(currentThemeName);
    this.$currentTheme = computed(
      [this.$themes, this.$currentThemeName],
      (themes, currentThemeName) => {
        const theme = themes.find((theme) => theme.name === currentThemeName);
        if (!theme) {
          throw new ThemeToolsError(`Unknown theme ${currentThemeName}`);
        }
        return theme;
      },
    );

    this.themeListenerUnsubscribe = this.$currentTheme.subscribe(
      _listenForThemeChange,
    );
  }

  cleanup() {
    this.themeListenerUnsubscribe();
  }
}

let store: ThemeStore | undefined;

export function _getStore(): ThemeStore {
  if (!store) {
    throw new ThemeToolsError('getStore called before createTheme');
  }

  return store;
}

export function _resetStore() {
  store = undefined;
}

export function subscribeCurrentTheme(cb: (theme: Theme) => void): () => void {
  return _getStore().$currentTheme.subscribe(cb);
}

export function setCurrentThemeName(themeName: string) {
  _getStore().$currentThemeName.set(themeName);
}

export function createThemes(currentThemeName: string, themes: ThemeDict) {
  const validatedThemes = validateThemes(currentThemeName, themes);

  store = new ThemeStore(currentThemeName, validatedThemes);
}

function validateThemes(themeName: string, themes: ThemeDict): ThemeDict {
  const validatedThemes = ThemeDictSchema.parse(themes);

  let hasSpecifiedThemeName = false;
  for (const theme of validatedThemes.themes) {
    if (theme.name === themeName) {
      hasSpecifiedThemeName = true;
    }
  }

  if (!hasSpecifiedThemeName) {
    throw new Error('Theme specification must have default theme');
  }

  return validatedThemes;
}

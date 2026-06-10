import { atom, computed } from 'nanostores';
import { parse } from 'valibot';
import { _chooseDefaultTheme } from './default-theme.ts';
import { ThemeToolsError } from './exception.ts';
import { _prefetchLinks } from './prefetch.ts';
import { _listenForThemeChange } from './theme-execution.ts';
import {
  type Theme,
  type ThemeDictInput,
  type ThemeDictOutput,
  ThemeDictSchema,
} from './types.ts';

class ThemeStore {
  readonly $themes;
  readonly $currentThemeName;
  readonly $currentTheme;
  readonly themeListenerUnsubscribe;

  constructor(currentThemeName: string, themes: ThemeDictOutput) {
    this.$themes = atom<Theme[]>(themes.themes);
    this.$currentThemeName = atom<string>(
      _chooseDefaultTheme(currentThemeName, themes),
    );
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

export function createThemes(currentThemeName: string, themes: ThemeDictInput) {
  const validatedThemes = validateThemes(currentThemeName, themes);

  store = new ThemeStore(currentThemeName, validatedThemes);

  _prefetchLinks(currentThemeName, themes.themes);
}

function validateThemes(
  themeName: string,
  themes: ThemeDictInput,
): ThemeDictOutput {
  const validatedThemes: ThemeDictOutput = parse(ThemeDictSchema, themes);

  const themeNames = new Set(themes.themes.map((theme) => theme.name));

  if (!themeNames.has(themeName)) {
    throw new ThemeToolsError(
      `Default theme ${themeName} is not in list of themes`,
    );
  }

  if (Array.isArray(themes.paths)) {
    for (const pathConfig of themes.paths) {
      if (!themeNames.has(pathConfig.path)) {
        throw new ThemeToolsError(
          `Path ${pathConfig.path} uses theme ${pathConfig.defaultTheme} which is not in themes ${Array.from(themeNames)}`,
        );
      }
    }
  }

  return validatedThemes;
}

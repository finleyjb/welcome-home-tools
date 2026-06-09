import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock(import('./theme-execution.ts'), () => ({
  _listenForThemeChange: vi.fn(),
}));

vi.mock(import('./prefetch.ts'), () => ({
  _prefetchLinks: vi.fn(),
}));

vi.mock(import('./default-theme.ts'), () => ({
  _chooseDefaultTheme: vi.fn((themeName) => themeName),
}));

import { _listenForThemeChange } from './theme-execution.ts';
import {
  _resetStore,
  createThemes,
  setCurrentThemeName,
  subscribeCurrentTheme,
} from './theme-store';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setTimerTickMode('nextTimerAsync');
});

afterEach(() => {
  _resetStore();
  vi.clearAllMocks();
  vi.clearAllTimers();
});

describe('Theme store', () => {
  test('can set theme once', async () => {
    createThemes('non-default', {
      themes: [{ name: 'default' }, { name: 'non-default' }],
    });
  });

  test('can repeatedly set theme', () => {
    createThemes('default', {
      themes: [{ name: 'default' }, { name: 'theme1' }, { name: 'theme2' }],
    });
    vi.advanceTimersToNextTimer();

    const themeNames: string[] = [];
    const unsubscribe = subscribeCurrentTheme((theme) => {
      themeNames.push(theme.name);
    });

    setCurrentThemeName('theme1');

    setCurrentThemeName('theme2');

    expect(themeNames).toEqual(['default', 'theme1', 'theme2']);
    unsubscribe();
  });

  test('subscribes theme listener', () => {
    createThemes('default', {
      themes: [{ name: 'default' }],
    });
    expect(_listenForThemeChange).toHaveBeenCalled();
  });

  test('createTheme does validation', () => {
    expect
      .soft(() => {
        createThemes('asdf', {
          themes: [{ name: 'jkl;' }],
        });
      })
      .toThrow();

    expect
      .soft(() => {
        createThemes('asdf', {
          themes: [{ name: 'asdf', styleUrl: '/not/a/valid/url' }],
        });
      })
      .toThrow();
  });

  test('createThemes does path validation', () => {
    expect(() => {
      createThemes('asdf', {
        themes: [{ name: 'asdf' }, { name: 'path-default' }],
        paths: [{ path: '/path/default', defaultTheme: 'other-theme' }],
      });
    }).toThrow();
  });
});

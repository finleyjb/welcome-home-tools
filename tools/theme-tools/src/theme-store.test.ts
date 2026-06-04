import { cleanStores, keepMount } from 'nanostores';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  $currentTheme,
  $currentThemeName,
  $themes,
  getCurrentTheme,
  setThemeName,
  setThemes,
  subscribeCurrentTheme,
} from './theme-store';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setTimerTickMode('nextTimerAsync');
});

afterEach(() => {
  cleanStores($themes);
  cleanStores($currentThemeName);
  cleanStores($currentTheme);
  vi.clearAllMocks();
  vi.clearAllTimers();
});

describe('Theme store', () => {
  test('can set theme once', async () => {
    keepMount($currentTheme);
    setThemes([
      { name: 'default', styleTitle: 'default' },
      { name: 'non-default', styleTitle: 'non-default' },
    ]);
    setThemeName('non-default');

    const currentTheme = await getCurrentTheme();
    expect(currentTheme.styleTitle).toEqual('non-default');
  });

  test('can repeatedly set theme', () => {
    keepMount($currentTheme);
    setThemes([
      { name: 'default', styleTitle: 'default' },
      { name: 'theme1', styleTitle: 'theme1' },
      { name: 'theme2', styleTitle: 'theme2' },
    ]);
    vi.advanceTimersToNextTimer();

    const themeNames: string[] = [];
    subscribeCurrentTheme((theme) => {
      themeNames.push(theme.name);
    });
    vi.advanceTimersToNextTimer();

    setThemeName('theme1');
    vi.advanceTimersToNextTimer();

    setThemeName('theme2');
    vi.advanceTimersToNextTimer();

    expect(themeNames).toEqual(['default', 'theme1', 'theme2']);
  });
});

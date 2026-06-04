import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  _resetStore,
  createTheme,
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
    createTheme('non-default', [
      { name: 'default', styleTitle: 'default' },
      { name: 'non-default', styleTitle: 'non-default' },
    ]);
  });

  test('can repeatedly set theme', () => {
    createTheme('default', [
      { name: 'default', styleTitle: 'default' },
      { name: 'theme1', styleTitle: 'theme1' },
      { name: 'theme2', styleTitle: 'theme2' },
    ]);
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
});

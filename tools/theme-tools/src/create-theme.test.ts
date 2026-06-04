import { describe, expect, test, vi } from 'vitest';

vi.mock(import('./theme-store.ts'), () => {
  return {
    setThemes: vi.fn(),
  };
});

import { createTheme } from './create-theme.ts';
import { setThemes } from './theme-store.ts';
import type { Theme } from './types.ts';

describe('Call tests', () => {
  test('Can call createTheme', () => {
    const expectedTheme = {
      name: 'default',
      styleTitle: 'blah',
    };
    createTheme(expectedTheme);
    expect(setThemes).toHaveBeenCalledWith([expectedTheme]);

    const expectedThemes = [
      {
        name: 'default',
        styleTitle: 'blah',
      },
      {
        name: 'non-default',
        styleTitle: 'blahblah',
      },
    ];
    createTheme(expectedThemes);
    expect(setThemes).toHaveBeenCalledWith(expectedThemes);
  });

  test('Validates errors', () => {
    // No default theme should raise error
    expect(() => createTheme({ name: 'asdf', styleTitle: 'blah' })).toThrow();

    // Empty class should throw error
    expect(() => createTheme({} as unknown as Theme)).toThrow();

    expect(() => createTheme([])).toThrow();
  });
});

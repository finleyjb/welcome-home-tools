import { setThemes } from './theme-store';
import { type Theme, ThemeSchema } from './types';

export function createTheme(themes: Theme | Theme[]) {
  if (!Array.isArray(themes)) {
    themes = [themes];
  }

  const validatedThemes = validateThemes(themes);

  setThemes(validatedThemes);
}

function validateThemes(themes: Theme[]): Theme[] {
  const parsedThemes = themes.map((theme) => ThemeSchema.parse(theme));

  let hasDefault = false;
  for (const theme of parsedThemes) {
    if (theme.name === 'default') {
      hasDefault = true;
    }
  }

  if (!hasDefault) {
    throw new Error('Theme specification must have default theme');
  }

  return parsedThemes;
}

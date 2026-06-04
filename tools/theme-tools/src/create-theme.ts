import * as z from 'zod/mini';
import { FontSpecSchema } from './fonts';

const Theme = z.strictObject({
  name: z.string(),
  styleTitle: z.string(),
  styleUrl: z.optional(z.httpUrl({ normalize: true })),
  pageUrl: z.optional(z.array(z.httpUrl({ normalize: true }))),
  fonts: z.array(FontSpecSchema),
});

type ThemeType = z.infer<typeof Theme>;
export function createTheme(themes: ThemeType | ThemeType[]) {
  if (!Array.isArray(themes)) {
    themes = [themes];
  }

  const validatedThemes = validateThemes(themes);
}

function validateThemes(themes: ThemeType[]): ThemeType[] {
  const parsedThemes = themes.map((theme) => Theme.parse(theme));

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

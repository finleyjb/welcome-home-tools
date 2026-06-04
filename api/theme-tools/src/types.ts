import * as z from 'zod/mini';

export const ThemeSchema = z.strictObject({
  name: z.string(),
  styleTitle: z.string(),
  styleUrl: z.optional(z.httpUrl({ normalize: true })),
  pageUrl: z.optional(z.array(z.httpUrl({ normalize: true }))),
});

export type Theme = z.infer<typeof ThemeSchema>;

export const ThemeDictSchema = z.strictObject({ themes: z.array(ThemeSchema) });

export type ThemeDict = z.infer<typeof ThemeDictSchema>;

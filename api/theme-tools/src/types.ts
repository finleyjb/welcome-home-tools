import * as z from 'zod/mini';

export const ThemeSchema = z.readonly(
  z.strictObject({
    name: z.string(),
    styleTitle: z.string(),
    styleUrl: z.optional(z.httpUrl({ normalize: true })),
    pageUrl: z.optional(z.array(z.httpUrl({ normalize: true }))),
    preloadStrategy: z.optional(z.enum(['preload', 'prefetch'])),
  }),
);

export type Theme = z.infer<typeof ThemeSchema>;

export const LinkSchema = z.strictObject({
  url: z.xor([z.string(), z.instanceof(RegExp)]),
  defaultThemeName: z.string(),
  preloadThemeNames: z.optional(z.array(z.string())),
  preloadStrategy: z.optional(z.enum(['preload', 'prefetch'])),
});

export type Link = z.infer<typeof LinkSchema>;

export const ThemeDictSchema = z.readonly(
  z.strictObject({
    themes: z.array(ThemeSchema),
    urls: z.optional(z.array(LinkSchema)),
  }),
);

export type ThemeDict = z.infer<typeof ThemeDictSchema>;

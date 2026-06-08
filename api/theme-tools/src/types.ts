import {
  array,
  type InferInput,
  type InferOutput,
  optional,
  picklist,
  pipe,
  strictObject,
  string,
  url,
} from 'valibot';

export const ThemeSchema = strictObject({
  name: string('Name must be a string'),
  styleUrl: optional(
    pipe(
      string('styleUrl must be a string'),
      url('styleUrl must be valid url'),
    ),
  ),
  preloadStrategy: optional(picklist(['preload', 'prefetch'])),
});

export type Theme = InferOutput<typeof ThemeSchema>;

// export const ThemeSchema = z.readonly(
//   z.strictObject({
//     name: z.string(),
//     styleUrl: z.optional(z.httpUrl({ normalize: true })),
//     pageUrl: z.optional(z.array(z.httpUrl({ normalize: true }))),
//     preloadStrategy: z.optional(z.enum(['preload', 'prefetch'])),
//   }),
// );
//
// export type Theme = z.infer<typeof ThemeSchema>;

// export const LinkSchema = z.strictObject({
//   url: z.xor([z.string(), z.instanceof(RegExp)]),
//   defaultThemeName: z.string(),
//   preloadThemeNames: z.optional(z.array(z.string())),
//   preloadStrategy: z.optional(z.enum(['preload', 'prefetch'])),
// });
//
// export type Link = z.infer<typeof LinkSchema>;

export const ThemeDictSchema = strictObject({
  themes: array(ThemeSchema),
});

export type ThemeDictInput = InferInput<typeof ThemeDictSchema>;
export type ThemeDictOutput = InferOutput<typeof ThemeDictSchema>;

// export const ThemeDictSchema = z.readonly(
//   z.strictObject({
//     themes: z.array(ThemeSchema),
//     urls: z.optional(z.array(LinkSchema)),
//   }),
// );
//
// export type ThemeDict = z.infer<typeof ThemeDictSchema>;

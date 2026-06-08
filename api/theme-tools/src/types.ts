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

export const ThemeDictSchema = strictObject({
  themes: array(ThemeSchema),
});

export type ThemeDictInput = InferInput<typeof ThemeDictSchema>;
export type ThemeDictOutput = InferOutput<typeof ThemeDictSchema>;

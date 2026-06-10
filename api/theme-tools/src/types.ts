// SPDX-FileCopyrightText: 2026 Finley J Baker <finleyb.dev@proton.me>
//
// SPDX-License-Identifier: MPL-2.0

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

const PreloadStrategy = picklist(['preload', 'prefetch']);

export const ThemeSchema = strictObject({
  name: string('Name must be a string'),
  styleUrl: optional(
    pipe(
      string('styleUrl must be a string'),
      url('styleUrl must be valid url'),
    ),
  ),
  preloadStrategy: optional(PreloadStrategy),
});

export type Theme = InferOutput<typeof ThemeSchema>;

export const PathSchema = strictObject({
  path: string(),
  defaultTheme: string(),
});

export const ThemeDictSchema = strictObject({
  themes: array(ThemeSchema),
  paths: optional(array(PathSchema)),
});

export type ThemeDictInput = InferInput<typeof ThemeDictSchema>;
export type ThemeDictOutput = InferOutput<typeof ThemeDictSchema>;

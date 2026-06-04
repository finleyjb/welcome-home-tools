import * as z from 'zod/mini';
import { addFont } from './add-font';

export const FontSpecSchema = z.object({
  fontFamily: z.string(),
  fontWeight: z.string(),
  fontUrl: z.httpUrl({
    normalize: true,
  }),
  fontStyle: z.string(),
  fontDisplay: z.optional(
    z.enum(['swap', 'optional', 'fallback', 'block', 'auto']),
  ),
  load: z.optional(z.boolean()),
});

type FontSpec = z.infer<typeof FontSpecSchema>;

export async function loadFonts(fonts: FontSpec | FontSpec[]) {
  if (!Array.isArray(fonts)) {
    fonts = [fonts];
  }

  fonts = fonts.map((fontSpec) => FontSpecSchema.parse(fontSpec));

  for (const font of fonts) {
    const fontFace = new FontFace(font.fontFamily, `url('${font.fontUrl}`, {
      style: font.fontStyle,
      weight: font.fontWeight,
      display: font.fontDisplay ?? 'swap',
    });

    addFont(fontFace);

    if (font.load == null || font.load) {
      fontFace.load();
    }
  }
}

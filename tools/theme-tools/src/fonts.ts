import * as z from 'zod/mini';

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

export function loadFonts(fonts: FontSpec | FontSpec[]) {
  if (!Array.isArray(fonts)) {
    fonts = [fonts];
  }

  fonts = fonts.map((fontSpec) => FontSpecSchema.parse(fontSpec));

  for (const font of fonts) {
    if (font.load == null || font.load) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font.fontUrl;
      link.crossOrigin = 'anonymous';
      link.as = 'font';
      link.type = 'font/woff2';
      document.head.appendChild(link);
    }

    const fontFace = new FontFace(font.fontFamily, `url('${font.fontUrl}`, {
      style: font.fontStyle,
      weight: font.fontWeight,
      display: font.fontDisplay ?? 'swap',
    });

    document.fonts.add(fontFace);

    fontFace.load();
  }
}

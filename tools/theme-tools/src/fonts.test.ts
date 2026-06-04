import { beforeEach, expect, type Mock, test, vi } from 'vitest';

vi.mock(import('./add-font.ts'), () => ({ addFont: vi.fn() }));

import { addFont } from './add-font.ts';
import { loadFonts } from './fonts';

let loadFontMock: Mock;

beforeEach(() => {
  loadFontMock = vi.fn();

  const fontFaceMock = vi.fn(
    class {
      load = loadFontMock;
    },
  );

  vi.stubGlobal('FontFace', fontFaceMock);
});

test('Can call createFont base', () => {
  loadFonts([
    {
      fontFamily: 'SpaceGrotesk',
      fontStyle: 'normal',
      fontWeight: '700',
      fontUrl: 'https://font.url/SpaceGrotesk',
    },
  ]);

  expect(addFont).toHaveBeenCalled();
  expect(loadFontMock).toHaveBeenCalled();
});

test('Can call createFont without loadable', () => {
  loadFonts([
    {
      fontFamily: 'SpaceGrotesk',
      fontStyle: 'normal',
      fontWeight: '700',
      fontUrl: 'https://font.url/SpaceGrotesk',
      load: false,
    },
  ]);

  expect(addFont).toHaveBeenCalled();
  expect(loadFontMock).not.toHaveBeenCalled();
});

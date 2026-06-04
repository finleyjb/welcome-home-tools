/**
 * This function just exists to make it easier to mock a function on
 * document.fonts
 */
export function addFont(font: FontFace) {
  document.fonts.add(font);
}

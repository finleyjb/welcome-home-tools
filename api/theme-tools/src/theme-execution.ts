import type { Theme } from './types';

export function _listenForThemeChange(currentTheme: Theme) {
  let link: HTMLLinkElement | undefined;
  if (
    currentTheme.styleUrl &&
    !document.querySelector(
      `link[rel="stylesheet"][href="${currentTheme.styleUrl}"]`,
    )
  ) {
    link = document.createElement('link');
    link.href = currentTheme.styleUrl;
    link.rel = 'stylesheet';
    link.blocking = 'render';
    link.crossOrigin = 'anonymous';
    link.title = currentTheme.styleTitle;
    document.head.appendChild(link);
  }

  if (link) {
    link.addEventListener('load', updateStylesheets);
  } else {
    updateStylesheets();
  }

  function updateStylesheets() {
    for (const styleSheet of document.styleSheets) {
      let styleSheetTitle: string | undefined | null = styleSheet.title;
      if (!styleSheetTitle) {
        const sheetNode = styleSheet.ownerNode;
        if (!(sheetNode instanceof ProcessingInstruction)) {
          styleSheetTitle = sheetNode?.getAttribute('data-name');
        }
      }

      if (!styleSheetTitle) {
        continue;
      }

      styleSheet.disabled = styleSheetTitle !== currentTheme.styleTitle;
    }
  }
}

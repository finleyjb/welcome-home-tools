import type { Theme } from './types';

export function _listenForThemeChange(currentTheme: Theme) {
  if (
    currentTheme.styleUrl &&
    !document.querySelector(`link[href="${currentTheme.styleUrl}"]`)
  ) {
    const link = document.createElement('link');
    link.href = currentTheme.styleUrl;
    link.rel = 'stylesheet';
    link.blocking = 'render';
    link.title = currentTheme.styleTitle;
    document.head.appendChild(link);
  }

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

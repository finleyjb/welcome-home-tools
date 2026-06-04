import type { Theme } from './types';

export function _prefetchLinks(currentThemeName: string, themes: Theme[]) {
  for (const theme of themes) {
    if (!theme.preloadStrategy || theme.name === currentThemeName) {
      continue;
    }

    if (!theme.styleUrl) {
      console.warn(
        `Theme ${theme.name} has preloadStrategy set, but no styleUrl`,
      );
      continue;
    }

    const existingLinkElem = document.querySelector(
      `link[href="${theme.styleUrl}"]`,
    );
    if (existingLinkElem) {
      continue;
    }

    const linkElem = document.createElement('link');
    linkElem.rel = theme.preloadStrategy;
    linkElem.href = theme.styleUrl;
    linkElem.as = 'style';
    document.head.appendChild(linkElem);
  }
}

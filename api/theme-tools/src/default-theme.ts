import { config } from 'valibot';
import type { ThemeDictOutput } from './types';

export function _chooseDefaultTheme(
  selectedTheme: string,
  themes: ThemeDictOutput,
) {
  const canonicalLink = document.querySelector('link[rel="canonical"][href]') as
    | HTMLLinkElement
    | undefined;
  if (!canonicalLink || themes.paths == null) {
    return selectedTheme;
  }

  const canonicalUrl = canonicalLink.href;
  let canonicalPath: string = new URL(canonicalUrl).pathname;
  if (!canonicalPath.endsWith('/')) {
    canonicalPath += '/';
  }

  for (const pathConfig of themes.paths) {
    let configPath = pathConfig.path;
    if (!configPath.endsWith('/')) {
      configPath += '/';
    }

    if (canonicalPath === configPath) {
      return pathConfig.defaultTheme;
    }
  }

  return selectedTheme;
}

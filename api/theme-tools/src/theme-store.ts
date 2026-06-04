import { atom, batched } from 'nanostores';
import type { Theme } from './types.ts';

export const $themes = atom<Theme[]>([
  { name: 'default', styleTitle: 'default' },
]);

export const $currentThemeName = atom<string>('default');

// Only exported for test, not intended to be exposed externally
export const $currentTheme = batched(
  [$themes, $currentThemeName],
  (themes: Theme[], currentThemeName: string) => {
    let currentTheme =
      themes.find((theme) => theme.name === currentThemeName) ??
      themes.find((theme) => theme.name === 'default');

    if (!currentTheme) {
      currentTheme = { name: 'default', styleTitle: 'default' };
      if (currentThemeName === 'default') {
        console.error(`No theme found for name default`);
      } else {
        console.error(`No theme found for name ${currentThemeName} or default`);
      }
    }

    return currentTheme;
  },
);

// Only exported for other modules. Not to be exported externally.
/** @internal */
export function setThemes(themes: Theme[]) {
  $themes.set(themes);
}

export function setThemeName(themeName: string) {
  $currentThemeName.set(themeName);
}

export function getCurrentTheme(): Promise<Theme> {
  let resolve: (value: Theme) => void;
  const returnPromise = new Promise<Theme>((resolveFn, _reject) => {
    resolve = resolveFn;
  });

  let valueResolved = false;

  // Since the batched value is set asynchronously, read it after a tick
  setTimeout(() => {
    const unsubscribe = $currentTheme.subscribe((val) => {
      if (!valueResolved) {
        resolve(val as Theme);
        valueResolved = true;
        setTimeout(() => {
          unsubscribe();
        });
      }
    });
  });

  return returnPromise;
}

export function subscribeCurrentTheme(cb: (value: Readonly<Theme>) => void) {
  return $currentTheme.subscribe(cb);
}

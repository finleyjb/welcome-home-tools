import { beforeEach, describe, expect, test } from 'vitest';
import { _chooseDefaultTheme } from '../src/default-theme';

function createCanonicalUrl(url: string) {
  const canonicalLink = document.createElement('link') as HTMLLinkElement;
  canonicalLink.href = url;
  canonicalLink.rel = 'canonical';
  document.head.appendChild(canonicalLink);
}

beforeEach(() => {
  document.head.innerHTML = '';
});

describe('Theme selection', () => {
  test('chooses default by default', () => {
    expect(
      _chooseDefaultTheme('default', { themes: [{ name: 'default' }] }),
    ).toBe('default');
  });

  test('Chooses based on path', () => {
    createCanonicalUrl('https://domain.com/path');

    expect(
      _chooseDefaultTheme('default', {
        themes: [{ name: 'default' }, { name: 'path-default' }],
        paths: [{ path: '/path', defaultTheme: 'path-default' }],
      }),
    ).toBe('path-default');
  });

  test('matches with ending slash', () => {
    createCanonicalUrl('https://domain.com/path/');
    expect(
      _chooseDefaultTheme('default', {
        themes: [{ name: 'default' }, { name: 'path-default' }],
        paths: [{ path: '/path/', defaultTheme: 'path-default' }],
      }),
    ).toBe('path-default');
  });

  test('matches canonical with slash, path config without', () => {
    createCanonicalUrl('https://domain.com/path/');
    expect(
      _chooseDefaultTheme('default', {
        themes: [{ name: 'default' }, { name: 'path-default' }],
        paths: [{ path: '/path', defaultTheme: 'path-default' }],
      }),
    ).toBe('path-default');
  });

  test('matches canonical without slash, path config with', () => {
    createCanonicalUrl('https://domain.com/path');
    expect(
      _chooseDefaultTheme('default', {
        themes: [{ name: 'default' }, { name: 'path-default' }],
        paths: [{ path: '/path/', defaultTheme: 'path-default' }],
      }),
    ).toBe('path-default');
  });

  test('matches first', () => {
    createCanonicalUrl('https://domain.com/path');
    expect(
      _chooseDefaultTheme('default', {
        themes: [{ name: 'default' }, { name: 'path-default' }],
        paths: [
          { path: '/path/', defaultTheme: 'path-default' },
          { path: '/path', defaultTheme: 'other-path-default' },
        ],
      }),
    ).toBe('path-default');
  });

  test('normalizes canonical URL', () => {
    createCanonicalUrl('https://domain.com/path/../path');
    expect(
      _chooseDefaultTheme('default', {
        themes: [{ name: 'default' }, { name: 'path-default' }],
        paths: [{ path: '/path/', defaultTheme: 'path-default' }],
      }),
    ).toBe('path-default');
  });
});

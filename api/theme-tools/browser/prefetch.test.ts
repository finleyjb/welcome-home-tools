import { beforeEach, describe, expect, test } from 'vitest';
import { _prefetchLinks } from '../src/prefetch';

beforeEach(() => {
  document.head.innerHTML = '';
});

describe('Link prefetch', () => {
  test('prefetches no links', () => {
    _prefetchLinks('non-default', [{ name: 'default' }]);
    expect(document.querySelector('link[href]')).toBeNullable();
  });

  test('does prefetch links', () => {
    const styleUrl = 'https://domain.com/sheet.css';
    _prefetchLinks('non-default', [
      {
        name: 'default',
        styleUrl,
        preloadStrategy: 'prefetch',
      },
    ]);

    expect(
      document.querySelector(`link[rel="prefetch"][href="${styleUrl}"]`),
    ).not.toBeNullable();
  });

  test('skips current theme', () => {
    const styleUrl = 'https://domain.com/sheet.css';
    _prefetchLinks('default', [
      {
        name: 'default',
        styleUrl,
        preloadStrategy: 'prefetch',
      },
    ]);

    expect(
      document.querySelector(`link[rel="prefetch"][href="${styleUrl}"]`),
    ).toBeNullable();
  });
});

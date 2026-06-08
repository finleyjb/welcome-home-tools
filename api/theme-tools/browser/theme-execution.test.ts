import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { _listenForThemeChange } from '../src/theme-execution';
import type { Theme } from '../src/types';

afterEach(() => {
  document.head.innerHTML = '';
});

beforeEach(() => {
  vi.useFakeTimers();
});

function callListen(theme: Theme) {
  _listenForThemeChange(theme);
  vi.advanceTimersToNextFrame();
}

describe('Theme listener', () => {
  test('creates link tag', () => {
    const styleUrl = 'https://domain.com/style.css';

    callListen({
      name: 'default',
      styleUrl,
    });
    expect(
      document.querySelector(`link[href="${styleUrl}"]`),
    ).not.toBeNullable();
  });

  test("doesn't recreate links", () => {
    const styleUrl = 'https://domain.com/style.css';
    callListen({
      name: 'default',
      styleUrl,
    });

    callListen({
      name: 'default',
      styleUrl,
    });
    vi.advanceTimersToNextFrame();

    expect(document.querySelectorAll(`link[href="${styleUrl}"]`)).toHaveLength(
      1,
    );
  });

  test('disables unused stylesheets', () => {
    const nonDefaultStyle = document.createElement('style');
    nonDefaultStyle.setAttribute('data-name', 'non-default');
    nonDefaultStyle.title = 'non-default';
    document.head.appendChild(nonDefaultStyle);

    const defaultStyle = document.createElement('style');
    defaultStyle.setAttribute('data-name', 'default');
    document.head.appendChild(defaultStyle);

    callListen({
      name: 'default',
    });

    expect(nonDefaultStyle.sheet?.disabled).toBeTruthy();
    expect(defaultStyle.sheet?.disabled).toBeFalsy();

    callListen({
      name: 'non-default',
    });

    expect(nonDefaultStyle.sheet?.disabled).toBeFalsy();
    expect(defaultStyle.sheet?.disabled).toBeTruthy();
  });

  test('disables unused stylesheet links', () => {
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'stylesheet';
    defaultLink.href = 'data:text/css,body{}';
    defaultLink.setAttribute('data-name', 'default');
    document.head.appendChild(defaultLink);

    const nonDefaultLink = document.createElement('link');
    nonDefaultLink.rel = 'stylesheet';
    nonDefaultLink.href = 'data:text/css,p{}';
    nonDefaultLink.setAttribute('data-name', 'non-default');
    document.head.appendChild(nonDefaultLink);

    callListen({
      name: 'default',
    });

    expect.soft(nonDefaultLink.sheet?.disabled).toBeTruthy();
    expect.soft(defaultLink.sheet?.disabled).toBeFalsy();

    callListen({
      name: 'non-default',
    });

    expect.soft(nonDefaultLink.sheet?.disabled).toBeFalsy();
    expect.soft(defaultLink.sheet?.disabled).toBeTruthy();
  });

  test('uses data-name', () => {
    const nonDefaultStyle = document.createElement('style');
    nonDefaultStyle.setAttribute('data-name', 'non-default');
    document.head.appendChild(nonDefaultStyle);

    const defaultStyle = document.createElement('style');
    defaultStyle.setAttribute('data-name', 'default');
    document.head.appendChild(defaultStyle);

    callListen({ name: 'default' });

    expect(defaultStyle.sheet?.disabled).toBeFalsy();
    expect(nonDefaultStyle.sheet?.disabled).toBeTruthy();

    callListen({ name: 'non-default' });

    expect(defaultStyle.sheet?.disabled).toBeTruthy();
    expect(nonDefaultStyle.sheet?.disabled).toBeFalsy();
  });
});

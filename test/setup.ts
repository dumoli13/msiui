import React from 'react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock GSAP so animations complete synchronously in tests
vi.mock('gsap', () => {
  const immediateTween = (_target: unknown, vars: Record<string, unknown>) => {
    if (typeof vars?.onComplete === 'function') vars.onComplete();
    return { kill: vi.fn() };
  };
  return {
    default: {
      fromTo: (
        _target: unknown,
        _from: unknown,
        to: Record<string, unknown>,
      ) => {
        if (typeof to?.onComplete === 'function') to.onComplete();
        return { kill: vi.fn() };
      },
      to: immediateTween,
      from: immediateTween,
      set: vi.fn(),
      timeline: (vars?: Record<string, unknown>) => {
        const tl = {
          to: (
            _target: unknown,
            tweenVars: Record<string, unknown>,
            _position?: string,
          ) => {
            if (typeof tweenVars?.onComplete === 'function')
              tweenVars.onComplete();
            return tl;
          },
          from: (
            _target: unknown,
            tweenVars: Record<string, unknown>,
            _position?: string,
          ) => {
            if (typeof tweenVars?.onComplete === 'function')
              tweenVars.onComplete();
            return tl;
          },
          fromTo: (
            _target: unknown,
            _from: unknown,
            tweenTo: Record<string, unknown>,
            _position?: string,
          ) => {
            if (typeof tweenTo?.onComplete === 'function') tweenTo.onComplete();
            return tl;
          },
          play: vi.fn(),
          pause: vi.fn(),
          kill: vi.fn(),
          then: (_cb: () => void) => {
            return tl;
          },
        };
        // Execute timeline onComplete synchronously
        if (typeof vars?.onComplete === 'function') {
          (vars.onComplete as () => void)();
        }
        return tl;
      },
      killTweensOf: vi.fn(),
      registerPlugin: vi.fn(),
    },
  };
});

// Mock CSS imports (including src/output.css imported by src/index.ts)
vi.mock('../src/output.css', () => ({}));

// Mock SVG file imports (used by Icon component)
vi.mock('../src/assets/icon-outline.svg', () => ({ default: '' }));
vi.mock('../src/assets/icon-filled.svg', () => ({ default: '' }));

// Mock ResizeObserver (not available in jsdom)
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

// Mock IntersectionObserver (not available in jsdom)
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  root = null;
  rootMargin = '';
  thresholds: number[] = [];
  constructor(
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit,
  ) {}
}
global.IntersectionObserver =
  IntersectionObserverMock as unknown as typeof IntersectionObserver;

// Mock scrollIntoView (not available in jsdom)
Element.prototype.scrollIntoView = vi.fn();

// Mock react-pdf (requires canvas/workers not available in jsdom)
vi.mock('react-pdf', () => {
  return {
    Document: ({
      children,
      onLoadSuccess,
    }: {
      children: React.ReactNode;
      onLoadSuccess?: (doc: { numPages: number }) => void;
    }) => {
      React.useEffect(() => {
        onLoadSuccess?.({ numPages: 3 });
      }, [onLoadSuccess]);
      return React.createElement(
        'div',
        { 'data-testid': 'pdf-document' },
        children,
      );
    },
    Page: ({
      pageNumber,
      onLoadSuccess,
    }: {
      pageNumber: number;
      onLoadSuccess?: (page: { width: number }) => void;
    }) => {
      React.useEffect(() => {
        onLoadSuccess?.({ width: 800 });
      }, [onLoadSuccess]);
      return React.createElement('div', {
        'data-testid': `pdf-page-${pageNumber}`,
        className: 'react-pdf__Page',
      });
    },
    pdfjs: {
      GlobalWorkerOptions: { workerSrc: '' },
      version: '0.0.0',
    },
  };
});
vi.mock('react-pdf/dist/Page/AnnotationLayer.css', () => ({}));
vi.mock('react-pdf/dist/Page/TextLayer.css', () => ({}));

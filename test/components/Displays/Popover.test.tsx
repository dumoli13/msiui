import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Popover from '../../../src/components/Displays/Popover';

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  document.documentElement.classList.remove('dark');
});

const makeRef = () => {
  const el = document.createElement('div');
  document.body.appendChild(el);
  return { current: el };
};

describe('Popover', () => {
  it('renders children when open=true', () => {
    const ref = makeRef();
    render(
      <Popover open elementRef={ref} onClose={vi.fn()}>
        <div>Popover content</div>
      </Popover>,
    );
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('does not render when open=false', () => {
    const ref = makeRef();
    render(
      <Popover open={false} elementRef={ref} onClose={vi.fn()}>
        <div>Hidden content</div>
      </Popover>,
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('calls onClose when backdrop overlay is clicked', () => {
    const ref = makeRef();
    const onClose = vi.fn();
    render(
      <Popover open elementRef={ref} onClose={onClose}>
        <div>Content</div>
      </Popover>,
    );
    // The backdrop div has aria-hidden="true" and onClick=onClose
    const backdrop = document.querySelector(
      '[aria-hidden="true"]',
    ) as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders children into portal (document.body contains the content)', () => {
    const ref = makeRef();
    render(
      <Popover open elementRef={ref} onClose={vi.fn()}>
        <span data-testid="portal-test">In portal</span>
      </Popover>,
    );
    expect(document.body).toContainElement(screen.getByTestId('portal-test'));
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const ref = makeRef();
    const { container } = render(
      <Popover open elementRef={ref} onClose={vi.fn()}>
        <div>Dark popover</div>
      </Popover>,
    );
    expect(container).toBeInTheDocument();
  });
});

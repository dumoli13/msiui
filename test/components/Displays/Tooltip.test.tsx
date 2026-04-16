import { act, fireEvent, render, screen } from '@testing-library/react';
import Tooltip from '../../../src/components/Displays/Tooltip';

afterEach(() => {
  document.documentElement.classList.remove('dark');
  vi.useRealTimers();
});

// Helper: find the outer tooltip wrapper div that handles mouse events
const getTooltipWrapper = (container: HTMLElement) =>
  container.querySelector('div.relative > [tabindex="0"]') as HTMLElement;

describe('Tooltip', () => {
  it('renders trigger children', () => {
    render(
      <Tooltip title="Tooltip text">
        <span>Trigger</span>
      </Tooltip>,
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('tooltip content is NOT visible by default', () => {
    render(
      <Tooltip title="My Tooltip">
        <span>Hover me</span>
      </Tooltip>,
    );
    expect(screen.queryByText('My Tooltip')).not.toBeInTheDocument();
  });

  it('tooltip appears after mouseenter and delay elapses', () => {
    vi.useFakeTimers();
    const { container } = render(
      <Tooltip title="Visible Tooltip" mouseEnterDelay={100}>
        <span>Trigger</span>
      </Tooltip>,
    );
    const wrapper = getTooltipWrapper(container);
    fireEvent.mouseEnter(wrapper);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.getByText('Visible Tooltip')).toBeInTheDocument();
  });

  it('tooltip disappears after mouseleave', () => {
    vi.useFakeTimers();
    const { container } = render(
      <Tooltip title="Disappears" mouseEnterDelay={0} mouseLeaveDelay={0}>
        <span>Trigger</span>
      </Tooltip>,
    );
    const wrapper = getTooltipWrapper(container);
    fireEvent.mouseEnter(wrapper);
    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(screen.getByText('Disappears')).toBeInTheDocument();
    fireEvent.mouseLeave(wrapper);
    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(screen.queryByText('Disappears')).not.toBeInTheDocument();
  });

  it('disabled=true: applies cursor-not-allowed class and wraps children in pointer-events-none', () => {
    const { container } = render(
      <Tooltip title="Tooltip" disabled>
        <span>Trigger</span>
      </Tooltip>,
    );
    const wrapper = getTooltipWrapper(container);
    expect(wrapper.className).toMatch(/cursor-not-allowed/);
    expect(
      container.querySelector('span.pointer-events-none'),
    ).toBeInTheDocument();
  });

  it('arrow=true renders arrow element in tooltip (default is true)', () => {
    vi.useFakeTimers();
    const { container } = render(
      <Tooltip title="Arrow tooltip" mouseEnterDelay={0} arrow>
        <span>Trigger</span>
      </Tooltip>,
    );
    const wrapper = getTooltipWrapper(container);
    fireEvent.mouseEnter(wrapper);
    act(() => {
      vi.advanceTimersByTime(10);
    });
    const tooltip = document.querySelector('[class*="fixed"]') as HTMLElement;
    expect(tooltip?.querySelector('[class*="rotate-45"]')).toBeInTheDocument();
  });

  it('title text content is displayed in tooltip', () => {
    vi.useFakeTimers();
    const { container } = render(
      <Tooltip title="Hello World" mouseEnterDelay={0}>
        <span>Hover target</span>
      </Tooltip>,
    );
    const wrapper = getTooltipWrapper(container);
    fireEvent.mouseEnter(wrapper);
    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(
      <Tooltip title="Dark mode">
        <span>Trigger</span>
      </Tooltip>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

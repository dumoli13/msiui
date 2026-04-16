import { fireEvent, render, screen } from '@testing-library/react';
import Drawer from '../../../src/components/Feedback/Drawer';

afterEach(() => {
  document.documentElement.classList.remove('dark');
  document.body.style.overflow = '';
});

describe('Drawer', () => {
  it('renders children content when open=true', () => {
    render(
      <Drawer open onClose={vi.fn()}>
        <div>Drawer content</div>
      </Drawer>,
    );
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('hides children visually when open=false (pointer-events-none)', () => {
    const { container } = render(
      <Drawer open={false} onClose={vi.fn()}>
        <div>Hidden content</div>
      </Drawer>,
    );
    // The wrapper has opacity-0 pointer-events-none when closed
    const wrapper =
      container.querySelector('.fixed.inset-0') ??
      document.querySelector('.fixed.inset-0');
    expect(wrapper?.className).toMatch(/pointer-events-none/);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose}>
        <div>Content</div>
      </Drawer>,
    );
    const backdrop = document.querySelector(
      '[aria-hidden="true"]',
    ) as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('disableBackdropClick=true prevents close on backdrop click', () => {
    const onClose = vi.fn();
    render(
      <Drawer open disableBackdropClick onClose={onClose}>
        <div>Content</div>
      </Drawer>,
    );
    const backdrop = document.querySelector(
      '[aria-hidden="true"]',
    ) as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose}>
        <div>Content</div>
      </Drawer>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('disableEscapeKeyDown=true prevents close on Escape', () => {
    const onClose = vi.fn();
    render(
      <Drawer open disableEscapeKeyDown onClose={onClose}>
        <div>Content</div>
      </Drawer>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders position="left" with left-0 class', () => {
    render(
      <Drawer open position="left" onClose={vi.fn()}>
        <div>Left drawer</div>
      </Drawer>,
    );
    const drawerContent = document.querySelector(
      '.left-0.top-0',
    ) as HTMLElement;
    expect(drawerContent).toBeInTheDocument();
  });

  it('renders position="right" with right-0 class', () => {
    render(
      <Drawer open position="right" onClose={vi.fn()}>
        <div>Right drawer</div>
      </Drawer>,
    );
    const drawerContent = document.querySelector(
      '.right-0.top-0',
    ) as HTMLElement;
    expect(drawerContent).toBeInTheDocument();
  });

  it('renders position="top" with top-0 class', () => {
    render(
      <Drawer open position="top" onClose={vi.fn()}>
        <div>Top drawer</div>
      </Drawer>,
    );
    const drawerContent = document.querySelector(
      '.top-0.left-0.right-0',
    ) as HTMLElement;
    expect(drawerContent).toBeInTheDocument();
  });

  it('renders position="bottom" with bottom-0 class', () => {
    render(
      <Drawer open position="bottom" onClose={vi.fn()}>
        <div>Bottom drawer</div>
      </Drawer>,
    );
    const drawerContent = document.querySelector(
      '.bottom-0.left-0.right-0',
    ) as HTMLElement;
    expect(drawerContent).toBeInTheDocument();
  });

  it('applies custom width when position is left', () => {
    render(
      <Drawer open position="left" width={400} onClose={vi.fn()}>
        <div>Wide drawer</div>
      </Drawer>,
    );
    const drawerContent = document.querySelector(
      '.left-0.top-0',
    ) as HTMLElement;
    expect(drawerContent?.style.width).toBe('400px');
  });

  it('prevents body scroll when open', () => {
    render(
      <Drawer open onClose={vi.fn()}>
        <div>Content</div>
      </Drawer>,
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(
      <Drawer open onClose={vi.fn()}>
        <div>Dark drawer</div>
      </Drawer>,
    );
    expect(screen.getByText('Dark drawer')).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import ModalContainer from '../../../src/components/Modals/ModalContainer';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('ModalContainer', () => {
  it('renders children when open=true', () => {
    render(
      <ModalContainer open onClose={vi.fn()}>
        <div>Modal content</div>
      </ModalContainer>,
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when open=false', () => {
    render(
      <ModalContainer open={false} onClose={vi.fn()}>
        <div>Hidden content</div>
      </ModalContainer>,
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(
      <ModalContainer open onClose={onClose}>
        <div>Content</div>
      </ModalContainer>,
    );
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked (closeOnOverlayClick=true)', () => {
    const onClose = vi.fn();
    render(
      <ModalContainer open closeOnOverlayClick onClose={onClose}>
        <div>Content</div>
      </ModalContainer>,
    );
    const overlay = screen.getByRole('button', { name: 'Close Modal' });
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closeOnOverlayClick=false prevents close on overlay click', () => {
    const onClose = vi.fn();
    render(
      <ModalContainer open closeOnOverlayClick={false} onClose={onClose}>
        <div>Content</div>
      </ModalContainer>,
    );
    expect(
      screen.queryByRole('button', { name: 'Close Modal' }),
    ).not.toBeInTheDocument();
  });

  it('applies custom width style', () => {
    render(
      <ModalContainer open width={500} onClose={vi.fn()}>
        <div>Content</div>
      </ModalContainer>,
    );
    const dialog = screen.getByRole('dialog');
    const modalPanel = dialog.querySelector('[style*="width"]') as HTMLElement;
    expect(modalPanel.style.width).toBe('500px');
  });

  it('applies custom height style', () => {
    render(
      <ModalContainer open height={300} onClose={vi.fn()}>
        <div>Content</div>
      </ModalContainer>,
    );
    const dialog = screen.getByRole('dialog');
    const modalPanel = dialog.querySelector('[style*="height"]') as HTMLElement;
    expect(modalPanel.style.height).toBe('300px');
  });

  it('renders into portal (document.body)', () => {
    const { container } = render(
      <ModalContainer open onClose={vi.fn()}>
        <div>Portal content</div>
      </ModalContainer>,
    );
    // Component container should not contain the dialog
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    // But it should be in document.body
    expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('has role="dialog" and aria-modal="true"', () => {
    render(
      <ModalContainer open onClose={vi.fn()}>
        <div>Content</div>
      </ModalContainer>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(
      <ModalContainer open onClose={vi.fn()}>
        <div>Dark modal</div>
      </ModalContainer>,
    );
    expect(screen.getByText('Dark modal')).toBeInTheDocument();
  });
});

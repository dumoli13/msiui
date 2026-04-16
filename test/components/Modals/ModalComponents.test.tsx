import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import ConfirmModal from '../../../src/components/Modals/ConfirmModal';
import DangerModal from '../../../src/components/Modals/DangerModal';
import ModalBody from '../../../src/components/Modals/ModalBody';
import ModalConfirmContainer from '../../../src/components/Modals/ModalConfirmContainer';
import ModalFooter from '../../../src/components/Modals/ModalFooter';
import ModalHeader from '../../../src/components/Modals/ModalHeader';
import { resetModalManager } from '../../../src/components/Modals/modalManager';
import { OverlayContext } from '../../../src/context/OverlayContext';

afterEach(() => {
  resetModalManager();
  document.documentElement.classList.remove('dark');
});

// ── ModalBody ────────────────────────────────────────────────────────────────

describe('ModalBody', () => {
  it('renders children', () => {
    render(<ModalBody>Body content</ModalBody>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders complex children', () => {
    render(
      <ModalBody>
        <p>Paragraph one</p>
        <p>Paragraph two</p>
      </ModalBody>,
    );
    expect(screen.getByText('Paragraph one')).toBeInTheDocument();
    expect(screen.getByText('Paragraph two')).toBeInTheDocument();
  });
});

// ── ModalFooter ──────────────────────────────────────────────────────────────

describe('ModalFooter', () => {
  it('renders children', () => {
    render(<ModalFooter>Footer content</ModalFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('renders multiple button children', () => {
    render(
      <ModalFooter>
        <button>Cancel</button>
        <button>Confirm</button>
      </ModalFooter>,
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });
});

// ── ModalHeader ──────────────────────────────────────────────────────────────

describe('ModalHeader', () => {
  it('renders the title text', () => {
    render(<ModalHeader title="My Dialog" />);
    expect(screen.getByText('My Dialog')).toBeInTheDocument();
  });

  it('renders an icon alongside the title', () => {
    render(
      <ModalHeader title="Alert" icon={<svg data-testid="alert-icon" />} />,
    );
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
    expect(screen.getByText('Alert')).toBeInTheDocument();
  });

  it('renders custom children instead of title when children provided', () => {
    render(
      <ModalHeader>
        <span>Custom header content</span>
      </ModalHeader>,
    );
    expect(screen.getByText('Custom header content')).toBeInTheDocument();
    expect(screen.queryByText('Ignored Title')).not.toBeInTheDocument();
  });
});

// ── ModalConfirmContainer ────────────────────────────────────────────────────

describe('ModalConfirmContainer', () => {
  it('renders children when open=true', () => {
    render(
      <ModalConfirmContainer open>
        <p>Confirm this action?</p>
      </ModalConfirmContainer>,
    );
    expect(screen.getByText('Confirm this action?')).toBeInTheDocument();
  });

  it('does not render when open=false', () => {
    render(
      <ModalConfirmContainer open={false}>
        <p>Hidden</p>
      </ModalConfirmContainer>,
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <ModalConfirmContainer open title="Delete Item">
        Are you sure?
      </ModalConfirmContainer>,
    );
    expect(screen.getByText('Delete Item')).toBeInTheDocument();
  });

  it('renders confirm and cancel buttons by default', () => {
    render(
      <ModalConfirmContainer open onClose={vi.fn()} onConfirm={vi.fn()}>
        Content
      </ModalConfirmContainer>,
    );
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('confirmText and cancelText customize button labels', () => {
    render(
      <ModalConfirmContainer
        open
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        confirmText="Yes, delete"
        cancelText="No, keep"
      >
        Content
      </ModalConfirmContainer>,
    );
    expect(
      screen.getByRole('button', { name: 'Yes, delete' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'No, keep' }),
    ).toBeInTheDocument();
  });

  it('clicking confirm button calls onConfirm', () => {
    const onConfirm = vi.fn();
    render(
      <ModalConfirmContainer open onClose={vi.fn()} onConfirm={onConfirm}>
        Content
      </ModalConfirmContainer>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('clicking cancel button calls onClose', () => {
    const onClose = vi.fn();
    render(
      <ModalConfirmContainer open onClose={onClose} onConfirm={vi.fn()}>
        Content
      </ModalConfirmContainer>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('pressing Escape calls onClose', () => {
    const onClose = vi.fn();
    render(
      <ModalConfirmContainer open onClose={onClose} onConfirm={vi.fn()}>
        Content
      </ModalConfirmContainer>,
    );
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('pressing Enter calls onConfirm', () => {
    const onConfirm = vi.fn();
    render(
      <ModalConfirmContainer open onClose={vi.fn()} onConfirm={onConfirm}>
        Content
      </ModalConfirmContainer>,
    );
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Enter' });
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('closeOnOverlayClick=true shows overlay close button', () => {
    const onClose = vi.fn();
    render(
      <ModalConfirmContainer open closeOnOverlayClick onClose={onClose}>
        Content
      </ModalConfirmContainer>,
    );
    const overlay = screen.getByRole('button', { name: 'Close Modal' });
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('confirmDisabled=true disables the confirm button', () => {
    render(
      <ModalConfirmContainer
        open
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        confirmDisabled
      >
        Content
      </ModalConfirmContainer>,
    );
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeDisabled();
  });

  it('has role="dialog" and aria-modal="true"', () => {
    render(
      <ModalConfirmContainer open onClose={vi.fn()}>
        Content
      </ModalConfirmContainer>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(
      <ModalConfirmContainer open title="Dark Modal">
        Dark content
      </ModalConfirmContainer>,
    );
    expect(screen.getByText('Dark Modal')).toBeInTheDocument();
  });

  it('renders into portal (document.body)', () => {
    const { container } = render(
      <ModalConfirmContainer open onClose={vi.fn()}>
        Portal content
      </ModalConfirmContainer>,
    );
    // React tree container should NOT contain the dialog (it portals out)
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    // But it should be in document.body
    expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('renders into parent OverlayContext container when provided', () => {
    const parentDiv = document.createElement('div');
    document.body.appendChild(parentDiv);

    render(
      <OverlayContext.Provider value={{ container: parentDiv, isFixed: true }}>
        <ModalConfirmContainer open onClose={vi.fn()}>
          Nested content
        </ModalConfirmContainer>
      </OverlayContext.Provider>,
    );

    // Should portal into the provided container, not document.body directly
    expect(parentDiv.querySelector('[role="dialog"]')).toBeInTheDocument();
    expect(screen.getByText('Nested content')).toBeInTheDocument();

    document.body.removeChild(parentDiv);
  });
});

// ── ConfirmModal (imperative API) ────────────────────────────────────────────

describe('ConfirmModal', () => {
  it('mounts a modal dialog into document.body', async () => {
    act(() => {
      ConfirmModal({ title: 'Confirm', content: 'Are you sure?' });
    });
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });
  });

  it('calls onConfirm and removes modal when Confirm clicked', async () => {
    const onConfirm = vi.fn();
    act(() => {
      ConfirmModal({ title: 'Delete', content: 'Delete?', onConfirm });
    });
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Confirm' }),
      ).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('calls onCancel and removes modal when Cancel clicked', async () => {
    const onCancel = vi.fn();
    act(() => {
      ConfirmModal({ title: 'Delete', content: 'Delete?', onCancel });
    });
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Cancel' }),
      ).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

// ── DangerModal (variant) ────────────────────────────────────────────────────

describe('DangerModal', () => {
  it('mounts a modal dialog with danger styling', async () => {
    act(() => {
      DangerModal({ title: 'Delete', content: 'This will delete the record.' });
    });
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        screen.getByText('This will delete the record.'),
      ).toBeInTheDocument();
    });
  });

  it('calls onConfirm and removes modal when Confirm clicked', async () => {
    const onConfirm = vi.fn();
    act(() => {
      DangerModal({
        title: 'Delete',
        content: 'Delete permanently?',
        onConfirm,
      });
    });
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Confirm' }),
      ).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

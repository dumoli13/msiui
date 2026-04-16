import { act, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import ConfirmModal from '../../../src/components/Modals/ConfirmModal';
import DangerModal from '../../../src/components/Modals/DangerModal';
import InfoModal from '../../../src/components/Modals/InfoModal';
import PrimaryModal from '../../../src/components/Modals/PrimaryModal';
import SuccessModal from '../../../src/components/Modals/SuccessModal';
import WarningModal from '../../../src/components/Modals/WarningModal';
import { resetModalManager } from '../../../src/components/Modals/modalManager';

afterEach(() => {
  resetModalManager();
  for (const el of document.querySelectorAll('body > div:not(#root)'))
    el.remove();
});

describe('Modal singleton behavior', () => {
  it('only allows one imperative modal at a time', async () => {
    act(() => {
      ConfirmModal({ title: 'First', content: 'First modal' });
    });
    await waitFor(() => {
      expect(screen.getByText('First modal')).toBeInTheDocument();
    });

    // Second call should be ignored
    act(() => {
      ConfirmModal({ title: 'Second', content: 'Second modal' });
    });

    expect(screen.queryByText('Second modal')).not.toBeInTheDocument();
    expect(screen.getAllByRole('dialog')).toHaveLength(1);
  });

  it('allows a new modal after the first one is closed', async () => {
    const onConfirm = vi.fn();
    act(() => {
      ConfirmModal({ title: 'First', content: 'First modal', onConfirm });
    });
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Close the first modal
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    // Now a second modal should open
    act(() => {
      ConfirmModal({ title: 'Second', content: 'Second modal' });
    });
    await waitFor(() => {
      expect(screen.getByText('Second modal')).toBeInTheDocument();
    });
  });

  it('blocks cross-variant modals (confirm blocks danger)', async () => {
    act(() => {
      ConfirmModal({ title: 'Confirm', content: 'Confirm modal' });
    });
    await waitFor(() => {
      expect(screen.getByText('Confirm modal')).toBeInTheDocument();
    });

    // Danger call should be blocked
    act(() => {
      DangerModal({ title: 'Danger', content: 'Danger modal' });
    });

    expect(screen.queryByText('Danger modal')).not.toBeInTheDocument();
    expect(screen.getAllByRole('dialog')).toHaveLength(1);
  });

  it('blocks all variant types while one is active', async () => {
    act(() => {
      InfoModal({ title: 'Info', content: 'Info modal' });
    });
    await waitFor(() => {
      expect(screen.getByText('Info modal')).toBeInTheDocument();
    });

    // All other variants should be blocked
    act(() => {
      SuccessModal({ title: 'Success', content: 'Success modal' });
    });
    expect(screen.queryByText('Success modal')).not.toBeInTheDocument();

    act(() => {
      WarningModal({ title: 'Warning', content: 'Warning modal' });
    });
    expect(screen.queryByText('Warning modal')).not.toBeInTheDocument();

    act(() => {
      PrimaryModal({ title: 'Primary', content: 'Primary modal' });
    });
    expect(screen.queryByText('Primary modal')).not.toBeInTheDocument();

    expect(screen.getAllByRole('dialog')).toHaveLength(1);
  });
});

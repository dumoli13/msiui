import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {
  NotificationStack,
  useNotification,
} from '../../../src/components/Notification';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  document.documentElement.classList.remove('dark');
});

const NotificationTester = ({
  color,
  title = 'Test notification',
  description,
}: {
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  title?: string;
  description?: string;
}) => {
  const notify = useNotification();
  return (
    <button onClick={() => notify({ title, description, color })}>
      Trigger
    </button>
  );
};

describe('Notification', () => {
  it('useNotification hook returns a function', () => {
    const TestComp = () => {
      const notify = useNotification();
      return <div>{typeof notify === 'function' ? 'function' : 'not'}</div>;
    };
    render(
      <>
        <NotificationStack />
        <TestComp />
      </>,
    );
    expect(screen.getByText('function')).toBeInTheDocument();
  });

  it('calling returned function renders notification with title', async () => {
    render(
      <>
        <NotificationStack />
        <NotificationTester title="Hello notification" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(screen.getByText('Hello notification')).toBeInTheDocument();
  });

  it('notification renders description text', async () => {
    render(
      <>
        <NotificationStack />
        <NotificationTester title="Title" description="Some description" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('notification renders SVG icon for color="success"', async () => {
    render(
      <>
        <NotificationStack />
        <NotificationTester color="success" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    // Icon is rendered as SVG
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('notification renders SVG icon for color="danger"', async () => {
    render(
      <>
        <NotificationStack />
        <NotificationTester color="danger" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('notification renders SVG icon for color="warning"', async () => {
    render(
      <>
        <NotificationStack />
        <NotificationTester color="warning" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('notification renders SVG icon for color="info"', async () => {
    render(
      <>
        <NotificationStack />
        <NotificationTester color="info" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('multiple notifications stack in the list', async () => {
    render(
      <>
        <NotificationStack />
        <NotificationTester title="First" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    const notifications = screen.getAllByText('First');
    expect(notifications.length).toBeGreaterThanOrEqual(2);
  });

  it('dark mode: renders without errors', async () => {
    document.documentElement.classList.add('dark');
    render(
      <>
        <NotificationStack />
        <NotificationTester title="Dark notification" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(screen.getByText('Dark notification')).toBeInTheDocument();
  });
});

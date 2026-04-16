import { act, render, screen } from '@testing-library/react';
import { ToastStack, useToast } from '../../../src/components/Toast';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

const ToastTester = ({
  color,
  title = 'Test toast',
  description,
}: {
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  title?: string;
  description?: string;
}) => {
  const toast = useToast();
  return (
    <button onClick={() => toast({ title, description, color })}>
      Trigger
    </button>
  );
};

describe('Toast', () => {
  it('useToast hook returns a function', () => {
    const TestComp = () => {
      const toast = useToast();
      return <div>{typeof toast === 'function' ? 'function' : 'not'}</div>;
    };
    render(
      <>
        <ToastStack />
        <TestComp />
      </>,
    );
    expect(screen.getByText('function')).toBeInTheDocument();
  });

  it('calling returned function renders toast with title', async () => {
    render(
      <>
        <ToastStack />
        <ToastTester title="Hello toast" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(screen.getByText('Hello toast')).toBeInTheDocument();
  });

  it('toast renders description text', async () => {
    render(
      <>
        <ToastStack />
        <ToastTester title="Title" description="Toast description" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(screen.getByText('Toast description')).toBeInTheDocument();
  });

  it('toast renders SVG icon for color="success"', async () => {
    render(
      <>
        <ToastStack />
        <ToastTester color="success" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('toast renders SVG icon for color="danger"', async () => {
    render(
      <>
        <ToastStack />
        <ToastTester color="danger" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('toast renders SVG icon for color="warning"', async () => {
    render(
      <>
        <ToastStack />
        <ToastTester color="warning" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('toast renders SVG icon for color="info"', async () => {
    render(
      <>
        <ToastStack />
        <ToastTester color="info" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('multiple toasts stack in the list', async () => {
    render(
      <>
        <ToastStack />
        <ToastTester title="Stacked" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    const toasts = screen.getAllByText('Stacked');
    expect(toasts.length).toBeGreaterThanOrEqual(2);
  });

  it('dark mode: renders without errors', async () => {
    document.documentElement.classList.add('dark');
    render(
      <>
        <ToastStack />
        <ToastTester title="Dark toast" />
      </>,
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Trigger' }).click();
    });
    expect(screen.getByText('Dark toast')).toBeInTheDocument();
  });
});

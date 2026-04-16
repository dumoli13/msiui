import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert from '../../../src/components/Displays/Alert';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Alert', () => {
  it('renders children content', () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('renders with color="primary" without errors', () => {
    const { container } = render(<Alert color="primary">Primary</Alert>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="danger" without errors', () => {
    const { container } = render(<Alert color="danger">Danger</Alert>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="warning" without errors', () => {
    const { container } = render(<Alert color="warning">Warning</Alert>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="success" without errors', () => {
    const { container } = render(<Alert color="success">Success</Alert>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="info" without errors', () => {
    const { container } = render(<Alert color="info">Info</Alert>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="neutral" without errors', () => {
    const { container } = render(<Alert color="neutral">Neutral</Alert>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders startIcon when provided', () => {
    render(
      <Alert startIcon={<span data-testid="start-icon">icon</span>}>
        Alert
      </Alert>,
    );
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('does NOT render close icon when onRemove is not provided', () => {
    render(<Alert>Alert</Alert>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders close icon when onRemove is provided', () => {
    const onRemove = vi.fn();
    render(<Alert onRemove={onRemove}>Alert</Alert>);
    // Icon gets role="button" when onClick is set
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onRemove when close icon is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Alert onRemove={onRemove}>Alert</Alert>);
    await user.click(screen.getByRole('button'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Alert>Dark mode alert</Alert>);
    expect(container.firstChild).toBeInTheDocument();
  });
});

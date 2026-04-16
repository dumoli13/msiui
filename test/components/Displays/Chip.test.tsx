import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chip from '../../../src/components/Displays/Chip';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Chip', () => {
  it('renders children content', () => {
    render(<Chip>Chip Label</Chip>);
    expect(screen.getByText('Chip Label')).toBeInTheDocument();
  });

  it('renders with color="primary" without errors', () => {
    const { container } = render(<Chip color="primary">Primary</Chip>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="neutral" without errors', () => {
    const { container } = render(<Chip color="neutral">Neutral</Chip>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders size="small" without errors', () => {
    const { container } = render(<Chip size="small">Small</Chip>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders size="default" without errors', () => {
    const { container } = render(<Chip size="default">Default</Chip>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders size="large" without errors', () => {
    const { container } = render(<Chip size="large">Large</Chip>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders startIcon when provided', () => {
    render(
      <Chip startIcon={<span data-testid="start-icon">S</span>}>
        With Start Icon
      </Chip>,
    );
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders endIcon when provided', () => {
    render(
      <Chip endIcon={<span data-testid="end-icon">E</span>}>
        With End Icon
      </Chip>,
    );
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('does NOT render remove button when onRemove not provided', () => {
    render(<Chip>No Remove</Chip>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders remove button when onRemove is provided', () => {
    const onRemove = vi.fn();
    render(<Chip onRemove={onRemove}>Removable</Chip>);
    // Icon gets role="button" when onClick is provided
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Chip onRemove={onRemove}>Removable</Chip>);
    await user.click(screen.getByRole('button'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Chip>Dark Chip</Chip>);
    expect(container.firstChild).toBeInTheDocument();
  });
});

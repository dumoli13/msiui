import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tag from '../../../src/components/Displays/Tag';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Tag', () => {
  it('renders children content', () => {
    render(<Tag>Tag Label</Tag>);
    expect(screen.getByText('Tag Label')).toBeInTheDocument();
  });

  it('renders with color="primary" without errors', () => {
    const { container } = render(<Tag color="primary">Primary</Tag>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="danger" without errors', () => {
    const { container } = render(<Tag color="danger">Danger</Tag>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="warning" without errors', () => {
    const { container } = render(<Tag color="warning">Warning</Tag>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="success" without errors', () => {
    const { container } = render(<Tag color="success">Success</Tag>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="info" without errors', () => {
    const { container } = render(<Tag color="info">Info</Tag>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with color="neutral" without errors', () => {
    const { container } = render(<Tag color="neutral">Neutral</Tag>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders size="small" without errors', () => {
    const { container } = render(<Tag size="small">Small</Tag>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders size="default" without errors', () => {
    const { container } = render(<Tag size="default">Default</Tag>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders size="large" without errors', () => {
    const { container } = render(<Tag size="large">Large</Tag>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders startIcon when provided', () => {
    render(
      <Tag startIcon={<span data-testid="start-icon">S</span>}>
        Tag with start
      </Tag>,
    );
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders endIcon when provided', () => {
    render(
      <Tag endIcon={<span data-testid="end-icon">E</span>}>Tag with end</Tag>,
    );
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('does NOT render remove button when onRemove not provided', () => {
    render(<Tag>No Remove</Tag>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Removable</Tag>);
    await user.click(screen.getByRole('button'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Tag>Dark Tag</Tag>);
    expect(container.firstChild).toBeInTheDocument();
  });
});

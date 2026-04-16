import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Avatar } from '../../../src';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Avatar', () => {
  it('renders img element when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" name="John Doe" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/avatar.jpg',
    );
  });

  it('shows initials when no src but name is given', () => {
    render(<Avatar name="John Doe" />);
    // Initials for multi-word name: first letter of first + first letter of last
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('initials are only first 2 uppercase characters (single word name)', () => {
    render(<Avatar name="alice" />);
    // Single word: only the first character
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders without throwing when neither src nor name is provided', () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies correct size style (width and height in pixels)', () => {
    const { container } = render(<Avatar size={48} name="Test User" />);
    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toHaveStyle({ width: '48px', height: '48px' });
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Avatar name="Test User" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not throw when onClick is not provided', async () => {
    const user = userEvent.setup();
    const { container } = render(<Avatar name="Test User" />);
    await expect(
      user.click(container.firstChild as HTMLElement),
    ).resolves.not.toThrow();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Avatar name="Dark User" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

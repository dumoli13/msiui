import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../../src/components/Inputs/Button';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Button', () => {
  it('renders button with label text', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClick when disabled=true', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does NOT call onClick when loading=true', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Click
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders variant="contained" (default)', () => {
    const { container } = render(<Button variant="contained">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/drop-shadow/);
  });

  it('renders variant="secondary"', () => {
    const { container } = render(<Button variant="secondary">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/drop-shadow/);
  });

  it('renders variant="outlined"', () => {
    const { container } = render(<Button variant="outlined">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/border/);
  });

  it('renders variant="text"', () => {
    const { container } = render(<Button variant="text">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).not.toMatch(/bg-primary-main/);
  });

  it('renders variant="link"', () => {
    const { container } = render(<Button variant="link">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/focus:ring-0/);
  });

  it('renders color="primary" with primary classes', () => {
    const { container } = render(<Button color="primary">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/primary-main/);
  });

  it('renders color="success" with success classes', () => {
    const { container } = render(<Button color="success">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/success/);
  });

  it('renders color="danger" with danger classes', () => {
    const { container } = render(<Button color="danger">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/danger/);
  });

  it('renders color="warning" with warning classes', () => {
    const { container } = render(<Button color="warning">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/warning/);
  });

  it('renders color="info" with info classes', () => {
    const { container } = render(<Button color="info">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/info/);
  });

  it('renders color="neutral" with neutral classes', () => {
    const { container } = render(<Button color="neutral">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/neutral/);
  });

  it('renders size="large" with text-20px class', () => {
    const { container } = render(<Button size="large">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/text-20px/);
  });

  it('renders size="default" with text-14px class', () => {
    const { container } = render(<Button size="default">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/text-14px/);
  });

  it('renders size="small" with text-12px class', () => {
    const { container } = render(<Button size="small">Btn</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/text-12px/);
  });

  it('shows loading spinner (SVG) when loading=true', () => {
    const { container } = render(<Button loading>Loading</Button>);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('fullWidth=true applies w-full class', () => {
    const { container } = render(<Button fullWidth>Full</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/w-full/);
  });

  it('renders startIcon when provided', () => {
    const { container } = render(
      <Button startIcon={<span data-testid="start">S</span>}>Btn</Button>,
    );
    expect(
      container.querySelector('[data-testid="start"]'),
    ).toBeInTheDocument();
  });

  it('renders endIcon when provided', () => {
    const { container } = render(
      <Button endIcon={<span data-testid="end">E</span>}>Btn</Button>,
    );
    expect(container.querySelector('[data-testid="end"]')).toBeInTheDocument();
  });

  it('renders as type="submit" when specified', () => {
    const { container } = render(<Button type="submit">Submit</Button>);
    const btn = container.querySelector('button')!;
    expect(btn.type).toBe('submit');
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<Button>Dark button</Button>);
    expect(
      screen.getByRole('button', { name: 'Dark button' }),
    ).toBeInTheDocument();
  });
});

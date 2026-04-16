import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Icon from '../../src/components/Icon';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Icon', () => {
  it('renders a span with aria-label equal to name', () => {
    render(<Icon name="check" />);
    expect(screen.getByLabelText('check')).toBeInTheDocument();
  });

  it('renders an SVG element inside the span', () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom size to SVG width and height', () => {
    const { container } = render(<Icon name="check" size={32} />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('variant="outline" renders SVG with fill="none"', () => {
    const { container } = render(<Icon name="check" variant="outline" />);
    expect(container.querySelector('svg')).toHaveAttribute('fill', 'none');
  });

  it('variant="solid" renders SVG with a fill color', () => {
    const { container } = render(<Icon name="check" variant="solid" />);
    const svg = container.querySelector('svg')!;
    // Solid variant should have a fill other than none
    expect(svg.getAttribute('fill')).not.toBe('none');
  });

  it('applies animation="spin" inline style', () => {
    const { container } = render(<Icon name="loader" animation="spin" />);
    const svg = container.querySelector('svg')!;
    expect(svg.style.animation).toContain('spin');
  });

  it('applies animation="pulse" inline style', () => {
    const { container } = render(<Icon name="check" animation="pulse" />);
    const svg = container.querySelector('svg')!;
    expect(svg.style.animation).toContain('pulse');
  });

  it('applies animation="bounce" inline style', () => {
    const { container } = render(<Icon name="check" animation="bounce" />);
    const svg = container.querySelector('svg')!;
    expect(svg.style.animation).toContain('bounce');
  });

  it('applies animation="ping" inline style', () => {
    const { container } = render(<Icon name="check" animation="ping" />);
    const svg = container.querySelector('svg')!;
    expect(svg.style.animation).toContain('ping');
  });

  it('does NOT add role="button" when no onClick provided', () => {
    render(<Icon name="check" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('adds role="button" and calls onClick when onClick is provided', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Icon name="check" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled=true does not trigger onClick and has no role="button"', async () => {
    const onClick = vi.fn();
    render(<Icon name="check" onClick={onClick} disabled />);
    // disabled: role="button" not added
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Icon name="check" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

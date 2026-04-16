import { render, screen } from '@testing-library/react';
import Typography from '../../src/components/Typography';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Typography', () => {
  it('variant="h1" renders h1 element', () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('variant="h2" renders h2 element', () => {
    render(<Typography variant="h2">Heading 2</Typography>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('variant="h3" renders h3 element', () => {
    render(<Typography variant="h3">Heading 3</Typography>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('variant="h4" renders h4 element', () => {
    render(<Typography variant="h4">Heading 4</Typography>);
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
  });

  it('variant="h5" renders h5 element', () => {
    render(<Typography variant="h5">Heading 5</Typography>);
    expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
  });

  it('variant="h6" renders h6 element', () => {
    render(<Typography variant="h6">Heading 6</Typography>);
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });

  it('variant="paragraph-xl" renders p element', () => {
    const { container } = render(
      <Typography variant="paragraph-xl">XL para</Typography>,
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('variant="paragraph-l" renders p element', () => {
    const { container } = render(
      <Typography variant="paragraph-l">L para</Typography>,
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('variant="paragraph-m" renders p element (default)', () => {
    const { container } = render(
      <Typography variant="paragraph-m">M para</Typography>,
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('variant="paragraph-s" renders p element', () => {
    const { container } = render(
      <Typography variant="paragraph-s">S para</Typography>,
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('variant="paragraph-xs" renders p element', () => {
    const { container } = render(
      <Typography variant="paragraph-xs">XS para</Typography>,
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('renders children text content', () => {
    render(<Typography variant="h2">My Heading</Typography>);
    expect(screen.getByText('My Heading')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    const { container } = render(
      <Typography variant="h1" className="custom-class">
        Text
      </Typography>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(
      <Typography variant="h1">Dark Heading</Typography>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

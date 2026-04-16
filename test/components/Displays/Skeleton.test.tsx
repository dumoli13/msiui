import { render } from '@testing-library/react';
import Skeleton from '../../../src/components/Displays/Skeleton';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Skeleton', () => {
  it('renders without errors (default type="circle")', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders type="rounded" without errors', () => {
    const { container } = render(<Skeleton type="rounded" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom width style', () => {
    const { container } = render(<Skeleton width={200} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('200px');
  });

  it('applies custom height style', () => {
    const { container } = render(<Skeleton height={100} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.height).toBe('100px');
  });

  it('Skeleton.Input renders without errors', () => {
    const { container } = render(<Skeleton.Input />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Skeleton.Table renders without errors', () => {
    const { container } = render(<Skeleton.Table />);
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

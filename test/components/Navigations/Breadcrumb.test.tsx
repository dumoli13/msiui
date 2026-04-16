import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumb from '../../../src/components/Navigations/Breadcrumb';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Detail' },
];

describe('Breadcrumb', () => {
  it('renders all breadcrumb item labels', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Detail')).toBeInTheDocument();
  });

  it('items with href render as anchor links', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();
  });

  it('last item renders as plain text (not a link)', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>,
    );
    // "Detail" has no href so it's a div not a link
    expect(
      screen.queryByRole('link', { name: 'Detail' }),
    ).not.toBeInTheDocument();
  });

  it('item without href renders as plain text', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={[{ label: 'No Link' }]} />
      </MemoryRouter>,
    );
    expect(screen.getByText('No Link')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'No Link' }),
    ).not.toBeInTheDocument();
  });

  it('truncates items when count exceeds maxDisplay', () => {
    const manyItems = [
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'D', href: '/d' },
      { label: 'E', href: '/e' },
    ];
    render(
      <MemoryRouter>
        <Breadcrumb items={manyItems} maxDisplay={4} />
      </MemoryRouter>,
    );
    // Ellipsis should be shown
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('shows all items when count is within maxDisplay', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={items} maxDisplay={4} />
      </MemoryRouter>,
    );
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('has aria-label="breadcrumb" on nav element', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('navigation', { name: 'breadcrumb' }),
    ).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

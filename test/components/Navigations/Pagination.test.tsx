import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../../../src/components/Navigations/Pagination';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Pagination', () => {
  it('renders page buttons based on total and pageSize', () => {
    render(
      <Pagination
        total={50}
        currentPage={1}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );
    // 5 pages total; buttons 1..5 rendered
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
  });

  it('current page button is disabled', () => {
    render(
      <Pagination
        total={50}
        currentPage={2}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );
    const page2 = screen.getByRole('button', { name: '2' });
    expect(page2).toBeDisabled();
  });

  it('clicking Next Page calls onPageChange with page+1', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        total={50}
        currentPage={1}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );
    // Find next button specifically
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1]; // last button is Next
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith({ page: 2, limit: 10 });
  });

  it('clicking Prev Page calls onPageChange with page-1', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        total={50}
        currentPage={3}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );
    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0]; // first button is Prev
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith({ page: 2, limit: 10 });
  });

  it('clicking specific page number calls onPageChange', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        total={50}
        currentPage={1}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(onPageChange).toHaveBeenCalledWith({ page: 3, limit: 10 });
  });

  it('Prev button is disabled on first page', () => {
    render(
      <Pagination
        total={50}
        currentPage={1}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
  });

  it('Next button is disabled on last page', () => {
    render(
      <Pagination
        total={50}
        currentPage={5}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1]).toBeDisabled();
  });

  it('ellipsis shown when total pages exceed visible range', () => {
    render(
      <Pagination
        total={100}
        currentPage={1}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('page size dropdown changes limit in onPageChange callback', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        total={100}
        currentPage={1}
        pageSize={10}
        itemPerPage={[10, 20, 50]}
        onPageChange={onPageChange}
      />,
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '20' } });
    expect(onPageChange).toHaveBeenCalledWith({ page: 1, limit: 20 });
  });

  it('hasNext=false disables Next button (cursor-based pagination)', () => {
    render(
      <Pagination
        currentPage={1}
        hasNext={false}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    expect(nextButton).toBeDisabled();
  });

  it('shows entries count text when total is provided', () => {
    render(
      <Pagination
        total={50}
        currentPage={1}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/Showing 1-10 of 50 entries/)).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(
      <Pagination
        total={50}
        currentPage={1}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});

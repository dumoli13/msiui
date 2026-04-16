import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { TableColumn } from '../../../src';
import Table from '../../../src/components/Table/Table';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

interface Row {
  id: number;
  name: string;
  age: number;
}

const columns: TableColumn<Row>[] = [
  { key: 'name' as const, label: 'Name', dataIndex: 'name' as const },
  { key: 'age' as const, label: 'Age', dataIndex: 'age' as const },
];

const data: Row[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

describe('Table', () => {
  it('renders column headers from columns prop', () => {
    render(<Table columns={columns} data={data} dataKey="id" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders data rows from data prop', () => {
    render(<Table columns={columns} data={data} dataKey="id" />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('renders loading skeleton when loading=true', () => {
    const { container } = render(
      <Table columns={columns} data={[]} dataKey="id" loading />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders empty state when data is empty', () => {
    render(<Table columns={columns} data={[]} dataKey="id" />);
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });

  it('custom render function in column definition is applied', () => {
    const customColumns = [
      ...columns,
      {
        key: 'custom' as const,
        label: 'Custom',
        render: (_: unknown, row: Row) => (
          <span data-testid={`custom-${row.id}`}>Custom {row.name}</span>
        ),
      },
    ];
    render(<Table columns={customColumns} data={data} dataKey="id" />);
    expect(screen.getByTestId('custom-1')).toBeInTheDocument();
    expect(screen.getByText('Custom Alice')).toBeInTheDocument();
  });

  it('clicking sortable column header calls onSort', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    const sortableColumns = columns.map((col) => ({ ...col, sortable: true }));
    const { container } = render(
      <Table
        columns={sortableColumns}
        data={data}
        dataKey="id"
        onSort={onSort}
      />,
    );
    // Find the sort button inside the thead (more specific than getAllByRole)
    const sortBtn = container.querySelector('thead button') as HTMLElement;
    await user.click(sortBtn);
    expect(onSort).toHaveBeenCalled();
  });

  it('clicking a row calls onRowClick with row data and index', async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    render(
      <Table
        columns={columns}
        data={data}
        dataKey="id"
        onRowClick={onRowClick}
      />,
    );
    const rows = screen.getAllByRole('row');
    await user.click(rows[1]);
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it('rowClassName callback applies custom class to row', () => {
    const { container } = render(
      <Table
        columns={columns}
        data={data}
        dataKey="id"
        rowClassName={(row) => (row.age > 28 ? 'senior' : 'junior')}
      />,
    );
    const rows = container.querySelectorAll('tr');
    const seniorRows = Array.from(rows).filter((r) =>
      r.className.includes('senior'),
    );
    expect(seniorRows.length).toBeGreaterThan(0);
  });

  it('renders with showSelected=true (checkbox column)', () => {
    const { container } = render(
      <Table
        columns={columns}
        data={data}
        dataKey="id"
        showSelected
        onRowSelect={vi.fn()}
        selectedRows={[]}
      />,
    );
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('Arrow Down key navigation renders without errors', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Table columns={columns} data={data} dataKey="id" onRowClick={vi.fn()} />,
    );
    const tableContainer = container.querySelector(
      '[tabindex="0"]',
    ) as HTMLElement;
    if (tableContainer) {
      tableContainer.focus();
      await user.keyboard('{ArrowDown}');
    }
    expect(container.firstChild).toBeInTheDocument();
  });

  it('pagination renders when paginate=true', () => {
    render(
      <Table
        columns={columns}
        data={data}
        dataKey="id"
        paginate
        total={50}
        onPageChange={vi.fn()}
      />,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('size="large" renders without errors', () => {
    const { container } = render(
      <Table columns={columns} data={data} dataKey="id" size="large" />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('reorderable=true renders without errors', () => {
    const { container } = render(
      <Table
        columns={columns}
        data={data}
        dataKey="id"
        reorderable
        onReorder={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<Table columns={columns} data={data} dataKey="id" />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('rowReorderable=true renders drag handles for each row', () => {
    const { container } = render(
      <Table
        columns={columns}
        data={data}
        dataKey="id"
        rowReorderable
        onRowReorder={vi.fn()}
      />,
    );
    const handles = container.querySelectorAll('[data-row-drag-handle]');
    expect(handles.length).toBe(data.length);
  });

  it('rowReorderable + showSelected renders both grip and checkbox columns', () => {
    const { container } = render(
      <Table
        columns={columns}
        data={data}
        dataKey="id"
        rowReorderable
        onRowReorder={vi.fn()}
        showSelected
        onRowSelect={vi.fn()}
        selectedRows={[]}
      />,
    );
    const firstRow = container.querySelector('tbody tr');
    const cells = firstRow?.querySelectorAll('td');
    // First cell = drag handle, second = checkbox, rest = data
    expect(cells?.length).toBe(columns.length + 2);
  });

  it('rowReorderable=false does not render drag handles', () => {
    const { container } = render(
      <Table columns={columns} data={data} dataKey="id" />,
    );
    const handles = container.querySelectorAll('[data-row-drag-handle]');
    expect(handles.length).toBe(0);
  });
});

/* eslint-disable no-console */
import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Icon,
  IconButton,
  SelectValue,
  Table,
  TableColumn,
  TableProps,
  TableSortingProps,
} from '../../src';
import '../../src/output.css';

type DataType = {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  country: string;
};
type FilterProps = {
  name: string;
  email: string;
  age: string;
  gender: SelectValue<string> | null;
  country: SelectValue<string> | null;
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<TableProps<DataType, keyof DataType>> = {
  title: 'Display/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'A flexible and customizable table component designed to display a floating or dropdown-like content relative to a target element. It can handle positioning and alignment adjustments, including dynamic changes due to screen resizing or scrolling. The table can also be toggled open or closed, and it supports detecting clicks outside the table to close it automatically.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: false,
      description:
        'An array of column configurations, where each column can define its label, key, filter type, sortability, and rendering logic.',
      table: {
        type: { summary: 'TableColumn<T>[]' },
      },
    },
    data: {
      control: 'object',
      description:
        'The array of data rows to display in the table. Each object in the array should align with the column definitions.',
      table: {
        type: { summary: 'T[]' },
      },
    },
    stickyHeader: {
      control: 'boolean',
      description:
        'If `true`, the table header will remain fixed at the top when scrolling. If `true`, make sure to set table maxHeight.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    reorderable: {
      control: 'boolean',
      description:
        'If `true`, allows reordering of columns by dragging and dropping.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    maxHeight: {
      control: 'text',
      description:
        "The maximum height of the table's scrollable area. Applies only when `stickyHeader` is `true`.",
      table: {
        defaultValue: { summary: '680' },
        type: { summary: 'number' },
      },
    },
    selectedRows: {
      control: false,
      description:
        'An array of indices for the selected rows. Enables controlled row selection.',
      table: {
        type: { summary: 'T[K][]' },
      },
    },
    onRowSelect: {
      action: false,
      description:
        'Callback triggered when a row is selected or deselected. Provides the index of the row, its new selected state, and the updated selected rows array.',
      table: {
        type: {
          summary:
            '(row: number, value: boolean, selectedRows: T[K][]) => void',
        },
      },
    },
    sorting: {
      control: false,
      description:
        'Initial sorting configuration. Defines the key to sort by and the direction (`asc`, `desc`, or `null`).',
      table: {
        type: { summary: 'TableSortingProps<T>' },
      },
    },
    onSort: {
      action: false,
      description:
        'Callback triggered when a column header is clicked for sorting. Provides the new sorting configuration.',
      table: {
        type: { summary: '(sort: TableSortingProps<T>) => void' },
      },
    },
    rowClassName: {
      control: false,
      description:
        'Function to determine the className of a row. Returns `string` to apply custom styling.',
      table: {
        type: { summary: '(record: T) => string' },
      },
    },
    rowStyle: {
      control: false,
      description:
        'Function to determine the style of a row. Returns `CSSProperties` to apply custom styling.',
      table: {
        type: { summary: '(record: T) => CSSProperties' },
      },
    },
    fullwidth: {
      control: 'boolean',
      description:
        'If `true`, the table spans the full width of its container.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    showSelected: {
      control: 'boolean',
      description:
        'If `true`, includes a column for row selection with checkboxes.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Determines the size of the table cells and typography.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: '"small" | default" | "large"' },
      },
    },
    verticalAlign: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
      description:
        'Controls the vertical alignment of cell content. Defaults to `top`.',
      table: {
        defaultValue: { summary: 'top' },
        type: { summary: '"top" | "center" | "bottom"' },
      },
    },
    style: {
      control: 'select',
      options: ['simple', 'default'],
      description: 'Determines the style of the table.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: '"default" | "simple"' },
      },
    },
    rowReorderable: {
      control: 'boolean',
      description:
        'If `true`, allows reordering of rows by dragging and dropping.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onRowReorder: {
      action: false,
      description:
        'Callback triggered after a row drag-and-drop completes. Receives the new row array.',
      table: {
        type: { summary: '(rows: T[]) => void' },
      },
    },
  },
  args: {
    dataKey: 'id',
    size: 'default',
    style: 'default',
    verticalAlign: 'top',
    stickyHeader: true,
    maxHeight: '300px',
  },
};

export default meta;
type Story = StoryObj<TableProps<DataType, keyof DataType>>;

const data = [
  {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    age: 30,
    gender: 'male',
    country: 'India',
  },
  {
    id: 2,
    name: 'Jane',
    email: 'jane@example.com',
    age: 25,
    gender: 'female',
    country: 'UK',
  },
  {
    id: 3,
    name: 'Bob',
    email: 'bob@example.com',
    age: 35,
    gender: 'male',
    country: 'USA',
  },
  {
    id: 4,
    name: 'Alice',
    email: 'alice@example.com',
    age: 40,
    gender: 'female',
    country: 'India',
  },
  {
    id: 5,
    name: 'Ridwan',
    email: 'ridwan@example.com',
    age: 31,
    gender: 'male',
    country: 'UK',
  },
  {
    id: 6,
    name: 'Oliver',
    email: 'oliver@example.com',
    age: 42,
    gender: 'male',
    country: 'USA',
  },
  {
    id: 7,
    name: 'Sophia',
    email: 'sophia@example.com',
    age: 22,
    gender: 'female',
    country: 'UK',
  },
  {
    id: 8,
    name: 'Liam',
    email: 'liam@example.com',
    age: 33,
    gender: 'male',
    country: 'India',
  },
  {
    id: 9,
    name: 'Emma',
    email: 'emma@example.com',
    age: 44,
    gender: 'female',
    country: 'USA',
  },
  {
    id: 10,
    name: 'Noah',
    email: 'noah@example.com',
    age: 32,
    gender: 'male',
    country: 'India',
  },
];

export const Playground: Story = {
  args: {
    fullwidth: false,
    reorderable: true,
  },
  render: (args: TableProps<DataType, keyof DataType>) => {
    const [sort, setSort] = useState<TableSortingProps<DataType>>({
      key: 'name',
      direction: null,
    });

    const [filter, setFilter] = useState<FilterProps>({
      name: '',
      email: '',
      age: '',
      gender: null,
      country: null,
    });

    const columns: TableColumn<DataType>[] = [
      {
        key: 'id',
        label: 'ID',
        dataIndex: 'id',
        width: '80px',
      },
      {
        key: 'name',
        label: 'Name',
        subLabel: <div className="text-12px">Sub Label</div>,
        dataIndex: 'name',
        width: 200,
        filter: 'textfield',
        filterValue: filter.name,
        onChange: (value) => setFilter({ ...filter, name: value }),
      },
      {
        key: 'email',
        label: 'Email',
        dataIndex: 'email',
        sortable: true,
        width: '25%',
        filter: 'textfield',
        filterValue: filter.email,
        onChange: (value) => setFilter({ ...filter, email: value }),
        render: (value) => <a href={`mailto:${value}`}>{value}</a>,
      },
      {
        key: 'age',
        label: 'Age',
        dataIndex: 'age',
        sortable: true,
        width: '25%',
        align: 'right',
        filter: 'textfield',
        filterValue: filter.age,
        onChange: (value) => setFilter({ ...filter, age: value }),
        render: (value) => `${value} years`,
      },
      {
        key: 'gender',
        label: 'Gender',
        dataIndex: 'gender',
        sortable: true,
        width: '20%',
        align: 'right',
        filter: 'select',
        filterValue: filter.gender,
        option: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
        onChange: (value) => setFilter({ ...filter, gender: value }),
      },
      {
        key: 'country',
        label: 'Country',
        dataIndex: 'country',
        sortable: true,
        width: '30%',
        filter: 'autocomplete',
        filterValue: filter.country,
        option: [
          { label: 'USA', value: 'USA' },
          { label: 'UK', value: 'UK' },
          { label: 'India', value: 'India' },
        ],
        onChange: (value) => setFilter({ ...filter, country: value }),
      },
    ];

    const parsedData = useMemo(
      () =>
        data
          .filter((item) => {
            const { name, email, age, gender, country } = filter;

            let included = true;
            if (included && name) {
              included = item.name.toLowerCase().includes(name.toLowerCase());
            }
            if (included && email) {
              included = item.email.toLowerCase().includes(email.toLowerCase());
            }
            if (included && age) {
              included = item.age
                .toString()
                .toLowerCase()
                .includes(age.toLowerCase());
            }
            if (included && gender) {
              included = item.gender === gender.value;
            }
            if (included && country) {
              included = item.country === country.value;
            }

            return included;
          })
          .sort((a, b) => {
            if (!sort.direction) return 0;
            if (sort.key === 'name') {
              return sort.direction === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            }
            if (sort.key === 'email') {
              return sort.direction === 'asc'
                ? a.email.localeCompare(b.email)
                : b.email.localeCompare(a.email);
            }
            if (sort.key === 'age') {
              return sort.direction === 'asc' ? a.age - b.age : b.age - a.age;
            }
            if (sort.key === 'gender') {
              return sort.direction === 'asc'
                ? a.gender.localeCompare(b.gender)
                : b.gender.localeCompare(a.gender);
            }
            if (sort.key === 'country') {
              return sort.direction === 'asc'
                ? a.country.localeCompare(b.country)
                : b.country.localeCompare(a.country);
            }
            return 0;
          }),
      [data, sort, filter],
    );

    return (
      <div className="flex" style={{ width: 920 }}>
        <Table
          {...args}
          columns={columns}
          data={parsedData}
          onSort={setSort}
          sorting={sort}
        />
      </div>
    );
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    onSort: { control: false },
    sorting: { control: false },
    showSelected: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'Tables display sets of data. They can be fully customized.',
      },
      source: {
        code: `
import { useState } from 'react';

type DataType = {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    country: string;
}
type FilterProps = {
    name: string;
    email: string;
    age: string;
    gender: SelectValue<string> | null;
    country: SelectValue<string> | null
}
const data = [
    { id: 1, name: 'John', email: 'john@example.com', age: 30, gender: 'male', country: 'India' },
    { id: 2, name: 'Jane', email: 'jane@example.com', age: 25, gender: 'female', country: 'UK' },
    { id: 3, name: 'Bob', email: 'bob@example.com', age: 35, gender: 'male', country: 'USA' },
    { id: 4, name: 'Alice', email: 'alice@example.com', age: 40, gender: 'female', country: 'India' },
    { id: 5, name: 'Ridwan', email: 'ridwan@example.com', age: 31, gender: 'male', country: 'UK' },
];

const Playground = () => {
    const [sort, setSort] = useState<TableSortingProps<DataType>>({
        key: 'name',
        direction: null,
    });

    const [filter, setFilter] = useState<>({
        name: '',
        email: '',
        age: '',
        gender: null,
        country: null
    });


    const columns: TableColumn<DataType>[] = [
        {
            key: 'id',
            label: 'ID',
            dataIndex: 'id',
            width: '80px',
        },
        {
            key: 'name',
            label: 'Name',
            dataIndex: 'name',
            sortable: true,
            width: 200,
            filter: 'textfield',
            filterValue: filter.name,
            onChange: (value) => setFilter({ ...filter, name: value }),
        },
        {
            key: 'email',
            label: 'Email',
            dataIndex: 'email',
            sortable: true,
            width: '25%',
            filter: 'textfield',
            filterValue: filter.email,
            onChange: (value) => setFilter({ ...filter, email: value }),
        },
        {
            key: 'age',
            label: 'Age',
            dataIndex: 'age',
            sortable: true,
            width: '25%',
            filter: 'textfield',
            filterValue: filter.age,
            onChange: (value) => setFilter({ ...filter, age: value }),
            render: (value) => value + ' years',
        },
        {
            key: 'gender',
            label: 'Gender',
            dataIndex: 'gender',
            sortable: true,
            width: '20%',
            filter: 'select',
            filterValue: filter.gender,
            option: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }],
            onChange: (value) => setFilter({ ...filter, gender: value }),
        },
        {
            key: 'country',
            label: 'Country',
            dataIndex: 'country',
            sortable: true,
            width: '30%',
            filter: 'autocomplete',
            filterValue: filter.country,
            option: [{ label: 'USA', value: 'USA' }, { label: 'UK', value: 'UK' }, { label: 'India', value: 'India' }],
            onChange: (value) => setFilter({ ...filter, country: value }),
        }

    ];

    const parsedData = useMemo(() => data.filter(item => {
        const { name, email, age, gender, country } = filter;

        let included = true;
        if (included && name) {
            included = item.name.toLowerCase().includes(name.toLowerCase());
        }
        if (included && email) {
            included = item.email.toLowerCase().includes(email.toLowerCase());
        }
        if (included && age) {
            included = item.age.toString().toLowerCase().includes(age.toLowerCase());
        }
        if (included && gender) {
            included = item.gender === gender.value;
        }
        if (included && country) {
            included = item.country === country.value;
        }

        return included
    }).sort((a, b) => {
        if (!sort.direction) return 0;
        if (sort.key === 'name') {
            return sort.direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        if (sort.key === 'email') {
            return sort.direction === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
        }
        if (sort.key === 'age') {
            return sort.direction === 'asc' ? a.age - b.age : b.age - a.age;
        }
        if (sort.key === 'gender') {
            return sort.direction === 'asc' ? a.gender.localeCompare(b.gender) : b.gender.localeCompare(a.gender);
        }
        if (sort.key === 'country') {
            return sort.direction === 'asc' ? a.country.localeCompare(b.country) : b.country.localeCompare(a.country);
        }
        return 0;
    }), [data, sort, filter])

    return (
        <div className="flex" style={{ width: 920 }}>
            <Table
                columns={columns}
                data={parsedData}
                onSort={setSort}
                sorting={sort}
            />
        </div>
    );
};

export default Playground;
          `.trim(),
      },
    },
  },
};

export const ShowSelection: Story = {
  args: {
    fullwidth: true,
    stickyHeader: false,
  },
  render: (args: TableProps<DataType, keyof DataType>) => {
    const allData: DataType[] = [
      ...data,
      {
        id: 11,
        name: 'Mia',
        email: 'mia@example.com',
        age: 27,
        gender: 'female',
        country: 'USA',
      },
      {
        id: 12,
        name: 'James',
        email: 'james@example.com',
        age: 38,
        gender: 'male',
        country: 'UK',
      },
      {
        id: 13,
        name: 'Ella',
        email: 'ella@example.com',
        age: 29,
        gender: 'female',
        country: 'India',
      },
      {
        id: 14,
        name: 'Lucas',
        email: 'lucas@example.com',
        age: 45,
        gender: 'male',
        country: 'USA',
      },
      {
        id: 15,
        name: 'Grace',
        email: 'grace@example.com',
        age: 23,
        gender: 'female',
        country: 'UK',
      },
    ];

    const PAGE_SIZE = 5;

    const columns: TableColumn<DataType>[] = [
      {
        key: 'id',
        label: 'ID',
        dataIndex: 'id',
        width: 80,
      },
      {
        key: 'name',
        label: 'Name',
        dataIndex: 'name',
        width: 160,
      },
      {
        key: 'email',
        label: 'Email',
        dataIndex: 'email',
        width: 250,
      },
      {
        key: 'age',
        label: 'Age',
        dataIndex: 'age',
        width: 80,
        align: 'right',
      },
      {
        key: 'country',
        label: 'Country',
        dataIndex: 'country',
        width: 120,
      },
      {
        key: 'action',
        label: 'Action',
        width: 80,
        render: () => (
          <IconButton
            icon={<Icon name="printer" size={24} />}
            title="Edit"
            color="primary"
            size="large"
          />
        ),
      },
    ];

    const [page, setPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const pageData = allData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleRowSelect = (
      row: number,
      value: boolean,
      selectedRows: number[],
    ) => {
      console.log('handle row select', row, value, selectedRows);
      setSelectedRows(selectedRows);
    };

    const handleRowClick = (record: DataType, index: number) => {
      console.log('handle row click', record, index);
    };

    return (
      <div style={{ width: 920 }}>
        {selectedRows.length > 0 && (
          <p className="mb-2 text-14px text-neutral-60 dark:text-neutral-60-dark">
            Selected IDs: {selectedRows.join(', ')}
          </p>
        )}
        <Table
          {...args}
          dataKey="id"
          columns={columns}
          data={pageData}
          showSelected
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onRowClick={handleRowClick}
          paginate
          total={allData.length}
          pagination={{ page, limit: PAGE_SIZE }}
          onPageChange={(p) => setPage(p.page)}
        />
      </div>
    );
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table with row selection checkboxes and pagination. Selections persist across pages, and the header checkbox reflects only the current page. 15 rows across 3 pages (5 per page).',
      },
      source: {
        code: `
import { useState } from 'react';

type DataType = {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    country: string;
}
const allData: DataType[] = [ /* 15 items */ ];
const PAGE_SIZE = 5;

const ShowSelection = () => {
    const [page, setPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const pageData = allData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const columns: TableColumn<DataType>[] = [
        { key: 'id', label: 'ID', dataIndex: 'id', width: 80 },
        { key: 'name', label: 'Name', dataIndex: 'name', width: 160 },
        { key: 'email', label: 'Email', dataIndex: 'email', width: 250 },
        { key: 'age', label: 'Age', dataIndex: 'age', width: 80 },
        { key: 'country', label: 'Country', dataIndex: 'country', width: 120 },
    ];

    return (
        <Table
            dataKey="id"
            columns={columns}
            data={pageData}
            showSelected
            selectedRows={selectedRows}
            onRowSelect={(_row, _value, rows) => setSelectedRows(rows)}
            paginate
            total={allData.length}
            pagination={{ page, limit: PAGE_SIZE }}
            onPageChange={(p) => setPage(p.page)}
            fullwidth
        />
    );
};

export default ShowSelection;
          `.trim(),
      },
    },
  },
};

export const CustomRowStyle: Story = {
  args: {
    fullwidth: true,
    data: data,
  },
  render: (args: TableProps<DataType, keyof DataType>) => {
    const columns: TableColumn<DataType>[] = [
      {
        key: 'id',
        label: 'ID',
        dataIndex: 'id',
        width: '80px',
      },
      {
        key: 'name',
        label: 'Name',
        dataIndex: 'name',
      },
      {
        key: 'age',
        label: 'Age',
        dataIndex: 'age',
      },
    ];

    const handleRowClassName = (record: DataType) => {
      if (record.age < 30) {
        return 'bg-danger-surface dark:bg-danger-surface-dark hover:bg-danger-border/20 dark:hover:bg-danger-border/20-dark';
      }
      if (record.age > 40) {
        return 'bg-warning-surface dark:bg-warning-surface-dark hover:bg-warning-border/20 dark:hover:bg-warning-border/20-dark';
      }
      return '';
    };

    return (
      <div className="flex flex-col items-start" style={{ width: 920 }}>
        <div className="mb-2">Show Error if Age less than 30 years old</div>
        <Table
          {...args}
          columns={columns}
          data={data}
          rowClassName={handleRowClassName}
        />
      </div>
    );
  },
  argTypes: {
    columns: { control: false },
    showSelected: { control: false },
  },
  parameters: {
    docs: {
      source: {
        code: `
import { useState } from 'react';

type DataType = {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    country: string;
}
const data = [
    { id: 1, name: 'John', email: 'john@example.com', age: 30, gender: 'male', country: 'India' },
    { id: 2, name: 'Jane', email: 'jane@example.com', age: 25, gender: 'female', country: 'UK' },
    { id: 3, name: 'Bob', email: 'bob@example.com', age: 35, gender: 'male', country: 'USA' },
    { id: 4, name: 'Alice', email: 'alice@example.com', age: 40, gender: 'female', country: 'India' },
    { id: 5, name: 'Ridwan', email: 'ridwan@example.com', age: 31, gender: 'male', country: 'UK' },
];

const Playground = () => {
    const columns: TableColumn<DataType>[] = [
        {
            key: 'id',
            label: 'ID',
            dataIndex: 'id',
            width: '80px',
        },
        {
            key: 'name',
            label: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'age',
            label: 'Age',
            dataIndex: 'age',
        },
    ];

    const handleRowClassName = (record: DataType) => {
        if(record.age < 30){
            return 'bg-danger-surface dark:bg-danger-surface-dark hover:bg-danger-border/20 dark:hover:bg-danger-border/20-dark'
        }
        if(record.age > 40){
            return 'bg-warning-surface dark:bg-warning-surface-dark hover:bg-warning-border/20 dark:hover:bg-warning-border/20-dark'
        }
        return ''
    }

    return (
        <div className="flex flex-col items-start" style={{ width: 920 }}>
            <div className="mb-2">Show Error if Age less than 30 years old</div>
            <Table
                {...args}
                columns={columns}
                data={data}
                rowClassName={handleRowClassName}
            />
        </div>
    );
};

export default Playground;
          `.trim(),
      },
    },
  },
};

export const OnRowClick: Story = {
  args: {
    fullwidth: false,
  },
  render: (args: TableProps<DataType, keyof DataType>) => {
    const columns: TableColumn<DataType>[] = [
      {
        key: 'id',
        label: 'ID',
        dataIndex: 'id',
        width: '80px',
      },
      {
        key: 'name',
        label: 'Name',
        subLabel: <div className="text-12px">Sub Label</div>,
        dataIndex: 'name',
        width: 200,
      },
      {
        key: 'email',
        label: 'Email',
        dataIndex: 'email',
        width: '25%',
      },
      {
        key: 'age',
        label: 'Age',
        dataIndex: 'age',
        width: '25%',
        align: 'right',
        render: (value) => `${value} years`,
      },
      {
        key: 'gender',
        label: 'Gender',
        dataIndex: 'gender',
        width: '20%',
        align: 'right',
      },
      {
        key: 'country',
        label: 'Country',
        sortable: true,
        width: '30%',
      },
    ];

    const handleRowClick = (record: DataType, index: number) => {
      console.log(record, index);
    };

    return (
      <div className="flex" style={{ width: 920 }}>
        <Table
          {...args}
          columns={columns}
          data={data}
          onRowClick={handleRowClick}
        />
      </div>
    );
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    onSort: { control: false },
    sorting: { control: false },
    showSelected: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'Tables display sets of data. They can be fully customized.',
      },
      source: {
        code: `
import { useState } from 'react';

type DataType = {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    country: string;
}

const data = [
    { id: 1, name: 'John', email: 'john@example.com', age: 30, gender: 'male', country: 'India' },
    { id: 2, name: 'Jane', email: 'jane@example.com', age: 25, gender: 'female', country: 'UK' },
    { id: 3, name: 'Bob', email: 'bob@example.com', age: 35, gender: 'male', country: 'USA' },
    { id: 4, name: 'Alice', email: 'alice@example.com', age: 40, gender: 'female', country: 'India' },
    { id: 5, name: 'Ridwan', email: 'ridwan@example.com', age: 31, gender: 'male', country: 'UK' },
];

const Playground = () => {
    const columns: TableColumn<DataType>[] = [
        {
            key: 'id',
            label: 'ID',
            dataIndex: 'id',
            width: '80px',
        },
        {
            key: 'name',
            label: 'Name',
            dataIndex: 'name',
            width: 200,
        },
        {
            key: 'email',
            label: 'Email',
            dataIndex: 'email',
             width: '25%',
        },
        {
            key: 'age',
            label: 'Age',
            dataIndex: 'age',
             width: '25%',
            render: (value) => value + ' years',
        },
        {
            key: 'gender',
            label: 'Gender',
            dataIndex: 'gender',
             width: '20%',
        },
        {
            key: 'country',
            label: 'Country',
            dataIndex: 'country',
             width: '30%',
        }
    ];

    const handleRowClick = (record: DataType, index) => {
        console.log(record, index);
    }


    return (
        <div className="flex" style={{ width: 920 }}>
            <Table
                columns={columns}
                data={data}
                onRowClick={handleRowClick}
            />
        </div>
    );
};

export default Playground;
          `.trim(),
      },
    },
  },
};

export const RowReorderableTable: Story = {
  args: {
    rowReorderable: true,
    stickyHeader: true,
    maxHeight: '300px',
  },
  render: (args: TableProps<DataType, keyof DataType>) => {
    const [rowOrder, setRowOrder] = React.useState<string[]>([]);

    const columns: TableColumn<DataType>[] = [
      { key: 'id', label: 'ID', dataIndex: 'id', width: 80 },
      { key: 'name', label: 'Name', dataIndex: 'name', width: 150 },
      { key: 'email', label: 'Email', dataIndex: 'email', width: 220 },
      { key: 'age', label: 'Age', dataIndex: 'age', width: 80 },
      { key: 'gender', label: 'Gender', dataIndex: 'gender', width: 100 },
      { key: 'country', label: 'Country', dataIndex: 'country', width: 120 },
    ];

    return (
      <div className="flex flex-col gap-3" style={{ width: 760 }}>
        {rowOrder.length > 0 && (
          <div className="text-14px text-neutral-60 dark:text-neutral-60-dark">
            Row order: {rowOrder.join(' → ')}
          </div>
        )}
        <Table
          {...args}
          columns={columns}
          data={data}
          fullwidth
          onRowReorder={(rows) => setRowOrder(rows.map((r) => r.name))}
        />
      </div>
    );
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    showSelected: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Drag the grab handle on any row to reorder it. The `onRowReorder` callback receives the new row array after each drop.',
      },
    },
  },
};

export const FreezeColumns: Story = {
  args: {
    loading: false,
    freezeLeftColumns: 3,
    freezeRightColumns: 1,
  },

  render: (args: TableProps<DataType, keyof DataType>) => {
    const columns: TableColumn<DataType>[] = [
      { key: 'id', label: 'ID', dataIndex: 'id', width: 70 },
      { key: 'name', label: 'Name', dataIndex: 'name', width: 150 },
      { key: 'email', label: 'Email', dataIndex: 'email', width: 220 },
      { key: 'age', label: 'Age', dataIndex: 'age', width: 80 },
      { key: 'gender', label: 'Gender', dataIndex: 'gender', width: 100 },
      { key: 'country', label: 'Country', dataIndex: 'country', width: 120 },
    ];

    return (
      <div style={{ width: 500 }}>
        <Table
          {...args}
          columns={columns}
          data={data}
          stickyHeader
          maxHeight="300px"
          fullwidth
        />
      </div>
    );
  },

  parameters: {
    docs: {
      description: {
        story:
          'Use `freezeLeftColumns` and `freezeRightColumns` to pin columns on either side while the table scrolls horizontally. The checkbox column (when `showSelected` is enabled) is always frozen to the left automatically.',
      },
    },
  },
};

export const FreezeRows: Story = {
  render: (args: TableProps<DataType, keyof DataType>) => {
    const columns: TableColumn<DataType>[] = [
      { key: 'id', label: 'ID', dataIndex: 'id' },
      { key: 'name', label: 'Name', dataIndex: 'name' },
      { key: 'email', label: 'Email', dataIndex: 'email' },
      { key: 'age', label: 'Age', dataIndex: 'age' },
      { key: 'gender', label: 'Gender', dataIndex: 'gender' },
      { key: 'country', label: 'Country', dataIndex: 'country' },
    ];

    return (
      <div style={{ width: 800 }}>
        <Table
          {...args}
          columns={columns}
          data={data}
          stickyHeader
          maxHeight="400px"
          fullwidth
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `freezeTopRows` and `freezeBottomRows` to pin rows at the top or bottom of the scroll area. Requires `stickyHeader` or a `maxHeight` to be effective.',
      },
    },
  },
};

export const FreezeColumnsAndRows: Story = {
  render: (args: TableProps<DataType, keyof DataType>) => {
    const columns: TableColumn<DataType>[] = [
      { key: 'id', label: 'ID', dataIndex: 'id', width: 70 },
      { key: 'name', label: 'Name', dataIndex: 'name', width: 150 },
      { key: 'email', label: 'Email', dataIndex: 'email', width: 220 },
      { key: 'age', label: 'Age', dataIndex: 'age', width: 80 },
      { key: 'gender', label: 'Gender', dataIndex: 'gender', width: 100 },
      { key: 'country', label: 'Country', dataIndex: 'country', width: 120 },
    ];

    return (
      <div style={{ width: 520 }}>
        <Table
          {...args}
          columns={columns}
          data={data}
          stickyHeader
          maxHeight="400px"
          freezeLeftColumns={1}
          freezeRightColumns={1}
          freezeTopRows={1}
          freezeBottomRows={1}
          fullwidth
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Combines all four freeze directions at once. Scroll horizontally to see the ID and Country columns stay pinned. Scroll vertically to see the first and last rows stay pinned. Combined with `stickyHeader`, corner cells are frozen on both axes simultaneously.',
      },
    },
  },
};

export const ReorderableTable: Story = {
  args: {
    reorderable: true,
    stickyHeader: true,
    maxHeight: '300px',
  },
  render: (args: TableProps<DataType, keyof DataType>) => {
    const [columnOrder, setColumnOrder] = React.useState<string[]>([]);

    const columns: TableColumn<DataType>[] = [
      { key: 'id', label: 'ID', dataIndex: 'id', width: 80 },
      { key: 'name', label: 'Name', dataIndex: 'name', width: 150 },
      { key: 'email', label: 'Email', dataIndex: 'email', width: 220 },
      { key: 'age', label: 'Age', dataIndex: 'age', width: 80 },
      { key: 'gender', label: 'Gender', dataIndex: 'gender', width: 100 },
      { key: 'country', label: 'Country', dataIndex: 'country', width: 120 },
    ];

    return (
      <div className="flex flex-col gap-3" style={{ width: 760 }}>
        {columnOrder.length > 0 && (
          <div className="text-14px text-neutral-60 dark:text-neutral-60-dark">
            Column order: {columnOrder.join(' → ')}
          </div>
        )}
        <Table
          {...args}
          columns={columns}
          data={data}
          fullwidth
          onReorder={(cols) => setColumnOrder(cols.map((c) => String(c.label)))}
        />
      </div>
    );
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    showSelected: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Drag the grab handle on any column header to reorder columns. The `onReorder` callback receives the new column array after each drop.',
      },
    },
  },
};

export const ReorderableWithSelection: Story = {
  args: {
    reorderable: true,
    showSelected: true,
    stickyHeader: true,
  },
  render: (args: TableProps<DataType, keyof DataType>) => {
    const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

    const columns: TableColumn<DataType>[] = [
      { key: 'id', label: 'ID', dataIndex: 'id', width: 80 },
      { key: 'name', label: 'Name', dataIndex: 'name', width: 150 },
      { key: 'email', label: 'Email', dataIndex: 'email', width: 220 },
      { key: 'age', label: 'Age', dataIndex: 'age', width: 80 },
      { key: 'gender', label: 'Gender', dataIndex: 'gender', width: 100 },
      {
        key: 'country',
        label:
          'A Very Very Long Label for Country Name for Testing Purpose. We Need To Make Two Line At Least or Three Rows For Best Result',
        dataIndex: 'country',
      },
    ];

    return (
      <div className="flex flex-col gap-3">
        {selectedRows.length > 0 && (
          <div className="text-14px text-neutral-60 dark:text-neutral-60-dark">
            Selected IDs: {selectedRows.join(', ')}
          </div>
        )}
        <Table
          {...args}
          columns={columns}
          data={data}
          fullwidth
          selectedRows={selectedRows}
          onRowSelect={(_row, _value, rows) =>
            setSelectedRows(rows as number[])
          }
        />
      </div>
    );
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Combines column drag-and-drop reordering with row selection checkboxes. The checkbox column is always pinned to the left and cannot be reordered.',
      },
    },
  },
};

export const ReorderableWithFreeze: Story = {
  args: {
    reorderable: true,
    freezeLeftColumns: 2,
    freezeRightColumns: 1,
    stickyHeader: true,
    maxHeight: '300px',
  },
  render: (args: TableProps<DataType, keyof DataType>) => {
    const columns: TableColumn<DataType>[] = [
      { key: 'id', label: 'ID', dataIndex: 'id', width: 70 },
      { key: 'name', label: 'Name', dataIndex: 'name', width: 150 },
      { key: 'email', label: 'Email', dataIndex: 'email', width: 220 },
      { key: 'age', label: 'Age', dataIndex: 'age', width: 80 },
      { key: 'gender', label: 'Gender', dataIndex: 'gender', width: 100 },
      { key: 'country', label: 'Country', dataIndex: 'country', width: 120 },
    ];

    return (
      <div style={{ width: 480 }}>
        <Table {...args} columns={columns} data={data} fullwidth />
      </div>
    );
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    showSelected: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Reorderable columns combined with frozen columns. Frozen columns (ID, Name on the left; Country on the right) show a disabled drag handle and cannot be moved. Only the middle columns can be reordered.',
      },
    },
  },
};

export const SelectionWithPagination: Story = {
  render: () => {
    const allData: DataType[] = [
      ...data,
      {
        id: 11,
        name: 'Mia',
        email: 'mia@example.com',
        age: 27,
        gender: 'female',
        country: 'USA',
      },
      {
        id: 12,
        name: 'James',
        email: 'james@example.com',
        age: 38,
        gender: 'male',
        country: 'UK',
      },
      {
        id: 13,
        name: 'Ella',
        email: 'ella@example.com',
        age: 29,
        gender: 'female',
        country: 'India',
      },
      {
        id: 14,
        name: 'Lucas',
        email: 'lucas@example.com',
        age: 45,
        gender: 'male',
        country: 'USA',
      },
      {
        id: 15,
        name: 'Grace',
        email: 'grace@example.com',
        age: 23,
        gender: 'female',
        country: 'UK',
      },
    ];

    const PAGE_SIZE = 5;
    const columns: TableColumn<DataType>[] = [
      { key: 'id', label: 'ID', dataIndex: 'id', width: 80 },
      { key: 'name', label: 'Name', dataIndex: 'name', width: 160 },
      { key: 'email', label: 'Email', dataIndex: 'email', width: 250 },
      { key: 'age', label: 'Age', dataIndex: 'age', width: 80 },
      { key: 'country', label: 'Country', dataIndex: 'country', width: 120 },
    ];

    const [page, setPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const pageData = allData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
      <div style={{ width: 920 }}>
        <p className="mb-2 text-14px text-neutral-60">
          Selected IDs:{' '}
          {selectedRows.length > 0 ? selectedRows.join(', ') : '—'}
        </p>
        <Table
          dataKey="id"
          columns={columns}
          data={pageData}
          showSelected
          selectedRows={selectedRows}
          onRowSelect={(_row, _value, rows) => setSelectedRows(rows)}
          paginate
          total={allData.length}
          pagination={{ page, limit: PAGE_SIZE }}
          onPageChange={(p) => setPage(p.page)}
          stickyHeader={false}
          size="default"
          style="default"
          fullwidth
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates page-aware header checkbox: selections persist across pages, and the header reflects only the current page's selection state. Select rows on page 1, navigate to page 2 — page 1 selections are preserved and the header is unchecked.",
      },
    },
  },
};

export const ExpandableRow: Story = {
  args: {
    fullwidth: false,
    data,
  },
  render: (args: TableProps<DataType, keyof DataType>) => {
    const columns: TableColumn<DataType>[] = [
      { key: 'id', label: 'ID', dataIndex: 'id', width: 80 },
      { key: 'name', label: 'Name', dataIndex: 'name', width: 150 },
      { key: 'email', label: 'Email', dataIndex: 'email', width: 250 },
      { key: 'age', label: 'Age', dataIndex: 'age', width: 80 },
      { key: 'country', label: 'Country', dataIndex: 'country', width: 120 },
    ];

    const [expandedKeys, setExpandedKeys] = useState<number[]>([]);

    return (
      <div className="flex" style={{ width: 920 }}>
        <Table
          {...args}
          dataKey="id"
          columns={columns}
          data={data}
          expandable
          expandedRowKeys={expandedKeys}
          onExpandRow={(expanded, _record, key) => {
            setExpandedKeys((prev) =>
              expanded ? [...prev, key] : prev.filter((k) => k !== key),
            );
          }}
          renderExpandedRow={(record) => (
            <div className="p-2">
              <p className="font-medium mb-2">Details for {record.name}</p>
              <Table
                dataKey="id"
                columns={[
                  { key: 'field', label: 'Field', dataIndex: 'field' as never },
                  { key: 'value', label: 'Value', dataIndex: 'value' as never },
                ]}
                data={
                  [
                    { id: 1, field: 'Full Name', value: record.name },
                    { id: 2, field: 'Email', value: record.email },
                    { id: 3, field: 'Age', value: String(record.age) },
                    { id: 4, field: 'Gender', value: record.gender },
                    { id: 5, field: 'Country', value: record.country },
                  ] as never[]
                }
                size="small"
              />
            </div>
          )}
        />
      </div>
    );
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    showSelected: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Expandable rows allow rendering custom content (tables, forms, etc.) beneath each row. Click the chevron or press Space on a highlighted row to toggle. The expand button position mirrors the groupable table chevron.',
      },
    },
  },
};

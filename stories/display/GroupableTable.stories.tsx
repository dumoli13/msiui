/* eslint-disable no-console */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  PaginationDataType,
  Table,
  TableColumn,
  TableGroupNode,
  TableProps,
  Tag,
  updateGroupAtPath,
} from '../../src';
import '../../src/output.css';

type ProductionOrder = {
  id: string;
  productionOrderNo: string;
  parentPro: string;
  partNo: string;
  status: string;
  productionQty: number;
  orderType: string;
  plant: { code: string; name: string };
  estStartDate: string;
  estEndDate: string;
};

const columns: TableColumn<ProductionOrder>[] = [
  {
    key: 'productionOrderNo',
    label: 'Production Order No',
    dataIndex: 'productionOrderNo',
    sortable: true,
  },
  {
    key: 'parentPro',
    label: 'Parent Pro',
    dataIndex: 'parentPro',
    // render: (value) => <Tag color="danger">{value}</Tag>,
  },
  { key: 'partNo', label: 'Part No', dataIndex: 'partNo' },
  { key: 'status', label: 'Status', dataIndex: 'status' },
  {
    key: 'productionQty',
    label: 'Production Qty',
    dataIndex: 'productionQty',
    align: 'right',
  },
  { key: 'orderType', label: 'Order Type', dataIndex: 'orderType' },
  {
    key: 'plant',
    label: 'Plant',
    dataIndex: 'plant',
    render: (value) => <Tag>{`${value.code} - ${value.name}`}</Tag>,
  },
  { key: 'estStartDate', label: 'Est. Start Date', dataIndex: 'estStartDate' },
  { key: 'estEndDate', label: 'Est. End Date', dataIndex: 'estEndDate' },
];

// Mock data for leaf rows
const mockLeafData: Record<string, Record<string, ProductionOrder[]>> = {
  IS13: {
    '': [
      {
        id: '1',
        productionOrderNo: 'PO001',
        parentPro: '',
        partNo: 'PART-001',
        status: 'TECO',
        productionQty: 1050,
        orderType: 'ZREP',
        plant: { code: 'IS13', name: 'IS13' },
        estStartDate: '2024-01-15',
        estEndDate: '2024-02-07',
      },
      {
        id: '2',
        productionOrderNo: 'PO002',
        parentPro: '',
        partNo: 'PART-002',
        status: 'NOTF',
        productionQty: 7,
        orderType: 'ZREP',
        plant: { code: 'IS13', name: 'IS13' },
        estStartDate: '2024-01-15',
        estEndDate: '2024-02-14',
      },
      {
        id: '3',
        productionOrderNo: 'PO003',
        parentPro: '',
        partNo: 'PART-003',
        status: 'TECO',
        productionQty: 5720,
        orderType: 'ZPRD',
        plant: { code: 'IS13', name: 'IS13' },
        estStartDate: '2024-01-15',
        estEndDate: '2024-02-14',
      },
      {
        id: '4',
        productionOrderNo: 'PO004',
        parentPro: '',
        partNo: 'PART-004',
        status: 'TECO',
        productionQty: 44,
        orderType: 'ZREP',
        plant: { code: 'IS13', name: 'IS13' },
        estStartDate: '2024-01-15',
        estEndDate: '2024-02-21',
      },
    ],
    '100180991': [
      {
        id: '5',
        productionOrderNo: 'PO005',
        parentPro: '100180991',
        partNo: 'PART-005',
        status: 'TECO',
        productionQty: 1050,
        orderType: 'ZREP',
        plant: { code: 'IS13', name: 'IS13' },
        estStartDate: '2024-02-01',
        estEndDate: '2024-03-01',
      },
      {
        id: '6',
        productionOrderNo: 'PO006',
        parentPro: '100180991',
        partNo: 'PART-006',
        status: 'NOTF',
        productionQty: 7,
        orderType: 'ZREP',
        plant: { code: 'IS13', name: 'IS13' },
        estStartDate: '2024-02-01',
        estEndDate: '2024-03-01',
      },
      {
        id: '7',
        productionOrderNo: 'PO007',
        parentPro: '100180991',
        partNo: 'PART-007',
        status: 'TECO',
        productionQty: 32,
        orderType: 'ZPRD',
        plant: { code: 'IS13', name: 'IS13' },
        estStartDate: '2024-02-01',
        estEndDate: '2024-03-01',
      },
    ],
  },
  MR1: {
    '': [
      {
        id: '8',
        productionOrderNo: 'PO008',
        parentPro: '',
        partNo: 'PART-008',
        status: 'TECO',
        productionQty: 500,
        orderType: 'ZREP',
        plant: { code: 'MR1', name: 'MR1' },
        estStartDate: '2024-03-01',
        estEndDate: '2024-04-01',
      },
    ],
  },
  AT11: {
    '': [
      {
        id: '9',
        productionOrderNo: 'PO009',
        parentPro: '',
        partNo: 'PART-009',
        status: 'NOTF',
        productionQty: 100,
        orderType: 'ZPRD',
        plant: { code: 'AT11', name: 'AT11' },
        estStartDate: '2024-04-01',
        estEndDate: '2024-05-01',
      },
      {
        id: '10',
        productionOrderNo: 'PO010',
        parentPro: '',
        partNo: 'PART-010',
        status: 'TECO',
        productionQty: 200,
        orderType: 'ZREP',
        plant: { code: 'AT11', name: 'AT11' },
        estStartDate: '2024-04-01',
        estEndDate: '2024-05-01',
      },
      {
        id: '11',
        productionOrderNo: 'PO011',
        parentPro: '',
        partNo: 'PART-011',
        status: 'TECO',
        productionQty: 75,
        orderType: 'ZREP',
        plant: { code: 'AT11', name: 'AT11' },
        estStartDate: '2024-04-15',
        estEndDate: '2024-05-15',
      },
      {
        id: '12',
        productionOrderNo: 'PO012',
        parentPro: '',
        partNo: 'PART-012',
        status: 'NOTF',
        productionQty: 300,
        orderType: 'ZPRD',
        plant: { code: 'AT11', name: 'AT11' },
        estStartDate: '2024-04-15',
        estEndDate: '2024-05-15',
      },
    ],
  },
};

const simulateFetch = <T,>(data: T, delay = 500): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

const meta: Meta<TableProps<ProductionOrder, 'id'>> = {
  title: 'Display/GroupableTable',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const groupLevel: Array<keyof ProductionOrder> = ['plant', 'parentPro'];
const GroupableTableExample = () => {
  const [groups, setGroups] = useState<TableGroupNode<ProductionOrder>[]>([
    {
      value: { code: 'IS13', name: 'IS13' },
      total: 7,
      expanded: false,
    },
    {
      value: { code: 'MR1', name: 'MR1' },
      total: 1,
      expanded: false,
    },
    {
      value: { code: 'AT11', name: 'AT11' },
      total: 4,
      expanded: false,
    },
  ]);

  const handleGroupToggle = (
    expanded: boolean,
    path: (string | number | { code: string; name: string })[],
  ) => {
    console.log('handleGroupToggle', expanded, path);
    if (!expanded) {
      setGroups((prev) =>
        updateGroupAtPath(prev, path, (g) => ({ ...g, expanded: false })),
      );
      return;
    }

    // Set loading
    setGroups((prev) =>
      updateGroupAtPath(prev, path, (g) => ({
        ...g,
        expanded,
        loading: true,
      })),
    );

    if (path.length === 1) {
      // Top-level group expanded: fetch sub-groups (parentPro)
      const plantKey = typeof path[0] === 'object' ? path[0].code : path[0];
      const plantData = mockLeafData[plantKey] || {};
      console.log('plantData', plantData);
      const subGroups = Object.keys(plantData).map((parentPro) => ({
        value: parentPro || '',
        total: plantData[parentPro].length,
        expanded: false,
        isLeafGroup: true as const,
      }));
      console.log('subGroups', subGroups);

      simulateFetch(subGroups).then((data) => {
        console.log("simulateFetch's data", data);
        setGroups((prev) =>
          updateGroupAtPath(prev, path, (g) => ({
            ...g,
            loading: false,
            children: data,
          })),
        );
      });
    } else if (path.length === 2) {
      // Sub-group expanded: fetch leaf data
      const plantKey = typeof path[0] === 'object' ? path[0].code : path[0];
      const parentProKey = path[1] === '' ? '' : path[1];
      const leafData = mockLeafData[plantKey]?.[parentProKey] || [];

      simulateFetch(leafData).then((data) => {
        setGroups((prev) =>
          updateGroupAtPath(prev, path, (g) => ({
            ...g,
            loading: false,
            children: data,
            pagination: { page: 1, limit: 20 },
          })),
        );
      });
    }
  };

  const handleGroupPageChange = (
    pagination: PaginationDataType,
    path: string[],
  ) => {
    setGroups((prev) =>
      updateGroupAtPath(prev, path, (g) => ({
        ...g,
        pagination,
      })),
    );
  };
  return (
    <div style={{ width: 1200 }}>
      <Table<ProductionOrder, 'id'>
        columns={columns}
        dataKey="id"
        groupable
        groupLevel={groupLevel}
        groups={groups}
        onGroupToggle={handleGroupToggle}
        onGroupPageChange={handleGroupPageChange}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <GroupableTableExample />,
};

const GroupableWithSelectionExample = () => {
  const [groups, setGroups] = useState<TableGroupNode<ProductionOrder>[]>([
    {
      value: { code: 'IS13', name: 'IS13' },
      total: 4,
      expanded: true,
      isLeafGroup: true,
      children: mockLeafData.IS13[''],
      pagination: { page: 1, limit: 20 },
    },
    {
      value: { code: 'MR1', name: 'MR1' },
      total: 1,
      expanded: false,
    },
    {
      value: { code: 'AT11', name: 'AT11' },
      total: 4,
      expanded: false,
    },
  ]);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleGroupToggle = (
    expanded: boolean,
    path: (string | number | { code: string; name: string })[],
  ) => {
    if (!expanded) {
      setGroups((prev) =>
        updateGroupAtPath(prev, path, (g) => ({ ...g, expanded: false })),
      );
      return;
    }

    setGroups((prev) =>
      updateGroupAtPath(prev, path, (g) => ({
        ...g,
        expanded: true,
        loading: true,
      })),
    );

    const plantKey = typeof path[0] === 'object' ? path[0].code : path[0];
    const leafData = mockLeafData[plantKey]?.[''] || [];

    simulateFetch(leafData).then((data) => {
      setGroups((prev) =>
        updateGroupAtPath(prev, path, (g) => ({
          ...g,
          loading: false,
          isLeafGroup: true,
          children: data,
          pagination: { page: 1, limit: 20 },
        })),
      );
    });
  };

  return (
    <div style={{ width: 1200 }}>
      <Table<ProductionOrder, 'id'>
        columns={columns}
        dataKey="id"
        groupable
        groupLevel={groupLevel}
        groups={groups}
        onGroupToggle={handleGroupToggle}
        showSelected
        selectedRows={selectedRows}
        onRowSelect={(row, value, selected) => setSelectedRows(selected)}
      />
    </div>
  );
};

export const WithSelection: Story = {
  render: () => <GroupableWithSelectionExample />,
};

const GroupableWithTopLevelPaginationExample = () => {
  const allGroups: TableGroupNode<ProductionOrder>[] = [
    {
      value: { code: 'IS13', name: 'IS13' },
      total: 7,
      expanded: false,
    },
    {
      value: { code: 'MR1', name: 'MR1' },
      total: 1,
      expanded: false,
    },
    {
      value: { code: 'AT11', name: 'AT11' },
      total: 4,
      expanded: false,
    },
  ];

  const [pagination, setPagination] = useState<PaginationDataType>({
    page: 1,
    limit: 2,
  });
  const [groups, setGroups] = useState<TableGroupNode<ProductionOrder>[]>(
    allGroups.slice(0, 2),
  );

  const handlePageChange = (p: PaginationDataType) => {
    setPagination(p);
    const start = (p.page - 1) * p.limit;
    setGroups(allGroups.slice(start, start + p.limit));
  };

  const handleGroupToggle = (
    expanded: boolean,
    path: (string | number | { code: string; name: string })[],
  ) => {
    if (!expanded) {
      setGroups((prev) =>
        updateGroupAtPath(prev, path, (g) => ({ ...g, expanded: false })),
      );
      return;
    }
    setGroups((prev) =>
      updateGroupAtPath(prev, path, (g) => ({
        ...g,
        expanded: true,
        loading: true,
      })),
    );
    const plantKey = typeof path[0] === 'object' ? path[0].code : path[0];
    const leafData = mockLeafData[plantKey]?.[''] || [];
    simulateFetch(leafData).then((data) => {
      setGroups((prev) =>
        updateGroupAtPath(prev, path, (g) => ({
          ...g,
          loading: false,
          isLeafGroup: true,
          children: data,
        })),
      );
    });
  };

  return (
    <div style={{ width: 1200 }}>
      <Table<ProductionOrder, 'id'>
        columns={columns}
        dataKey="id"
        groupable
        groupLevel={groupLevel}
        groups={groups}
        onGroupToggle={handleGroupToggle}
        paginate
        total={allGroups.length}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export const WithTopLevelPagination: Story = {
  render: () => <GroupableWithTopLevelPaginationExample />,
};

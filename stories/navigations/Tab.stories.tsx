import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab, TabProps } from '../../src';
import '../../src/output.css';

const meta: Meta<TabProps> = {
  title: 'Navigation/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description:
        'An array of tab items, each containing the following properties:',
      table: {
        type: {
          summary:
            'Array<{ key: string, label: string, children: ReactNode , disabled?: boolean }>',
        },
      },
    },
    defaultActiveKey: {
      control: 'text',
      description: 'The key of the default active tab.',
      table: {
        type: { summary: 'string' },
      },
    },
    activeKey: {
      control: 'text',
      description: 'The key of the currently active tab.',
      table: {
        type: { summary: 'string' },
      },
    },
    fillParentWidth: {
      control: 'boolean',
      description: 'If true, the tabs will fill the parent container width.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'The alignment of the tab labels.',
      table: {
        type: { summary: '"left" | "center" | "right"' },
        defaultValue: { summary: 'left' },
      },
    },
    onTabClick: {
      action: 'navigate',
      description: 'Callback function triggered when a tab is clicked. ',
      table: {
        type: { summary: '(key: string) => void' },
      },
    },
    onTabClose: {
      action: 'close',
      description: 'Callback function triggered when a tab is closed. ',
      table: {
        type: { summary: '(key: string) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<TabProps>;

export const Playground: Story = {
  args: {
    items: [
      { key: 1, label: 'Tab 1', children: <div>Tab 1 Content</div> },
      { key: 2, label: 'Tab 2 long', children: <div>Tab 2 Content</div> },
      {
        key: 3,
        label: 'Tab 3 longer long',
        children: <div>Tab 3 Content</div>,
      },
      {
        key: 4,
        label: 'Tab 4 longer than longitudinal long',
        children: <div>Tab 4 Content</div>,
      },
      { key: 5, label: 'Tab 5', children: <div>Tab 5 Content</div> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Two `Tab` instances side-by-side: one fills the parent width (`fillParentWidth`) and one uses natural width. Use `items` to configure tab labels and content, `defaultActiveKey` to set the initially selected tab.',
      },
      source: {
        language: 'tsx',
        code: `
const items = [
  { key: '1', label: 'Tab 1', children: <div>Tab 1 Content</div> },
  { key: '2', label: 'Tab 2 long', children: <div>Tab 2 Content</div> },
  { key: '3', label: 'Tab 3 longer long', children: <div>Tab 3 Content</div> },
];

<div className="flex flex-col gap-10" style={{ width: 1000 }}>
  {/* Fills the full container width */}
  <Tab items={items} fillParentWidth />

  {/* Natural width — tabs size to their label */}
  <Tab items={items} />
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-10" style={{ width: 1000 }}>
      <Tab {...args} items={args.items} fillParentWidth />
      <Tab {...args} items={args.items} />
    </div>
  ),
};

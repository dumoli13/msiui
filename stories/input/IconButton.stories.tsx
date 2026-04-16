import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Icon, IconButton, type IconButtonProps } from '../../src';
import '../../src/output.css';

const variantOption = ['contained', 'secondary', 'outlined', 'text'];
const colorOption = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'neutral',
];
const sizeOption = ['small', 'default', 'large'];
const titleHorizontalAlignOption = ['left', 'center', 'right'];
const titleVerticalAlignOption = ['top', 'bottom'];

const meta: Meta<IconButtonProps> = {
  title: 'input/IconButton',
  component: IconButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variantOption,
      description: 'The variant of the icon button',
      table: {
        defaultValue: { summary: 'contained' },
        type: { summary: 'contained | secondary | outlined | text' },
      },
    },
    color: {
      control: { type: 'select' },
      options: colorOption,
      description: 'The color theme for the icon button',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | success | danger | warning | info' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names to customize the component style.',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'A flag that disables the icon button if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'A flag to display loading state if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    icon: {
      control: false,
      description: 'Icon to display inside the button',
      table: {
        type: {
          summary:
            'React.ReactElement<any, string | React.JSXElementConstructor<any>>',
        },
      },
    },
    size: {
      control: { type: 'select' },
      options: sizeOption,
      description: 'The size of the icon button.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'small | default | large' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when the button is clicked',
      table: {
        type: { summary: 'MouseEventHandler<T>' },
      },
    },
    title: {
      control: 'text',
      description: 'Tooltip text when hovering over the icon',
      table: {
        type: { summary: 'string' },
      },
    },
    titleVerticalAlign: {
      control: { type: 'radio' },
      options: titleVerticalAlignOption,
      description: 'Vertical alignment for the title',
      table: {
        defaultValue: { summary: 'bottom' },
        type: { summary: 'top | bottom' },
      },
    },
    titleHorizontalAlign: {
      control: { type: 'radio' },
      options: titleHorizontalAlignOption,
      description: 'Horizontal alignment for the title',
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: 'left | center | right' },
      },
    },
  },
  args: {
    onClick: fn(),
    icon: <Icon name="bookmark" variant="solid" />,
    size: 'default',
    disabled: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<IconButtonProps>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'IconButton is a compact button for icon-only actions. Use variant and color to express emphasis and semantic meaning',
      },
    },
  },
  args: {
    variant: 'contained',
    color: 'primary',
    title: 'Info',
    loading: false,
    titleVerticalAlign: 'bottom',
    titleHorizontalAlign: 'center',
  },
};

export const VariantContained: Story = {
  argTypes: {
    variant: { control: false },
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'All contained icon buttons across every available color.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <IconButton
      key={color}
      variant="contained"
      color={color as IconButtonProps['color']}
      icon={<Icon name="bookmark" variant="solid" />}
      title={color}
    />
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2 w-full">
      {colorOption.map((color) => (
        <IconButton
          key={color}
          {...args}
          variant="contained"
          color={color as IconButtonProps['color']}
          title={args.title || `${color} color, Contained variant`}
        />
      ))}
    </div>
  ),
};

export const VariantSecondary: Story = {
  argTypes: {
    variant: { control: false },
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'All secondary icon buttons across every available color.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <IconButton
      key={color}
      variant="secondary"
      color={color as IconButtonProps['color']}
      icon={<Icon name="bookmark" variant="solid" />}
      title={color}
    />
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {colorOption.map((color) => (
        <IconButton
          key={color}
          {...args}
          variant="secondary"
          color={color as IconButtonProps['color']}
          title={args.title || `${color} color, Secondary variant`}
        />
      ))}
    </div>
  ),
};

export const VariantOutlined: Story = {
  argTypes: {
    variant: { control: false },
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'All outlined icon buttons across every available color.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <IconButton
      key={color}
      variant="outlined"
      color={color as IconButtonProps['color']}
      icon={<Icon name="bookmark" variant="solid" />}
      title={color}
    />
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {colorOption.map((color) => (
        <IconButton
          key={color}
          {...args}
          variant="outlined"
          color={color as IconButtonProps['color']}
          title={args.title || `${color} color, Outlined variant`}
        />
      ))}
    </div>
  ),
};

export const VariantText: Story = {
  argTypes: {
    variant: { control: false },
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'All text icon buttons across every available color.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <IconButton
      key={color}
      variant="text"
      color={color as IconButtonProps['color']}
      icon={<Icon name="bookmark" variant="solid" />}
      title={color}
    />
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {colorOption.map((color) => (
        <IconButton
          key={color}
          {...args}
          variant="text"
          color={color as IconButtonProps['color']}
          title={args.title || `${color} color, Text variant`}
        />
      ))}
    </div>
  ),
};

export const VariantLink: Story = {
  argTypes: {
    variant: { control: false },
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'All link icon buttons across every available color.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <IconButton
      key={color}
      variant="link"
      color={color as IconButtonProps['color']}
      icon={<Icon name="bookmark" variant="solid" />}
      title={color}
    />
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {colorOption.map((color) => (
        <IconButton
          key={color}
          {...args}
          variant="link"
          color={color as IconButtonProps['color']}
          title={args.title || `${color} color, Text variant`}
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All three icon button sizes — small, default, and large — shown side by side.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2 items-center">
  <IconButton size="small" icon={<Icon name="bookmark" variant="solid" />} title="small" />
  <IconButton size="default" icon={<Icon name="bookmark" variant="solid" />} title="default" />
  <IconButton size="large" icon={<Icon name="bookmark" variant="solid" />} title="large" />
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      <IconButton {...args} size="small" title="small size" />
      <IconButton {...args} size="default" title="default size" />
      <IconButton {...args} size="large" title="large size" />
    </div>
  ),
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    disabled: false,
    loading: false,
  },
  argTypes: {
    size: { control: false },
  },
};

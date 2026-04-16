import { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { iconNames } from '../../const/icon';
import { Button, type ButtonProps, Icon, type IconNames } from '../../src';
import '../../src/output.css';

const variantOption = ['contained', 'secondary', 'outlined', 'text', 'link'];
const colorOption = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'neutral',
];
const sizeOption = ['small', 'default', 'large'];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<ButtonProps> = {
  title: 'Input/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variantOption,
      description: 'The variant of the button.',
      table: {
        defaultValue: { summary: 'contained' },
        type: { summary: 'contained | secondary | outlined | text' },
      },
    },
    color: {
      control: { type: 'select' },
      options: colorOption,
      description: 'The color of the button.',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | success | danger | warning | info' },
      },
    },
    className: {
      control: false,
      description: 'Additional class names to customize the component style.',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'A flag that disables input field if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'A flag that expand to full container width if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    startIcon: {
      control: false,
      description:
        'An optional icon to display at the start of the input field.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    endIcon: {
      control: false,
      description: 'An optional icon to display at the end of the input field.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    size: {
      control: { type: 'select' },
      options: sizeOption,
      description: 'The size of the button.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'small | default | large' },
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
    type: {
      control: 'text',
      description: 'The HTML type attribute.',
      table: {
        defaultValue: { summary: 'button' },
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'The text label displayed inside the button.',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when the button is clicked',
      table: {
        type: { summary: '(e: MouseEvent<HTMLButtonElement>) => void' },
      },
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Playground: Story = {
  args: {
    children: 'Button',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
};

export const VariantContained: Story = {
  args: {
    size: 'default',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  argTypes: {
    variant: { control: false },
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'All contained buttons across every available color.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <Button key={color} variant="contained" color={color as ButtonProps['color']}>
      {color} Contained
    </Button>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {colorOption.map((color) => (
        <Button
          key={color}
          {...args}
          variant="contained"
          color={color as ButtonProps['color']}
        >
          {color} Contained
        </Button>
      ))}
    </div>
  ),
};

export const VariantSecondary: Story = {
  args: {
    size: 'default',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  argTypes: {
    variant: { control: false },
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'All secondary buttons across every available color.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <Button key={color} variant="secondary" color={color as ButtonProps['color']}>
      {color} Secondary
    </Button>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {colorOption.map((color) => (
        <Button
          key={color}
          {...args}
          variant="secondary"
          color={color as ButtonProps['color']}
        >
          {color} Secondary
        </Button>
      ))}
    </div>
  ),
};

export const VariantOutlined: Story = {
  args: {
    size: 'default',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  argTypes: {
    variant: { control: false },
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'All outlined buttons across every available color.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <Button key={color} variant="outlined" color={color as ButtonProps['color']}>
      {color} Outlined
    </Button>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {colorOption.map((color) => (
        <Button
          key={color}
          {...args}
          variant="outlined"
          color={color as ButtonProps['color']}
        >
          {color} Outlined
        </Button>
      ))}
    </div>
  ),
};

export const VariantText: Story = {
  args: {
    size: 'default',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  argTypes: {
    variant: { control: false },
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'All text buttons across every available color.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <Button key={color} variant="text" color={color as ButtonProps['color']}>
      {color} Text
    </Button>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {colorOption.map((color) => (
        <Button
          key={color}
          {...args}
          variant="text"
          color={color as ButtonProps['color']}
        >
          {color} Text
        </Button>
      ))}
    </div>
  ),
};

export const VariantLink: Story = {
  args: {
    size: 'default',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  argTypes: {
    variant: { control: false },
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'All link buttons across every available color.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <Button key={color} variant="link" color={color as ButtonProps['color']}>
      {color} Link
    </Button>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      {colorOption.map((color) => (
        <Button
          key={color}
          {...args}
          variant="link"
          color={color as ButtonProps['color']}
        >
          {color} Link
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All three button sizes — small, default, and large — shown side by side.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex gap-2 items-center">
  <Button size="small">small</Button>
  <Button size="default">default</Button>
  <Button size="large">large</Button>
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      <Button {...args} size="small">
        small
      </Button>
      <Button {...args} size="default">
        default
      </Button>
      <Button {...args} size="large">
        large
      </Button>
    </div>
  ),
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  argTypes: {
    size: {
      control: false,
    },
  },
};

type WithIconControls = ButtonProps & {
  startIconName: IconNames;
  endIconName: IconNames;
};

export const WithIcon: StoryObj<WithIconControls> = {
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    size: 'default',
    disabled: false,
    fullWidth: false,
    loading: false,
    startIconName: 'arrow-up',
    endIconName: 'arrow-down',
  },
  argTypes: {
    startIconName: {
      control: { type: 'select' },
      options: iconNames,
      description: 'Name of the start icon',
      table: {
        category: 'Icons',
      },
    },
    endIconName: {
      control: { type: 'select' },
      options: iconNames,
      description: 'Name of the end icon',
      table: {
        category: 'Icons',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `startIcon` and `endIcon` to place icons inside the button. Pick any icon from the icon selector controls.',
      },
      source: {
        language: 'tsx',
        code: `
<Button
  startIcon={<Icon name="arrow-up" color="currentColor" />}
  endIcon={<Icon name="arrow-down" color="currentColor" />}
>
  Button
</Button>
        `.trim(),
      },
    },
  },
  render: (args) => {
    const { startIconName, endIconName, ...rest } = args;
    const start = useMemo(
      () => <Icon name={startIconName} color="currentColor" />,
      [startIconName],
    );
    const end = useMemo(
      () => <Icon name={endIconName} color="currentColor" />,
      [endIconName],
    );

    return <Button {...rest} startIcon={start} endIcon={end} />;
  },
};

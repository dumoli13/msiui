import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Icon, MisDesignProvider } from '../../src';
import { useToast } from '../../src/components/Toast';
import '../../src/output.css';
import { NotificationProps } from '../../src/types/feedback/notification';

const colorOption = [
  'neutral',
  'success',
  'danger',
  'warning',
  'info',
  'primary',
];

const meta: Meta<NotificationProps> = {
  title: 'Feedback/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays brief, non-blocking messages at the bottom-right of the screen. Requires `<MisDesignProvider>` and the `useToast()` hook.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the toast.',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'The description or content of the toast.',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'An optional icon to display beside the title.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    color: {
      control: { type: 'select' },
      options: colorOption,
      description: 'The color theme for the tag.',
      table: {
        defaultValue: { summary: 'default' },
        type: {
          summary: 'neutral | success | error',
        },
      },
    },
    duration: {
      control: 'number',
      description: 'The duration of the toast in milliseconds.',
      table: {
        type: { summary: 'number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<NotificationProps>;

export const Playground: Story = {
  args: {
    color: 'neutral',
    title: 'Notification Title',
    description:
      'Proactively incubate innovative processes for high-payoff architectures. Globally benchmark flexible',
    icon: <Icon name="bookmark" size={24} strokeWidth={2} />,
    duration: 5000,
  },
  render: (args) => {
    const notify = useToast();

    const handleToast = () => {
      notify({
        ...args,
      });
    };

    return (
      <MisDesignProvider>
        <div className="flex gap-4 items-center">
          <Button color="primary" onClick={handleToast}>
            Open Toast
          </Button>
        </div>
      </MisDesignProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click **Open Toast** to trigger a toast. Use the controls to change `color`, `title`, `description`, `icon`, and `duration`.',
      },
      source: {
        code: `
import { useToast } from 'mis-design';

function ToastDemo() {
  const notify = useToast();

  return (
    <MisDesignProvider>
      <Button
        color="primary"
        onClick={() =>
          notify({
            color: 'neutral',
            title: 'Toast Title',
            description: 'Proactively incubate innovative processes.',
            icon: <Icon name="bookmark" size={24} strokeWidth={2} />,
            duration: 5000,
          })
        }
      >
        Open Toast
      </Button>
    </MisDesignProvider>
  );
}
        `.trim(),
      },
    },
  },
};

export const Color: Story = {
  args: {
    title: 'Notification Title',
    description: 'Notification Description',
    duration: 5000,
  },
  render: (args) => {
    const notify = useToast();

    const handleToast =
      (
        color:
          | 'neutral'
          | 'success'
          | 'danger'
          | 'warning'
          | 'info'
          | 'primary',
      ) =>
      () => {
        notify({
          ...args,
          color,
        });
      };

    const handleToastIcon = () => {
      notify({
        ...args,
        icon: <Icon name="bold" size={24} strokeWidth={2} />,
        color: 'neutral',
      });
    };

    return (
      <MisDesignProvider>
        <div className="flex gap-4 items-center">
          <Button color="primary" onClick={handleToastIcon}>
            Default with Icon
          </Button>
          <Button color="primary" onClick={handleToast('neutral')}>
            Default
          </Button>
          <Button color="success" onClick={handleToast('success')}>
            Success
          </Button>
          <Button color="danger" onClick={handleToast('danger')}>
            Error
          </Button>
        </div>
      </MisDesignProvider>
    );
  },
  argTypes: {
    color: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Fires toasts in different colors. Note: Toast only supports `neutral`, `success`, and `danger` as semantic colors.',
      },
      source: {
        code: `
import { useToast } from 'mis-design';

function ToastColorDemo() {
  const notify = useToast();

  const fire = (color: 'neutral' | 'success' | 'danger' | 'warning' | 'info' | 'primary') => () =>
    notify({ color, title: 'Toast Title', description: 'Toast Description', duration: 5000 });

  return (
    <MisDesignProvider>
      <div className="flex gap-4 items-center">
        <Button color="primary" onClick={() => notify({ color: 'neutral', title: 'Toast Title', description: 'Toast Description', icon: <Icon name="bold" size={24} strokeWidth={2} />, duration: 5000 })}>
          Default with Icon
        </Button>
        <Button color="primary" onClick={fire('neutral')}>Default</Button>
        <Button color="success" onClick={fire('success')}>Success</Button>
        <Button color="danger" onClick={fire('danger')}>Error</Button>
      </div>
    </MisDesignProvider>
  );
}
        `.trim(),
      },
    },
  },
};

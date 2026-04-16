import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Icon, MisDesignProvider, useNotification } from '../../src';
import '../../src/output.css';
import { NotificationProps } from '../../src/types/feedback/notification';

const colorOption = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'neutral',
];

const meta: Meta<NotificationProps> = {
  title: 'Feedback/Notification',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays notification messages at the bottom-right of the screen. Requires `<MisDesignProvider>` and the `useNotification()` hook.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the notification.',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'The description or content of the notification.',
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
        defaultValue: { summary: 'primary' },
        type: {
          summary: 'primary | success | danger | warning | info | neutral',
        },
      },
    },
    duration: {
      control: 'number',
      description: 'The duration of the notification in milliseconds.',
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
    color: 'primary',
    title: 'Notification Title',
    description: 'Notification Description',
    icon: <Icon name="bookmark" size={24} strokeWidth={2} />,
    duration: 5000,
  },
  render: (args) => {
    const notify = useNotification();

    const handleNotification = () => {
      notify({
        ...args,
      });
    };

    return (
      <MisDesignProvider>
        <div className="flex gap-4 items-center">
          <Button color="primary" onClick={handleNotification}>
            Open Notification
          </Button>
        </div>
      </MisDesignProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click **Open Notification** to trigger a notification. Use the controls to change `color`, `title`, `description`, `icon`, and `duration`.',
      },
      source: {
        code: `
import { useState } from 'react';

const UncontrolledValue = () => {
    const notify = useNotification();

    const handleNotification = (color: 'primary' | 'success' | 'danger' | 'warning' | 'info') => () => {
        notify({
            color,
            title: 'Notification Title',
            description: 'Notification Description',
        })
    }

    const handleNotificationIcon = () => {
        notify({
            icon: <Icon name="bookmark" size={24} strokeWidth={2} />,
            color: 'primary',
            title: 'Notification Title',
            description: 'Notification Description',
        })
    }

    return (
        <MisDesignProvider>
            <div className="flex gap-4 items-center">
                <Button color="primary" onClick={handleNotificationIcon}>Primary with Icon</Button>
                <Button color="primary" onClick={handleNotification('primary')}>Primary</Button>
                <Button color="success" onClick={handleNotification('success')}>Success</Button>
                <Button color="danger" onClick={handleNotification('danger')}>Danger</Button>
                <Button color="warning" onClick={handleNotification('warning')}>Warning</Button>
                <Button color="info" onClick={handleNotification('info')}>Info</Button>
            </div>
        </MisDesignProvider>
    );
};

export default UncontrolledValue;
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
    const notify = useNotification();

    const handleNotification =
      (color: 'primary' | 'success' | 'danger' | 'warning' | 'info') => () => {
        notify({
          ...args,
          color,
        });
      };

    const handleNotificationIcon = () => {
      notify({
        ...args,
        icon: <Icon name="bold" size={24} strokeWidth={2} />,
        color: 'primary',
      });
    };

    return (
      <MisDesignProvider>
        <div className="flex gap-4 items-center">
          <Button color="primary" onClick={handleNotificationIcon}>
            Primary with Icon
          </Button>
          <Button color="primary" onClick={handleNotification('primary')}>
            Primary
          </Button>
          <Button color="success" onClick={handleNotification('success')}>
            Success
          </Button>
          <Button color="danger" onClick={handleNotification('danger')}>
            Danger
          </Button>
          <Button color="warning" onClick={handleNotification('warning')}>
            Warning
          </Button>
          <Button color="info" onClick={handleNotification('info')}>
            Info
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
          'Fires notifications in all available colors. Each color carries a semantic meaning — use `icon` to reinforce it.',
      },
      source: {
        code: `
import { useState } from 'react';

const UncontrolledValue = () => {
    const notify = useNotification();

    const handleNotification = (color: 'primary' | 'success' | 'danger' | 'warning' | 'info') => () => {
        notify({
            color,
            title: 'Notification Title',
            description: 'Notification Description',
        })
    }

    const handleNotificationIcon = () => {
        notify({
            icon: <Icon name="bookmark" size={24} strokeWidth={2} />,
            color: 'primary',
            title: 'Notification Title',
            description: 'Notification Description',
        })
    }

    return (
        <MisDesignProvider>
            <div className="flex gap-4 items-center">
                <Button color="primary" onClick={handleNotificationIcon}>Primary with Icon</Button>
                <Button color="primary" onClick={handleNotification('primary')}>Primary</Button>
                <Button color="success" onClick={handleNotification('success')}>Success</Button>
                <Button color="danger" onClick={handleNotification('danger')}>Danger</Button>
                <Button color="warning" onClick={handleNotification('warning')}>Warning</Button>
                <Button color="info" onClick={handleNotification('info')}>Info</Button>
            </div>
        </MisDesignProvider>
    );
};

export default UncontrolledValue;
          `.trim(),
      },
    },
  },
};

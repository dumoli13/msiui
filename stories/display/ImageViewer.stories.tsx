import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Icon, ImageViewer, ImageViewerProps } from '../../src';
import '../../src/output.css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<ImageViewerProps> = {
  title: 'Display/ImageViewer',
  component: ImageViewer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Determines whether the image viewer is open or not.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      action: 'activeKeyChanged',
      description: 'Callback when active keys are changed.',
      table: {
        type: { summary: '(key: Array<string | number>) => void' },
      },
    },
    url: {
      control: 'text',
      description: 'The URL of the image to display.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    open: false,
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<ImageViewerProps>;

export const Playground: Story = {
  args: {
    url: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click the thumbnail to open the full-screen image viewer. `open` is managed locally — pass the `url` prop to control which image is shown.',
      },
      source: {
        language: 'tsx',
        code: `
function ImageViewerDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer border border-neutral-40 relative group rounded-md overflow-hidden h-40"
      >
        <div className="absolute top-0 left-0 w-full h-full z-10 text-neutral-10 bg-neutral-100/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          <Icon name="arrows-pointing-out" size={24} strokeWidth={2} />
        </div>
        <img src={url} alt="preview" className="w-full h-full object-contain" />
      </button>
      <ImageViewer url={url} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
        `.trim(),
      },
    },
  },
  render: (args) => {
    const [open, setOpen] = React.useState(args.open);
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer border border-neutral-40 relative group rounded-md overflow-hidden h-40"
        >
          <div className="absolute top-0 left-0 w-full h-full z-10 text-neutral-10 bg-neutral-100/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <Icon name="arrows-pointing-out" size={24} strokeWidth={2} />
          </div>
          <img
            src={args.url}
            alt="goods-image"
            className="w-full h-full object-contain"
          />
        </button>
        <ImageViewer {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};

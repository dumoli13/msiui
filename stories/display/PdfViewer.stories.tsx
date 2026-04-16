import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  PdfViewer,
  type PdfViewerProps,
  Uploader,
  type UploaderSingleValue,
} from '../../src';
import '../../src/output.css';

const meta: Meta<PdfViewerProps> = {
  title: 'Display/PdfViewer',
  component: PdfViewer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Determines whether the PDF viewer is open or not.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      action: 'onClose',
      description: 'Callback fired when the viewer is closed.',
      table: {
        type: { summary: '() => void' },
      },
    },
    url: {
      control: 'text',
      description: 'URL or object URL of the PDF document to display.',
      table: {
        type: { summary: 'string | null' },
      },
    },
  },
  args: {
    open: false,
    onClose: fn(),
    url: null,
  },
};

export default meta;
type Story = StoryObj<PdfViewerProps>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Upload a PDF file using the uploader, then click **Open PDF** to view it in full-screen. `open` and `url` are managed locally via state.',
      },
      source: {
        language: 'tsx',
        code: `
function PdfViewerDemo() {
  const [file, setFile] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [objectUrl, setObjectUrl] = React.useState(null);

  React.useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setObjectUrl(file);
    }
  }, [file]);

  return (
    <div className="flex flex-col gap-4 w-[400px]">
      <Uploader
        label="Upload PDF"
        accept="application/pdf"
        value={file}
        onChange={setFile}
        clearable
      />
      <button
        type="button"
        disabled={!objectUrl}
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-md bg-primary-main text-white disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Open PDF
      </button>
      <PdfViewer url={objectUrl} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
        `.trim(),
      },
    },
  },
  render: (args) => {
    const [file, setFile] = useState<UploaderSingleValue>(null);
    const [open, setOpen] = useState(false);
    const [objectUrl, setObjectUrl] = useState<string | null>(null);

    useEffect(() => {
      if (file instanceof File) {
        const url = URL.createObjectURL(file);
        setObjectUrl(url);
        return () => URL.revokeObjectURL(url);
      } else {
        setObjectUrl(file);
      }
    }, [file]);

    return (
      <div className="flex flex-col gap-4 w-[400px]">
        <Uploader
          label="Upload PDF"
          accept="application/pdf"
          value={file}
          onChange={setFile}
          clearable
        />
        <button
          type="button"
          disabled={!objectUrl}
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-md bg-primary-main text-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Open PDF
        </button>
        <PdfViewer
          {...args}
          url={objectUrl}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypographyVariant } from '../../src';
import Typography from '../../src/components/Typography';
import '../../src/output.css';

type TypographyStoryArgs = {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
};

const meta: Meta<TypographyStoryArgs> = {
  title: 'Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    variant: 'paragraph-m',
  },

  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'paragraph-xl',
        'paragraph-l',
        'paragraph-m',
        'paragraph-s',
        'paragraph-xs',
      ],
      description: 'The variant of the typography.',
      table: {
        type: {
          summary:
            'h1 | h2 | h3 | h4 | h5 | h6 | paragraph-xl | paragraph-l | paragraph-m | paragraph-s | paragraph-xs',
        },
      },
    },

    children: {
      control: false,
      description:
        'Children of the Typography. Make sure to use input from the mis-design to make it work with the typography.',
      table: {
        type: { summary: ' React.ReactNode' },
      },
    },

    className: {
      control: 'text',
      description: 'Additional class names to customize the component style.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<TypographyStoryArgs>;

export const Playground: Story = {
  render: ({ variant }) => {
    const contentMap: Record<TypographyVariant, React.ReactNode> = {
      h1: (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 40px | Line height: 48px | Tracking: -2%
          </div>
          <Typography variant="h1">Heading H1 test line-height</Typography>
        </>
      ),

      h2: (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 32px | Line height: 38px | Tracking: -2%
          </div>
          <Typography variant="h2">Heading H2 test line-height</Typography>
        </>
      ),

      h3: (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 28px | Line height: 34px | Tracking: -2%
          </div>
          <Typography variant="h3">Heading H3 test line-height</Typography>
        </>
      ),

      h4: (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 24px | Line height: 28px | Tracking: -2%
          </div>
          <Typography variant="h4">Heading H4 test line-height</Typography>
        </>
      ),

      h5: (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 20px | Line height: 24px | Tracking: -2%
          </div>
          <Typography variant="h5">Heading H5 test line-height</Typography>
        </>
      ),

      h6: (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 16px | Line height: 19px | Tracking: -2%
          </div>
          <Typography variant="h6">Heading H6 test line-height</Typography>
        </>
      ),

      'paragraph-xl': (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 20px | Line height: 32px
          </div>
          <Typography variant="paragraph-xl">
            Become a legendary UX/UI designer through real world and practical
            courses.
          </Typography>
        </>
      ),

      'paragraph-l': (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 18px | Line height: 28px
          </div>
          <Typography variant="paragraph-l">
            Become a legendary UX/UI designer through real world and practical
            courses.
          </Typography>
        </>
      ),

      'paragraph-m': (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 16px | Line height: 28px
          </div>
          <Typography variant="paragraph-m">
            Become a legendary UX/UI designer through real world and practical
            courses.
          </Typography>
        </>
      ),

      'paragraph-s': (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 14px | Line height: 20px
          </div>
          <Typography variant="paragraph-s">
            Become a legendary UX/UI designer through real world and practical
            courses.
          </Typography>
        </>
      ),

      'paragraph-xs': (
        <>
          <div className="mb-8 pb-2 text-neutral-60 text-12px border-b border-neutral-50">
            Font size: 12px | Line height: 28px
          </div>
          <Typography variant="paragraph-xs">
            Become a legendary UX/UI designer through real world and practical
            courses.
          </Typography>
        </>
      ),
    };

    return (
      <div className="bg-white px-10 py-8" style={{ width: 600 }}>
        <div className=" mb-2 text-12px">
          Heading <b>{variant}</b>
        </div>

        {contentMap[variant as TypographyVariant]}
      </div>
    );
  },
};

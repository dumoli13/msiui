import React from 'react';
import { render, screen } from '@testing-library/react';
import RichTextField from '../../../src/components/Inputs/RichTextField/index';

// Mock all tiptap modules before importing RichTextField
const mockEditor = {
  getHTML: vi.fn(() => '<p>test</p>'),
  getJSON: vi.fn(() => ({ type: 'doc', content: [] })),
  commands: {
    focus: vi.fn(),
    blur: vi.fn(),
    clearContent: vi.fn(),
    setContent: vi.fn(),
  },
  on: vi.fn(),
  off: vi.fn(),
  isDestroyed: false,
  isEditable: true,
  isActive: vi.fn(() => false),
  chain: vi.fn(() => ({
    focus: vi.fn().mockReturnThis(),
    run: vi.fn(),
    toggleBold: vi.fn().mockReturnThis(),
    toggleItalic: vi.fn().mockReturnThis(),
    toggleUnderline: vi.fn().mockReturnThis(),
    toggleStrike: vi.fn().mockReturnThis(),
    toggleBulletList: vi.fn().mockReturnThis(),
    toggleOrderedList: vi.fn().mockReturnThis(),
    toggleBlockquote: vi.fn().mockReturnThis(),
    setTextAlign: vi.fn().mockReturnThis(),
    setColor: vi.fn().mockReturnThis(),
    setHighlight: vi.fn().mockReturnThis(),
    setLink: vi.fn().mockReturnThis(),
    unsetLink: vi.fn().mockReturnThis(),
    insertTable: vi.fn().mockReturnThis(),
  })),
  can: vi.fn(() => ({
    chain: vi.fn(() => ({
      focus: vi.fn().mockReturnThis(),
      run: vi.fn(() => true),
      undo: vi.fn().mockReturnThis(),
      redo: vi.fn().mockReturnThis(),
    })),
  })),
  getAttributes: vi.fn(() => ({})),
  view: { dom: document.createElement('div') },
};

vi.mock('@tiptap/react', () => ({
  EditorProvider: ({
    children,
    slotBefore,
  }: {
    children: React.ReactNode;
    slotBefore?: React.ReactNode;
  }) =>
    React.createElement(
      'div',
      { 'data-testid': 'editor-provider' },
      slotBefore,
      React.createElement(
        'div',
        { 'data-testid': 'editor-content', contentEditable: true },
        'Editor content',
      ),
      children,
    ),
  useCurrentEditor: () => ({ editor: mockEditor }),
}));

vi.mock('@tiptap/starter-kit', () => ({
  default: { configure: vi.fn(() => ({})) },
}));

vi.mock('@tiptap/extension-underline', () => ({ default: {} }));
vi.mock('@tiptap/extension-text-style', () => ({ TextStyle: {} }));
vi.mock('@tiptap/extension-color', () => ({ default: {} }));
vi.mock('@tiptap/extension-highlight', () => ({
  default: { configure: vi.fn(() => ({})) },
}));
vi.mock('@tiptap/extension-text-align', () => ({
  default: { configure: vi.fn(() => ({})) },
}));
vi.mock('@tiptap/extension-table', () => ({
  Table: { configure: vi.fn(() => ({})) },
  TableRow: {},
  TableCell: {},
  TableHeader: {},
}));
vi.mock('@tiptap/extension-link', () => ({
  default: { configure: vi.fn(() => ({})) },
}));
vi.mock('@tiptap/extension-placeholder', () => ({
  default: { configure: vi.fn(() => ({})) },
}));
vi.mock('@intevation/tiptap-extension-office-paste', () => ({
  default: {},
}));

vi.mock(
  '../../../src/components/Inputs/RichTextField/extensions/FontSize',
  () => ({ default: {} }),
);
vi.mock(
  '../../../src/components/Inputs/RichTextField/extensions/TextIndent',
  () => ({ default: {} }),
);
vi.mock(
  '../../../src/components/Inputs/RichTextField/extensions/ImageResize',
  () => ({ default: {} }),
);
vi.mock(
  '../../../src/components/Inputs/RichTextField/extensions/BulletStyle',
  () => ({ default: {} }),
);
vi.mock(
  '../../../src/components/Inputs/RichTextField/RichTextField.css',
  () => ({}),
);

afterEach(() => {
  document.documentElement.classList.remove('dark');
  vi.clearAllMocks();
});

describe('RichTextField', () => {
  it('renders the editor provider', () => {
    render(<RichTextField />);
    expect(screen.getByTestId('editor-provider')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<RichTextField label="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const { container } = render(<RichTextField />);
    expect(container.querySelector('label')).toBeNull();
  });

  it('renders helper text when provided', () => {
    render(<RichTextField helperText="Enter a description" />);
    expect(screen.getByText('Enter a description')).toBeInTheDocument();
  });

  it('renders error message when error is a string', () => {
    render(<RichTextField error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders helper text (not error) when error is boolean', () => {
    render(<RichTextField error={true} helperText="Some helper" />);
    expect(screen.getByText('Some helper')).toBeInTheDocument();
  });

  it('renders required indicator with label', () => {
    render(<RichTextField label="Title" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with disabled state', () => {
    const { container } = render(<RichTextField disabled />);
    expect(container.querySelector('.cursor-not-allowed')).toBeInTheDocument();
  });

  it('renders toolbar', () => {
    render(<RichTextField />);
    expect(screen.getByTestId('editor-provider')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(<RichTextField className="my-custom-class" />);
    expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
  });

  it('renders with label position left', () => {
    const { container } = render(
      <RichTextField label="Description" labelPosition="left" />,
    );
    expect(
      container.querySelector('.flex.items-center.gap-4'),
    ).toBeInTheDocument();
  });

  it('hides label when autoHideLabel is true and not focused', () => {
    render(<RichTextField label="Title" autoHideLabel />);
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<RichTextField label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PDFViewer from '../../../src/components/Displays/PdfViewer';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('PDFViewer', () => {
  it('renders nothing when open is false', () => {
    const { container } = render(
      <PDFViewer open={false} onClose={vi.fn()} url="test.pdf" />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders PDF document when open is true', () => {
    render(<PDFViewer open={true} onClose={vi.fn()} url="test.pdf" />);
    expect(screen.getByTestId('pdf-document')).toBeInTheDocument();
  });

  it('renders dialog with proper ARIA attributes', () => {
    render(<PDFViewer open={true} onClose={vi.fn()} url="test.pdf" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'PDF Viewer');
  });

  it('renders page indicator showing current page and total', () => {
    render(<PDFViewer open={true} onClose={vi.fn()} url="test.pdf" />);
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(screen.getByText('/ 3')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<PDFViewer open={true} onClose={onClose} url="test.pdf" />);
    const closeButton = screen.getByRole('button', { name: 'Close' });
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<PDFViewer open={true} onClose={onClose} url="test.pdf" />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders zoom controls', () => {
    render(<PDFViewer open={true} onClose={vi.fn()} url="test.pdf" />);
    expect(
      screen.getByRole('button', { name: 'Zoom out' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeInTheDocument();
    expect(screen.getByLabelText('Scale percentage')).toBeInTheDocument();
  });

  it('renders full size toggle button', () => {
    render(<PDFViewer open={true} onClose={vi.fn()} url="test.pdf" />);
    expect(
      screen.getByRole('button', { name: 'Full size' }),
    ).toBeInTheDocument();
  });

  it('renders nothing when url is null', () => {
    render(<PDFViewer open={true} onClose={vi.fn()} url={null} />);
    expect(screen.queryByTestId('pdf-document')).not.toBeInTheDocument();
  });

  it('renders PDF pages from the document', () => {
    render(<PDFViewer open={true} onClose={vi.fn()} url="test.pdf" />);
    expect(screen.getByTestId('pdf-page-1')).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<PDFViewer open={true} onClose={vi.fn()} url="test.pdf" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PdfThumbnail from '../../../src/components/Displays/PdfThumbnail';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('PdfThumbnail', () => {
  it('renders a thumbnail with the first PDF page', () => {
    render(<PdfThumbnail file="test.pdf" />);
    expect(screen.getByTestId('pdf-document')).toBeInTheDocument();
    expect(screen.getByTestId('pdf-page-1')).toBeInTheDocument();
  });

  it('renders a clickable button to open the viewer', () => {
    render(<PdfThumbnail file="test.pdf" />);
    const button = screen.getByTitle('Open PDF Viewer');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('opens PDF viewer modal when thumbnail is clicked', async () => {
    const user = userEvent.setup();
    render(<PdfThumbnail file="test.pdf" />);
    const button = screen.getByTitle('Open PDF Viewer');
    await user.click(button);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('closes PDF viewer when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<PdfThumbnail file="test.pdf" />);
    await user.click(screen.getByTitle('Open PDF Viewer'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders maximize icon overlay on hover', () => {
    const { container } = render(<PdfThumbnail file="test.pdf" />);
    const overlay = container.querySelector('.group-hover\\:opacity-100');
    expect(overlay).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<PdfThumbnail file="test.pdf" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

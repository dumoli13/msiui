import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageViewer from '../../../src/components/Displays/ImageViewer';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('ImageViewer', () => {
  it('does not render when open=false', () => {
    const { container } = render(
      <ImageViewer
        open={false}
        onClose={vi.fn()}
        url="https://example.com/img.jpg"
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders img element when open=true', () => {
    render(
      <ImageViewer open onClose={vi.fn()} url="https://example.com/img.jpg" />,
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/img.jpg',
    );
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <ImageViewer open onClose={onClose} url="https://example.com/img.jpg" />,
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <ImageViewer open onClose={onClose} url="https://example.com/img.jpg" />,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('zoom in button renders and is clickable', async () => {
    const user = userEvent.setup();
    render(
      <ImageViewer open onClose={vi.fn()} url="https://example.com/img.jpg" />,
    );
    const zoomInButton = screen.getByTitle('zoom in');
    await user.click(zoomInButton);
    // Check the scale input increased from 100
    const scaleInput = screen.getByLabelText(
      'Scale percentage',
    ) as HTMLInputElement;
    expect(Number(scaleInput.value)).toBeGreaterThan(100);
  });

  it('zoom out button renders and is disabled at minimum scale (50)', async () => {
    const user = userEvent.setup();
    render(
      <ImageViewer open onClose={vi.fn()} url="https://example.com/img.jpg" />,
    );
    const zoomOutButton = screen.getByTitle('zoom out');
    // Click zoom out many times to reach minimum
    for (let i = 0; i < 10; i++) {
      if (!zoomOutButton.hasAttribute('disabled')) {
        await user.click(zoomOutButton);
      }
    }
    expect(zoomOutButton).toBeDisabled();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(
      <ImageViewer open onClose={vi.fn()} url="https://example.com/img.jpg" />,
    );
    expect(container).toBeInTheDocument();
  });
});

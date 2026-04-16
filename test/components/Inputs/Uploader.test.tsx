import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Uploader from '../../../src/components/Inputs/Uploader';
import type { UploaderRef } from '../../../src/types/inputs/uploader';

// URL.createObjectURL is not available in jsdom — stub it so image-file
// previews don't throw during tests that involve File objects.
beforeAll(() => {
  if (!global.URL.createObjectURL) {
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
  }
});

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Uploader', () => {
  it('renders with label text', () => {
    render(<Uploader label="Upload File" />);
    expect(screen.getByText('Upload File')).toBeInTheDocument();
  });

  it('renders "Click to upload" prompt', () => {
    render(<Uploader />);
    expect(screen.getByText(/click to upload/i)).toBeInTheDocument();
  });

  it('renders upload area button with accessible label', () => {
    render(<Uploader />);
    expect(
      screen.getByRole('button', { name: 'Open upload dialog' }),
    ).toBeInTheDocument();
  });

  it('disabled=true disables the upload button', () => {
    render(<Uploader disabled />);
    expect(
      screen.getByRole('button', { name: 'Open upload dialog' }),
    ).toBeDisabled();
  });

  it('disabled=true disables the hidden file input', () => {
    const { container } = render(<Uploader disabled />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('error=string shows the error message', () => {
    render(<Uploader error="File type not supported" />);
    expect(screen.getByText('File type not supported')).toBeInTheDocument();
  });

  it('helperText is displayed below the uploader', () => {
    render(<Uploader helperText="Max file size: 10MB" />);
    expect(screen.getByText('Max file size: 10MB')).toBeInTheDocument();
  });

  it('loading=true shows a loading indicator', () => {
    const { container } = render(<Uploader loading />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders hidden file input with type="file"', () => {
    const { container } = render(<Uploader />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('accept prop is forwarded to the file input', () => {
    const { container } = render(<Uploader accept=".pdf,.docx" />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.accept).toBe('.pdf,.docx');
  });

  it('multiple=true sets multiple attribute on file input', () => {
    const { container } = render(<Uploader multiple />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.multiple).toBe(true);
  });

  it('uploading a file via input change shows the filename', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(<Uploader onChange={onChange} />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file = new File(['hello'], 'report.pdf', { type: 'application/pdf' });
    await user.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText(/report\.pdf/)).toBeInTheDocument();
    });
    expect(onChange).toHaveBeenCalledWith(file);
  });

  it('uploading a non-accepted file type is ignored', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Uploader accept=".pdf" onChange={onChange} />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file = new File(['hello'], 'image.png', { type: 'image/png' });
    await user.upload(input, file);

    // onChange should NOT be called — file type rejected
    expect(onChange).not.toHaveBeenCalled();
  });

  it('controlled: value as URL string shows the filename', () => {
    render(
      <Uploader
        value="https://example.com/documents/contract.pdf"
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/contract\.pdf/)).toBeInTheDocument();
  });

  it('clearable=true + multiple files shows a clear-all button', async () => {
    const user = userEvent.setup();
    const { container } = render(<Uploader clearable multiple />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file1 = new File(['data1'], 'notes1.pdf', {
      type: 'application/pdf',
    });
    const file2 = new File(['data2'], 'notes2.pdf', {
      type: 'application/pdf',
    });
    await user.upload(input, [file1, file2]);

    await waitFor(() => {
      // "Clear all files" button appears when clearable=true and more than 1 file selected
      const clearBtn = screen.queryByRole('button', { name: /clear/i });
      expect(clearBtn).toBeInTheDocument();
    });
  });

  it('inputRef exposes value and reset', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<UploaderRef>();
    const { container } = render(<Uploader inputRef={ref} />);

    await waitFor(() => expect(ref.current).not.toBeNull());
    // Initially no file
    expect(ref.current!.value).toBeNull();

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(['data'], 'doc.pdf', { type: 'application/pdf' });
    await user.upload(input, file);

    await waitFor(() => {
      expect(ref.current!.value).toEqual(file);
    });

    // Reset clears the value
    ref.current!.reset();
    await waitFor(() => {
      expect(ref.current!.value).toBeNull();
    });
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<Uploader label="Dark Uploader" />);
    expect(screen.getByText('Dark Uploader')).toBeInTheDocument();
  });
});

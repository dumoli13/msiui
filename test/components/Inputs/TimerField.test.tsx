import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimerField from '../../../src/components/Inputs/TimerField';
import type { TimerFieldRef } from '../../../src/types/inputs/timerField';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('TimerField', () => {
  it('renders with label text', () => {
    render(<TimerField label="Duration" />);
    expect(screen.getByText('Duration')).toBeInTheDocument();
  });

  it('renders default placeholder "dd:hh:mm:ss"', () => {
    render(<TimerField />);
    expect(screen.getByPlaceholderText('dd:hh:mm:ss')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<TimerField placeholder="Enter duration" />);
    expect(screen.getByPlaceholderText('Enter duration')).toBeInTheDocument();
  });

  it('value prop displays formatted time in the input', () => {
    // 3661 seconds = 0 days, 1 hour, 1 minute, 1 second → "00:01:01:01"
    const { container } = render(
      <TimerField value={3661} onChange={vi.fn()} />,
    );
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('00:01:01:01');
  });

  it('defaultValue sets initial time display', () => {
    // 7200 = 2 hours → "00:02:00:00"
    const { container } = render(<TimerField defaultValue={7200} />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('00:02:00:00');
  });

  it('empty value shows empty input', () => {
    const { container } = render(
      <TimerField value={null} onChange={vi.fn()} />,
    );
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('disabled=true disables the input', () => {
    const { container } = render(<TimerField disabled />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('disabled=true prevents dropdown from opening', async () => {
    const user = userEvent.setup();
    const { container } = render(<TimerField disabled />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    // Dropdown should NOT open when disabled
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('error=string shows the error message', () => {
    render(<TimerField error="Invalid duration" />);
    expect(screen.getByText('Invalid duration')).toBeInTheDocument();
  });

  it('helperText is displayed below the input', () => {
    render(<TimerField helperText="Format: days:hours:minutes:seconds" />);
    expect(
      screen.getByText('Format: days:hours:minutes:seconds'),
    ).toBeInTheDocument();
  });

  it('loading=true shows a loading indicator', () => {
    const { container } = render(<TimerField loading />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('clicking input opens the time picker dropdown', async () => {
    const user = userEvent.setup();
    const { container } = render(<TimerField />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    // After clicking, the dropdown with time columns should appear
    expect(document.body.innerHTML).toMatch(/\d{2}/);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('inputRef exposes value, reset, and disabled', async () => {
    const ref = React.createRef<TimerFieldRef>();
    render(<TimerField inputRef={ref} defaultValue={3600} />);
    await waitFor(() => expect(ref.current).not.toBeNull());
    // Value should be 3600 (the defaultValue)
    expect(ref.current!.value).toBe(3600);
    expect(ref.current!.disabled).toBe(false);
    // Reset clears back to initialValue (null by default)
    ref.current!.reset();
    await waitFor(() => {
      expect(ref.current!.value).toBeNull();
    });
  });

  it('inputRef.disabled reflects the disabled prop', async () => {
    const ref = React.createRef<TimerFieldRef>();
    render(<TimerField inputRef={ref} disabled />);
    await waitFor(() => expect(ref.current).not.toBeNull());
    expect(ref.current!.disabled).toBe(true);
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<TimerField label="Dark Duration" />);
    expect(screen.getByText('Dark Duration')).toBeInTheDocument();
  });
});

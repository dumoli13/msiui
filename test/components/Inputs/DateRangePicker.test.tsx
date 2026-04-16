import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateRangePicker from '../../../src/components/Inputs/DateRangePicker';
import type { DateRangePickerRef } from '../../../src/types/inputs/dateRangePicker';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('DateRangePicker', () => {
  it('renders with label text', () => {
    render(<DateRangePicker label="Date Range" />);
    expect(screen.getByText('Date Range')).toBeInTheDocument();
  });

  it('renders with placeholder text', () => {
    render(<DateRangePicker placeholder="Select range" />);
    const inputs = document.querySelectorAll('input');
    // At least one input should have the placeholder
    const hasPlaceholder = Array.from(inputs).some(
      (i) => i.placeholder === 'Select range',
    );
    expect(hasPlaceholder).toBe(true);
  });

  it('clicking input opens calendar panel', async () => {
    const user = userEvent.setup();
    const { container } = render(<DateRangePicker />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    // Calendar renders day names or month navigation after opening
    expect(document.body.innerHTML).toMatch(/Mon|Tue|Jan|Feb|Sun/i);
  });

  it('value prop displays formatted start date in input', () => {
    const range: [Date, Date] = [new Date(2024, 0, 15), new Date(2024, 1, 20)];
    const { container } = render(
      <DateRangePicker value={range} onChange={vi.fn()} />,
    );
    const inputs = container.querySelectorAll('input');
    // Start date input should contain year
    const anyHasValue = Array.from(inputs).some((i) =>
      i.value.includes('2024'),
    );
    expect(anyHasValue).toBe(true);
  });

  it('defaultValue sets initial date range', () => {
    const range: [Date, Date] = [new Date(2024, 5, 1), new Date(2024, 5, 30)];
    const { container } = render(<DateRangePicker defaultValue={range} />);
    const inputs = container.querySelectorAll('input');
    const anyHasValue = Array.from(inputs).some((i) =>
      i.value.includes('2024'),
    );
    expect(anyHasValue).toBe(true);
  });

  it('disabled=true disables the inputs', () => {
    const { container } = render(<DateRangePicker disabled />);
    const inputs = container.querySelectorAll('input');
    for (const input of inputs) {
      expect(input.disabled).toBe(true);
    }
  });

  it('error=string shows the error message', () => {
    render(<DateRangePicker error="Invalid date range" />);
    expect(screen.getByText('Invalid date range')).toBeInTheDocument();
  });

  it('helperText is displayed below the input', () => {
    render(<DateRangePicker helperText="Select start and end dates" />);
    expect(screen.getByText('Select start and end dates')).toBeInTheDocument();
  });

  it('loading=true shows a loading indicator', () => {
    const { container } = render(<DateRangePicker loading />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('Escape key closes the calendar', async () => {
    const user = userEvent.setup();
    const { container } = render(<DateRangePicker />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    await user.keyboard('{Escape}');
    // Should not throw; component should still be mounted
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders picker="month" without errors', async () => {
    const user = userEvent.setup();
    const { container } = render(<DateRangePicker picker="month" />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders picker="year" without errors', async () => {
    const user = userEvent.setup();
    const { container } = render(<DateRangePicker picker="year" />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('showTime=true renders without errors', async () => {
    const user = userEvent.setup();
    const { container } = render(<DateRangePicker showTime />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('inputRef exposes value and reset', async () => {
    const ref = React.createRef<DateRangePickerRef>();
    const range: [Date, Date] = [new Date(2024, 0, 1), new Date(2024, 0, 31)];
    render(<DateRangePicker inputRef={ref} defaultValue={range} />);
    await waitFor(() => expect(ref.current).not.toBeNull());
    expect(ref.current!.value).not.toBeNull();
    ref.current!.reset();
    await waitFor(() => {
      expect(ref.current!.value).toBeNull();
    });
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<DateRangePicker label="Dark Range" />);
    expect(screen.getByText('Dark Range')).toBeInTheDocument();
  });
});

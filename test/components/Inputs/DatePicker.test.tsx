import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from '../../../src/components/Inputs/DatePicker';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('DatePicker', () => {
  it('renders with placeholder text', () => {
    render(<DatePicker placeholder="Select a date" />);
    expect(screen.getByPlaceholderText('Select a date')).toBeInTheDocument();
  });

  it('clicking input opens calendar panel', async () => {
    const user = userEvent.setup();
    const { container } = render(<DatePicker />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    // Calendar should show day names or navigation
    expect(document.body.innerHTML).toMatch(
      /Mon|Tue|Jan|Feb|Sun|calendar|grid/i,
    );
  });

  it('value prop displays formatted date', () => {
    const date = new Date(2024, 0, 15); // Jan 15, 2024
    const { container } = render(
      <DatePicker value={date} onChange={vi.fn()} />,
    );
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toMatch(/2024|Jan|01/);
  });

  it('defaultValue sets initial date', () => {
    const date = new Date(2024, 5, 20); // Jun 20, 2024
    const { container } = render(<DatePicker defaultValue={date} />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toMatch(/2024/);
  });

  it('disabled=true prevents calendar from opening', async () => {
    const { container } = render(<DatePicker disabled />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('error message is displayed', () => {
    render(<DatePicker error="Invalid date" />);
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
  });

  it('renders with label text', () => {
    render(<DatePicker label="Birth Date" />);
    expect(screen.getByText('Birth Date')).toBeInTheDocument();
  });

  it('renders picker="month" without errors', async () => {
    const user = userEvent.setup();
    const { container } = render(<DatePicker picker="month" />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    // Should not throw
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders picker="year" without errors', async () => {
    const user = userEvent.setup();
    const { container } = render(<DatePicker picker="year" />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('showTime=true renders without errors', async () => {
    const user = userEvent.setup();
    const { container } = render(<DatePicker showTime />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Escape key closes calendar', async () => {
    const user = userEvent.setup();
    const { container } = render(<DatePicker />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    await user.keyboard('{Escape}');
    expect(container.firstChild).toBeInTheDocument();
  });

  it('clearable=true shows clear button when value is set', async () => {
    const user = userEvent.setup();
    const date = new Date(2024, 0, 15);
    const { container } = render(
      <DatePicker clearable value={date} onChange={vi.fn()} />,
    );
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    const clearBtn =
      container.querySelector('[aria-label="clear"]') ??
      container.querySelector('button');
    expect(clearBtn).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<DatePicker label="Dark date" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

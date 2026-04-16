import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioGroup from '../../../src/components/Inputs/RadioGroup';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('RadioGroup', () => {
  it('renders all option labels', () => {
    render(<RadioGroup options={options} />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('uncontrolled: defaultValue selects correct initial option', () => {
    render(<RadioGroup options={options} defaultValue="b" />);
    const inputs = document.querySelectorAll('input[type="radio"]');
    expect((inputs[1] as HTMLInputElement).checked).toBe(true);
  });

  it('uncontrolled: clicking option updates selection', async () => {
    const user = userEvent.setup();
    render(<RadioGroup options={options} />);
    await user.click(screen.getByText('Option C'));
    const inputs = document.querySelectorAll('input[type="radio"]');
    expect((inputs[2] as HTMLInputElement).checked).toBe(true);
  });

  it('controlled: value prop shows correct selection', () => {
    render(<RadioGroup options={options} value="a" onChange={vi.fn()} />);
    const inputs = document.querySelectorAll('input[type="radio"]');
    expect((inputs[0] as HTMLInputElement).checked).toBe(true);
  });

  it('controlled: onChange is called with option object when selection changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RadioGroup options={options} value="a" onChange={onChange} />);
    await user.click(screen.getByText('Option B'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'b' }),
    );
  });

  it('direction="row" applies flex-row class', () => {
    const { container } = render(
      <RadioGroup options={options} direction="row" />,
    );
    const group = container.querySelector('[role="radiogroup"]')!;
    expect(group.className).toMatch(/flex-row/);
  });

  it('direction="column" applies flex-col class', () => {
    const { container } = render(
      <RadioGroup options={options} direction="column" />,
    );
    const group = container.querySelector('[role="radiogroup"]')!;
    expect(group.className).toMatch(/flex-col/);
  });

  it('size="large" renders without errors', () => {
    const { container } = render(<RadioGroup options={options} size="large" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('disabled=true prevents onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RadioGroup options={options} disabled onChange={onChange} />);
    await user.click(screen.getByText('Option A'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<RadioGroup options={options} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../../../src/components/Inputs/Checkbox';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Checkbox', () => {
  it('renders with label text', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('uncontrolled: defaultChecked=true renders checked state', () => {
    render(<Checkbox defaultChecked label="Checked" />);
    const input = document.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('uncontrolled: clicking toggles checked state', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Toggle me" />);
    const input = document.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(input.checked).toBe(false);
    await user.click(input);
    expect(input.checked).toBe(true);
  });

  it('controlled: checked=true renders checked input', () => {
    render(<Checkbox checked onChange={vi.fn()} label="Checked" />);
    const input = document.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('controlled: onChange is called on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} label="Test" />);
    const input = document.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    await user.click(input);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('indeterminate=true renders the indeterminate indicator', () => {
    const { container } = render(
      <Checkbox indeterminate label="Indeterminate" />,
    );
    // indeterminate renders a span with rounded-sm inside the checkbox div
    expect(container.querySelector('span.rounded-sm')).toBeInTheDocument();
  });

  it('disabled=true prevents click and onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox disabled onChange={onChange} label="Disabled" />);
    const input = document.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    await user.click(input);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('loading=true renders spinner icon', () => {
    const { container } = render(<Checkbox loading label="Loading" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('labelPosition="left" places label left of checkbox (flex-row-reverse)', () => {
    const { container } = render(
      <Checkbox label="Left" labelPosition="left" />,
    );
    const label = container.querySelector('label')!;
    expect(label.className).toMatch(/flex-row-reverse/);
  });

  it('labelPosition="right" places label right of checkbox (flex-row)', () => {
    const { container } = render(
      <Checkbox label="Right" labelPosition="right" />,
    );
    const label = container.querySelector('label')!;
    expect(label.className).toMatch(/flex-row/);
  });

  it('labelPosition="top" applies flex-col-reverse class', () => {
    const { container } = render(<Checkbox label="Top" labelPosition="top" />);
    const label = container.querySelector('label')!;
    expect(label.className).toMatch(/flex-col-reverse/);
  });

  it('labelPosition="bottom" applies flex-col class', () => {
    const { container } = render(
      <Checkbox label="Bottom" labelPosition="bottom" />,
    );
    const label = container.querySelector('label')!;
    expect(label.className).toMatch(/flex-col/);
  });

  it('size="large" renders without errors', () => {
    const { container } = render(<Checkbox size="large" label="Large" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Checkbox label="Dark checkbox" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

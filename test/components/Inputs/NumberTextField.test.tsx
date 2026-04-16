import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberTextField from '../../../src/components/Inputs/NumberTextField';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('NumberTextField', () => {
  it('renders with label', () => {
    render(<NumberTextField label="Quantity" />);
    expect(screen.getByText('Quantity')).toBeInTheDocument();
  });

  it('renders an input element', () => {
    render(<NumberTextField />);
    expect(document.querySelector('input')).toBeInTheDocument();
  });

  it('accepts numeric input and calls onChange with number', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberTextField onChange={onChange} />);
    const input = document.querySelector('input') as HTMLInputElement;
    await user.type(input, '42');
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it('rejects non-numeric input (letters)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberTextField onChange={onChange} />);
    const input = document.querySelector('input') as HTMLInputElement;
    await user.type(input, 'abc');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('min constraint shows error message when value is below min', async () => {
    const user = userEvent.setup();
    render(<NumberTextField min={10} />);
    const input = document.querySelector('input') as HTMLInputElement;
    await user.type(input, '5');
    expect(screen.getByText(/at least 10/i)).toBeInTheDocument();
  });

  it('max constraint shows error message when value is above max', async () => {
    const user = userEvent.setup();
    render(<NumberTextField max={100} />);
    const input = document.querySelector('input') as HTMLInputElement;
    await user.type(input, '200');
    expect(screen.getByText(/no more than 100/i)).toBeInTheDocument();
  });

  it('disabled=true prevents input', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberTextField disabled onChange={onChange} />);
    const input = document.querySelector('input') as HTMLInputElement;
    await user.type(input, '5');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<NumberTextField />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

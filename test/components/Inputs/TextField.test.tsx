import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from '../../../src/components/Inputs/TextField';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('TextField', () => {
  it('renders with label text', () => {
    render(<TextField label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders with placeholder text', () => {
    render(<TextField placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('uncontrolled: defaultValue sets initial value', () => {
    const { container } = render(<TextField defaultValue="initial text" />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('initial text');
  });

  it('uncontrolled: typing updates input value', async () => {
    const user = userEvent.setup();
    const { container } = render(<TextField />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.type(input, 'hello');
    expect(input.value).toBe('hello');
  });

  it('controlled: value prop sets displayed value', () => {
    const { container } = render(
      <TextField value="controlled" onChange={vi.fn()} />,
    );
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('controlled');
  });

  it('controlled: onChange is called with new value on typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(<TextField value="" onChange={onChange} />);
    const input = container.querySelector('input') as HTMLInputElement;
    await user.type(input, 'a');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('error message is displayed when provided', () => {
    render(<TextField error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('success=true renders success indicator (SVG icon)', () => {
    const { container } = render(
      <TextField success helperText="Looks good!" />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('loading=true shows spinner icon (SVG)', () => {
    const { container } = render(<TextField loading />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('disabled=true prevents typing', async () => {
    const user = userEvent.setup();
    const { container } = render(<TextField disabled />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    await user.type(input, 'blocked');
    expect(input.value).toBe('');
  });

  it('clearable=true shows clear button when input has value and is focused', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <TextField clearable defaultValue="some text" />,
    );
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input); // focus the input
    // Clear button should appear
    const clearButton =
      container.querySelector('[aria-label="clear"]') ??
      container.querySelector('button[type="button"]');
    expect(clearButton).toBeInTheDocument();
  });

  it('clicking clear button resets value', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <TextField clearable defaultValue="some text" />,
    );
    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input); // focus to show clear button
    const clearButton =
      container.querySelector('[aria-label="clear"]') ??
      container.querySelector('button[type="button"]');
    if (clearButton) {
      await user.click(clearButton);
    }
    expect(input.value).toBe('');
  });

  it('labelPosition="left" applies flex-row layout class', () => {
    const { container } = render(
      <TextField label="Name" labelPosition="left" />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/flex/);
  });

  it('size="large" renders without errors', () => {
    const { container } = render(<TextField size="large" />);
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('fullWidth=true applies w-full class to wrapper', () => {
    const { container } = render(<TextField fullWidth />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/w-full/);
  });

  it('renders startIcon when provided', () => {
    const { container } = render(
      <TextField startIcon={<span data-testid="start-icon">icon</span>} />,
    );
    expect(
      container.querySelector('[data-testid="start-icon"]'),
    ).toBeInTheDocument();
  });

  it('renders endIcon when provided', () => {
    const { container } = render(
      <TextField endIcon={<span data-testid="end-icon">icon</span>} />,
    );
    expect(
      container.querySelector('[data-testid="end-icon"]'),
    ).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<TextField label="Dark field" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextArea from '../../../src/components/Inputs/TextArea';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('TextArea', () => {
  it('renders textarea element', () => {
    const { container } = render(<TextArea />);
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<TextArea placeholder="Enter text here" />);
    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  it('uncontrolled: defaultValue sets initial value', () => {
    const { container } = render(<TextArea defaultValue="Hello world" />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('Hello world');
  });

  it('uncontrolled: typing updates value', async () => {
    const user = userEvent.setup();
    const { container } = render(<TextArea />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    await user.type(textarea, 'typed text');
    expect(textarea.value).toBe('typed text');
  });

  it('controlled: value prop sets content', () => {
    const { container } = render(
      <TextArea value="controlled" onChange={vi.fn()} />,
    );
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('controlled');
  });

  it('controlled: onChange is called on typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(<TextArea value="" onChange={onChange} />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    await user.type(textarea, 'a');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('lines prop sets rows attribute', () => {
    const { container } = render(<TextArea lines={5} />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.rows).toBe(5);
  });

  it('disabled=true prevents input', async () => {
    const user = userEvent.setup();
    const { container } = render(<TextArea disabled />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
    await user.type(textarea, 'should not type');
    expect(textarea.value).toBe('');
  });

  it('error message is displayed', () => {
    render(<TextArea error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<TextArea label="Dark textarea" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

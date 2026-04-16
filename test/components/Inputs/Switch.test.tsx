import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../../../src/components/Inputs/Switch';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Switch', () => {
  it('uncontrolled: defaultChecked=false renders falseLabel', () => {
    render(<Switch falseLabel="Off" trueLabel="On" />);
    expect(screen.getByText('Off')).toBeInTheDocument();
  });

  it('uncontrolled: clicking toggles to on state and shows trueLabel', async () => {
    const user = userEvent.setup();
    render(<Switch falseLabel="Off" trueLabel="On" />);
    const toggle = screen.getByRole('button');
    await user.click(toggle);
    expect(screen.getByText('On')).toBeInTheDocument();
  });

  it('controlled: checked=true renders trueLabel', () => {
    render(<Switch checked falseLabel="Off" trueLabel="On" />);
    expect(screen.getByText('On')).toBeInTheDocument();
  });

  it('controlled: onChange is called with new value on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Switch
        checked={false}
        onChange={onChange}
        falseLabel="Off"
        trueLabel="On"
      />,
    );
    await user.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('disabled=true prevents click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Switch disabled onChange={onChange} falseLabel="Off" trueLabel="On" />,
    );
    // When disabled, the role="button" div has tabIndex=-1 and onMouseDown=undefined
    const toggle = screen.queryByRole('button');
    if (toggle) {
      await user.click(toggle);
    }
    expect(onChange).not.toHaveBeenCalled();
  });

  it('loading=true renders spinner instead of toggle', () => {
    const { container } = render(
      <Switch loading falseLabel="Off" trueLabel="On" />,
    );
    // Loading state replaces the toggle with a spinner Icon
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders trueLabel text when switch is on', () => {
    render(<Switch checked trueLabel="Active" falseLabel="Inactive" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders falseLabel text when switch is off', () => {
    render(<Switch checked={false} trueLabel="Active" falseLabel="Inactive" />);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('label text is displayed', () => {
    render(<Switch label="Enable feature" falseLabel="Off" trueLabel="On" />);
    expect(screen.getByText('Enable feature')).toBeInTheDocument();
  });

  it('size="large" renders without errors', () => {
    const { container } = render(
      <Switch size="large" falseLabel="Off" trueLabel="On" />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Switch falseLabel="Off" trueLabel="On" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

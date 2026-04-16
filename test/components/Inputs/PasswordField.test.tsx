import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordField from '../../../src/components/Inputs/PasswordField';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('PasswordField', () => {
  it('renders with password type (input is masked)', () => {
    const { container } = render(<PasswordField />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).toHaveAttribute('type', 'password');
  });

  it('clicking show password button reveals the input (type="text")', async () => {
    const user = userEvent.setup();
    render(<PasswordField />);
    const toggleButton = screen.getByRole('button', { name: /show password/i });
    await user.click(toggleButton);
    const input = document.querySelector('input') as HTMLInputElement;
    expect(input).toHaveAttribute('type', 'text');
  });

  it('clicking hide password button masks the input again (type="password")', async () => {
    const user = userEvent.setup();
    render(<PasswordField />);
    const toggleButton = screen.getByRole('button', { name: /show password/i });
    await user.click(toggleButton);
    // Now it should show "Hide password"
    const hideButton = screen.getByRole('button', { name: /hide password/i });
    await user.click(hideButton);
    const input = document.querySelector('input') as HTMLInputElement;
    expect(input).toHaveAttribute('type', 'password');
  });

  it('controlled: onChange is called when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PasswordField value="" onChange={onChange} />);
    const input = document.querySelector('input') as HTMLInputElement;
    await user.type(input, 'secret');
    expect(onChange).toHaveBeenCalled();
  });

  it('disabled=true prevents typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PasswordField disabled onChange={onChange} />);
    const input = document.querySelector('input') as HTMLInputElement;
    await user.type(input, 'test');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('error message is displayed when provided', () => {
    render(<PasswordField error="Password is required" />);
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<PasswordField />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

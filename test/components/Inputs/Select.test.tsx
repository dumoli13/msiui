import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Select from '../../../src/components/Inputs/Select';

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  document.documentElement.classList.remove('dark');
});

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('Select', () => {
  it('renders with placeholder text', () => {
    render(<Select options={options} placeholder="Choose fruit" />);
    expect(screen.getByText('Choose fruit')).toBeInTheDocument();
  });

  it('clicking input opens dropdown with options', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Select options={options} placeholder="Select" />,
    );
    const trigger =
      container.querySelector('[role="combobox"]') ??
      container.querySelector('[tabindex="0"]');
    await user.click(trigger as Element);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('clicking an option selects it and calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Select options={options} onChange={onChange} />,
    );
    const trigger = container.querySelector('[tabindex="0"]') as HTMLElement;
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'banana' }),
    );
  });

  it('selected option label is displayed', async () => {
    const user = userEvent.setup();
    const { container } = render(<Select options={options} />);
    const trigger = container.querySelector('[tabindex="0"]') as HTMLElement;
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Apple' }));
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('controlled: value prop shows correct selection', () => {
    render(
      <Select
        options={options}
        value={{ label: 'Cherry', value: 'cherry' }}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('keyboard ArrowDown opens dropdown', async () => {
    const user = userEvent.setup();
    const { container } = render(<Select options={options} />);
    const trigger = container.querySelector('[tabindex="0"]') as HTMLElement;
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('keyboard Enter selects highlighted option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Select options={options} onChange={onChange} />,
    );
    const trigger = container.querySelector('[tabindex="0"]') as HTMLElement;
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith(options[0]);
  });

  it('keyboard Escape closes dropdown', async () => {
    const user = userEvent.setup();
    const { container } = render(<Select options={options} />);
    const trigger = container.querySelector('[tabindex="0"]') as HTMLElement;
    await user.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('disabled=true prevents interaction', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Select options={options} disabled onChange={onChange} />,
    );
    const trigger = container.querySelector('[tabindex="0"]') as HTMLElement;
    await user.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('error message is displayed', () => {
    render(<Select options={options} error="Please select an option" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('renders with label text', () => {
    render(<Select options={options} label="Fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('clearable=true shows clear button when option is selected', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Select
        options={options}
        clearable
        value={{ label: 'Apple', value: 'apple' }}
        onChange={vi.fn()}
      />,
    );
    // Focus to trigger clear button visibility
    const trigger = container.querySelector('[tabindex="0"]') as HTMLElement;
    await user.click(trigger);
    // Clear button should be present when focused with value
    const clearBtn = container.querySelector('[aria-label="Clear value"]');
    expect(clearBtn).toBeInTheDocument();
  });

  it('clicking clear button clears selection', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Select
        options={options}
        clearable
        value={{ label: 'Apple', value: 'apple' }}
        onChange={onChange}
      />,
    );
    const trigger = container.querySelector('[tabindex="0"]') as HTMLElement;
    await user.click(trigger);
    const clearBtn = container.querySelector(
      '[aria-label="Clear value"]',
    ) as Element;
    if (clearBtn) {
      await user.click(clearBtn);
    }
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<Select options={options} placeholder="Dark select" />);
    expect(screen.getByText('Dark select')).toBeInTheDocument();
  });
});

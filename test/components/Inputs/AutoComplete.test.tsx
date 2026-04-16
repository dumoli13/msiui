import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AutoComplete from '../../../src/components/Inputs/AutoComplete';
import type { AutoCompleteRef } from '../../../src/types/inputs/autoComplete';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('AutoComplete', () => {
  it('renders with label text', () => {
    render(<AutoComplete options={options} label="Fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('renders with placeholder text', () => {
    render(<AutoComplete options={options} placeholder="Pick a fruit" />);
    expect(screen.getByPlaceholderText('Pick a fruit')).toBeInTheDocument();
  });

  it('clicking input opens dropdown with options', async () => {
    const user = userEvent.setup();
    render(<AutoComplete options={options} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText('Search'));
    // Options render as <button role="option"> (no role="listbox" wrapper)
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Cherry' })).toBeInTheDocument();
  });

  it('clicking an option selects it and calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <AutoComplete
        options={options}
        onChange={onChange}
        placeholder="Search"
      />,
    );
    await user.click(screen.getByPlaceholderText('Search'));
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'banana' }),
    );
  });

  it('selected option label is shown in the input after selection', async () => {
    const user = userEvent.setup();
    render(<AutoComplete options={options} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText('Search'));
    await user.click(screen.getByRole('option', { name: 'Apple' }));
    // When unfocused, selected label is shown as placeholder (value="" placeholder="Apple")
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Apple')).toBeInTheDocument();
    });
  });

  it('typing filters the dropdown options', async () => {
    const user = userEvent.setup();
    render(<AutoComplete options={options} placeholder="Search" />);
    const input = screen.getByPlaceholderText('Search');
    await user.click(input);
    await user.type(input, 'ban');
    await waitFor(() => {
      expect(
        screen.getByRole('option', { name: 'Banana' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('option', { name: 'Apple' }),
      ).not.toBeInTheDocument();
    });
  });

  it('controlled: value prop shows the correct selection', () => {
    render(
      <AutoComplete
        options={options}
        value={{ label: 'Cherry', value: 'cherry' }}
        onChange={vi.fn()}
        placeholder="Search"
      />,
    );
    // Selected value is shown as placeholder when unfocused
    expect(screen.getByPlaceholderText('Cherry')).toBeInTheDocument();
  });

  it('uncontrolled: defaultValue sets the initial displayed value', () => {
    render(
      <AutoComplete
        options={options}
        defaultValue={{ label: 'Banana', value: 'banana' }}
        placeholder="Search"
      />,
    );
    // defaultValue label is shown as placeholder when unfocused
    expect(screen.getByPlaceholderText('Banana')).toBeInTheDocument();
  });

  it('disabled=true prevents interaction', () => {
    render(<AutoComplete options={options} disabled placeholder="Search" />);
    expect(screen.getByPlaceholderText('Search')).toBeDisabled();
  });

  it('error=string shows the error message', () => {
    render(
      <AutoComplete
        options={options}
        error="Selection required"
        placeholder="Search"
      />,
    );
    expect(screen.getByText('Selection required')).toBeInTheDocument();
  });

  it('helperText is displayed below the input', () => {
    render(
      <AutoComplete
        options={options}
        helperText="Choose one fruit"
        placeholder="Search"
      />,
    );
    expect(screen.getByText('Choose one fruit')).toBeInTheDocument();
  });

  it('loading=true shows a loading indicator', () => {
    const { container } = render(
      <AutoComplete options={options} loading placeholder="Search" />,
    );
    // loading spinner is an SVG
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('inputRef exposes value, focus, and reset', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<AutoCompleteRef<string>>();
    render(
      <AutoComplete options={options} inputRef={ref} placeholder="Search" />,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());
    // Initially no selection
    expect(ref.current!.value).toBeNull();
    // Select an option
    await user.click(screen.getByPlaceholderText('Search'));
    await user.click(screen.getByRole('option', { name: 'Cherry' }));
    await waitFor(() => {
      expect(ref.current!.value).toMatchObject({ value: 'cherry' });
    });
    // Reset clears the selection
    ref.current!.reset();
    await waitFor(() => {
      expect(ref.current!.value).toBeNull();
    });
  });

  it('pressing Escape closes the dropdown', async () => {
    const user = userEvent.setup();
    render(<AutoComplete options={options} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText('Search'));
    expect(screen.getAllByRole('option')).toHaveLength(3);
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryAllByRole('option')).toHaveLength(0);
    });
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(
      <AutoComplete
        options={options}
        label="Fruit (dark)"
        placeholder="Search"
      />,
    );
    expect(screen.getByText('Fruit (dark)')).toBeInTheDocument();
  });
});

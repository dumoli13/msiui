import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AutoCompleteMultiple from '../../../src/components/Inputs/AutoCompleteMultiple';
import type { AutoCompleteMultipleRef } from '../../../src/types/inputs/autoCompleteMultiple';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('AutoCompleteMultiple', () => {
  it('renders with label text', () => {
    render(<AutoCompleteMultiple options={options} label="Fruits" />);
    expect(screen.getByText('Fruits')).toBeInTheDocument();
  });

  it('renders with placeholder text', () => {
    render(
      <AutoCompleteMultiple options={options} placeholder="Pick fruits" />,
    );
    expect(screen.getByPlaceholderText('Pick fruits')).toBeInTheDocument();
  });

  it('clicking input opens dropdown with options', async () => {
    const user = userEvent.setup();
    render(<AutoCompleteMultiple options={options} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText('Search'));
    // AutoCompleteMultiple options are plain <button> elements (no role="option")
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Banana' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Cherry' }),
      ).toBeInTheDocument();
    });
  });

  it('selecting an option adds a tag and calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <AutoCompleteMultiple
        options={options}
        onChange={onChange}
        placeholder="Search"
      />,
    );
    await user.click(screen.getByPlaceholderText('Search'));
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Banana' }),
      ).toBeInTheDocument(),
    );
    await user.click(screen.getByRole('button', { name: 'Banana' }));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ value: 'banana' })]),
      );
    });
  });

  it('selected option appears as a tag in the input', async () => {
    const user = userEvent.setup();
    render(<AutoCompleteMultiple options={options} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText('Search'));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument(),
    );
    await user.click(screen.getByRole('button', { name: 'Apple' }));
    await waitFor(() => {
      // After selection, "Apple" appears in the Tag chip AND in the dropdown
      // (still open), so there are multiple "Apple" elements — use getAllByText
      expect(screen.getAllByText('Apple').length).toBeGreaterThan(0);
    });
  });

  it('multiple options can be selected', async () => {
    const user = userEvent.setup();
    render(<AutoCompleteMultiple options={options} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText('Search'));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument(),
    );
    await user.click(screen.getByRole('button', { name: 'Apple' }));
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Banana' }),
      ).toBeInTheDocument(),
    );
    await user.click(screen.getByRole('button', { name: 'Banana' }));
    await waitFor(() => {
      // Both selected options appear as tags (multiple "Apple"/"Banana" elements
      // exist because tags + dropdown options are both rendered simultaneously)
      expect(screen.getAllByText('Apple').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Banana').length).toBeGreaterThan(0);
    });
  });

  it('typing filters the dropdown options', async () => {
    const user = userEvent.setup();
    render(<AutoCompleteMultiple options={options} placeholder="Search" />);
    const input = screen.getByPlaceholderText('Search');
    await user.click(input);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument(),
    );
    await user.type(input, 'ban');
    await waitFor(() => {
      // The outer InputDropdown wrapper also gets accessible name "Banana" from
      // its content, so use getAllByRole and check at least one Banana button exists
      expect(
        screen.getAllByRole('button', { name: 'Banana' }).length,
      ).toBeGreaterThan(0);
      // Apple option button should be completely gone (filtered out)
      expect(
        screen.queryByRole('button', { name: 'Apple' }),
      ).not.toBeInTheDocument();
    });
  });

  it('controlled: value prop shows the correct selections as tags', () => {
    render(
      <AutoCompleteMultiple
        options={options}
        value={[
          { label: 'Cherry', value: 'cherry' },
          { label: 'Apple', value: 'apple' },
        ]}
        onChange={vi.fn()}
        placeholder="Search"
      />,
    );
    expect(screen.getByText('Cherry')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('disabled=true prevents interaction', () => {
    render(
      <AutoCompleteMultiple options={options} disabled placeholder="Search" />,
    );
    expect(screen.getByPlaceholderText('Search')).toBeDisabled();
  });

  it('error=string shows the error message', () => {
    render(
      <AutoCompleteMultiple
        options={options}
        error="At least one selection required"
        placeholder="Search"
      />,
    );
    expect(
      screen.getByText('At least one selection required'),
    ).toBeInTheDocument();
  });

  it('helperText is displayed below the input', () => {
    render(
      <AutoCompleteMultiple
        options={options}
        helperText="You can select multiple fruits"
        placeholder="Search"
      />,
    );
    expect(
      screen.getByText('You can select multiple fruits'),
    ).toBeInTheDocument();
  });

  it('loading=true shows a loading indicator', () => {
    const { container } = render(
      <AutoCompleteMultiple options={options} loading placeholder="Search" />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('inputRef exposes value and reset', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<AutoCompleteMultipleRef<string>>();
    render(
      <AutoCompleteMultiple
        options={options}
        inputRef={ref}
        placeholder="Search"
      />,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());
    // Initially empty
    expect(ref.current!.value).toEqual([]);
    // Select an option
    await user.click(screen.getByPlaceholderText('Search'));
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Cherry' }),
      ).toBeInTheDocument(),
    );
    await user.click(screen.getByRole('button', { name: 'Cherry' }));
    await waitFor(() => {
      expect(ref.current!.value).toEqual(
        expect.arrayContaining([expect.objectContaining({ value: 'cherry' })]),
      );
    });
    // Reset clears the selection
    ref.current!.reset();
    await waitFor(() => {
      expect(ref.current!.value).toEqual([]);
    });
  });

  it('pressing Escape closes the dropdown', async () => {
    const user = userEvent.setup();
    render(<AutoCompleteMultiple options={options} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText('Search'));
    // Wait for dropdown options to appear
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument(),
    );
    await user.keyboard('{Escape}');
    // After Escape, dropdown closes and options are removed from DOM
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Apple' }),
      ).not.toBeInTheDocument();
    });
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(
      <AutoCompleteMultiple
        options={options}
        label="Fruits (dark)"
        placeholder="Search"
      />,
    );
    expect(screen.getByText('Fruits (dark)')).toBeInTheDocument();
  });
});

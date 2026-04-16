import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Button from '../../../src/components/Inputs/Button';
import Form, { FormField } from '../../../src/components/Inputs/Form';
import TextField from '../../../src/components/Inputs/TextField';
import type { FormRef } from '../../../src/types/inputs/form';

type AnyFormRef = FormRef<Record<string, unknown>>;

const FIELD_REQUIRED_MSG = 'This field is required';

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  document.documentElement.classList.remove('dark');
});

describe('Form', () => {
  it('renders form children correctly', () => {
    render(
      <Form>
        <TextField name="username" label="Username" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('onSubmit is called with form values when submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Form onSubmit={onSubmit}>
        <TextField name="username" label="Username" defaultValue="John" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it('validation: errors shown when required field is empty on submit', async () => {
    const user = userEvent.setup();
    render(
      <Form
        rules={() => ({
          username: [{ required: true }],
        })}
      >
        <TextField name="username" label="Username" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText(FIELD_REQUIRED_MSG)).toBeInTheDocument();
    });
  });

  it('validation: onSubmit NOT called when validation fails', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Form
        onSubmit={onSubmit}
        rules={() => ({
          username: [{ required: true }],
        })}
      >
        <TextField name="username" label="Username" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it('validation: onSubmit called when all rules pass', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Form
        onSubmit={onSubmit}
        rules={() => ({
          username: [{ required: true }],
        })}
      >
        <TextField name="username" label="Username" defaultValue="John" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it('disabled=true disables all inputs', () => {
    const { container } = render(
      <Form disabled>
        <TextField name="username" label="Username" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    const inputs = container.querySelectorAll('input');
    for (const input of inputs) {
      expect(input.disabled).toBe(true);
    }
  });

  it('renders children wrapped in a div container', () => {
    const { container } = render(
      <Form>
        <TextField name="test" label="Test" />
      </Form>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('email validation shows error for invalid email', async () => {
    const user = userEvent.setup();
    render(
      <Form
        rules={() => ({
          email: [{ email: true }],
        })}
      >
        <TextField name="email" label="Email" defaultValue="not-an-email" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(
        screen.getByText('Please enter a valid email address'),
      ).toBeInTheDocument();
    });
  });

  it('pattern validation shows error when pattern does not match', async () => {
    const user = userEvent.setup();
    render(
      <Form
        rules={() => ({
          code: [{ pattern: /^\d{4}$/, message: 'Must be 4 digits' }],
        })}
      >
        <TextField name="code" label="Code" defaultValue="abc" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText('Must be 4 digits')).toBeInTheDocument();
    });
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(
      <Form>
        <TextField name="field" label="Dark form field" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    expect(screen.getByText('Dark form field')).toBeInTheDocument();
  });

  // ── inputRef imperative handle ──────────────────────────────────────────────

  it('inputRef.getValues() returns current field values', async () => {
    const ref = React.createRef<AnyFormRef>();
    render(
      <Form formRef={ref}>
        <TextField name="username" label="Username" defaultValue="Alice" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await waitFor(() => {
      expect(ref.current).not.toBeNull();
    });
    const values = ref.current!.getValues();
    expect(values).toMatchObject({ username: 'Alice' });
  });

  it('inputRef.getValue(name) returns the value of a single field', async () => {
    const ref = React.createRef<AnyFormRef>();
    render(
      <Form formRef={ref}>
        <TextField name="city" label="City" defaultValue="Jakarta" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());
    const city = ref.current!.getValue('city');
    expect(city).toBe('Jakarta');
  });

  it('inputRef.reset() clears dirty fields and resets inputs', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<AnyFormRef>();
    render(
      <Form formRef={ref}>
        <TextField name="note" label="Note" defaultValue="original" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());
    // dirty the field first
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'changed');
    expect(ref.current!.getDirtyFields()).toMatchObject({ note: true });
    // reset
    ref.current!.reset();
    await waitFor(() => {
      expect(ref.current!.getDirtyFields()).toEqual({});
    });
  });

  it('inputRef.validate() returns invalid field names when required rule fails', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<AnyFormRef>();
    render(
      <Form formRef={ref} rules={() => ({ email: [{ required: true }] })}>
        {/* defaultValue="" ensures value is '' (not undefined) so required check fires */}
        <TextField name="email" label="Email" defaultValue="" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    // Trigger a submit to populate inputRefsRef before calling validate() directly
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText(FIELD_REQUIRED_MSG)).toBeInTheDocument();
    });
    // formRef should now be populated; validate() should return the invalid field name
    const invalid = ref.current!.validate();
    expect(invalid).toContain('email');
  });

  it('inputRef.setErrors() shows custom error messages', async () => {
    const ref = React.createRef<AnyFormRef>();
    render(
      <Form formRef={ref}>
        <TextField name="code" label="Code" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());
    ref.current!.setErrors({ code: 'Invalid code entered' });
    await waitFor(() => {
      expect(screen.getByText('Invalid code entered')).toBeInTheDocument();
    });
  });

  // ── multiple fields with the same name (generated groups) ───────────────────

  it('getValues() collects multiple same-name fields into an array', async () => {
    const ref = React.createRef<AnyFormRef>();
    render(
      <Form formRef={ref}>
        <TextField name="tag" label="Tag 1" defaultValue="alpha" />
        <TextField name="tag" label="Tag 2" defaultValue="beta" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());
    const values = ref.current!.getValues();
    expect(Array.isArray(values.tag)).toBe(true);
    expect(values.tag).toEqual(expect.arrayContaining(['alpha', 'beta']));
  });

  // ── onReset HTML event ───────────────────────────────────────────────────────

  it('native form reset event calls handleReset', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<AnyFormRef>();
    render(
      <Form formRef={ref}>
        <TextField name="field" label="Field" defaultValue="value" />
        <Button type="reset">Reset</Button>
      </Form>,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());
    // dirty the field
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'dirty');
    expect(ref.current!.getDirtyFields()).toMatchObject({ field: true });
    // native reset button fires onReset handler
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    await waitFor(() => {
      expect(ref.current!.getDirtyFields()).toEqual({});
    });
  });

  // ── FormField — inputs inside a custom component wired via context ──────────

  it('FormField: input inside a custom component is enhanced and its value is collected', async () => {
    const ref = React.createRef<AnyFormRef>();

    function CustomRow() {
      return (
        <div>
          <FormField>
            <TextField name="nested" label="Nested" defaultValue="ctx-value" />
          </FormField>
        </div>
      );
    }

    render(
      <Form formRef={ref}>
        <CustomRow />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());
    const values = ref.current!.getValues();
    expect(values).toMatchObject({ nested: 'ctx-value' });
  });

  it('FormField: validation error is shown for a required field inside a custom component', async () => {
    const user = userEvent.setup();

    function CustomRow() {
      return (
        <div>
          <FormField>
            <TextField name="inner" label="Inner" />
          </FormField>
        </div>
      );
    }

    render(
      <Form rules={() => ({ inner: [{ required: true }] })}>
        <CustomRow />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText(FIELD_REQUIRED_MSG)).toBeInTheDocument();
    });
  });

  it('FormField: renders its child unchanged when used outside a Form', () => {
    render(
      <FormField>
        <TextField name="orphan" label="Orphan field" />
      </FormField>,
    );
    expect(screen.getByText('Orphan field')).toBeInTheDocument();
  });

  // ── lastValuesRef — cached values persist after unmount ─────────────────────

  function ConditionalForm({
    showNotes,
    formRef,
  }: {
    showNotes: boolean;
    formRef: React.RefObject<AnyFormRef | null>;
  }) {
    return (
      <Form formRef={formRef}>
        <TextField name="name" label="Name" defaultValue="Alice" />
        {showNotes && (
          <TextField name="notes" label="Notes" defaultValue="initial" />
        )}
      </Form>
    );
  }

  it('getValues() preserves last value after input unmounts', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<AnyFormRef>();

    const { rerender } = render(
      <ConditionalForm showNotes={true} formRef={ref} />,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());

    // Change the notes field value
    const notesInput = screen.getByRole('textbox', { name: 'Notes' });
    await user.clear(notesInput);
    await user.type(notesInput, 'updated notes');

    // Unmount the notes field
    rerender(<ConditionalForm showNotes={false} formRef={ref} />);

    // getValues should still include the cached notes value
    const values = ref.current!.getValues();
    expect(values).toMatchObject({ name: 'Alice', notes: 'updated notes' });
  });

  it('getValue() returns cached value for unmounted field', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<AnyFormRef>();

    const { rerender } = render(
      <ConditionalForm showNotes={true} formRef={ref} />,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());

    const notesInput = screen.getByRole('textbox', { name: 'Notes' });
    await user.clear(notesInput);
    await user.type(notesInput, 'my note');

    rerender(<ConditionalForm showNotes={false} formRef={ref} />);

    expect(ref.current!.getValue('notes')).toBe('my note');
  });

  it('reset() clears cached values for unmounted fields', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<AnyFormRef>();

    const { rerender } = render(
      <ConditionalForm showNotes={true} formRef={ref} />,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());

    const notesInput = screen.getByRole('textbox', { name: 'Notes' });
    await user.clear(notesInput);
    await user.type(notesInput, 'dirty value');

    // Unmount notes
    rerender(<ConditionalForm showNotes={false} formRef={ref} />);
    expect(ref.current!.getValue('notes')).toBe('dirty value');

    // Reset should clear cached values
    ref.current!.reset();
    expect(ref.current!.getValue('notes')).toBeUndefined();
  });

  it('cached value is overwritten when field remounts and changes', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<AnyFormRef>();

    const { rerender } = render(
      <ConditionalForm showNotes={true} formRef={ref} />,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());

    // Type in notes, then unmount
    const notesInput = screen.getByRole('textbox', { name: 'Notes' });
    await user.clear(notesInput);
    await user.type(notesInput, 'old value');
    rerender(<ConditionalForm showNotes={false} formRef={ref} />);
    expect(ref.current!.getValue('notes')).toBe('old value');

    // Remount notes field
    rerender(<ConditionalForm showNotes={true} formRef={ref} />);
    const newNotesInput = screen.getByRole('textbox', { name: 'Notes' });
    await user.clear(newNotesInput);
    await user.type(newNotesInput, 'new value');

    // Live ref should take precedence over cached value
    expect(ref.current!.getValue('notes')).toBe('new value');
    expect(ref.current!.getValues()).toMatchObject({
      name: 'Alice',
      notes: 'new value',
    });
  });

  // ── Performance: disabled state propagation via store ─────────────────────

  it('async onSubmit: form awaits async handler before re-enabling', async () => {
    const user = userEvent.setup();
    let resolveSubmit: () => void;
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmit = resolve;
        }),
    );
    const ref = React.createRef<AnyFormRef>();

    render(
      <Form formRef={ref} onSubmit={onSubmit}>
        <TextField name="name" label="Name" defaultValue="Alice" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());

    // Submit the form
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

    // While the async handler is pending, the input should be disabled
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    // Resolve the submit handler
    resolveSubmit!();
    await waitFor(() => {
      expect(input).not.toBeDisabled();
    });
  });

  it('concurrent submit prevention: second submit blocked while first is in-flight', async () => {
    const user = userEvent.setup();
    let resolveSubmit: () => void;
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmit = resolve;
        }),
    );

    render(
      <Form onSubmit={onSubmit}>
        <TextField name="name" label="Name" defaultValue="Alice" />
        <Button type="submit">Submit</Button>
      </Form>,
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // First submit
    await user.click(submitButton);
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

    // Button should be disabled during submit
    expect(submitButton).toBeDisabled();

    // Resolve first submit
    resolveSubmit!();
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('runtime disabled prop toggle propagates to inputs', async () => {
    function ToggleForm() {
      const [disabled, setDisabled] = React.useState(false);
      return (
        <>
          <button onClick={() => setDisabled((d) => !d)}>Toggle</button>
          <Form disabled={disabled}>
            <TextField name="field" label="Field" />
          </Form>
        </>
      );
    }

    const user = userEvent.setup();
    render(<ToggleForm />);

    const input = screen.getByRole('textbox');
    expect(input).not.toBeDisabled();

    // Enable disabled
    await user.click(screen.getByText('Toggle'));
    await waitFor(() => {
      expect(input).toBeDisabled();
    });

    // Disable disabled
    await user.click(screen.getByText('Toggle'));
    await waitFor(() => {
      expect(input).not.toBeDisabled();
    });
  });

  it('validation: custom validate rule receives correct value and blocks submit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const validateFn = vi.fn((value: string) => value.startsWith('MIS'));
    render(
      <Form<{ code: string }>
        onSubmit={onSubmit}
        rules={() => ({
          code: [{ validate: validateFn, message: 'Must start with MIS' }],
        })}
      >
        <TextField name="code" label="Code" defaultValue="ABC" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText('Must start with MIS')).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
    expect(validateFn).toHaveBeenCalledWith('ABC');
  });

  it('validation: custom validate rule passes when returning true', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Form<{ code: string }>
        onSubmit={onSubmit}
        rules={() => ({
          code: [{ validate: (value) => value.startsWith('MIS') }],
        })}
      >
        <TextField name="code" label="Code" defaultValue="MIS001" />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it('FormField + same-name fields: both fields collect values correctly', async () => {
    const ref = React.createRef<AnyFormRef>();

    function CustomRow() {
      return (
        <div>
          <FormField>
            <TextField name="tag" label="Tag 2" defaultValue="from-context" />
          </FormField>
        </div>
      );
    }

    render(
      <Form formRef={ref}>
        <TextField name="tag" label="Tag 1" defaultValue="direct" />
        <CustomRow />
        <Button type="submit">Submit</Button>
      </Form>,
    );
    await waitFor(() => expect(ref.current).not.toBeNull());

    const values = ref.current!.getValues();
    expect(Array.isArray(values.tag)).toBe(true);
    expect(values.tag).toEqual(
      expect.arrayContaining(['direct', 'from-context']),
    );
  });
});

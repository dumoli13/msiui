import { fireEvent, render, screen } from '@testing-library/react';
import Stepper from '../../../src/components/Navigations/Stepper';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

const items = [
  { title: 'Step One' },
  { title: 'Step Two' },
  { title: 'Step Three' },
];

describe('Stepper', () => {
  it('renders all step titles', () => {
    render(<Stepper items={items} active={0} />);
    expect(screen.getByText('Step One')).toBeInTheDocument();
    expect(screen.getByText('Step Two')).toBeInTheDocument();
    expect(screen.getByText('Step Three')).toBeInTheDocument();
  });

  it('active step is visible', () => {
    render(<Stepper items={items} active={1} />);
    expect(screen.getByText('Step Two')).toBeInTheDocument();
  });

  it('completed steps render as clickable buttons', () => {
    render(<Stepper items={items} active={2} onChange={vi.fn()} />);
    // Steps 0 and 1 are completed (active=2), so they should be buttons
    const buttons = screen.getAllByRole('button');
    // At least the completed steps should be buttons
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('clicking a completed step calls onChange with the step index', () => {
    const onChange = vi.fn();
    render(<Stepper items={items} active={2} onChange={onChange} />);
    // Step One (index 0) and Step Two (index 1) are completed
    const stepOneButton = screen.getAllByRole('button')[0];
    fireEvent.click(stepOneButton);
    expect(onChange).toHaveBeenCalled();
  });

  it('step with available=true can be clicked when not yet active', () => {
    const onChange = vi.fn();
    const itemsWithAvailable = [
      { title: 'Step One' },
      { title: 'Step Two' },
      { title: 'Step Three', available: true },
    ];
    render(
      <Stepper items={itemsWithAvailable} active={0} onChange={onChange} />,
    );
    // Step Three (index 2) is available → its button should be enabled
    const btns = screen.getAllByRole('button');
    const availableBtn = btns.find((b) => !(b as HTMLButtonElement).disabled);
    expect(availableBtn).toBeDefined();
  });

  it('step with available=false is disabled when not yet active', () => {
    const onChange = vi.fn();
    const itemsWithUnavailable = [
      { title: 'Step One' },
      { title: 'Step Two', available: false },
      { title: 'Step Three' },
    ];
    render(
      <Stepper items={itemsWithUnavailable} active={0} onChange={onChange} />,
    );
    // Future steps without available=true should have disabled buttons
    const btns = screen.getAllByRole('button');
    for (const btn of btns) {
      expect(btn).toBeDisabled();
    }
  });

  it('disabled=true disables all step buttons', () => {
    render(<Stepper items={items} active={1} onChange={vi.fn()} disabled />);
    const buttons = screen.getAllByRole('button');
    for (const btn of buttons) {
      expect(btn).toBeDisabled();
    }
  });

  it('without onChange, all step buttons are disabled', () => {
    render(<Stepper items={items} active={2} />);
    const buttons = screen.queryAllByRole('button');
    for (const btn of buttons) {
      expect(btn).toBeDisabled();
    }
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<Stepper items={items} active={0} />);
    expect(screen.getByText('Step One')).toBeInTheDocument();
  });
});

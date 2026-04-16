import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from '../../../src/components/Displays/Accordion';
import type { AccordionProps } from '../../../src/types';

const defaultItems: AccordionProps['items'] = [
  { key: '1', title: 'Item One', content: 'Content One' },
  { key: '2', title: 'Item Two', content: 'Content Two' },
  { key: '3', title: 'Item Three', content: 'Content Three' },
];

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Accordion', () => {
  it('renders all accordion items with their titles', () => {
    render(<Accordion items={defaultItems} />);
    expect(screen.getByText('Item One')).toBeInTheDocument();
    expect(screen.getByText('Item Two')).toBeInTheDocument();
    expect(screen.getByText('Item Three')).toBeInTheDocument();
  });

  it('item content has maxHeight 0px (hidden) by default', () => {
    const { container } = render(<Accordion items={defaultItems} />);
    const contentPanels = container.querySelectorAll('.overflow-hidden');
    for (const panel of contentPanels) {
      expect((panel as HTMLElement).style.maxHeight).toBe('0px');
    }
  });

  it('clicking toggle button changes open state (chevron rotates)', async () => {
    const user = userEvent.setup();
    render(<Accordion items={defaultItems} />);
    const toggleButtons = screen.getAllByRole('button', { name: /^Toggle / });
    // Before click — no rotate-180
    expect(toggleButtons[0]).not.toHaveClass('rotate-180');
    await user.click(toggleButtons[0]);
    // After click — the button itself has rotate-180 for collapsible='icon'
    expect(toggleButtons[0]).toHaveClass('rotate-180');
  });

  it('clicking toggle button again on open item collapses it', async () => {
    const user = userEvent.setup();
    render(<Accordion items={defaultItems} />);
    const toggleButtons = screen.getAllByRole('button', { name: /^Toggle / });
    await user.click(toggleButtons[0]);
    expect(toggleButtons[0]).toHaveClass('rotate-180');
    await user.click(toggleButtons[0]);
    expect(toggleButtons[0]).not.toHaveClass('rotate-180');
  });

  it('defaultActiveKey opens specified items on mount', () => {
    render(<Accordion items={defaultItems} defaultActiveKey={['1']} />);
    const toggleButtons = screen.getAllByRole('button', { name: /^Toggle / });
    expect(toggleButtons[0]).toHaveClass('rotate-180');
    expect(toggleButtons[1]).not.toHaveClass('rotate-180');
  });

  it('controlled activeKey prop controls open state', () => {
    render(<Accordion items={defaultItems} activeKey={['2']} />);
    const toggleButtons = screen.getAllByRole('button', { name: /^Toggle / });
    expect(toggleButtons[0]).not.toHaveClass('rotate-180');
    expect(toggleButtons[1]).toHaveClass('rotate-180');
  });

  it('onChangeActiveKey is called with updated keys when toggling', async () => {
    const user = userEvent.setup();
    const onChangeActiveKey = vi.fn();
    render(
      <Accordion items={defaultItems} onChangeActiveKey={onChangeActiveKey} />,
    );
    const toggleButtons = screen.getAllByRole('button', { name: /^Toggle / });
    await user.click(toggleButtons[0]);
    expect(onChangeActiveKey).toHaveBeenCalledWith(['1']);
  });

  it('singleCollapse=true closes other items when one opens', async () => {
    const user = userEvent.setup();
    render(<Accordion items={defaultItems} singleCollapse />);
    const toggleButtons = screen.getAllByRole('button', { name: /^Toggle / });
    await user.click(toggleButtons[0]);
    expect(toggleButtons[0]).toHaveClass('rotate-180');
    await user.click(toggleButtons[1]);
    expect(toggleButtons[1]).toHaveClass('rotate-180');
    // First item should be closed now
    expect(toggleButtons[0]).not.toHaveClass('rotate-180');
  });

  it('singleCollapse=false allows multiple items open simultaneously', async () => {
    const user = userEvent.setup();
    render(<Accordion items={defaultItems} singleCollapse={false} />);
    const toggleButtons = screen.getAllByRole('button', { name: /^Toggle / });
    await user.click(toggleButtons[0]);
    await user.click(toggleButtons[1]);
    expect(toggleButtons[0]).toHaveClass('rotate-180');
    expect(toggleButtons[1]).toHaveClass('rotate-180');
  });

  it('collapsible="icon" renders toggle as a dedicated button (not full-width)', () => {
    render(<Accordion items={defaultItems} collapsible="icon" />);
    const toggleButtons = screen.getAllByRole('button', { name: /^Toggle / });
    // In icon mode the toggle button should NOT have w-full class
    for (const btn of toggleButtons) {
      expect(btn).not.toHaveClass('w-full');
    }
  });

  it('collapsible="full" renders header row as a full-width button', () => {
    render(<Accordion items={defaultItems} collapsible="header" />);
    const toggleButtons = screen.getAllByRole('button', { name: /^Toggle / });
    for (const btn of toggleButtons) {
      expect(btn).toHaveClass('w-full');
    }
  });

  it('size="large" renders without errors', () => {
    const { container } = render(
      <Accordion items={defaultItems} size="large" />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Accordion items={defaultItems} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

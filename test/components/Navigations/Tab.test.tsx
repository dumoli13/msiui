import { fireEvent, render, screen } from '@testing-library/react';
import Tab from '../../../src/components/Navigations/Tab';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

const items = [
  { key: 'tab1', label: 'Overview', children: <div>Overview content</div> },
  { key: 'tab2', label: 'Details', children: <div>Details content</div> },
  { key: 'tab3', label: 'Settings', children: <div>Settings content</div> },
];

describe('Tab', () => {
  it('renders all tab labels', () => {
    render(<Tab items={items} />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Details' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Settings' })).toBeInTheDocument();
  });

  it('renders a tablist', () => {
    render(<Tab items={items} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders a tabpanel', () => {
    render(<Tab items={items} />);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('first tab is active by default (uncontrolled)', () => {
    render(<Tab items={items} />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Overview content')).toBeInTheDocument();
  });

  it('defaultActiveKey sets the initial active tab (uncontrolled)', () => {
    render(<Tab items={items} defaultActiveKey="tab2" />);
    expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Details content')).toBeInTheDocument();
  });

  it('clicking a tab switches the active content (uncontrolled)', () => {
    render(<Tab items={items} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Details' }));
    expect(screen.getByText('Details content')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('clicking a tab calls onTabClick with key, index, and item', () => {
    const onTabClick = vi.fn();
    render(<Tab items={items} onTabClick={onTabClick} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Settings' }));
    expect(onTabClick).toHaveBeenCalledWith(
      'tab3',
      2,
      expect.objectContaining({ key: 'tab3', label: 'Settings' }),
    );
  });

  it('controlled: activeKey prop controls the active tab', () => {
    render(<Tab items={items} activeKey="tab3" onTabClick={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Settings content')).toBeInTheDocument();
  });

  it('controlled: clicking a tab calls onTabClick but does not change if controlled externally', () => {
    const onTabClick = vi.fn();
    render(<Tab items={items} activeKey="tab1" onTabClick={onTabClick} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Details' }));
    expect(onTabClick).toHaveBeenCalledWith(
      'tab2',
      1,
      expect.objectContaining({ key: 'tab2' }),
    );
    // Active tab remains tab1 since we control it externally
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('disabled tab cannot be clicked', () => {
    const onTabClick = vi.fn();
    const itemsWithDisabled = [
      { key: 'tab1', label: 'Overview', children: <div>Overview</div> },
      {
        key: 'tab2',
        label: 'Disabled Tab',
        disabled: true,
        children: <div>Disabled content</div>,
      },
    ];
    render(<Tab items={itemsWithDisabled} onTabClick={onTabClick} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Disabled Tab' }));
    expect(onTabClick).not.toHaveBeenCalled();
  });

  it('disabled tab has aria-selected=false', () => {
    const itemsWithDisabled = [
      { key: 'tab1', label: 'Active', children: <div>A</div> },
      {
        key: 'tab2',
        label: 'Disabled',
        disabled: true,
        children: <div>B</div>,
      },
    ];
    render(<Tab items={itemsWithDisabled} />);
    expect(screen.getByRole('tab', { name: 'Disabled' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('onTabClose renders a close icon next to each tab', () => {
    const onTabClose = vi.fn();
    render(<Tab items={items} onTabClose={onTabClose} />);
    // The Icon component renders with aria-label equal to the icon name ("x-mark")
    const closeBtns = screen.getAllByRole('button', { name: 'x-mark' });
    expect(closeBtns).toHaveLength(3);
  });

  it('clicking a close icon calls onTabClose with key and index', () => {
    const onTabClose = vi.fn();
    render(<Tab items={items} onTabClose={onTabClose} />);
    // First x-mark button corresponds to the first tab (Overview, index 0)
    const closeBtns = screen.getAllByRole('button', { name: 'x-mark' });
    fireEvent.click(closeBtns[0]);
    expect(onTabClose).toHaveBeenCalledWith('tab1', 0);
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<Tab items={items} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});

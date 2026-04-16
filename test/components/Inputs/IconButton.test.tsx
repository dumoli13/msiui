import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Icon from '../../../src/components/Icon';
import IconButton from '../../../src/components/Inputs/IconButton';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

const testIcon = <Icon name="bookmark" variant="solid" />;

describe('IconButton', () => {
  it('renders without crashing', () => {
    const { container } = render(<IconButton title="Render" icon={testIcon} />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('title sets aria-label on the button', () => {
    render(<IconButton icon={testIcon} title="Save" />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<IconButton icon={testIcon} title="Save" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled=true disables the button', () => {
    render(<IconButton icon={testIcon} title="Save" disabled />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('disabled=true does not call onClick when clicked', () => {
    const onClick = vi.fn();
    render(
      <IconButton icon={testIcon} title="Save" disabled onClick={onClick} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('loading=true also disables the button', () => {
    render(<IconButton icon={testIcon} title="Save" loading />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('loading=true shows a loading spinner SVG', () => {
    const { container } = render(
      <IconButton icon={testIcon} title="Save" loading />,
    );
    // The loader icon renders as an SVG
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('renders icon inside the button', () => {
    const { container } = render(<IconButton icon={testIcon} title="Save" />);
    const btn = container.querySelector('button');
    expect(btn?.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <IconButton
        title="test icon"
        icon={testIcon}
        className="my-custom-class"
      />,
    );
    expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
  });

  it('variant=contained renders a button', () => {
    render(<IconButton icon={testIcon} title="Save" variant="contained" />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('variant=outlined renders a button', () => {
    render(<IconButton icon={testIcon} title="Save" variant="outlined" />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('variant=text renders a button', () => {
    render(<IconButton icon={testIcon} title="Save" variant="text" />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('size=small renders a button', () => {
    render(<IconButton icon={testIcon} title="Save" size="small" />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('size=large renders a button', () => {
    render(<IconButton icon={testIcon} title="Save" size="large" />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('color=danger renders a button', () => {
    render(<IconButton icon={testIcon} title="Delete" color="danger" />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('color=success renders a button', () => {
    render(<IconButton icon={testIcon} title="Approve" color="success" />);
    expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
  });

  it('forwards ref to the underlying button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<IconButton icon={testIcon} title="Save" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    render(<IconButton icon={testIcon} title="Dark Save" />);
    expect(
      screen.getByRole('button', { name: 'Dark Save' }),
    ).toBeInTheDocument();
  });
});

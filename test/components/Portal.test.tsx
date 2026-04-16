import { render, screen } from '@testing-library/react';
import { Portal } from '../../src/components/Portal';

describe('Portal', () => {
  it('renders children into document.body by default', () => {
    render(
      <Portal>
        <div data-testid="portal-child">Portal content</div>
      </Portal>,
    );
    // Portal mounts asynchronously via useEffect; after render the child should be in body
    expect(document.body).toContainElement(screen.getByTestId('portal-child'));
  });

  it('children are NOT rendered at the React tree position', () => {
    const { container } = render(
      <div data-testid="react-tree">
        <Portal>
          <span data-testid="portal-span">inside portal</span>
        </Portal>
      </div>,
    );
    // The portal span should NOT be a child of the react-tree div
    expect(container).not.toContainElement(
      screen.queryByTestId('portal-span')!,
    );
  });

  it('renders text content via portal', () => {
    render(
      <Portal>
        <p>Hello from portal</p>
      </Portal>,
    );
    expect(screen.getByText('Hello from portal')).toBeInTheDocument();
  });

  it('unmounting removes children from portal target', () => {
    const { unmount } = render(
      <Portal>
        <div data-testid="to-remove">remove me</div>
      </Portal>,
    );
    expect(screen.getByTestId('to-remove')).toBeInTheDocument();
    unmount();
    expect(screen.queryByTestId('to-remove')).not.toBeInTheDocument();
  });
});

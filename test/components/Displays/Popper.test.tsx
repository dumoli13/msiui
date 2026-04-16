import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popper from '../../../src/components/Displays/Popper';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Popper', () => {
  it('renders trigger children', () => {
    render(
      <Popper content={<div>Content</div>}>
        <button>Trigger</button>
      </Popper>,
    );
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
  });

  it('content is NOT visible by default (uncontrolled)', () => {
    render(
      <Popper content={<div>Hidden content</div>}>
        <button>Trigger</button>
      </Popper>,
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('content shows when trigger is clicked (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(
      <Popper content={<div>Popper content</div>}>
        <button>Trigger</button>
      </Popper>,
    );
    await user.click(screen.getByRole('button', { name: 'Trigger' }));
    expect(screen.getByText('Popper content')).toBeInTheDocument();
  });

  it('content hides when trigger is clicked again', async () => {
    const user = userEvent.setup();
    render(
      <Popper content={<div>Toggle content</div>}>
        <button>Trigger</button>
      </Popper>,
    );
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    await user.click(trigger);
    expect(screen.getByText('Toggle content')).toBeInTheDocument();
    await user.click(trigger);
    await waitFor(() =>
      expect(screen.queryByText('Toggle content')).not.toBeInTheDocument(),
    );
  });

  it('disabled=true: returns children without wrapper, no toggle on click', async () => {
    const user = userEvent.setup();
    render(
      <Popper content={<div>Should not show</div>} disabled>
        <button>Trigger</button>
      </Popper>,
    );
    await user.click(screen.getByRole('button', { name: 'Trigger' }));
    expect(screen.queryByText('Should not show')).not.toBeInTheDocument();
  });

  it('controlled open=true shows content', () => {
    render(
      <Popper content={<div>Controlled content</div>} open>
        <button>Trigger</button>
      </Popper>,
    );
    expect(screen.getByText('Controlled content')).toBeInTheDocument();
  });

  it('controlled open=false hides content', () => {
    render(
      <Popper content={<div>Hidden controlled</div>} open={false}>
        <button>Trigger</button>
      </Popper>,
    );
    expect(screen.queryByText('Hidden controlled')).not.toBeInTheDocument();
  });

  it('onOpen callback called when trigger is clicked (uncontrolled)', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(
      <Popper content={<div>Content</div>} onOpen={onOpen}>
        <button>Trigger</button>
      </Popper>,
    );
    await user.click(screen.getByRole('button', { name: 'Trigger' }));
    expect(onOpen).toHaveBeenCalled();
  });

  it('dark mode: renders without errors', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(
      <Popper content={<div>Content</div>}>
        <button>Trigger</button>
      </Popper>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

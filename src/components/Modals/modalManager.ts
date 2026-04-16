import gsap from 'gsap';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

let activeRoot: Root | null = null;
let activeContainer: HTMLDivElement | null = null;

export function createModal(): {
  root: Root;
  handleClose: () => void;
  handleCloseWithAnimation: (
    overlayEl: HTMLElement | null,
    contentEl: HTMLElement | null,
    onComplete?: () => void,
  ) => void;
} | null {
  if (activeRoot) return null;

  const container = document.createElement('div');
  const root = createRoot(container);
  document.body.appendChild(container);

  activeRoot = root;
  activeContainer = container;

  const handleClose = () => {
    root.unmount();
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    activeRoot = null;
    activeContainer = null;
  };

  const handleCloseWithAnimation = (
    overlayEl: HTMLElement | null,
    contentEl: HTMLElement | null,
    onComplete?: () => void,
  ) => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
        handleClose();
      },
    });

    if (contentEl) {
      tl.to(contentEl, {
        opacity: 0,
        scale: 0.92,
        y: 16,
        duration: 0.2,
        ease: 'power2.in',
      });
    }

    if (overlayEl) {
      tl.to(
        overlayEl,
        {
          opacity: 0,
          duration: 0.15,
          ease: 'power2.in',
        },
        '<',
      );
    }
  };

  return { root, handleClose, handleCloseWithAnimation };
}

export function resetModalManager(): void {
  if (activeRoot) {
    activeRoot.unmount();
  }
  activeContainer?.parentNode?.removeChild(activeContainer);
  activeRoot = null;
  activeContainer = null;
}

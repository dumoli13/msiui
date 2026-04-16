import React from 'react';
import cx from 'classnames';
import gsap from 'gsap';
import { OverlayContext } from '../../context/OverlayContext';
import getTransitionVars, { resolveAnimation } from '../../libs/transition';
import type { ModalProps } from '../../types';
import { Portal } from '../Portal';

/**
 *
 * A flexible modal component that can be used to display content in a modal with customizable title, content, and actions.
 * It supports focus trapping, keyboard navigation (Escape to close, Tab for focus cycling),
 * and the ability to close on overlay click or using a custom close button.
 * It also provides support for confirming actions with a customizable confirm button.
 *
 * @property {boolean} open - Determines whether the modal is open or not. If false, the modal is not rendered.
 * @property {string} title - The title of the modal.
 * @property {ReactNode} children - The content to be displayed inside the modal.
 * @property {ReactNode} [icon] - Optional icon to display next to the title.
 * @property {string} [className] - Optional additional class names for custom styling.
 * @property {string | number} [width=804] - Optional custom width for the input field.
 * @property {string | number} - Optional custom height for the input field.
 * @property {boolean} [closeOnOverlayClick=false] - Whether the modal should close when the overlay (background) is clicked. Defaults to false.
 * @property {Function} [onClose] - Optional callback function triggered when the notification is closed manually.
 *
 */
const ModalContainer = ({
  open,
  children,
  className,
  width = 804,
  height,
  closeOnOverlayClick = false,
  onClose,
  animation,
}: ModalProps) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = React.useRef<Element | null>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const [isClosing, setIsClosing] = React.useState(false);
  const shouldRender = open || isClosing;
  const {
    animDuration,
    animEase,
    animTransition,
    animDurationOut,
    animEaseOut,
  } = resolveAnimation(animation);
  const vars = getTransitionVars(animTransition);

  const [modalEl, setModalEl] = React.useState<HTMLDivElement | null>(null);
  const overlayContextValue = React.useMemo(
    () => ({ container: modalEl, isFixed: true }),
    [modalEl],
  );

  const setModalRef = React.useCallback((el: HTMLDivElement | null) => {
    modalRef.current = el;
    setModalEl(el);
  }, []);

  const setOverlayRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      overlayRef.current = el;
      if (el && !isClosing) {
        gsap.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: animDuration, ease: 'power2.out' },
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animation config intentionally excluded
    [isClosing],
  );

  const setContentRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      contentRef.current = el;
      if (el && !isClosing) {
        gsap.fromTo(el, vars.from, {
          ...vars.to,
          duration: animDuration,
          ease: animEase,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animation config intentionally excluded
    [isClosing],
  );

  const handleCloseWithAnimation = React.useCallback(
    (callback?: () => void) => {
      setIsClosing(true);
      callback?.();

      const tl = gsap.timeline({
        onComplete: () => {
          setIsClosing(false);
        },
      });

      if (contentRef.current) {
        tl.to(contentRef.current, {
          ...vars.fromOut,
          duration: animDurationOut,
          ease: animEaseOut,
        });
      }

      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          { opacity: 0, duration: animDurationOut, ease: animEaseOut },
          '<',
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animation config intentionally excluded
    [],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && onClose) {
      handleCloseWithAnimation(onClose);
    } else if (e.key === 'Tab' && open) {
      trapFocus(e);
    }
  };

  const trapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      "a, button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])",
    );
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else if (!isClosing) {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, isClosing]);

  React.useEffect(() => {
    if (!open || !modalRef.current) return;
    const activeEl = document.activeElement;
    previouslyFocusedRef.current = activeEl;
    if (modalRef.current.contains(activeEl)) return;
    const id = requestAnimationFrame(() => {
      modalRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  React.useEffect(() => {
    if (open) return;
    const el = previouslyFocusedRef.current;
    if (el && el instanceof HTMLElement) {
      el.focus();
      previouslyFocusedRef.current = null;
    }
  }, [open]);

  if (!shouldRender) return null;

  return (
    <Portal>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- modal requires keyboard events for focus trapping and escape */}
      <div
        ref={setModalRef}
        role="dialog"
        id="modal-container"
        className="flex items-center justify-center z-[1300] inset-0 fixed"
        onKeyDown={handleKeyDown}
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <OverlayContext.Provider value={overlayContextValue}>
          {closeOnOverlayClick ? (
            <div
              ref={setOverlayRef}
              role="button"
              tabIndex={0}
              aria-label="Close Modal"
              onClick={() => handleCloseWithAnimation(onClose)}
              onKeyDown={(e) => e.key === 'Enter' && handleCloseWithAnimation}
              className="fixed top-0 left-0 bottom-0 right-0 bg-[#00000080]"
            />
          ) : (
            <div
              ref={setOverlayRef}
              role="presentation"
              className="fixed top-0 left-0 bottom-0 right-0 bg-[#00000080]"
            />
          )}
          <div
            ref={setContentRef}
            className={cx(
              'border border-neutral-40 dark:border-neutral-50-dark rounded-md drop-shadow-sm bg-neutral-10 dark:bg-neutral-10-dark m-8 flex flex-col max-h-[90vh]',
              className,
            )}
            style={{ width, height }}
          >
            {children}
          </div>
        </OverlayContext.Provider>
      </div>
    </Portal>
  );
};

export default ModalContainer;

import React from 'react';
import cx from 'classnames';
import gsap from 'gsap';
import { OverlayContext } from '../../context/OverlayContext';
import getTransitionVars, { resolveAnimation } from '../../libs/transition';
import type { ModalConfirmContainerProps } from '../../types';
import Button from '../Inputs/Button';
import { Portal } from '../Portal';

const ModalConfirmContainer = ({
  open,
  title,
  children,
  icon,
  className,
  width = 600,
  closeOnOverlayClick = false,
  onClose,
  cancelText = 'Cancel',
  onConfirm,
  animation,
  confirmLoading = false,
  confirmDisabled = false,
  confirmText = 'Confirm',
  buttonColor = 'primary',
  customAction,
  size = 'default',
}: ModalConfirmContainerProps) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const isClosingRef = React.useRef(false);

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

  // Provide OverlayContext so nested overlays (Popper, Tooltip, etc.) portal
  // into this modal's container and use viewport coordinates (isFixed: true).
  const [modalEl, setModalEl] = React.useState<HTMLDivElement | null>(null);
  const overlayContextValue = React.useMemo(
    () => ({ container: modalEl, isFixed: true }),
    [modalEl],
  );

  // Dual ref: keeps modalRef.current in sync (for focus-trap, synchronous reads)
  // and triggers a state update so OverlayContext gets the real element after mount.
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
    [animDurationOut, animEaseOut, vars.fromOut],
  );

  React.useEffect(() => {
    isClosingRef.current = isClosing;
  }, [isClosing]);

  React.useEffect(() => {
    if (!open) return;

    const handleKeyboard = (e: KeyboardEvent) => {
      if (isClosingRef.current) return;

      if (e.key === 'Escape' && onClose) {
        e.preventDefault();
        e.stopPropagation();
        handleCloseWithAnimation(onClose);
      } else if (
        e.key === 'Enter' &&
        !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey &&
        onConfirm &&
        !confirmDisabled &&
        !confirmLoading
      ) {
        e.preventDefault();
        e.stopPropagation();
        handleCloseWithAnimation(onConfirm);
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animation config intentionally excluded
  }, [open, onClose, onConfirm]);

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
    if (modalRef.current.contains(activeEl)) return;
    const id = requestAnimationFrame(() => {
      modalRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  if (!shouldRender) return null;

  return (
    <Portal>
      <div
        role="dialog"
        className="flex items-center justify-center z-[1300] inset-0 fixed"
        ref={setModalRef}
        aria-modal="true"
        tabIndex={-1}
      >
        <OverlayContext.Provider value={overlayContextValue}>
          {closeOnOverlayClick ? (
            <div
              ref={setOverlayRef}
              role="button"
              aria-label="Close Modal"
              onClick={() => handleCloseWithAnimation(onClose)}
              className="fixed top-0 left-0 bottom-0 right-0 bg-[#00000080]"
            />
          ) : (
            <div
              ref={setOverlayRef}
              className="fixed top-0 left-0 bottom-0 right-0 bg-[#00000080]"
            />
          )}
          <div
            ref={setContentRef}
            className={cx(
              'border border-neutral-40 dark:border-neutral-50-dark rounded-md drop-shadow-sm bg-neutral-10 dark:bg-neutral-10-dark m-8 flex flex-col max-h-[90vh]',
              className,
            )}
            style={{ width }}
          >
            {(title || icon) && (
              <div className="pt-6 pb-2 px-6 flex items-center gap-4">
                {icon}
                <div className="text-20px font-semibold text-neutral-100 dark:text-neutral-100-dark w-full break-words">
                  {title}
                </div>
              </div>
            )}
            <div
              className={cx(
                'pb-4 px-6 h-full text-neutral-80 dark:text-neutral-90-dark text-14px flex-1 overflow-auto',
                { 'ml-10': !!icon },
              )}
            >
              {children}
            </div>
            <div className="px-6 py-3 bg-neutral-20 dark:bg-neutral-30-dark flex justify-end items-center gap-3 rounded-b-md">
              {onClose && (
                <Button
                  variant="outlined"
                  onClick={() => handleCloseWithAnimation(onClose)}
                  color="neutral"
                  size={size}
                >
                  {cancelText}
                </Button>
              )}
              {onConfirm && (
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => handleCloseWithAnimation(onConfirm)}
                  color={buttonColor}
                  loading={confirmLoading}
                  disabled={confirmDisabled}
                  size={size}
                >
                  {confirmText}
                </Button>
              )}
              {customAction?.map((action) => action)}
            </div>
          </div>
        </OverlayContext.Provider>
      </div>
    </Portal>
  );
};

export default ModalConfirmContainer;

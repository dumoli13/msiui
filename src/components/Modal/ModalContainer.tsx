import React, { KeyboardEvent, useEffect, useRef } from 'react';
import cx from 'classnames';
import { ModalProps } from '.';
import { Button } from '../Inputs';

/**
 * ModalContainer Component
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
 * @property {number} [width=804] - Optional custom width for the input field.
 * @property {boolean} [closeOnOverlayClick=false] - Whether the modal should close when the overlay (background) is clicked. Defaults to false.
 * @property {Function} [onClose] - Optional callback function triggered when the notification is closed manually.
 * @property {string} [cancelText='Cancel'] - The text to display on the cancel button (default is "Cancel").
 * @property {string} [cancelButtonColor='primary'] - The color for the cancel button.
 * @property {Function} [onConfirm] - An optional callback function that is called when the confirm button is clicked.
 * @property {boolean} [confirmLoading=false] - Whether the confirm button should display a loading spinner.
 * @property {boolean} [confirmDisabled=false] - Whether the confirm button should be disabled.
 * @property {string} [confirmText='Confirm'] - The text to be displayed on the confirm button (default is "Confirm").
 * @property {string} [confirmButtonColor='primary'] - The color for the confirm button.
 *
 * @example Basic Usage:
 * ```tsx
 * <ModalContainer
 *   open={isOpen}
 *   title="Modal Title"
 *   onClose={closeModal}
 *   onConfirm={handleConfirm}
 * >
 *   <p>Modal Content</p>
 * </ModalContainer>
 * ```
 *
 * @returns {JSX.Element|null} The modal component or null if `open` is false.
 */

const ModalContainer = ({
  open,
  title,
  children,
  icon,
  className,
  width = 804,
  closeOnOverlayClick = false,
  onClose,
  cancelText = 'Cancel',
  cancelButtonColor = 'primary',
  onConfirm,
  confirmLoading = false,
  confirmDisabled = false,
  confirmText = 'Confirm',
  confirmButtonColor = 'primary',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && onClose) {
      onClose();
    } else if (e.key === 'Tab' && open) {
      trapFocus(e);
    }
  };

  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      id="modal-container"
      className="flex items-center justify-center z-[1300] inset-0 fixed"
      onKeyDown={handleKeyDown}
      ref={modalRef}
      tabIndex={0}
    >
      {closeOnOverlayClick ? (
        <div
          role="button"
          aria-label="Close Modal"
          onClick={onClose}
          className="fixed top-0 left-0 bottom-0 right-0 bg-neutral-100/50"
        />
      ) : (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-neutral-100/50" />
      )}

      <form
        className={cx(
          'border border-neutral-40 rounded-xl drop-shadow-sm bg-neutral-10 m-8 flex flex-col max-h-[90vh] ',
          className,
        )}
        style={{ width }}
        tabIndex={-1}
        onSubmit={onConfirm}
      >
        <div className="pt-12 pb-4 px-12 flex items-center gap-4">
          {icon}
          <div className="text-40px font-semibold text-neutral-100 w-full break-words">
            {title}
          </div>
        </div>
        <div
          className={cx(
            'pb-12 px-12 h-full text-neutral-80 text-28px flex-1 overflow-auto',
            { 'ml-16': !!icon },
          )}
        >
          {children}
        </div>
        <div className="px-12 py-6 bg-neutral-20 flex justify-end items-center gap-6 rounded-b-xl">
          {onClose && (
            <Button
              variant="outlined"
              onClick={onClose}
              color={cancelButtonColor}
            >
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button
              type="submit"
              variant="contained"
              color={confirmButtonColor}
              loading={confirmLoading}
              disabled={confirmDisabled}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ModalContainer;

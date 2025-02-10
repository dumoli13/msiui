import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MinusCircle, PlusCircle, X } from 'react-feather';
import { useDebouncedCallback } from 'use-debounce';

interface ImageViewerProps {
  open: boolean;
  onClose: () => void;
  url: string | null;
}

/**
 * ImageViewer Component
 *
 * This component renders an image viewer that allows users to zoom in and out of an image and drag to reposition it within a modal. It provides controls to zoom in, zoom out, and view the image in its original size. The viewer is opened or closed based on the `open` prop.
 *
 * @interface ImageViewerProps
 * @property {boolean} open - A flag to determine if the image viewer should be displayed.
 * @property {() => void} onClose - A function to close the image viewer.
 * @property {string | null} url - The URL of the image to be displayed in the viewer.
 *
 * @example Basic Usage:
 * ```tsx
 * import ImageViewer from './ImageViewer';
 *
 * const MyComponent = () => {
 *   const [open, setOpen] = useState(false);
 *   const imageUrl = "/path/to/image.jpg";
 *
 *   return (
 *     <div>
 *       <button onClick={() => setOpen(true)}>Open Image Viewer</button>
 *       <ImageViewer open={open} onClose={() => setOpen(false)} url={imageUrl} />
 *     </div>
 *   );
 * };
 * ```
 *
 * @property {ImageViewerProps} props - The props for the ImageViewer component.
 * @returns {JSX.Element} An image viewer with zoom and drag functionality.
 */

const ImageViewer = ({ open, onClose, url }: ImageViewerProps) => {
  const [tempScale, setTempScale] = useState(100); // Zoom level in percentage
  const [scale, setScale] = useState(100); // Zoom level in percentage
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragState = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
  }>({
    isDragging: false,
    startX: 0,
    startY: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleZoom = useCallback((zoomIn: boolean) => {
    setScale((prev) => {
      if (!zoomIn && prev === 50) return prev;
      const newScale = zoomIn ? prev + 10 : prev - 10;
      setTempScale(newScale);
      return newScale;
    });
  }, []);

  const debounceApply = useDebouncedCallback(() => {
    if (tempScale < 50) {
      setScale(50);
      setTempScale(50);
    } else {
      setScale(tempScale);
    }
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const decimalRegex = /^\d*\.?\d*$/;
    if (decimalRegex.test(inputValue)) {
      const newScale = Number(e.target.value);
      setTempScale(newScale);
      debounceApply();
    }
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const zoomIn = e.deltaY < 0; // Scroll up to zoom in, scroll down to zoom out
      handleZoom(zoomIn);
    },
    [handleZoom],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    dragState.current.isDragging = true;
    dragState.current.startX = e.clientX - position.x;
    dragState.current.startY = e.clientY - position.y;
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.current.isDragging) return;

    const x = e.clientX - dragState.current.startX;
    const y = e.clientY - dragState.current.startY;

    setPosition({ x, y });
  };

  const handleMouseUp = () => {
    dragState.current.isDragging = false;
    setIsDragging(true);
  };

  useEffect(() => {
    if (isDragging && scale <= 100 && (position.x !== 0 || position.y !== 0)) {
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const viewer = viewerRef.current;
      if (viewer) {
        viewer.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
          viewer?.removeEventListener('wheel', handleWheel);
        };
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      setScale(100);
      setTempScale(100);
      setPosition({ x: 0, y: 0 });
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      ref={viewerRef}
      role="presentation"
      className="flex items-center justify-center z-[1300] inset-0 fixed"
      onDoubleClick={(e) => e.preventDefault()}
    >
      {/* Backdrop */}
      <div className="fixed top-0 left-0 bottom-0 right-0 bg-neutral-100/50" />

      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-1">
        {/* Close button */}
        <div
          role="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-8 right-8 text-white bg-neutral-100/70 hover:bg-opacity-20 z-50 rounded-full cursor-pointer h-[56px] w-[56px] flex justify-center items-center"
        >
          <X className="text-neutral-10" />
        </div>

        {/* Image viewer */}
        <div
          role="presentation"
          className="relative overflow-hidden max-w-full max-h-full cursor-grab active:cursor-grabbing"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale / 100})`,
          }}
          onMouseDown={handleMouseDown}
        >
          {url && (
            <img
              src={url}
              alt="Zoomable content"
              className="max-w-none max-h-none pointer-events-none"
              style={{
                userSelect: 'none',
              }}
            />
          )}
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neutral-10 bg-neutral-100/70 py-4 px-10 rounded-full flex items-center gap-4 text-lg">
          <div
            className={`${
              scale > 50
                ? 'cursor-pointer text-opacity-60 hover:text-opacity-100'
                : 'cursor-not-allowed text-opacity-40'
            } rounded-full text-white`}
            onClick={() => handleZoom(false)}
            role="button"
            aria-label="Zoom out"
          >
            <MinusCircle />
          </div>
          <div className="bg-neutral-90 rounded-full py-1 px-3">
            <label htmlFor="scale">
              <input
                id="scale"
                value={tempScale}
                className="w-10 bg-transparent outline-none text-center"
                onChange={handleChange}
                aria-label="Scale percentage"
              />
              %
            </label>
          </div>
          <div
            className="cursor-pointer text-opacity-60 hover:text-opacity-100 rounded-full text-white"
            onClick={() => handleZoom(true)}
            role="button"
            aria-label="Zoom in"
          >
            <PlusCircle />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ImageViewer;

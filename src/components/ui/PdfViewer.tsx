import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Maximize2,
  Minimize2,
  MinusCircle,
  PlusCircle,
  X,
} from 'react-feather';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  DocumentCallback,
  PageCallback,
} from 'react-pdf/dist/cjs/shared/types';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useDebouncedCallback } from 'use-debounce';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  open: boolean;
  onClose: () => void;
  url: string | null;
}

/**
 * PDFViewer Component
 *
 * This component provides a full-screen modal viewer for displaying PDF documents.
 * It allows users to zoom in and out of the document, navigate between pages, and resize the viewer to fit the screen.
 * The component utilizes the `react-pdf` library to render the PDF document, with custom controls for page navigation,
 * zooming, and toggling full-size view.
 *
 * @interface PdfViewerProps
 * @property {boolean} open - A flag that determines if the viewer modal is open or closed.
 * @property {function} onClose - A function to close the viewer modal.
 * @property {string | null} url - The URL or path to the PDF document to be viewed.
 *
 * @example Basic Usage:
 * ```tsx
 * import PDFViewer from './PDFViewer';
 *
 * const MyComponent = () => {
 *   const [open, setOpen] = useState(false);
 *   const toggleViewer = () => setOpen(!open);
 *
 *   return (
 *     <div>
 *       <button onClick={toggleViewer}>Open PDF Viewer</button>
 *       <PDFViewer open={open} onClose={toggleViewer} url="path/to/document.pdf" />
 *     </div>
 *   );
 * };
 * ```
 *
 * @returns {JSX.Element | null} A modal viewer for the PDF document, or `null` if `open` is `false`.
 */

const PDFViewer = ({ open, onClose, url }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState(1);
  const [tempScale, setTempScale] = useState(100); // Zoom level in percentage
  const [scale, setScale] = useState(100); // Zoom level in percentage
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const viewerRef = useRef<HTMLDivElement | null>(null); // Correctly typed ref
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [documentWidth, setDocumentWidth] = useState(0);
  const showFullSize = scale > 100;

  const onDocumentLoadSuccess = ({ numPages }: DocumentCallback) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = ({ width }: PageCallback) => {
    setDocumentWidth(width);
  };

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

  const handleShowFullSize = () => {
    if (showFullSize) {
      setScale(100);
      setTempScale(100);
    } else {
      const windowWidth = window.innerWidth;
      const newZoom = Math.floor(
        ((windowWidth - 20) / (documentWidth / 10)) * 10, // 16 is safe space for scrollbar
      );

      setScale(newZoom);
      setTempScale(newZoom);
    }
  };

  const updateCurrentPage = () => {
    const container = viewerRef.current;
    const pageElements = container!.querySelectorAll('.react-pdf__Page');

    let mostVisiblePage = 1;
    let maxVisibility = 0;

    pageElements.forEach((pageElement, index) => {
      const rect = pageElement.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Calculate the visible height of the page element in the viewport
      const visibleHeight =
        Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
      const visibility = Math.max(0, visibleHeight / viewHeight);

      // Find the most visible page
      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        mostVisiblePage = index + 1;
      }
    });

    setCurrentPage(mostVisiblePage);
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (viewerRef.current) {
        viewerRef.current.addEventListener('scroll', updateCurrentPage);

        return () => {
          viewerRef.current?.removeEventListener('scroll', updateCurrentPage);
        };
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      setTempScale(100);
      setCurrentPage(1);
      setScale(100);
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

  if (!open) return null;
  return createPortal(
    <div
      role="presentation"
      id="modal-container"
      className="flex items-center justify-center z-[1300] inset-0 fixed"
    >
      <div className="fixed top-0 left-0 bottom-0 right-0 bg-neutral-100/50" />

      <div className="fixed top-0 left-0 w-full h-full">
        <div
          role="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-8 right-8 text-white bg-neutral-100/70 hover:bg-opacity-20 z-50 rounded-full cursor-pointer h-[56px] w-[56px] flex justify-center items-center"
        >
          <X className="text-neutral-10" />
        </div>
        <div
          className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 overflow-auto max-w-full"
          ref={viewerRef}
        >
          {url && (
            <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
              <div className="flex flex-col gap-1">
                {Array.from(new Array(numPages), (el, index) => (
                  <div
                    ref={index === 0 ? pageRef : null}
                    key={`page_${index + 1}`}
                  >
                    <Page
                      pageNumber={index + 1}
                      scale={scale / 100}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      className="react-pdf__Page"
                      onLoadSuccess={
                        index === 0 ? onPageLoadSuccess : undefined
                      } // Capture width of first page
                    />
                  </div>
                ))}
              </div>
            </Document>
          )}
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neutral-10 bg-neutral-100/70 p-4 rounded-full flex items-center gap-2 text-lg">
          <div className="flex items-center gap-2 text-sm px-6 text-white">
            <span>Page</span>
            <span>{currentPage}</span>
            <span>{`/ ${numPages}`}</span>
          </div>

          <div className="h-6 w-0 border-r border-neutral-10" />

          <div className="flex items-center gap-2 px-6">
            <div
              className={`${
                scale > 50
                  ? 'cursor-pointer text-opacity-60 hover:text-opacity-100'
                  : 'cursor-not-allowed text-opacity-40'
              } rounded-full text-white`}
              onClick={() => handleZoom(false)}
              role="button"
              aria-label="zoom out"
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
            </div>{' '}
            <div
              className="cursor-pointer text-opacity-60 hover:text-opacity-100 rounded-full text-white"
              onClick={() => handleZoom(true)}
              role="button"
              aria-label="zoom in"
            >
              <PlusCircle />
            </div>
          </div>

          <div className="h-6 w-0 border-r border-neutral-10" />
          <div className="px-6">
            <div
              className="cursor-pointer text-opacity-60 hover:text-opacity-100 rounded-full text-white"
              onClick={handleShowFullSize}
              role="button"
              aria-label="zoom in"
            >
              {showFullSize ? <Minimize2 /> : <Maximize2 />}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default PDFViewer;

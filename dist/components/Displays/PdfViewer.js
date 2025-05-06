import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { createPortal } from 'react-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useDebouncedCallback } from 'use-debounce';
import Icon from '../Icon';
// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
/**
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
 */
const PDFViewer = ({ open, onClose, url }) => {
    const [numPages, setNumPages] = React.useState(1);
    const [tempScale, setTempScale] = React.useState(100); // Zoom level in percentage
    const [scale, setScale] = React.useState(100); // Zoom level in percentage
    const [currentPage, setCurrentPage] = React.useState(1); // Track current page
    const viewerRef = React.useRef(null); // Correctly typed ref
    const pageRef = React.useRef(null);
    const [documentWidth, setDocumentWidth] = React.useState(0);
    const showFullSize = scale > 100;
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    const onPageLoadSuccess = ({ width }) => {
        setDocumentWidth(width);
    };
    const handleZoom = React.useCallback((zoomIn) => {
        setScale((prev) => {
            if (!zoomIn && prev === 50)
                return prev;
            const newScale = zoomIn ? prev + 10 : prev - 10;
            setTempScale(newScale);
            return newScale;
        });
    }, []);
    const debounceApply = useDebouncedCallback(() => {
        if (tempScale < 50) {
            setScale(50);
            setTempScale(50);
        }
        else {
            setScale(tempScale);
        }
    }, 1000);
    const handleChange = (e) => {
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
        }
        else {
            const windowWidth = window.innerWidth;
            const newZoom = Math.floor(((windowWidth - 20) / (documentWidth / 10)) * 10);
            setScale(newZoom);
            setTempScale(newZoom);
        }
    };
    const updateCurrentPage = () => {
        const container = viewerRef.current;
        const pageElements = container.querySelectorAll('.react-pdf__Page');
        let mostVisiblePage = 1;
        let maxVisibility = 0;
        pageElements.forEach((pageElement, index) => {
            const rect = pageElement.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            // Calculate the visible height of the page element in the viewport
            const visibleHeight = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
            const visibility = Math.max(0, visibleHeight / viewHeight);
            // Find the most visible page
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                mostVisiblePage = index + 1;
            }
        });
        setCurrentPage(mostVisiblePage);
    };
    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            if (viewerRef.current) {
                viewerRef.current.addEventListener('scroll', updateCurrentPage);
                return () => {
                    var _a;
                    (_a = viewerRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('scroll', updateCurrentPage);
                };
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);
    React.useEffect(() => {
        if (open) {
            setTempScale(100);
            setCurrentPage(1);
            setScale(100);
        }
    }, [open]);
    React.useEffect(() => {
        const handleKeyDown = (e) => {
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
    if (!open)
        return null;
    return createPortal(_jsxs("div", { role: "none", id: "modal-container", className: "flex items-center justify-center z-[1300] inset-0 fixed", children: [_jsx("div", { className: "fixed top-0 left-0 bottom-0 right-0 bg-neutral-100/50 dark:bg-neutral-100-dark/50" }), _jsxs("div", { className: "fixed top-0 left-0 w-full h-full", children: [_jsx("div", { role: "button", "aria-label": "Close", onClick: onClose, className: "absolute top-8 right-8 text-white bg-neutral-100/70 dark:bg-neutral-100-dark/70 hover:bg-opacity-20 z-50 rounded-full cursor-pointer h-[56px] w-[56px] flex justify-center items-center", children: _jsx(Icon, { name: "x-mark", size: 16, className: "text-neutral-10 dark:text-neutral-10-dark" }) }), _jsx("div", { className: "absolute top-4 bottom-4 left-1/2 -translate-x-1/2 overflow-auto max-w-full", ref: viewerRef, children: url && (_jsx(Document, { file: url, onLoadSuccess: onDocumentLoadSuccess, children: _jsx("div", { className: "flex flex-col gap-1", children: Array.from(new Array(numPages), (el, index) => (_jsx("div", { ref: index === 0 ? pageRef : null, children: _jsx(Page, { pageNumber: index + 1, scale: scale / 100, renderAnnotationLayer: false, renderTextLayer: false, className: "react-pdf__Page", onLoadSuccess: index === 0 ? onPageLoadSuccess : undefined }) }, `page_${index + 1}`))) }) })) }), _jsxs("div", { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neutral-10 dark:text-neutral-10-dark bg-neutral-100/70 dark:bg-neutral-100-dark/70 p-4 rounded-full flex items-center gap-2 text-lg", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm px-6 text-white", children: [_jsx("span", { children: "Page" }), _jsx("span", { children: currentPage }), _jsx("span", { children: `/ ${numPages}` })] }), _jsx("div", { className: "h-6 w-0 border-r border-neutral-10 dark:border-neutral-10-dark" }), _jsxs("div", { className: "flex items-center gap-2 px-6", children: [_jsx("div", { className: `${scale > 50
                                            ? 'cursor-pointer text-opacity-60 hover:text-opacity-100'
                                            : 'cursor-not-allowed text-opacity-40'} rounded-full text-white`, onClick: () => handleZoom(false), role: "button", "aria-label": "zoom out", children: _jsx(Icon, { name: "minus-circle", size: 24 }) }), _jsx("div", { className: "bg-neutral-90 dark:bg-neutral-90-dark rounded-full py-1 px-3", children: _jsxs("label", { htmlFor: "scale", children: [_jsx("input", { id: "scale", value: tempScale, className: "w-10 bg-transparent outline-none text-center", onChange: handleChange, "aria-label": "Scale percentage" }), "%"] }) }), _jsx("div", { className: "cursor-pointer text-opacity-60 hover:text-opacity-100 rounded-full text-white", onClick: () => handleZoom(true), role: "button", "aria-label": "zoom in", children: _jsx(Icon, { name: "plus-circle", size: 16 }) })] }), _jsx("div", { className: "h-6 w-0 border-r border-neutral-10 dark:border-neutral-10-dark" }), _jsx("div", { className: "px-6", children: _jsx("div", { className: "cursor-pointer text-opacity-60 hover:text-opacity-100 rounded-full text-white", onClick: handleShowFullSize, role: "button", "aria-label": "zoom in", children: _jsx(Icon, { name: showFullSize ? 'minimize2' : 'maximize2', size: 24 }) }) })] })] })] }), document.body);
};
export default PDFViewer;

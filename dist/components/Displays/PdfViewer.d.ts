import React from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
export interface PdfViewerProps {
    open: boolean;
    onClose: () => void;
    url: string | null;
}
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
 * @returns {JSX.Element | null} A modal viewer for the PDF document, or `null` if `open` is `false`.
 *
 */
declare const PDFViewer: ({ open, onClose, url }: PdfViewerProps) => React.ReactPortal | null;
export default PDFViewer;

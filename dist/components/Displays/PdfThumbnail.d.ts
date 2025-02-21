import React from 'react';
export interface PdfThumbnailProps {
    file: string;
}
/**
 * PdfThumbnail Component
 *
 * This component provides a thumbnail view of the first page of a PDF document. It allows users to click on the thumbnail
 * to open a PDF viewer in a modal, enabling them to view the full document.
 *
 * The thumbnail image is displayed by rendering the first page of the PDF using the `react-pdf` library, and it includes
 * a maximize icon that appears when the user hovers over the thumbnail. Clicking on the thumbnail opens the PDF in a
 * full-screen viewer component (`PDFViewer`).
 *
 * @interface PdfThumbnailProps
 * @property {string} file - The URL or path to the PDF file that should be displayed.
 *
 * @example Basic Usage:
 * ```tsx
 * import PdfThumbnail from './PdfThumbnail';
 *
 * const MyComponent = () => {
 *   return (
 *     <PdfThumbnail file="path/to/document.pdf" />
 *   );
 * };
 * ```
 *
 * @returns {JSX.Element} A PDF thumbnail that can be clicked to open the PDF in a modal viewer.
 */
declare const PdfThumbnail: ({ file }: PdfThumbnailProps) => React.JSX.Element;
export default PdfThumbnail;

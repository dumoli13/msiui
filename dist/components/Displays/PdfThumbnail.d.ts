import React from 'react';
export interface PdfThumbnailProps {
    file: string;
}
/**
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
 */
declare const PdfThumbnail: ({ file }: PdfThumbnailProps) => React.JSX.Element;
export default PdfThumbnail;
//# sourceMappingURL=PdfThumbnail.d.ts.map
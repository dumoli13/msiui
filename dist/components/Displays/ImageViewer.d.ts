import React from 'react';
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
declare const ImageViewer: ({ open, onClose, url }: ImageViewerProps) => React.ReactPortal | null;
export default ImageViewer;
//# sourceMappingURL=ImageViewer.d.ts.map
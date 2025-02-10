import React, { useState } from 'react';
import { Maximize2 } from 'react-feather';
import ImageViewer from './ImageViewer';

interface ImageThumbnailProps {
  file: string;
}

/**
 * ImageThumbnail Component
 *
 * This component renders a clickable image thumbnail that opens an image viewer in a modal when clicked. It is designed to display a preview of an image and allow users to view it in a larger format upon interaction.
 *
 * @interface ImageThumbnailProps
 * @property {string} file - The URL of the image to display in the thumbnail.
 *
 * @example Basic Usage:
 * ```tsx
 * import ImageThumbnail from './ImageThumbnail';
 *
 * const MyComponent = () => (
 *   <div>
 *     <ImageThumbnail file="/path/to/image.jpg" />
 *   </div>
 * );
 * ```
 *
 * @property {ImageThumbnailProps} props - The props for the ImageThumbnail component.
 * @returns {JSX.Element} A clickable image thumbnail that opens a modal to view the full image.
 */

const ImageThumbnail = ({ file }: ImageThumbnailProps) => {
  const [openViewer, setOpenViewer] = useState(false);

  const openModal = () => setOpenViewer(true);
  const closeModal = () => setOpenViewer(false);

  return (
    <div>
      <div
        role="button"
        onClick={openModal}
        className="cursor-pointer border border-neutral-40 relative group rounded-md overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full z-10 text-neutral-10 bg-neutral-100/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          <Maximize2 strokeWidth={2} width={64} height={64} />
        </div>
        <img
          src={file}
          alt="goods-image"
          className="w-full h-full object-contain"
        />
      </div>

      <ImageViewer open={openViewer} onClose={closeModal} url={file} />
    </div>
  );
};

export default ImageThumbnail;

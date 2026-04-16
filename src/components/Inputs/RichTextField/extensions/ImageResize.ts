import Image from '@tiptap/extension-image';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageResizeView from './ImageResizeView';

export const ImageResize = Image.extend({
  name: 'imageResize',

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute('width') || element.style.width || null,
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            width: attributes.width,
            style: `width: ${attributes.width}`,
          };
        },
      },
      height: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute('height') || element.style.height || null,
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return {
            height: attributes.height,
            style: `height: ${attributes.height}`,
          };
        },
      },
      align: {
        default: 'left',
        parseHTML: (element) => element.getAttribute('data-align') || 'left',
        renderHTML: (attributes) => {
          return { 'data-align': attributes.align };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageResizeView);
  },
});

export default ImageResize;

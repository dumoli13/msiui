import type { FilePreviewConfig } from '../types/inputs/uploader';

export const FILE_TYPE_MAP: Record<string, FilePreviewConfig> = {
  pdf: {
    label: 'PDF',
    color: '#DC2626',
    accent: '#991B1B',
  },
  doc: {
    label: 'DOC',
    color: '#2563EB',
    accent: '#1E40AF',
  },
  docx: {
    label: 'DOC',
    color: '#2563EB',
    accent: '#1E40AF',
  },
  xls: {
    label: 'XLS',
    color: '#16A34A',
    accent: '#166534',
  },
  xlsx: {
    label: 'XLS',
    color: '#16A34A',
    accent: '#166534',
  },
  ppt: {
    label: 'PPT',
    color: '#EA580C',
    accent: '#9A3412',
  },
  pptx: {
    label: 'PPT',
    color: '#EA580C',
    accent: '#9A3412',
  },
  txt: {
    label: 'TXT',
    color: '#6B7280',
    accent: '#374151',
  },
};

export const IMAGE_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'svg',
  'bmp',
  'avif',
]);

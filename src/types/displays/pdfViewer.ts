export interface PdfViewerProps {
  open: boolean;
  onClose: () => void;
  url: string | null;
}

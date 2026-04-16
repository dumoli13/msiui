import type { Root } from 'react-dom/client';
export declare function createModal(): {
    root: Root;
    handleClose: () => void;
    handleCloseWithAnimation: (overlayEl: HTMLElement | null, contentEl: HTMLElement | null, onComplete?: () => void) => void;
} | null;
export declare function resetModalManager(): void;
//# sourceMappingURL=modalManager.d.ts.map
import React from 'react';
export interface OverlayContextValue {
    /** DOM element that child overlays should portal into. null = document.body */
    container: HTMLElement | null;
    /**
     * true  = container uses viewport coordinates (position:fixed ancestor present).
     *         Child overlays must NOT add window.scrollX/scrollY to their position.
     * false = container uses document coordinates (default, document.body).
     *         Child overlays must add window.scrollX/scrollY to viewport coords.
     */
    isFixed: boolean;
}
export declare const OverlayContext: React.Context<OverlayContextValue>;
//# sourceMappingURL=OverlayContext.d.ts.map
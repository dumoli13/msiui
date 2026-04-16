import gsap from 'gsap';
import { createRoot } from 'react-dom/client';
let activeRoot = null;
let activeContainer = null;
export function createModal() {
    if (activeRoot)
        return null;
    const container = document.createElement('div');
    const root = createRoot(container);
    document.body.appendChild(container);
    activeRoot = root;
    activeContainer = container;
    const handleClose = () => {
        root.unmount();
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
        activeRoot = null;
        activeContainer = null;
    };
    const handleCloseWithAnimation = (overlayEl, contentEl, onComplete) => {
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete?.();
                handleClose();
            },
        });
        if (contentEl) {
            tl.to(contentEl, {
                opacity: 0,
                scale: 0.92,
                y: 16,
                duration: 0.2,
                ease: 'power2.in',
            });
        }
        if (overlayEl) {
            tl.to(overlayEl, {
                opacity: 0,
                duration: 0.15,
                ease: 'power2.in',
            }, '<');
        }
    };
    return { root, handleClose, handleCloseWithAnimation };
}
export function resetModalManager() {
    if (activeRoot) {
        activeRoot.unmount();
    }
    activeContainer?.parentNode?.removeChild(activeContainer);
    activeRoot = null;
    activeContainer = null;
}

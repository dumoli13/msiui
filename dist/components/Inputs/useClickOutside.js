import React from 'react';
/**
 * Fires onOutsideClick when a mousedown occurs outside every ref in the list.
 * Uses a callback-ref pattern so the callback never needs to be a dep.
 * Internal hook — not exported from the library index.
 */
function useClickOutside(refs, onOutsideClick) {
    // Keep the latest callback without causing the effect to re-run
    const callbackRef = React.useRef(onOutsideClick);
    callbackRef.current = onOutsideClick;
    React.useEffect(() => {
        const handler = (event) => {
            const target = event.target;
            const isInside = refs.some((ref) => ref.current?.contains(target));
            if (!isInside)
                callbackRef.current();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
        // refs are stable React ref objects; callback kept fresh via callbackRef
    }, [refs]);
}
export default useClickOutside;

import React from 'react';
/**
 * Fires onOutsideClick when a mousedown occurs outside every ref in the list.
 * Uses a callback-ref pattern so the callback never needs to be a dep.
 * Internal hook — not exported from the library index.
 */
declare function useClickOutside(refs: ReadonlyArray<React.RefObject<HTMLElement | null>>, onOutsideClick: () => void): void;
export default useClickOutside;
//# sourceMappingURL=useClickOutside.d.ts.map
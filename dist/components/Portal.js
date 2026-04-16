import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { OverlayContext } from '../context/OverlayContext';
export function Portal({ children }) {
    const { container } = useContext(OverlayContext);
    const [target, setTarget] = useState(null);
    useEffect(() => {
        setTarget(container ?? document.body);
    }, [container]);
    if (!target)
        return null;
    return createPortal(children, target);
}

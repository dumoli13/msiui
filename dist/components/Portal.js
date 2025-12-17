'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
export function Portal({ children }) {
    const [target, setTarget] = useState(null);
    useEffect(() => {
        setTarget(document.body);
    }, []);
    if (!target)
        return null;
    return createPortal(children, target);
}

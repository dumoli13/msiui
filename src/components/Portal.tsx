import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { OverlayContext } from '../context/OverlayContext';

export interface PortalProps {
  children: React.ReactNode;
}

export function Portal({ children }: PortalProps) {
  const { container } = useContext(OverlayContext);
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    setTarget(container ?? document.body);
  }, [container]);

  if (!target) return null;

  return createPortal(children, target);
}

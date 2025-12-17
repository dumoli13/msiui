'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
}

export function Portal({ children }: PortalProps) {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    setTarget(document.body);
  }, []);

  if (!target) return null;

  return createPortal(children, target);
}

// src/components/GlobalRightClickBlocker.jsx
'use client';

import { useEffect } from 'react';

export default function GlobalRightClickBlocker({ children }) {
  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableRightClick);
    return () => document.removeEventListener('contextmenu', disableRightClick);
  }, []);

  return <>{children}</>;
}

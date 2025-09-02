'use client';
import { useEffect, useState } from 'react';
import styles from './LoaderGate.module.scss';

interface LoaderGateProps {
  minDurationMs?: number;   // how long the loader must stay visible
  fadeMs?: number;          // fade-in/out duration (keep in sync with CSS)
  label?: string;
}

export default function LoaderGate({
  minDurationMs = 1200,
  fadeMs = 320,
  label = 'Loading…',
}: LoaderGateProps) {
  // Rendered controls whether we keep the component in the tree
  const [rendered, setRendered] = useState(true);
  // Visible controls the CSS class that triggers the fade
  const [visible, setVisible] = useState(true);

  // After the minimum duration, trigger fade-out
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), minDurationMs);
    return () => clearTimeout(t);
  }, [minDurationMs]);

  // After fade-out finishes, unmount
  useEffect(() => {
    if (visible) return;
    const t = setTimeout(() => setRendered(false), fadeMs);
    return () => clearTimeout(t);
  }, [visible, fadeMs]);

  if (!rendered) return null;

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.enter : styles.leave}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <i className={styles.spinner} aria-hidden />
    </div>
  );
}

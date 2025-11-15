'use client';

import { PropsWithChildren, useRef } from 'react';
import styles from './SpotlightCard.module.css';

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 229, 255, 0.18)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = event => {
    if (!ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
    ref.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={ref}
      className={`${styles.cardSpotlight} ${className}`.trim()}
      onPointerMove={handlePointerMove}
    >
      {children}
    </div>
  );
}

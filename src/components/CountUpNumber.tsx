"use client";

import { useEffect, useRef, useState } from "react";

type CountUpNumberProps = {
  to: number;
  className?: string;
  durationMs?: number;
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

export default function CountUpNumber({ to, className, durationMs = 1400 }: CountUpNumberProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!rootRef.current || hasAnimated) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "reduced";

    if (prefersReducedMotion) {
      setValue(to);
      setHasAnimated(true);
      return;
    }

    let rafId = 0;

    const startAnimation = () => {
      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / durationMs, 1);
        const easedProgress = easeOutCubic(progress);
        setValue(Math.round(to * easedProgress));

        if (progress < 1) {
          rafId = window.requestAnimationFrame(tick);
          return;
        }

        setHasAnimated(true);
      };

      rafId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        observer.disconnect();
        startAnimation();
      },
      { threshold: 0.5 },
    );

    observer.observe(rootRef.current);

    return () => {
      observer.disconnect();
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [durationMs, hasAnimated, to]);

  return (
    <span ref={rootRef} className={className}>
      {new Intl.NumberFormat("en-US").format(value)}
    </span>
  );
}

"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import type { ImageSource } from "@/data/image-sources";

type HomeNumbersCollageProps = {
  images: ImageSource[];
};

type TooltipState = {
  x: number;
  y: number;
  title: string;
  credit: string;
};

export default function HomeNumbersCollage({ images }: HomeNumbersCollageProps) {
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateTooltip = (image: ImageSource, event: MouseEvent<HTMLElement>) => {
    const tooltipWidth = 260;
    const tooltipHeight = 96;
    const localX = event.clientX + 3;
    const localY = event.clientY - 50;

    const x = Math.min(Math.max(6, localX), window.innerWidth - tooltipWidth - 6);
    const y = Math.min(Math.max(6, localY), window.innerHeight - tooltipHeight - 6);

    setTooltip({
      x,
      y,
      title: image.title,
      credit: image.credit,
    });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image, index) => {
          const heightClass = index === 2 ? "min-h-56 sm:col-span-2" : "min-h-64";
          const sizeRule = index === 0 ? "(min-width: 1024px) 28vw, 42vw" : index === 1 ? "(min-width: 1024px) 24vw, 42vw" : "(min-width: 1024px) 50vw, 90vw";
          const hiddenState =
            index === 0
              ? { x: -120, y: 34, rotate: -2 }
              : index === 1
                ? { x: 120, y: 34, rotate: 2 }
                : { x: 0, y: 120, rotate: 0 };

          return (
            <motion.article
              key={image.id}
              className={`relative ${heightClass} border border-black/10 bg-white shadow-lg`}
              initial={{ opacity: 0, scale: 0.96, ...hiddenState }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{
                duration: 0.72,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={(event) => updateTooltip(image, event)}
              onMouseMove={(event) => updateTooltip(image, event)}
              onMouseLeave={() => setTooltip(null)}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover"
                sizes={sizeRule}
              />
            </motion.article>
          );
        })}
      </div>

      {mounted && tooltip
        ? createPortal(
            <div
              className="pointer-events-none fixed z-[90] max-w-[16.25rem] rounded-md border border-black/20 bg-white/95 px-3 py-2 text-black shadow-[0_12px_24px_rgba(0,0,0,0.2)] backdrop-blur-[1px]"
              style={{ left: tooltip.x, top: tooltip.y }}
              aria-hidden
            >
              <p className="text-sm font-semibold leading-tight">{tooltip.title}</p>
              <p className="mt-1 text-xs text-black/70">{tooltip.credit}</p>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

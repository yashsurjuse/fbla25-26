"use client";

import Image from "next/image";
import Link from "next/link";
import type { Artifact } from "@/data/artifacts";

type CirculatingMarqueeProps = {
  items: Artifact[];
};

export default function CirculatingMarquee({ items }: CirculatingMarqueeProps) {
  if (items.length === 0) {
    return null;
  }

  const loopItems = [...items, ...items, ...items, ...items];

  return (
    <div className="circulating-marquee group relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[color:var(--paper)] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[color:var(--paper)] to-transparent"
        aria-hidden
      />

      <div className="flex w-fit animate-marquee gap-6 py-6">
        {loopItems.map((artifact, index) => {
          return (
            <article key={`${artifact.id}-${index}`} className="group/card w-[22rem] shrink-0 rounded-[2rem] border border-white/40 bg-white/60 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-500">
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-2xl bg-black/5">
                <Image
                  src={artifact.image || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
                  alt={artifact.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 backdrop-blur-sm">
                  <Link
                    href={`?artifactId=${artifact.id}`}
                    scroll={false}
                    className="pill-btn border border-white bg-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wider !text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:!text-black hover:scale-105 shadow-xl"
                  >
                    View details
                  </Link>
                </div>
              </div>
              <h3 className="font-display text-3xl font-bold leading-tight text-black transition-colors duration-500 line-clamp-2">{artifact.title}</h3>
              <p className="mt-2 text-base font-semibold uppercase tracking-wider text-[color:var(--accent)] transition-colors duration-500">{artifact.era}</p>
              <p className="mt-1 text-sm font-medium text-black/60 transition-colors duration-500">{artifact.location}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { ogImageSources } from "@/data/image-sources";
import { storeImageSources } from "@/data/store-products";

const localAssets = [
  {
    id: "met-hero",
    title: "The Met Fifth Avenue – Exterior Hero Photo",
    credit: "The Metropolitan Museum of Art",
    url: "https://www.metmuseum.org/visit/plan-your-visit/met-fifth-avenue",
  },
  {
    id: "met-logo-fill",
    title: "The Met Logo (Filled / Red)",
    credit: "The Metropolitan Museum of Art",
    url: "https://www.metmuseum.org/",
  },
  {
    id: "met-logo-transparent",
    title: "The Met Logo (Transparent)",
    credit: "The Metropolitan Museum of Art",
    url: "https://www.metmuseum.org/",
  },
];

export default function ImageCreditsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const artworkSources = ogImageSources.filter((s) =>
    s.credit.toLowerCase().includes("metropolitan"),
  );
  const portraitSources = ogImageSources.filter((s) =>
    s.credit.toLowerCase().includes("wikimedia"),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div
        className="popup-backdrop-enter absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ic-title"
        className="popup-panel-enter relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col border border-black/15 bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-6 py-4">
          <h2 id="ic-title" className="font-display text-3xl font-semibold text-black">
            Image Credits
          </h2>
          <button
            onClick={onClose}
            aria-label="Close image credits"
            className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center border border-black/20 text-lg leading-none text-black/50 transition hover:border-black hover:text-black"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 text-sm">
          <section className="mb-6">
            <h3 className="mb-3 border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
              Artwork Images
            </h3>
            <ul className="space-y-3">
              {artworkSources.map((s) => (
                <li key={s.id} className="border-b border-black/8 pb-3 last:border-0 last:pb-0">
                  <p className="font-semibold text-black">{s.title}</p>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-black/50 underline decoration-black/25 underline-offset-2 hover:text-black"
                  >
                    {s.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="mb-3 border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
              Store Product Photography
            </h3>
            <ul className="space-y-3">
              {storeImageSources.map((s) => (
                <li key={s.id} className="border-b border-black/8 pb-3 last:border-0 last:pb-0">
                  <p className="font-semibold text-black">{s.title}</p>
                  <a
                    href={s.pageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-black/50 underline decoration-black/25 underline-offset-2 hover:text-black"
                  >
                    {s.pageUrl}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="mb-3 border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
              Wikimedia Commons (Public Domain)
            </h3>
            <ul className="space-y-3">
              {portraitSources.map((s) => (
                <li key={s.id} className="border-b border-black/8 pb-3 last:border-0 last:pb-0">
                  <p className="font-semibold text-black">{s.title}</p>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-black/50 underline decoration-black/25 underline-offset-2 hover:text-black"
                  >
                    {s.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-3 border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
              Museum Branding &amp; Local Assets
            </h3>
            <ul className="space-y-3">
              {localAssets.map((a) => (
                <li key={a.id} className="border-b border-black/8 pb-3 last:border-0 last:pb-0">
                  <p className="font-semibold text-black">{a.title}</p>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-black/50 underline decoration-black/25 underline-offset-2 hover:text-black"
                  >
                    {a.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

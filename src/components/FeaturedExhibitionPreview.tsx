"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { KeyboardEvent, MouseEvent } from "react";
import { useRef, useState, useEffect } from "react";
import Modal from "@/components/Modal";
import Image from "next/image";
import { fetchMetObject, MetObject } from "@/lib/met-api";

const previewVideoSrc =
  "https://www.image2url.com/r2/default/videos/1782309825103-9449f126-3fda-458a-8ec2-a170141c3c0f.mp4";

export default function FeaturedExhibitionPreview() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExhibition, setSelectedExhibition] = useState<any | null>(null);
  const [featuredWorks, setFeaturedWorks] = useState<MetObject[]>([]);
  const [loadingWorks, setLoadingWorks] = useState(false);

  useEffect(() => {
    fetch("/data/exhibitions_master.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((e: any) => e.title === "Raphael: Sublime Poetry");
        if (found) setSelectedExhibition(found);
      })
      .catch((err) => console.error("Failed to load exhibitions", err));
  }, []);

  useEffect(() => {
    async function loadFeatured() {
      if (!selectedExhibition || !selectedExhibition.featured_object_ids) {
        setFeaturedWorks([]);
        return;
      }
      setLoadingWorks(true);
      const objects = await Promise.all(
        selectedExhibition.featured_object_ids.map((id: number) => fetchMetObject(id))
      );
      setFeaturedWorks(objects.filter((o): o is MetObject => o !== null));
      setLoadingWorks(false);
    }
    if (isModalOpen) {
      loadFeatured();
    }
  }, [isModalOpen, selectedExhibition]);

  const handleEnter = () => {
    setIsHovering(true);
    if (!videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  };

  const handleLeave = () => {
    setIsHovering(false);
    if (!videoRef.current) return;
    videoRef.current.pause();
  };

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setCursorPosition({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  };

  const handleNavigate = () => {
    router.push("/visit");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push("/visit");
    }
  };

  return (
    <section className="bg-[#e9e3dd] py-16 text-black sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-4xl font-semibold uppercase tracking-[0.02em]">Featured Exhibition</h2>
          <span className="inline-flex border border-black bg-black px-4 py-2 text-lg font-semibold uppercase tracking-[0.08em] text-white">
            Ongoing
          </span>
        </div>

        <div
          role="link"
          tabIndex={0}
          aria-label="Plan your visit"
          draggable={false}
          onClick={handleNavigate}
          onKeyDown={handleKeyDown}
          onDragStart={(event) => event.preventDefault()}
          className={`relative block overflow-hidden border-[0.5px] border-black/20 bg-black transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isHovering ? "cursor-none shadow-[0_18px_38px_rgba(0,0,0,0.28)]" : "cursor-pointer"
          }`}
          style={{ cursor: isHovering ? "none" : "pointer" }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onMouseMove={handleMove}
        >
          <div
            className={`pointer-events-none absolute inset-0 z-10 bg-black transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isHovering ? "opacity-0" : "opacity-10"
            }`}
            aria-hidden
          />

          <video
            ref={videoRef}
            src={previewVideoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            className={`aspect-[16/6] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isHovering ? "scale-[1.02]" : "scale-100"
            }`}
            style={{ cursor: isHovering ? "none" : "pointer" }}
          />

          <div
            className={`pointer-events-none absolute z-20 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl font-semibold text-black shadow-[0_12px_26px_rgba(0,0,0,0.28)] transition-[opacity,transform] duration-300 ease-out md:flex ${
              isHovering ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
            aria-hidden
          >
            <span className="-rotate-12">Tickets</span>
          </div>
        </div>

        <div className="border-b border-black/20 py-7">
          <div className="grid gap-6 lg:grid-cols-[0.33fr_0.47fr_0.2fr] lg:items-start">
            <h3 className="font-display text-5xl font-semibold leading-[0.9] sm:text-6xl">RAPHAEL: SUBLIME POETRY</h3>
            <p className="pt-1 text-lg leading-snug text-black/90 sm:text-xl">
              This landmark exhibition explores Raphael&apos;s sublime and poetic approach to painting, showcasing his masterful drawings, portraits, and religious works that defined the High Renaissance.
            </p>
            <p className="pt-1 text-base text-black/85 sm:text-lg">
              Out of Public:
              <br />
              <span className="font-semibold text-black">March 29, 2026</span>
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <button onClick={() => setIsModalOpen(true)} className="swoop-link inline-flex items-center gap-2 text-lg font-semibold uppercase tracking-[0.06em] text-black sm:text-xl hover:text-black">
            View Details
            <span className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-black text-base leading-none" aria-hidden>
              →
            </span>
          </button>
        </div>
      </div>

      {isModalOpen && selectedExhibition && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="flex max-h-[85vh] flex-col overflow-y-auto bg-[#f3f2f0]">
            <div className="relative aspect-[21/9] w-full bg-[#e7e4df]">
              <Image
                src={selectedExhibition.image_url || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
                alt={selectedExhibition.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b16] to-transparent opacity-90" />
              <div className="absolute bottom-6 left-8 right-8">
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
                  {selectedExhibition.dates}
                </span>
                <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                  {selectedExhibition.title}
                </h2>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div>
                <h3 className="font-display text-2xl font-semibold text-black mb-3">About the Exhibition</h3>
                <p className="text-black/80 leading-relaxed text-lg">{selectedExhibition.description}</p>
              </div>
              
              <div className="pt-6 border-t border-black/10">
                <h3 className="font-display text-2xl font-semibold text-black mb-6">Featured Works</h3>
                {loadingWorks ? (
                  <div className="text-black/50">Loading works...</div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {featuredWorks.map((art) => (
                      <div 
                         key={art.objectID} 
                         onClick={() => router.push(`/collection-areas?artifactId=${art.objectID}`)}
                         className="group cursor-pointer relative flex flex-col overflow-hidden rounded-lg bg-black/5 border border-black/10 hover:shadow-md transition-shadow"
                      >
                        <div className="relative aspect-square bg-black/40">
                          {art.primaryImageSmall ? (
                            <Image src={art.primaryImageSmall} alt={art.title || "Artwork"} fill className="object-cover transition-transform group-hover:scale-105" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-black/30">No Image</div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="truncate text-sm font-semibold text-black">{art.title || "Untitled"}</div>
                          <div className="truncate text-xs text-black/60">{art.objectDate || "Unknown Date"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

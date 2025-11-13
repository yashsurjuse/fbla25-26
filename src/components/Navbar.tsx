"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="absolute inset-0 h-20 bg-gradient-to-b from-black/55 via-black/25 to-transparent backdrop-blur-md" />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 text-white md:px-10">
        <Link href="/" className="flex items-center text-white">
          <span className="text-lg font-semibold uppercase tracking-[0.35em] text-white/90">the met</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-white/85 md:flex">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <Link href="/exhibitions" className="transition hover:text-white">Exhibitions</Link>
          <Link href="/artists" className="transition hover:text-white">Artists</Link>
          <Link href="/artifacts" className="transition hover:text-white">Artifacts</Link>
          <Link href="/visit" className="transition hover:text-white">Visit</Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            className="rounded-full border border-white/20 bg-white px-5 py-2 text-black shadow-sm backdrop-blur transition hover:brightness-[0.92]"
          >
            <Link href="/visit">Tickets</Link>
          </Button>
        </div>

        <button
          className="relative inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 p-2 text-white/90 backdrop-blur md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "-translate-y-full"
        } bg-[#05070d]/95 backdrop-blur-xl border-t border-white/10`}
      >
        <div className="flex flex-col gap-1 px-6 py-4 text-white/85">
          <Link href="/" className="py-2" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/exhibitions" className="py-2" onClick={() => setOpen(false)}>
            Exhibitions
          </Link>
          <Link href="/artists" className="py-2" onClick={() => setOpen(false)}>
            Artists
          </Link>
          <Link href="/artifacts" className="py-2" onClick={() => setOpen(false)}>
            Artifacts
          </Link>
          <Link href="/visit" className="py-2" onClick={() => setOpen(false)}>
            Visit
          </Link>
          <Link
            href="/visit"
            className="mt-3 inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-black"
            onClick={() => setOpen(false)}
          >
            Tickets
          </Link>
        </div>
      </div>
    </header>
  );
}

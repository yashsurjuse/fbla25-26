'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import Prism from "./Prism";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden py-20 sm:py-24 md:py-0 md:h-[90vh] max-[640px]:min-h-[760px] max-[480px]:min-h-[820px] max-[480px]:pb-32">
      <div className="absolute inset-0 z-0">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.2}
            hueShift={0.1}
            colorFrequency={1.1}
            noise={0.5}
            glow={1.2}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#081225]/55 via-[#030610]/35 to-[#010307]/75" />
      <div className="pointer-events-none absolute inset-0 z-20 backdrop-blur" />

      <div className="relative z-30 mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: easing }}
            className="space-y-5 text-white max-[480px]:text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.24em] text-white/75 backdrop-blur max-[830px]:hidden">
              The Metropolitan Museum of Art
            </span>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              5,000 years of art, curated for today.
            </h1>
            <p className="max-w-xl text-base text-white/75 sm:text-lg max-[480px]:mx-auto">
              The MET invites you to explore iconic masterpieces, modern art, and the cultures that shaped them, all in the heart of NYC.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:text-center">
              <Button
                asChild
                className="rounded-full px-6 py-2 shadow-lg shadow-black/20 backdrop-blur-md"
              >
                <Link href="/visit">Buy Tickets</Link>
              </Button>
              <Link
                href="/exhibitions"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2 text-sm text-white/85 backdrop-blur transition hover:bg-white/10"
              >
                Explore Exhibitions
                <span aria-hidden>→</span>
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: easing }}
              className="flex flex-wrap gap-6 text-xs text-white/60"
            >
              <div>
                <p className="font-semibold text-white/80">Current Feature</p>
                <p className="mt-1 text-white/70">The Harlem Renaissance and Transatlantic Modernism</p>
              </div>
              <div>
                <p className="font-semibold text-white/80">Upcoming</p>
                <p className="mt-1 text-white/70">Manet/Degas — Opening July 12</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: easing }}
            whileHover={{ scale: 1.035, transition: { duration: 0.2, ease: easing } }}
            whileTap={{ scale: 0.99, transition: { duration: 0.14, ease: easing } }}
            className="group rounded-3xl border border-white/10 bg-white/6 p-6 text-white shadow-2xl shadow-black/30 backdrop-blur-lg max-[640px]:mt-4"
          >
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>The Met at a Glance</span>
              <span>New York, NY</span>
            </div>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-3xl font-semibold text-white">2.2M+</p>
                <p className="text-sm text-white/60">Works across 19 curatorial departments</p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
              <div>
                <p className="text-3xl font-semibold text-white">7M+</p>
                <p className="text-sm text-white/60">Annual visitors engaging with the collection</p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
              <div>
                <p className="text-3xl font-semibold text-white">150+</p>
                <p className="text-sm text-white/60">Special exhibitions and events each year</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

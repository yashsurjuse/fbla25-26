"use client";

import { motion } from "framer-motion";
import FeaturedArtists from "@/components/FeaturedArtists";
import BackgroundParticles from "@/components/BackgroundParticles";

export default function ArtistsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <BackgroundParticles />
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-7xl px-6 pt-28 md:px-10"
      >
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white">Featured Artists</h1>
          <p className="mt-2 text-white/75">Discover the artists shaping contemporary digital and traditional practice.</p>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <FeaturedArtists />
        </motion.section>
      </motion.div>
    </div>
  );
}

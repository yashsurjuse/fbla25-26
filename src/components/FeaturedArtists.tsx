"use client";

import { motion } from "framer-motion";
import ArtistCard from "@/components/ArtistCard";
import { artists } from "@/data/artists";

type FeaturedArtistsProps = {
  limit?: number;
  animateDelay?: number;
};

export default function FeaturedArtists({ limit, animateDelay = 0.12 }: FeaturedArtistsProps = {}) {
  const list = typeof limit === "number" ? artists.slice(0, limit) : artists;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((artist, index) => (
        <motion.div
          key={artist.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: animateDelay * index, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArtistCard artist={artist} />
        </motion.div>
      ))}
    </div>
  );
}

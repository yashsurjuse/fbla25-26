"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";

type Artist = {
  id: string;
  name: string;
  bio: string;
  image: string;
};

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists?artistName=${encodeURIComponent(artist.name)}`} className="h-full block">
      <motion.div
        whileHover={{ scale: 1.025, rotate: 0.3 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="h-full"
      >
        <SpotlightCard className="group h-full flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-4 shadow-sm shadow-black/5 hover:shadow-md transition-shadow" spotlightColor="rgba(0, 0, 0, 0.05)">
          <div>
            <div className="relative h-48 w-full overflow-hidden rounded-lg bg-black/5">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
          </div>
          <div className="mt-4">
            <h4 className="font-display text-2xl font-semibold text-black">{artist.name}</h4>
            <p className="mt-2 line-clamp-3 text-sm text-black/75">{artist.bio}</p>
          </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span
              className="rounded-full border border-black px-5 py-2 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:bg-black hover:text-white"
            >
              View Artist
            </span>
          </div>
        </SpotlightCard>
      </motion.div>
    </Link>
  );
}

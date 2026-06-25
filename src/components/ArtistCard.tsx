"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="h-full"
      >
        <SpotlightCard className="group h-full flex flex-col justify-between rounded-3xl glass-card p-5" spotlightColor="rgba(0, 0, 0, 0.03)">
          <div>
            <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-black/5">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-6 px-2">
              <h4 className="font-display text-2xl font-bold text-black">{artist.name}</h4>
              <p className="mt-3 line-clamp-3 text-sm text-black/60 leading-relaxed">{artist.bio}</p>
            </div>
          </div>
          <div className="mt-6 px-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
              View Profile
            </span>
            <ArrowUpRight className="h-5 w-5 text-black/30 group-hover:text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </SpotlightCard>
      </motion.div>
    </Link>
  );
}

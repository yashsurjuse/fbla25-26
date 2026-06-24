"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";

type Exhibition = {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  image?: string;
};

export default function ExhibitionCard({ ex }: { ex: Exhibition }) {
  const dateRange = `${ex.start} → ${ex.end}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 0.15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpotlightCard className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 hover:shadow-md transition-shadow" spotlightColor="rgba(0, 0, 0, 0.05)">
        <div className="text-sm text-black/60">{dateRange}</div>
        <h3 className="mt-2 font-display text-2xl font-semibold text-black">{ex.title}</h3>
        <p className="mt-3 text-sm text-black/75 line-clamp-3">{ex.description}</p>
        <div className="mt-4">
          <Link
            href={`/exhibitions?id=${ex.id}`}
            className="text-sm font-semibold uppercase tracking-wider text-black border-b border-transparent hover:border-black transition-colors"
          >
            Learn more →
          </Link>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

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
      <SpotlightCard className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg shadow-black/25" spotlightColor="rgba(0, 229, 255, 0.22)">
        <div className="text-sm text-white/70">{dateRange}</div>
        <h3 className="mt-2 font-semibold text-white">{ex.title}</h3>
        <p className="mt-3 text-sm text-white/70">{ex.description}</p>
        <div className="mt-4">
          <Link
            href={`/exhibitions/${ex.id}`}
            className="text-sm font-medium text-white transition-colors group-hover:text-cyan-300"
          >
            Learn more →
          </Link>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <Link href={`/exhibitions?id=${ex.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="h-full"
      >
        <SpotlightCard className="group h-full flex flex-col justify-between rounded-3xl glass-card p-8" spotlightColor="rgba(0, 0, 0, 0.03)">
          <div className="flex flex-col gap-2">
            <div className="text-xs font-bold uppercase tracking-widest text-black/40">{dateRange}</div>
            <h3 className="mt-3 font-display text-3xl font-bold text-black group-hover:text-[color:var(--accent)] transition-colors">{ex.title}</h3>
            <p className="mt-4 text-sm text-black/70 line-clamp-4 leading-relaxed">{ex.description}</p>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
              Explore Exhibition
            </span>
            <ArrowUpRight className="h-5 w-5 text-black/30 group-hover:text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </SpotlightCard>
      </motion.div>
    </Link>
  );
}

'use client';

import { motion } from "framer-motion";
import type { Artifact } from "@/data/artifacts";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ArtifactCardProps = {
  artifact: Artifact;
  index?: number;
};

export default function ArtifactCard({ artifact, index = 0 }: ArtifactCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08 * index, ease }}
      whileHover={{ scale: 1.028, rotate: 0.15, transition: { duration: 0.22, ease } }}
      whileTap={{ scale: 0.99, transition: { duration: 0.16, ease } }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-6 text-white shadow-lg shadow-black/25 backdrop-blur-md transition-colors duration-200"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/12 via-transparent to-fuchsia-400/12 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="text-sm uppercase tracking-[0.2em] text-white/60">{artifact.era}</div>
        <div>
          <h3 className="text-xl font-semibold text-white">{artifact.title}</h3>
          <div className="mt-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/80">{artifact.location}</div>
        </div>
        <p className="text-sm text-white/75">{artifact.description}</p>
      </div>
    </motion.article>
  );
}

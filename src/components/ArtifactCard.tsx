'use client';

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Artifact } from "@/data/artifacts";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ArtifactCardProps = {
  artifact: Artifact;
  index?: number;
};

import { useRouter } from "next/navigation";

export default function ArtifactCard({ artifact, index = 0 }: ArtifactCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/artifacts?artifactId=${artifact.id}`);
  };

  const handleDeptClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/collection-areas?dept=${encodeURIComponent(artifact.location)}`);
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: Math.min(0.05 * index, 0.5), ease }}
        className="group relative overflow-hidden rounded-3xl glass-card p-6 md:p-8 h-full flex flex-col justify-between"
      >
        <div className="relative z-10 flex flex-col gap-4 h-full">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-black/40">{artifact.era}</div>
          <div className="flex-grow">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-black group-hover:text-[color:var(--accent)] transition-colors">{artifact.title}</h3>
            <div 
              onClick={handleDeptClick} 
              className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/50 hover:text-black hover:underline w-fit"
            >
              {artifact.location}
            </div>
            <p className="mt-4 text-sm text-black/70 line-clamp-4 leading-relaxed">{artifact.description}</p>
          </div>
          <div className="mt-6 flex items-center justify-end text-black/30 group-hover:text-black transition-colors">
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

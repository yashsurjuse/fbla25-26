'use client';

import { motion } from "framer-motion";
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
    <div onClick={handleCardClick} className="cursor-pointer">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 * index, ease }}
        whileHover={{ scale: 1.028, rotate: 0.15, transition: { duration: 0.22, ease } }}
        whileTap={{ scale: 0.99, transition: { duration: 0.16, ease } }}
        className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 text-black shadow-sm shadow-black/5 hover:shadow-md transition-shadow duration-200"
      >
        <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="text-sm uppercase tracking-[0.2em] text-black/60">{artifact.era}</div>
          <div>
            <h3 className="font-display text-2xl font-semibold text-black">{artifact.title}</h3>
            <div 
              onClick={handleDeptClick} 
              className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/50 hover:text-black hover:underline w-fit"
            >
              {artifact.location}
            </div>
          </div>
          <p className="text-sm text-black/75 line-clamp-4">{artifact.description}</p>
        </div>
      </motion.article>
    </div>
  );
}

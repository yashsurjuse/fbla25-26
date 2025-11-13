"use client";

import { motion } from "framer-motion";
import BackgroundParticles from "@/components/BackgroundParticles";
import ArtifactCard from "@/components/ArtifactCard";
import { artifacts } from "@/data/artifacts";

export default function ArtifactsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <BackgroundParticles />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-7xl px-6 pt-28 md:px-10"
      >
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white">Artifacts</h1>
          <p className="mt-2 text-white/75">
            Step inside The Met&apos;s encyclopedic collection, spanning pharaonic temples, Renaissance armor, West African bronzes, and more.
          </p>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {artifacts.map((artifact, index) => (
            <ArtifactCard key={artifact.id} artifact={artifact} index={index} />
          ))}
        </motion.section>
      </motion.div>
    </div>
  );
}

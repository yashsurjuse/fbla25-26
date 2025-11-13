"use client";

import { motion } from "framer-motion";
import ExhibitionCard from "@/components/ExhibitionCard";
import { exhibitions } from "@/data/exhibitions";
import BackgroundParticles from "@/components/BackgroundParticles";

export default function ExhibitionsPage() {
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
          <h1 className="text-3xl font-bold text-white">Exhibitions</h1>
          <p className="mt-2 text-white/75">Explore current and upcoming exhibitions at The Metropolitan Museum of Art.</p>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {[...exhibitions]
            .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
            .map((exhibition, index) => (
              <motion.div
                key={exhibition.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
              >
                <ExhibitionCard ex={exhibition} />
              </motion.div>
            ))}
        </motion.section>
      </motion.div>
    </div>
  );
}

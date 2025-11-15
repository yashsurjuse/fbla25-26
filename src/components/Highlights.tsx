"use client";

import { motion } from "framer-motion";
import { exhibitions } from "@/data/exhibitions";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";

export default function Highlights() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {[...exhibitions]
        .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
        .slice(0, 3)
        .map((exhibition, index) => (
        <motion.div
          key={exhibition.id}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.025, rotate: 0.25 }}
        >
          <SpotlightCard className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg shadow-black/25" spotlightColor="rgba(0, 229, 255, 0.22)">
            <div className="text-sm text-white/70">{exhibition.dateRange}</div>
            <h3 className="mt-2 font-semibold text-white">{exhibition.title}</h3>
            <p className="mt-3 text-sm text-white/70">{exhibition.description}</p>
            <div className="mt-4">
              <Link
                href="/exhibitions"
                className="text-sm font-medium text-white transition-colors group-hover:text-cyan-300"
              >
                Learn more →
              </Link>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Modal from "@/components/Modal";

type Artist = {
  id: string;
  name: string;
  bio: string;
  image: string;
};

export default function ArtistCard({ artist }: { artist: Artist }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        whileHover={{ scale: 1.025, rotate: 0.3 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="group rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-md shadow-lg shadow-black/25"
      >
        <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gradient-to-tr from-white/10 to-white/5">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="mt-3">
          <h4 className="font-semibold text-white">{artist.name}</h4>
          <p className="mt-2 line-clamp-3 text-sm text-white/75">{artist.bio}</p>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-white/20 bg-white px-4 py-1.5 text-sm font-medium text-black shadow-sm transition-transform hover:-translate-y-0.5"
          >
            View
          </button>
        </div>
      </motion.article>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-2xl p-6"
          >
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                sizes="(min-width: 768px) 600px, 90vw"
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-white">{artist.name}</h3>
            <p className="mt-3 text-white/75">{artist.bio}</p>
          </motion.div>
        </Modal>
      )}
    </>
  );
}

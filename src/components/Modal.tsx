"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 mx-4 w-full max-w-5xl"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white text-black shadow-2xl shadow-black/40">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-[9999] flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black/5 text-black transition hover:bg-black/10"
          >
            ×
          </button>
          {children}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

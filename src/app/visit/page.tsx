"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import TicketButton from "@/components/TicketButton";
import theMet from "@/app/the-met.avif";
import BackgroundParticles from "@/components/BackgroundParticles";
import DatePicker from "@/components/DatePicker";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ticketTypes = [
  { id: "adult", label: "Adult", price: 30, description: "Ages 18+", defaultQuantity: 1 },
  { id: "senior", label: "Senior", price: 22, description: "Ages 65+", defaultQuantity: 0 },
  { id: "student", label: "Student", price: 17, description: "Valid ID required", defaultQuantity: 0 },
  { id: "child", label: "Child", price: 0, description: "Ages 12 and under", defaultQuantity: 0 },
];

export default function VisitPage() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [tickets, setTickets] = useState<Record<string, number>>(() =>
    ticketTypes.reduce<Record<string, number>>((acc, type) => {
      acc[type.id] = type.defaultQuantity;
      return acc;
    }, {}),
  );
  const checkoutRef = useRef<HTMLDivElement | null>(null);

  const subtotal = ticketTypes.reduce((total, type) => total + type.price * (tickets[type.id] ?? 0), 0);

  const handleBuyTickets = () => {
    setShowCheckout(true);
  };

  useEffect(() => {
    if (showCheckout && checkoutRef.current) {
      const timeout = window.setTimeout(() => {
        checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);

      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [showCheckout]);

  const updateTickets = (id: string, delta: number) => {
    setTickets((prev) => {
      const next = { ...prev };
      const current = next[id] ?? 0;
      const nextValue = Math.max(0, current + delta);
      next[id] = nextValue;
      return next;
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <BackgroundParticles />
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto max-w-4xl px-6 pt-28 md:px-10"
      >
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white">Visit The Met</h1>
          <p className="mt-2 text-white/75">Plan your day at The Metropolitan Museum of Art, including hours, tickets, directions, and ways to connect.</p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.12 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="font-semibold text-white">Hours</h2>
            <ul className="mt-3 space-y-1 text-white/80">
              <li>Sunday – Thursday: 10:00 AM – 5:00 PM</li>
              <li>Friday & Saturday: 10:00 AM – 9:00 PM</li>
              <li>Closed on Thanksgiving Day and December 25</li>
            </ul>

            <h3 className="mt-6 font-semibold text-white">Tickets</h3>
            <p className="mt-2 text-white/75">Adults $30, Seniors $22, Students $17. Kids under 12, members, and patrons go free.</p>
            <div className="mt-4">
              <TicketButton onClick={handleBuyTickets}>Buy Tickets</TicketButton>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="font-semibold text-white">Location</h2>
            <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/40 pb-[56%]">
              <Image
                src={theMet}
                alt="Illustrated map showing The Met on Fifth Avenue"
                placeholder="blur"
                fill
                sizes="(min-width: 768px) 360px, 100vw"
                className="object-contain object-center"
              />
            </div>
            <address className="mt-3 not-italic text-white/75">
              1000 Fifth Avenue
              <br />
              New York, NY 10028
            </address>

            <h3 className="mt-4 font-semibold text-white">Contact</h3>
            <p className="mt-2 text-white/75">
              Email: info@metmuseum.org
              <br />
              Phone: (212) 535-7710
            </p>
          </section>
        </motion.div>

        <AnimatePresence>
          {showCheckout && (
            <motion.section
              ref={checkoutRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease, delay: 0.08 }}
              className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-white/6 p-6 text-white shadow-lg shadow-black/25 backdrop-blur"
            >
              <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Plan Your Visit</h2>
                  <p className="text-sm text-white/70">Choose your date and ticket mix to generate a subtotal.</p>
                  <p className="text-sm text-white/60">If you are a patron or member, please show up with your pass.</p>
                </div>
                <label className="flex flex-col gap-2 text-sm text-white/75 md:text-right">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">Visiting on</span>
                  <DatePicker value={selectedDate} onChange={setSelectedDate} />
                </label>
              </header>

              <div className="space-y-4">
                {ticketTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/4 p-4 text-sm text-white/80 transition hover:border-white/25 hover:bg-white/6 md:flex-row md:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-base font-semibold text-white">
                        <span>{type.label}</span>
                        <span className="text-sm font-medium text-cyan-200/80">{type.price === 0 ? "Included" : `$${type.price}`}</span>
                      </div>
                      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/50">{type.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Decrease ${type.label} tickets`}
                        onClick={() => updateTickets(type.id, -1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg text-white transition hover:border-white/30 hover:bg-white/20"
                      >
                        &minus;
                      </button>
                      <span className="w-10 text-center text-lg font-semibold text-white">
                        {tickets[type.id] ?? 0}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${type.label} tickets`}
                        onClick={() => updateTickets(type.id, 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg text-white transition hover:border-white/30 hover:bg-white/20"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/8 p-4 text-white/80 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">Subtotal</p>
                  <p className="text-2xl font-semibold text-white">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <TicketButton className="w-full md:w-auto md:px-8">
                  Continue to Checkout
                </TicketButton>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

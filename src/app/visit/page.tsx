"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/components/CartContext";
import DatePicker from "@/components/DatePicker";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { museumInfo } from "@/data/site";
import { createDefaultTicketQuantities, getPaidTicketCount, getTicketCount, getTicketSubtotal, ticketTypes } from "@/lib/tickets";

const metFacadeImage =
  "https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg";

const today = new Date().toISOString().split("T")[0];

export default function VisitPage() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [tickets, setTickets] = useState<Record<string, number>>(() => createDefaultTicketQuantities());
  const { addVisitItem, openCart } = useCart();

  const checkoutRef = useRef<HTMLElement | null>(null);

  const subtotal = useMemo(() => getTicketSubtotal(tickets), [tickets]);

  const totalTickets = useMemo(() => getTicketCount(tickets), [tickets]);
  const paidTickets = useMemo(() => getPaidTicketCount(tickets), [tickets]);

  useEffect(() => {
    if (!showCheckout || !checkoutRef.current) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const top = checkoutRef.current
        ? checkoutRef.current.getBoundingClientRect().top + window.scrollY - 145
        : 0;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [showCheckout]);

  const updateTickets = (id: string, delta: number) => {
    setTickets((prev) => {
      const current = prev[id] ?? 0;
      const nextQuantity = Math.max(0, current + delta);
      const next = { ...prev, [id]: nextQuantity };
      if (id !== "child" && getPaidTicketCount(next) === 0) {
        next.child = 0;
      }
      return next;
    });
  };

  const saveCurrentSelection = () => {
    if (totalTickets === 0) {
      return;
    }
    addVisitItem({ visitDate: selectedDate, quantities: tickets });
    openCart();
  };

  const saveForCheckout = () => {
    if (totalTickets === 0) {
      return;
    }
    addVisitItem({ visitDate: selectedDate, quantities: tickets });
  };

  return (
    <div className="bg-[#f2f2f2] pb-16">
      <section className="relative isolate min-h-[52vh] overflow-hidden border-b border-black/15 px-4 py-16 text-white sm:px-6 lg:px-10">
        <Image
          src={metFacadeImage}
          alt="Front facade of The Metropolitan Museum of Art"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden />

        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Visitor Information</p>
          <h1 className="mt-2 font-display text-6xl font-semibold leading-[0.95] sm:text-7xl">Plan Your Visit</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            Plan your day at The Metropolitan Museum of Art with opening hours, ticket rates, location details, and practical
            guidance before arrival.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-10">
        <article className="glass-card rounded-[2.5rem] border border-white/40 bg-white/60 p-10 shadow-[0_16px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
          <h2 className="font-display text-4xl font-semibold text-black">Hours</h2>
          <ul className="mt-4 space-y-2 text-base text-black/80">
            {museumInfo.hours.map((item) => (
              <li key={item.label} className="flex justify-between gap-4 border-b border-black/10 pb-2">
                <span className="font-semibold">{item.label}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-display text-3xl font-semibold text-black">Ticket Prices</h3>
          <ul className="mt-4 space-y-2 text-base text-black/80">
            {museumInfo.ticketPrices.map((item) => (
              <li key={item.label} className="flex justify-between gap-4 border-b border-black/10 pb-2">
                <span className="font-semibold">{item.label}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setShowCheckout(true)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-black bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black/80 hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,0,0,0.15)] w-full"
          >
            Buy Tickets
          </button>
        </article>

        <article className="glass-card rounded-[2.5rem] border border-white/40 bg-white/60 p-10 shadow-[0_16px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
          <h2 className="font-display text-4xl font-semibold text-black">Location</h2>
          <GoogleMapEmbed className="mt-4 aspect-[4/3] overflow-hidden border border-black/15 bg-[#ececec]" />

          <address className="mt-5 text-lg not-italic text-black/80">
            {museumInfo.addressLines[0]}
            <br />
            {museumInfo.addressLines[1]}
            <br />
            Phone: {museumInfo.phone}
            <br />
            Email: {museumInfo.email}
          </address>

          <div className="mt-8 border-t border-black/10 pt-5 text-sm font-sans text-black/75">
            <h3 className="!font-sans text-base font-semibold tracking-[0.08em] text-black">Getting Here</h3>
            <p className="mt-2">Subway: 4, 5, 6 trains to 86th Street, then walk west to Fifth Avenue.</p>
            <p className="mt-2">Bus: M1, M2, M3, and M4 lines stop along Fifth Avenue near the museum.</p>
            <p className="mt-2">Accessibility entrance: Ground level entry at 81st Street and Fifth Avenue.</p>
          </div>
        </article>
      </section>

      {showCheckout ? (
        <section ref={checkoutRef} className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <article className="glass-card rounded-[2.5rem] border border-white/40 bg-white/60 p-10 shadow-[0_16px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl mt-4">
            <header className="flex flex-col gap-4 border-b border-black/10 pb-4 md:flex-row md:items-end md:justify-between relative z-[9999] isolate">
              <div>
                <h2 className="font-display text-4xl font-semibold text-black">Plan Your Visit</h2>
                <p className="mt-2 text-sm text-black/70">
                  Choose your date and ticket mix to generate a subtotal before checkout.
                </p>
              </div>

              <label className="text-sm font-semibold text-black/75">
                Visiting on
                <div className="mt-2 max-w-64 relative z-[9999]">
                  <DatePicker
                    value={selectedDate}
                    onChange={(value) => setSelectedDate(value || today)}
                    theme="light"
                  />
                </div>
              </label>
            </header>

            <div className="mt-5 space-y-3 relative z-0">
              {ticketTypes.map((type) => (
                <div
                  key={type.id}
                  className={`flex flex-col justify-between gap-4 rounded-[1.5rem] border p-6 md:flex-row md:items-center transition-all ${
                    type.id === "child" && paidTickets === 0
                      ? "border-black/5 bg-black/5 opacity-70"
                      : "border-white/50 bg-white/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                  }`}
                >
                  <div>
                    <p className="text-lg font-semibold text-black">
                      {type.label} <span className="text-black/60">${type.price.toFixed(2)}</span>{" "}
                      {type.price === 0 ? <span className="text-black/55">(Included)</span> : null}
                    </p>
                    <p className="text-xs uppercase tracking-[0.14em] text-black/55">{type.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`Decrease ${type.label} tickets`}
                      onClick={() => updateTickets(type.id, -1)}
                      disabled={type.id === "child" && paidTickets === 0}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/30 bg-white text-lg font-semibold text-black transition-colors hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-lg font-semibold text-black">{tickets[type.id] ?? 0}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${type.label} tickets`}
                      onClick={() => updateTickets(type.id, 1)}
                      disabled={type.id === "child" && paidTickets === 0}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/30 bg-white text-lg font-semibold text-black transition-colors hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-6 rounded-[2rem] border border-white/20 bg-black/80 p-8 text-white md:flex-row md:items-center md:justify-between shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">Subtotal</p>
                <p className="text-4xl font-semibold mt-2">${subtotal.toFixed(2)}</p>
                <p className="text-sm text-white/70 mt-1">{totalTickets} ticket(s) selected</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={saveCurrentSelection}
                  disabled={totalTickets === 0}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                >
                  Save to Cart
                </button>
                <Link
                  href="/checkout"
                  onClick={saveForCheckout}
                  className="rounded-full border border-white bg-white px-6 py-4 text-sm font-bold uppercase tracking-wider !text-black transition-all hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                >
                  Continue to Checkout
                </Link>
              </div>
            </div>
          </article>
        </section>
      ) : null}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import OpenStreetMap from "@/components/OpenStreetMap";
import { museumInfo } from "@/data/site";

type TicketType = {
  id: string;
  label: string;
  price: number;
  description: string;
  defaultQuantity: number;
};

const ticketTypes: TicketType[] = [
  { id: "adult", label: "Adult", price: 30, description: "Ages 18+", defaultQuantity: 1 },
  { id: "senior", label: "Senior", price: 22, description: "Ages 65+", defaultQuantity: 0 },
  { id: "student", label: "Student", price: 17, description: "Valid student ID", defaultQuantity: 0 },
  { id: "child", label: "Child", price: 0, description: "Ages 12 and under", defaultQuantity: 0 },
];

const metFacadeImage =
  "https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg";

const today = new Date().toISOString().split("T")[0];

export default function VisitPage() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [tickets, setTickets] = useState<Record<string, number>>(() =>
    ticketTypes.reduce<Record<string, number>>((acc, type) => {
      acc[type.id] = type.defaultQuantity;
      return acc;
    }, {}),
  );

  const checkoutRef = useRef<HTMLElement | null>(null);

  const subtotal = useMemo(
    () => ticketTypes.reduce((total, type) => total + (tickets[type.id] ?? 0) * type.price, 0),
    [tickets],
  );

  const totalTickets = useMemo(
    () => ticketTypes.reduce((count, type) => count + (tickets[type.id] ?? 0), 0),
    [tickets],
  );

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
      return { ...prev, [id]: nextQuantity };
    });
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
        <article className="border border-black/15 bg-white p-6">
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
            className="mt-6 border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white"
          >
            Buy Tickets
          </button>
        </article>

        <article className="border border-black/15 bg-white p-6">
          <h2 className="font-display text-4xl font-semibold text-black">Location</h2>
          <OpenStreetMap className="mt-4 aspect-[4/3] overflow-hidden border border-black/15 bg-[#ececec]" />

          <address className="mt-5 text-lg not-italic text-black/80">
            {museumInfo.addressLines[0]}
            <br />
            {museumInfo.addressLines[1]}
            <br />
            Phone: {museumInfo.phone}
            <br />
            Email: {museumInfo.email}
          </address>

          <div className="mt-8 border-t border-black/10 pt-5 text-sm text-black/75">
            <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-black">Getting Here</h3>
            <p className="mt-2">Subway: 4, 5, 6 trains to 86th Street, then walk west to Fifth Avenue.</p>
            <p className="mt-2">Bus: M1, M2, M3, and M4 lines stop along Fifth Avenue near the museum.</p>
            <p className="mt-2">Accessibility entrance: Ground level entry at 81st Street and Fifth Avenue.</p>
          </div>
        </article>
      </section>

      {showCheckout ? (
        <section ref={checkoutRef} className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <article className="border border-black/15 bg-white p-6 shadow-sm">
            <header className="flex flex-col gap-4 border-b border-black/10 pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-4xl font-semibold text-black">Plan Your Visit</h2>
                <p className="mt-2 text-sm text-black/70">
                  Choose your date and ticket mix to generate a subtotal before checkout.
                </p>
              </div>

              <label className="text-sm font-semibold text-black/75">
                Visiting on
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="mt-2 block h-10 border border-black/25 px-3 text-sm font-medium text-black"
                />
              </label>
            </header>

            <div className="mt-5 space-y-3">
              {ticketTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex flex-col justify-between gap-4 border border-black/10 bg-[#f8f8f8] p-4 md:flex-row md:items-center"
                >
                  <div>
                    <p className="text-lg font-semibold text-black">
                      {type.label} {type.price === 0 ? <span className="text-black/55">(Included)</span> : null}
                    </p>
                    <p className="text-xs uppercase tracking-[0.14em] text-black/55">{type.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`Decrease ${type.label} tickets`}
                      onClick={() => updateTickets(type.id, -1)}
                      className="inline-flex h-9 w-9 items-center justify-center border border-black/30 text-lg font-semibold text-black"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-lg font-semibold text-black">{tickets[type.id] ?? 0}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${type.label} tickets`}
                      onClick={() => updateTickets(type.id, 1)}
                      className="inline-flex h-9 w-9 items-center justify-center border border-black/30 text-lg font-semibold text-black"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-4 border border-black/15 bg-black p-4 text-white md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-white/70">Subtotal</p>
                <p className="text-3xl font-semibold">${subtotal.toFixed(2)}</p>
                <p className="text-sm text-white/75">{totalTickets} ticket(s) selected</p>
              </div>
              <button type="button" className="border border-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">
                Continue to Checkout
              </button>
            </div>
          </article>
        </section>
      ) : null}
    </div>
  );
}

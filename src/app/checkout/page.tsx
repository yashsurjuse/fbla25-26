"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { getCartItemTotal, useCart } from "@/components/CartContext";
import { ticketTypes } from "@/lib/tickets";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const checkoutFormRef = useRef<HTMLFormElement | null>(null);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + getCartItemTotal(item), 0);
    const serviceFee = subtotal > 0 ? Math.max(3.5, subtotal * 0.045) : 0;
    const total = subtotal + serviceFee;
    return { subtotal, serviceFee, total };
  }, [items]);

  const hasItems = items.length > 0;

  const handlePlaceOrder = () => {
    if (!checkoutFormRef.current?.reportValidity()) {
      return;
    }
    setPlaced(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-7 flex items-center justify-between gap-3 border-b border-black/10 pb-4">
          <h1 className="font-display text-5xl font-semibold text-black sm:text-6xl">Secure Checkout</h1>
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.08em] text-black/70 hover:text-black">
            Return Home
          </Link>
        </div>

        {!hasItems ? (
          <div className="border border-black/15 bg-white p-6">
            <h2 className="font-display text-4xl font-semibold text-black">Your cart is empty</h2>
            <p className="mt-3 text-black/75">Add tickets or a membership plan before checking out.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/visit" className="border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">
                Plan Your Visit
              </Link>
              <Link href="/membership" className="border border-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-black">
                Become a Member
              </Link>
            </div>
          </div>
        ) : (
          <form ref={checkoutFormRef} className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]" onSubmit={(event) => event.preventDefault()}>
            <section className="space-y-6">
              <article className="border border-black/15 bg-white p-6">
                <h2 className="font-display text-4xl font-semibold text-black">Contact Details</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input required className="h-11 border border-black/20 px-3" placeholder="First name" />
                  <input required className="h-11 border border-black/20 px-3" placeholder="Last name" />
                  <input required type="email" className="h-11 border border-black/20 px-3 sm:col-span-2" placeholder="Email" />
                  <input required type="tel" className="h-11 border border-black/20 px-3 sm:col-span-2" placeholder="Phone" />
                </div>
              </article>

              <article className="border border-black/15 bg-white p-6">
                <h2 className="font-display text-4xl font-semibold text-black">Billing Address</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input required className="h-11 border border-black/20 px-3 sm:col-span-2" placeholder="Street address" />
                  <input required className="h-11 border border-black/20 px-3" placeholder="City" />
                  <input required className="h-11 border border-black/20 px-3" placeholder="State" />
                  <input required className="h-11 border border-black/20 px-3" placeholder="ZIP" />
                  <input required className="h-11 border border-black/20 px-3" placeholder="Country" defaultValue="United States" />
                </div>
              </article>

              <article className="border border-black/15 bg-white p-6">
                <h2 className="font-display text-4xl font-semibold text-black">Payment</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input required minLength={13} className="h-11 border border-black/20 px-3 sm:col-span-2" placeholder="Card number" />
                  <input required className="h-11 border border-black/20 px-3" placeholder="MM / YY" />
                  <input required minLength={3} className="h-11 border border-black/20 px-3" placeholder="CVC" />
                  <input required className="h-11 border border-black/20 px-3 sm:col-span-2" placeholder="Name on card" />
                </div>
              </article>
            </section>

            <aside className="border border-black/15 bg-white p-6">
              <h2 className="font-display text-4xl font-semibold text-black">Order Summary</h2>
              <div className="mt-4 space-y-3">
                {items.map((item, index) => (
                  <div key={`${item.createdAt}-${index}`} className="border border-black/10 bg-[#f7f7f7] p-3">
                    {item.type === "visit" ? (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/60">Visit Tickets</p>
                        <p className="mt-1 text-sm text-black/70">{item.visitDate}</p>
                        <div className="mt-2 space-y-1 text-sm text-black/70">
                          {ticketTypes
                            .filter((type) => (item.quantities[type.id] ?? 0) > 0)
                            .map((type) => (
                              <div key={type.id} className="flex justify-between gap-3">
                                <span>
                                  {type.label} × {item.quantities[type.id]}
                                </span>
                                <span>${((item.quantities[type.id] ?? 0) * type.price).toFixed(2)}</span>
                              </div>
                            ))}
                        </div>
                      </>
                    ) : item.type === "membership" ? (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/60">Membership</p>
                        <p className="mt-1 text-sm font-semibold text-black">{item.tierName}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/60">Store</p>
                        <p className="mt-1 text-sm font-semibold text-black">{item.productName}</p>
                        {item.size && <p className="text-xs text-black/60 font-semibold mt-1">Size: {item.size}</p>}
                        <p className="text-sm text-black/70">Qty {item.quantity}</p>
                      </>
                    )}
                    <p className="mt-2 text-sm font-semibold text-black">${getCartItemTotal(item).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2 border-t border-black/10 pt-4 text-sm text-black/75">
                <div className="flex justify-between gap-4">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Service Fee</span>
                  <span>${totals.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-black/10 pt-2 text-base font-semibold text-black">
                  <span>Total</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="mt-5 w-full border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white"
              >
                Place Order
              </button>
            </aside>
          </form>
        )}
      </div>

      {placed ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/45 px-4" role="dialog" aria-modal="true" aria-label="Thank you">
          <div className="w-full max-w-xl border border-black/20 bg-white p-6 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/55">Order Confirmed</p>
            <h2 className="mt-2 font-display text-5xl font-semibold text-black">Thank you for your order</h2>
            <p className="mt-2 text-black/75">Your confirmation and digital tickets have been prepared.</p>

            <div className="mt-5 border border-dashed border-black/30 bg-[#f7f7f7] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/55">Admission Pass</p>
              <p className="mt-1 text-xl font-semibold text-black">The Metropolitan Museum of Art</p>
              <p className="mt-1 text-sm text-black/75">Booking reference: MET-{Date.now().toString().slice(-6)}</p>
              <p className="mt-1 text-sm text-black/75">Present this pass at ticketing or member services.</p>
            </div>

            <div className="mt-6 flex gap-2">
              <Link href="/" className="inline-flex flex-1 items-center justify-center border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">
                Return Home
              </Link>
              <button
                type="button"
                onClick={() => setPlaced(false)}
                className="inline-flex flex-1 items-center justify-center border border-black/20 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-black"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

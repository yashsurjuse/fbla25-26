"use client";

import Link from "next/link";
import { useCart, getCartItemTotal } from "@/components/CartContext";
import { ticketTypes } from "@/lib/tickets";

export default function CartDrawer() {
  const { isOpen, items, closeCart, removeItem, clearCart } = useCart();

  const subtotal = items.reduce((sum, item) => sum + getCartItemTotal(item), 0);

  return (
    <>
      <div
        className={`a11y-filter-target fixed inset-0 z-[70] bg-black/45 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden
        onClick={closeCart}
      />

      <aside
        aria-label="Shopping cart"
        className={`a11y-filter-target fixed top-0 right-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-black/10 bg-[color:var(--paper)] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <h2 className="font-display text-3xl font-semibold text-black">Your Cart</h2>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex h-9 w-9 items-center justify-center border border-black/20 text-black"
            aria-label="Close cart"
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="border border-black/15 bg-white p-4 text-sm text-black/70">Your cart is empty.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li key={`${item.createdAt}-${index}`} className="border border-black/15 bg-white p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/55">
                      {item.type === "visit" ? "Visit Tickets" : item.type === "membership" ? "Membership" : "Store"}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>

                  {item.type === "visit" ? (
                    <>
                      <p className="mt-1 text-sm text-black/75">Date: {item.visitDate}</p>
                      <div className="mt-2 space-y-1 text-sm text-black/70">
                        {ticketTypes
                          .filter((type) => (item.quantities[type.id] ?? 0) > 0)
                          .map((type) => (
                            <div key={type.id} className="flex justify-between gap-4">
                              <span>
                                {type.label} × {item.quantities[type.id]}
                              </span>
                              <span>${((item.quantities[type.id] ?? 0) * type.price).toFixed(2)}</span>
                            </div>
                          ))}
                      </div>
                    </>
                  ) : item.type === "membership" ? (
                    <p className="mt-1 text-sm text-black/75">{item.tierName}</p>
                  ) : (
                    <>
                      <p className="mt-1 text-sm text-black/75">{item.productName}</p>
                      <p className="text-sm text-black/70">Qty {item.quantity}</p>
                    </>
                  )}

                  <p className="mt-3 text-base font-semibold text-black">${getCartItemTotal(item).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-black/10 px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm text-black/75">
            <span>Subtotal</span>
            <span className="text-lg font-semibold text-black">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex flex-1 items-center justify-center border border-black/20 px-3 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-black"
            >
              Clear
            </button>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="inline-flex flex-1 items-center justify-center border border-black bg-black px-3 py-3 text-sm font-semibold uppercase tracking-[0.08em] !text-white"
            >
              Checkout
            </Link>
          </div>
        </footer>
      </aside>
    </>
  );
}

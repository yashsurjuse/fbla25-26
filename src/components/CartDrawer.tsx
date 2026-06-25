"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, getCartItemTotal } from "@/components/CartContext";
import { ticketTypes } from "@/lib/tickets";

export default function CartDrawer() {
  const { isOpen, items, closeCart, removeItem, clearCart, wishlistItems, removeWishlistItem, addStoreItem, activeTab, setActiveTab } = useCart();

  const subtotal = items.reduce((sum, item) => sum + getCartItemTotal(item), 0);

  return (
    <>
      <div
        className={`a11y-filter-target fixed inset-0 z-[10010] bg-black/45 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden
        onClick={closeCart}
      />

      <aside
        aria-label="Shopping cart"
        className={`a11y-filter-target fixed top-0 right-0 z-[10020] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex flex-col bg-white">
          <div className="flex items-center justify-between px-6 py-5 pb-2">
            <h2 className="font-display text-2xl font-semibold text-black">Your Cart</h2>
            <button
              type="button"
              onClick={closeCart}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black hover:bg-black/5 transition-colors"
              aria-label="Close cart"
            >
              ×
            </button>
          </div>
          <div className="flex px-5 gap-4">
            <button 
              className={`pb-3 px-2 -mb-[1px] text-sm font-semibold uppercase tracking-wider border-b-2 transition-colors relative select-none after:absolute after:-inset-2 after:content-[''] ${activeTab === "cart" ? "border-black text-black" : "border-transparent text-black/40 hover:text-black"}`}
              onClick={() => setActiveTab("cart")}
            >
              Cart ({items.length})
            </button>
            <button 
              className={`pb-3 px-2 -mb-[1px] text-sm font-semibold uppercase tracking-wider border-b-2 transition-colors relative select-none after:absolute after:-inset-2 after:content-[''] ${activeTab === "wishlist" ? "border-black text-black" : "border-transparent text-black/40 hover:text-black"}`}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist ({wishlistItems.length})
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {activeTab === "cart" ? (
            items.length === 0 ? (
              <p className="p-6 text-center text-sm font-semibold text-black/50">Your cart is empty.</p>
            ) : (
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li key={`${item.createdAt}-${index}`} className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/40">
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
                      {item.size && <p className="text-xs text-black/60 font-semibold mt-1">Size: {item.size}</p>}
                      <p className="text-sm text-black/70 font-semibold">{item.quantity}x</p>
                    </>
                  )}

                  <p className="mt-3 text-base font-semibold text-black">${getCartItemTotal(item).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            )
          ) : (
            wishlistItems.length === 0 ? (
              <p className="p-6 text-center text-sm font-semibold text-black/50">Your wishlist is empty.</p>
            ) : (
              <ul className="space-y-4">
                {wishlistItems.map((item, index) => (
                  <li key={`${item.productId}-${index}`} className="flex gap-4 p-4">
                    <div className="w-16 h-16 bg-white/50 relative shrink-0 rounded-lg">
                      <img src={item.image} alt={item.productName} className="object-contain w-full h-full p-1" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-sm font-semibold leading-tight line-clamp-2">{item.productName}</p>
                      {item.size && <p className="text-xs text-black/60 font-semibold">Size: {item.size}</p>}
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">${item.price.toFixed(2)}</p>
                        <span className="text-xs text-black/60 font-semibold">{item.quantity}x</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <button
                          type="button"
                          onClick={() => removeWishlistItem(index)}
                          className="text-[0.65rem] font-semibold uppercase tracking-wider text-black/50 hover:text-black"
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            addStoreItem({ productId: item.productId, productName: item.productName, image: item.image, price: item.price, quantity: item.quantity, size: item.size });
                            removeWishlistItem(index);
                          }}
                          className="text-[0.65rem] font-bold uppercase tracking-wider text-white bg-black px-2 py-1 hover:bg-black/80"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>

        <footer className={`border-t border-black/10 bg-white px-6 py-5 ${activeTab === "wishlist" ? "hidden" : "block"}`}>
          <div className="mb-4 flex items-center justify-between text-sm text-black/60 font-semibold">
            <span>Subtotal</span>
            <span className="text-xl font-bold text-black">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-black/20 bg-white px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-black/5"
            >
              Clear
            </button>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-black bg-black px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-black/90 !text-white"
            >
              Checkout
            </Link>
          </div>
        </footer>
      </aside>
    </>
  );
}

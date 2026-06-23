"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useEffect, useState } from "react";

export default function OrderSuccessModal({ orderId }: { orderId: string }) {
  const { pastOrders } = useCart();
  const placedOrder = pastOrders.find(o => o.id === orderId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!placedOrder || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-10" role="dialog" aria-modal="true" aria-label="Thank you">
      <div className="w-full max-w-xl border border-black/20 bg-white p-6 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/55">Order Confirmed</p>
        <h2 className="mt-2 font-display text-5xl font-semibold text-black">Thank you for your order</h2>
        <p className="mt-2 text-black/75">Your confirmation and digital receipts have been prepared.</p>

        {placedOrder.items.some(i => i.type === "visit") && (
          <div className="mt-5 border border-dashed border-black/30 bg-[#f7f7f7] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/55">Admission Pass</p>
            <p className="mt-1 text-xl font-semibold text-black">The Metropolitan Museum of Art</p>
            <p className="mt-1 text-sm text-black/75">Booking reference: {orderId}</p>
            <p className="mt-1 text-sm text-black/75">Present this pass at ticketing or member services.</p>
          </div>
        )}

        {placedOrder.items.some(i => i.type === "membership") && (
          <div className="mt-5 border border-black/10 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/55">Membership</p>
            <p className="mt-1 text-base font-semibold text-black">Welcome to The Met Family!</p>
            <p className="mt-1 text-sm text-black/75 mb-3">Redeem your membership to receive your unique member ID and barcode.</p>
            <Link href="/redeem" target="_blank" className="inline-flex w-full items-center justify-center border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] !text-white hover:bg-black/80 transition-colors">
              Redeem Membership
            </Link>
          </div>
        )}

        {placedOrder.items.some(i => i.type === "store") && (
          <div className="mt-5 border border-black/10 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/55">Store Delivery</p>
            <p className="mt-1 text-base font-semibold text-black">Digital Receipt</p>
            <ul className="mt-3 space-y-3 divide-y divide-black/10">
              {placedOrder.items.filter(i => i.type === "store").map((item: any, idx) => (
                <li key={idx} className="pt-3 first:pt-0 flex justify-between">
                  <div>
                    <p className="text-sm font-semibold text-black line-clamp-1">{item.productName}</p>
                    {item.size && <p className="text-xs text-black/60 font-semibold mt-1">Size: {item.size}</p>}
                    <p className="text-xs text-black/60 font-semibold mt-1">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 h-fit border border-green-200">Processing</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center border border-black/20 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-black hover:bg-gray-50 transition-colors"
          >
            Close
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}


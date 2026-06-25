"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export default function OrderSuccessModal({ orderId }: { orderId: string }) {
  const { pastOrders } = useCart();
  const placedOrder = pastOrders.find(o => o.id === orderId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!placedOrder || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-10 backdrop-blur-xl popup-backdrop-enter" role="dialog" aria-modal="true" aria-label="Thank you">
      <div className="w-full max-w-2xl rounded-[3rem] bg-white p-12 shadow-[0_40px_100px_rgba(0,0,0,0.15)] popup-panel-enter relative overflow-hidden">
        
        {/* Removed background glow */}

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center mb-6 text-[color:var(--accent)] animate-[popup-rise-in_0.5s_ease-out_0.2s_both]">
            <Check className="h-16 w-16" />
          </div>
          
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/40 mb-3 animate-[popup-rise-in_0.5s_ease-out_0.3s_both]">Order Confirmed</p>
          <h2 className="font-display text-5xl font-bold leading-tight text-black sm:text-6xl mb-4 animate-[popup-rise-in_0.5s_ease-out_0.4s_both]">Thank you.</h2>
          <p className="text-lg text-black/60 max-w-md animate-[popup-rise-in_0.5s_ease-out_0.5s_both]">Your order has been successfully placed. Your digital receipts and tickets are ready below.</p>
        </div>

        <div className="mt-12 space-y-4 animate-[popup-rise-in_0.5s_ease-out_0.6s_both] relative z-10">
          {placedOrder.items.some(i => i.type === "visit") && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-3xl border border-black/5 bg-black/[0.02] p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1">Admission Pass</p>
                <p className="text-xl font-bold text-black">The Met Museum</p>
                <p className="text-sm text-black/60 mt-1">Booking ref: {orderId}</p>
              </div>
              <span className="mt-4 sm:mt-0 inline-flex items-center rounded-full bg-black/5 px-4 py-2 text-xs font-bold tracking-widest text-black">
                Ready to Use
              </span>
            </div>
          )}

          {placedOrder.items.some(i => i.type === "membership") && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-3xl border border-black/5 bg-[color:var(--accent)]/5 p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--accent)]/70 mb-1">Membership</p>
                <p className="text-xl font-bold text-black">Welcome to The Family</p>
                <p className="text-sm text-black/60 mt-1 max-w-[200px]">Redeem to get your member ID.</p>
              </div>
              <Link href="/redeem" target="_blank" className="mt-4 sm:mt-0 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-widest !text-white hover:bg-black/80 transition-colors shadow-lg">
                Redeem Now
              </Link>
            </div>
          )}

          {placedOrder.items.some(i => i.type === "store") && (
            <div className="rounded-3xl border border-black/5 bg-black/[0.02] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Store Delivery</p>
              <ul className="space-y-4">
                {placedOrder.items.filter(i => i.type === "store").map((item: any, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="text-base font-bold text-black">{item.productName}</p>
                      <p className="text-sm text-black/60">Qty: {item.quantity} {item.size && `• Size: ${item.size}`}</p>
                    </div>
                    <span className="text-xs font-bold text-green-700">Processing</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center relative z-10 animate-[popup-rise-in_0.5s_ease-out_0.7s_both]">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border-2 border-black/10 bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-black hover:border-black hover:bg-black hover:!text-white transition-all duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}


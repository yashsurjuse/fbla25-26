"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RedeemPage() {
  const [memberId, setMemberId] = useState("");
  const [barcode, setBarcode] = useState<number[]>([]);

  useEffect(() => {
    // Generate a random ID
    setMemberId(`MET-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
    
    // Generate an array of random widths for a visual barcode (1 to 4 px wide)
    const lines = [];
    for (let i = 0; i < 60; i++) {
      lines.push(Math.floor(Math.random() * 4) + 1);
    }
    setBarcode(lines);
  }, []);

  if (!memberId) {
    return <div className="min-h-screen bg-[#f2f2f2]" />; // Loading state
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="font-display text-5xl font-semibold text-black sm:text-6xl mb-4">Redeem Membership</h1>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Welcome to The Met Family. Your digital membership card has been generated. Use this barcode to access exhibitions and apply your store discounts in person.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Digital Card */}
          <div className="border border-black/15 bg-white p-8 shadow-sm flex flex-col items-center justify-center">
            <div className="w-full max-w-sm aspect-[1.6] bg-black text-white p-6 flex flex-col justify-between relative overflow-hidden rounded-xl shadow-2xl">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-1">The Met</p>
                <p className="text-2xl font-display font-semibold">Member Pass</p>
              </div>

              <div className="relative z-10 bg-white p-4 rounded mt-6">
                <div className="flex h-12 w-full items-end justify-center gap-[2px]">
                  {barcode.map((width, i) => (
                    <div key={i} className="bg-black h-full" style={{ width: `${width}px` }} />
                  ))}
                </div>
                <p className="text-center text-black font-mono mt-2 tracking-[0.1em] text-sm">{memberId}</p>
              </div>
            </div>
            
            <p className="mt-8 text-sm text-black/60 text-center max-w-xs">
              Present this digital pass at the entrance or any retail counter.
            </p>
          </div>

          {/* Account Creation */}
          <div className="border border-black/15 bg-white p-8 shadow-sm">
            <h2 className="font-display text-3xl font-semibold text-black mb-2">Create your account</h2>
            <p className="text-sm text-black/70 mb-6">
              Link your new Member ID to an online account to easily manage your subscription and track purchases.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-black/60 mb-1">Member ID</label>
                <input 
                  type="text" 
                  value={memberId}
                  disabled
                  className="w-full h-11 border border-black/20 px-3 bg-gray-50 text-black/60" 
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-black/60 mb-1">First Name</label>
                  <input required className="w-full h-11 border border-black/20 px-3" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-black/60 mb-1">Last Name</label>
                  <input required className="w-full h-11 border border-black/20 px-3" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-black/60 mb-1">Email</label>
                <input required type="email" className="w-full h-11 border border-black/20 px-3" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-black/60 mb-1">Password</label>
                <input required type="password" minLength={8} className="w-full h-11 border border-black/20 px-3" />
              </div>

              <button
                type="submit"
                className="mt-6 w-full border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-black/80 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Account linked successfully!");
                }}
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 border-t border-black/10 pt-6 text-center">
              <p className="text-sm text-black/70 mb-3">Already have an account?</p>
              <Link href="/account" className="text-sm font-bold underline hover:text-black/70 transition-colors">
                Sign in to link
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

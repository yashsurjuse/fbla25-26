"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RedeemPage() {
  const [memberId, setMemberId] = useState("");
  const [barcode, setBarcode] = useState<number[]>([]);

  useEffect(() => {
    setMemberId(`MET-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
    
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
    <div className="min-h-screen bg-[#f2f2f2] px-4 py-16 pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="font-display text-5xl font-semibold text-black sm:text-6xl mb-4">Redeem Membership</h1>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Welcome to The Met Family. Your digital membership card has been generated. Use this barcode to access exhibitions and apply your store discounts in person.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Digital Card */}
          <div className="glass-card rounded-[2.5rem] border border-white/40 bg-white/60 p-10 shadow-[0_16px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl flex flex-col items-center justify-center">
            <div className="w-full max-w-sm aspect-[1.6] bg-gradient-to-br from-black to-black/80 text-white p-8 flex flex-col justify-between relative overflow-hidden rounded-[2rem] shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-1">The Met</p>
                <p className="text-2xl font-display font-semibold">Member Pass</p>
              </div>

              <div className="relative z-10 bg-white p-4 rounded mt-auto mb-auto">
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
          <div className="glass-card rounded-[2.5rem] border border-white/40 bg-white/60 p-10 shadow-[0_16px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
            <h2 className="font-display text-3xl font-semibold text-black mb-2">Create your account</h2>
            <p className="text-sm text-black/70 mb-6">
              Link your new Member ID to an online account to easily manage your subscription and track purchases.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-black/60 mb-2">Member ID</label>
                <input 
                  type="text" 
                  value={memberId}
                  disabled
                  className="h-14 w-full rounded-2xl border border-black/20 bg-[#f7f7f7] px-5 shadow-inner text-black font-medium opacity-70 cursor-not-allowed" 
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-black/60 mb-2">First Name</label>
                  <input required className="h-14 w-full rounded-2xl border border-black/20 bg-white/60 px-5 backdrop-blur-md focus:border-black/50 focus:bg-white/90 shadow-inner transition-all outline-none text-black font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-black/60 mb-2">Last Name</label>
                  <input required className="h-14 w-full rounded-2xl border border-black/20 bg-white/60 px-5 backdrop-blur-md focus:border-black/50 focus:bg-white/90 shadow-inner transition-all outline-none text-black font-medium" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-black/60 mb-2">Email</label>
                <input required type="email" className="h-14 w-full rounded-2xl border border-black/20 bg-white/60 px-5 backdrop-blur-md focus:border-black/50 focus:bg-white/90 shadow-inner transition-all outline-none text-black font-medium" />
              </div>
              <div className="mt-4">
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-black/60 mb-2">Password</label>
                <input required type="password" minLength={8} className="h-14 w-full rounded-2xl border border-black/20 bg-white/60 px-5 backdrop-blur-md focus:border-black/50 focus:bg-white/90 shadow-inner transition-all outline-none text-black font-medium" />
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full border border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black/80 hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
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

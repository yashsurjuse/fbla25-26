"use client";

import Link from "next/link";
import { useState } from "react";

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="bg-[#f2f2f2] px-4 py-14 pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section className="glass-card rounded-[2.5rem] border border-white/40 bg-white/60 p-8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
          <h1 className="font-display text-6xl font-semibold leading-[0.92] text-black">Member Access</h1>
          <p className="mt-3 text-black/75 text-lg">
            Sign in to manage bookings, membership benefits, and museum preferences.
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-white/50 bg-white/50 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.03)] backdrop-blur-sm">
            <h2 className="font-display text-3xl font-semibold text-black">Not a member yet?</h2>
            <p className="mt-2 text-black/75">Join today for free admission and exclusive event access.</p>
            <Link
              href="/membership"
              className="mt-6 inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-black bg-black px-6 py-3.5 text-sm font-bold uppercase tracking-wider !text-white transition-all duration-300 hover:bg-black/80 hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
            >
              Become a Member
            </Link>
          </div>
        </section>

        <section className="flex items-center glass-card rounded-[2.5rem] border border-white/40 bg-white/60 p-8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
          <div className="w-full">
          <div className="mb-6 inline-flex rounded-full border border-white/50 bg-white/40 p-1 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${mode === "login" ? "bg-black text-white shadow-md" : "text-black/60 hover:text-black"}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${mode === "signup" ? "bg-black text-white shadow-md" : "text-black/60 hover:text-black"}`}
            >
              Sign Up
            </button>
          </div>

          <form className="grid gap-4">
            {mode === "signup" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="h-14 w-full rounded-2xl border-2 border-black/20 bg-white/40 px-5 backdrop-blur-md focus:border-black/50 focus:bg-white/80 shadow-inner transition-all outline-none text-black placeholder-black/50 font-medium" placeholder="First name" />
                <input className="h-14 w-full rounded-2xl border-2 border-black/20 bg-white/40 px-5 backdrop-blur-md focus:border-black/50 focus:bg-white/80 shadow-inner transition-all outline-none text-black placeholder-black/50 font-medium" placeholder="Last name" />
              </div>
            ) : null}
            <input className="h-14 w-full rounded-2xl border-2 border-black/20 bg-white/40 px-5 backdrop-blur-md focus:border-black/50 focus:bg-white/80 shadow-inner transition-all outline-none text-black placeholder-black/50 font-medium" placeholder="Email" />
            {mode === "signup" ? <input className="h-14 w-full rounded-2xl border-2 border-black/20 bg-white/40 px-5 backdrop-blur-md focus:border-black/50 focus:bg-white/80 shadow-inner transition-all outline-none text-black placeholder-black/50 font-medium" type="password" placeholder="Member ID (Optional)" /> : null}
            <input className="h-14 w-full rounded-2xl border-2 border-black/20 bg-white/40 px-5 backdrop-blur-md focus:border-black/50 focus:bg-white/80 shadow-inner transition-all outline-none text-black placeholder-black/50 font-medium" type="password" placeholder="Password" />
            {mode === "signup" ? <input className="h-14 w-full rounded-2xl border-2 border-black/20 bg-white/40 px-5 backdrop-blur-md focus:border-black/50 focus:bg-white/80 shadow-inner transition-all outline-none text-black placeholder-black/50 font-medium" type="password" placeholder="Confirm password" /> : null}

            <button type="button" className="mt-4 w-full flex items-center justify-center gap-2 rounded-full border border-black bg-black px-4 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black/80 hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          </div>
        </section>
      </div>
    </div>
  );
}

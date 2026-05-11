"use client";

import Link from "next/link";
import { useState } from "react";

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="bg-[#f2f2f2] px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section className="border border-black/15 bg-white p-6">
          <h1 className="font-display text-6xl font-semibold leading-[0.92] text-black">Member Access</h1>
          <p className="mt-3 text-black/75">
            Sign in to manage bookings, membership benefits, and museum preferences.
          </p>

          <div className="mt-6 border border-black/10 bg-[#f7f7f7] p-4">
            <h2 className="font-display text-3xl font-semibold text-black">Not a member yet?</h2>
            <p className="mt-2 text-sm text-black/75">Join today for free admission and exclusive event access.</p>
            <Link
              href="/membership"
              className="mt-4 inline-flex border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] !text-white"
            >
              Become a Member
            </Link>
          </div>
        </section>

        <section className="flex items-center border border-black/15 bg-white p-6">
          <div className="w-full">
          <div className="mb-5 inline-flex border border-black/15 bg-[#f6f6f6] p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] ${mode === "login" ? "bg-black text-white" : "text-black/70"}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] ${mode === "signup" ? "bg-black text-white" : "text-black/70"}`}
            >
              Sign Up
            </button>
          </div>

          <form className="grid gap-3">
            {mode === "signup" ? (
              <>
                <input className="h-11 border border-black/20 px-3" placeholder="First name" />
                <input className="h-11 border border-black/20 px-3" placeholder="Last name" />
              </>
            ) : null}
            <input className="h-11 border border-black/20 px-3" placeholder="Email" />
            {mode === "signup" ? <input className="h-11 border border-black/20 px-3" type="password" placeholder="Member ID" /> : null}
            <input className="h-11 border border-black/20 px-3" type="password" placeholder="Password" />
            {mode === "signup" ? <input className="h-11 border border-black/20 px-3" type="password" placeholder="Confirm password" /> : null}

            <button type="button" className="mt-2 border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          </div>
        </section>
      </div>
    </div>
  );
}

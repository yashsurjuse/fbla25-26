"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "@/components/CartContext";
import { membershipTiers } from "@/data/membership-tiers";
import CustomDropdown from "@/components/CustomDropdown";

function getMembershipDiscount(years: number): number {
  if (years >= 5) return 0.2;
  if (years === 4) return 0.15;
  if (years === 3) return 0.1;
  if (years === 2) return 0.05;
  return 0;
}

export default function MembershipPage() {
  const { addMembershipItem, openCart } = useCart();
  const router = useRouter();
  const [actionTier, setActionTier] = useState<{ id: string; action: "cart" | "checkout" } | null>(null);
  const [years, setYears] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const checkoutTier = membershipTiers.find((tier) => tier.id === actionTier?.id) ?? null;
  const discount = getMembershipDiscount(years);
  const total = checkoutTier ? checkoutTier.price * years * (1 - discount) : 0;

  return (
    <div className="bg-[#f3f2f0] px-4 py-14 pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55">Membership</p>
        <h1 className="mt-2 font-display text-6xl font-semibold leading-[0.92] text-black sm:text-7xl">Become a Member</h1>
        <p className="mt-4 max-w-3xl text-lg text-black/75">
          Choose a membership tier and complete checkout to unlock year-round museum benefits.
        </p>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {membershipTiers.map((tier, index) => (
            <article key={tier.id} className={`glass-card no-hover flex h-full flex-col rounded-[2.5rem] border border-white/40 bg-white/60 p-8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-transform duration-500 ${index === 4 ? "xl:col-start-2" : ""}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/55">Tier</p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-black">{tier.name}</h2>
              <p className="mt-2 text-3xl font-semibold text-black">${tier.price}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-black/75">
                {tier.benefits.map((benefit) => (
                  <li key={benefit}>• {benefit}</li>
                ))}
              </ul>
              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setActionTier({ id: tier.id, action: "cart" });
                    setYears(1);
                  }}
                  className="w-full rounded-full border border-white/50 bg-white/40 px-5 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-white hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,0.05)] backdrop-blur-sm mb-3"
                >
                  Save to Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActionTier({ id: tier.id, action: "checkout" });
                    setYears(1);
                  }}
                  className="inline-flex w-full items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-black/80 hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                >
                  Checkout
                </button>
              </div>
            </article>
          ))}
        </section>

        {mounted && checkoutTier ? createPortal(
            <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm popup-backdrop-enter" role="dialog" aria-modal="true" aria-label="Membership Years">
              <div className="w-full max-w-lg rounded-[2.5rem] border border-black/10 bg-white p-10 shadow-[0_32px_80px_rgba(0,0,0,0.12)] popup-panel-enter">
              <h2 className="font-display text-4xl font-semibold text-black">Membership Checkout</h2>
              <p className="mt-2 text-black/75">{checkoutTier.name} tier</p>

              <label className="mt-5 block text-sm font-semibold text-black/80">
                Number of years (1-5)
                <CustomDropdown
                  value={String(years)}
                  onChange={(val) => setYears(Number(val) || 1)}
                  options={[
                    { value: "1", label: "1 year" },
                    { value: "2", label: "2 years (5% off)" },
                    { value: "3", label: "3 years (10% off)" },
                    { value: "4", label: "4 years (15% off)" },
                    { value: "5", label: "5 years (20% off)" }
                  ]}
                  placeholder="Select years"
                  className="mt-3"
                />
              </label>

              <div className="mt-4 border border-black/10 bg-[#f7f7f7] p-4 text-sm text-black/75">
                <div className="flex justify-between gap-4">
                  <span>Base total</span>
                  <span>${(checkoutTier.price * years).toFixed(2)}</span>
                </div>
                <div className="mt-1 flex justify-between gap-4">
                  <span>Discount</span>
                  <span>{Math.round(discount * 100)}%</span>
                </div>
                <div className="mt-2 flex justify-between gap-4 border-t border-black/10 pt-2 text-base font-semibold text-black">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  type="button"
                  onClick={() => setActionTier(null)}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-black/20 bg-[#f7f7f7] px-5 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-black/5 hover:scale-[1.02]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addMembershipItem({
                      tierId: checkoutTier.id,
                      tierName: `${checkoutTier.name} (${years} year${years > 1 ? "s" : ""})`,
                      price: Number(total.toFixed(2)),
                    });
                    setActionTier(null);
                    if (actionTier?.action === "cart") {
                      openCart("cart");
                    } else {
                      router.push("/checkout");
                    }
                  }}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-black bg-black px-5 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-black/80 hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                >
                  {actionTier?.action === "cart" ? "Add to Cart" : "Continue"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        ) : null}
      </div>
    </div>
  );
}

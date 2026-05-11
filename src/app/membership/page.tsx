"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { membershipTiers } from "@/data/membership-tiers";

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
  const [checkoutTierId, setCheckoutTierId] = useState<string | null>(null);
  const [years, setYears] = useState(1);

  const checkoutTier = membershipTiers.find((tier) => tier.id === checkoutTierId) ?? null;
  const discount = getMembershipDiscount(years);
  const total = checkoutTier ? checkoutTier.price * years * (1 - discount) : 0;

  return (
    <div className="bg-[#f3f2f0] px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55">Membership</p>
        <h1 className="mt-2 font-display text-6xl font-semibold leading-[0.92] text-black sm:text-7xl">Become a Member</h1>
        <p className="mt-4 max-w-3xl text-lg text-black/75">
          Choose a membership tier and complete checkout to unlock year-round museum benefits.
        </p>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {membershipTiers.map((tier) => (
            <article key={tier.id} className="flex h-full flex-col border border-black/15 bg-white p-5">
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
                    addMembershipItem({ tierId: tier.id, tierName: tier.name, price: tier.price });
                    openCart();
                  }}
                  className="w-full border border-black/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-black"
                >
                  Save to Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutTierId(tier.id);
                    setYears(1);
                  }}
                  className="inline-flex w-full items-center justify-center border border-black bg-black px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] !text-white"
                >
                  Checkout
                </button>
              </div>
            </article>
          ))}
        </section>

        {checkoutTier ? (
          <div className="fixed inset-0 z-[90] grid place-items-center bg-black/45 px-4" role="dialog" aria-modal="true" aria-label="Membership Years">
            <div className="w-full max-w-lg border border-black/20 bg-white p-6 shadow-2xl">
              <h2 className="font-display text-4xl font-semibold text-black">Membership Checkout</h2>
              <p className="mt-2 text-black/75">{checkoutTier.name} tier</p>

              <label className="mt-5 block text-sm font-semibold text-black/80">
                Number of years (1-5)
                <select
                  value={years}
                  onChange={(event) => setYears(Number(event.target.value))}
                  className="mt-2 h-11 w-full border border-black/25 bg-white px-3 text-black"
                >
                  <option value={1}>1 year</option>
                  <option value={2}>2 years (5% off)</option>
                  <option value={3}>3 years (10% off)</option>
                  <option value={4}>4 years (15% off)</option>
                  <option value={5}>5 years (20% off)</option>
                </select>
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

              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutTierId(null)}
                  className="inline-flex flex-1 items-center justify-center border border-black/20 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-black"
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
                    setCheckoutTierId(null);
                    router.push("/checkout");
                  }}
                  className="inline-flex flex-1 items-center justify-center border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] !text-white"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

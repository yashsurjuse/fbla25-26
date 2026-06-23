"use client";

import { useCart } from "@/components/CartContext";
export default function AddStoreToCartButton({ product, onAdded }: { product: { id: string, name: string, image: string, price: number }, onAdded?: () => void }) {
  const { addStoreItem, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        addStoreItem({
          productId: product.id,
          productName: product.name,
          image: product.image,
          price: product.price,
        });
        openCart();
        if (onAdded) onAdded();
      }}
      className="inline-flex flex-1 items-center justify-center border border-black/20 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-black"
    >
      Add to Cart
    </button>
  );
}

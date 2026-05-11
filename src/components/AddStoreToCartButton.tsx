"use client";

import { useCart } from "@/components/CartContext";
import type { StoreProduct } from "@/data/store-products";

export default function AddStoreToCartButton({ product }: { product: StoreProduct }) {
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
      }}
      className="inline-flex flex-1 items-center justify-center border border-black/20 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-black"
    >
      Add to Cart
    </button>
  );
}

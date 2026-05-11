import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddStoreToCartButton from "@/components/AddStoreToCartButton";
import { storeProducts } from "@/data/store-products";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function generateStaticParams() {
  return storeProducts.map((product) => ({ id: product.id }));
}

export default async function StoreItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = storeProducts.find((entry) => entry.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[#f4f4f4] px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <Link href="/store" className="text-sm font-semibold uppercase tracking-[0.08em] text-black/70 hover:text-black">
          Back to Store
        </Link>

        <div className="mt-5 grid gap-6 border border-black/15 bg-white p-6 lg:grid-cols-[1fr_1fr]">
          <div className="relative aspect-square overflow-hidden border border-black/10 bg-[#f8f5ef]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-7"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/55">{product.category}</p>
            <h1 className="mt-2 font-display text-5xl font-semibold leading-tight text-black">{product.name}</h1>
            <p className="mt-3 text-3xl font-semibold text-black">{currencyFormatter.format(product.price)}</p>

            <p className="mt-4 text-base text-black/75">{product.description}</p>

            <dl className="mt-6 space-y-2 border-t border-black/10 pt-4 text-sm text-black/75">
              <div className="flex justify-between gap-4">
                <dt className="font-semibold text-black">Material</dt>
                <dd>{product.material}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-semibold text-black">Inspiration</dt>
                <dd>{product.eraInspiration}</dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-2">
              <AddStoreToCartButton product={product} />
              <Link
                href="/checkout"
                className="inline-flex flex-1 items-center justify-center border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] !text-white"
              >
                Checkout
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

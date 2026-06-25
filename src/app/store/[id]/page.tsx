import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import StoreItemClient from "./StoreItemClient";

type StoreProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
};

export async function generateStaticParams() {
  try {
    const jsonPath = path.join(process.cwd(), "public/data/store_master.json");
    const data = await fs.readFile(jsonPath, "utf-8");
    const products: StoreProduct[] = JSON.parse(data);
    return products.map((p) => ({
      id: p.id,
    }));
  } catch (e) {
    return [];
  }
}

export default async function StoreItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product: StoreProduct | null = null;
  let allProducts: StoreProduct[] = [];
  
  try {
    const jsonPath = path.join(process.cwd(), "public/data/store_master.json");
    const data = await fs.readFile(jsonPath, "utf-8");
    allProducts = JSON.parse(data);
    product = allProducts.find(p => p.id === id) || null;
  } catch (e) {
    console.error(e);
  }

  if (!product) {
    return notFound();
  }

  const related = allProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 8); // Grab up to 8 for the carousel

  if (related.length < 8) {
    const others = allProducts.filter(p => p.category !== product?.category && p.id !== product?.id);
    related.push(...others.slice(0, 8 - related.length));
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <StoreItemClient product={product} relatedProducts={related} />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "@/components/CartContext";

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

export default function StoreItemClient({
  product,
  relatedProducts,
}: {
  product: StoreProduct;
  relatedProducts: StoreProduct[];
}) {
  const [qty, setQty] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [policyModal, setPolicyModal] = useState<"privacy" | "shipping" | "size" | "reviews" | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { addStoreItem, addWishlistItem, openCart } = useCart();

  const parsedPrice = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
  const itemNumber = product.id.match(/\d+$/)?.[0] || Math.floor(Math.random() * 10000000).toString();

  const handleAddToCart = () => {
    if (sizeGuideType && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 3000);
      return;
    }
    addStoreItem({
      productId: product.id,
      productName: product.title,
      image: product.image,
      price: parsedPrice,
      quantity: qty,
      size: selectedSize || undefined,
    });
    openCart("cart");
  };

  const handleAddToWishlist = () => {
    if (sizeGuideType && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 3000);
      return;
    }
    addWishlistItem({
      productId: product.id,
      productName: product.title,
      image: product.image,
      price: parsedPrice,
      quantity: qty,
      size: selectedSize || undefined,
    });
    openCart("wishlist"); // Open drawer to show wishlist
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % relatedProducts.length);
  };

  const visibleRelated = [
    relatedProducts[carouselIndex],
    relatedProducts[(carouselIndex + 1) % relatedProducts.length],
    relatedProducts[(carouselIndex + 2) % relatedProducts.length],
    relatedProducts[(carouselIndex + 3) % relatedProducts.length],
  ].filter(Boolean);

  let sizeGuideType: "socks" | "apparel" | null = null;
  const titleLower = product.title.toLowerCase();
  if (titleLower.includes("sock")) sizeGuideType = "socks";
  else if (product.category.toLowerCase().includes("apparel") || titleLower.match(/(shirt|tee|hoodie|sweatshirt|pullover|jacket)/)) sizeGuideType = "apparel";

  const sizeOptions = sizeGuideType === "apparel" ? ["S", "M", "L", "XL", "XXL"] :
                      sizeGuideType === "socks" ? ["S/M", "L/XL"] : [];

  const hashStr = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
    return Math.abs(hash);
  };
  const seed = hashStr(product.id);

  const reviewTitles = ["Absolutely stunning", "Very pleased", "Awesome purchase", "Highly recommend", "Great quality", "Not bad", "Beautiful", "Perfect gift", "Exactly as pictured", "Will buy again"];
  const reviewTexts = [
    "Beautiful piece. The craftsmanship is fantastic and it looks exactly like the picture. Highly recommend to anyone considering purchasing.",
    "Great quality and fast shipping. I bought this as a gift and they loved it. Will definitely shop here again.",
    "Really excellent, I'm very happy with it.",
    "A wonderful addition to my collection.",
    "Exactly what I was looking for. The quality is exceptional.",
    "Very nice item, arrived quickly and in perfect condition.",
    "I couldn't be happier with this purchase. It's simply gorgeous.",
    "Such a unique piece. It exceeded my expectations.",
    "Five stars! The details are incredible.",
    "Love this so much. It's beautifully made and looks great."
  ];
  const reviewNames = ["Sarah M.", "Michael R.", "Customer", "Jessica T.", "David L.", "Amanda K.", "Robert B.", "Emily C.", "John S.", "Olivia W."];

  const generateReview = (index: number) => {
     const s = seed + index;
     const rating = index === 0 ? Math.max(1, Math.round(product.rating)) : Math.max(3, 5 - (s % 3));
     return {
        title: reviewTitles[s % reviewTitles.length],
        text: reviewTexts[(s * 7) % reviewTexts.length],
        name: reviewNames[(s * 13) % reviewNames.length],
        months: (s % 11) + 1,
        rating
     };
  };

  return (
    <>
      <div className="mb-6">
        <Link href="/store" className="text-sm font-semibold text-black/60 hover:text-black hover:underline transition-colors">
          &larr; Back to Store
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24 mb-20">
        {/* Left Column: Image */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full flex justify-start mb-4">
            <span className="font-bold text-sm tracking-wide">{product.category}</span>
          </div>
          <div className="relative w-full aspect-square max-h-[600px] cursor-zoom-in" onClick={() => setZoomOpen(true)}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <button
            onClick={() => setZoomOpen(true)}
            className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm hover:text-black transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Zoom</span>
          </button>
        </div>

        {/* Right Column: Details */}
        <div className="w-full md:w-1/2 flex flex-col pt-8">
          <h1 className="text-3xl font-medium text-gray-800 mb-4">{product.title}</h1>
          <p className="text-sm font-semibold mb-3">Item # {itemNumber}</p>

          <div className="flex flex-col gap-1 mb-6 text-sm">
            <p>
              <span className="font-bold">Price:</span> {product.price}
            </p>
            <p>
              <span className="font-bold">Member Price:</span> {product.price}
            </p>
          </div>

          {sizeGuideType && (
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-sm">Size</span>
                <button 
                  onClick={() => setPolicyModal("size")}
                  className="text-xs font-bold underline text-gray-500 hover:text-black transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map(sz => (
                  <button
                    key={sz}
                    onClick={() => { setSelectedSize(sz); setSizeError(false); }}
                    className={`border px-4 py-2 text-sm font-semibold transition-colors ${selectedSize === sz ? "border-black bg-black text-white" : "border-gray-300 bg-white text-black hover:border-gray-500"}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              {sizeError && <p className="text-[#e22b2b] text-sm font-semibold mt-2">Please select a size first.</p>}
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <span className="font-bold text-sm">Qty.</span>
            <div className="flex items-center border border-gray-300">
              <button
                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <div className="px-4 py-1 border-x border-gray-300 text-sm">{qty}</div>
              <button
                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                onClick={() => setQty((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          <p className="text-xs font-semibold mb-6">Final sale, no returns.</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 px-4 text-sm font-bold hover:bg-black/80 transition-colors uppercase tracking-widest text-center"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex-1 border border-black py-3 px-4 text-sm font-bold hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-center"
            >
              Add to Wishlist
            </button>
          </div>

          {/* Accordions */}
          <div className="border-t border-gray-300">
            <details className="group border-b border-gray-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none py-4 text-sm uppercase tracking-wider">
                <span>Details</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="text-sm text-gray-700 pb-4 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </div>
            </details>

            <details className="group border-b border-gray-300" open>
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none py-4 text-sm uppercase tracking-wider">
                <span>Shipping & Returns</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="text-xs text-gray-800 pb-4 flex flex-col gap-3 leading-relaxed">
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <span>Standard flat-rate shipping (3–8 days)</span>
                  <span>$12.95</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <span>Expedited US shipping (2 days)</span>
                  <span>$13.95 extra</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <span>Overnight shipping</span>
                  <span>$22.95 extra</span>
                </div>
                <p>
                  The above rates apply to orders shipped within the contiguous 48 US states. For rates to Alaska,
                  Hawaii, Canada, and other countries, please see our{" "}
                  <button onClick={() => setPolicyModal("shipping")} className="underline">
                    Shipping & Handling page
                  </button>
                  .
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="mb-20 pt-10">
        <h2 className="text-center text-4xl font-semibold mb-10">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          {visibleRelated.map((item, idx) => (
            <Link
              href={`/store/${item.id}`}
              key={`${item.id}-${idx}`}
              className="group flex flex-col border border-gray-200 p-4 hover:border-gray-400 transition-colors bg-white"
            >
              <span className="text-[0.6rem] font-bold uppercase mb-2 line-clamp-1">{item.category}</span>
              <div className="relative w-full aspect-square mb-4">
                <Image src={item.image} alt={item.title} fill className="object-contain" sizes="25vw" />
              </div>
              <h3 className="text-sm font-semibold text-center mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-center mt-auto">{item.price}</p>
            </Link>
          ))}
          {relatedProducts.length > 4 && (
            <button
              onClick={nextCarousel}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 shadow-sm hidden md:flex z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="flex flex-col items-center justify-center text-center mb-20 pt-10">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews > 0 ? (
          <div className="w-full max-w-2xl text-left border-t border-gray-200 mt-4 pt-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-lg">{product.rating.toFixed(1)}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? "text-yellow-500" : "text-gray-300"} fill-current`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>
            
            {/* Top 2 Reviews */}
            {Array.from({ length: Math.min(product.reviews, 2) }).map((_, i) => {
              const review = generateReview(i);
              return (
                <div key={i} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className={`w-3 h-3 ${j < review.rating ? "text-yellow-500" : "text-gray-300"} fill-current`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="font-bold text-sm">{review.title}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.text}</p>
                  <p className="text-xs text-gray-400">{review.name} - {review.months} months ago</p>
                </div>
              );
            })}
            
            {product.reviews > 2 && (
              <button 
                onClick={() => setPolicyModal("reviews")}
                className="text-sm font-bold underline mt-4 hover:text-gray-600"
              >
                See all {product.reviews} reviews
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="font-medium text-sm mb-2">We're looking for stars!</p>
            <p className="text-gray-500 text-sm mb-6">Let us know what you think</p>
            <button className="border border-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Be the first to write a review!
            </button>
          </>
        )}
      </div>

      {/* Support Banner */}
      <div className="bg-[#f0f0f0] flex flex-col text-center">
        <div className="py-8 px-4">
          <p className="text-xl sm:text-2xl text-gray-800">
            Your purchase supports The Met's collection, study, conservation, and presentation of 5,000 years of art.
          </p>
        </div>
        <div className="bg-[#d1003f] py-6 px-4 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h3 className="text-white text-2xl font-bold">Sign up for Met Store emails & save 10%</h3>
          <div className="flex flex-col w-full sm:w-auto flex-1 max-w-md">
            <form onSubmit={handleSubscribe} className="flex w-full bg-white relative">
              <input
                type="email"
                placeholder={subscribed ? "Subscribed!" : "Enter your email"}
                className="w-full px-4 py-3 text-sm outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
              />
              <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 text-black font-bold">
                {subscribed ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                )}
              </button>
            </form>
            <p className="text-[0.6rem] text-white text-right mt-2">
              By signing up you agree with our{" "}
              <button onClick={() => setPolicyModal("privacy")} className="underline">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {mounted && zoomOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-white flex flex-col"
        >
          <div className="flex justify-end p-6">
            <button onClick={() => setZoomOpen(false)} className="text-black hover:opacity-70 p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div className="flex-1 relative cursor-zoom-out" onClick={() => setZoomOpen(false)}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
              sizes="100vw"
            />
          </div>
        </div>,
        document.body
      )}

      {/* Policy & Size Modals */}
      {mounted && policyModal && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4" onClick={() => setPolicyModal(null)}>
          <div className="bg-white p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-display">
                {policyModal === "privacy" ? "Privacy Policy" : 
                 policyModal === "size" ? "Size Guide" : 
                 policyModal === "reviews" ? "Customer Reviews" : "Shipping & Handling"}
              </h2>
              <button onClick={() => setPolicyModal(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="text-sm text-gray-700 space-y-4">
              {policyModal === "privacy" ? (
                <>
                  <p>The Metropolitan Museum of Art is committed to protecting your privacy.</p>
                  <p>We use your personal information only to process your orders and to communicate with you about our exhibitions, programs, and services.</p>
                  <p>We do not sell, trade, or rent your personal information to others.</p>
                </>
              ) : policyModal === "size" && sizeGuideType === "apparel" ? (
                <>
                  <p className="font-bold mb-2">Unisex (Cotton/Polyester)</p>
                  <p className="text-xs mb-4">Note: All measurements are approximate. Items may not be offered in all of the sizes listed.</p>
                  <table className="w-full border-collapse text-center">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2 font-bold">Size</th>
                        <th className="border border-gray-300 p-2 font-bold">Chest</th>
                        <th className="border border-gray-300 p-2 font-bold">Waist</th>
                        <th className="border border-gray-300 p-2 font-bold">Sleeve Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-300 p-2 font-bold">S</td><td className="border border-gray-300 p-2">32" - 34"</td><td className="border border-gray-300 p-2">28" - 30"</td><td className="border border-gray-300 p-2">37"</td></tr>
                      <tr><td className="border border-gray-300 p-2 font-bold">M</td><td className="border border-gray-300 p-2">36" - 38"</td><td className="border border-gray-300 p-2">32" - 34"</td><td className="border border-gray-300 p-2">37 3/4"</td></tr>
                      <tr><td className="border border-gray-300 p-2 font-bold">L</td><td className="border border-gray-300 p-2">40" - 42"</td><td className="border border-gray-300 p-2">36" - 38"</td><td className="border border-gray-300 p-2">38 1/2"</td></tr>
                      <tr><td className="border border-gray-300 p-2 font-bold">XL</td><td className="border border-gray-300 p-2">44" - 46"</td><td className="border border-gray-300 p-2">40" - 42"</td><td className="border border-gray-300 p-2">39 1/4"</td></tr>
                      <tr><td className="border border-gray-300 p-2 font-bold">XXL</td><td className="border border-gray-300 p-2">44" - 46"</td><td className="border border-gray-300 p-2">44" - 46"</td><td className="border border-gray-300 p-2">40"</td></tr>
                    </tbody>
                  </table>
                </>
              ) : policyModal === "size" && sizeGuideType === "socks" ? (
                <>
                  <p className="font-bold mb-2">Unisex Socks Sizing</p>
                  <table className="w-full border-collapse text-center">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2 font-bold">Sock Size</th>
                        <th className="border border-gray-300 p-2 font-bold">Men's Shoe Size</th>
                        <th className="border border-gray-300 p-2 font-bold">Women's Shoe Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-300 p-2 font-bold">S/M</td><td className="border border-gray-300 p-2">5 - 8</td><td className="border border-gray-300 p-2">6 - 9</td></tr>
                      <tr><td className="border border-gray-300 p-2 font-bold">L/XL</td><td className="border border-gray-300 p-2">9 - 13</td><td className="border border-gray-300 p-2">10 - 14</td></tr>
                    </tbody>
                  </table>
                </>
              ) : policyModal === "reviews" ? (
                <div className="space-y-6">
                  {Array.from({ length: Math.min(product.reviews, 25) }).map((_, i) => {
                    const review = generateReview(i);
                    return (
                      <div key={i} className="border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <svg key={j} className={`w-3 h-3 ${j < review.rating ? "text-yellow-500" : "text-gray-300"} fill-current`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="font-bold text-sm">{review.title}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{review.text}</p>
                        <p className="text-xs text-gray-400">{review.name} - {review.months} months ago</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <p className="font-bold">Shipping Information</p>
                  <p>Standard flat-rate shipping (3–8 days) is $12.95.</p>
                  <p>Expedited US shipping (2 days) is an additional $13.95.</p>
                  <p>Overnight shipping is an additional $22.95.</p>
                  <p className="mt-4 text-xs italic">Shipping to Alaska and Hawaii is an additional $10.00 base charge. International shipping is calculated dynamically at checkout based on destination and weight.</p>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

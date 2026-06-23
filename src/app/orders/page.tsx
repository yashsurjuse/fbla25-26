"use client";

import Link from "next/link";
import { useCart, CartItem } from "@/components/CartContext";

function getDeliveryStatus(orderDate: string) {
  const elapsed = Date.now() - new Date(orderDate).getTime();
  const hours = elapsed / (1000 * 60 * 60);

  if (hours < 48) {
    return { label: "Processing", color: "text-amber-700 bg-amber-50 border-amber-200" };
  } else if (hours < 48 + 72) {
    return { label: "Out for Delivery", color: "text-blue-700 bg-blue-50 border-blue-200" };
  } else {
    return { label: "Delivered", color: "text-green-700 bg-green-50 border-green-200" };
  }
}

export default function OrdersPage() {
  const { pastOrders } = useCart();

  const renderItemDetails = (item: CartItem, orderDate: string) => {
    switch (item.type) {
      case "store": {
        const status = getDeliveryStatus(orderDate);
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <div className="flex gap-4">
              {item.image && (
                <img src={item.image} alt={item.productName} className="h-20 w-20 object-cover border border-black/10" />
              )}
              <div>
                <p className="font-semibold text-black">{item.productName}</p>
                <p className="text-sm text-black/75">
                  {item.quantity}x {item.size ? `| Size: ${item.size}` : ""}
                </p>
                <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="self-start sm:self-center">
              <span className={`text-xs font-bold px-2 py-1 h-fit border ${status.color}`}>{status.label}</span>
            </div>
          </div>
        );
      }
      case "membership":
        return (
          <div className="flex gap-4">
            <div className="flex h-20 w-20 items-center justify-center bg-black text-white font-display text-xs text-center p-2">
              Membership
            </div>
            <div>
              <p className="font-semibold text-black">{item.tierName}</p>
              <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>
            </div>
          </div>
        );
      case "visit":
        return (
          <div className="flex gap-4">
            <div className="flex h-20 w-20 items-center justify-center bg-[#e4002b] text-white font-display text-xs text-center p-2">
              Tickets
            </div>
            <div>
              <p className="font-semibold text-black">Visit on {item.visitDate}</p>
              <ul className="text-sm text-black/75">
                {Object.entries(item.quantities).map(([type, qty]) => {
                  if (qty > 0) {
                    return <li key={type}>{qty}x {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</li>;
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-3 border-b border-black/10 pb-4">
          <h1 className="font-display text-5xl font-semibold text-black sm:text-6xl">Past Orders</h1>
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.08em] text-black/70 hover:text-black transition-colors">
            Return Home
          </Link>
        </div>

        {pastOrders.length === 0 ? (
          <div className="border border-black/15 bg-white p-8 text-center">
            <h2 className="font-display text-3xl font-semibold text-black mb-4">You have no past orders</h2>
            <p className="text-black/75 mb-6">Looks like you haven&apos;t made any purchases yet.</p>
            <Link href="/store" className="inline-flex border border-black bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] !text-white hover:bg-black/80 transition-colors">
              Shop The Met
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {pastOrders.map((order) => {
              const formattedDate = new Date(order.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div key={order.id} className="border border-black/15 bg-white overflow-hidden shadow-sm">
                  {/* Header */}
                  <div className="bg-[#f9f9f9] border-b border-black/10 p-5 sm:flex sm:items-center sm:justify-between">
                    <div className="flex gap-8 mb-4 sm:mb-0">
                      <div>
                        <p className="text-xs uppercase tracking-[0.08em] font-semibold text-black/55 mb-1">Order Placed</p>
                        <p className="text-sm font-medium text-black">{formattedDate}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.08em] font-semibold text-black/55 mb-1">Order ID</p>
                        <p className="text-sm font-medium text-black">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.08em] font-semibold text-black/55 mb-1">Total</p>
                        <p className="text-sm font-medium text-black">${order.total?.toFixed(2) ?? "0.00"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-5 divide-y divide-black/10">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-5 first:pt-0 last:pb-0">
                        {renderItemDetails(item, order.date)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

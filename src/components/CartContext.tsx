"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getTicketCount, getTicketSubtotal, type TicketQuantities } from "@/lib/tickets";

export type CartVisitItem = {
  type: "visit";
  visitDate: string;
  quantities: TicketQuantities;
  createdAt: string;
};

export type CartMembershipItem = {
  type: "membership";
  tierId: string;
  tierName: string;
  price: number;
  createdAt: string;
};

export type CartStoreItem = {
  type: "store";
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  createdAt: string;
};

export type CartItem = CartVisitItem | CartMembershipItem | CartStoreItem;

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addVisitItem: (item: Omit<CartVisitItem, "type" | "createdAt">) => void;
  addMembershipItem: (item: Omit<CartMembershipItem, "type" | "createdAt">) => void;
  addStoreItem: (item: Omit<CartStoreItem, "type" | "createdAt" | "quantity"> & { quantity?: number }) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  cartCount: number;
};

const STORAGE_KEY = "met-cart-v1";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addVisitItem: CartContextValue["addVisitItem"] = (item) => {
    setItems((prev) => [
      {
        type: "visit",
        createdAt: new Date().toISOString(),
        visitDate: item.visitDate,
        quantities: item.quantities,
      },
      ...prev,
    ]);
  };

  const addMembershipItem: CartContextValue["addMembershipItem"] = (item) => {
    setItems((prev) => [
      {
        type: "membership",
        createdAt: new Date().toISOString(),
        tierId: item.tierId,
        tierName: item.tierName,
        price: item.price,
      },
      ...prev,
    ]);
  };

  const addStoreItem: CartContextValue["addStoreItem"] = (item) => {
    setItems((prev) => {
      const quantityToAdd = item.quantity ?? 1;
      const existingIndex = prev.findIndex(
        (entry) => entry.type === "store" && entry.productId === item.productId,
      );

      if (existingIndex === -1) {
        return [
          {
            type: "store",
            createdAt: new Date().toISOString(),
            productId: item.productId,
            productName: item.productName,
            image: item.image,
            price: item.price,
            quantity: quantityToAdd,
          },
          ...prev,
        ];
      }

      return prev.map((entry, index) => {
        if (index !== existingIndex || entry.type !== "store") {
          return entry;
        }
        return {
          ...entry,
          quantity: entry.quantity + quantityToAdd,
        };
      });
    });
  };

  const value = useMemo<CartContextValue>(() => {
    const cartCount = items.reduce((count, item) => {
      if (item.type === "visit") {
        return count + getTicketCount(item.quantities);
      }
      if (item.type === "store") {
        return count + item.quantity;
      }
      return count + 1;
    }, 0);

    return {
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addVisitItem,
      addMembershipItem,
      addStoreItem,
      removeItem: (index) => setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index)),
      clearCart: () => setItems([]),
      cartCount,
    };
  }, [isOpen, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export function getCartItemTotal(item: CartItem): number {
  if (item.type === "membership") {
    return item.price;
  }
  if (item.type === "store") {
    return item.price * item.quantity;
  }
  return getTicketSubtotal(item.quantities);
}

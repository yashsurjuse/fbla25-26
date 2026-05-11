export type TicketType = {
  id: string;
  label: string;
  price: number;
  description: string;
  defaultQuantity: number;
};

export const ticketTypes: TicketType[] = [
  { id: "adult", label: "Adult", price: 30, description: "Ages 18+", defaultQuantity: 1 },
  { id: "senior", label: "Senior", price: 22, description: "Ages 65+", defaultQuantity: 0 },
  { id: "student", label: "Student", price: 17, description: "Valid student ID", defaultQuantity: 0 },
  { id: "child", label: "Child", price: 0, description: "Ages 12 and under", defaultQuantity: 0 },
];

export type TicketQuantities = Record<string, number>;

export function createDefaultTicketQuantities(): TicketQuantities {
  return ticketTypes.reduce<TicketQuantities>((acc, type) => {
    acc[type.id] = type.defaultQuantity;
    return acc;
  }, {});
}

export function getTicketSubtotal(quantities: TicketQuantities): number {
  return ticketTypes.reduce((total, type) => total + (quantities[type.id] ?? 0) * type.price, 0);
}

export function getTicketCount(quantities: TicketQuantities): number {
  return ticketTypes.reduce((count, type) => count + (quantities[type.id] ?? 0), 0);
}

export function getPaidTicketCount(quantities: TicketQuantities): number {
  return ticketTypes
    .filter((type) => type.id !== "child")
    .reduce((count, type) => count + (quantities[type.id] ?? 0), 0);
}

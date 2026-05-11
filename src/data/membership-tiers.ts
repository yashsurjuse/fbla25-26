export type MembershipTier = {
  id: string;
  name: string;
  price: number;
  benefits: string[];
};

export const membershipTiers: MembershipTier[] = [
  {
    id: "individual",
    name: "Individual",
    price: 110,
    benefits: ["Free admission for one", "Priority exhibition access", "Member preview invitations"],
  },
  {
    id: "dual",
    name: "Dual",
    price: 200,
    benefits: ["Free admission for two adults", "Reduced guest tickets", "Discounts at The Met Store"],
  },
  {
    id: "family",
    name: "Family",
    price: 250,
    benefits: ["Admission for two adults and children", "Family programs and events", "Exclusive member newsletters"],
  },
  {
    id: "patron",
    name: "Patron",
    price: 600,
    benefits: ["All Family benefits", "Enhanced donor events", "Priority reservations and concierge support"],
  },
];

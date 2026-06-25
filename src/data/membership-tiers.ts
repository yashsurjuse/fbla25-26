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
    price: 120,
    benefits: [
      "1 Member Card + 1 Guest",
      "Free Admission for one Member cardholder and one guest, plus children 17 and under",
      "Member Preview Days & Express entry with Member Entrance",
      "Weekend Member Mornings & Members-only ticketed events",
      "Priority access in exhibition virtual queues",
      "15% off at The Met Store (30% off seasonally), plus 10% discount on parking and dining",
      "Virtual Premieres, Monthly E-newsletter, and digital Bulletin"
    ],
  },
  {
    id: "dual",
    name: "Dual",
    price: 220,
    benefits: [
      "2 Member Cards + 2 Guests",
      "All Individual benefits, plus:",
      "Free Admission for two Member cardholders and two guests, plus children 17 and under",
      "The Met After Hours",
      "Access to the Balcony Lounge",
      "Print subscription to the Bulletin"
    ],
  },
  {
    id: "family",
    name: "Family",
    price: 230,
    benefits: [
      "2 Member Cards + 2 Guests",
      "All Dual benefits, plus:",
      "81st Street Studio Member Mornings",
      "Children's Classes and Camps early registration and discounts",
      "Two Kid's Passports, stamped on each visit",
      "Family Member Activity Guide"
    ],
  },
  {
    id: "enthusiast",
    name: "Enthusiast",
    price: 600,
    benefits: [
      "2 Member cards + 4 guests",
      "All Dual benefits, plus:",
      "Free Admission for two Member cardholders and four guests, plus children 17 and under",
      "Member Evening Receptions & Evening with the Director",
      "Reciprocal Benefits at 16 museums nationwide",
      "81st Street Studio Member Mornings & Children's Classes early registration"
    ],
  },
  {
    id: "ambassador",
    name: "Ambassador",
    price: 1500,
    benefits: [
      "2 Member cards + 4 guests",
      "All Enthusiast benefits, plus:",
      "Annual Curatorial Preview and Reception"
    ],
  },
  {
    id: "global",
    name: "Global",
    price: 90,
    benefits: [
      "1 Member Card + 1 Guest",
      "For Members outside of a 200 mile radius of the Museum.",
      "All the benefits of the Individual level."
    ],
  }
];

export type NavItem = {
  label: string;
  href?: string;
  isDummy?: boolean;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/exhibitions", label: "Exhibitions" },
  { href: "/artists", label: "Artists" },
  { href: "/artifacts", label: "Artifacts" },
  { href: "/store", label: "Shop" },
];

export const museumInfo = {
  name: "The Met Fifth Avenue",
  shortName: "The Metropolitan Museum of Art",
  addressLines: ["1000 Fifth Avenue", "New York, NY 10028"],
  phone: "212-535-7710",
  email: "info@metmuseum.org",
  hours: [
    { label: "Sunday - Thursday", value: "10:00 AM - 5:00 PM" },
    { label: "Friday - Saturday", value: "10:00 AM - 9:00 PM" },
    { label: "Holiday Closure", value: "Thanksgiving Day and December 25" },
  ],
  ticketPrices: [
    { label: "Adult", value: "$30" },
    { label: "Senior", value: "$22" },
    { label: "Student", value: "$17" },
    { label: "Child (12 and under)", value: "Free" },
    { label: "Members and Patrons", value: "Free" },
  ],
};

export const homeIntro = {
  heroTitle: "The Metropolitan Museum of New York City",
  heroSummary:
    "Experience paintings from around the world, from the dawn of human history to the present.",
  primaryCta: "Plan your visit",
  collectionTitle: "The Met Collection",
  collectionSummary:
    "Explore works from around the world and throughout history and the research and conversations they inspire.",
};

export const metStats = [
  {
    label: "over",
    value: "5,000",
    detail: "Years of art from around the world for everyone to experience and enjoy.",
  },
  {
    label: "since",
    value: "187",
    detail: "The Met has aspired to be more than a treasury of rare and beautiful objects.",
  },
  {
    label: "collection",
    value: "2.2M+",
    detail: "Objects across 19 curatorial departments.",
  },
];

export const footerLinks = [
  { href: "/visit", label: "Visit" },
  { href: "/exhibitions", label: "Exhibitions and Events" },
  { href: "/artists", label: "Art" },
  { href: "/artifacts", label: "Collection" },
  { href: "/visit", label: "Tickets" },
  { href: "", label: "Image Credits" },
];

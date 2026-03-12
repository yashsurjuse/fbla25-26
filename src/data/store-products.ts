import type { ImageSource } from "@/data/image-sources";

export type StoreProduct = {
  id: string;
  name: string;
  category: "Jewelry" | "Scarves" | "Books" | "Home Decor" | "Kids" | "Stationery";
  price: number;
  image: string;
  badge?: "Best Seller";
  description: string;
  pageUrl: string;
};

export type StoreImageSource = ImageSource & {
  pageUrl: string;
};

export const storeCategories = ["All", "Jewelry", "Scarves", "Books", "Home Decor", "Kids", "Stationery"] as const;

export const storeProducts: StoreProduct[] = [
  {
    id: "pansy-pearl-stud-earrings",
    name: "Pansy Pearl Stud Earrings",
    category: "Jewelry",
    price: 60,
    image:
      "https://store.metmuseum.org/media/catalog/product/8/0-209232-99398/pansy-pearl-stud-earrings.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    badge: "Best Seller",
    description: "Art-inspired earrings make great gifts.",
    pageUrl: "https://store.metmuseum.org/pansy-pearl-stud-earrings-80061261",
  },
  {
    id: "swiss-butterfly-brooch",
    name: "Swiss Butterfly Brooch",
    category: "Jewelry",
    price: 100,
    image:
      "https://store.metmuseum.org/media/catalog/product/8/0-192898-84238/swiss-butterfly-brooch.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    badge: "Best Seller",
    description: "An artful brooch, only from The Met.",
    pageUrl: "https://store.metmuseum.org/swiss-butterfly-brooch-80057176",
  },
  {
    id: "asian-flora-and-fauna-oversize-cotton-scarf",
    name: "Asian Flora and Fauna Oversize Cotton Scarf",
    category: "Scarves",
    price: 95,
    image:
      "https://store.metmuseum.org/media/catalog/product/8/0-209106-99557/asian-flora-and-fauna-oversize-cotton-scarf.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    badge: "Best Seller",
    description: "An art scarf makes a unique gift for her.",
    pageUrl: "https://store.metmuseum.org/asian-flora-and-fauna-oversize-cotton-scarf-80061228",
  },
  {
    id: "seeing-silence-the-paintings-of-helene-schjerfbeck",
    name: "Seeing Silence: The Paintings of Helene Schjerfbeck",
    category: "Books",
    price: 45,
    image:
      "https://store.metmuseum.org/media/catalog/product/8/0-207738-98625/seeing-silence-the-paintings-of-helene-schjerfbeck.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    badge: "Best Seller",
    description: "Pick up an art book from The Met's museum store.",
    pageUrl: "https://store.metmuseum.org/seeing-silence-the-paintings-of-helene-schjerfbeck-80060786",
  },
  {
    id: "divine-egypt",
    name: "Divine Egypt",
    category: "Books",
    price: 65,
    image:
      "https://store.metmuseum.org/media/catalog/product/8/0-207732-98091/divine-egypt.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    description: "Met Museum publications make great gifts for art lovers.",
    pageUrl: "https://store.metmuseum.org/divine-egypt-80060784",
  },
  {
    id: "masterpiece-paintings",
    name: "The Metropolitan Museum of Art: Masterpiece Paintings",
    category: "Books",
    price: 85,
    image:
      "https://store.metmuseum.org/media/catalog/product/8/0-9145-16411/the-metropolitan-museum-of-art-masterpiece-paintings.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    description: "A monumental survey of 500 paintings from The Met collection.",
    pageUrl: "https://store.metmuseum.org/the-metropolitan-museum-of-art-masterpiece-paintings-80033268",
  },
  {
    id: "egyptian-cat-sculpture",
    name: "Egyptian Cat Sculpture",
    category: "Home Decor",
    price: 350,
    image:
      "https://store.metmuseum.org/media/catalog/product/0/6-9943-52371/egyptian-cat-sculpture.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    description: "A reproduction based on an Egyptian sculpture in the Museum's collection.",
    pageUrl: "https://store.metmuseum.org/egyptian-cat-sculpture-06008395",
  },
  {
    id: "met-favorites-rubiks-cube",
    name: "Met Favorites Rubik's Cube",
    category: "Kids",
    price: 16.95,
    image:
      "https://store.metmuseum.org/media/catalog/product/8/0-198907-90826/met-favorites-rubik-039-s-cube.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    description: "A classic puzzle cube reimagined with six Museum treasures.",
    pageUrl: "https://store.metmuseum.org/met-favorites-rubik-s-cube-80059082",
  },
  {
    id: "william-hippo-plush",
    name: "William Hippo Plush",
    category: "Kids",
    price: 29.95,
    image:
      "https://store.metmuseum.org/media/catalog/product/8/0-186406-77255/william-hippo-plush.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    description: "A plush version of the beloved blue Egyptian hippo, William.",
    pageUrl: "https://store.metmuseum.org/william-hippo-plush-80055298",
  },
  {
    id: "met-museum-nesting-dolls",
    name: "Met Museum Nesting Dolls",
    category: "Kids",
    price: 32,
    image:
      "https://store.metmuseum.org/media/catalog/product/8/0-195445-87507/met-museum-nesting-dolls-.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    description: "A set of five nesting dolls inspired by objects across the collection.",
    pageUrl: "https://store.metmuseum.org/met-museum-nesting-dolls-80057964",
  },
  {
    id: "louis-c-tiffany-garden-landscape-notecards",
    name: "Louis C. Tiffany Garden Landscape Notecards",
    category: "Stationery",
    price: 18,
    image:
      "https://store.metmuseum.org/media/catalog/product/8/0-205819-94572/louis-c-tiffany-garden-landscape-notecards.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=502&width=502&canvas=502:502&dpr=1%201x",
    description: "Send an artful greeting with Metropolitan Museum of Art cards.",
    pageUrl: "https://store.metmuseum.org/louis-c-tiffany-garden-landscape-notecards-80060324",
  },
];

export const storeImageSources: StoreImageSource[] = storeProducts.map((product) => ({
  id: product.id,
  title: product.name,
  url: product.image,
  credit: "The Met Store",
  pageUrl: product.pageUrl,
}));
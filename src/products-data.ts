import { asset } from "./utils/asset";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "tees" | "outerwear" | "bottoms" | "accessories";
  blurb: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "riot-tee",
    name: "Riot Tee",
    price: 45,
    image: asset("/images/1.webp"),
    category: "tees",
    blurb: "no description, just energy",
    isNew: true,
  },
  {
    id: "static-hoodie",
    name: "Static Hoodie",
    price: 110,
    image: asset("/images/2.webp"),
    category: "outerwear",
    blurb: "heavyweight, runs big, don't ask why",
  },
  {
    id: "thorn-cargo",
    name: "Thorn Cargo Pants",
    price: 98,
    image: asset("/images/3.webp"),
    category: "bottoms",
    blurb: "pockets for things you'll never carry",
  },
  {
    id: "untitled-cap",
    name: "Untitled Cap",
    price: 38,
    image: asset("/images/4.webp"),
    category: "accessories",
    blurb: "one size, zero meaning",
  },
  {
    id: "wraith-jacket",
    name: "Wraith Jacket",
    price: 165,
    image: asset("/images/5.webp"),
    category: "outerwear",
    blurb: "for weather that doesn't exist yet",
    isNew: true,
  },
  {
    id: "no-sleep-tee",
    name: "No Sleep Tee",
    price: 45,
    image: asset("/images/6.webp"),
    category: "tees",
    blurb: "washed twice, faded on purpose",
  },
  {
    id: "static-denim",
    name: "Static Denim",
    price: 120,
    image: asset("/images/7.webp"),
    category: "bottoms",
    blurb: "stiff now, yours in a month",
  },
  {
    id: "chainlink-belt",
    name: "Chainlink Belt",
    price: 32,
    image: asset("/images/8.webp"),
    category: "accessories",
    blurb: "holds nothing up, looks great doing it",
  },
  {
    id: "undefined-vest",
    name: "Undefined Vest",
    price: 88,
    image: asset("/images/9.webp"),
    category: "outerwear",
    blurb: "layer it, lose it, layer it again",
  },
  {
    id: "blackout-longsleeve",
    name: "Blackout Longsleeve",
    price: 58,
    image: asset("/images/10.webp"),
    category: "tees",
    blurb: "no description, just energy",
    isNew: true,
  },
];

export const sizes = ["XS", "S", "M", "L", "XL"];

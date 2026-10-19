import { asset } from "./utils/asset";

export interface ProductColorVariant {
  id: string;
  label: string;
  swatch: string;
  backImage: string;
  frontImage: string;
}

export interface Product {
  id: string;
  handle: string;
  shopifyProductId: string;
  skuPrefix: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  fitImage: string;
  bunkerImage: string;
  detailImage: string;
  category: "dual" | "mono";
  colors: ProductColorVariant[];
  blurb: string;
  story: string;
  fitNote: string;
  specs: string[];
  isNew?: boolean;
}

const COMMON_SPECS = [
  "340GSM 100% heavyweight combed ring-spun cotton",
  'Boxy drop-shoulder oversized silhouette with thick 1.2" ribbed collar',
  "Enzyme-washed & pre-shrunk for zero torque and lived-in drape",
  "High-density plastisol & discharge back print + front chest sigil",
  "Ships in custom-stamped UNTITLED heavyweight kraft packaging",
];

export const products: Product[] = [
  // ---- 5 Black & White Shirts (Available in both Black and Off-White) ----
  {
    id: "signal-ribcage-tee",
    handle: "signal-ribcage-tee",
    shopifyProductId: "gid://shopify/Product/9010000001",
    skuPrefix: "UNT-003-SIG",
    name: "Signal Ribcage Tee",
    subtitle: "Everyday Static · Dual-Color Edition 01/05",
    price: 55,
    image: asset("/images/products/p3-black-back.webp"),
    fitImage: asset("/images/products/p3-duo.webp"),
    bunkerImage: asset("/images/products/p3-bunker.webp"),
    detailImage: asset("/images/products/p3-detail.webp"),
    category: "dual",
    colors: [
      {
        id: "black",
        label: "Black",
        swatch: "#141414",
        backImage: asset("/images/products/p3-black-back.webp"),
        frontImage: asset("/images/products/p3-black-front.webp"),
      },
      {
        id: "white",
        label: "Off-White",
        swatch: "#e8e3d8",
        backImage: asset("/images/products/p3-white-back.webp"),
        frontImage: asset("/images/products/p3-white-front.webp"),
      },
    ],
    blurb: "vertical spine strokes on back, center pillar hit on chest",
    story:
      "Raw horizontal brushstrokes stacked down the vertebrae like an X-ray signal — rendered in electric cyan and bone-white on the Black edition, and crimson-black ink on the Off-White edition. Centered vertical pillar emblem on the chest.",
    fitNote:
      "Wide sleeves hitting at the elbow. Female model (172cm) wears L for a tunic-length drape; male model (185cm) wears L.",
    specs: COMMON_SPECS,
  },
  {
    id: "caged-rose-tee",
    handle: "caged-rose-tee",
    shopifyProductId: "gid://shopify/Product/9010000002",
    skuPrefix: "UNT-003-CGD",
    name: "Caged Triple Rose Tee",
    subtitle: "Everyday Static · Dual-Color Edition 02/05",
    price: 58,
    image: asset("/images/products/p4-black-back.webp"),
    fitImage: asset("/images/products/p4-duo.webp"),
    bunkerImage: asset("/images/products/p4-bunker.webp"),
    detailImage: asset("/images/products/p4-detail.webp"),
    category: "dual",
    colors: [
      {
        id: "black",
        label: "Black",
        swatch: "#141414",
        backImage: asset("/images/products/p4-black-back.webp"),
        frontImage: asset("/images/products/p4-black-front.webp"),
      },
      {
        id: "white",
        label: "Off-White",
        swatch: "#e8e3d8",
        backImage: asset("/images/products/p4-white-back.webp"),
        frontImage: asset("/images/products/p4-white-front.webp"),
      },
    ],
    blurb: "three roses locked in a thorny frame, heavy 340gsm cut",
    story:
      "Three crimson roses suspended inside a spiked architectural border, topped by jagged UNTITLED black-metal type and anchored by a barbed sigil at the lower frame. Paired with a rose emblem at the center chest.",
    fitNote:
      "Heavy 340gsm structure holds its boxy frame off the body without clinging.",
    specs: COMMON_SPECS,
  },
  {
    id: "framed-rose-tee",
    handle: "framed-rose-tee",
    shopifyProductId: "gid://shopify/Product/9010000003",
    skuPrefix: "UNT-003-FRM",
    name: "Framed Rose Tee",
    subtitle: "Everyday Static · Dual-Color Edition 03/05",
    price: 55,
    image: asset("/images/products/p1-black-back.webp"),
    fitImage: asset("/images/products/p1-duo.webp"),
    bunkerImage: asset("/images/products/p1-bunker.webp"),
    detailImage: asset("/images/products/p1-detail.webp"),
    category: "dual",
    colors: [
      {
        id: "black",
        label: "Black",
        swatch: "#141414",
        backImage: asset("/images/products/p1-black-back.webp"),
        frontImage: asset("/images/products/p1-black-front.webp"),
      },
      {
        id: "white",
        label: "Off-White",
        swatch: "#e8e3d8",
        backImage: asset("/images/products/p1-white-back.webp"),
        frontImage: asset("/images/products/p1-white-front.webp"),
      },
    ],
    blurb: "pink box rose on back, small red sigil on chest",
    story:
      "Distorted black-metal UNTITLED lettering crowns a vertical blush-crimson frame housing three blooming roses and a single root line dropping toward the hem. Finished with a compact crimson chest mark on the front.",
    fitNote:
      "Oversized boxy cut. Female model (170cm) wears L in Black; also available in Off-White.",
    specs: COMMON_SPECS,
  },
  {
    id: "thorn-spine-tee",
    handle: "thorn-spine-tee",
    shopifyProductId: "gid://shopify/Product/9010000004",
    skuPrefix: "UNT-003-THN",
    name: "Thorn Spine Tee",
    subtitle: "Everyday Static · Dual-Color Edition 04/05",
    price: 58,
    image: asset("/images/products/p2-white-back.webp"),
    fitImage: asset("/images/products/p2-duo.webp"),
    bunkerImage: asset("/images/products/p2-bunker.webp"),
    detailImage: asset("/images/products/p2-detail.webp"),
    category: "dual",
    colors: [
      {
        id: "white",
        label: "Off-White",
        swatch: "#e8e3d8",
        backImage: asset("/images/products/p2-white-back.webp"),
        frontImage: asset("/images/products/p2-white-front.webp"),
      },
      {
        id: "black",
        label: "Black",
        swatch: "#141414",
        backImage: asset("/images/products/p2-black-back.webp"),
        frontImage: asset("/images/products/p2-black-front.webp"),
      },
    ],
    blurb: "twin roses at the shoulder, thorny spine down the back",
    story:
      "Symmetrical gothic scrollwork spans the upper back, anchored by twin crimson roses at the shoulder blades and a third rose at the plexus with a razor-sharp thorn stem running down the spine.",
    fitNote:
      "Relaxed drop-shoulder fit. Take your normal size for the intended oversized silhouette, or size down for a closer box fit.",
    specs: COMMON_SPECS,
  },
  {
    id: "eclipse-orbit-tee",
    handle: "eclipse-orbit-tee",
    shopifyProductId: "gid://shopify/Product/9010000005",
    skuPrefix: "UNT-003-ECL",
    name: "Eclipse Orbit Tee",
    subtitle: "Everyday Static · Dual-Color Edition 05/05",
    price: 58,
    image: asset("/images/products/p5-black-back.webp"),
    fitImage: asset("/images/products/p5-duo.webp"),
    bunkerImage: asset("/images/products/p5-bunker.webp"),
    detailImage: asset("/images/products/p5-detail.webp"),
    category: "dual",
    colors: [
      {
        id: "black",
        label: "Black",
        swatch: "#141414",
        backImage: asset("/images/products/p5-black-back.webp"),
        frontImage: asset("/images/products/p5-black-front.webp"),
      },
      {
        id: "white",
        label: "Off-White",
        swatch: "#e8e3d8",
        backImage: asset("/images/products/p5-white-back.webp"),
        frontImage: asset("/images/products/p5-white-front.webp"),
      },
    ],
    blurb: "ringed planet & wireframe geometry, runs oversized",
    story:
      "Fine-line orbital geometry and triangular vectors intersect a crimson ringed planet and blooming rose across the upper back. Minimal gothic chest script on the front.",
    fitNote:
      "Cut generous through the chest and shoulders. True streetwear proportions.",
    specs: COMMON_SPECS,
  },

  // ---- 5 One-Color Shirts (Black Base Only — Void Drop) ----
  {
    id: "horizon-orb-blue-tee",
    handle: "horizon-orb-blue-tee",
    shopifyProductId: "gid://shopify/Product/9010000006",
    skuPrefix: "UNT-003-ORB-BLU",
    name: "Horizon Orb Tee · Cyan",
    subtitle: "Void Drop 003 · Single-Color Edition 01/05",
    price: 62,
    image: asset("/images/products/p9-blue-back.webp"),
    fitImage: asset("/images/products/orb-4-shirts.webp"),
    bunkerImage: asset("/images/products/orb-bunker-hang.webp"),
    detailImage: asset("/images/products/p9-blue-detail.webp"),
    category: "mono",
    colors: [
      {
        id: "cyan",
        label: "Black / Cyan",
        swatch: "#38a9e0",
        backImage: asset("/images/products/p9-blue-back.webp"),
        frontImage: asset("/images/products/p9-blue-front.webp"),
      },
    ],
    blurb: "cyan horizon orb on washed black, metal chest mark",
    story:
      "Part of the 4-color Horizon Orb series on washed 340gsm black jersey. Electric cyan line-work maps a lunar orb, mountain peaks, and breaking waves inside a hatched circular compass.",
    fitNote:
      "Single-color Void Drop edition. Boxy oversized fit on washed black.",
    specs: COMMON_SPECS,
    isNew: true,
  },
  {
    id: "blue-rose-scrawl-tee",
    handle: "blue-rose-scrawl-tee",
    shopifyProductId: "gid://shopify/Product/9010000007",
    skuPrefix: "UNT-003-BLU",
    name: "Blue Rose Scrawl Tee",
    subtitle: "Void Drop 003 · Single-Color Edition 02/05",
    price: 62,
    image: asset("/images/products/p6-black-back.webp"),
    fitImage: asset("/images/products/p6-bunker.webp"),
    bunkerImage: asset("/images/products/p6-hang.webp"),
    detailImage: asset("/images/products/p6-detail.webp"),
    category: "mono",
    colors: [
      {
        id: "black",
        label: "Black / Cobalt",
        swatch: "#2f6fd6",
        backImage: asset("/images/products/p6-black-back.webp"),
        frontImage: asset("/images/products/p6-black-front.webp"),
      },
    ],
    blurb: "electric blue rose buried under raw white scrawl",
    story:
      "Produced exclusively in washed jet-black. An electric cobalt rose emerges from concentric wireframe rings, buried beneath frantic hand-scrawled white typography across the lower back.",
    fitNote:
      "Single-color Void Drop edition. Oversized 340gsm cut in washed black only.",
    specs: COMMON_SPECS,
    isNew: true,
  },
  {
    id: "horizon-orb-pink-tee",
    handle: "horizon-orb-pink-tee",
    shopifyProductId: "gid://shopify/Product/9010000009",
    skuPrefix: "UNT-003-ORB-PNK",
    name: "Horizon Orb Tee · Rose",
    subtitle: "Void Drop 003 · Single-Color Edition 03/05",
    price: 62,
    image: asset("/images/products/p8-pink-back.webp"),
    fitImage: asset("/images/products/orb-4-shirts.webp"),
    bunkerImage: asset("/images/products/orb-bunker-hang.webp"),
    detailImage: asset("/images/products/p8-detail.webp"),
    category: "mono",
    colors: [
      {
        id: "rose",
        label: "Black / Rose",
        swatch: "#d96b83",
        backImage: asset("/images/products/p8-pink-back.webp"),
        frontImage: asset("/images/products/p8-pink-front.webp"),
      },
    ],
    blurb: "dusty-rose horizon orb & metal chest hit on black",
    story:
      "Part of the 4-color Horizon Orb series on washed 340gsm black jersey. Dusty-rose ink traces a circular mountain and wave horizon intersected by a fine vertical compass line, with a matching rose chest mark.",
    fitNote:
      "Single-color Void Drop edition. Pre-shrunk 340gsm combed cotton.",
    specs: COMMON_SPECS,
    isNew: true,
  },
  {
    id: "horizon-orb-green-tee",
    handle: "horizon-orb-green-tee",
    shopifyProductId: "gid://shopify/Product/9010000008",
    skuPrefix: "UNT-003-ORB-GRN",
    name: "Horizon Orb Tee · Mint",
    subtitle: "Void Drop 003 · Single-Color Edition 04/05",
    price: 62,
    image: asset("/images/products/p7-black-back.webp"),
    fitImage: asset("/images/products/orb-4-shirts.webp"),
    bunkerImage: asset("/images/products/orb-bunker-hang.webp"),
    detailImage: asset("/images/products/p7-detail.webp"),
    category: "mono",
    colors: [
      {
        id: "mint",
        label: "Black / Mint",
        swatch: "#4ec978",
        backImage: asset("/images/products/p7-black-back.webp"),
        frontImage: asset("/images/products/p7-black-front.webp"),
      },
    ],
    blurb: "mint-green horizon orb & alignment axis on black",
    story:
      "Part of the 4-color Horizon Orb series on washed 340gsm black jersey. Mint-green line-work traces a lunar orb, mountain peaks, and breaking waves bisected by a vertical axis, paired with a matching chest emblem.",
    fitNote:
      "Single-color Void Drop edition. Boxy fit with dropped shoulder seam.",
    specs: COMMON_SPECS,
    isNew: true,
  },
  {
    id: "horizon-orb-gold-tee",
    handle: "horizon-orb-gold-tee",
    shopifyProductId: "gid://shopify/Product/9010000010",
    skuPrefix: "UNT-003-ORB-GLD",
    name: "Horizon Orb Tee · Gold",
    subtitle: "Void Drop 003 · Single-Color Edition 05/05",
    price: 62,
    image: asset("/images/products/p10-gold-back.webp"),
    fitImage: asset("/images/products/orb-4-shirts.webp"),
    bunkerImage: asset("/images/products/orb-bunker-hang.webp"),
    detailImage: asset("/images/products/p9-blue-detail.webp"),
    category: "mono",
    colors: [
      {
        id: "gold",
        label: "Black / Gold",
        swatch: "#c79a4b",
        backImage: asset("/images/products/p10-gold-back.webp"),
        frontImage: asset("/images/products/p10-gold-front.webp"),
      },
    ],
    blurb: "bronze-gold mountain sigil & lunar axis on washed black",
    story:
      "Part of the 4-color Horizon Orb series on washed 340gsm black jersey. Muted bronze-gold ink traces a circular mountain horizon and crescent moon intersected by a fine vertical compass line, with a matching bronze chest mark.",
    fitNote:
      "Single-color Void Drop edition. Pre-shrunk 340gsm combed cotton.",
    specs: COMMON_SPECS,
    isNew: true,
  },
];

export const sizes = ["XS", "S", "M", "L", "XL"] as const;

export const SIZE_CHART = [
  { size: "XS", chestCm: "56", lengthCm: "70", shoulderCm: "53", fit: "Cropped Boxy" },
  { size: "S", chestCm: "59", lengthCm: "72", shoulderCm: "55", fit: "Relaxed" },
  { size: "M", chestCm: "62", lengthCm: "75", shoulderCm: "58", fit: "Oversized" },
  { size: "L", chestCm: "65", lengthCm: "78", shoulderCm: "61", fit: "Heavy Oversized" },
  { size: "XL", chestCm: "68", lengthCm: "81", shoulderCm: "64", fit: "Max Drape" },
];

export function getProductByHandle(handleOrId: string): Product | undefined {
  return products.find(
    (p) => p.id === handleOrId || p.handle === handleOrId,
  );
}

export function getVariantSku(
  product: Product,
  colorLabel: string,
  size: string,
): string {
  const colorCode = colorLabel.toLowerCase().includes("white") ? "WHT" : "BLK";
  return `${product.skuPrefix}-${colorCode}-${size.toUpperCase()}`;
}

export function getShopifyVariantId(
  product: Product,
  colorLabel: string,
  size: string,
): string {
  const sku = getVariantSku(product, colorLabel, size);
  return `gid://shopify/ProductVariant/${sku}`;
}

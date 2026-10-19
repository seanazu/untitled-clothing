import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import FadeContent from "../components/reactbits/FadeContent";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { createShopifyCheckoutUrl } from "../lib/shopify";
import {
  getProductByHandle,
  getVariantSku,
  products,
  SIZE_CHART,
  sizes,
} from "../products-data";
import "../styles/product-detail.css";

type GallerySlot = "back" | "front" | "fit" | "bunker" | "detail";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart, openDrawer } = useCart();

  const product = useMemo(
    () => (handle ? getProductByHandle(handle) : undefined),
    [handle],
  );

  const colorParam = searchParams.get("color");
  const initialColorIdx = useMemo(() => {
    if (!product || !colorParam) return 0;
    const found = product.colors.findIndex((c) => c.id === colorParam);
    return found >= 0 ? found : 0;
  }, [product, colorParam]);

  const [selectedColorIdx, setSelectedColorIdx] = useState(initialColorIdx);
  const [activeSlot, setActiveSlot] = useState<GallerySlot>("back");
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [qty, setQty] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  // Reset state when switching between products
  useEffect(() => {
    setSelectedColorIdx(initialColorIdx);
    setActiveSlot("back");
    setQty(1);
    setJustAdded(false);
  }, [handle, initialColorIdx]);

  if (!product) {
    return (
      <section className="pdp-not-found">
        <p className="pdp-not-found__code">404 · SIGNAL LOST</p>
        <h1 className="pdp-not-found__title">Piece Not Found</h1>
        <p className="pdp-not-found__sub">
          Either it sold out or it never existed in the first place.
        </p>
        <Link to="/products" className="btn btn--primary">
          Back to All 10 Shirts
        </Link>
      </section>
    );
  }

  const activeColor = product.colors[selectedColorIdx] ?? product.colors[0];
  const isDualColor = product.colors.length > 1;
  const isOrbSeries = product.id.startsWith("horizon-orb-");
  const sku = getVariantSku(product, activeColor.label, selectedSize);

  const galleryItems: {
    slot: GallerySlot;
    shortLabel: string;
    label: string;
    src: string;
  }[] = [
    {
      slot: "back",
      shortLabel: "Back",
      label: "01 · Back Print",
      src: activeColor.backImage,
    },
    {
      slot: "front",
      shortLabel: "Front",
      label: "02 · Front & Chest Hit",
      src: activeColor.frontImage,
    },
    {
      slot: "fit",
      shortLabel: isOrbSeries ? "All 4" : "Look",
      label: isOrbSeries
        ? "03 · All 4 Orb Colorways"
        : "03 · Lookbook Fit",
      src: product.fitImage,
    },
    {
      slot: "bunker",
      shortLabel: "Bunker",
      label: "04 · Bunker Hang",
      src: product.bunkerImage,
    },
    {
      slot: "detail",
      shortLabel: "Detail",
      label: "05 · 340GSM Print Detail",
      src: product.detailImage,
    },
  ];

  const activeGalleryItem =
    galleryItems.find((g) => g.slot === activeSlot) ?? galleryItems[0];

  const handleColorChange = (idx: number) => {
    setSelectedColorIdx(idx);
    const nextColor = product.colors[idx];
    if (nextColor) {
      setSearchParams({ color: nextColor.id }, { replace: true });
    }
    if (
      activeSlot === "fit" ||
      activeSlot === "bunker" ||
      activeSlot === "detail"
    ) {
      setActiveSlot("back");
    }
  };

  const handleAddToBag = () => {
    addToCart(
      product,
      selectedSize,
      activeColor.label,
      activeColor.backImage,
      qty,
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleBuyNow = async () => {
    addToCart(
      product,
      selectedSize,
      activeColor.label,
      activeColor.backImage,
      qty,
    );
    try {
      const url = await createShopifyCheckoutUrl([
        {
          productId: product.id,
          handle: product.handle,
          sku,
          shopifyVariantId: `gid://shopify/ProductVariant/${sku}`,
          name: product.name,
          price: product.price,
          image: activeColor.backImage,
          size: selectedSize,
          color: activeColor.label,
          qty,
        },
      ]);
      if (url) {
        window.location.href = url;
        return;
      }
    } catch {
      // Fallback to local checkout route
    }
    navigate("/checkout");
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const curIdx = galleryItems.findIndex((g) => g.slot === activeSlot);
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const nextIdx =
          (curIdx + dir + galleryItems.length) % galleryItems.length;
        setActiveSlot(galleryItems[nextIdx].slot);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) =>
      a.category === product.category && b.category !== product.category
        ? -1
        : 1,
    )
    .slice(0, 4);

  const ACCORDIONS = [
    {
      title: "01 · 340GSM Construction & Print",
      content: (
        <ul className="pdp-spec-list">
          {product.specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "02 · Sizing & Model Reference",
      content: <p className="pdp-accordion__text">{product.fitNote}</p>,
    },
    {
      title: "03 · Wash & Care Protocol",
      content: (
        <p className="pdp-accordion__text">
          Machine wash cold (30&deg;C max), inside-out with like colors. Hang dry
          in the shade. Do not tumble dry, bleach, or iron directly over the
          high-density back graphic.
        </p>
      ),
    },
    {
      title: "04 · Packaging, Shipping & Returns",
      content: (
        <p className="pdp-accordion__text">
          Dispatched within 24–48 hours in custom-stamped UNTITLED kraft
          packaging. Free shipping on orders over $110. 30-day unworn returns
          with tags attached.
        </p>
      ),
    },
  ];

  return (
    <FadeContent duration={450}>
      <div className="pdp">
        {/* Breadcrumb & SKU status bar */}
        <div className="pdp__topbar">
          <nav className="pdp__breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/products">Shop All</Link>
            <span>/</span>
            <Link
              to={
                product.category === "dual"
                  ? "/products?filter=dual"
                  : "/products?filter=mono"
              }
            >
              {product.category === "dual"
                ? "Black & White Line"
                : "One-Color Void Drop"}
            </Link>
            <span>/</span>
            <span className="pdp__breadcrumb-current">{product.name}</span>
          </nav>
          <div className="pdp__sku-pill">
            <span className="pdp__status-dot" />
            <span>SKU: {sku} &middot; IN STOCK</span>
          </div>
        </div>

        {/* Main 2-column layout */}
        <div className="pdp__main">
          {/* Left: Sticky Multi-Angle Gallery */}
          <div className="pdp__gallery">
            <div
              className="pdp__stage"
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="Open full-screen image viewer"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setLightboxOpen(true);
              }}
            >
              <img
                key={activeGalleryItem.src}
                src={activeGalleryItem.src}
                alt={`${product.name} — ${activeColor.label} (${activeGalleryItem.label})`}
                className="pdp__stage-img"
              />
              <span className="pdp__stage-badge">
                {activeGalleryItem.label}
              </span>
              <button
                type="button"
                className="pdp__zoom-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
              >
                Expand +
              </button>
            </div>

            <div className="pdp__thumbs" role="tablist" aria-label="Product views">
              {galleryItems.map((item) => (
                <button
                  key={item.slot}
                  type="button"
                  role="tab"
                  aria-selected={activeSlot === item.slot}
                  className={
                    "pdp__thumb" + (activeSlot === item.slot ? " is-active" : "")
                  }
                  onClick={() => setActiveSlot(item.slot)}
                >
                  <img src={item.src} alt={item.label} />
                  <span className="pdp__thumb-label">{item.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info & Purchase Controls */}
          <div className="pdp__info">
            <div className="pdp__eyebrow-row">
              <span className="pdp__subtitle">{product.subtitle}</span>
              <span
                className={
                  "pdp__edition-tag" +
                  (product.isNew ? " pdp__edition-tag--new" : "")
                }
              >
                {product.isNew ? "One Color · Black Only" : "Black & Off-White"}
              </span>
            </div>

            <div className="pdp__title-row">
              <h1 className="pdp__title">{product.name}</h1>
              <span className="pdp__price">${product.price}</span>
            </div>

            <p className="pdp__blurb">{product.blurb}</p>
            <p className="pdp__story">{product.story}</p>

            {/* Colorway Selector */}
            <div className="pdp__field">
              <div className="pdp__field-head">
                <span className="pdp__field-label">
                  Colorway: <strong>{activeColor.label}</strong>
                </span>
                <span className="pdp__field-meta">
                  {isDualColor
                    ? "2 colorways available"
                    : "Single-color edition"}
                </span>
              </div>
              <div className="pdp__color-row">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.id}
                    type="button"
                    className={
                      "pdp__color-btn" +
                      (idx === selectedColorIdx ? " is-active" : "")
                    }
                    onClick={() => handleColorChange(idx)}
                  >
                    <span
                      className="pdp__color-swatch"
                      style={{ backgroundColor: color.swatch }}
                    />
                    <span>{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="pdp__field">
              <div className="pdp__field-head">
                <span className="pdp__field-label">
                  Size: <strong>{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  className="pdp__size-guide-trigger"
                  onClick={() => setSizeGuideOpen(true)}
                >
                  Size &amp; Fit Guide &nearr;
                </button>
              </div>
              <div className="pdp__sizes">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={
                      "pdp__size-btn" +
                      (selectedSize === size ? " is-active" : "")
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="pdp__actions">
              <div className="pdp__qty-row">
                <div className="pdp__qty" aria-label="Quantity">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <span>{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn--primary pdp__add-btn"
                  onClick={handleAddToBag}
                >
                  {justAdded
                    ? "Added to Bag ✓"
                    : `Add to Bag — $${product.price * qty}`}
                </button>
              </div>

              <div className="pdp__secondary-actions">
                <button
                  type="button"
                  className="btn pdp__buy-now"
                  onClick={handleBuyNow}
                >
                  Buy It Now &middot; Instant Checkout &rarr;
                </button>
                {justAdded && (
                  <button
                    type="button"
                    className="pdp__view-bag-link"
                    onClick={openDrawer}
                  >
                    Open Bag Drawer
                  </button>
                )}
              </div>
            </div>

            {/* Trust / Dispatch Strip */}
            <div className="pdp__Perks">
              <div className="pdp__perk">
                <span>340GSM</span>
                <small>Heavyweight Combed Cotton</small>
              </div>
              <div className="pdp__perk">
                <span>24–48H</span>
                <small>Bunker Dispatch</small>
              </div>
              <div className="pdp__perk">
                <span>SHOPIFY</span>
                <small>Verified SKU &amp; Checkout</small>
              </div>
            </div>

            {/* Accordions */}
            <div className="pdp__accordions">
              {ACCORDIONS.map((item, idx) => {
                const isOpen = openAccordion === idx;
                return (
                  <div
                    key={item.title}
                    className={"pdp-accordion" + (isOpen ? " is-open" : "")}
                  >
                    <button
                      type="button"
                      className="pdp-accordion__trigger"
                      onClick={() =>
                        setOpenAccordion(isOpen ? null : idx)
                      }
                      aria-expanded={isOpen}
                    >
                      <span>{item.title}</span>
                      <span>{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="pdp-accordion__body">{item.content}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="pdp__related">
          <div className="pdp__related-head">
            <div>
              <p className="pdp__related-eyebrow">Continue Exploring</p>
              <h2 className="pdp__related-title">More From The Bunker Drop</h2>
            </div>
            <Link to="/products" className="pdp__related-link">
              View All 10 Shirts &rarr;
            </Link>
          </div>
          <div className="product-grid pdp__related-grid">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>

        {/* Size Guide Modal */}
        {sizeGuideOpen && (
          <div
            className="pdp-modal-backdrop"
            onClick={() => setSizeGuideOpen(false)}
          >
            <div
              className="pdp-modal"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Size and Fit Guide"
            >
              <div className="pdp-modal__head">
                <div>
                  <p className="pdp-modal__eyebrow">340GSM Boxy Cut</p>
                  <h3 className="pdp-modal__title">Size &amp; Fit Guide</h3>
                </div>
                <button
                  type="button"
                  className="pdp-modal__close"
                  onClick={() => setSizeGuideOpen(false)}
                  aria-label="Close size guide"
                >
                  &times;
                </button>
              </div>
              <p className="pdp-modal__note">
                All 10 shirts share our custom heavyweight 340gsm block — wide
                through the chest with a dropped shoulder seam. Take your usual
                size for the signature oversized drape, or size down for a
                standard boxy fit.
              </p>
              <div className="pdp-size-table-wrap">
                <table className="pdp-size-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Half-Chest (cm)</th>
                      <th>Body Length (cm)</th>
                      <th>Shoulder Width (cm)</th>
                      <th>Silhouette</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((row) => (
                      <tr
                        key={row.size}
                        className={
                          selectedSize === row.size ? "is-highlighted" : ""
                        }
                      >
                        <td>{row.size}</td>
                        <td>{row.chestCm} cm</td>
                        <td>{row.lengthCm} cm</td>
                        <td>{row.shoulderCm} cm</td>
                        <td>{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Image Lightbox */}
        {lightboxOpen && (
          <div
            className="pdp-lightbox"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen product image"
          >
            <button
              type="button"
              className="pdp-lightbox__close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close zoom view"
            >
              Close &times;
            </button>
            <div
              className="pdp-lightbox__content"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeGalleryItem.src}
                alt={activeGalleryItem.label}
                className="pdp-lightbox__img"
              />
              <div className="pdp-lightbox__controls">
                {galleryItems.map((item) => (
                  <button
                    key={item.slot}
                    type="button"
                    className={
                      "pdp-lightbox__pill" +
                      (activeSlot === item.slot ? " is-active" : "")
                    }
                    onClick={() => setActiveSlot(item.slot)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </FadeContent>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { sizes, type Product } from "../products-data";

type ViewMode = "back" | "front" | "fit" | "bunker";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [view, setView] = useState<ViewMode>("back");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const activeColor = product.colors[selectedColorIdx] ?? product.colors[0];
  const productUrl = `/products/${product.handle}?color=${activeColor.id}`;
  const isOrbSeries = product.id.startsWith("horizon-orb-");

  const activeImage =
    view === "back"
      ? activeColor.backImage
      : view === "front"
        ? activeColor.frontImage
        : view === "fit"
          ? product.fitImage
          : product.bunkerImage;

  const handleColorSelect = (index: number) => {
    setSelectedColorIdx(index);
    if (view === "fit" || view === "bunker") {
      setView("back");
    }
  };

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, activeColor.label, activeColor.backImage);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="product-card" data-category={product.category}>
      <div className="product-card__frame">
        <Link
          to={productUrl}
          className="product-card__image-link"
          aria-label={`View ${product.name}`}
        >
          <img
            className="product-card__image"
            src={activeImage}
            alt={`${product.name} — ${activeColor.label} (${view})`}
          />
        </Link>
        {product.isNew ? (
          <span className="product-card__tag">One Color &middot; Drop</span>
        ) : (
          <span className="product-card__tag product-card__tag--dual">
            Black &amp; White
          </span>
        )}

        <div
          className="product-card__views"
          role="group"
          aria-label="Product angle"
        >
          <button
            type="button"
            className={
              "product-card__view-btn" + (view === "back" ? " is-active" : "")
            }
            onClick={() => setView("back")}
          >
            Back
          </button>
          <button
            type="button"
            className={
              "product-card__view-btn" + (view === "front" ? " is-active" : "")
            }
            onClick={() => setView("front")}
          >
            Front
          </button>
          <button
            type="button"
            className={
              "product-card__view-btn" + (view === "fit" ? " is-active" : "")
            }
            onClick={() => setView("fit")}
          >
            {isOrbSeries ? "All 4" : "Look"}
          </button>
          <button
            type="button"
            className={
              "product-card__view-btn" + (view === "bunker" ? " is-active" : "")
            }
            onClick={() => setView("bunker")}
          >
            Bunker
          </button>
        </div>
      </div>

      <div className="product-card__body">
        <div className="product-card__row">
          <h3 className="product-card__name">
            <Link to={productUrl} className="product-card__title-link">
              {product.name}
            </Link>
          </h3>
          <span className="product-card__price">${product.price}</span>
        </div>
        <p className="product-card__desc">{product.blurb}</p>

        <div className="product-card__colors" aria-label="Colorway">
          {product.colors.map((color, idx) => (
            <button
              key={color.id}
              type="button"
              className={
                "color-chip" + (idx === selectedColorIdx ? " is-active" : "")
              }
              onClick={() => handleColorSelect(idx)}
              aria-pressed={idx === selectedColorIdx}
            >
              <span
                className="color-chip__dot"
                style={{ backgroundColor: color.swatch }}
              />
              <span>{color.label}</span>
            </button>
          ))}
          <Link to={productUrl} className="product-card__details-link">
            Details &rarr;
          </Link>
        </div>

        <div className="size-picker">
          {sizes.map((size) => (
            <span key={size}>
              <input
                type="radio"
                name={`size-${product.id}`}
                id={`size-${product.id}-${size}`}
                value={size}
                checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
              />
              <label htmlFor={`size-${product.id}-${size}`}>{size}</label>
            </span>
          ))}
        </div>
        <button
          type="button"
          className="btn product-card__add"
          disabled={!selectedSize}
          onClick={handleAdd}
        >
          {justAdded
            ? "Added ✓"
            : selectedSize
              ? `Add ${activeColor.label} (${selectedSize}) — $${product.price}`
              : "Select a size"}
        </button>
      </div>
    </article>
  );
}

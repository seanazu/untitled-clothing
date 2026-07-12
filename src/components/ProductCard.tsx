import { useState } from "react";
import { useCart } from "../context/CartContext";
import { sizes, type Product } from "../products-data";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="product-card" data-category={product.category}>
      <div className="product-card__frame">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {product.isNew && <span className="product-card__tag">New</span>}
      </div>
      <div className="product-card__body">
        <div className="product-card__row">
          <h3 className="product-card__name">{product.name}</h3>
          <span className="product-card__price">${product.price}</span>
        </div>
        <p className="product-card__desc">{product.blurb}</p>
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
              ? `Add to Bag — $${product.price}`
              : "Select a size"}
        </button>
      </div>
    </article>
  );
}

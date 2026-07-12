import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../products-data";
import "./SearchOverlay.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    inputRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div
      className={"search-overlay" + (open ? " is-open" : "")}
      aria-hidden={!open}
      onClick={onClose}
    >
      <div className="search-overlay__panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-overlay__bar">
          <input
            ref={inputRef}
            className="search-overlay__input"
            type="search"
            placeholder="Search for something undefined…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="search-overlay__close"
            onClick={onClose}
            aria-label="Close search"
          >
            &times;
          </button>
        </div>

        {query.trim() !== "" && (
          <div className="search-overlay__results">
            {results.length === 0 ? (
              <p className="search-overlay__empty">
                Nothing. Which is on brand, honestly.
              </p>
            ) : (
              results.map((p) => (
                <Link
                  key={p.id}
                  to="/products"
                  className="search-overlay__result"
                  onClick={onClose}
                >
                  <img src={p.image} alt={p.name} />
                  <span className="search-overlay__result-name">{p.name}</span>
                  <span className="search-overlay__result-price">
                    ${p.price}
                  </span>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

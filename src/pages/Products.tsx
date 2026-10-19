import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FadeContent from "../components/reactbits/FadeContent";
import ProductCard from "../components/ProductCard";
import { products } from "../products-data";
import "../styles/shop.css";

const CATEGORIES: {
  label: string;
  value: "all" | "dual" | "mono";
}[] = [
  { label: "All 10 Shirts", value: "all" },
  { label: "Black & White Line (5)", value: "dual" },
  { label: "One Color · Black Only (5)", value: "mono" },
];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const paramFilter = params.get("filter");
  const initialFilter =
    paramFilter === "new" || paramFilter === "mono"
      ? "mono"
      : paramFilter === "dual"
        ? "dual"
        : "all";

  const [filter, setFilter] = useState<string>(initialFilter);

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const handleSelectFilter = (val: string) => {
    setFilter(val);
    if (val === "all") {
      setParams({}, { replace: true });
    } else {
      setParams({ filter: val }, { replace: true });
    }
  };

  const visible = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero__title">Shop All</h1>
        <p className="page-hero__subtitle">
          10 shirts. 5 in black &amp; white, 5 in one color. click any piece for
          full details &amp; sizing.
        </p>
      </section>

      <div className="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            className={"filter-chip" + (filter === cat.value ? " is-active" : "")}
            onClick={() => handleSelectFilter(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <FadeContent duration={500} key={filter}>
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </FadeContent>
    </>
  );
}

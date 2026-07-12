import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FadeContent from "../components/reactbits/FadeContent";
import ProductCard from "../components/ProductCard";
import { products, type Product } from "../products-data";
import "../styles/shop.css";

const CATEGORIES: { label: string; value: "all" | Product["category"] | "new" }[] =
  [
    { label: "All", value: "all" },
    { label: "New", value: "new" },
    { label: "Tees", value: "tees" },
    { label: "Outerwear", value: "outerwear" },
    { label: "Bottoms", value: "bottoms" },
    { label: "Accessories", value: "accessories" },
  ];

export default function Products() {
  const [params] = useSearchParams();
  const [filter, setFilter] = useState<string>(
    params.get("filter") === "new" ? "new" : "all",
  );

  const visible = useMemo(() => {
    if (filter === "all") return products;
    if (filter === "new") return products.filter((p) => p.isNew);
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero__title">Shop All</h1>
        <p className="page-hero__subtitle">
          hopefully you remember what you ordered, cause we don't write
          descriptions.
        </p>
      </section>

      <div className="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            className={"filter-chip" + (filter === cat.value ? " is-active" : "")}
            onClick={() => setFilter(cat.value)}
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

import { Link } from "react-router-dom";
import AnimatedContent from "./reactbits/AnimatedContent";
import ProductCard from "./ProductCard";
import { products } from "../products-data";
import "../styles/shop.css";
import "./ProductShowcase.css";

export default function ProductShowcase() {
  const featured = products.filter((p) => p.category === "dual");

  return (
    <section className="showcase">
      <div className="showcase__heading-row">
        <div>
          <p className="showcase__eyebrow">05 Dual-Color Editions</p>
          <h2 className="showcase__heading">Black &amp; White Line</h2>
        </div>
        <Link className="showcase__link" to="/products">
          Shop All 10 Shirts &rarr;
        </Link>
      </div>
      <div className="product-grid showcase__grid">
        {featured.map((product, i) => (
          <AnimatedContent
            key={product.id}
            className="showcase__card-wrap"
            distance={60}
            duration={0.8}
            delay={i * 0.08}
            threshold={0.1}
          >
            <ProductCard product={product} />
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}

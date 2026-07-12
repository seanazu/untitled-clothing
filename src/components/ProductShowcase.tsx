import { Link } from "react-router-dom";
import AnimatedContent from "./reactbits/AnimatedContent";
import ProductCard from "./ProductCard";
import { products } from "../products-data";
import "../styles/shop.css";
import "./ProductShowcase.css";

export default function ProductShowcase() {
  const featured = products.filter((p) => !p.isNew).slice(0, 4);

  return (
    <section className="showcase">
      <div className="showcase__heading-row">
        <h2 className="showcase__heading">The Essentials</h2>
        <Link className="showcase__link" to="/products">
          Shop All &rarr;
        </Link>
      </div>
      <div className="product-grid">
        {featured.map((product, i) => (
          <AnimatedContent
            key={product.id}
            distance={60}
            duration={0.8}
            delay={i * 0.1}
            threshold={0.1}
          >
            <ProductCard product={product} />
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}

import AnimatedContent from "./reactbits/AnimatedContent";
import ProductCard from "./ProductCard";
import { products } from "../products-data";
import "../styles/shop.css";
import "./Monument.css";

/**
 * The drop statement — pure black, typography-led, with the current drop's
 * products in light editorial cards.
 */
export default function Monument() {
  const drop = products.filter((p) => p.isNew).slice(0, 3);

  return (
    <section className="monument">
      <AnimatedContent distance={70} duration={1}>
        <div className="monument__head">
          <p className="monument__eyebrow">The Void Drop &middot; 003</p>
          <h2 className="monument__heading">
            Untitled is what remains<br />when nothing needs to be said.
          </h2>
          <p className="monument__scrawl">set in stone. sort of.</p>
        </div>
      </AnimatedContent>

      <div className="monument__cards">
        {drop.map((product, i) => (
          <AnimatedContent
            key={product.id}
            distance={80}
            duration={0.9}
            delay={i * 0.14}
            threshold={0.15}
          >
            <div className="monument__card">
              <ProductCard product={product} />
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}

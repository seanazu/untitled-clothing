import FadeContent from "../components/reactbits/FadeContent";
import ProductCard from "../components/ProductCard";
import { products } from "../products-data";
import "../styles/shop.css";

export default function Collections() {
  const dualColorShirts = products.filter((p) => p.category === "dual");
  const singleColorShirts = products.filter((p) => p.category === "mono");

  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero__title">Collections</h1>
        <p className="page-hero__subtitle">
          stop trying to define it, it's for fun.
        </p>
      </section>

      <FadeContent duration={500}>
        <section className="collection-section">
          <h2 className="collection-section__title">
            Everyday Static &middot; Black &amp; White (05)
          </h2>
          <div className="product-grid">
            {dualColorShirts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="collection-section">
          <h2 className="collection-section__title">
            Void Drop &middot; One Color (05)
          </h2>
          <div className="product-grid">
            {singleColorShirts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </FadeContent>
    </>
  );
}

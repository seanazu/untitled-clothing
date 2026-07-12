import FadeContent from "../components/reactbits/FadeContent";
import ProductCard from "../components/ProductCard";
import { products } from "../products-data";
import "../styles/shop.css";

export default function Collections() {
  const voidDrop = products.filter((p) => p.isNew);
  const everydayStatic = products.filter((p) => !p.isNew);

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
          <h2 className="collection-section__title">Void Drop</h2>
          <div className="product-grid">
            {voidDrop.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="collection-section">
          <h2 className="collection-section__title">Everyday Static</h2>
          <div className="product-grid">
            {everydayStatic.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </FadeContent>
    </>
  );
}

import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import ProductShowcase from "../components/ProductShowcase";
import StyleShowcase from "../components/StyleShowcase";
import Monument from "../components/Monument";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ProductShowcase />
      <StyleShowcase />
      <Monument />
    </>
  );
}

import { Link } from "react-router-dom";
import FadeContent from "../components/reactbits/FadeContent";
import { asset } from "../utils/asset";
import "../styles/about.css";

const PILLARS = [
  {
    num: "01",
    title: "340GSM Combed Jersey",
    body: "Custom-knitted heavyweight ring-spun cotton, enzyme-washed and pre-shrunk so the boxy drop-shoulder silhouette holds its frame for years.",
    image: asset("/images/products/p1-detail.webp"),
  },
  {
    num: "02",
    title: "5 Dual-Color + 5 Mono",
    body: "The 10-shirt capsule is split into 5 signature back-print editions in Black & Off-White, plus 5 single-color Void Drop editions in washed Black.",
    image: asset("/images/products/p1-bunker.webp"),
  },
  {
    num: "03",
    title: "Shot Raw in the Bunker",
    body: "No studio cyclorama, no fake lifestyle props. Photographed suspended and worn on our own crew inside an abandoned concrete bunker.",
    image: asset("/images/editorial-skylight.webp"),
  },
];

const GALLERY_ITEMS = [
  {
    num: "01",
    span: "wide" as const,
    src: asset("/images/products/orb-4-shirts.webp"),
    title: "The 4-Color Horizon Orb Lineup",
    caption: "Cyan, Rose, Gold & Mint editions on 340gsm washed black cotton.",
    to: "/products?filter=mono",
  },
  {
    num: "02",
    span: "standard" as const,
    src: asset("/images/editorial-cluster.webp"),
    title: "Skylight Suspension",
    caption: "Six pieces hung raw beneath the bunker ceiling shaft.",
    to: "/products",
  },
  {
    num: "03",
    span: "standard" as const,
    src: asset("/images/editorial-ladder-duo.webp"),
    title: "Everyday Static · Dual-Color",
    caption: "Boxy drop-shoulder fit in Black & Off-White.",
    to: "/products?filter=dual",
  },
  {
    num: "04",
    span: "standard" as const,
    src: asset("/images/products/p3-duo.webp"),
    title: "Signal Ribcage · On Body",
    caption: "Electric cyan spine print on Black & crimson-black on Off-White.",
    to: "/products/signal-ribcage-tee",
  },
  {
    num: "05",
    span: "standard" as const,
    src: asset("/images/editorial-rack.webp"),
    title: "Full Archive 003 Rack",
    caption: "All 10 heavyweight shirts staged in the graffiti hall.",
    to: "/collections",
  },
  {
    num: "06",
    span: "wide" as const,
    src: asset("/images/editorial-stairs-backs.webp"),
    title: "Concrete Stairwell Architecture",
    caption: "Tiered back-print study across both collections.",
    to: "/products",
  },
];

const FAQ = [
  {
    q: "Do your product descriptions mean anything?",
    a: "No. Hopefully you remember what you ordered — we don't write descriptions. Every piece speaks through the back graphic and the 340gsm cut.",
  },
  {
    q: "What's in the current collection?",
    a: "10 heavyweight tees total: 5 dual-color designs available in both Black and Off-White (Signal Ribcage, Caged Triple Rose, Framed Rose, Thorn Spine, Eclipse Orbit), and 5 single-color editions available in Black only (Blue Rose Scrawl plus the 4-color Horizon Orb series in Cyan, Rose, Mint, and Gold).",
  },
  {
    q: "What's the sizing like?",
    a: "Oversized drop-shoulder boxy cut in 340gsm cotton. Take your normal size for the intended relaxed streetwear drape, or size down for a closer box fit. Check the interactive Size Guide on any product page.",
  },
  {
    q: "How fast do orders ship and can I return something?",
    a: "Orders dispatch within 24–48 hours in custom-stamped UNTITLED heavyweight kraft bags and black poly-mailers. Free shipping over $110. Unworn pieces with tags attached can be returned or exchanged within 30 days.",
  },
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <p className="about-eyebrow">MANIFESTO &middot; ARCHIVE 003</p>
        <h1 className="page-hero__title">
          About Nothing
          <br />
          in Particular
        </h1>
        <p className="page-hero__subtitle">no meaning. just energy.</p>
      </section>

      <FadeContent duration={500}>
        {/* Manifesto Hero Split with Model + Product Showcase */}
        <section className="manifesto">
          <div className="manifesto__text">
            <p>
              <em>UNTITLED</em> doesn't stand for anything. There's no origin
              story, no founder photo in a denim jacket, no three-word brand
              pillars.
            </p>
            <p>
              It started because making heavyweight clothes with unapologetic
              art was more fun than not making them. 10 shirts, 340gsm cotton,
              shot raw in an abandoned concrete bunker. That's the whole pitch.
            </p>
            <p>
              <em>Stop trying to define it. It's for fun.</em>
            </p>
            <div className="manifesto__ctas">
              <Link to="/products" className="btn btn--primary">
                Shop All 10 Shirts &rarr;
              </Link>
              <Link to="/collections" className="btn">
                Explore Collections
              </Link>
              <Link to="/contact" className="btn">
                Contact Studio
              </Link>
            </div>
            <img
              className="manifesto__doodle-inline"
              src={asset("/brand/doodle.png")}
              alt="hand-written notes: hopefully you remember what you ordered cause I don't write description. stop trying to define, it's for fun. no meaning, just energy."
            />
          </div>

          <div className="manifesto__visuals">
            <figure className="manifesto__visual-main">
              <img
                src={asset("/images/products/p4-duo.webp")}
                alt="UNTITLED models wearing Black and Off-White Caged Triple Rose Tees"
              />
              <figcaption>
                <span>MODEL ARCHIVE</span> &middot; BLACK &amp; OFF-WHITE 340GSM CUT
              </figcaption>
            </figure>
            <figure className="manifesto__visual-sub">
              <img
                src={asset("/images/products/orb-bunker-hang.webp")}
                alt="Horizon Orb shirt suspended over the concrete bunker stairs"
              />
              <figcaption>
                <span>PRODUCT ARCHIVE</span> &middot; BUNKER STAIRWELL HANG
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 3 Architectural Pillars with Product Photography */}
        <section className="about-pillars">
          {PILLARS.map((p) => (
            <article key={p.num} className="about-pillar">
              <div className="about-pillar__media">
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="about-pillar__num">{p.num}</span>
              </div>
              <div className="about-pillar__content">
                <h2 className="about-pillar__title">{p.title}</h2>
                <p className="about-pillar__body">{p.body}</p>
              </div>
            </article>
          ))}
        </section>

        {/* 6-Frame Bunker Product & Model Archive */}
        <section className="about-archive" aria-label="Bunker shoot archive">
          <div className="about-archive__head">
            <div>
              <p className="about-eyebrow">BUNKER SHOOT &middot; MODELS &amp; PIECES</p>
              <h2 className="about-archive__title">Inside The Concrete Archive</h2>
            </div>
            <Link to="/products" className="btn">
              Shop The Archive &rarr;
            </Link>
          </div>

          <div className="bunker-gallery">
            {GALLERY_ITEMS.map((item) => (
              <Link
                to={item.to}
                key={item.num}
                className={`bunker-gallery__item bunker-gallery__item--${item.span}`}
              >
                <div className="bunker-gallery__frame">
                  <img src={item.src} alt={item.title} loading="lazy" />
                  <span className="bunker-gallery__badge">FRAME {item.num}</span>
                </div>
                <div className="bunker-gallery__meta">
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="faq">
          <h2 className="faq__heading">Frequently Asked Nothing</h2>
          {FAQ.map((item) => (
            <div className="faq__item" key={item.q}>
              <h3 className="faq__q">{item.q}</h3>
              <p className="faq__a">{item.a}</p>
            </div>
          ))}
        </section>
      </FadeContent>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "../utils/asset";
import "./StyleShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const SLIDE_SECONDS = 5.5;

const SLIDES = [
  {
    num: "01",
    tag: "Void Drop 003 · 4-Color Orb Series",
    title: "10 Shirts · 0 Explanations",
    body: "4 Horizon Orb colorways (Cyan, Rose, Gold & Mint) + Blue Rose Scrawl in washed black, alongside 5 dual-color editions in black & off-white.",
    mainImg: asset("/images/products/orb-4-shirts.webp"),
    mainCaption: "FIG. 01 — ALL 4 HORIZON ORB COLORWAYS ON 340GSM BLACK",
    mainAspect: "landscape" as const,
    secondaryImg: asset("/images/products/orb-bunker-hang.webp"),
    secondaryCaption: "BUNKER STAIRWELL HANG",
    ctaLabel: "Shop The 4 Orb Shirts →",
    ctaTo: "/products?filter=mono",
  },
  {
    num: "02",
    tag: "Everyday Static · Black & Off-White",
    title: "Cut to move",
    body: "Oversized through the shoulder, boxy drop-shoulder silhouette with thick 1.2\" ribbed collar. Every dual-color edition is cut in both Black and Off-White.",
    mainImg: asset("/images/editorial-ladder-duo.webp"),
    mainCaption: "FIG. 02 — DUAL-COLOR FIT IN BLACK & OFF-WHITE",
    mainAspect: "portrait" as const,
    secondaryImg: asset("/images/products/p1-bunker.webp"),
    secondaryCaption: "DUAL-COLOR SKYLIGHT PAIR",
    ctaLabel: "Shop Black & White Line →",
    ctaTo: "/products?filter=dual",
  },
  {
    num: "03",
    tag: "340GSM Heavyweight Architecture",
    title: "Small runs only",
    body: "Photographed suspended raw inside an abandoned concrete bunker. Dispatched in custom-stamped UNTITLED kraft & poly packaging — no restocks.",
    mainImg: asset("/images/editorial-cluster.webp"),
    mainCaption: "FIG. 03 — 6 PIECES SUSPENDED UNDER THE BUNKER SKYLIGHT",
    mainAspect: "portrait" as const,
    secondaryImg: asset("/images/products/p4-duo.webp"),
    secondaryCaption: "CAGED TRIPLE ROSE · ON BODY",
    ctaLabel: "Shop All 10 Shirts →",
    ctaTo: "/products",
  },
];

export default function StyleShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      end: "bottom 15%",
      onToggle: (self) => setRunning(self.isActive),
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const bar = barRefs.current[active];
    if (!bar) return;
    barRefs.current.forEach((b, i) => {
      if (b && i !== active) gsap.set(b, { scaleX: 0 });
    });
    gsap.set(bar, { scaleX: 0 });

    if (!running) return;
    tweenRef.current = gsap.to(bar, {
      scaleX: 1,
      duration: SLIDE_SECONDS,
      ease: "none",
      onComplete: () => setActive((i) => (i + 1) % SLIDES.length),
    });
    return () => {
      tweenRef.current?.kill();
    };
  }, [active, running]);

  const currentSlide = SLIDES[active] ?? SLIDES[0];

  return (
    <section ref={sectionRef} className="style-showcase">
      <div className="style-showcase__inner">
        {/* Left Column: Editorial Headline, Chapters & CTA */}
        <div className="style-showcase__left">
          <div className="style-showcase__top-pill">
            <span className="style-showcase__top-dot" />
            <span>
              {currentSlide.num} / 03 &middot; {currentSlide.tag}
            </span>
          </div>

          <div className="style-showcase__head">
            <h2 className="style-showcase__title">
              Built for nothing
              <br />
              in particular.
            </h2>
            <p className="style-showcase__scrawl">
              no meaning, just heavyweight energy.
            </p>
          </div>

          <div className="style-showcase__items" role="tablist">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.num}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={
                  "style-showcase__item" + (i === active ? " is-active" : "")
                }
                onClick={() => setActive(i)}
              >
                <span className="style-showcase__bar">
                  <span
                    className="style-showcase__bar-fill"
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                  />
                </span>
                <div className="style-showcase__item-head">
                  <span className="style-showcase__num">{slide.num}</span>
                  <span className="style-showcase__item-title">
                    {slide.title}
                  </span>
                </div>
                <span className="style-showcase__item-body">{slide.body}</span>
              </button>
            ))}
          </div>

          <div className="style-showcase__actions">
            <Link
              to={currentSlide.ctaTo}
              className="btn btn--primary style-showcase__cta"
            >
              {currentSlide.ctaLabel}
            </Link>
            <Link to="/collections" className="btn style-showcase__cta-secondary">
              View Both Collections
            </Link>
          </div>
        </div>

        {/* Right Column: Uncropped Dual-Frame Visual Stage */}
        <div className="style-showcase__right">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.num}
              className={
                "style-showcase__stage" +
                (i === active ? " is-active" : "") +
                ` style-showcase__stage--${slide.mainAspect}`
              }
              aria-hidden={i !== active}
            >
              <figure className="style-showcase__main-frame">
                <img
                  src={slide.mainImg}
                  alt={slide.mainCaption}
                  loading="lazy"
                />
                <figcaption className="style-showcase__frame-caption">
                  <span>{slide.mainCaption}</span>
                </figcaption>
              </figure>

              <figure className="style-showcase__secondary-frame">
                <img
                  src={slide.secondaryImg}
                  alt={slide.secondaryCaption}
                  loading="lazy"
                />
                <figcaption>{slide.secondaryCaption}</figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

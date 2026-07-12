import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StyleShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const SLIDE_SECONDS = 5;

const SLIDES = [
  {
    src: "/images/style-1.webp",
    num: "01",
    title: "Heavyweight cotton",
    body: "340gsm, washed and enzyme-softened until it stopped arguing. Holds its shape for years.",
  },
  {
    src: "/images/style-2.webp",
    num: "02",
    title: "Cut to move",
    body: "Oversized through the shoulder, tapered where it counts. It moves before you do.",
  },
  {
    src: "/images/style-3.webp",
    num: "03",
    title: "Small runs only",
    body: "Numbered drops, no restocks. When it's gone, it never existed.",
  },
];

/**
 * kOTR-style auto-advancing showcase: full-bleed background slides crossfade
 * on a timer; each caption carries a loading bar that fills while its slide
 * is live, then hands off to the next. Inactive captions sit dimmed.
 */
export default function StyleShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  // Start/stop the rotation with section visibility (and reduced motion).
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

  // One bar-fill tween per active slide while running.
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

  return (
    <section ref={sectionRef} className="style-showcase">
      <div className="style-showcase__bgs" aria-hidden="true">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.num}
            src={slide.src}
            alt=""
            loading="lazy"
            className={
              "style-showcase__bg" + (i === active ? " is-active" : "")
            }
          />
        ))}
        <div className="style-showcase__tint" />
      </div>

      <h2 className="style-showcase__title">
        Built for nothing
        <br />
        in particular.
      </h2>

      <div className="style-showcase__items">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.num}
            type="button"
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
            <span className="style-showcase__num">{slide.num}</span>
            <span className="style-showcase__item-title">{slide.title}</span>
            <span className="style-showcase__item-body">{slide.body}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

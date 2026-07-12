import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "./reactbits/SplitText";
import LiveClock from "./LiveClock";
import { asset } from "../utils/asset";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAME_COUNT = 85;
// Phones get a dedicated 9:16 render of the same video so the emblem is
// composed for the screen instead of cropped out of the 16:9 master.
const framePath = (i: number, mobile: boolean) =>
  asset(
    `/hero-seq${mobile ? "-mobile" : ""}/frame-${String(i + 1).padStart(3, "0")}.webp`,
  );

/**
 * Scroll-scrubbed image sequence: the hero pins and the emblem reveals
 * frame-by-frame as you scroll — forward and backward.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!section || !canvas || !ctx) return;

      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      const images: HTMLImageElement[] = [];
      let currentFrame = 0;

      const draw = (index: number) => {
        const img = images[index];
        if (!img?.complete || img.naturalWidth === 0) return;
        const cw = canvas.width;
        const ch = canvas.height;
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        // When landscape frames land on a portrait canvas (tablets), anchor
        // the crop on the emblem in the right half instead of dead center.
        const focusX =
          cw < ch && img.naturalWidth > img.naturalHeight ? 0.72 : 0.5;
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, (cw - dw) * focusX, (ch - dh) / 2, dw, dh);
      };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = section.getBoundingClientRect();
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        draw(currentFrame);
      };

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = framePath(i, isMobile);
        if (i === 0) {
          img.onload = () => draw(0);
        }
        images.push(img);
      }

      resize();
      window.addEventListener("resize", resize);

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        // static final frame, no pin
        images[FRAME_COUNT - 1].onload = () => {
          currentFrame = FRAME_COUNT - 1;
          draw(currentFrame);
        };
      } else {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const frame = Math.min(
              FRAME_COUNT - 1,
              Math.round(self.progress * (FRAME_COUNT - 1)),
            );
            if (frame !== currentFrame) {
              currentFrame = frame;
              draw(frame);
            }
          },
        });
      }

      // useGSAP's context reverts the ScrollTrigger (if still alive) on
      // unmount; the resize listener is ours to remove in both paths.
      return () => {
        window.removeEventListener("resize", resize);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero__media" aria-hidden="true">
        <canvas ref={canvasRef} className="hero__canvas" />
        <div className="hero__media-tint" />
      </div>

      <div className="hero__top">
        <p className="hero__descriptor">
          UNTITLED is a clothing label with no brief, no meaning, and no plans
          to explain itself.
        </p>
        <LiveClock />
      </div>

      <div className="hero__center">
        <p className="hero__eyebrow">your favourite nothing is back</p>
        <SplitText
          text="Don't think. Just wear it."
          tag="h1"
          className="hero__title"
          splitType="chars"
          delay={28}
          duration={0.9}
          textAlign="left"
          from={{ opacity: 0, y: 60 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.05}
          rootMargin="0px"
        />
        <p className="hero__scroll-hint">scroll — it reveals itself</p>
      </div>
    </section>
  );
}

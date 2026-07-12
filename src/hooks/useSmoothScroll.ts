import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

if (import.meta.env.DEV) {
  (window as unknown as { ST: typeof ScrollTrigger }).ST = ScrollTrigger;
  (window as unknown as { gsap: typeof gsap }).gsap = gsap;
}

let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * One scroll driver for the whole app: Lenis raf runs on gsap.ticker so
 * Lenis, ScrollTrigger, and any per-frame render loops all tick in the same
 * frame, in the same order. Separate rAF loops for each are exactly the
 * class of jank this exists to remove.
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

/** Reset scroll and remeasure triggers when the route changes. */
export function useRouteScrollReset(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    // Wait for the new page to paint before remeasuring pin distances.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);
}

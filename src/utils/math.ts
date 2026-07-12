import gsap from "gsap";

export function lerp(p1: number, p2: number, t: number): number {
  return gsap.utils.interpolate(p1, p2, t);
}

export function clamp(min: number, max: number, value: number): number {
  return gsap.utils.clamp(min, max, value);
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type CinematicPreset = {
  start?: string;
  end?: string;
  toggleActions?: string;
  once?: boolean;
  scrub?: boolean | number;
};

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_PRESET: Required<CinematicPreset> = {
  start: "top 80%",
  end: "bottom 30%",
  toggleActions: "play none none reverse",
  once: false,
  scrub: false,
};

export function cinematicDefaults() {
  return {
    markers: false,
    invalidateOnRefresh: true,
    ...DEFAULT_PRESET,
  };
}

export function applyReveal(
  target: gsap.TweenTarget,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  preset: CinematicPreset = {}
) {
  const cfg = { ...cinematicDefaults(), ...preset };

  return gsap.fromTo(target, from, {
    ...to,
    scrollTrigger: {
      // Se quiser um trigger custom, passe via `to.scrollTrigger`.
      // (Mantém compatibilidade com casos existentes.)
      trigger: (to as any)?.scrollTrigger?.trigger ?? undefined,
      start: cfg.start,
      end: cfg.end,
      toggleActions: cfg.toggleActions,
      once: cfg.once,
      scrub: cfg.scrub,
      invalidateOnRefresh: true,
      markers: false,
    },
  });
}


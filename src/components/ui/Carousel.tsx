import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface CarouselProps {
  items: React.ReactNode[];
}

// Carrossel horizontal com scroll e animação GSAP
export function Carousel({ items }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Horizontal scroll com GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - container.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - container.offsetWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="carousel-section w-full py-24">
      <div
        ref={containerRef}
        className="carousel-container relative w-full overflow-x-hidden"
        style={{ height: 340 }}
      >
        <div
          ref={trackRef}
          className="carousel-track flex gap-8 will-change-transform"
          style={{ height: 320 }}
        >
          {items.map((item, i) => (
            <div key={i} className="carousel-item min-w-[320px] max-w-xs bg-background/80 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

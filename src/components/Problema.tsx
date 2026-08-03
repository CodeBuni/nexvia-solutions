import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Problema() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".section-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        // Itens alternam entrada da esquerda/direita
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
        // Linhas decorativas crescem
        gsap.fromTo(
          item.querySelector(".decor-line"),
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const problems = [
    "Pacientes que não voltam porque ninguém os contactou",
    "Horas perdidas em agendamentos manuais e chamadas",
    "Sem sistema. Sem previsibilidade. Sem crescimento.",
  ];

  return (
    <section
      ref={containerRef}
      className="py-32 grain-bg relative border-t border-white/5"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="section-title font-display text-3xl md:text-5xl font-bold mb-20 text-center md:text-left tracking-tight">
          A maioria das clínicas{" "}
          <span className="text-primary">perde dinheiro</span> sem saber
        </h2>

        <div className="flex flex-col gap-12">
          {problems.map((prob, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="flex items-start gap-6 md:gap-10 group"
            >
              <div className="decor-line flex flex-col items-center justify-center pt-2">
                <div className="w-0.5 h-16 md:h-24 rounded-full bg-primary/80 shadow-[0_0_18px_1px_rgba(61,99,240,0.28)] mb-2" />
                <div className="w-0.5 h-8 md:h-12 rounded-full bg-accent/70 shadow-[0_0_12px_1px_rgba(58,160,255,0.2)]" />
              </div>
              <div className="font-display text-5xl md:text-7xl font-semibold text-white/10 group-hover:text-primary/35 transition-colors duration-500">
                0{i + 1}
              </div>
              <p className="text-xl md:text-3xl font-medium pt-2 md:pt-4 text-foreground/80">
                {prob}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
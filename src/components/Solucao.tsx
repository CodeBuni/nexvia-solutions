import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Workflow, LayoutTemplate, Smartphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Solucao() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".solucao-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Cards com animação 3D e stagger
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 70, scale: 0.7, rotateY: 20 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".cards-container",
            start: "top 80%",
          },
        }
      );

      // Ícones com rotação
      gsap.fromTo(
        ".card-icon",
        { rotation: -90, scale: 0.5 },
        {
          rotation: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: {
            trigger: ".cards-container",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Automação de Processos",
      icon: <Workflow className="w-8 h-8 text-primary" />,
      desc: "Agendamento automático, lembretes SMS/email, follow-up pós-consulta, reativação de pacientes inativos, reviews automáticas."
    },
    {
      title: "Sites + Landing Pages",
      icon: <LayoutTemplate className="w-8 h-8 text-primary" />,
      desc: "Sites para clínicas, páginas de captura, SEO local, integração com sistemas de agendamento."
    },
    {
      title: "Apps de Nicho",
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      desc: "Apps específicas por especialidade médica. Produto escalável e revendível."
    }
  ];

  return (
    <section id="servicos" ref={containerRef} className="py-32 relative bg-[#0d0d14]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="solucao-title font-display text-4xl md:text-5xl font-bold mb-16 text-center">
          O que a Nexvia faz por si
        </h2>

        <div className="cards-container grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glassmorphism p-8 rounded-2xl flex flex-col items-start gap-6 border-brutal hover:glow-primary transition-colors group"
            >
              <div className="card-icon p-4 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                {srv.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold font-display mb-3">{srv.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
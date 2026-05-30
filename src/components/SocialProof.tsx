import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Zap, HeadphonesIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Automação real",
    desc: "Sistemas que trabalham 24/7 pela sua clínica.",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Foco em saúde privada",
    desc: "Especialistas no setor. Conhecemos os seus desafios.",
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6 text-primary" />,
    title: "Suporte próximo",
    desc: "Fale connosco diretamente. Sem bots, sem tickets.",
  },
];

export function SocialProof() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trust-el",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#0d0d14] border-t border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="trust-el font-display text-4xl md:text-5xl font-bold mb-4">
            Construímos com transparência.
          </h2>
          <p className="trust-el text-muted-foreground text-lg max-w-2xl mx-auto">
            Não mostramos casos de sucesso porque cada projeto é confidencial. 
            Mostramos como trabalhamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {trustItems.map((item, i) => (
            <div 
              key={i} 
              className="trust-el p-8 rounded-2xl bg-card/50 border border-white/5 hover:border-primary/20 transition-all text-center group"
            >
              <div className="p-4 rounded-xl bg-primary/10 inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
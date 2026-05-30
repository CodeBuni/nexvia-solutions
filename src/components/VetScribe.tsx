import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function VetScribe() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título e subtítulo
      gsap.fromTo(
        ".vet-title-group",
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

      // Card principal
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );

      // Screenshot com entrada lateral
      gsap.fromTo(
        screenshotRef.current,
        { opacity: 0, x: 100, scale: 0.9, rotateY: 10 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );

      // Tags
      gsap.fromTo(
        ".vet-tag",
        { opacity: 0, y: 10, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="vetscribe" ref={containerRef} className="py-32 relative overflow-hidden bg-[#0A0A0F]">
      <div className="container mx-auto px-6">
        
        {/* Título da secção */}
        <div className="vet-title-group max-w-2xl mb-16">
          <p className="text-sm font-mono text-[#4DFFB4]/60 mb-4 tracking-widest uppercase">
            Produto Nexvia
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Já construímos o nosso próprio produto.
          </h2>
          <p className="text-xl text-white/50">
            A Nexvia não vende só serviços. Desenvolve produtos reais para o setor da saúde.
          </p>
        </div>

        {/* Card principal com layout dividido */}
        <div
          ref={cardRef}
          className="relative bg-[#0d1117] border border-[#4DFFB4]/15 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(77,255,180,0.03)]"
        >
          <div className="grid md:grid-cols-2">
            
            {/* Coluna da esquerda - Texto e informação */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              
              {/* Logo VetScribe */}
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="/images/vetscribe-icon.png" 
                  alt="VetScribe" 
                  className="h-35 w-auto"
                />
                <img 
                  src="/images/vetscribe-logo.png" 
                  alt="VetScribe" 
                  className="h-30 w-auto"
                />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DFFB4]/10 text-[#4DFFB4] border border-[#4DFFB4]/20 text-sm font-medium mb-6 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#4DFFB4] animate-pulse" />
                Disponível agora
              </div>

              {/* Descrição */}
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                Grava a consulta e a IA gera automaticamente o prontuário SOAP, 
                relatórios para tutores e atestados. Transforma áudio, notas e 
                documentos em relatórios completos com templates personalizáveis.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["IA", "Veterinária", "Automação", "SOAP", "Templates"].map(tag => (
                  <span 
                    key={tag} 
                    className="vet-tag px-3 py-1 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Botão CTA */}
              <a
                href="https://meeting-humanizer-v2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4DFFB4] text-black font-semibold rounded-xl hover:bg-[#3ddb9a] transition-all w-fit text-sm"
                data-testid="link-vetscribe"
              >
                Experimentar VetScribe
                <ExternalLink size={16} />
              </a>
            </div>

            {/* Coluna da direita - Screenshot */}
            <div 
              ref={screenshotRef}
              className="relative bg-[#0a0f0a] p-4 md:p-6 flex items-center justify-center border-l border-[#4DFFB4]/10"
            >
              {/* Efeito de brilho atrás da imagem */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,255,180,0.06)_0%,transparent_70%)]" />
              
              {/* Screenshot */}
              <div className="relative rounded-xl overflow-hidden shadow-[0_0_40px_rgba(77,255,180,0.1)] border border-[#4DFFB4]/20">
                <img 
                  src="/images/vetscribe-screenshot.png" 
                  alt="Interface do VetScribe"
                  className="w-full h-auto max-h-[500px] object-contain"
                />
                
                {/* Barras de janela falsas (estilo macOS) */}
                <div className="absolute top-0 left-0 right-0 h-7 bg-[#1a1f1a] flex items-center gap-1.5 px-3 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>
            </div>
          </div>

          {/* Linha decorativa no topo */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4DFFB4]/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
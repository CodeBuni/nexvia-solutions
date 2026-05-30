import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Animação de entrada (linha do tempo)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headlineRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.3 }
    )
      .fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.7"
      )
      .fromTo(
        btnRef.current,
        { y: 40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
        "-=0.5"
      );

    // Parallax do gradiente de fundo
    gsap.to(".hero-bg", {
      backgroundPosition: "50% 100%",
      scale: 1.3,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // Efeito 3D de afastamento no conteúdo com PIN
    gsap.to(contentWrapperRef.current, {
      scale: 0.3,
      z: -600,
      rotateX: 10,
      opacity: 0,
      filter: "blur(8px)",
      ease: "power2.in",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
        anticipatePin: 0.5,
        pinSpacing: true,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-[#0A0A0F]"
      style={{ perspective: "1200px" }}
    >
      {/* Fundo com gradiente animado */}
      <div
        className="absolute inset-0 z-0 hero-bg"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(79,110,247,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(123,94,248,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(0,194,255,0.08) 0%, transparent 50%),
            linear-gradient(180deg, #0A0A0F 0%, #12121a 50%, #0A0A0F 100%)
          `,
          backgroundSize: "cover",
        }}
      />

      {/* Camada do Coração Gigante, Linha de ECG Infinita e Desfoques */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Glow de fundo sincronizado com o batimento */}
        <div className="absolute w-[600px] h-[600px] bg-primary/10 blur-[130px] rounded-full animate-heartbeat-glow" />

        {/* SVG Unificado com largura total (w-full) de ponta a ponta da tela */}
        <svg
          viewBox="0 0 1920 600"
          className="absolute w-full h-[44rem] text-primary/15 animate-heartbeat"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          {/* Coração Centralizado no Canvas Expandido (X: 960) */}
          <path
            d="M960 430C960 430 780 295 780 205C780 149.56 823.56 106 879 106C910.32 106 940.38 120.58 960 143.62C979.62 120.58 1009.68 106 1041 106C1096.44 106 1140 149.56 1140 205C1140 295 960 430 960 430Z"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Linha de Monitor Médico (ECG) BRANCA - AGORA DE 0 A 1920 (TELA INTEIRA) */}
          <path
            d="M 0 320 L 780 320 L 800 295 L 820 345 L 840 320 L 910 320 L 925 210 L 945 430 L 965 270 L 980 320 L 1010 320 L 1025 285 L 1040 340 L 1055 320 L 1920 320"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/70 animate-ecg-line"
            style={{
              strokeDasharray: "2500",
              strokeDashoffset: "2500",
              filter: "drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.6))"
            }}
          />
        </svg>

        {/* Máscara de Desfoque Transparente Avançada (Filtro para destacar o texto à frente) */}
        <div 
          className="absolute inset-0 backdrop-blur-[7px] mix-blend-normal opacity-[0.97]"
          style={{
            maskImage: "radial-gradient(circle at center, black 15%, rgba(0,0,0,0.7) 45%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 15%, rgba(0,0,0,0.7) 45%, transparent 75%)"
          }}
        />
      </div>

      {/* Wrapper 3D Content */}
      <div
        ref={contentWrapperRef}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 tracking-tight opacity-0 text-white"
        >
          Automação que enche a agenda.
          <br className="hidden md:block" />
          <span className="text-primary text-glow-primary font-extrabold">
            Crescimento
          </span>{" "}
          que fica.
        </h1>

        <p
          ref={subheadRef}
          className="text-lg md:text-xl text-muted-foreground/90 mb-10 max-w-2xl opacity-0 font-light"
        >
          Ajudamos clínicas de saúde privada a automatizar processos, reter
          pacientes e crescer de forma previsível.
        </p>

        {/* Botão Otimizado no Estilo NEO-BRUTALISTA */}
        <a
          ref={btnRef}
          href="#contacto"
          className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-xl text-white bg-primary rounded-xl border-2 border-primary transition-transform duration-150 active:translate-x-[3px] active:translate-y-[3px] opacity-0 neo-brutalism-shadow"
          data-testid="button-hero-cta"
        >
          Quero saber mais
        </a>
      </div>

      <style>{`
        /* Pulsação orgânica do coração */
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          22% { transform: scale(1.05); opacity: 1; }
          32% { transform: scale(1.01); }
          45% { transform: scale(1.03); opacity: 0.9; }
        }

        /* Expansão sutil do glow de fundo */
        @keyframes heartbeatGlow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          22% { transform: scale(1.18); opacity: 0.9; }
          45% { transform: scale(1.08); opacity: 0.7; }
        }

        /* Movimento contínuo e infinito da linha do monitor médico de ponta a ponta */
        @keyframes ecgPulse {
          0% { stroke-dashoffset: 2500; }
          100% { stroke-dashoffset: -2500; }
        }

        .animate-heartbeat {
          animation: heartbeat 2.2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }

        .animate-heartbeat-glow {
          animation: heartbeatGlow 2.2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }

        .animate-ecg-line {
          animation: ecgPulse 4.5s linear infinite;
        }
        
        .text-glow-primary {
          text-shadow: 0 0 40px rgba(79, 110, 247, 0.35);
        }

        /* Efeito Neo-Brutalist: Sombra sólida, limpa e bem definida */
        .neo-brutalism-shadow {
          box-shadow: 6px 6px 0px 0px #030305, 6px 6px 0px 2px #4F6EF7;
        }
        
        .neo-brutalism-shadow:hover {
          transform: translate(2px, 2px);
          box-shadow: 4px 4px 0px 0px #030305, 4px 4px 0px 2px #4F6EF7;
        }

        .neo-brutalism-shadow:active {
          transform: translate(6px, 6px);
          box-shadow: 0px 0px 0px 0px transparent;
        }
      `}</style>
    </section>
  );
}
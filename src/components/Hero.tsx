import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { VETSCRIBE_TRIAL_MONTHS, VETSCRIBE_URL } from "../lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      brandRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        headlineRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1 },
        "-=0.4"
      )
      .fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.7"
      )
      .fromTo(
        ctaRef.current,
        { y: 40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
        "-=0.5"
      );

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-[#08090e]"
      style={{ perspective: "1200px" }}
    >
      <div
        className="absolute inset-0 z-0 hero-bg"
        style={{
          background: `
            radial-gradient(ellipse at 18% 42%, rgba(61,99,240,0.16) 0%, transparent 52%),
            radial-gradient(ellipse at 82% 18%, rgba(58,160,255,0.09) 0%, transparent 48%),
            radial-gradient(ellipse at 50% 88%, rgba(56,189,248,0.06) 0%, transparent 46%),
            linear-gradient(180deg, #08090e 0%, #0f121a 50%, #08090e 100%)
          `,
          backgroundSize: "cover",
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-primary/10 blur-[130px] rounded-full animate-heartbeat-glow" />

        <svg
          viewBox="0 0 1920 600"
          className="absolute w-full h-[44rem] text-primary/15 animate-heartbeat"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            d="M960 430C960 430 780 295 780 205C780 149.56 823.56 106 879 106C910.32 106 940.38 120.58 960 143.62C979.62 120.58 1009.68 106 1041 106C1096.44 106 1140 149.56 1140 205C1140 295 960 430 960 430Z"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 0 320 L 780 320 L 800 295 L 820 345 L 840 320 L 910 320 L 925 210 L 945 430 L 965 270 L 980 320 L 1010 320 L 1025 285 L 1040 340 L 1055 320 L 1920 320"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/70 animate-ecg-line"
            style={{
              strokeDasharray: "2500",
              strokeDashoffset: "2500",
              filter: "drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.6))",
            }}
          />
        </svg>

        <div
          className="absolute inset-0 backdrop-blur-[7px] mix-blend-normal opacity-[0.97]"
          style={{
            maskImage:
              "radial-gradient(circle at center, black 15%, rgba(0,0,0,0.7) 45%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 15%, rgba(0,0,0,0.7) 45%, transparent 75%)",
          }}
        />
      </div>

      <div
        ref={contentWrapperRef}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <p
          ref={brandRef}
          className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white opacity-0 mb-5"
        >
          Nexvia
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold leading-[1.15] mb-6 tracking-tight opacity-0 text-white/95"
        >
          VetScribe: documentação veterinária com{" "}
          <span className="text-primary font-bold">IA</span>
        </h1>

        <p
          ref={subheadRef}
          className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl opacity-0 font-medium leading-relaxed"
        >
          Grava a consulta, gera SOAP e relatórios automaticamente.
          {VETSCRIBE_TRIAL_MONTHS} meses grátis para clínicas. Também construímos
          automação para saúde privada.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-3 opacity-0"
        >
          <a
            href={VETSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-cta group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base md:text-lg"
            data-testid="button-hero-cta"
          >
            Começar {VETSCRIBE_TRIAL_MONTHS} meses grátis
            <ExternalLink size={16} />
          </a>
          <a
            href="#contacto"
            className="neo-cta-ghost inline-flex items-center justify-center px-7 py-3.5 text-sm md:text-base"
          >
            Falar com a Nexvia
          </a>
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); opacity: 0.45; }
          22% { transform: scale(1.03); opacity: 0.75; }
          32% { transform: scale(1.01); }
          45% { transform: scale(1.02); opacity: 0.6; }
        }

        @keyframes heartbeatGlow {
          0%, 100% { transform: scale(1); opacity: 0.28; }
          22% { transform: scale(1.1); opacity: 0.55; }
          45% { transform: scale(1.04); opacity: 0.4; }
        }

        @keyframes ecgPulse {
          0% { stroke-dashoffset: 2500; }
          100% { stroke-dashoffset: -2500; }
        }

        .animate-heartbeat {
          animation: heartbeat 2.4s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }

        .animate-heartbeat-glow {
          animation: heartbeatGlow 2.4s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }

        .animate-ecg-line {
          animation: ecgPulse 5s linear infinite;
        }
      `}</style>
    </section>
  );
}

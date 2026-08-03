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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-[#0A0A0F]"
      style={{ perspective: "1200px" }}
    >
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
          className="font-display text-4xl md:text-6xl font-black tracking-tight text-white opacity-0 mb-4"
        >
          Nexvia
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight opacity-0 text-white"
        >
          VetScribe: documentação veterinária com{" "}
          <span className="text-primary text-glow-primary font-extrabold">IA</span>
        </h1>

        <p
          ref={subheadRef}
          className="text-lg md:text-xl text-muted-foreground/90 mb-10 max-w-2xl opacity-0 font-light"
        >
          Grava a consulta, gera SOAP e relatórios automaticamente.
          {VETSCRIBE_TRIAL_MONTHS} meses grátis para clínicas. Também construímos
          automação para saúde privada.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-4 opacity-0"
        >
          <a
            href={VETSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 font-black text-xl text-white bg-primary rounded-xl border-2 border-primary transition-transform duration-150 active:translate-x-[3px] active:translate-y-[3px] neo-brutalism-shadow"
            data-testid="button-hero-cta"
          >
            Começar {VETSCRIBE_TRIAL_MONTHS} meses grátis
            <ExternalLink size={18} />
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-base text-white/80 border-2 border-white/20 rounded-xl hover:border-white/40 hover:text-white transition-colors"
          >
            Falar com a Nexvia
          </a>
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          22% { transform: scale(1.05); opacity: 1; }
          32% { transform: scale(1.01); }
          45% { transform: scale(1.03); opacity: 0.9; }
        }

        @keyframes heartbeatGlow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          22% { transform: scale(1.18); opacity: 0.9; }
          45% { transform: scale(1.08); opacity: 0.7; }
        }

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

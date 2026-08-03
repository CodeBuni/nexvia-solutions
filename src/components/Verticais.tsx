import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Stethoscope,
  HeartPulse,
  Brain,
  Bone,
  Eye,
  Syringe,
  Activity,
  PawPrint,
  Pill,
  Baby,
  Scan,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Verticais() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      
      gsap.fromTo(
        ".vert-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".vert-subtitle",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
          },
        }
      );

      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = trackWidth - viewportWidth + 120;

      if (scrollDistance > 0) {
        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${scrollDistance * 2.5}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 0.5,
            pinSpacing: true,
          },
        });
      }

    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  const specialities = [
    { icon: Stethoscope, name: "Clínica Geral" },
    { icon: HeartPulse, name: "Cardiologia" },
    { icon: Brain, name: "Psicologia" },
    { icon: Bone, name: "Fisioterapia" },
    { icon: Eye, name: "Oftalmologia" },
    { icon: Syringe, name: "Estética Médica" },
    { icon: Activity, name: "Medicina Dentária" },
    { icon: PawPrint, name: "Veterinária" },
    { icon: Pill, name: "Farmácias" },
    { icon: Baby, name: "Pediatria" },
    { icon: Scan, name: "Radiologia" },
    { icon: Users, name: "Obstetrícia" },
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative overflow-hidden bg-[#0A0A0F]"
      style={{ minHeight: "100vh" }}
    >
      <div className="flex flex-col justify-center min-h-screen py-24">
        
        <div className="mb-20 px-8">
          <p className="vert-subtitle text-xs font-mono text-primary/60 tracking-[0.15em] uppercase mb-4">
            Especialidades
          </p>
          <h2 className="vert-title font-display text-4xl md:text-6xl font-black text-white leading-none">
            A sua clínica<br />também está aqui.
          </h2>
        </div>

        <div className="relative">
          
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10 pointer-events-none" />

          <div 
            ref={trackRef}
            className="flex gap-3 md:gap-4 px-8"
            style={{ willChange: "transform" }}
          >
            {specialities.map((spec, i) => (
              <div
                key={i}
                className={`
                  group relative flex-shrink-0
                  w-48 md:w-56 h-56 md:h-64
                  bg-[#0d0d14] 
                  border-2 border-white/5
                  hover:border-primary/40
                  transition-all duration-300
                  flex flex-col items-center justify-center
                  gap-4
                `}
              >
                <span className="absolute top-3 left-3 font-mono text-xs text-white/10">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <spec.icon className="w-8 h-8 md:w-10 md:h-10 text-primary/80 group-hover:text-primary transition-colors duration-300" />

                <h3 className="font-display text-sm md:text-base font-bold text-white/70 group-hover:text-white transition-colors duration-300 text-center px-4 leading-tight">
                  {spec.name}
                </h3>

                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
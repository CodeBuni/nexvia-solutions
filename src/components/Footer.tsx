import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-white/5 bg-[#050508] pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4" data-testid="link-footer-logo">
              <img 
                src="/images/logo-full.png" 
                alt="Nexvia" 
                className="h-40 w-auto object-contain"  // altura fixa, largura automática
              />
            </Link>
            <p className="text-white/40 max-w-sm text-sm">
              Automação e crescimento para clínicas de saúde privada.
            </p>
          </div>

          <div className="flex gap-8">
            <a href="#servicos" className="text-white/50 hover:text-white transition-colors text-sm" data-testid="link-footer-servicos">Serviços</a>
            <a href="#vetscribe" className="text-white/50 hover:text-white transition-colors text-sm" data-testid="link-footer-vetscribe">VetScribe</a>
            <a href="#contacto" className="text-white/50 hover:text-white transition-colors text-sm" data-testid="link-footer-contacto">Contacto</a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
          <p>© {new Date().getFullYear()} Nexvia. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="mailto:gkmarcosbonifacio@gmail.com" className="hover:text-white/50 transition-colors">Email</a>
            <a href="https://wa.me/351928116313" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
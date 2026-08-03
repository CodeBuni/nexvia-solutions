import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: isScrolled ? "rgba(10, 10, 15, 0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        borderBottom: isScrolled
          ? "1px solid rgba(255,255,255,0.05)"
          : "1px solid transparent",
        duration: 0.3,
      });
    }
  }, [isScrolled]);

  const links = [
    { href: "#vetscribe", label: "VetScribe", testId: "link-nav-vetscribe" },
    { href: "#pricing", label: "Preços", testId: "link-nav-pricing" },
    { href: "#servicos", label: "Serviços", testId: "link-nav-servicos" },
  ];

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 transition-all">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 relative z-10" data-testid="link-logo">
          <img
            src="/images/logo-icon.png"
            alt=""
            className="h-10 w-auto object-contain"
          />
          <img
            src="/images/logo-text.png"
            alt="Nexvia"
            className="h-8 w-auto object-contain hidden sm:block"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
              data-testid={link.testId}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contacto"
            className="text-white bg-primary border-2 border-black px-5 py-2.5 rounded-xl font-black text-sm transition-transform duration-150 active:translate-x-[2px] active:translate-y-[2px] nav-neo-shadow"
            data-testid="link-nav-contacto"
          >
            Contacto
          </a>
        </div>

        <button
          className="md:hidden text-white border-2 border-black bg-white/5 p-2 rounded-xl active:translate-x-[1px] active:translate-y-[1px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0A0A0F]/95 backdrop-blur-md border-b-4 border-black py-6 px-6 flex flex-col gap-6 md:hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="text-center text-lg font-black text-white bg-primary border-2 border-black py-3 rounded-xl active:translate-y-[2px] nav-neo-shadow"
          >
            Contacto
          </a>
        </div>
      )}

      <style>{`
        .nav-neo-shadow {
          box-shadow: 4px 4px 0px 0px #030305, 4px 4px 0px 1px #4F6EF7;
        }

        .nav-neo-shadow:hover {
          transform: translate(1px, 1px);
          box-shadow: 3px 3px 0px 0px #030305, 3px 3px 0px 1px #4F6EF7;
        }

        .nav-neo-shadow:active {
          transform: translate(4px, 4px);
          box-shadow: 0px 0px 0px 0px transparent;
        }
      `}</style>
    </nav>
  );
}

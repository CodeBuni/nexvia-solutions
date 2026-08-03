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
        backgroundColor: isScrolled ? "rgba(8, 9, 14, 0.88)" : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        borderBottom: isScrolled
          ? "1px solid rgba(255,255,255,0.06)"
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
        <Link href="/" className="flex items-center gap-2.5 relative z-10" data-testid="link-logo">
          <img
            src="/images/logo-icon.png"
            alt=""
            className="h-9 w-auto object-contain"
          />
          <img
            src="/images/logo-text.png"
            alt="Nexvia"
            className="h-7 w-auto object-contain hidden sm:block"
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
            className="neo-cta px-5 py-2.5 text-sm"
            data-testid="link-nav-contacto"
          >
            Contacto
          </a>
        </div>

        <button
          className="md:hidden text-white border border-white/15 bg-white/[0.04] p-2 rounded-xl hover:border-white/30 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#08090e]/95 backdrop-blur-md border-b border-white/10 py-6 px-6 flex flex-col gap-5 md:hidden shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="neo-cta text-center text-base py-3"
          >
            Contacto
          </a>
        </div>
      )}
    </nav>
  );
}

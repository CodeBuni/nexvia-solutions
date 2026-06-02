import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Problema } from "./components/Problema";
import { Solucao } from "./components/Solucao";
import { Verticais } from "./components/Verticais";
import { VetScribe } from "./components/VetScribe";
import { Pricing } from "./components/Pricing";
import { SocialProof } from "./components/SocialProof";
import { CtaFinal } from "./components/CtaFinal";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { Chatbot } from "./components/Chatbot";
import { AgendarReuniao } from "./components/AgendarReuniao";

import "./components/ui/cursor-hover-effect";
import { useCinematicScroll } from "./hooks/useCinematicScroll";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showScheduler, setShowScheduler] = useState(false);
  
  // Scroll suave + sincronização com ScrollTrigger
  useCinematicScroll();

  useEffect(() => {
    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onRefresh);
    return () => window.removeEventListener("resize", onRefresh);
  }, []);

  // Fechar modal com Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowScheduler(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div id="topo" className="neo-shell grain-bg min-h-screen bg-background text-foreground dark">
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Problema />
        <Solucao />
        <Verticais />
        <VetScribe />
        <Pricing />
        <SocialProof />
        <CtaFinal />
      </main>
      <Footer />

      {/* Modal de Agendamento */}
      {showScheduler && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowScheduler(false);
          }}
        >
          <div className="relative w-full max-w-md bg-[#0A0A0F] border-2 border-white/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowScheduler(false)}
              className="absolute top-3 right-3 w-8 h-8 border-2 border-white/10 flex items-center justify-center hover:border-primary/50 text-white/40 hover:text-white transition-colors z-10"
              aria-label="Fechar"
            >
              ✕
            </button>
            <AgendarReuniao />
          </div>
        </div>
      )}

      {/* Chatbot sempre presente */}
      <Chatbot onAgendarReuniao={() => setShowScheduler(true)} />
    </div>
  );
}
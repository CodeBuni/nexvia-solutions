import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
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
import { PrivacidadePage, TermosPage } from "./pages/LegalPage";

import "./components/ui/cursor-hover-effect";
import { useCinematicScroll } from "./hooks/useCinematicScroll";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [showScheduler, setShowScheduler] = useState(false);

  useCinematicScroll();

  useEffect(() => {
    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onRefresh);
    return () => window.removeEventListener("resize", onRefresh);
  }, []);

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

      {showScheduler && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowScheduler(false);
          }}
        >
          <div className="relative w-full max-w-md bg-[#08090e] border border-white/10 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowScheduler(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:border-primary/50 text-white/40 hover:text-white transition-colors z-10"
              aria-label="Fechar"
            >
              ✕
            </button>
            <AgendarReuniao />
          </div>
        </div>
      )}

      <Chatbot onAgendarReuniao={() => setShowScheduler(true)} />
    </div>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path="/privacidade" component={PrivacidadePage} />
      <Route path="/termos" component={TermosPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
}

import { useEffect } from "react";
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

import "./components/ui/cursor-hover-effect";

import { useCinematicScroll } from "./hooks/useCinematicScroll";

gsap.registerPlugin(ScrollTrigger);



  // ScrollStoryChrome removido (barra de progresso e rail lateral)

export default function App() { 
  // Scroll suave + sincronização com ScrollTrigger
  useCinematicScroll();

  useEffect(() => {
    // Mantém o efeito de atualização global do ScrollTrigger caso necessário
    // (e evita que alguma animação dependa de um update manual.)
    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onRefresh);
    return () => window.removeEventListener("resize", onRefresh);
  }, []);

  return (

    <div id="topo" className="neo-shell grain-bg min-h-screen bg-background text-foreground dark">
      {/* Barra de progresso removida conforme pedido */}
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
    </div>
  );
}

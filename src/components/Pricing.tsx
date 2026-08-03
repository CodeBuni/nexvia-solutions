import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Clock,
  Check,
  HelpCircle,
  Calendar,
  Shield,
  Sparkles,
  X,
  ExternalLink,
  Gift,
} from "lucide-react";
import { AgendarReuniao } from "./AgendarReuniao";
import { VETSCRIBE_TRIAL_MONTHS, VETSCRIBE_URL } from "../lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const meetingCardRef = useRef<HTMLDivElement>(null);
  const decorationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showScheduler, setShowScheduler] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [".pricing-kicker", ".pricing-title", ".vetscribe-price-card"],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 75%" },
        }
      );

      decorationRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            delay: 0.2 + i * 0.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: container, start: "top 75%" },
          }
        );
      });

      gsap.fromTo(
        ".price-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsContainerRef.current, start: "top 70%" },
        }
      );

      if (meetingCardRef.current) {
        gsap.fromTo(
          meetingCardRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: { trigger: meetingCardRef.current, start: "top 80%" },
          }
        );
      }

      gsap.fromTo(
        ".geo-element",
        { opacity: 0, rotation: -45, scale: 0 },
        {
          opacity: 0.12,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 80%" },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const packages = [
    {
      title: "Website",
      copy: "Estar online. Nada mais.",
      setup: "€497",
      monthly: "€0",
      target: 'Clínicas que querem "estar online"',
      features: [
        "Website informativo (5 páginas)",
        "Responsive design",
        "Integração Google Maps",
        "Botão WhatsApp simples",
        "SSL + Hosting 12 meses",
        "Sem suporte contínuo",
      ],
      isRecommended: false,
    },
    {
      title: "Automação Profissional",
      copy: "Crescer de forma automatizada.",
      setup: "€1.180",
      monthly: "€350",
      target: "Clínicas que querem crescimento real e medido",
      features: [
        "Website premium (design personalizado)",
        "Chatbot com IA (WhatsApp + email)",
        "Agendamento automático integrado",
        "Lembretes SMS/email pré-consulta",
        "Follow-up automático pós-consulta",
        "Dashboard KPI (faltas, receita, etc)",
        "Integração CRM básico + Reativação de inativos",
        "Suporte técnico 5 dias/semana",
        "Otimização SEO local + 2 atualizações/mês",
      ],
      isRecommended: true,
    },
    {
      title: "Nexvia Enterprise",
      copy: "Crescimento constante. Sem limite.",
      setup: "€4.397",
      monthly: "€1.400",
      target: "Clínicas que querem ser referência e crescer 10x",
      features: [
        "Software SaaS Personalizado",
        "Múltiplas integrações",
        "API custom para sistemas legados",
        "Automações multi-canal & Analytics avançado",
        "Sistema de fidelização e referências automático",
        "Gestão de reputação (reviews automáticos)",
        "A/B testing de mensagens & Previsão de churn",
        "Consultor dedicado (1h/semana) + Suporte 24/5",
        "Customizações ilimitadas & Novas features incluídas",
      ],
      isRecommended: false,
    },
  ];

  return (
    <>
      <section
        id="pricing"
        ref={containerRef}
        className="relative px-6 py-32 md:py-44 bg-[#0A0A0F] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="geo-element absolute top-16 left-12 w-20 h-20 border-4 border-primary/20 rotate-12" />
          <div className="geo-element absolute top-32 right-16 w-14 h-14 border-4 border-primary/20 -rotate-6" />
          <div className="geo-element absolute bottom-24 left-20 w-24 h-24 border-4 border-primary/10 rotate-45" />
          <div className="geo-element absolute bottom-12 right-12 w-16 h-16 border-4 border-white/10 -rotate-12" />

          <div
            ref={(el) => {
              decorationRefs.current[0] = el;
            }}
            className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-12 text-center lg:text-left">
            <p className="pricing-kicker text-sm font-mono text-primary/70 mb-4 tracking-widest uppercase">
              Preços
            </p>
            <h2 className="pricing-title font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05]">
              Comece pelo VetScribe.{" "}
              <span className="text-primary">Escale com a Nexvia.</span>
            </h2>
          </div>

          {/* VetScribe product offer */}
          <div className="vetscribe-price-card relative mb-20 bg-[#0d1117] border-2 border-[#4DFFB4]/30 rounded-2xl p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4DFFB4]/40 to-transparent" />
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-lg bg-[#4DFFB4]/10 border border-[#4DFFB4]/25 text-[#4DFFB4] text-xs font-bold uppercase tracking-wider">
                  <Gift size={14} />
                  Produto · VetScribe
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                  {VETSCRIBE_TRIAL_MONTHS} meses grátis para começar
                </h3>
                <p className="text-white/60 text-base md:text-lg mb-6 max-w-xl">
                  Em teste com clínicas selecionadas — e disponível para a sua
                  clínica com período inicial gratuito. Depois do trial, o plano
                  comercial é definido connosco (sem surpresas).
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Prontuário SOAP gerado por IA",
                    "Relatórios para tutores e atestados",
                    "Templates personalizáveis",
                    "Acesso imediato à app",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                      <Check size={16} className="text-[#4DFFB4] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={VETSCRIBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#4DFFB4] text-black font-black rounded-xl hover:bg-[#3ddb9a] transition-all"
                    data-testid="button-pricing-vetscribe"
                  >
                    Começar {VETSCRIBE_TRIAL_MONTHS} meses grátis
                    <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => setShowScheduler(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-white/15 text-white font-bold rounded-xl hover:border-white/30 transition-all"
                  >
                    Agendar demo
                    <Calendar size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center md:text-left">
                <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                  Período experimental
                </p>
                <p className="text-5xl font-black text-white mb-1">€0</p>
                <p className="text-sm text-white/50 mb-4">
                  durante {VETSCRIBE_TRIAL_MONTHS} meses
                </p>
                <p className="text-xs text-white/40 leading-relaxed">
                  Sem cartão obrigatório no site. Após o período gratuito,
                  contactamo-lo para o plano adequado à sua clínica.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              Serviços de automação para clínicas
            </h3>
            <p className="text-white/50 text-sm md:text-base">
              Planos de referência para websites e automação — à parte do VetScribe.
            </p>
          </div>

          <div ref={cardsContainerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`price-card relative flex flex-col justify-between bg-[#0d0d14] rounded-xl p-8 border-4 transition-all duration-300 ${
                  pkg.isRecommended
                    ? "border-primary shadow-[8px_8px_0px_0px_#040407,8px_8px_0px_2px_#4F6EF7]"
                    : "border-white/10 hover:border-white/20 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)]"
                }`}
              >
                {pkg.isRecommended && (
                  <div className="absolute -top-5 left-6 inline-flex items-center gap-1 px-4 py-1.5 border-2 border-black bg-primary rounded-lg -rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] font-black text-white tracking-wider uppercase">
                      ⭐ MELHOR ESCOLHA
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-black text-white">{pkg.title}</h3>
                  <p className="text-sm font-medium text-primary mt-1 font-mono">
                    "{pkg.copy}"
                  </p>

                  <div className="my-6 pt-4 border-t border-white/5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white">{pkg.setup}</span>
                      <span className="text-xs font-bold text-white/50 uppercase font-mono">
                        Setup (Uma vez)
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-2xl font-black text-white/90">{pkg.monthly}</span>
                      <span className="text-xs font-bold text-white/50 uppercase font-mono">
                        / mês
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-white/40 bg-white/5 rounded-md px-3 py-2 border border-white/5 mb-6">
                    Target: {pkg.target}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-white/70">
                        <Check size={16} className="text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setShowScheduler(true)}
                  className={`w-full inline-flex items-center justify-center gap-2 py-4 font-black text-center rounded-xl border-2 transition-all active:translate-x-[2px] active:translate-y-[2px] ${
                    pkg.isRecommended
                      ? "bg-primary text-white border-primary hover:bg-primary/90"
                      : "bg-transparent text-white border-white/20 hover:bg-white/5"
                  }`}
                >
                  Selecionar Plano
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          <div
            ref={meetingCardRef}
            className="relative max-w-4xl mx-auto bg-[#12121f] border-4 border-dashed border-white/20 rounded-xl p-8 md:p-12 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-6">
              <HelpCircle size={24} className="text-primary" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
              Precisa de algo feito à medida para a sua estrutura?
            </h3>

            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Estes pacotes servem como exemplos de referência base. É
              recomendado agendar uma reunião rápida para avaliar necessidades e
              desenhar um orçamento cirúrgico.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
              <button
                onClick={() => setShowScheduler(true)}
                className="inline-flex items-center gap-3 px-8 py-5 bg-primary text-white font-black text-lg rounded-xl border-2 border-primary transition-transform duration-150 active:translate-x-[3px] active:translate-y-[3px] neo-btn-shadow cursor-pointer"
              >
                <Calendar size={20} />
                Agendar Reunião de Diagnóstico
                <ArrowRight size={20} />
              </button>

              <div className="flex items-center gap-2 text-white/50 text-xs font-bold font-mono bg-white/5 px-3 py-1.5 border border-white/10 rounded-md">
                <Clock size={14} className="text-primary" />
                <span> Confirmação imediata por WhatsApp e Email </span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-3 text-white/40 text-xs md:text-sm font-medium bg-[#12121f] px-4 py-2 border border-white/10 rounded-lg">
              <Shield size={16} className="text-primary" />
              <span>
                Ao agendar, irá receber os detalhes da reunião e o link da sala
                instantaneamente.
              </span>
            </div>
          </div>
        </div>

        <style>{`
          .neo-btn-shadow {
            box-shadow: 5px 5px 0px 0px #040407, 5px 5px 0px 2px #4F6EF7;
          }
          .neo-btn-shadow:hover {
            transform: translate(1px, 1px);
            box-shadow: 4px 4px 0px 0px #040407, 4px 4px 0px 2px #4F6EF7;
          }
          .neo-btn-shadow:active {
            transform: translate(5px, 5px);
            box-shadow: 0px 0px 0px 0px transparent;
          }
        `}</style>
      </section>

      {showScheduler && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0A0F] border-2 border-white/10 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setShowScheduler(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
            <AgendarReuniao />
          </div>
        </div>
      )}
    </>
  );
}

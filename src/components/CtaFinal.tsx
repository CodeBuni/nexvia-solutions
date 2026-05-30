import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export function CtaFinal() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = "351928116313";
  const WHATSAPP_MESSAGE = encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços da Nexvia para a minha clínica.");
  const FORM_ACTION = "https://formspree.io/f/SEU_FORM_ID"; // Substituir pelo ID real

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.fromTo(
        ".cta-title, .cta-sub",
        { opacity: 0, y: 50, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.5,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".whatsapp-card",
        { opacity: 0, x: 60, rotate: 2 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 0.8,
          delay: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contacto" ref={containerRef} className="relative py-32 overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.08)_0%,transparent_60%)] pointer-events-none"
      />
      <div className="noise-overlay" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="cta-title font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            A sua clínica pode crescer de forma previsível.
          </h2>
          <p className="cta-sub text-xl md:text-2xl text-muted-foreground">
            Fale connosco. Sem compromisso.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          <form
            ref={formRef}
            action={FORM_ACTION}
            method="POST"
            className="md:col-span-3 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">Nome</label>
              <input
                type="text"
                name="name"
                required
                className="glass-input w-full"
                placeholder="O seu nome"
                data-testid="input-name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">Email</label>
              <input
                type="email"
                name="email"
                required
                className="glass-input w-full"
                placeholder="o.seu@email.com"
                data-testid="input-email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">Tipo de Clínica</label>
              <select
                name="clinicType"
                className="glass-input w-full [&>option]:bg-card"
                data-testid="select-clinic-type"
                defaultValue=""
              >
                <option value="" disabled hidden>Selecione uma opção...</option>
                <option value="dentista">Dentista</option>
                <option value="estetica">Estética Médica</option>
                <option value="fisioterapia">Fisioterapia</option>
                <option value="psicologia">Psicologia</option>
                <option value="veterinaria">Veterinária</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">Mensagem (opcional)</label>
              <textarea
                name="message"
                className="glass-input w-full min-h-[120px] resize-y"
                placeholder="Como podemos ajudar?"
                data-testid="input-message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:glow-primary transition-all active:scale-[0.98]"
              data-testid="button-submit-contact"
            >
              Enviar mensagem <Send size={18} />
            </button>
          </form>

          <div className="md:col-span-2 flex flex-col justify-center whatsapp-card">
            <div className="bg-card/50 border border-white/10 p-8 rounded-2xl">
              <h3 className="font-bold text-xl mb-4">Mais rápido pelo WhatsApp?</h3>
              <p className="text-muted-foreground mb-8">
                Envie-nos uma mensagem diretamente. Respondemos habitualmente em poucas horas úteis.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg hover:glow-primary transition-all"
                data-testid="button-whatsapp"
              >
                <FaWhatsapp size={24} /> Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
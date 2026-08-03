import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT, VETSCRIBE_TRIAL_MONTHS } from "../lib/constants";

gsap.registerPlugin(ScrollTrigger);

const WEBHOOK_URL = "https://hook.eu1.make.com/mtuy5be6xkgl2jj68qmihqwhqxlktjra";
const WHATSAPP_NUMBER = CONTACT.phoneE164;
const WHATSAPP_MESSAGE = CONTACT.whatsappMessage;

export function CtaFinal() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const dados = {
      nome: formData.get("name"),
      email: formData.get("email"),
      tipoClinica: formData.get("clinicType"),
      mensagem: formData.get("message"),
      origem: "Formulário de Contacto - Site Nexvia",
      data: new Date().toISOString(),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        setEnviado(true);
        form.reset();
      }
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
    } finally {
      setLoading(false);
    }
  };

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
            Pronto para o VetScribe — ou para automatizar a clínica.
          </h2>
          <p className="cta-sub text-xl md:text-2xl text-muted-foreground">
            {VETSCRIBE_TRIAL_MONTHS} meses grátis no VetScribe. Fale connosco sem compromisso.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {enviado ? (
            <div className="md:col-span-3 flex flex-col items-center justify-center text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Mensagem enviada!</h3>
              <p className="text-white/60">Respondemos em até 24h úteis.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
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
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:glow-primary transition-all active:scale-[0.98] disabled:opacity-50"
                data-testid="button-submit-contact"
              >
                {loading ? "A enviar..." : <>Enviar mensagem <Send size={18} /></>}
              </button>
            </form>
          )}

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
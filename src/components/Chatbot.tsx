import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Calendar,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  CONTACT,
  VETSCRIBE_TRIAL_MONTHS,
  VETSCRIBE_URL,
} from "../lib/constants";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const SYSTEM_PROMPT = `Tu és o assistente virtual da Nexvia, uma empresa portuguesa de automação e tecnologia para clínicas de saúde privada.

**CONTEXTO DA EMPRESA:**
- Contacto: ${CONTACT.phoneDisplay}
- Email: ${CONTACT.email}
- Especialidades: clínicas dentárias, estética médica, fisioterapia, psicologia, veterinária, e outras.

**PRODUTO PRINCIPAL — VetScribe:**
- IA para clínicas veterinárias que gera prontuários SOAP, relatórios para tutores e atestados.
- Em teste com clínicas selecionadas.
- ${VETSCRIBE_TRIAL_MONTHS} meses grátis para começar.
- App: ${VETSCRIBE_URL}
- Depois do período gratuito, o plano comercial é acordado com a Nexvia.

**SERVIÇOS E PREÇOS (à parte do VetScribe):**

Plano Website — €497 (setup único)
- Website informativo de 5 páginas, design responsivo, Maps, WhatsApp, SSL + Hosting 12 meses

Plano Automação Profissional — €1.180 setup + €350/mês
- Website premium, chatbot IA, agendamento, lembretes, follow-up, KPIs, suporte 5 dias/semana

Plano Enterprise — €4.397 setup + €1.400/mês
- Software SaaS personalizado, integrações, analytics, consultor dedicado

**REGRAS DE COMPORTAMENTO:**
1. Responde sempre em português de Portugal.
2. Sê amigável, profissional e direto.
3. Prioriza o VetScribe quando a pessoa for de veterinária ou perguntar por produto.
4. Se perguntarem preços de serviços, resume os 3 planos.
5. Se mostrarem interesse em agendar, inclui a frase exata: "[AGENDAR_REUNIAO]"
6. Se disserem "agendar", "reunião", "falar", "saber mais", "proposta", sugere reunião de diagnóstico gratuita de 20 minutos.
7. Mantém respostas curtas (2-4 frases), salvo pedido de detalhe.
8. Não inventes preços do VetScribe mensal — diz ${VETSCRIBE_TRIAL_MONTHS} meses grátis e depois acordo comercial.
9. Se não souberes, sugere agendar reunião.`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export function Chatbot({ onAgendarReuniao }: { onAgendarReuniao?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Olá! Sou o assistente da Nexvia. Posso ajudar com o VetScribe (${VETSCRIBE_TRIAL_MONTHS} meses grátis), preços de serviços ou agendar uma reunião de diagnóstico.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    if (!OPENAI_API_KEY) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `O chat IA está temporariamente indisponível. Pode experimentar o VetScribe em ${VETSCRIBE_URL}, escrever para ${CONTACT.email} ou ligar ${CONTACT.phoneDisplay}. Se preferir, posso abrir o agendamento. [AGENDAR_REUNIAO]`,
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.slice(-10),
            userMessage,
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const assistantContent =
        data.choices?.[0]?.message?.content ||
        "Desculpa, estou com dificuldades. Tenta novamente.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantContent },
      ]);

      if (assistantContent.includes("[AGENDAR_REUNIAO]")) {
        setTimeout(() => {
          onAgendarReuniao?.();
        }, 1000);
      }
    } catch (error) {
      console.error("Erro no chatbot:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Tive um problema técnico. Pode ligar para ${CONTACT.phoneDisplay} ou experimentar o VetScribe: ${VETSCRIBE_URL}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary border border-primary/80 text-white flex items-center justify-center rounded-2xl shadow-[0_12px_32px_rgba(61,99,240,0.35)] hover:brightness-110 transition-all"
          aria-label="Abrir chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md h-[500px] max-h-[80vh] bg-[#08090e] border border-white/10 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#10121a]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="flex items-center gap-1.5">
                <Bot size={18} className="text-primary" />
                <span className="text-sm font-semibold text-white">Nexvia IA</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors"
              aria-label="Fechar chat"
            >
              <X size={14} className="text-white/60" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles size={12} className="text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 text-sm rounded-xl ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white/[0.05] border border-white/10 text-white/80"
                  }`}
                >
                  {msg.content.replace("[AGENDAR_REUNIAO]", "")}
                  {msg.content.includes("[AGENDAR_REUNIAO]") && (
                    <button
                      onClick={() => onAgendarReuniao?.()}
                      className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary/20 transition-colors w-full justify-center"
                    >
                      <Calendar size={12} />
                      Agendar reunião
                    </button>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <User size={12} className="text-white/60" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles size={12} className="text-primary" />
                </div>
                <div className="bg-white/5 border border-white/10 px-3 py-2 flex items-center gap-1.5">
                  <Loader2 size={14} className="animate-spin text-primary" />
                  <span className="text-xs text-white/40">A escrever...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t-2 border-white/10 bg-[#0d0d14]">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escreve a tua mensagem..."
                disabled={loading}
                className="flex-1 bg-transparent border-2 border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-10 h-10 bg-primary border-2 border-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Enviar"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
            <p className="text-[10px] text-white/20 mt-2 text-center">
              Assistente IA · VetScribe · Agendamento
            </p>
          </div>
        </div>
      )}
    </>
  );
}

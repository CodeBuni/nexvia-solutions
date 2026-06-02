import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Calendar, Sparkles, Loader2 } from "lucide-react";

const OPENAI_API_KEY = "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"; // Substitui pela tua key real
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Sistema prompt que define o comportamento da IA
const SYSTEM_PROMPT = `Tu és o assistente virtual da Nexvia, uma empresa portuguesa de automação e tecnologia para clínicas de saúde privada.

**CONTEXTO DA EMPRESA:**
- Site: nexvia.pt (ou o domínio real)
- Contacto: +351 928 116 313
- Email: gkmarcosbonifacio@gmail.com
- Especialidades: clínicas dentárias, estética médica, fisioterapia, psicologia, veterinária, e outras.

**SERVIÇOS E PREÇOS:**

Plano Website — €497 (setup único)
- Website informativo de 5 páginas
- Design responsivo
- Integração Google Maps
- Botão WhatsApp
- SSL + Hosting 12 meses

Plano Automação Profissional — €1.180 setup + €350/mês
- Website premium personalizado
- Chatbot com IA (WhatsApp + email)
- Agendamento automático
- Lembretes SMS/email
- Follow-up pós-consulta
- Dashboard de KPIs
- Suporte 5 dias/semana
- SEO local + 2 atualizações/mês

Plano Enterprise — €4.397 setup + €1.400/mês
- Software SaaS personalizado
- Múltiplas integrações
- API custom
- Analytics avançado
- Consultor dedicado 1h/semana
- Customizações ilimitadas

**PRODUTO:**
- VetScribe: IA para clínicas veterinárias que gera prontuários SOAP automaticamente.
  Disponível em: https://meeting-humanizer-v2.vercel.app/

**REGRAS DE COMPORTAMENTO:**
1. Responde sempre em português de Portugal.
2. Sê amigável, profissional e direto.
3. Se a pessoa perguntar sobre preços, mostra os 3 planos resumidamente.
4. Se a pessoa mostrar interesse em agendar reunião, responde com entusiasmo e inclui a frase exata: "[AGENDAR_REUNIAO]"
5. Se a pessoa disser palavras como "agendar", "reunião", "falar", "saber mais", "proposta", sugere ativamente agendar uma reunião de diagnóstico gratuita de 20 minutos.
6. Mantém as respostas curtas (2-4 frases) a menos que a pessoa peça detalhes.
7. Não inventas preços nem serviços que não existem.
8. Se não souberes algo, diz honestamente e sugere agendar uma reunião para esclarecer.`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export function Chatbot({ onAgendarReuniao }: { onAgendarReuniao?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Olá! 👋 Sou o assistente virtual da Nexvia. Como posso ajudar? Posso falar sobre preços, serviços ou agendar uma reunião de diagnóstico gratuita para si." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focar input quando abre
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

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
            ...messages.slice(-10), // últimas 10 mensagens para contexto
            userMessage,
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const assistantContent = data.choices?.[0]?.message?.content || "Desculpa, estou com dificuldades. Tenta novamente.";

      const assistantMessage: Message = { role: "assistant", content: assistantContent };
      setMessages((prev) => [...prev, assistantMessage]);

      // Verificar se a IA sugeriu agendar reunião
      if (assistantContent.includes("[AGENDAR_REUNIAO]")) {
        setTimeout(() => {
          onAgendarReuniao?.();
        }, 1000);
      }
    } catch (error) {
      console.error("Erro no chatbot:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Tive um problema técnico. Podes tentar novamente ou ligar para +351 928 116 313." },
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
      {/* Botão flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary border-2 border-primary text-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          aria-label="Abrir chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Janela do chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md h-[500px] max-h-[80vh] bg-[#0A0A0F] border-2 border-white/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.6)] flex flex-col">
          
          {/* Cabeçalho */}
          <div className="flex items-center justify-between px-4 py-3 border-b-2 border-white/10 bg-[#0d0d14]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <div className="flex items-center gap-1.5">
                <Bot size={18} className="text-primary" />
                <span className="text-sm font-bold text-white">Nexvia IA</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors"
            >
              <X size={14} className="text-white/60" />
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles size={12} className="text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white/5 border border-white/10 text-white/80"
                  }`}
                >
                  {msg.content.replace("[AGENDAR_REUNIAO]", "")}
                  {msg.content.includes("[AGENDAR_REUNIAO]") && (
                    <button
                      onClick={() => onAgendarReuniao?.()}
                      className="mt-2 flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/30 px-3 py-1.5 hover:bg-primary/20 transition-colors w-full justify-center"
                    >
                      <Calendar size={12} />
                      Agendar reunião
                    </button>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
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

          {/* Input */}
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
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
            <p className="text-[10px] text-white/20 mt-2 text-center">
              Assistente IA · Podes pedir para agendar uma reunião
            </p>
          </div>
        </div>
      )}
    </>
  );
}
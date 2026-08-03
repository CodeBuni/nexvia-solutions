import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  CONTACT,
  VETSCRIBE_TRIAL_MONTHS,
  VETSCRIBE_URL,
} from "../lib/constants";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestSchedule?: boolean;
}

function replyTo(input: string): Message {
  const t = input.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");

  if (/(agendar|reuniao|reuniao|demo|marcar|falar com|contacto|contato)/.test(t)) {
    return {
      role: "assistant",
      content: `Perfeito. Posso abrir o agendamento de uma reunião de diagnóstico gratuita (20 min), ou contacta-nos em ${CONTACT.phoneDisplay} / WhatsApp.`,
      suggestSchedule: true,
    };
  }

  if (/(vetscribe|soap|veterinar|prontuario|documentacao)/.test(t)) {
    return {
      role: "assistant",
      content: `O VetScribe gera prontuários SOAP, relatórios para tutores e atestados a partir da consulta. Está em teste com clínicas selecionadas e podes começar com ${VETSCRIBE_TRIAL_MONTHS} meses grátis: ${VETSCRIBE_URL}`,
    };
  }

  if (/(gratis|grátis|trial|piloto|teste|preco vetscribe|preço vetscribe|custa)/.test(t) && /vet|scribe|produto|mes|mês/.test(t)) {
    return {
      role: "assistant",
      content: `O VetScribe tem ${VETSCRIBE_TRIAL_MONTHS} meses grátis para começar. Depois do período experimental, o plano comercial é acordado connosco — sem surpresas no site.`,
      suggestSchedule: true,
    };
  }

  if (/(preco|preço|plano|pacote|quanto|€|euro)/.test(t)) {
    return {
      role: "assistant",
      content: `VetScribe: ${VETSCRIBE_TRIAL_MONTHS} meses grátis, depois acordo comercial. Serviços Nexvia (à parte): Website €497; Automação €1.180 + €350/mês; Enterprise €4.397 + €1.400/mês. Queres agendar uma reunião?`,
      suggestSchedule: true,
    };
  }

  if (/(whatsapp|telefone|email|mail|ligar)/.test(t)) {
    return {
      role: "assistant",
      content: `Contactos: ${CONTACT.phoneDisplay} · WhatsApp · ${CONTACT.email}`,
    };
  }

  if (/(ola|olá|bom dia|boa tarde|hey|hi)/.test(t)) {
    return {
      role: "assistant",
      content: `Olá! Posso ajudar com o VetScribe (${VETSCRIBE_TRIAL_MONTHS} meses grátis), preços dos serviços Nexvia, ou agendar uma reunião.`,
    };
  }

  return {
    role: "assistant",
    content: `Posso explicar o VetScribe, os preços dos serviços, ou agendar uma reunião. Também podes começar já em ${VETSCRIBE_URL}`,
    suggestSchedule: true,
  };
}

export function Chatbot({ onAgendarReuniao }: { onAgendarReuniao?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Olá! Sou o assistente da Nexvia. Posso ajudar com o VetScribe (${VETSCRIBE_TRIAL_MONTHS} meses grátis), preços de serviços ou agendar uma reunião.`,
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    const answer = replyTo(userMessage.content);
    setMessages((prev) => [...prev, userMessage, answer]);
    setInput("");
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
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary border-2 border-primary text-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          aria-label="Abrir chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md h-[500px] max-h-[80vh] bg-[#0A0A0F] border-2 border-white/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.6)] flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b-2 border-white/10 bg-[#0d0d14]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <div className="flex items-center gap-1.5">
                <Bot size={18} className="text-primary" />
                <span className="text-sm font-bold text-white">Nexvia Assistente</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors"
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
                  {msg.content}
                  {msg.suggestSchedule && (
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
                placeholder="Ex: VetScribe, preços, agendar..."
                className="flex-1 bg-transparent border-2 border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-primary/50 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-10 h-10 bg-primary border-2 border-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Enviar"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

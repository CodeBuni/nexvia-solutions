import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { User, Mail, Phone, ArrowRight, CheckCircle, XCircle, ChevronLeft, ChevronRight, Calendar, MessageCircle } from "lucide-react";

const WEBHOOK_URL = "https://hook.eu1.make.com/1rt54lt4omk2x0d5ndv8gb1ptan5r7gg";
const DURACAO_MINUTOS = 20;
const HORA_INICIO = 9;
const HORA_FIM = 18;

function gerarSlots(data: Date): string[] {
  const slots: string[] = [];
  const agora = new Date();
  const diaAtual = new Date(data.getFullYear(), data.getMonth(), data.getDate());
  for (let h = HORA_INICIO; h < HORA_FIM; h++) {
    for (let m = 0; m < 60; m += DURACAO_MINUTOS) {
      const slotDate = new Date(diaAtual);
      slotDate.setHours(h, m, 0, 0);
      if (slotDate <= agora) continue;
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
}

function mudarMes(data: Date, meses: number): Date {
  const nova = new Date(data.getFullYear(), data.getMonth() + meses, 1);
  return nova;
}

const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];
const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function AgendarReuniao() {
  const [passo, setPasso] = useState<"boasVindas" | "data" | "hora" | "dados" | "sucesso" | "erro">("boasVindas");
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [mesAtual, setMesAtual] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    }
  }, []);

  // Animar transição entre passos
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
    }
  }, [passo]);

  const ano = mesAtual.getFullYear();
  const mes = mesAtual.getMonth();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const handleSubmit = async () => {
    if (!dataSelecionada || !horaSelecionada) return;
    setLoading(true);

    const ano = dataSelecionada.getFullYear();
    const mes = String(dataSelecionada.getMonth() + 1).padStart(2, '0');
    const dia = String(dataSelecionada.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          data: dataFormatada,
          hora: horaSelecionada,
          duracao: DURACAO_MINUTOS,
        }),
      });
      setPasso(response.ok ? "sucesso" : "erro");
    } catch {
      setPasso("erro");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPasso("boasVindas");
    setDataSelecionada(null);
    setHoraSelecionada(null);
    setNome("");
    setEmail("");
    setTelefone("");
  };

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto">
      
      {/* PASSO 0: BOAS-VINDAS */}
      {passo === "boasVindas" && (
        <div>
          {/* Badge */}
          <div className="inline-block border-2 border-primary bg-primary/10 px-3 py-1 mb-6">
            <span className="text-xs font-bold text-primary tracking-wide uppercase">Reunião de Diagnóstico</span>
          </div>

          <h3 className="text-white font-bold text-lg mb-3">
            Antes de começarmos<span className="text-primary">.</span>
          </h3>

          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Para garantir que encontramos a melhor solução para a sua clínica, 
            precisamos de fazer uma breve reunião de diagnóstico de <strong className="text-white/80">20 minutos</strong>. 
            É gratuita e sem compromisso.
          </p>

          {/* Contactos diretos */}
          <div className="border-2 border-white/10 bg-white/[0.02] p-4 mb-6">
            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">
              Prefere falar diretamente?
            </p>
            <div className="space-y-2.5">
              <a
                href="tel:+351928116313"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Phone size={14} className="text-primary shrink-0" />
                +351 928 116 313
              </a>
              <a
                href="https://wa.me/351928116313"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
              >
                <MessageCircle size={14} className="text-green-400 shrink-0" />
                WhatsApp
              </a>
              <a
                href="mailto:gkmarcosbonifacio@gmail.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail size={14} className="text-primary shrink-0" />
                gkmarcosbonifacio@gmail.com
              </a>
            </div>
          </div>

          {/* Botão para agendar */}
          <button
            onClick={() => setPasso("data")}
            className="w-full bg-primary text-white font-bold py-3 border-2 border-primary hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Calendar size={14} />
            Agendar reunião
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Steps visuais (só aparece depois das boas-vindas) */}
      {passo !== "boasVindas" && passo !== "sucesso" && passo !== "erro" && (
        <div className="flex gap-1 mb-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`flex-1 h-1 border ${
                n <= (passo === "data" ? 1 : passo === "hora" ? 2 : 3)
                  ? "border-primary bg-primary"
                  : "border-white/10"
              }`}
            />
          ))}
        </div>
      )}

      {/* PASSO 1: DATA */}
      {passo === "data" && (
        <div>
          <button onClick={() => setPasso("boasVindas")} className="text-white/40 hover:text-white text-xs font-bold mb-4 flex items-center gap-1">
            <ChevronLeft size={12} /> Voltar
          </button>

          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setMesAtual(mudarMes(mesAtual, -1))} className="w-8 h-8 border-2 border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors">
              <ChevronLeft size={14} className="text-white/60" />
            </button>
            <span className="text-white font-bold text-sm uppercase tracking-wider">
              {MESES[mes]} <span className="text-primary">{ano}</span>
            </span>
            <button onClick={() => setMesAtual(mudarMes(mesAtual, 1))} className="w-8 h-8 border-2 border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors">
              <ChevronRight size={14} className="text-white/60" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-4">
            {DIAS_SEMANA.map((d, i) => (
              <div key={i} className={`text-[10px] font-bold py-1 ${i === 0 || i === 6 ? "text-white/20" : "text-white/40"}`}>{d}</div>
            ))}
            {Array.from({ length: primeiroDiaSemana }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: diasNoMes }, (_, i) => i + 1).map((dia) => {
              const d = new Date(ano, mes, dia);
              d.setHours(23, 59, 59, 999);
              const desabilitado = d < hoje || d.getDay() === 0 || d.getDay() === 6;
              return (
                <button
                  key={dia}
                  disabled={desabilitado}
                  onClick={() => { setDataSelecionada(new Date(ano, mes, dia)); setPasso("hora"); }}
                  className={`text-sm font-bold py-1.5 border-2 transition-all ${
                    desabilitado
                      ? "border-transparent text-white/10 cursor-not-allowed"
                      : "border-transparent text-white/70 hover:border-primary/40 hover:text-white"
                  }`}
                >
                  {dia}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* PASSO 2: HORA */}
      {passo === "hora" && dataSelecionada && (
        <div>
          <button onClick={() => setPasso("data")} className="text-white/40 hover:text-white text-xs font-bold mb-3 flex items-center gap-1">
            <ChevronLeft size={12} /> {dataSelecionada.toLocaleDateString("pt-PT", { day: "numeric", month: "long" })}
          </button>
          <div className="grid grid-cols-4 gap-1.5">
            {gerarSlots(dataSelecionada).length === 0 ? (
              <p className="text-white/30 text-xs col-span-4 py-4 text-center">Sem horários</p>
            ) : (
              gerarSlots(dataSelecionada).map((hora) => (
                <button
                  key={hora}
                  onClick={() => { setHoraSelecionada(hora); setPasso("dados"); }}
                  className="py-2 text-xs font-bold border-2 border-white/10 text-white/60 hover:border-primary/40 hover:text-white transition-all"
                >
                  {hora}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* PASSO 3: DADOS */}
      {passo === "dados" && (
        <div>
          <button onClick={() => setPasso("hora")} className="text-white/40 hover:text-white text-xs font-bold mb-3 flex items-center gap-1">
            <ChevronLeft size={12} /> {dataSelecionada?.toLocaleDateString("pt-PT")} às {horaSelecionada}
          </button>
          <div className="space-y-3 mb-4">
            {[
              { icon: User, placeholder: "Nome", value: nome, setter: setNome },
              { icon: Mail, placeholder: "Email", value: email, setter: setEmail },
              { icon: Phone, placeholder: "Telefone", value: telefone, setter: setTelefone },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-2 border-2 border-white/10 bg-transparent px-3 py-2.5 focus-within:border-primary/50 transition-colors">
                <c.icon className="w-4 h-4 text-white/20 shrink-0" />
                <input
                  type={c.placeholder === "Email" ? "email" : "text"}
                  placeholder={c.placeholder}
                  value={c.value}
                  onChange={(e) => c.setter(e.target.value)}
                  className="bg-transparent flex-1 text-white text-sm placeholder-white/20 outline-none"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!nome || !email || !telefone || loading}
            className="w-full bg-primary text-white font-bold py-3 border-2 border-primary hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm transition-all"
          >
            {loading ? "A agendar..." : <>Confirmar <ArrowRight size={14} /></>}
          </button>
        </div>
      )}

      {/* SUCESSO */}
      {passo === "sucesso" && (
        <div className="text-center py-4">
          <div className="inline-block border-2 border-green-400 bg-green-400/10 p-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Agendado!</h3>
          <p className="text-white/40 text-xs mb-4">{dataSelecionada?.toLocaleDateString("pt-PT")} às {horaSelecionada}</p>
          <button onClick={reset} className="text-primary text-xs font-bold hover:underline">Agendar outra</button>
        </div>
      )}

      {/* ERRO */}
      {passo === "erro" && (
        <div className="text-center py-4">
          <div className="inline-block border-2 border-red-400 bg-red-400/10 p-3 mb-4">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Erro</h3>
          <p className="text-white/40 text-xs mb-4">Tente novamente.</p>
          <button onClick={reset} className="text-primary text-xs font-bold hover:underline">Tentar de novo</button>
        </div>
      )}
    </div>
  );
}
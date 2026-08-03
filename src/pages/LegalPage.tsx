import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { CONTACT, SITE } from "../lib/constants";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-lg tracking-tight">
            {SITE.name}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        <p className="text-white/40 text-sm mb-10">Última atualização: 3 de agosto de 2026</p>
        <div className="legal-prose space-y-6 text-white/70 text-sm md:text-base leading-relaxed">
          {children}
        </div>
        <p className="mt-12 text-white/40 text-sm">
          Contacto:{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">
            {CONTACT.email}
          </a>{" "}
          ·{" "}
          <a href={`tel:+${CONTACT.phoneE164}`} className="text-primary hover:underline">
            {CONTACT.phoneDisplay}
          </a>
        </p>
      </main>
    </div>
  );
}

export function PrivacidadePage() {
  return (
    <LegalPage title="Política de Privacidade">
      <section>
        <h2 className="text-white font-bold text-lg mb-2">1. Responsável pelo tratamento</h2>
        <p>
          A {SITE.name} (“nós”) é responsável pelo tratamento dos dados pessoais recolhidos através
          deste website e dos contactos associados ao produto VetScribe e aos serviços de automação
          para clínicas.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">2. Dados que recolhemos</h2>
        <p>Podemos recolher:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Nome, email e telefone (formulários e agendamento);</li>
          <li>Tipo de clínica e mensagem que nos enviar;</li>
          <li>Dados técnicos básicos de utilização do site (ex.: logs do servidor/hospedagem);</li>
          <li>Conteúdo das conversas com o assistente virtual, quando utilizado.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">3. Finalidades e bases legais</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Responder a pedidos de contacto e demonstrações (interesse legítimo / medidas pré-contratuais);</li>
          <li>Agendar reuniões de diagnóstico (medidas pré-contratuais);</li>
          <li>Prestação do VetScribe e suporte (execução de contrato);</li>
          <li>Cumprimento de obrigações legais aplicáveis.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">4. VetScribe e dados clínicos</h2>
        <p>
          O VetScribe processa conteúdos introduzidos pela clínica (ex.: áudio, notas, documentos)
          para gerar documentação clínica. A clínica continua a ser a responsável pelos dados dos
          seus pacientes/tutores. A Nexvia trata esses dados apenas como subcontratante, na medida
          necessária à prestação do serviço, e não os utiliza para outras finalidades.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">5. Conservação</h2>
        <p>
          Conservamos os dados pelo tempo necessário às finalidades acima, ou pelos prazos legais
          aplicáveis. Pedidos de contacto sem contrato são tipicamente eliminados ou anonimizados
          após um período razoável sem follow-up.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">6. Partilha com terceiros</h2>
        <p>
          Podemos recorrer a prestadores de infraestruturas (hospedagem, email, automações,
          fornecedores de IA) estritamente necessários ao funcionamento do site e dos produtos.
          Esses prestadores tratam dados sob instruções adequadas e obrigações de confidencialidade.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">7. Os seus direitos (RGPD)</h2>
        <p>
          Tem direito de acesso, retificação, apagamento, limitação, oposição e portabilidade,
          nos termos do RGPD. Para exercer direitos, contacte-nos pelos meios indicados abaixo.
          Também pode apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD).
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">8. Cookies</h2>
        <p>
          Este site utiliza cookies ou armazenamento técnico essencial ao funcionamento. Não
          utilizamos, neste momento, cookies de publicidade de terceiros. Se forem adicionados
          analytics no futuro, atualizaremos esta política e, quando exigido, pediremos consentimento.
        </p>
      </section>
    </LegalPage>
  );
}

export function TermosPage() {
  return (
    <LegalPage title="Termos de Utilização">
      <section>
        <h2 className="text-white font-bold text-lg mb-2">1. Objeto</h2>
        <p>
          Estes termos regulam a utilização do website da {SITE.name} e a informação comercial
          relativa aos nossos serviços e ao produto VetScribe.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">2. VetScribe — período experimental</h2>
        <p>
          O VetScribe pode ser utilizado com um período inicial de{" "}
          <strong className="text-white">2 meses grátis</strong>. Durante o período experimental e
          em clínicas piloto, as funcionalidades, disponibilidade e condições comerciais podem
          evoluir. A continuação do uso após o período experimental depende de acordo comercial
          entre as partes.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">3. Utilização aceitável</h2>
        <p>
          O utilizador compromete-se a usar o site e o VetScribe de forma lícita, sem comprometer a
          segurança, disponibilidade ou integridade dos sistemas, e sem violar direitos de terceiros
          ou obrigações profissionais do setor da saúde.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">4. Responsabilidade clínica</h2>
        <p>
          Os conteúdos gerados por IA são auxiliares. A validação clínica, a adequação do
          prontuário e a responsabilidade profissional perante o paciente/tutor pertencem sempre à
          clínica e ao médico veterinário responsável.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">5. Serviços de automação</h2>
        <p>
          Os planos de website e automação apresentados no site são referências comerciais. O
          âmbito, prazos e preços finais são definidos em proposta ou contrato específico.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">6. Propriedade intelectual</h2>
        <p>
          Marcas, logótipos, software, textos e materiais da Nexvia e do VetScribe são protegidos.
          Não é permitida a cópia ou exploração sem autorização prévia.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">7. Limitação de responsabilidade</h2>
        <p>
          Na medida permitida pela lei aplicável, a Nexvia não responde por danos indiretos,
          perda de lucros ou interrupções decorrentes do uso do site ou do período experimental,
          salvo dolo ou negligência grave.
        </p>
      </section>

      <section>
        <h2 className="text-white font-bold text-lg mb-2">8. Lei aplicável</h2>
        <p>
          Estes termos regem-se pela lei portuguesa. Em caso de litígio, são competentes os
          tribunais portugueses, sem prejuízo de normas imperativas de proteção do consumidor.
        </p>
      </section>
    </LegalPage>
  );
}

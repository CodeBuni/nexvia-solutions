import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apenas em dispositivos não-touch (Desktop)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Oculta o cursor nativo do sistema globalmente
    document.body.style.cursor = "none";
    
    const style = document.createElement("style");
    style.innerHTML = `
      a, button, [role="button"], input, textarea, select, label {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Atualização instantânea na mesma frame (sem delay/smooth)
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.style.cursor = "auto";
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        // Aumentado ligeiramente o tamanho da caixa de 32px para 40px
        width: "40px",
        height: "40px",
        willChange: "transform",
        // Ajuste milimétrico para o clique bater certinho na ponta
        marginLeft: "-1px",
        marginTop: "-1px",
      }}
    >
      {/* SVG reajustado para preencher a nova proporção maior com o azul correto (#1849ac) */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sombra Neobrutalista Preta Deslocada */}
        <path
          d="M3 5 L25 17 L15 17 L11 26 Z"
          fill="#000000"
          transform="translate(-2, 2)"
        />
        {/* Contorno Preto do Cursor */}
        <path
          d="M3 5 L25 17 L15 17 L11 26 Z"
          fill="#000000"
        />
        {/* Miolo do Cursor - Preenchido com o Azul Royal (#1849ac) */}
        <path
          d="M4.5 7 L21.5 16.3 L13.7 16.3 L10.5 23.5 Z"
          fill="#1849ac" 
        />
      </svg>
    </div>
  );
}
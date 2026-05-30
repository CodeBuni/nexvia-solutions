// Efeito de hover para o cursor neobrutalista
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    const cursor = document.getElementById("neo-cursor");
    if (!cursor) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el && (el as HTMLElement).matches(":hover, button, a, [role='button']")) {
      cursor.style.background = "repeating-linear-gradient(135deg, #7B5EF8 0 8px, #030213 8px 16px)";
      cursor.style.boxShadow = "0 8px 32px 0 #0A0A0F, 0 0 0 3px #7B5EF8";
      cursor.style.border = "2px solid #7B5EF8";
    } else {
      cursor.style.background = "repeating-linear-gradient(135deg, #AEE6FF 0 8px, #1A237E 8px 16px)";
      cursor.style.boxShadow = "0 4px 24px 0 #0A0A0F, 0 0 0 3px #1A237E";
      cursor.style.border = "2px solid #AEE6FF";
    }
  });
}

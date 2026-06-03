import { useState, useEffect } from "react";

const CAFE = "#6b3a2a";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sgc_cookies_accepted");
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("sgc_cookies_accepted", "true");
    setVisible(false);
  };

  const dismiss = () => setVisible(false);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
        background: "#111111",
        borderTop: `2px solid ${CAFE}`,
        padding: "20px 32px",
        boxShadow: "0 -4px 32px rgba(0,0,0,0.35)",
        animation: "sgcSlideUp 0.4s ease",
      }}
    >
      <style>{`
        @keyframes sgcSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
      <div
        style={{
          maxWidth: "1280px", margin: "0 auto",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.0rem",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.65,
          flex: "1 1 300px",
        }}>
          Utilizamos cookies para mejorar su experiencia en el sitio.{" "}
          Consulte nuestra{" "}
          <a href="/privacidad" style={{ color: CAFE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Política de Privacidad
          </a>{" "}
          y{" "}
          <a href="/cookies" style={{ color: CAFE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Política de Cookies
          </a>.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
          <button
            onClick={dismiss}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.64rem", letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.45)",
              background: "transparent", border: "none", cursor: "pointer",
              padding: "10px 0",
            }}
          >RECHAZAR</button>
          <button
            onClick={accept}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.68rem", letterSpacing: "0.18em", fontWeight: 700,
              color: "#ffffff", background: CAFE,
              padding: "12px 32px", border: "none", cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >ACEPTAR</button>
        </div>
      </div>
    </div>
  );
}

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
        background: "#ffffff",
        borderTop: `2px solid rgba(107,58,42,0.20)`,
        padding: "28px 32px",
        boxShadow: "0 -4px 32px rgba(0,0,0,0.12)",
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
          maxWidth: "680px", margin: "0 auto",
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center", gap: "20px",
        }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.05rem",
          color: "#333333",
          lineHeight: 1.65,
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={dismiss}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.64rem", letterSpacing: "0.16em",
              color: "#888888",
              background: "transparent",
              border: "1px solid rgba(107,58,42,0.25)",
              borderRadius: "999px",
              cursor: "pointer",
              padding: "10px 28px",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = CAFE;
              e.currentTarget.style.color = CAFE;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(107,58,42,0.25)";
              e.currentTarget.style.color = "#888888";
            }}
          >RECHAZAR</button>
          <button
            onClick={accept}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.68rem", letterSpacing: "0.18em", fontWeight: 700,
              color: "#ffffff", background: CAFE,
              padding: "12px 32px",
              border: "none", cursor: "pointer",
              borderRadius: "999px",
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

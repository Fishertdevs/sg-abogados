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

  const btnBase: React.CSSProperties = {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.63rem",
    letterSpacing: "0.15em",
    fontWeight: 700,
    padding: "8px 22px",
    borderRadius: "999px",
    border: `1px solid ${CAFE}`,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap" as const,
  };

  return (
    <div
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
        background: "#ffffff",
        borderTop: `1px solid rgba(107,58,42,0.25)`,
        padding: "12px 24px",
        boxShadow: "0 -2px 16px rgba(0,0,0,0.08)",
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
          maxWidth: "1100px", margin: "0 auto",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: "12px 24px",
        }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.96rem",
          color: "#333333",
          lineHeight: 1.5,
          flex: "1 1 360px",
          margin: 0,
        }}>
          Utilizamos cookies para mejorar su experiencia.{" "}
          <a href="/cookies" style={{ color: CAFE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Política de Cookies
          </a>{" "}y{" "}
          <a href="/privacidad" style={{ color: CAFE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Privacidad
          </a>.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <button
            onClick={dismiss}
            style={{ ...btnBase, color: CAFE, background: "transparent" }}
            onMouseEnter={e => { e.currentTarget.style.background = `${CAFE}12`; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >RECHAZAR</button>
          <button
            onClick={accept}
            style={{ ...btnBase, color: "#ffffff", background: CAFE }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >ACEPTAR</button>
        </div>
      </div>
    </div>
  );
}

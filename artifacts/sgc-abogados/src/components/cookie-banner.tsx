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
        borderTop: `2px solid ${CAFE}`,
        padding: "14px 32px",
        boxShadow: "0 -2px 20px rgba(0,0,0,0.10)",
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
          alignItems: "center", justifyContent: "center",
          gap: "16px 28px", textAlign: "center",
        }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.98rem",
          color: "#333333",
          lineHeight: 1.55,
          flex: "1 1 420px",
          textAlign: "center",
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <button
            onClick={dismiss}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.62rem", letterSpacing: "0.15em",
              color: CAFE,
              background: "transparent",
              border: `1px solid ${CAFE}`,
              borderRadius: "999px",
              cursor: "pointer",
              padding: "8px 22px",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${CAFE}12`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
            }}
          >RECHAZAR</button>
          <button
            onClick={accept}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.64rem", letterSpacing: "0.16em", fontWeight: 700,
              color: "#ffffff", background: CAFE,
              padding: "8px 24px",
              border: `1px solid ${CAFE}`, cursor: "pointer",
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

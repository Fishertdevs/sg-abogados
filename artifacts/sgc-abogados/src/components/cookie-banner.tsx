import { useState, useEffect } from "react";

const BLUE = "#1a3d7c";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sgc_cookies_accepted");
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
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
        borderTop: `1px solid rgba(26,61,124,0.20)`,
        boxShadow: "0 -2px 16px rgba(0,0,0,0.08)",
        animation: "sgcSlideUp 0.4s ease",
      }}
    >
      <style>{`
        @keyframes sgcSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .sgc-cookie-wrap {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 8px 16px;
          text-align: center;
          padding: 10px 16px;
        }
        .sgc-cookie-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.96rem;
          color: #333333;
          line-height: 1.5;
          flex: 1 1 260px;
          margin: 0;
        }
        .sgc-cookie-btns {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .sgc-cookie-btn {
          font-family: 'Cinzel', serif;
          font-size: 0.63rem;
          letter-spacing: 0.15em;
          font-weight: 700;
          padding: 7px 18px;
          border-radius: 999px;
          border: 1px solid ${BLUE};
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          color: #ffffff;
          background: ${BLUE};
        }
        @media (max-width: 640px) {
          .sgc-cookie-wrap {
            padding: 8px 12px;
            gap: 6px 10px;
          }
          .sgc-cookie-text {
            font-size: 0.80rem;
            flex: 1 1 100%;
          }
          .sgc-cookie-btn {
            font-size: 0.58rem;
            padding: 5px 14px;
          }
        }
      `}</style>
      <div className="sgc-cookie-wrap">
        <p className="sgc-cookie-text">
          Utilizamos cookies para mejorar su experiencia.{" "}
          <a href="/cookies" style={{ color: BLUE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Política de Cookies
          </a>{" "}y{" "}
          <a href="/privacidad" style={{ color: BLUE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Privacidad
          </a>.
        </p>
        <div className="sgc-cookie-btns">
          <button
            onClick={dismiss}
            className="sgc-cookie-btn"
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >RECHAZAR</button>
          <button
            onClick={accept}
            className="sgc-cookie-btn"
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >ACEPTAR</button>
        </div>
      </div>
    </div>
  );
}

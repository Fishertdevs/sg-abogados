import { useState, useEffect } from "react";

const CAFE = "#C4A355";
const DARK = "#3F4937";

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
        background: "#FAF7F2",
        borderTop: `1px solid rgba(63,73,55,0.18)`,
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
          color: #2A2820;
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
        .sgc-cookie-br { display: none; }
        .sgc-cookie-btn {
          font-family: 'Cinzel', serif;
          font-size: 0.63rem;
          letter-spacing: 0.15em;
          font-weight: 700;
          padding: 7px 18px;
          border-radius: 999px;
          border: 1px solid ${DARK};
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          color: #ffffff;
          background: ${DARK};
        }
        .sgc-cookie-btn:hover {
          background: ${CAFE};
          border-color: ${CAFE};
        }
        @media (max-width: 640px) {
          .sgc-cookie-wrap {
            padding: 8px 12px;
            gap: 4px 8px;
            flex-direction: column;
            align-items: center;
          }
          .sgc-cookie-text {
            font-size: 0.78rem;
            flex: 1 1 100%;
            text-align: center;
          }
          .sgc-cookie-br { display: block; }
          .sgc-cookie-btns {
            gap: 6px;
          }
          .sgc-cookie-btn {
            font-size: 0.48rem;
            padding: 3px 10px;
            letter-spacing: 0.12em;
          }
        }
      `}</style>
      <div className="sgc-cookie-wrap">
        <p className="sgc-cookie-text">
          Utilizamos cookies para mejorar su experiencia.
          <br className="sgc-cookie-br" />
          {" "}
          <a href="/cookies" style={{ color: CAFE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Política de Cookies y Privacidad
          </a>.
        </p>
        <div className="sgc-cookie-btns">
          <button onClick={dismiss} className="sgc-cookie-btn">RECHAZAR</button>
          <button onClick={accept} className="sgc-cookie-btn">ACEPTAR</button>
        </div>
      </div>
    </div>
  );
}

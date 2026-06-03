import type { ReactNode } from "react";

const CAFE = "#6b3a2a";
const TEXT = "#111111";
const MUTED = "#777777";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", flexDirection: "column" }}>
      <nav style={{
        background: "#111111",
        padding: "20px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="/" style={{
          fontFamily: "'Cinzel', serif",
          color: "#ffffff", fontSize: "0.85rem",
          letterSpacing: "0.28em", fontWeight: 600, textDecoration: "none",
        }}>
          SGC ABOGADOS
        </a>
        <a href="/" style={{
          fontFamily: "'Cinzel', serif",
          color: "rgba(255,255,255,0.55)", fontSize: "0.66rem",
          letterSpacing: "0.14em", textDecoration: "none",
          transition: "color 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.90)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
        >
          ← VOLVER AL INICIO
        </a>
      </nav>

      <main style={{ flex: 1, maxWidth: "780px", margin: "0 auto", padding: "80px 32px 100px", width: "100%" }}>
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: "0.62rem",
          color: CAFE, letterSpacing: "0.22em", marginBottom: "16px",
        }}>SGC ABOGADOS</p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontStyle: "italic", color: TEXT,
          marginBottom: "10px", fontWeight: 500, lineHeight: 1.2,
        }}>{title}</h1>
        <div style={{ width: "40px", height: "2px", background: CAFE, marginBottom: "10px" }} />
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.90rem", color: MUTED, marginBottom: "60px",
        }}>Última actualización: {lastUpdated}</p>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.06rem", color: TEXT, lineHeight: 1.88,
        }}>
          {children}
        </div>
      </main>

      <footer style={{ background: "#111111", padding: "24px 40px", textAlign: "center" }}>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.62rem", color: "rgba(255,255,255,0.40)",
          letterSpacing: "0.12em",
        }}>© 2026 SGC Abogados.</p>
      </footer>
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "1.45rem", fontStyle: "italic",
      color: "#111111", fontWeight: 500,
      marginTop: "52px", marginBottom: "18px",
    }}>{children}</h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p style={{ marginBottom: "20px" }}>{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul style={{ paddingLeft: "24px", marginBottom: "20px", listStyleType: "disc" }}>
      {children}
    </ul>
  );
}

export function LI({ children }: { children: ReactNode }) {
  return <li style={{ marginBottom: "8px" }}>{children}</li>;
}

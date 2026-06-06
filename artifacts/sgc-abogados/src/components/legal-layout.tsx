import { useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scale, Menu, X } from "lucide-react";

const CAFE  = "#6b3a2a";
const TEXT  = "#111111";
const MUTED = "#777777";

const navLinks = [
  { name: "INICIO",   href: "/"         },
  { name: "ÁREAS",    href: "/#areas"   },
  { name: "NOSOTROS", href: "/#nosotros"},
  { name: "CONTACTO", href: "/#contacto"},
];

function LegalNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg     = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0.0)", "rgba(255,255,255,0.97)"]);
  const navBlur   = useTransform(scrollY, [0, 60], ["blur(0px)", "blur(16px)"]);
  const navShadow = useTransform(scrollY, [0, 60], ["none", "0 1px 0 rgba(0,0,0,0.06)"]);

  return (
    <motion.header
      style={{ backgroundColor: navBg, backdropFilter: navBlur, boxShadow: navShadow }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <Scale strokeWidth={1.3} className="w-5 h-5" style={{ color: CAFE }} />
          <span style={{
            fontFamily: "'Cinzel', serif",
            color: TEXT, letterSpacing: "0.28em", fontSize: "0.80rem", fontWeight: 600,
          }}>SGC ABOGADOS</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(l => (
            <a key={l.name} href={l.href}
              className="transition-colors duration-300"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.78rem", letterSpacing: "0.18em",
                color: TEXT, fontWeight: 600, textDecoration: "none",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = CAFE)}
              onMouseLeave={e => (e.currentTarget.style.color = TEXT)}
            >{l.name}</a>
          ))}
        </nav>

        <button className="md:hidden p-2"
          style={{ color: "rgba(17,17,17,0.65)", background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-8 py-6 flex flex-col gap-6"
          style={{ background: "rgba(255,255,255,0.98)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          {navLinks.map(l => (
            <a key={l.name} href={l.href}
              style={{ fontFamily: "'Cinzel', serif", fontSize: "0.78rem", letterSpacing: "0.22em", color: TEXT, textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}>{l.name}</a>
          ))}
        </div>
      )}
    </motion.header>
  );
}

function LegalFooter() {
  return (
    <footer style={{ background: "#111111" }}>
      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "0 32px" }} />
      <div style={{ height: "1px", background: "rgba(255,255,255,0.04)", margin: "0 32px" }} />
      <div className="flex flex-col items-center gap-3 px-8 py-8">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {[
            { label: "Política de Cookies",    href: "/cookies"    },
            { label: "Términos y Condiciones", href: "/terminos"   },
            { label: "Política de Privacidad", href: "/privacidad" },
          ].map(({ label, href }, i, arr) => (
            <span key={label} className="flex items-center gap-4">
              <a href={href}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.68rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em",
                  textDecoration: "none",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.90)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >{label}</a>
              {i < arr.length - 1 && (
                <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.7rem" }}>·</span>
              )}
            </span>
          ))}
        </div>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.65rem", color: "rgba(255,255,255,0.40)",
          letterSpacing: "0.12em", marginTop: "4px",
        }}>&copy; 2026 SGC Abogados.</p>
      </div>
      <div style={{ height: "1px", background: "rgba(255,255,255,0.04)", margin: "0 32px" }} />
      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "0 32px" }} />
      <div style={{ height: "12px" }} />
    </footer>
  );
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", flexDirection: "column" }}>
      <LegalNav />

      <main style={{ flex: 1, maxWidth: "780px", margin: "0 auto", padding: "120px 32px 100px", width: "100%" }}>
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: "0.62rem",
          color: CAFE, letterSpacing: "0.22em", marginBottom: "16px",
          textAlign: "center",
        }}>SGC ABOGADOS</p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontStyle: "italic", color: TEXT,
          marginBottom: "10px", fontWeight: 500, lineHeight: 1.2,
          textAlign: "center",
        }}>{title}</h1>
        <div style={{ width: "40px", height: "2px", background: CAFE, margin: "0 auto 10px" }} />
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.90rem", color: MUTED, marginBottom: "60px",
          textAlign: "center",
        }}>Última actualización: {lastUpdated}</p>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.06rem", color: TEXT, lineHeight: 1.88,
        }}>
          {children}
        </div>
      </main>

      <LegalFooter />
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "1.45rem", fontStyle: "italic",
      color: TEXT, fontWeight: 500,
      marginTop: "52px", marginBottom: "18px",
      textAlign: "left",
    }}>{children}</h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p style={{ marginBottom: "20px", textAlign: "left" }}>{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul style={{ paddingLeft: "24px", marginBottom: "20px", listStyleType: "disc", textAlign: "left" }}>
      {children}
    </ul>
  );
}

export function LI({ children }: { children: ReactNode }) {
  return <li style={{ marginBottom: "8px" }}>{children}</li>;
}

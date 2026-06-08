import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Menu, X } from "lucide-react";

const BLUE  = "#1e56b4";
const TEXT  = "#111111";
const MUTED = "#777777";

const navLinks = [
  { name: "INICIO",   href: "/"         },
  { name: "ÁREAS",    href: "/#areas"   },
  { name: "NOSOTROS", href: "/#nosotros"},
  { name: "CONTACTO", href: "/#contacto"},
];

/* ─── Social SVG icons ───────────────────────────────────── */
const SvgInstagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const SvgLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const SvgFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const SvgWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ─── Scroll fade animation wrapper ─────────────────────── */
function FadeOnScroll({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-8% 0px -8% 0px",
    once: false,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 14,
      }}
      transition={{ duration: 0.45, ease: "easeOut", delay: isInView ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

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
        <Link href="/" className="flex items-center">
          <span style={{
            fontFamily: "'Cinzel', serif",
            color: TEXT, letterSpacing: "0.28em", fontSize: "0.80rem", fontWeight: 600,
          }}>SGC ABOGADOS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(l => {
            const linkStyle: React.CSSProperties = {
              fontFamily: "'Cinzel', serif",
              fontSize: "0.78rem", letterSpacing: "0.18em",
              color: TEXT, fontWeight: 600, textDecoration: "none",
            };
            const enter = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = BLUE);
            const leave = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = TEXT);
            return l.href === "/" ? (
              <Link key={l.name} href={l.href}
                className="transition-colors duration-300"
                style={linkStyle}
                onMouseEnter={enter}
                onMouseLeave={leave}
              >{l.name}</Link>
            ) : (
              <a key={l.name} href={l.href}
                className="transition-colors duration-300"
                style={linkStyle}
                onMouseEnter={enter}
                onMouseLeave={leave}
              >{l.name}</a>
            );
          })}
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
          {navLinks.map(l => {
            const mobileStyle: React.CSSProperties = {
              fontFamily: "'Cinzel', serif", fontSize: "0.78rem",
              letterSpacing: "0.22em", color: TEXT, textDecoration: "none",
            };
            return l.href === "/" ? (
              <Link key={l.name} href={l.href}
                style={mobileStyle}
                onClick={() => setMenuOpen(false)}>{l.name}</Link>
            ) : (
              <a key={l.name} href={l.href}
                style={mobileStyle}
                onClick={() => setMenuOpen(false)}>{l.name}</a>
            );
          })}
        </div>
      )}
    </motion.header>
  );
}

function LegalFooter() {
  return (
    <motion.footer
      style={{ background: "#ffffff" }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <style>{`
        @media (max-width:640px){
          .sgc-lf-top    { padding: 28px 16px 18px !important; }
          .sgc-lf-bottom { padding: 10px 12px 16px !important; }
          .sgc-lf-tagline { font-size: 0.90rem !important; }
          .sgc-lf-link  { font-size: 0.52rem !important; letter-spacing: 0.07em !important; }
        }
      `}</style>
      <div style={{ width: "100%", height: "3px", background: BLUE }} />
      <div className="sgc-lf-top flex flex-col items-center px-8 py-14">
        <div className="flex items-center gap-4 mb-7">
          {[
            { label: "WhatsApp",  Icon: SvgWhatsApp,  href: "https://wa.me/573196519645" },
            { label: "Instagram", Icon: SvgInstagram, href: "#" },
            { label: "LinkedIn",  Icon: SvgLinkedIn,  href: "#" },
            { label: "Facebook",  Icon: SvgFacebook,  href: "#" },
          ].map(({ label, Icon, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ background: "#f0f4fa", color: BLUE }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = BLUE;
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#f0f4fa";
                (e.currentTarget as HTMLElement).style.color = BLUE;
              }}
            ><Icon /></a>
          ))}
        </div>

        <p className="sgc-lf-tagline" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontSize: "1.10rem",
          color: "#111111",
        }}>Estrategia jurídica con carácter.</p>
      </div>

      <div style={{ width: "100%", height: "1px", background: "rgba(0,0,0,0.10)" }} />

      <div className="sgc-lf-bottom flex flex-col items-center gap-2 px-8 py-6">
        <div className="sgc-lf-links-row flex items-center gap-4 justify-center">
          {[
            { label: "Política de Cookies",    to: "/cookies"    },
            { label: "Política de Privacidad", to: "/privacidad" },
          ].map(({ label, to }, i, arr) => (
            <span key={label} className="flex items-center gap-3">
              <Link href={to}
                className="sgc-lf-link"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.68rem", color: "#111111", letterSpacing: "0.14em",
                  textDecoration: "none",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#000000")}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#111111")}
              >{label}</Link>
              {i < arr.length - 1 && (
                <span className="sgc-lf-dot" style={{ color: "rgba(0,0,0,0.25)", fontSize: "0.7rem" }}>·</span>
              )}
            </span>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/terminos"
            className="sgc-lf-link"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.68rem", color: "#111111", letterSpacing: "0.14em",
              textDecoration: "none",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#000000")}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#111111")}
          >Términos y Condiciones</Link>
        </div>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.65rem", color: "#111111",
          letterSpacing: "0.12em", marginTop: "4px",
        }}>&copy; 2026 SGC Abogados.</p>
      </div>
    </motion.footer>
  );
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", flexDirection: "column" }}>
      <style>{`
        @media (max-width: 640px) {
          .sgc-legal-main {
            padding: 100px 20px 48px !important;
          }
          .sgc-legal-body {
            font-size: 0.88rem !important;
            line-height: 1.78 !important;
          }
          .sgc-legal-updated {
            font-size: 0.78rem !important;
            margin-bottom: 36px !important;
          }
        }
      `}</style>
      <LegalNav />

      <main
        className="sgc-legal-main"
        style={{ flex: 1, maxWidth: "780px", margin: "0 auto", padding: "120px 32px 60px", width: "100%" }}
      >
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: "0.62rem",
          color: BLUE, letterSpacing: "0.22em", marginBottom: "16px",
          textAlign: "center",
        }}>SGC ABOGADOS</p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.1rem, 5.5vw, 2.6rem)",
          fontStyle: "italic", color: TEXT,
          marginBottom: "10px", fontWeight: 500, lineHeight: 1.15,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}>{title}</h1>
        <div style={{ width: "40px", height: "2px", background: BLUE, margin: "0 auto 10px" }} />
        <p
          className="sgc-legal-updated"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.90rem", color: MUTED, marginBottom: "60px",
            textAlign: "center",
          }}
        >Última actualización: {lastUpdated}</p>

        <div
          className="sgc-legal-body"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.06rem", color: TEXT, lineHeight: 1.88,
          }}
        >
          {children}
        </div>

        <div style={{ textAlign: "center", marginTop: "60px", paddingBottom: "20px" }}>
          <Link href="/"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.70rem",
              letterSpacing: "0.22em",
              color: BLUE,
              textDecoration: "none",
              borderBottom: `1px solid ${BLUE}`,
              paddingBottom: "3px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "0.65")}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "1")}
          >← VOLVER AL INICIO</Link>
        </div>
      </main>

      <LegalFooter />
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <FadeOnScroll>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(0.95rem, 3.8vw, 1.45rem)",
        fontStyle: "italic",
        color: TEXT, fontWeight: 500,
        marginTop: "52px", marginBottom: "18px",
        textAlign: "left",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>{children}</h2>
    </FadeOnScroll>
  );
}

export function P({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <FadeOnScroll>
      <p style={{ marginBottom: "20px", textAlign: center ? "center" : "left" }}>{children}</p>
    </FadeOnScroll>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <FadeOnScroll>
      <ul style={{ paddingLeft: "24px", marginBottom: "20px", listStyleType: "disc", textAlign: "left" }}>
        {children}
      </ul>
    </FadeOnScroll>
  );
}

export function LI({ children }: { children: ReactNode }) {
  return <li style={{ marginBottom: "8px" }}>{children}</li>;
}

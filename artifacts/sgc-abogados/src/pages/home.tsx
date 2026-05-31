import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Scale, CheckCircle, Menu, X,
  MessageCircle, Phone, Mail, MapPin, ChevronDown,
} from "lucide-react";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import justiceStatueImg from "@assets/image_1779927370844.png";

/* ─── Design tokens ─────────────────────────────────────── */
const BG    = "#0a0a0a";
const BG2   = "#111111";
const GOLD  = "#d4af37";
const GOLD2 = "#c5a059";
const TEXT  = "#ffffff";
const MUTED = "rgba(255,255,255,0.52)";

/* ─── Framer Motion variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.11 } } };

/* ─── Practice areas ─────────────────────────────────────── */
const AREAS = [
  {
    title: "Derecho Penal",
    desc:  "Defensa y representación jurídica en procesos penales, denuncias, audiencias y protección de derechos fundamentales.",
    items: ["Defensa técnica", "Denuncias y querellas", "Audiencias preliminares", "Asistencia a víctimas", "Procesos ante Fiscalía"],
    roman: "I",
  },
  {
    title: "Derecho Laboral",
    desc:  "Asesoría integral para trabajadores y empleadores en conflictos laborales y protección de derechos.",
    items: ["Liquidaciones e indemnizaciones", "Despidos injustificados", "Acoso laboral", "Contratos laborales", "Conciliaciones y demandas"],
    roman: "II",
  },
  {
    title: "Derecho Administrativo",
    desc:  "Representación ante entidades públicas y defensa de derechos frente a decisiones administrativas.",
    items: ["Derechos de petición", "Acciones constitucionales", "Procesos contencioso-administrativos", "Reparación directa"],
    roman: "III",
  },
  {
    title: "Derecho Disciplinario Policivo",
    desc:  "Defensa y acompañamiento en investigaciones y procesos disciplinarios de carácter policivo.",
    items: ["Descargos y defensa técnica", "Recursos y apelaciones", "Acompañamiento en audiencias", "Asesoría preventiva"],
    roman: "IV",
  },
  {
    title: "Derecho de Tránsito",
    desc:  "Asesoría y representación en asuntos relacionados con infracciones y procedimientos de tránsito.",
    items: ["Comparendos", "Audiencias de tránsito", "Impugnaciones", "Accidentes de tránsito", "Cobros coactivos"],
    roman: "V",
  },
  {
    title: "Derecho de Familia",
    desc:  "Acompañamiento en asuntos familiares con enfoque humano, conciliatorio y estratégico.",
    items: ["Cuota alimentaria", "Custodia y visitas", "Divorcios", "Sucesiones", "Unión marital de hecho"],
    roman: "VI",
  },
  {
    title: "Derecho Civil",
    desc:  "Soluciones legales en conflictos patrimoniales, contractuales y obligaciones civiles.",
    items: ["Procesos ejecutivos", "Contratos", "Responsabilidad civil", "Cobro de cartera", "Declarativos civiles"],
    roman: "VII",
  },
];

/* ─── Native SVG social icons ────────────────────────────── */
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

const SvgX = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SvgFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

/* ─── Particle system (canvas) ───────────────────────────── */
interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number; maxAlpha: number;
  life: number; maxLife: number;
}
function mkP(w: number, h: number): Particle {
  return {
    x: Math.random() * w, y: h + Math.random() * 40,
    vx: (Math.random() - 0.5) * 0.28,
    vy: -(Math.random() * 0.48 + 0.12),
    size: Math.random() * 1.6 + 0.3,
    alpha: 0, maxAlpha: Math.random() * 0.6 + 0.1,
    life: Math.floor(Math.random() * 280),
    maxLife: Math.floor(Math.random() * 220 + 140),
  };
}

/* ─── Area card ──────────────────────────────────────────── */
function AreaCard({ area }: { area: typeof AREAS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex flex-col p-8 relative transition-all duration-300"
      style={{
        background: hov ? "rgba(212,175,55,0.04)" : "transparent",
        border: `1px solid ${hov ? GOLD + "55" : "rgba(212,175,55,0.12)"}`,
        boxShadow: hov ? `0 0 40px rgba(212,175,55,0.06), inset 0 1px 0 rgba(212,175,55,0.12)` : "none",
        minHeight: "280px",
        cursor: "default",
      }}
    >
      {/* Top glow line on hover */}
      {hov && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(to right, transparent, ${GOLD}80, transparent)`,
        }} />
      )}

      {/* Roman numeral watermark */}
      <span style={{
        position: "absolute", top: "10px", right: "16px",
        fontFamily: "'Cinzel', serif",
        fontSize: "4rem", fontWeight: 700,
        color: `rgba(212,175,55,${hov ? "0.07" : "0.03"})`,
        lineHeight: 1, userSelect: "none",
        transition: "color 0.3s",
      }}>{area.roman}</span>

      {/* Gold rule */}
      <div style={{
        width: hov ? "40px" : "20px", height: "1px",
        background: GOLD, opacity: hov ? 1 : 0.45,
        marginBottom: "18px",
        transition: "width 0.35s ease, opacity 0.35s",
      }} />

      <h3 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.92rem", fontWeight: 600,
        color: hov ? GOLD : TEXT,
        letterSpacing: "0.08em",
        marginBottom: "12px",
        transition: "color 0.3s",
      }}>
        {area.title}
      </h3>

      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.9rem", color: MUTED,
        lineHeight: 1.78, marginBottom: "20px",
      }}>
        {area.desc}
      </p>

      <ul className="flex flex-col gap-2 mt-auto">
        {area.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div style={{
              width: "4px", height: "4px",
              background: GOLD, transform: "rotate(45deg)",
              marginTop: "6px", flexShrink: 0,
              opacity: hov ? 0.9 : 0.4,
              transition: "opacity 0.3s",
            }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.83rem",
              color: hov ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.38)",
              lineHeight: 1.5,
              transition: "color 0.3s",
            }}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Stat card (minimalist gold border) ─────────────────── */
function StatCard({ num, label }: { num: string; label: string }) {
  return (
    <div style={{
      padding: "22px 28px",
      border: `1px solid rgba(212,175,55,0.28)`,
      background: "rgba(212,175,55,0.03)",
    }}>
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "1.85rem", color: GOLD2,
        fontWeight: 700, lineHeight: 1,
        display: "block", marginBottom: "6px",
      }}>{num}</span>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.6rem", color: MUTED,
        letterSpacing: "0.18em", textTransform: "uppercase",
      }}>{label}</span>
    </div>
  );
}

/* ─── Section eyebrow ────────────────────────────────────── */
function SecLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div style={{ width: "28px", height: "1px", background: GOLD }} />
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.5rem", color: GOLD, letterSpacing: "0.5em",
      }}>{text}</span>
    </div>
  );
}

/* ─── Gold divider ornament ──────────────────────────────── */
function GoldDivider() {
  return (
    <div className="flex items-center gap-3">
      <div style={{ width: "40px", height: "1px", background: `${GOLD}55` }} />
      <div style={{ width: "5px", height: "5px", background: `${GOLD}75`, transform: "rotate(45deg)" }} />
      <div style={{ width: "20px", height: "1px", background: `${GOLD}35` }} />
    </div>
  );
}

/* ─── Form field ─────────────────────────────────────────── */
function FormField({ id, label, placeholder, type = "text", required = false }:
  { id: string; label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.48rem", letterSpacing: "0.30em", color: `${GOLD}88`,
      }}>{label}</label>
      <Input id={id} type={type} placeholder={placeholder} required={required}
        className="rounded-none border-0 border-b bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{
          borderBottom: `1px solid rgba(212,175,55,0.25)`,
          color: TEXT, fontSize: "0.9rem", boxShadow: "none",
          fontFamily: "'Cormorant Garamond', serif",
        }}
        data-testid={`input-${id}`}
      />
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function Home() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const navBg   = useTransform(scrollY, [0, 80], ["rgba(10,10,10,0.0)", "rgba(10,10,10,0.97)"]);
  const navBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"]);

  /* GSAP hero entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (eyebrowRef.current)
      tl.fromTo(eyebrowRef.current, { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.9 }, 0.3);
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll<HTMLElement>(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 60, rotateX: -50 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.022, duration: 1.1 }, 0.55);
    }
    if (dividerRef.current)
      tl.fromTo(dividerRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.9, ease: "expo.out" }, 1.55);
    if (subRef.current)
      tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.85 }, 1.75);
    if (ctaRef.current)
      tl.fromTo(Array.from(ctaRef.current.children),
        { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.13, duration: 0.75 }, 2.0);
    if (statsRef.current)
      tl.fromTo(statsRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, 2.2);
  }, []);

  /* Gold particles canvas (hero) */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const W = () => canvas.width || 900;
    const H = () => canvas.height || 700;
    const ps: Particle[] = Array.from({ length: 80 }, () => mkP(W(), H()));
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.life++;
        const prog = p.life / p.maxLife;
        p.alpha = prog < 0.18 ? p.maxAlpha * prog / 0.18 :
                  prog > 0.75 ? p.maxAlpha * (1 - prog) / 0.25 : p.maxAlpha;
        if (p.life >= p.maxLife) {
          Object.assign(p, mkP(W(), H())); p.life = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Mensaje enviado", description: "Nos pondremos en contacto con usted lo más pronto posible." });
    (e.target as HTMLFormElement).reset();
  };

  const navLinks = [
    { name: "INICIO",   href: "#inicio"   },
    { name: "ÁREAS",    href: "#areas"    },
    { name: "NOSOTROS", href: "#nosotros" },
    { name: "CONTACTO", href: "#contacto" },
  ];

  const HEADLINE = "Nuestra prioridad es tu tranquilidad legal.";
  const WORDS    = HEADLINE.split(" ");

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: BG, color: TEXT }}>

      {/* ═══════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════════ */}
      <motion.header
        style={{ backgroundColor: navBg, backdropFilter: navBlur }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between"
          style={{ borderBottom: `1px solid rgba(212,175,55,0.10)` }}>

          <a href="#inicio" className="flex items-center gap-2.5">
            <Scale strokeWidth={1.3} className="w-5 h-5" style={{ color: GOLD }} />
            <span style={{
              fontFamily: "'Cinzel', serif",
              color: TEXT, letterSpacing: "0.28em", fontSize: "0.80rem", fontWeight: 600,
            }}>SG ABOGADOS</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(l => (
              <a key={l.name} href={l.href}
                className="transition-colors duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.58rem", letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.55)", fontWeight: 500,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >{l.name}</a>
            ))}
          </nav>

          <a href="#contacto"
            className="hidden md:inline-flex items-center px-5 py-2 transition-all duration-300"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.52rem", letterSpacing: "0.22em",
              border: `1px solid ${GOLD}55`, color: GOLD,
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = GOLD; el.style.color = BG; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = GOLD; }}
          >CONSULTA</a>

          <button className="md:hidden p-2" style={{ color: "rgba(255,255,255,0.75)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="md:hidden px-8 py-6 flex flex-col gap-6"
              style={{ background: "rgba(10,10,10,0.98)", borderBottom: `1px solid ${GOLD}18`, backdropFilter: "blur(16px)" }}
            >
              {navLinks.map(l => (
                <a key={l.name} href={l.href}
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "0.68rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.70)" }}
                  onClick={() => setMobileMenuOpen(false)}>{l.name}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════
          HERO — statue ONLY here, monumental
      ══════════════════════════════════════════════════════════ */}
      <section id="inicio" className="relative overflow-hidden"
        style={{ minHeight: "100vh", background: "#000000" }}>

        {/* Gold particles canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />

        {/* Film grain */}
        <div className="absolute inset-0 pointer-events-none" style={{
          zIndex: 2, opacity: 0.20,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
        }} />

        {/* Edge vignettes */}
        <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: "8%", zIndex: 4, background: "linear-gradient(to right, #000 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 right-0 pointer-events-none" style={{ width: "8%", zIndex: 4, background: "linear-gradient(to left, #000 0%, transparent 100%)" }} />
        <div className="absolute top-0 inset-x-0 pointer-events-none" style={{ height: "12%", zIndex: 4, background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }} />
        <div className="absolute bottom-0 inset-x-0 pointer-events-none" style={{ height: "25%", zIndex: 5, background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />

        {/* ── Main hero layout ── */}
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-10 md:px-16 flex items-center" style={{ minHeight: "100vh" }}>

          {/* TEXT — left column */}
          <div className="flex-1 flex flex-col justify-center py-28 z-20 relative">

            {/* Eyebrow */}
            <div ref={eyebrowRef} style={{ opacity: 0 }} className="flex items-center gap-3 mb-11">
              <Scale size={11} strokeWidth={1.2} style={{ color: GOLD }} />
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.48rem", color: GOLD, letterSpacing: "0.54em",
              }}>SG ABOGADOS · BOGOTÁ, COLOMBIA</span>
            </div>

            {/* Headline */}
            <h1 ref={headlineRef} className="mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)",
                color: TEXT, fontStyle: "italic", fontWeight: 500,
                lineHeight: 1.14, perspective: "700px",
                maxWidth: "540px",
              }}>
              {WORDS.map((word, wi) => (
                <span key={wi} className="inline-block" style={{ marginRight: "0.28em" }}>
                  {word.split("").map((ch, ci) => (
                    <span key={ci} className="char inline-block">{ch}</span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Gold divider */}
            <div ref={dividerRef} className="flex items-center gap-3 mb-7" style={{ opacity: 0, transformOrigin: "left" }}>
              <div style={{ width: "54px", height: "1px", background: GOLD }} />
              <div style={{ width: "6px", height: "6px", background: GOLD, transform: "rotate(45deg)" }} />
              <div style={{ width: "22px", height: "1px", background: `${GOLD}55` }} />
            </div>

            {/* Subtext */}
            <p ref={subRef} style={{
              opacity: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.05rem", color: MUTED, lineHeight: 1.96,
              maxWidth: "390px", marginBottom: "52px",
            }}>
              Derecho de familia, laboral y más — con la dedicación, rigor ético y presencia humana que su caso merece.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex items-center gap-8 flex-wrap mb-14">
              <a href="#contacto"
                className="inline-flex items-center px-8 py-3.5 transition-all duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.58rem", letterSpacing: "0.24em",
                  color: BG, background: GOLD, opacity: 0,
                  boxShadow: `0 4px 28px rgba(212,175,55,0.35)`,
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = GOLD2; el.style.boxShadow = "0 6px 36px rgba(212,175,55,0.50)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = GOLD; el.style.boxShadow = "0 4px 28px rgba(212,175,55,0.35)"; }}
              >AGENDAR CONSULTA</a>

              <a href="#areas"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.58rem", letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.44)", opacity: 0,
                  paddingBottom: "4px", borderBottom: "1px solid rgba(255,255,255,0.18)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = TEXT; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.44)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
              >NUESTRAS ÁREAS</a>
            </div>

            {/* Stat cards */}
            <div ref={statsRef} className="flex items-stretch gap-4 flex-wrap" style={{ opacity: 0 }}>
              {[
                { num: "7",    label: "Especialidades" },
                { num: "+5",   label: "Años de experiencia" },
                { num: "100%", label: "Compromiso" },
              ].map((s, i) => <StatCard key={i} num={s.num} label={s.label} />)}
            </div>
          </div>

          {/* STATUE — right side, monumental */}
          <div className="hidden md:flex flex-none items-end justify-center relative pointer-events-none"
            style={{ width: "clamp(380px, 50vw, 720px)", height: "100vh" }}>

            {/* Outer ambient glow — large, soft */}
            <div style={{
              position: "absolute",
              width: "600px", height: "600px", borderRadius: "50%",
              top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.06) 35%, transparent 65%)`,
              filter: "blur(80px)",
            }} />

            {/* Mid glow — warmer */}
            <div style={{
              position: "absolute",
              width: "320px", height: "320px", borderRadius: "50%",
              top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(255,220,80,0.22) 0%, rgba(212,175,55,0.08) 50%, transparent 72%)",
              filter: "blur(36px)",
            }} />

            {/* Tight hot glow — directly behind statue */}
            <div style={{
              position: "absolute",
              width: "180px", height: "420px",
              top: "50%", left: "50%", transform: "translate(-50%, -52%)",
              background: "radial-gradient(ellipse, rgba(255,215,90,0.15) 0%, transparent 70%)",
              filter: "blur(24px)",
            }} />

            {/* Cinematic light rays */}
            <div style={{
              position: "absolute", top: "8%", left: "55%",
              width: "1.5px", height: "48%",
              background: `linear-gradient(to bottom, transparent 0%, ${GOLD}28 40%, transparent 100%)`,
              transform: "rotate(14deg)", filter: "blur(1px)",
            }} />
            <div style={{
              position: "absolute", top: "18%", left: "38%",
              width: "1px", height: "32%",
              background: `linear-gradient(to bottom, transparent 0%, ${GOLD}13 55%, transparent 100%)`,
              transform: "rotate(-10deg)", filter: "blur(2px)",
            }} />

            {/* The statue — monumental */}
            <motion.img
              src={justiceStatueImg}
              alt="Diosa de la Justicia, Themis — SG Abogados"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative", zIndex: 10,
                width: "clamp(380px, 44vw, 680px)",
                height: "auto", objectFit: "contain",
                filter: [
                  "brightness(1.12)",
                  "contrast(1.08)",
                  "saturate(0.90)",
                  `drop-shadow(0 0 80px rgba(212,175,55,0.32))`,
                  `drop-shadow(0 0 36px rgba(212,175,55,0.22))`,
                  `drop-shadow(0 24px 70px rgba(0,0,0,0.8))`,
                ].join(" "),
                alignSelf: "flex-end",
                marginBottom: 0,
              }}
            />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
          style={{ color: `${GOLD}44` }}
        >
          <div style={{ width: "1px", height: "38px", background: `linear-gradient(to bottom, transparent, ${GOLD}55)` }} />
          <ChevronDown size={12} strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ÁREAS DE PRÁCTICA — full width, clean black
      ══════════════════════════════════════════════════════════ */}
      <section id="areas" className="py-28 relative" style={{ background: BG2 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}50, transparent 60%)` }} />

        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-18">
            <SecLabel text="ESPECIALIDADES JURÍDICAS" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.8vw, 3.0rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
              marginBottom: "16px",
            }}>Áreas de Práctica</h2>
            <GoldDivider />
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {AREAS.slice(0, 6).map((a, i) => <AreaCard key={i} area={a} />)}
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {AREAS.slice(6).map((a, i) => <AreaCard key={i} area={a} />)}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          POR QUÉ ELEGIRNOS — full width
      ══════════════════════════════════════════════════════════ */}
      <section className="py-28 relative" style={{ background: BG }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}45, transparent 60%)` }} />

        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <SecLabel text="NUESTRA PROPUESTA" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.8vw, 3.0rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
            }}>Por qué elegirnos</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid sm:grid-cols-2 gap-0">
            {[
              { num: "01", title: "Experiencia",    desc: "Años de práctica enfocada que nos permiten anticipar escenarios y construir estrategias sólidas para su caso." },
              { num: "02", title: "Compromiso",     desc: "Asumimos cada caso como propio, con la dedicación y el rigor ético que la ley exige y usted merece." },
              { num: "03", title: "Acompañamiento", desc: "Trato personalizado y humano. Usted siempre sabrá el estado real de su proceso, sin sorpresas." },
              { num: "04", title: "Resultados",     desc: "Nos enfocamos en la eficacia, buscando la resolución más favorable en el menor tiempo posible." },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex flex-col p-10 py-14 transition-all duration-300"
                style={{
                  borderTop: `1px solid rgba(212,175,55,0.12)`,
                  borderRight: i % 2 === 0 ? `1px solid rgba(212,175,55,0.08)` : "none",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,175,55,0.025)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "3rem", color: `${GOLD}12`,
                  fontWeight: 700, lineHeight: 1, display: "block", marginBottom: "14px",
                }}>{f.num}</span>
                <div style={{ width: "22px", height: "1px", background: GOLD, opacity: 0.45, marginBottom: "16px" }} />
                <h3 style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.96rem", color: TEXT,
                  fontWeight: 600, letterSpacing: "0.07em", marginBottom: "12px",
                }}>{f.title}</h3>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.92rem", color: MUTED, lineHeight: 1.94,
                }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SOBRE NOSOTROS — full width
      ══════════════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-28 relative" style={{ background: BG2 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}45, transparent 60%)` }} />

        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <SecLabel text="QUIÉNES SOMOS" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.8vw, 3.0rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
            }}>Sobre Nosotros</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <blockquote style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic", fontSize: "1.20rem",
                color: "rgba(255,255,255,0.82)", lineHeight: 1.86,
                borderLeft: `2px solid ${GOLD}`,
                paddingLeft: "24px", marginBottom: "40px",
              }}>
                "Un equipo de abogados dedicados a proteger sus derechos con responsabilidad y cercanía."
              </blockquote>
              {[
                "SG Abogados nace de la convicción de que el ejercicio del derecho debe ser, ante todo, humano. Entendemos que detrás de cada expediente hay historias de vida, patrimonio y tranquilidad en juego.",
                "Nos alejamos de la frialdad corporativa para ofrecer un acompañamiento donde usted es escuchado y comprendido. Actuamos con total transparencia sobre las posibilidades reales de su caso.",
              ].map((txt, i) => (
                <p key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.98rem", color: MUTED, lineHeight: 1.94, marginBottom: "20px",
                }}>{txt}</p>
              ))}
            </div>

            <div className="flex flex-col justify-between gap-10">
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.98rem", color: MUTED, lineHeight: 1.94,
              }}>
                Su tranquilidad es nuestra prioridad. Confíe su caso a profesionales que combinan rigor académico con empatía humana.
              </p>
              <a href="#contacto"
                className="inline-flex items-center self-start px-8 py-3.5 transition-all duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.56rem", color: GOLD, letterSpacing: "0.24em",
                  border: `1px solid ${GOLD}45`,
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = GOLD; el.style.color = BG; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = GOLD; }}
                data-testid="link-nosotros-contacto"
              >AGENDAR CONSULTA</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACTO — full width
      ══════════════════════════════════════════════════════════ */}
      <section id="contacto" className="py-28 relative" style={{ background: BG }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}45, transparent 60%)` }} />

        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <SecLabel text="CONTÁCTENOS" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.8vw, 3.0rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
            }}>Contacto</h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-16">

            {/* Info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="flex-none flex flex-col gap-8" style={{ width: "min(100%, 300px)" }}>

              <div className="flex flex-col gap-6">
                {[
                  { icon: Phone,         label: "TELÉFONO",  value: "+57 (300) 123-4567",    href: "tel:+573001234567"            },
                  { icon: Mail,          label: "CORREO",    value: "contacto@sgabogados.co", href: "mailto:contacto@sgabogados.co" },
                  { icon: MessageCircle, label: "WHATSAPP",  value: "+57 (300) 123-4567",    href: "https://wa.me/573001234567"   },
                ].map(({ icon: Icon, label, value, href }, i) => (
                  <a key={i} href={href} className="flex items-start gap-3 group">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{ border: `1px solid rgba(212,175,55,0.22)`, background: "rgba(212,175,55,0.03)" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = GOLD; el.style.background = `${GOLD}10`; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(212,175,55,0.22)"; el.style.background = "rgba(212,175,55,0.03)"; }}
                    >
                      <Icon size={14} strokeWidth={1.4} style={{ color: GOLD }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.46rem", color: `${GOLD}80`, letterSpacing: "0.28em", marginBottom: "3px" }}>{label}</p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.96rem", color: TEXT }}>{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ borderLeft: `2px solid ${GOLD}40`, paddingLeft: "18px" }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={12} strokeWidth={1.4} style={{ color: GOLD }} />
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.46rem", color: `${GOLD}80`, letterSpacing: "0.28em" }}>UBICACIÓN</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.96rem", color: TEXT, marginBottom: "2px" }}>Cl 12 B 8-23, Oficina 421</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: MUTED }}>Bogotá, Colombia</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", marginTop: "8px", fontSize: "0.8rem", color: `${GOLD}70` }}>
                  Lun–Vie · 8am–6pm · Con cita previa
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 p-10"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderTop: `2px solid ${GOLD}50`,
                border: `1px solid rgba(212,175,55,0.10)`,
              }}>

              <form onSubmit={handleSubmit} className="flex flex-col gap-7" data-testid="form-contact">
                <div className="grid grid-cols-2 gap-6">
                  <FormField id="name"  label="NOMBRE COMPLETO" placeholder="Juan Pérez"     required />
                  <FormField id="phone" label="TELÉFONO"        placeholder="300 123 4567"   required />
                </div>
                <FormField id="email" label="CORREO ELECTRÓNICO" type="email" placeholder="juan@ejemplo.com" required />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="area" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.48rem", letterSpacing: "0.30em", color: `${GOLD}88` }}>
                    ÁREA DE CONSULTA
                  </label>
                  <select id="area" required data-testid="select-area"
                    className="w-full py-2 focus:outline-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      borderBottom: `1px solid rgba(212,175,55,0.25)`,
                      borderTop: "none", borderLeft: "none", borderRight: "none",
                      color: TEXT, background: "transparent", boxShadow: "none", fontSize: "0.9rem",
                    }}>
                    <option value="" style={{ background: "#0a0a0a" }}>Seleccione un área</option>
                    {AREAS.map(a => <option key={a.title} value={a.title} style={{ background: "#0a0a0a" }}>{a.title}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.48rem", letterSpacing: "0.30em", color: `${GOLD}88` }}>
                    SU CONSULTA
                  </label>
                  <Textarea id="message" required placeholder="Describa brevemente su situación..."
                    className="rounded-none border-0 border-b resize-none min-h-[90px] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      borderBottom: `1px solid rgba(212,175,55,0.25)`, boxShadow: "none",
                      color: TEXT, fontSize: "0.9rem",
                    }}
                    data-testid="textarea-message" />
                </div>

                <button type="submit" data-testid="button-submit"
                  className="w-full py-4 transition-all duration-300"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: `${GOLD}18`, color: GOLD2,
                    fontSize: "0.56rem", letterSpacing: "0.32em",
                    border: `1px solid ${GOLD}45`, cursor: "pointer",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = GOLD; el.style.color = BG; el.style.boxShadow = `0 4px 28px rgba(212,175,55,0.35)`; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = `${GOLD}18`; el.style.color = GOLD2; el.style.boxShadow = "none"; }}>
                  ENVIAR MENSAJE
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#050505", borderTop: `1px solid rgba(212,175,55,0.12)` }}>
        <div className="max-w-7xl mx-auto px-8 py-14 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <Scale strokeWidth={1.3} className="w-5 h-5" style={{ color: GOLD }} />
            <span style={{ fontFamily: "'Cinzel', serif", color: TEXT, letterSpacing: "0.32em", fontSize: "0.80rem", fontWeight: 600 }}>
              SG ABOGADOS
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ width: "52px", height: "1px", background: `${GOLD}40` }} />
            <div style={{ width: "5px", height: "5px", background: `${GOLD}60`, transform: "rotate(45deg)" }} />
            <div style={{ width: "52px", height: "1px", background: `${GOLD}40` }} />
          </div>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(255,255,255,0.35)", fontSize: "0.96rem", marginBottom: "32px" }}>
            Estrategia jurídica con carácter.
          </p>

          {/* Social icons — native SVG, NO lucide */}
          <div className="flex items-center justify-center gap-5 mb-10">
            {[
              { label: "Instagram", Icon: SvgInstagram, href: "#" },
              { label: "LinkedIn",  Icon: SvgLinkedIn,  href: "#" },
              { label: "X",         Icon: SvgX,         href: "#" },
              { label: "Facebook",  Icon: SvgFacebook,  href: "#" },
            ].map(({ label, Icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label} data-testid={`link-social-${label.toLowerCase()}`}
                className="w-10 h-10 flex items-center justify-center transition-all duration-300"
                style={{
                  border: `1px solid rgba(212,175,55,0.18)`,
                  color: "rgba(255,255,255,0.40)",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = GOLD; el.style.borderColor = GOLD; el.style.background = `${GOLD}0E`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.40)"; el.style.borderColor = "rgba(212,175,55,0.18)"; el.style.background = "transparent"; }}
              >
                <Icon />
              </a>
            ))}
          </div>

          <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "18px" }} />

          <div className="flex items-center justify-center gap-4 flex-wrap">
            {["Política de Privacidad", "Términos de Servicio"].map(label => (
              <a key={label} href="#"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.04em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
              >{label}</a>
            ))}
            <span style={{ color: "rgba(255,255,255,0.14)", fontSize: "0.6rem" }}>·</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.22)" }}>
              &copy; {new Date().getFullYear()} SG Abogados. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ─── */}
      <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer"
        data-testid="link-whatsapp"
        className="fixed bottom-6 right-6 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 z-50 group"
        style={{ background: "#25D366", boxShadow: "0 4px 24px rgba(37,211,102,0.35)" }}
        aria-label="Contactar por WhatsApp">
        <MessageCircle size={22} className="text-white" />
        <span className="absolute right-full mr-4 py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.78rem",
            background: "#0a0a0a", color: "rgba(255,255,255,0.88)",
            letterSpacing: "0.04em", border: `1px solid ${GOLD}20`,
          }}>
          Chatea con nosotros
        </span>
      </a>
    </div>
  );
}

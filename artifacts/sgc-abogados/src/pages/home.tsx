import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Scale, Menu, X, MessageCircle, Phone, Mail, MapPin, ChevronDown,
} from "lucide-react";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import justiceStatueImg from "@assets/image_1779927370844.png";

/* ─── Design tokens ─────────────────────────────────────── */
const BG    = "#ffffff";
const BG2   = "#f7f7f7";
const GOLD  = "#d4af37";
const GOLD2 = "#b8932a";
const TEXT  = "#0a0a0a";
const MUTED = "rgba(10,10,10,0.52)";

/* ─── Framer Motion variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.10 } } };

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

/* ─── Particle system ────────────────────────────────────── */
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
    size: Math.random() * 1.4 + 0.3,
    alpha: 0, maxAlpha: Math.random() * 0.35 + 0.05,
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
        background: hov ? "#fafafa" : BG,
        borderBottom: `2px solid ${hov ? GOLD : "rgba(212,175,55,0.18)"}`,
        minHeight: "260px",
        cursor: "default",
        boxShadow: hov ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* Roman watermark */}
      <span style={{
        position: "absolute", top: "10px", right: "16px",
        fontFamily: "'Cinzel', serif", fontSize: "3.6rem", fontWeight: 700,
        color: `rgba(212,175,55,${hov ? "0.09" : "0.04"})`,
        lineHeight: 1, userSelect: "none", transition: "color 0.3s",
      }}>{area.roman}</span>

      {/* Gold rule */}
      <div style={{
        width: hov ? "42px" : "20px", height: "2px",
        background: GOLD, marginBottom: "18px",
        transition: "width 0.35s ease",
        opacity: hov ? 1 : 0.4,
      }} />

      <h3 style={{
        fontFamily: "'Cinzel', serif", fontSize: "0.9rem", fontWeight: 600,
        color: hov ? GOLD2 : TEXT, letterSpacing: "0.08em",
        marginBottom: "12px", transition: "color 0.3s",
      }}>{area.title}</h3>

      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.92rem", color: MUTED, lineHeight: 1.80, marginBottom: "18px",
      }}>{area.desc}</p>

      <ul className="flex flex-col gap-2 mt-auto">
        {area.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div style={{
              width: "4px", height: "4px", background: GOLD,
              transform: "rotate(45deg)", marginTop: "6px", flexShrink: 0,
              opacity: hov ? 0.85 : 0.35, transition: "opacity 0.3s",
            }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem",
              color: hov ? MUTED : "rgba(10,10,10,0.35)", lineHeight: 1.5,
              transition: "color 0.3s",
            }}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Stat card ──────────────────────────────────────────── */
function StatCard({ num, label }: { num: string; label: string }) {
  return (
    <div style={{
      padding: "22px 28px",
      borderBottom: `2px solid ${GOLD}`,
      background: BG,
    }}>
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "1.80rem", color: GOLD2,
        fontWeight: 700, lineHeight: 1, display: "block", marginBottom: "6px",
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
      <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.5rem", color: GOLD, letterSpacing: "0.5em" }}>{text}</span>
    </div>
  );
}

/* ─── Gold divider ───────────────────────────────────────── */
function GoldDivider() {
  return (
    <div className="flex items-center gap-3">
      <div style={{ width: "40px", height: "1px", background: `${GOLD}66` }} />
      <div style={{ width: "5px", height: "5px", background: `${GOLD}88`, transform: "rotate(45deg)" }} />
      <div style={{ width: "20px", height: "1px", background: `${GOLD}44` }} />
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
        fontSize: "0.48rem", letterSpacing: "0.30em", color: GOLD2,
      }}>{label}</label>
      <Input id={id} type={type} placeholder={placeholder} required={required}
        className="rounded-none border-0 border-b bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{
          borderBottom: `1px solid rgba(10,10,10,0.18)`,
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
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const navBg   = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0.0)", "rgba(255,255,255,0.97)"]);
  const navBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"]);
  const navShadow = useTransform(scrollY, [0, 80], ["none", "0 1px 0 rgba(0,0,0,0.06)"]);

  /* GSAP hero entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (eyebrowRef.current)
      tl.fromTo(eyebrowRef.current, { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.9 }, 0.3);
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll<HTMLElement>(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 55, rotateX: -48 },
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

  /* Gold particles — subtle on white */
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
    const ps: Particle[] = Array.from({ length: 60 }, () => mkP(W(), H()));
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.life++;
        const prog = p.life / p.maxLife;
        p.alpha = prog < 0.18 ? p.maxAlpha * prog / 0.18 :
                  prog > 0.75 ? p.maxAlpha * (1 - prog) / 0.25 : p.maxAlpha;
        if (p.life >= p.maxLife) { Object.assign(p, mkP(W(), H())); p.life = 0; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,147,30,${p.alpha.toFixed(3)})`;
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
        style={{ backgroundColor: navBg, backdropFilter: navBlur, boxShadow: navShadow }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between">
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
                  fontSize: "0.56rem", letterSpacing: "0.22em",
                  color: "rgba(10,10,10,0.50)", fontWeight: 500,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD2)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(10,10,10,0.50)")}
              >{l.name}</a>
            ))}
          </nav>

          {/* Text-only CTA — no border */}
          <a href="#contacto"
            className="hidden md:inline-flex items-center px-2 py-1 transition-colors duration-300"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.56rem", letterSpacing: "0.22em", color: GOLD2,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
            onMouseLeave={e => (e.currentTarget.style.color = GOLD2)}
          >CONSULTA</a>

          <button className="md:hidden p-2" style={{ color: "rgba(10,10,10,0.65)", background: "none", border: "none" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="md:hidden px-8 py-6 flex flex-col gap-6"
              style={{ background: "rgba(255,255,255,0.98)", borderBottom: `1px solid rgba(0,0,0,0.06)`, backdropFilter: "blur(16px)" }}
            >
              {navLinks.map(l => (
                <a key={l.name} href={l.href}
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "0.68rem", letterSpacing: "0.28em", color: "rgba(10,10,10,0.65)" }}
                  onClick={() => setMobileMenuOpen(false)}>{l.name}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════
          HERO — statue only here, monumental
      ══════════════════════════════════════════════════════════ */}
      <section id="inicio" className="relative overflow-hidden" style={{ minHeight: "100vh", background: BG }}>

        {/* Subtle warm ambient behind statue */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 55% 70% at 78% 60%, rgba(212,175,55,0.09) 0%, transparent 70%)",
          zIndex: 1,
        }} />

        {/* Gold particles canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }} />

        {/* Bottom separator line */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none" style={{
          height: "1px", zIndex: 6,
          background: `linear-gradient(to right, transparent, ${GOLD}33 40%, transparent)`,
        }} />

        {/* Layout */}
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-10 md:px-16 flex items-center" style={{ minHeight: "100vh" }}>

          {/* TEXT — left */}
          <div className="flex-1 flex flex-col justify-center py-28 z-20 relative">

            {/* Eyebrow */}
            <div ref={eyebrowRef} style={{ opacity: 0 }} className="flex items-center gap-3 mb-11">
              <Scale size={11} strokeWidth={1.2} style={{ color: GOLD }} />
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.48rem", color: GOLD2, letterSpacing: "0.54em",
              }}>SG ABOGADOS · BOGOTÁ, COLOMBIA</span>
            </div>

            {/* Headline */}
            <h1 ref={headlineRef} className="mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)",
                color: TEXT, fontStyle: "italic", fontWeight: 500,
                lineHeight: 1.14, perspective: "700px", maxWidth: "540px",
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
              <div style={{ width: "22px", height: "1px", background: `${GOLD}66` }} />
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

            {/* CTAs — text only, no borders */}
            <div ref={ctaRef} className="flex items-center gap-10 flex-wrap mb-14">
              <a href="#contacto"
                className="inline-flex items-center transition-colors duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.58rem", letterSpacing: "0.30em",
                  color: GOLD2, opacity: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                onMouseLeave={e => (e.currentTarget.style.color = GOLD2)}
              >AGENDAR CONSULTA</a>

              <a href="#areas"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.56rem", letterSpacing: "0.22em",
                  color: "rgba(10,10,10,0.38)", opacity: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = MUTED)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(10,10,10,0.38)")}
              >NUESTRAS ÁREAS</a>
            </div>

            {/* Stat cards */}
            <div ref={statsRef} className="flex items-stretch gap-5 flex-wrap" style={{ opacity: 0 }}>
              {[
                { num: "7",    label: "Especialidades" },
                { num: "+5",   label: "Años de experiencia" },
                { num: "100%", label: "Compromiso" },
              ].map((s, i) => <StatCard key={i} num={s.num} label={s.label} />)}
            </div>
          </div>

          {/* STATUE — right, monumental */}
          <div className="hidden md:flex flex-none items-end justify-center relative pointer-events-none"
            style={{ width: "clamp(360px, 48vw, 700px)", height: "100vh" }}>

            {/* Warm ambient glow */}
            <div style={{
              position: "absolute",
              width: "500px", height: "500px", borderRadius: "50%",
              top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 45%, transparent 68%)",
              filter: "blur(60px)",
            }} />

            {/* Cinematic light rays */}
            <div style={{
              position: "absolute", top: "10%", left: "58%",
              width: "1px", height: "42%",
              background: `linear-gradient(to bottom, transparent 0%, ${GOLD}18 45%, transparent 100%)`,
              transform: "rotate(12deg)", filter: "blur(1.5px)",
            }} />

            {/* The statue */}
            <motion.img
              src={justiceStatueImg}
              alt="Diosa de la Justicia, Themis — SG Abogados"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative", zIndex: 10,
                width: "clamp(360px, 42vw, 660px)",
                height: "auto", objectFit: "contain",
                filter: [
                  "brightness(1.05)",
                  "contrast(1.10)",
                  "saturate(0.85)",
                  `drop-shadow(0 0 50px rgba(180,147,30,0.20))`,
                  `drop-shadow(0 0 22px rgba(180,147,30,0.14))`,
                  `drop-shadow(0 20px 50px rgba(0,0,0,0.10))`,
                ].join(" "),
                alignSelf: "flex-end",
              }}
            />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
          style={{ color: `${GOLD}55` }}
        >
          <div style={{ width: "1px", height: "36px", background: `linear-gradient(to bottom, transparent, ${GOLD}44)` }} />
          <ChevronDown size={12} strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ÁREAS
      ══════════════════════════════════════════════════════════ */}
      <section id="areas" className="py-28 relative" style={{ background: BG2 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}40, transparent 55%)` }} />

        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <SecLabel text="ESPECIALIDADES JURÍDICAS" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.6vw, 2.9rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic", marginBottom: "16px",
            }}>Áreas de Práctica</h2>
            <GoldDivider />
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREAS.slice(0, 6).map((a, i) => <AreaCard key={i} area={a} />)}
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {AREAS.slice(6).map((a, i) => <AreaCard key={i} area={a} />)}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          POR QUÉ ELEGIRNOS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-28 relative" style={{ background: BG }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}38, transparent 55%)` }} />

        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <SecLabel text="NUESTRA PROPUESTA" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.6vw, 2.9rem)",
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
                  borderTop: `1px solid rgba(10,10,10,0.07)`,
                  borderRight: i % 2 === 0 ? `1px solid rgba(10,10,10,0.06)` : "none",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = BG2)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: "3rem",
                  color: `rgba(212,175,55,0.18)`, fontWeight: 700, lineHeight: 1,
                  display: "block", marginBottom: "14px",
                }}>{f.num}</span>
                <div style={{ width: "22px", height: "2px", background: GOLD, opacity: 0.55, marginBottom: "16px" }} />
                <h3 style={{
                  fontFamily: "'Cinzel', serif", fontSize: "0.92rem", color: TEXT,
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
          SOBRE NOSOTROS
      ══════════════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-28 relative" style={{ background: BG2 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}38, transparent 55%)` }} />

        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <SecLabel text="QUIÉNES SOMOS" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.6vw, 2.9rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
            }}>Sobre Nosotros</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <blockquote style={{
                fontFamily: "'Playfair Display', serif", fontStyle: "italic",
                fontSize: "1.18rem", color: TEXT, lineHeight: 1.84,
                borderLeft: `3px solid ${GOLD}`,
                paddingLeft: "24px", marginBottom: "38px",
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
            <div className="flex flex-col gap-10">
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.98rem", color: MUTED, lineHeight: 1.94,
              }}>
                Su tranquilidad es nuestra prioridad. Confíe su caso a profesionales que combinan rigor académico con empatía humana.
              </p>
              {/* Text-only button — no border */}
              <a href="#contacto"
                className="inline-flex items-center self-start transition-colors duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.56rem", color: GOLD2, letterSpacing: "0.24em",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                onMouseLeave={e => (e.currentTarget.style.color = GOLD2)}
                data-testid="link-nosotros-contacto"
              >AGENDAR CONSULTA</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACTO
      ══════════════════════════════════════════════════════════ */}
      <section id="contacto" className="py-28 relative" style={{ background: BG }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}38, transparent 55%)` }} />

        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <SecLabel text="CONTÁCTENOS" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.6vw, 2.9rem)",
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
                  <a key={i} href={href} className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0">
                      <Icon size={14} strokeWidth={1.4} style={{ color: GOLD }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.46rem", color: GOLD2, letterSpacing: "0.28em", marginBottom: "3px" }}>{label}</p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.96rem", color: TEXT }}>{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: "20px" }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={12} strokeWidth={1.4} style={{ color: GOLD }} />
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.46rem", color: GOLD2, letterSpacing: "0.28em" }}>UBICACIÓN</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.96rem", color: TEXT, marginBottom: "2px" }}>Cl 12 B 8-23, Oficina 421</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.90rem", color: MUTED }}>Bogotá, Colombia</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", marginTop: "8px", fontSize: "0.80rem", color: GOLD2 }}>
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
                background: BG2,
                borderTop: `3px solid ${GOLD}`,
              }}>

              <form onSubmit={handleSubmit} className="flex flex-col gap-7" data-testid="form-contact">
                <div className="grid grid-cols-2 gap-6">
                  <FormField id="name"  label="NOMBRE COMPLETO" placeholder="Juan Pérez"     required />
                  <FormField id="phone" label="TELÉFONO"        placeholder="300 123 4567"   required />
                </div>
                <FormField id="email" label="CORREO ELECTRÓNICO" type="email" placeholder="juan@ejemplo.com" required />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="area" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.48rem", letterSpacing: "0.30em", color: GOLD2 }}>
                    ÁREA DE CONSULTA
                  </label>
                  <select id="area" required data-testid="select-area"
                    className="w-full py-2 focus:outline-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      borderBottom: `1px solid rgba(10,10,10,0.18)`,
                      borderTop: "none", borderLeft: "none", borderRight: "none",
                      color: TEXT, background: "transparent", boxShadow: "none", fontSize: "0.9rem",
                    }}>
                    <option value="" style={{ background: BG2 }}>Seleccione un área</option>
                    {AREAS.map(a => <option key={a.title} value={a.title} style={{ background: BG2 }}>{a.title}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.48rem", letterSpacing: "0.30em", color: GOLD2 }}>
                    SU CONSULTA
                  </label>
                  <Textarea id="message" required placeholder="Describa brevemente su situación..."
                    className="rounded-none border-0 border-b resize-none min-h-[90px] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      borderBottom: `1px solid rgba(10,10,10,0.18)`, boxShadow: "none",
                      color: TEXT, fontSize: "0.9rem",
                    }}
                    data-testid="textarea-message" />
                </div>

                {/* Text-only submit — no border */}
                <button type="submit" data-testid="button-submit"
                  className="w-full py-4 transition-colors duration-300"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: "none", color: GOLD2,
                    fontSize: "0.56rem", letterSpacing: "0.32em",
                    border: "none", cursor: "pointer",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={e => (e.currentTarget.style.color = GOLD2)}>
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
      <footer style={{ background: BG2, borderTop: `1px solid rgba(10,10,10,0.07)` }}>
        <div className="max-w-7xl mx-auto px-8 py-14 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <Scale strokeWidth={1.3} className="w-5 h-5" style={{ color: GOLD }} />
            <span style={{ fontFamily: "'Cinzel', serif", color: TEXT, letterSpacing: "0.32em", fontSize: "0.80rem", fontWeight: 600 }}>
              SG ABOGADOS
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ width: "52px", height: "1px", background: `${GOLD}55` }} />
            <div style={{ width: "5px", height: "5px", background: `${GOLD}77`, transform: "rotate(45deg)" }} />
            <div style={{ width: "52px", height: "1px", background: `${GOLD}55` }} />
          </div>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: MUTED, fontSize: "0.96rem", marginBottom: "32px" }}>
            Estrategia jurídica con carácter.
          </p>

          {/* Social icons — native SVG */}
          <div className="flex items-center justify-center gap-5 mb-10">
            {[
              { label: "Instagram", Icon: SvgInstagram, href: "#" },
              { label: "LinkedIn",  Icon: SvgLinkedIn,  href: "#" },
              { label: "X",         Icon: SvgX,         href: "#" },
              { label: "Facebook",  Icon: SvgFacebook,  href: "#" },
            ].map(({ label, Icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label} data-testid={`link-social-${label.toLowerCase()}`}
                className="w-10 h-10 flex items-center justify-center transition-colors duration-300"
                style={{ color: "rgba(10,10,10,0.35)" }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD2)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(10,10,10,0.35)")}
              >
                <Icon />
              </a>
            ))}
          </div>

          <div style={{ width: "100%", height: "1px", background: "rgba(10,10,10,0.06)", marginBottom: "18px" }} />

          <div className="flex items-center justify-center gap-4 flex-wrap">
            {["Política de Privacidad", "Términos de Servicio"].map(label => (
              <a key={label} href="#"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", color: "rgba(10,10,10,0.35)", letterSpacing: "0.04em" }}
                onMouseEnter={e => (e.currentTarget.style.color = MUTED)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(10,10,10,0.35)")}
              >{label}</a>
            ))}
            <span style={{ color: "rgba(10,10,10,0.18)", fontSize: "0.6rem" }}>·</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", color: "rgba(10,10,10,0.30)" }}>
              &copy; {new Date().getFullYear()} SG Abogados. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ─── */}
      <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer"
        data-testid="link-whatsapp"
        className="fixed bottom-6 right-6 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-50 group"
        style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.30)" }}
        aria-label="Contactar por WhatsApp">
        <MessageCircle size={22} className="text-white" />
        <span className="absolute right-full mr-4 py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem",
            background: BG, color: MUTED,
            letterSpacing: "0.04em",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}>
          Chatea con nosotros
        </span>
      </a>
    </div>
  );
}

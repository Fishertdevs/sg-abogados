import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Scale, CheckCircle, Menu, X,
  MessageCircle, Phone, Mail, MapPin,
  Facebook, Instagram, ChevronDown,
} from "lucide-react";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import StatuePanel  from "@/components/statue-panel";

/* ─── Design tokens ─────────────────────────────────────── */
const BG    = "#050b1a";
const BG2   = "#030714";
const GOLD  = "#d4af37";
const GOLD2 = "#c5a059";
const TEXT  = "#f4f4f6";
const MUTED = "rgba(244,244,246,0.52)";

/* ─── Framer Motion variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

/* ─── Practice areas ─────────────────────────────────────── */
const AREAS = [
  {
    title: "Derecho Penal",
    desc:  "Defensa y representación jurídica en procesos penales, denuncias, audiencias y protección de derechos fundamentales.",
    items: ["Defensa técnica", "Denuncias y querellas", "Audiencias preliminares", "Asistencia a víctimas", "Procesos ante Fiscalía"],
    scene: "linear-gradient(135deg, rgba(80,8,8,0.72) 0%, rgba(5,11,26,0.92) 100%)",
    accent: "rgba(200,40,40,0.18)",
    roman: "I",
  },
  {
    title: "Derecho Laboral",
    desc:  "Asesoría integral para trabajadores y empleadores en conflictos laborales y protección de derechos.",
    items: ["Liquidaciones e indemnizaciones", "Despidos injustificados", "Acoso laboral", "Contratos laborales", "Conciliaciones y demandas"],
    scene: "linear-gradient(135deg, rgba(5,28,68,0.72) 0%, rgba(3,7,20,0.92) 100%)",
    accent: "rgba(20,80,160,0.18)",
    roman: "II",
  },
  {
    title: "Derecho Administrativo",
    desc:  "Representación ante entidades públicas y defensa de derechos frente a decisiones administrativas.",
    items: ["Derechos de petición", "Acciones constitucionales", "Procesos contencioso-administrativos", "Reparación directa"],
    scene: "linear-gradient(135deg, rgba(10,22,48,0.72) 0%, rgba(3,7,20,0.92) 100%)",
    accent: "rgba(30,60,120,0.18)",
    roman: "III",
  },
  {
    title: "Derecho Disciplinario Policivo",
    desc:  "Defensa y acompañamiento en investigaciones y procesos disciplinarios de carácter policivo.",
    items: ["Descargos y defensa técnica", "Recursos y apelaciones", "Acompañamiento en audiencias", "Asesoría preventiva"],
    scene: "linear-gradient(135deg, rgba(22,8,55,0.72) 0%, rgba(3,7,20,0.92) 100%)",
    accent: "rgba(60,20,140,0.18)",
    roman: "IV",
  },
  {
    title: "Derecho de Tránsito",
    desc:  "Asesoría y representación en asuntos relacionados con infracciones y procedimientos de tránsito.",
    items: ["Comparendos", "Audiencias de tránsito", "Impugnaciones", "Accidentes de tránsito", "Cobros coactivos"],
    scene: "linear-gradient(135deg, rgba(48,28,5,0.72) 0%, rgba(3,7,20,0.92) 100%)",
    accent: "rgba(140,80,10,0.18)",
    roman: "V",
  },
  {
    title: "Derecho de Familia",
    desc:  "Acompañamiento en asuntos familiares con enfoque humano, conciliatorio y estratégico.",
    items: ["Cuota alimentaria", "Custodia y visitas", "Divorcios", "Sucesiones", "Unión marital de hecho"],
    scene: "linear-gradient(135deg, rgba(55,8,25,0.72) 0%, rgba(3,7,20,0.92) 100%)",
    accent: "rgba(150,20,60,0.18)",
    roman: "VI",
  },
  {
    title: "Derecho Civil",
    desc:  "Soluciones legales en conflictos patrimoniales, contractuales y obligaciones civiles.",
    items: ["Procesos ejecutivos", "Contratos", "Responsabilidad civil", "Cobro de cartera", "Declarativos civiles"],
    scene: "linear-gradient(135deg, rgba(5,38,45,0.72) 0%, rgba(3,7,20,0.92) 100%)",
    accent: "rgba(10,100,120,0.18)",
    roman: "VII",
  },
];

/* ─── Cinematic Area Card ────────────────────────────────── */
function AreaCard({ area, index }: { area: typeof AREAS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: hovered ? -6 : 0,
        scale: hovered ? 1.015 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col overflow-hidden"
      style={{
        minHeight: "300px",
        background: area.scene,
        backdropFilter: "blur(16px)",
        border: `1px solid ${hovered ? GOLD + "60" : "rgba(212,175,55,0.14)"}`,
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${area.accent}, inset 0 1px 0 rgba(212,175,55,0.15)`
          : "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.06)",
        transition: "border-color 0.35s, box-shadow 0.35s",
        cursor: "default",
      }}
    >
      {/* Ambient glow top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: hovered
          ? `linear-gradient(to right, transparent, ${GOLD}80, transparent)`
          : `linear-gradient(to right, transparent, ${GOLD}25, transparent)`,
        transition: "background 0.4s",
      }} />

      {/* Roman numeral watermark */}
      <div style={{
        position: "absolute", top: "12px", right: "18px",
        fontFamily: "'Cinzel', serif",
        fontSize: "4.5rem", fontWeight: 700,
        color: `rgba(212,175,55,${hovered ? "0.06" : "0.04"})`,
        lineHeight: 1, userSelect: "none",
        transition: "color 0.35s",
      }}>
        {area.roman}
      </div>

      <div className="relative z-10 flex flex-col p-7 h-full">
        {/* Gold rule */}
        <div style={{
          width: hovered ? "44px" : "22px", height: "1px",
          background: GOLD,
          marginBottom: "18px",
          transition: "width 0.4s ease",
          opacity: hovered ? 1 : 0.6,
        }} />

        <h3 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: hovered ? GOLD : TEXT,
          letterSpacing: "0.08em",
          marginBottom: "14px",
          transition: "color 0.35s",
        }}>
          {area.title}
        </h3>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.88rem",
          color: hovered ? "rgba(244,244,246,0.78)" : MUTED,
          lineHeight: 1.76,
          marginBottom: "20px",
          transition: "color 0.35s",
        }}>
          {area.desc}
        </p>

        <ul className="flex flex-col gap-2 mt-auto">
          {area.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div style={{
                width: "4px", height: "4px",
                background: GOLD,
                transform: "rotate(45deg)",
                marginTop: "6px",
                flexShrink: 0,
                opacity: hovered ? 1 : 0.5,
                transition: "opacity 0.35s",
              }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.82rem",
                color: hovered ? "rgba(244,244,246,0.72)" : "rgba(244,244,246,0.44)",
                lineHeight: 1.5,
                transition: "color 0.35s",
              }}>{item}</span>
            </li>
          ))}
        </ul>

        {/* Bottom accent bar */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "2px",
                background: `linear-gradient(to right, transparent, ${GOLD}60, transparent)`,
                transformOrigin: "left",
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Glassmorphism Stat Card ────────────────────────────── */
function StatCard({ num, label }: { num: string; label: string }) {
  return (
    <div style={{
      padding: "20px 28px",
      background: "rgba(255,255,255,0.04)",
      backdropFilter: "blur(14px)",
      border: `1px solid rgba(212,175,55,0.22)`,
      boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.10)",
    }}>
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "1.8rem", color: GOLD2,
        fontWeight: 700, lineHeight: 1, display: "block", marginBottom: "6px",
      }}>{num}</span>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.6rem", color: MUTED,
        letterSpacing: "0.16em", textTransform: "uppercase",
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
        fontSize: "0.52rem", color: GOLD, letterSpacing: "0.48em",
      }}>{text}</span>
    </div>
  );
}

/* ─── Gold ornament divider ──────────────────────────────── */
function GoldDivider({ mb = 8 }: { mb?: number }) {
  return (
    <div className="flex items-center gap-3" style={{ marginBottom: `${mb}px` }}>
      <div style={{ width: "40px", height: "1px", background: `${GOLD}55` }} />
      <div style={{ width: "5px", height: "5px", background: `${GOLD}75`, transform: "rotate(45deg)" }} />
      <div style={{ width: "20px", height: "1px", background: `${GOLD}35` }} />
    </div>
  );
}

/* ─── Form field ─────────────────────────────────────────── */
function FormField({
  id, label, placeholder, type = "text", required = false,
}: {
  id: string; label: string; placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.5rem", letterSpacing: "0.28em", color: `${GOLD}99`,
      }}>
        {label}
      </label>
      <Input
        id={id} type={type} placeholder={placeholder} required={required}
        className="rounded-none border-0 border-b font-serif bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{
          borderBottom: `1px solid ${GOLD}30`,
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

  const { scrollY } = useScroll();
  const navBg   = useTransform(scrollY, [0, 80], ["rgba(5,11,26,0.0)", "rgba(3,7,20,0.96)"]);
  const navBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(18px)"]);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);

  /* GSAP hero entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    if (eyebrowRef.current)
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.9 },
        0.3
      );

    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll<HTMLElement>(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 58, rotateX: -52 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.024, duration: 1.1 },
        0.55
      );
    }

    if (dividerRef.current)
      tl.fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.95, ease: "expo.out" },
        1.55
      );

    if (subRef.current)
      tl.fromTo(subRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.85 }, 1.75);

    if (ctaRef.current)
      tl.fromTo(Array.from(ctaRef.current.children),
        { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.14, duration: 0.75 }, 2.0);

    if (statsRef.current)
      tl.fromTo(statsRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.85 }, 2.2);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto con usted lo más pronto posible.",
    });
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

      {/* ── FIXED STATUE PANEL ────────────────────────────── */}
      <StatuePanel />

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
              color: TEXT, letterSpacing: "0.26em", fontSize: "0.82rem", fontWeight: 600,
            }}>
              SG ABOGADOS
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(l => (
              <a key={l.name} href={l.href}
                className="transition-colors duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.6rem", letterSpacing: "0.22em",
                  color: "rgba(244,244,246,0.62)", fontWeight: 500,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(244,244,246,0.62)")}
              >{l.name}</a>
            ))}
          </nav>

          <a href="#contacto"
            className="hidden md:flex items-center px-5 py-2 transition-all duration-300"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.55rem", letterSpacing: "0.22em",
              border: `1px solid ${GOLD}50`, color: GOLD,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${GOLD}18`;
              (e.currentTarget as HTMLElement).style.borderColor = GOLD;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}50`;
            }}
          >
            CONSULTA
          </a>

          <button className="md:hidden p-2" style={{ color: "rgba(244,244,246,0.82)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden px-8 py-6 flex flex-col gap-6"
              style={{ background: "rgba(3,7,20,0.98)", borderBottom: `1px solid ${GOLD}18`, backdropFilter: "blur(18px)" }}
            >
              {navLinks.map(l => (
                <a key={l.name} href={l.href}
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.26em", color: "rgba(244,244,246,0.72)" }}
                  onClick={() => setMobileMenuOpen(false)}>{l.name}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── SCROLLING CONTENT ─── */}
      <main className="flex-1 pt-[72px] content-with-statue">

        {/* ═══════════════════════════════════════════════════════
            HERO — cinematic full-height
        ══════════════════════════════════════════════════════════ */}
        <section id="inicio" className="relative flex flex-col justify-center px-8 md:px-14 lg:px-20"
          style={{ minHeight: "100vh", background: `linear-gradient(160deg, #0a1128 0%, #000411 60%, #050b1a 100%)` }}>

          {/* Deep vignette bottom */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
            height: "35%",
            background: `linear-gradient(to top, ${BG} 0%, transparent 100%)`,
          }} />

          {/* Ambient blue glow — bottom left */}
          <div className="absolute pointer-events-none" style={{
            bottom: 0, left: 0, width: "60%", height: "55%",
            background: `radial-gradient(ellipse 70% 70% at 15% 100%, rgba(10,40,100,0.30) 0%, transparent 65%)`,
          }} />

          {/* Cinematic top line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 1.1, ease: "easeOut" }}
            className="absolute top-0 left-0"
            style={{
              transformOrigin: "left", width: "45%", height: "1px",
              background: `linear-gradient(to right, ${GOLD}60, transparent)`,
            }}
          />

          {/* Side accent line */}
          <motion.div
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            className="absolute top-0 left-0"
            style={{
              transformOrigin: "top", width: "1px", height: "60%",
              background: `linear-gradient(to bottom, ${GOLD}40, transparent)`,
            }}
          />

          {/* Eyebrow */}
          <div ref={eyebrowRef} style={{ opacity: 0 }} className="flex items-center gap-3 mb-11">
            <Scale size={11} strokeWidth={1.2} style={{ color: GOLD }} />
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.5rem", color: GOLD, letterSpacing: "0.52em",
            }}>
              SG ABOGADOS · BOGOTÁ, COLOMBIA
            </span>
          </div>

          {/* GSAP headline — Cinzel */}
          <h1 ref={headlineRef} className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.1rem, 4.4vw, 4.0rem)",
              color: TEXT, fontStyle: "italic", fontWeight: 500,
              lineHeight: 1.16, perspective: "700px",
              maxWidth: "560px",
              textShadow: "0 2px 40px rgba(212,175,55,0.08)",
            }}>
            {WORDS.map((word, wi) => (
              <span key={wi} className="inline-block" style={{ marginRight: "0.3em" }}>
                {word.split("").map((ch, ci) => (
                  <span key={ci} className="char inline-block">{ch}</span>
                ))}
              </span>
            ))}
          </h1>

          {/* Gold ornament */}
          <div
            ref={dividerRef}
            className="flex items-center gap-3 mb-8"
            style={{ opacity: 0, transformOrigin: "left" }}
          >
            <div style={{ width: "52px", height: "1px", background: GOLD }} />
            <div style={{ width: "6px", height: "6px", background: GOLD, transform: "rotate(45deg)" }} />
            <div style={{ width: "22px", height: "1px", background: `${GOLD}55` }} />
          </div>

          {/* Subtext */}
          <p ref={subRef} style={{
            opacity: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.05rem", color: MUTED, lineHeight: 1.94,
            maxWidth: "400px", marginBottom: "52px",
          }}>
            Derecho de familia, laboral y más — con la dedicación, rigor ético y
            presencia humana que su caso merece.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex items-center gap-8 flex-wrap mb-14">
            <a href="#contacto"
              className="relative group inline-flex items-center px-8 py-3.5 transition-all duration-300"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.6rem", letterSpacing: "0.24em", color: BG,
                background: GOLD, opacity: 0,
                boxShadow: `0 4px 24px rgba(212,175,55,0.30)`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD2; (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 32px rgba(212,175,55,0.45)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px rgba(212,175,55,0.30)`; }}
            >
              AGENDAR CONSULTA
            </a>
            <a href="#areas"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.6rem", letterSpacing: "0.22em",
                color: "rgba(244,244,246,0.50)", opacity: 0,
                paddingBottom: "4px", borderBottom: `1px solid rgba(244,244,246,0.20)`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = TEXT; (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,244,246,0.45)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(244,244,246,0.50)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,244,246,0.20)"; }}
            >
              NUESTRAS ÁREAS
            </a>
          </div>

          {/* Glassmorphism stat cards */}
          <div ref={statsRef} className="flex items-stretch gap-4 flex-wrap" style={{ opacity: 0 }}>
            {[
              { num: "7",    label: "Especialidades" },
              { num: "+5",   label: "Años de experiencia" },
              { num: "100%", label: "Compromiso" },
            ].map((s, i) => <StatCard key={i} num={s.num} label={s.label} />)}
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
            style={{ color: `${GOLD}50` }}
          >
            <div style={{ width: "1px", height: "36px", background: `linear-gradient(to bottom, transparent, ${GOLD}55)` }} />
            <ChevronDown size={12} strokeWidth={1.5} />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            ÁREAS DE PRÁCTICA — cinematic gallery
        ══════════════════════════════════════════════════════════ */}
        <section id="areas" className="py-24 px-8 md:px-14 lg:px-20 relative" style={{ background: BG2 }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}50, transparent 70%)` }} />

          {/* Section ambient glow */}
          <div className="absolute pointer-events-none" style={{
            top: 0, left: "20%", width: "60%", height: "50%",
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 70%)`,
          }} />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <SecLabel text="ESPECIALIDADES JURÍDICAS" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3.8vw, 3.0rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
              marginBottom: "16px",
            }}>
              Áreas de Práctica
            </h2>
            <GoldDivider mb={0} />
          </motion.div>

          {/* First row — 2 cols */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid sm:grid-cols-2 gap-4 mb-4">
            {AREAS.slice(0, 2).map((a, i) => <AreaCard key={i} area={a} index={i} />)}
          </motion.div>
          {/* Second row — 3 cols */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {AREAS.slice(2, 5).map((a, i) => <AreaCard key={i} area={a} index={i + 2} />)}
          </motion.div>
          {/* Third row — 2 cols */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid sm:grid-cols-2 gap-4">
            {AREAS.slice(5).map((a, i) => <AreaCard key={i} area={a} index={i + 5} />)}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            POR QUÉ ELEGIRNOS — illuminated pillars
        ══════════════════════════════════════════════════════════ */}
        <section className="py-24 px-8 md:px-14 lg:px-20 relative"
          style={{ background: `linear-gradient(180deg, ${BG} 0%, #071020 100%)` }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}45, transparent 65%)` }} />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <SecLabel text="NUESTRA PROPUESTA" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3.8vw, 3.0rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
            }}>
              Por qué elegirnos
            </h2>
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
                className="flex flex-col p-10 py-14 relative group transition-all duration-400"
                style={{
                  borderTop: `1px solid rgba(212,175,55,0.14)`,
                  borderRight: i % 2 === 0 ? `1px solid rgba(212,175,55,0.08)` : "none",
                  boxShadow: "inset 0 0 0 0 rgba(212,175,55,0)",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,175,55,0.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  display: "block", marginBottom: "16px",
                  fontSize: "3.2rem", color: `${GOLD}14`,
                  fontWeight: 700, lineHeight: 1,
                }}>
                  {f.num}
                </span>
                <div style={{ width: "22px", height: "1px", background: GOLD, opacity: 0.55, marginBottom: "18px" }} />
                <h3 style={{
                  fontFamily: "'Cinzel', serif",
                  marginBottom: "14px", fontSize: "1.0rem",
                  color: TEXT, fontWeight: 600, letterSpacing: "0.06em",
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.92rem", color: MUTED, lineHeight: 1.92,
                }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SOBRE NOSOTROS
        ══════════════════════════════════════════════════════════ */}
        <section id="nosotros" className="py-24 px-8 md:px-14 lg:px-20 relative" style={{ background: BG2 }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}45, transparent 65%)` }} />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <SecLabel text="QUIÉNES SOMOS" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3.8vw, 3.0rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
            }}>
              Sobre Nosotros
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <blockquote style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "1.18rem",
              color: "rgba(244,244,246,0.82)",
              lineHeight: 1.84,
              borderLeft: `2px solid ${GOLD}`,
              paddingLeft: "22px",
              maxWidth: "540px",
              marginBottom: "36px",
              boxShadow: `-4px 0 20px rgba(212,175,55,0.08)`,
            }}>
              "Un equipo de abogados dedicados a proteger sus derechos con responsabilidad y cercanía."
            </blockquote>

            <div className="flex flex-col gap-6 mb-12" style={{ maxWidth: "540px" }}>
              {[
                "SG Abogados nace de la convicción de que el ejercicio del derecho debe ser, ante todo, humano. Entendemos que detrás de cada expediente hay historias de vida, patrimonio y tranquilidad en juego.",
                "Nos alejamos de la frialdad corporativa para ofrecer un acompañamiento donde usted es escuchado y comprendido. Actuamos con total transparencia sobre las posibilidades reales de su caso.",
                "Su tranquilidad es nuestra prioridad. Confíe su caso a profesionales que combinan rigor académico con empatía humana.",
              ].map((txt, i) => (
                <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.98rem", color: MUTED, lineHeight: 1.92 }}>
                  {txt}
                </p>
              ))}
            </div>

            <a href="#contacto"
              className="inline-flex items-center gap-3 px-8 py-3.5 transition-all duration-300"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.58rem", color: GOLD, letterSpacing: "0.24em",
                border: `1px solid ${GOLD}45`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${GOLD}12`; (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}45`; }}
              data-testid="link-nosotros-contacto"
            >
              AGENDAR UNA CONSULTA
            </a>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CONTACTO
        ══════════════════════════════════════════════════════════ */}
        <section id="contacto" className="py-24 px-8 md:px-14 lg:px-20 relative"
          style={{ background: `linear-gradient(180deg, ${BG} 0%, #030714 100%)` }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}45, transparent 65%)` }} />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <SecLabel text="CONTÁCTENOS" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3.8vw, 3.0rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
            }}>
              Contacto
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-14">

            {/* INFO COLUMN */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="flex-none flex flex-col gap-8" style={{ width: "min(100%, 290px)" }}>

              <div className="flex flex-col gap-6">
                {[
                  { icon: Phone,         label: "TELÉFONO",  value: "+57 (300) 123-4567",    href: "tel:+573001234567"           },
                  { icon: Mail,          label: "CORREO",    value: "contacto@sgabogados.co", href: "mailto:contacto@sgabogados.co" },
                  { icon: MessageCircle, label: "WHATSAPP",  value: "+57 (300) 123-4567",    href: "https://wa.me/573001234567"  },
                ].map(({ icon: Icon, label, value, href }, i) => (
                  <a key={i} href={href} className="flex items-start gap-3 group">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        border: `1px solid rgba(212,175,55,0.25)`,
                        background: "rgba(212,175,55,0.04)",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.background = `${GOLD}10`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.25)"; (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.04)"; }}
                    >
                      <Icon size={14} strokeWidth={1.4} style={{ color: GOLD }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.48rem", color: `${GOLD}88`, letterSpacing: "0.26em", marginBottom: "3px" }}>
                        {label}
                      </p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: TEXT }}>
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ borderLeft: `2px solid ${GOLD}40`, paddingLeft: "18px", boxShadow: `-3px 0 15px rgba(212,175,55,0.06)` }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={12} strokeWidth={1.4} style={{ color: GOLD }} />
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.48rem", color: `${GOLD}88`, letterSpacing: "0.26em" }}>UBICACIÓN</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: TEXT, marginBottom: "3px" }}>Cl 12 B 8-23, Oficina 421</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: MUTED }}>Bogotá, Colombia</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", marginTop: "8px", fontSize: "0.8rem", color: `${GOLD}70` }}>
                  Lun–Vie · 8am–6pm · Con cita previa
                </p>
              </div>
            </motion.div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 p-9"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(14px)",
                borderTop: `2px solid ${GOLD}55`,
                border: `1px solid rgba(212,175,55,0.12)`,
                boxShadow: "0 8px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.08)",
              }}>

              <form onSubmit={handleSubmit} className="flex flex-col gap-7" data-testid="form-contact">
                <div className="grid grid-cols-2 gap-6">
                  <FormField id="name"  label="NOMBRE COMPLETO" placeholder="Juan Pérez"     required />
                  <FormField id="phone" label="TELÉFONO"        placeholder="300 123 4567"   required />
                </div>
                <FormField id="email" label="CORREO ELECTRÓNICO" type="email" placeholder="juan@ejemplo.com" required />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="area" style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.5rem", letterSpacing: "0.28em", color: `${GOLD}99`,
                  }}>
                    ÁREA DE CONSULTA
                  </label>
                  <select id="area" required data-testid="select-area"
                    className="w-full py-2 focus:outline-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      borderBottom: `1px solid ${GOLD}30`,
                      borderTop: "none", borderLeft: "none", borderRight: "none",
                      color: TEXT, background: "transparent", boxShadow: "none", fontSize: "0.9rem",
                    }}>
                    <option value="" style={{ background: "#0A0D1A" }}>Seleccione un área</option>
                    {AREAS.map(a => <option key={a.title} value={a.title} style={{ background: "#0A0D1A" }}>{a.title}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.5rem", letterSpacing: "0.28em", color: `${GOLD}99`,
                  }}>
                    SU CONSULTA
                  </label>
                  <Textarea id="message" required placeholder="Describa brevemente su situación..."
                    className="rounded-none border-0 border-b resize-none min-h-[90px] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      borderBottom: `1px solid ${GOLD}30`, boxShadow: "none", color: TEXT, fontSize: "0.9rem",
                    }}
                    data-testid="textarea-message" />
                </div>

                <button type="submit" data-testid="button-submit"
                  className="w-full py-4 transition-all duration-300"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: `${GOLD}18`, color: GOLD2,
                    fontSize: "0.58rem", letterSpacing: "0.30em",
                    border: `1px solid ${GOLD}45`, cursor: "pointer",
                  }}
                  onMouseEnter={e => { (e.currentTarget.style.background = GOLD); (e.currentTarget.style.color = BG); (e.currentTarget.style.boxShadow = `0 4px 24px rgba(212,175,55,0.30)`); }}
                  onMouseLeave={e => { (e.currentTarget.style.background = `${GOLD}18`); (e.currentTarget.style.color = GOLD2); (e.currentTarget.style.boxShadow = "none"); }}>
                  ENVIAR MENSAJE
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#020408", borderTop: `1px solid rgba(212,175,55,0.14)`, position: "relative", zIndex: 10 }}>
        <div className="max-w-5xl mx-auto px-8 py-14 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <Scale strokeWidth={1.3} className="w-5 h-5" style={{ color: GOLD }} />
            <span style={{ fontFamily: "'Cinzel', serif", color: TEXT, letterSpacing: "0.30em", fontSize: "0.82rem", fontWeight: 600 }}>
              SG ABOGADOS
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ width: "52px", height: "1px", background: `${GOLD}40` }} />
            <div style={{ width: "5px", height: "5px", background: `${GOLD}60`, transform: "rotate(45deg)" }} />
            <div style={{ width: "52px", height: "1px", background: `${GOLD}40` }} />
          </div>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(244,244,246,0.40)", fontSize: "0.95rem", marginBottom: "32px" }}>
            Estrategia jurídica con carácter.
          </p>

          <div className="flex items-center justify-center gap-4 mb-10">
            {[
              { label: "Facebook",  icon: <Facebook size={16} />,      href: "#" },
              { label: "Instagram", icon: <Instagram size={16} />,     href: "#" },
              { label: "WhatsApp",  icon: <MessageCircle size={16} />, href: "https://wa.me/573001234567" },
            ].map(({ label, icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label} data-testid={`link-social-${label.toLowerCase()}`}
                className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                style={{ border: `1px solid rgba(212,175,55,0.18)`, color: "rgba(244,244,246,0.42)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.color = GOLD2; (e.currentTarget as HTMLElement).style.background = `${GOLD}10`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.18)"; (e.currentTarget as HTMLElement).style.color = "rgba(244,244,246,0.42)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                {icon}
              </a>
            ))}
          </div>

          <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "18px" }} />

          <div className="flex items-center justify-center gap-4 flex-wrap">
            {["Política de Privacidad", "Términos de Servicio"].map(label => (
              <a key={label} href="#"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", color: "rgba(244,244,246,0.32)", letterSpacing: "0.05em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(244,244,246,0.58)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(244,244,246,0.32)")}
              >
                {label}
              </a>
            ))}
            <span style={{ color: "rgba(244,244,246,0.18)", fontSize: "0.6rem" }}>·</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", color: "rgba(244,244,246,0.28)" }}>
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
        <span className="absolute right-full mr-4 text-xs py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          style={{ fontFamily: "'Cormorant Garamond', serif", background: BG2, color: "rgba(244,244,246,0.9)", letterSpacing: "0.04em", border: `1px solid ${GOLD}20` }}>
          Chatea con nosotros
        </span>
      </a>
    </div>
  );
}

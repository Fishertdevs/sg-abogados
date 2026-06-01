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
import courthouseImg from "@assets/courthouse_illustration.png";

/* ─── Paleta oficial: Café · Negro · Blanco ──────────────── */
const BG    = "#ffffff";
const BG2   = "#f7f2ee";
const CAFE  = "#6B3A2A";        /* café – acento principal   */
const CAFE2 = "#4e2b1e";        /* café oscuro – hover       */
const TEXT  = "#111111";
const MUTED = "rgba(17,17,17,0.52)";

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

/* ─── Section eyebrow ────────────────────────────────────── */
function SecLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div style={{ width: "28px", height: "1px", background: CAFE }} />
      <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.5rem", color: CAFE, letterSpacing: "0.5em" }}>{text}</span>
    </div>
  );
}

/* ─── Gold divider (ahora café) ──────────────────────────── */
function CafeDivider() {
  return (
    <div className="flex items-center gap-3">
      <div style={{ width: "40px", height: "1px", background: `${CAFE}66` }} />
      <div style={{ width: "5px", height: "5px", background: `${CAFE}88`, transform: "rotate(45deg)" }} />
      <div style={{ width: "20px", height: "1px", background: `${CAFE}44` }} />
    </div>
  );
}

/* ─── 3D Carousel ────────────────────────────────────────── */
function AreasCarousel() {
  const [active, setActive] = useState(0);
  const total = AREAS.length;

  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % total), 4000);
    return () => clearInterval(timer);
  }, [total]);

  const go = (dir: 1 | -1) => setActive(p => (p + dir + total) % total);

  /* relative position of each card to the active one */
  const getPos = (i: number) => {
    let d = i - active;
    if (d >  total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const cardStyle = (pos: number): React.CSSProperties => {
    const abs = Math.abs(pos);
    if (abs > 2) return { display: "none" };

    const scale   = abs === 0 ? 1 : abs === 1 ? 0.80 : 0.64;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.50 : 0.22;
    const translateX = pos * 260;
    const zIndex  = 10 - abs;

    return {
      position: "absolute",
      width: "300px",
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)",
      cursor: abs === 0 ? "default" : "pointer",
      pointerEvents: abs > 2 ? "none" : "auto",
    };
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full">

      {/* Card stage */}
      <div className="relative w-full flex items-center justify-center"
        style={{ height: "420px" }}>
        {AREAS.map((area, i) => {
          const pos = getPos(i);
          if (Math.abs(pos) > 2) return null;
          return (
            <div key={i} style={cardStyle(pos)}
              onClick={() => pos !== 0 && setActive(i)}>
              <div className="flex flex-col items-center p-8 h-full"
                style={{
                  background: "#ffffff",
                  minHeight: "380px",
                  borderRadius: "18px",
                  boxShadow: pos === 0
                    ? "0 24px 70px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.18)"
                    : "0 8px 30px rgba(0,0,0,0.18)",
                }}>

                {/* Roman number */}
                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: "2.8rem", fontWeight: 700,
                  color: TEXT, lineHeight: 1, marginBottom: "4px",
                  textAlign: "center", width: "100%",
                }}>{area.roman}</span>

                {/* Accent line */}
                <div style={{ width: "36px", height: "2px", background: CAFE, marginBottom: "18px" }} />

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Cinzel', serif", fontSize: "0.88rem", fontWeight: 700,
                  color: TEXT, letterSpacing: "0.07em", marginBottom: "14px",
                  textAlign: "center", width: "100%",
                }}>{area.title}</h3>

                {/* Description */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.88rem", color: TEXT, lineHeight: 1.80, marginBottom: "18px",
                  textAlign: "center", width: "100%",
                }}>{area.desc}</p>

                {/* Items */}
                <ul className="flex flex-col gap-2 mt-auto w-full">
                  {area.items.slice(0, 4).map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div style={{
                        width: "4px", height: "4px", background: CAFE,
                        transform: "rotate(45deg)", marginTop: "6px", flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.80rem", color: TEXT, lineHeight: 1.5,
                      }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination dots */}
      <div className="flex items-center gap-2.5">
        {AREAS.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === active ? "#ffffff" : "rgba(255,255,255,0.30)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>

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
        fontSize: "0.48rem", letterSpacing: "0.30em", color: CAFE2,
      }}>{label}</label>
      <Input id={id} type={type} placeholder={placeholder} required={required}
        className="rounded-none border-0 border-b bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{
          borderBottom: `1px solid rgba(17,17,17,0.18)`,
          color: TEXT, fontSize: "0.9rem", boxShadow: "none",
          fontFamily: "'Cormorant Garamond', serif",
        }}
        data-testid={`input-${id}`}
      />
    </div>
  );
}

/* ─── Testimonios section ────────────────────────────────── */
const TESTIMONIOS = [
  {
    quote: "SG Abogados resolvió mi caso laboral con una rapidez y profesionalismo que superó mis expectativas. Desde el primer día sentí que mi situación era tratada con absoluta seriedad.",
    author: "Carlos Méndez",
    role: "Empresario · Bogotá",
  },
  {
    quote: "El acompañamiento fue impecable. Siempre tuve claridad sobre el estado de mi proceso. Un equipo que combina excelencia jurídica con trato verdaderamente humano.",
    author: "María Fernanda Ruiz",
    role: "Médica · Medellín",
  },
  {
    quote: "Gracias a SG Abogados logré resolver un conflicto societario que parecía imposible. Su estrategia y conocimiento del derecho marcaron la diferencia.",
    author: "Andrés Palomino",
    role: "Director Financiero · Cali",
  },
];

function TestimoniosSection() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIOS[idx];

  return (
    <section className="relative overflow-hidden" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: label + título + reseña carousel ── */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={fadeUp} className="flex flex-col">

            {/* Etiqueta */}
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: "0.65rem",
              letterSpacing: "0.22em", color: CAFE, marginBottom: "16px",
            }}>TESTIMONIOS</span>

            {/* Título */}
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.4vw, 2.8rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
              lineHeight: 1.22, marginBottom: "12px",
            }}>Por qué elegirnos</h2>

            {/* Subtítulo */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem",
              color: MUTED, lineHeight: 1.7, marginBottom: "40px",
            }}>
              La confianza de nuestros clientes es el reflejo de nuestro compromiso con la excelencia jurídica.
            </p>

            {/* Línea separadora */}
            <div style={{ width: "100%", height: "1px", background: `rgba(107,58,42,0.12)`, marginBottom: "36px" }} />

            {/* Reseña activa */}
            <AnimatePresence mode="wait">
              <motion.div key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38 }}>

                {/* Comillas decorativas */}
                <span style={{
                  fontFamily: "'Playfair Display', serif", fontSize: "4rem",
                  color: `${CAFE}28`, lineHeight: 0.5, display: "block",
                  marginBottom: "16px",
                }}>"</span>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "1.14rem",
                  color: TEXT, lineHeight: 1.88, marginBottom: "28px",
                  fontStyle: "italic",
                }}>{t.quote}</p>

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "28px", height: "1px", background: CAFE, opacity: 0.5 }} />
                  <div>
                    <p style={{
                      fontFamily: "'Cinzel', serif", fontSize: "0.78rem",
                      color: TEXT, fontWeight: 700, letterSpacing: "0.07em",
                    }}>{t.author}</p>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: "0.92rem",
                      color: MUTED, marginTop: "3px",
                    }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Puntos de paginación */}
            <div className="flex items-center gap-3 mt-10">
              {TESTIMONIOS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? "28px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: i === idx ? CAFE : `${CAFE}30`,
                    border: "none", cursor: "pointer",
                    transition: "all 0.35s ease",
                    padding: 0,
                  }}
                  aria-label={`Reseña ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: imagen en tarjeta redondeada ── */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-end">
            <div style={{
              borderRadius: "20px",
              overflow: "hidden",
              width: "100%",
              maxWidth: "500px",
              aspectRatio: "3/4",
              boxShadow: "0 24px 80px rgba(107,58,42,0.13)",
              background: BG2,
            }}>
              <img src={courthouseImg} alt="Edificio judicial ilustración"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>

            {/* Badge decorativo */}
            <div style={{
              position: "absolute", bottom: "28px", left: "-20px",
              background: CAFE, color: "#fff",
              borderRadius: "12px", padding: "16px 22px",
              boxShadow: "0 8px 32px rgba(107,58,42,0.22)",
            }}>
              <p style={{
                fontFamily: "'Cinzel', serif", fontSize: "1.5rem",
                fontWeight: 700, lineHeight: 1, marginBottom: "4px",
              }}>+500</p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem",
                opacity: 0.85, letterSpacing: "0.06em",
              }}>casos resueltos</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function Home() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const navBg     = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0.0)", "rgba(255,255,255,0.97)"]);
  const navBlur   = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"]);
  const navShadow = useTransform(scrollY, [0, 80], ["none", "0 1px 0 rgba(0,0,0,0.06)"]);

  /* GSAP hero entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll<HTMLElement>(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 55, rotateX: -48 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.022, duration: 1.1 }, 0.4);
    }
    if (dividerRef.current)
      tl.fromTo(dividerRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.9, ease: "expo.out" }, 1.5);
    if (subRef.current)
      tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 1.7);
    if (ctaRef.current)
      tl.fromTo(Array.from(ctaRef.current.children),
        { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.13, duration: 0.75 }, 2.0);
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
            <Scale strokeWidth={1.3} className="w-5 h-5" style={{ color: CAFE }} />
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
                  fontSize: "0.78rem", letterSpacing: "0.18em",
                  color: TEXT, fontWeight: 600,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = CAFE)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT)}
              >{l.name}</a>
            ))}
          </nav>

          <button className="md:hidden p-2" style={{ color: "rgba(17,17,17,0.65)", background: "none", border: "none" }}
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
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "0.78rem", letterSpacing: "0.22em", color: TEXT }}
                  onClick={() => setMobileMenuOpen(false)}>{l.name}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════
          HERO — título centrado, sin eyebrow ni stats
      ══════════════════════════════════════════════════════════ */}
      <section id="inicio" className="relative overflow-hidden" style={{ minHeight: "100vh", background: BG }}>

        {/* Warm café ambient detrás de estatua */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 55% 70% at 78% 58%, rgba(107,58,42,0.07) 0%, transparent 72%)",
          zIndex: 1,
        }} />


        {/* Layout: contenido centrado en columna izquierda, estatua derecha */}
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-10 md:px-16 flex items-center" style={{ minHeight: "100vh" }}>

          {/* TEXT — centrado dentro de su columna */}
          <div className="flex-1 flex flex-col items-center justify-center text-center py-28 z-20 relative">

            {/* Headline — 2 líneas exactas, palabras intactas */}
            <h1 ref={headlineRef} className="mb-8 w-full"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.8rem, 4.2vw, 4.4rem)",
                color: TEXT, fontStyle: "italic", fontWeight: 500,
                lineHeight: 1.10,
              }}>
              {/* Línea 1 — siempre 2 palabras */}
              <span style={{ display: "block", whiteSpace: "nowrap" }}>
                {"Nuestra prioridad"}
              </span>
              {/* Línea 2 */}
              <span style={{ display: "block", whiteSpace: "nowrap" }}>
                {"es tu tranquilidad legal."}
              </span>
            </h1>

            {/* Divider café — centrado */}
            <div ref={dividerRef} className="flex items-center justify-center gap-3 mb-8"
              style={{ opacity: 0, transformOrigin: "center" }}>
              <div style={{ width: "48px", height: "1px", background: CAFE }} />
              <div style={{ width: "6px", height: "6px", background: CAFE, transform: "rotate(45deg)" }} />
              <div style={{ width: "48px", height: "1px", background: CAFE }} />
            </div>

            {/* Texto de bienvenida profesional */}
            <p ref={subRef} style={{
              opacity: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.08rem", color: MUTED, lineHeight: 2.0,
              maxWidth: "480px", marginBottom: "52px",
            }}>
              Bienvenido a SG Abogados. Somos un equipo jurídico comprometido con la defensa de sus derechos,
              ofreciéndole asesoría experta, acompañamiento integral y soluciones efectivas en cada etapa de su proceso legal.
            </p>

            {/* CTAs — texto grande, negro, legibles */}
            <div ref={ctaRef} className="flex items-center justify-center gap-12 flex-wrap">
              <a href="#contacto"
                className="inline-flex items-center transition-colors duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.88rem", letterSpacing: "0.14em",
                  color: TEXT, fontWeight: 700, opacity: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = CAFE)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT)}
              >AGENDAR CONSULTA</a>

              <a href="#areas"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.88rem", letterSpacing: "0.14em",
                  color: TEXT, fontWeight: 700, opacity: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = CAFE)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT)}
              >NUESTRAS ÁREAS</a>
            </div>
          </div>

          {/* ESTATUA — derecha, monumental */}
          <div className="hidden md:flex flex-none items-end justify-center relative pointer-events-none"
            style={{ width: "clamp(340px, 46vw, 660px)", height: "100vh" }}>

            {/* Ambiente cálido café */}
            <div style={{
              position: "absolute",
              width: "480px", height: "480px", borderRadius: "50%",
              top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(107,58,42,0.10) 0%, rgba(107,58,42,0.04) 45%, transparent 68%)",
              filter: "blur(60px)",
            }} />

            <motion.img
              src={justiceStatueImg}
              alt="Diosa de la Justicia, Themis — SG Abogados"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative", zIndex: 10,
                width: "clamp(340px, 40vw, 620px)",
                height: "auto", objectFit: "contain",
                filter: [
                  "brightness(1.04)",
                  "contrast(1.08)",
                  "saturate(0.80)",
                  "drop-shadow(0 0 50px rgba(107,58,42,0.18))",
                  "drop-shadow(0 0 22px rgba(107,58,42,0.12))",
                  "drop-shadow(0 20px 50px rgba(0,0,0,0.08))",
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
          style={{ color: `${CAFE}50` }}
        >
          <div style={{ width: "1px", height: "36px", background: `linear-gradient(to bottom, transparent, ${CAFE}40)` }} />
          <ChevronDown size={12} strokeWidth={1.5} />
        </motion.div>

      </section>

      {/* ═══════════════════════════════════════════════════════
          ÁREAS DE PRÁCTICA — fondo café, carrusel 3D
      ══════════════════════════════════════════════════════════ */}
      <section id="areas" className="pb-28 relative" style={{ background: CAFE, paddingTop: "110px" }}>

        {/* Ola superior: sube hacia el hero (café sobre blanco) — 3 crestas */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100px", transform: "translateY(-100%)" }}>
            <path
              d="M0,100 L0,70 C420,100 580,10 720,45 C860,75 1100,0 1280,55 C1360,78 1420,50 1440,60 L1440,100 Z"
              fill={CAFE} />
          </svg>
        </div>


        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">

          {/* Header */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16">
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.55)", display: "block", marginBottom: "18px",
            }}>ESPECIALIDADES JURÍDICAS</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.6vw, 2.9rem)",
              color: "#ffffff", fontWeight: 500, fontStyle: "italic", marginBottom: "18px",
            }}>Áreas de Práctica</h2>
            <div className="flex items-center justify-center gap-3">
              <div style={{ width: "48px", height: "1px", background: "rgba(255,255,255,0.35)" }} />
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.55)" }} />
              <div style={{ width: "48px", height: "1px", background: "rgba(255,255,255,0.35)" }} />
            </div>
          </motion.div>

          {/* Carrusel */}
          <AreasCarousel />

        </div>

        {/* Ola inferior: áreas → por qué elegirnos (café → blanco) */}
        <div style={{ position: "absolute", bottom: "-1px", left: 0, right: 0, zIndex: 10, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "90px" }}>
            <path d="M0,55 C200,10 400,80 600,35 C800,0 1000,70 1200,30 C1320,8 1390,60 1440,45 L1440,90 L0,90 Z"
              fill={BG} />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          POR QUÉ ELEGIRNOS — TESTIMONIOS split layout
      ══════════════════════════════════════════════════════════ */}
      <TestimoniosSection />

      {/* ═══════════════════════════════════════════════════════
          SOBRE NOSOTROS
      ══════════════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-28 relative" style={{ background: BG2 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${CAFE}35, transparent 55%)` }} />

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
                borderLeft: `3px solid ${CAFE}`,
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
              <a href="#contacto"
                className="inline-flex items-center self-start transition-colors duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.58rem", color: CAFE, letterSpacing: "0.24em",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = CAFE2)}
                onMouseLeave={e => (e.currentTarget.style.color = CAFE)}
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
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${CAFE}35, transparent 55%)` }} />

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
                      <Icon size={14} strokeWidth={1.4} style={{ color: CAFE }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.46rem", color: CAFE2, letterSpacing: "0.28em", marginBottom: "3px" }}>{label}</p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.96rem", color: TEXT }}>{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ borderLeft: `3px solid ${CAFE}`, paddingLeft: "20px" }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={12} strokeWidth={1.4} style={{ color: CAFE }} />
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.46rem", color: CAFE2, letterSpacing: "0.28em" }}>UBICACIÓN</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.96rem", color: TEXT, marginBottom: "2px" }}>Cl 12 B 8-23, Oficina 421</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.90rem", color: MUTED }}>Bogotá, Colombia</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", marginTop: "8px", fontSize: "0.80rem", color: CAFE }}>
                  Lun–Vie · 8am–6pm · Con cita previa
                </p>
              </div>
            </motion.div>

            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 p-10"
              style={{ background: BG2, borderTop: `3px solid ${CAFE}` }}>

              <form onSubmit={handleSubmit} className="flex flex-col gap-7" data-testid="form-contact">
                <div className="grid grid-cols-2 gap-6">
                  <FormField id="name"  label="NOMBRE COMPLETO" placeholder="Juan Pérez"     required />
                  <FormField id="phone" label="TELÉFONO"        placeholder="300 123 4567"   required />
                </div>
                <FormField id="email" label="CORREO ELECTRÓNICO" type="email" placeholder="juan@ejemplo.com" required />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="area" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.48rem", letterSpacing: "0.30em", color: CAFE2 }}>
                    ÁREA DE CONSULTA
                  </label>
                  <select id="area" required data-testid="select-area"
                    className="w-full py-2 focus:outline-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      borderBottom: `1px solid rgba(17,17,17,0.18)`,
                      borderTop: "none", borderLeft: "none", borderRight: "none",
                      color: TEXT, background: "transparent", boxShadow: "none", fontSize: "0.9rem",
                    }}>
                    <option value="" style={{ background: BG2 }}>Seleccione un área</option>
                    {AREAS.map(a => <option key={a.title} value={a.title} style={{ background: BG2 }}>{a.title}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.48rem", letterSpacing: "0.30em", color: CAFE2 }}>
                    SU CONSULTA
                  </label>
                  <Textarea id="message" required placeholder="Describa brevemente su situación..."
                    className="rounded-none border-0 border-b resize-none min-h-[90px] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      borderBottom: `1px solid rgba(17,17,17,0.18)`, boxShadow: "none",
                      color: TEXT, fontSize: "0.9rem",
                    }}
                    data-testid="textarea-message" />
                </div>

                <button type="submit" data-testid="button-submit"
                  className="w-full py-4 transition-colors duration-300"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: "none", color: CAFE,
                    fontSize: "0.58rem", letterSpacing: "0.32em",
                    border: "none", cursor: "pointer",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = CAFE2)}
                  onMouseLeave={e => (e.currentTarget.style.color = CAFE)}>
                  ENVIAR MENSAJE
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER — oscuro, centrado, íconos en círculo
      ══════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#111111" }}>
        <div className="flex flex-col items-center px-8 py-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(107,58,42,0.20)" }}>
              <Scale strokeWidth={1.4} size={16} style={{ color: CAFE }} />
            </div>
            <span style={{
              fontFamily: "'Cinzel', serif",
              color: "#ffffff", letterSpacing: "0.28em", fontSize: "0.88rem", fontWeight: 600,
            }}>SG ABOGADOS</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            {[
              { label: "Facebook",  Icon: SvgFacebook,  href: "#" },
              { label: "Instagram", Icon: SvgInstagram, href: "#" },
              { label: "X",         Icon: SvgX,         href: "#" },
              { label: "LinkedIn",  Icon: SvgLinkedIn,  href: "#" },
            ].map(({ label, Icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label} data-testid={`link-social-${label.toLowerCase()}`}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: "#222222", color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = CAFE;
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#222222";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                }}
              ><Icon /></a>
            ))}
          </div>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontSize: "0.95rem",
            color: "rgba(255,255,255,0.40)",
          }}>Estrategia jurídica con carácter.</p>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "0 32px" }} />

        <div className="flex flex-col items-center gap-2 px-8 py-6">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {["Política de Cookies", "Términos y Condiciones", "Política de Privacidad"].map((label, i, arr) => (
              <span key={label} className="flex items-center gap-4">
                <a href="#"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.03em",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >{label}</a>
                {i < arr.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.16)", fontSize: "0.7rem" }}>·</span>
                )}
              </span>
            ))}
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.76rem", color: "rgba(255,255,255,0.25)", marginTop: "4px",
          }}>&copy; {new Date().getFullYear()} SG Abogados.</p>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ─── */}
      <a
        href={`https://wa.me/573001234567?text=${encodeURIComponent("Estimados señores de SG Abogados, me dirijo a ustedes con el propósito de solicitar una consulta jurídica. Agradezco su atención y quedo en espera de su respuesta.")}`}
        target="_blank" rel="noopener noreferrer"
        data-testid="link-whatsapp"
        className="fixed bottom-6 right-6 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-50 group"
        style={{ background: "#25D366" }}
        aria-label="Contactar por WhatsApp">
        {/* SVG oficial de WhatsApp */}
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#ffffff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {/* Tooltip — texto plano, sin caja */}
        <span className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          style={{
            fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.10em",
            color: TEXT, fontWeight: 600,
          }}>
          CHATEAR CON NOSOTROS
        </span>
      </a>
    </div>
  );
}

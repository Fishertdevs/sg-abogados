import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Menu, X, MessageCircle, Phone, Mail, MapPin, ChevronDown,
} from "lucide-react";
import justiceStatueImg from "@assets/image_1779927370844.png";
import nosotrosImg from "@assets/image_1780858385741.png";
import courthouseImg from "@assets/image-Photoroom_(6)_1780277969866.png";
import faqImg from "@assets/faq_balance_justice.png";

/* ─── Paleta oficial: Azul · Blanco ──────────────────────── */
const BG    = "#ffffff";
const BG2   = "#f0f4fa";
const CAFE  = "#1e56b4";        /* azul – acento principal   */
const CAFE2 = "#163d90";        /* azul oscuro – hover       */
const TEXT  = "#111111";
const MUTED = "rgba(17,17,17,0.52)";

/* ─── WhatsApp contact ───────────────────────────────────── */
const WA_PHONE = "573196519645";
const WA_MSG   = "Cordial saludo. Espero que se encuentren muy bien. Me dirijo a ustedes para solicitar información y orientación sobre un caso legal. Agradezco su atención y quedo en espera de su respuesta. Muchas gracias.";
const WA_HREF  = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MSG)}`;

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
const SvgPhone = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);
const SvgEmail = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);
const SvgLocation = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);
const SvgWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
  const [isMobile, setIsMobile] = useState(false);
  const total = AREAS.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % total), 4000);
    return () => clearInterval(timer);
  }, [total]);

  const getPos = (i: number) => {
    let d = i - active;
    if (d >  total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const cardStyle = (pos: number): React.CSSProperties => {
    const abs = Math.abs(pos);
    if (isMobile) {
      if (abs > 1) return { display: "none" };
      const scale   = abs === 0 ? 1 : 0.82;
      const opacity = abs === 0 ? 1 : 0.30;
      const translateX = pos * (window.innerWidth * 0.72);
      return {
        position: "absolute",
        width: "min(72vw, 270px)",
        transform: `translateX(${translateX}px) scale(${scale})`,
        opacity,
        zIndex: 10 - abs,
        transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)",
        cursor: abs === 0 ? "default" : "pointer",
        pointerEvents: abs > 1 ? "none" : "auto",
      };
    }
    if (abs > 2) return { display: "none" };
    const scale   = abs === 0 ? 1 : abs === 1 ? 0.80 : 0.64;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.50 : 0.22;
    const translateX = pos * 248;
    return {
      position: "absolute",
      width: "285px",
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex: 10 - abs,
      transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)",
      cursor: abs === 0 ? "default" : "pointer",
      pointerEvents: abs > 2 ? "none" : "auto",
    };
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full">

      {/* Card stage */}
      <div className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: isMobile ? "380px" : "420px" }}>
        {AREAS.map((area, i) => {
          const pos = getPos(i);
          const maxVisible = isMobile ? 1 : 2;
          if (Math.abs(pos) > maxVisible) return null;
          return (
            <div key={i} style={cardStyle(pos)}
              onClick={() => pos !== 0 && setActive(i)}>
              <div className="flex flex-col items-center p-6 md:p-8 h-full"
                style={{
                  background: "#ffffff",
                  minHeight: isMobile ? "324px" : "361px",
                  borderRadius: "18px",
                  boxShadow: pos === 0
                    ? "0 24px 70px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.18)"
                    : "0 8px 30px rgba(0,0,0,0.18)",
                }}>

                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: isMobile ? "2.2rem" : "2.8rem", fontWeight: 700,
                  color: TEXT, lineHeight: 1, marginBottom: "4px",
                  textAlign: "center", width: "100%",
                }}>{area.roman}</span>

                <div style={{ width: "36px", height: "2px", background: CAFE, marginBottom: "14px" }} />

                <h3 style={{
                  fontFamily: "'Cinzel', serif", fontSize: isMobile ? "0.78rem" : "0.88rem", fontWeight: 700,
                  color: TEXT, letterSpacing: "0.07em", marginBottom: "12px",
                  textAlign: "center", width: "100%",
                }}>{area.title}</h3>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? "0.95rem" : "1.02rem", color: TEXT, lineHeight: 1.70, marginBottom: "14px",
                  textAlign: "center", width: "100%",
                }}>{area.desc}</p>

                <ul className="flex flex-col gap-2 mt-auto w-full">
                  {area.items.slice(0, isMobile ? 3 : 4).map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div style={{
                        width: "4px", height: "4px", background: CAFE,
                        transform: "rotate(45deg)", marginTop: "6px", flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.93rem", color: TEXT, lineHeight: 1.5,
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

/* ─── FAQ ────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "¿Cuánto cuesta la consulta inicial?",
    a: "La primera consulta tiene un costo accesible y le permite conocer la viabilidad de su caso. Las tarifas varían según el área jurídica y la complejidad de la situación. Contáctenos y le orientaremos con toda la información que necesita.",
  },
  {
    q: "¿Cuánto tiempo puede durar mi proceso legal?",
    a: "Depende del tipo de proceso. Un proceso laboral puede resolverse entre 6 y 18 meses, mientras que uno contencioso-administrativo puede extenderse más. Le daremos una estimación precisa al analizar su caso.",
  },
  {
    q: "¿Qué documentos necesito para iniciar?",
    a: "Necesita su documento de identidad, contratos del caso y evidencia relevante. Cada proceso puede requerir documentación adicional según su naturaleza. Nuestro equipo le indicará exactamente qué traer.",
  },
  {
    q: "¿Atienden casos en todo Colombia?",
    a: "Sí, nuestra firma atiende casos en todo el territorio colombiano. Ofrecemos asesoría presencial en Bogotá y atención virtual para clientes en otras ciudades o en el exterior. La distancia no es un obstáculo para proteger sus derechos.",
  },
];

function FaqSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(prev => (prev + 1) % FAQS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const faq = FAQS[idx];

  return (
    <section className="sgc-faq-section relative" style={{ backgroundColor: BG }}>
      <style>{`
        @media (max-width: 640px) {
          .sgc-faq-section {
            background-image: url('${faqImg}');
            background-size: 55%;
            background-repeat: no-repeat;
            background-position: right bottom;
          }
          .sgc-faq-overlay { display: none !important; }
          .sgc-faq-img-col { display: none !important; }
          .sgc-faq-card {
            padding: 10px 14px 8px !important;
            margin-bottom: 8px !important;
            border-radius: 10px !important;
            background: rgba(240,244,250,0.97) !important;
          }
          .sgc-faq-title { font-size: 1.45rem !important; white-space: nowrap !important; }
          .sgc-faq-q { font-size: 0.58rem !important; margin-bottom: 5px !important; text-align: center !important; }
          .sgc-faq-deco { margin-bottom: 5px !important; }
          .sgc-faq-a { font-size: 0.85rem !important; line-height: 1.5 !important; text-align: left !important; }
        }
      `}</style>

      {/* Overlay gradiente — visible solo en móvil */}
      <div className="sgc-faq-overlay" style={{ display: "none", position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(245,242,235,0.72) 0%, rgba(245,242,235,0.30) 60%, transparent 100%)", pointerEvents: "none" }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-14 lg:px-20" style={{ paddingTop: "48px", paddingBottom: "120px" }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: label + título + carousel de FAQs ── */}
          <div className="flex flex-col items-center text-center">

            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(0.72rem, 2vw, 0.88rem)",
              letterSpacing: "0.14em", color: CAFE, marginBottom: "16px",
              fontWeight: 600, display: "block",
            }}>PREGUNTAS FRECUENTES</span>

            <h2 className="sgc-faq-title" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.4vw, 2.8rem)",
              color: TEXT, fontWeight: 500, fontStyle: "italic",
              lineHeight: 1.22, marginBottom: "12px",
            }}>Resolvemos sus dudas</h2>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem",
              color: TEXT, lineHeight: 1.7, marginBottom: "40px",
            }}>
              Las respuestas a las preguntas más comunes de nuestros clientes.
            </p>

            <div style={{ width: "100%", height: "1px", background: CAFE, marginBottom: "24px" }} />

            {/* Card contenedor — pregunta + respuesta */}
            <div className="sgc-faq-card" style={{
              width: "100%",
              background: "#f0f4fa",
              borderRadius: "16px",
              border: "1px solid rgba(26,61,124,0.12)",
              padding: "26px 28px 22px",
              boxShadow: "0 4px 24px rgba(26,61,124,0.07)",
              marginBottom: "20px",
            }}>
              <AnimatePresence mode="wait">
                <motion.div key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.38 }}
                  className="flex flex-col items-center w-full">

                  <p className="sgc-faq-q" style={{
                    fontFamily: "'Cinzel', serif", fontSize: "0.72rem",
                    letterSpacing: "0.12em", color: CAFE, fontWeight: 700,
                    textAlign: "center", marginBottom: "14px", textTransform: "uppercase",
                  }}>{faq.q}</p>

                  <div className="sgc-faq-deco" style={{ display: "flex", alignItems: "center", gap: "14px", justifyContent: "center", marginBottom: "14px" }}>
                    <div style={{ width: "28px", height: "1px", background: CAFE }} />
                    <div style={{ width: "5px", height: "5px", background: CAFE, transform: "rotate(45deg)" }} />
                    <div style={{ width: "28px", height: "1px", background: CAFE }} />
                  </div>

                  <p className="sgc-faq-a" style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.18rem",
                    color: TEXT, lineHeight: 1.88, textAlign: "center",
                  }}>{faq.a}</p>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Indicadores de posición */}
            <div className="flex items-center gap-3">
              {FAQS.map((_, i) => (
                <div key={i}
                  style={{
                    width: i === idx ? "28px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: i === idx ? CAFE : `${CAFE}30`,
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: imagen ── */}
          <div className="sgc-faq-img-col relative flex justify-end">
            <div style={{ position: "relative", width: "90%", maxWidth: "450px", aspectRatio: "3/4" }}>
              <img src={faqImg} alt="SGC Abogados — Preguntas frecuentes"
                style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
              />
            </div>
          </div>

        </div>
      </div>
      {/* Ola inferior: blanco → café */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "100px" }}>
          <path
            d="M0,100 L0,70 C420,100 580,10 720,45 C860,75 1100,0 1280,55 C1360,78 1420,50 1440,60 L1440,100 Z"
            fill={CAFE} />
        </svg>
      </div>
    </section>
  );
}

const TESTIMONIOS = [
  {
    quote: "SGC Abogados resolvió mi caso laboral con una rapidez y profesionalismo que superó mis expectativas. Desde el primer día sentí que mi situación era tratada con absoluta seriedad.",
    author: "Carlos Méndez",
    role: "Empresario · Bogotá",
  },
  {
    quote: "El acompañamiento fue impecable. Siempre tuve claridad sobre el estado de mi proceso. Un equipo que combina excelencia jurídica con trato verdaderamente humano.",
    author: "María Fernanda Ruiz",
    role: "Médica · Medellín",
  },
  {
    quote: "Gracias a SGC Abogados logré resolver un conflicto societario que parecía imposible. Su estrategia y conocimiento del derecho marcaron la diferencia.",
    author: "Andrés Palomino",
    role: "Director Financiero · Cali",
  },
];

function TestimoniosSection() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIOS[idx];

  return (
    <section className="relative" style={{ background: BG }}>

      <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 py-16 md:py-24" style={{ paddingTop: "48px", paddingBottom: "120px" }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: label + título + reseña carousel ── */}
          <div className="flex flex-col items-center text-center">

            {/* Etiqueta */}
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(0.72rem, 2vw, 0.88rem)",
              letterSpacing: "0.14em", color: CAFE, marginBottom: "16px",
              fontWeight: 600, display: "block",
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
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem",
              color: TEXT, lineHeight: 1.7, marginBottom: "40px",
            }}>
              La confianza de nuestros clientes es el reflejo de nuestro compromiso con la excelencia jurídica.
            </p>

            {/* Línea separadora */}
            <div style={{ width: "100%", height: "1px", background: CAFE, marginBottom: "24px" }} />

            {/* Card contenedor — reseña activa */}
            <div style={{
              width: "100%",
              background: "#f0f4fa",
              borderRadius: "16px",
              border: "1px solid rgba(26,61,124,0.12)",
              padding: "26px 28px 22px",
              boxShadow: "0 4px 24px rgba(26,61,124,0.07)",
              marginBottom: "20px",
            }}>
              <AnimatePresence mode="wait">
                <motion.div key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.38 }}
                  className="flex flex-col items-center">

                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.14rem",
                    color: TEXT, lineHeight: 1.88, marginBottom: "22px",
                    fontStyle: "italic", textAlign: "center",
                  }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5em", color: CAFE, lineHeight: 0, verticalAlign: "-0.18em", marginRight: "2px" }}>{'\u201c'}</span>
                    {t.quote}
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5em", color: CAFE, lineHeight: 0, verticalAlign: "-0.18em", marginLeft: "2px" }}>{'\u201d'}</span>
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "14px", justifyContent: "center" }}>
                    <div style={{ width: "28px", height: "1px", background: CAFE }} />
                    <div style={{ textAlign: "center" }}>
                      <p style={{
                        fontFamily: "'Cinzel', serif", fontSize: "0.78rem",
                        color: TEXT, fontWeight: 700, letterSpacing: "0.07em",
                      }}>{t.author}</p>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: "0.92rem",
                        color: TEXT, marginTop: "3px",
                      }}>{t.role}</p>
                    </div>
                    <div style={{ width: "28px", height: "1px", background: CAFE }} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Puntos de paginación */}
            <div className="flex items-center gap-3">
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
          </div>

          {/* ── RIGHT: imagen estática ── */}
          <div className="relative flex justify-end">
            <div style={{ position: "relative", width: "100%", maxWidth: "500px", aspectRatio: "3/4" }}>
              <img src={courthouseImg} alt="Edificio judicial ilustración"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "contain", objectPosition: "center",
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Ola inferior: blanco → negro */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "100px" }}>
          <path
            d="M0,100 L0,70 C420,100 580,10 720,45 C860,75 1100,0 1280,55 C1360,78 1420,50 1440,60 L1440,100 Z"
            fill="#1a3d7c" />
        </svg>
      </div>
    </section>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function Home() {
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

  const navLinks = [
    { name: "INICIO",   href: "#inicio"   },
    { name: "ÁREAS",    href: "#areas"    },
    { name: "NOSOTROS", href: "#nosotros" },
    { name: "CONTACTO", href: "#contacto" },
  ];

  const HEADLINE = "Nuestra prioridad es tu tranquilidad legal.";
  const WORDS    = HEADLINE.split(" ");

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: BG, color: TEXT, overflowX: "hidden" }}>

      {/* ═══════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════════ */}
      <motion.header
        style={{ backgroundColor: navBg, backdropFilter: navBlur, boxShadow: navShadow }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between">
          <a href="#inicio" className="flex items-center">
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

        {/* Ambient azul detrás de estatua */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 55% 70% at 78% 58%, rgba(26,61,124,0.07) 0%, transparent 72%)",
          zIndex: 1,
        }} />

        {/* Layout: contenido centrado en columna izquierda, estatua derecha */}
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center" style={{ minHeight: "100vh" }}>

          {/* TEXT — centrado dentro de su columna */}
          <div className="flex-1 flex flex-col items-center justify-center text-center py-24 md:py-28 z-20 relative">

            {/* Headline */}
            <h1 ref={headlineRef} className="mb-6 md:mb-8 w-full"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 4.0vw, 3.6rem)",
                color: TEXT, fontStyle: "normal", fontWeight: 900,
                lineHeight: 1.15,
              }}>
              <span style={{ display: "block" }}>{"Nuestra prioridad"}</span>
              <span style={{ display: "block" }}>{"es tu tranquilidad legal."}</span>
            </h1>

            {/* Divider café — centrado */}
            <div ref={dividerRef} className="flex items-center justify-center gap-3 mb-6 md:mb-8"
              style={{ opacity: 0, transformOrigin: "center" }}>
              <div style={{ width: "48px", height: "1px", background: CAFE }} />
              <div style={{ width: "6px", height: "6px", background: CAFE, transform: "rotate(45deg)" }} />
              <div style={{ width: "48px", height: "1px", background: CAFE }} />
            </div>

            {/* Texto de bienvenida profesional */}
            <p ref={subRef} style={{
              opacity: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.05rem, 2.5vw, 1.18rem)", color: TEXT, lineHeight: 1.85,
              maxWidth: "480px", marginBottom: "40px", padding: "0 8px",
            }}>
              Bienvenido a SGC Abogados. Somos un equipo jurídico comprometido con la defensa de sus derechos,
              ofreciéndole asesoría experta, acompañamiento integral y soluciones efectivas en cada etapa de su proceso legal.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
              <a href="#contacto"
                className="inline-flex items-center transition-colors duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(0.72rem, 2vw, 0.88rem)", letterSpacing: "0.14em",
                  color: TEXT, fontWeight: 700, opacity: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = CAFE)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT)}
              >AGENDAR CONSULTA</a>

              <a href="#areas"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(0.72rem, 2vw, 0.88rem)", letterSpacing: "0.14em",
                  color: TEXT, fontWeight: 700, opacity: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = CAFE)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT)}
              >NUESTRAS ÁREAS</a>
            </div>
          </div>

          {/* ESTATUA — derecha, monumental */}
          <div className="hidden md:flex flex-none items-end justify-center relative pointer-events-none"
            style={{ width: "clamp(252px, 41vw, 594px)", height: "100vh", transform: "translateZ(0)" }}>

            {/* Ambiente azul — pre-composited */}
            <div style={{
              position: "absolute",
              width: "480px", height: "480px", borderRadius: "50%",
              top: "50%", left: "50%",
              transform: "translateZ(0) translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(26,61,124,0.10) 0%, rgba(26,61,124,0.04) 45%, transparent 68%)",
              filter: "blur(60px)",
              willChange: "filter",
            }} />

            <img
              src={justiceStatueImg}
              alt="Diosa de la Justicia, Themis — SGC Abogados"
              style={{
                position: "relative", zIndex: 10,
                width: "clamp(328px, 38.5vw, 595px)",
                height: "auto", objectFit: "contain",
                filter: "brightness(1.04) contrast(1.08) saturate(0.80) drop-shadow(0 0 44px rgba(26,61,124,0.16))",
                alignSelf: "flex-end",
                willChange: "filter",
                transform: "translateZ(0)",
              }}
            />
          </div>
        </div>

        {/* Ola de transición hero→áreas: vive en el hero para evitar repaint cruzado */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none", zIndex: 5 }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100px" }}>
            <path
              d="M0,100 L0,70 C420,100 580,10 720,45 C860,75 1100,0 1280,55 C1360,78 1420,50 1440,60 L1440,100 Z"
              fill={CAFE} />
          </svg>
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
      <section id="areas" className="relative overflow-hidden" style={{ background: CAFE, paddingTop: "40px", paddingBottom: "120px" }}>


        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">

          {/* Header */}
          <div className="text-center mb-16">
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(0.72rem, 2vw, 0.88rem)", letterSpacing: "0.14em",
              color: "#ffffff", display: "block", marginBottom: "18px",
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
          </div>

          {/* Carrusel */}
          <AreasCarousel />

        </div>

        {/* Ola inferior: café → blanco */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100px" }}>
            <path
              d="M0,100 L0,70 C420,100 580,10 720,45 C860,75 1100,0 1280,55 C1360,78 1420,50 1440,60 L1440,100 Z"
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
      <section id="nosotros" className="relative overflow-hidden" style={{ background: "#1a3d7c", scrollMarginTop: "90px" }}>

        <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20" style={{ paddingTop: "48px", paddingBottom: "100px" }}>

          {/* Encabezado centrado */}
          <div className="flex flex-col items-center text-center mb-3">
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.0rem, 3.2vw, 2.9rem)",
              color: "#ffffff", fontWeight: 500, fontStyle: "italic",
              lineHeight: 1.18, marginBottom: "12px",
            }}>Sobre Nosotros</h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.95rem, 1.3vw, 1.08rem)",
              color: "rgba(255,255,255,0.92)", fontStyle: "italic",
              letterSpacing: "0.02em", lineHeight: 1.6,
              maxWidth: "680px",
            }}>
              Con más de una década de trayectoria en litigios civiles, derecho comercial y asesoría corporativa, nuestro equipo ofrece representación legal de alto nivel respaldada por el compromiso personal que cada caso exige.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <div style={{ width: "40px", height: "1px", background: `${CAFE}70` }} />
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: CAFE }} />
              <div style={{ width: "40px", height: "1px", background: `${CAFE}70` }} />
            </div>
          </div>

          {/* Grid: imagen izquierda + contenido centrado derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-0 items-start">

            {/* ── COLUMNA IZQUIERDA: ilustración estática ── */}
            <div
              className="hidden lg:flex items-center justify-start relative overflow-hidden"
              style={{ height: "420px" }}
            >
              {/* Ilustración */}
              <img
                src={nosotrosImg}
                alt="Pergaminos — SGC Abogados"
                style={{
                  width: "133%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "left center",
                  filter: "grayscale(1) brightness(1.15) contrast(1.1)",
                  mixBlendMode: "screen",
                  position: "relative", zIndex: 1,
                  marginLeft: "-5%",
                }}
              />
            </div>

            {/* ── COLUMNA DERECHA: contenido centrado ── */}
            <div className="flex flex-col items-center text-center px-4 md:px-8 lg:px-10">

              {/* Párrafos — solo 2 */}
              {[
                "SGC Abogados nace de la convicción de que el ejercicio del derecho debe ser, ante todo, humano. Entendemos que detrás de cada expediente hay historias de vida, patrimonio y tranquilidad en juego.",
                "Nos alejamos de la frialdad corporativa para ofrecer un acompañamiento donde usted es escuchado y comprendido. Su tranquilidad es nuestra prioridad; confíe su caso a profesionales que combinan rigor académico con empatía humana.",
              ].map((txt, i) => (
                <p key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.16rem", color: "rgba(255,255,255,0.80)", lineHeight: 1.94,
                  marginBottom: i === 0 ? "18px" : "40px",
                  textAlign: "center",
                }}>{txt}</p>
              ))}

              {/* CTA — estilo hero */}
              <a
                href="#contacto"
                className="inline-flex items-center transition-colors duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(0.72rem, 2vw, 0.88rem)",
                  letterSpacing: "0.14em", color: "#ffffff", fontWeight: 700,
                  borderBottom: "1px solid rgba(255,255,255,0.35)",
                  paddingBottom: "4px",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = CAFE;
                  (e.currentTarget as HTMLElement).style.borderBottomColor = CAFE;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(255,255,255,0.35)";
                }}
                data-testid="link-nosotros-contacto"
              >AGENDAR CONSULTA</a>

            </div>
          </div>
        </div>

        {/* Ola inferior: negro → blanco (FAQ) */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100px" }}>
            <path
              d="M0,100 L0,70 C420,100 580,10 720,45 C860,75 1100,0 1280,55 C1360,78 1420,50 1440,60 L1440,100 Z"
              fill={BG} />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PREGUNTAS FRECUENTES
      ══════════════════════════════════════════════════════════ */}
      <FaqSection />

      {/* ═══════════════════════════════════════════════════════
          CONTACTO + CTA — fondo café, sección combinada
      ══════════════════════════════════════════════════════════ */}
      <section id="contacto" className="relative overflow-hidden" style={{ background: CAFE }}>

        {/* Ola inferior: café → blanco */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100px" }}>
            <path
              d="M0,100 L0,70 C420,100 580,10 720,45 C860,75 1100,0 1280,55 C1360,78 1420,50 1440,60 L1440,100 Z"
              fill="#ffffff" />
          </svg>
        </div>

        <style>{`
          /* ── desktop (default) ── */
          .sgc-cc2-outer      { max-width: 900px; margin: 0 auto; padding: 60px 40px 180px; }
          .sgc-cc2-cta        { text-align: center; margin-bottom: 48px; }
          .sgc-cc2-card       { display: grid; grid-template-columns: 290px 1fr; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 60px rgba(0,0,0,0.32); }
          .sgc-cc2-left       { background: ${CAFE2}; padding: 36px 30px; display: flex; flex-direction: column; }
          .sgc-cc2-map        { height: 460px; }
          .sgc-cc2-title      { font-family: 'Playfair Display', serif; font-size: 1.85rem; font-weight: 700; color: #ffffff; font-style: italic; line-height: 1.15; margin-bottom: 8px; }
          .sgc-cc2-sched-head { font-family: 'Cinzel', serif; font-size: 0.52rem; letter-spacing: 0.10em; color: rgba(255,255,255,0.55); margin-bottom: 8px; margin-top: 14px; }
          .sgc-cc2-hour-p     { font-family: 'Cormorant Garamond', serif; font-size: 0.92rem; color: rgba(255,255,255,0.78); line-height: 1.55; }
          .sgc-cc2-divider-line { height: 1px; background: rgba(255,255,255,0.20); margin: 18px 0; }
          .sgc-cc2-item       { padding: 8px 0; display: flex; align-items: flex-start; gap: 10px; }
          .sgc-cc2-icon       { color: rgba(255,255,255,0.70); flex-shrink: 0; margin-top: 3px; }
          .sgc-cc2-label      { font-family: 'Cinzel', serif; font-size: 0.50rem; letter-spacing: 0.08em; color: rgba(255,255,255,0.50); margin-bottom: 3px; }
          .sgc-cc2-value      { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; color: #ffffff; line-height: 1.3; }
          .sgc-cc2-detail     { font-family: 'Cormorant Garamond', serif; font-size: 0.88rem; color: rgba(255,255,255,0.65); margin-top: 1px; }
          .sgc-cc2-maplink    { font-family: 'Cormorant Garamond', serif; font-size: 0.82rem; color: rgba(255,255,255,0.60); font-style: italic; text-decoration: none; margin-top: 3px; display: inline-flex; align-items: center; gap: 3px; }
          /* ── mobile ── */
          @media (max-width: 640px) {
            .sgc-cc2-outer        { padding: 20px 16px 60px !important; }
            .sgc-cc2-cta          { display: none !important; }
            .sgc-cc2-card         { grid-template-columns: 1fr !important; border-radius: 14px !important; }
            .sgc-cc2-left         { background: #ffffff !important; padding: 16px 16px 8px !important; }
            .sgc-cc2-map          { height: 110px !important; max-height: 110px !important; overflow: hidden !important; }
            .sgc-cc2-title        { font-size: 1.9rem !important; color: #111111 !important; font-style: normal !important; text-align: center; }
            .sgc-cc2-sched-head   { color: rgba(0,0,0,0.42) !important; text-align: center; margin-top: 8px !important; }
            .sgc-cc2-hour-p       { color: rgba(0,0,0,0.75) !important; text-align: center; }
            .sgc-cc2-closed       { color: rgba(0,0,0,0.40) !important; }
            .sgc-cc2-divider-line { background: rgba(0,0,0,0.09) !important; margin: 12px 0 !important; }
            .sgc-cc2-item         { padding: 5px 0 !important; justify-content: center !important; }
            .sgc-cc2-icon         { color: ${CAFE} !important; opacity: 0.85; }
            .sgc-cc2-label        { color: rgba(0,0,0,0.42) !important; }
            .sgc-cc2-value        { color: rgba(0,0,0,0.90) !important; font-size: 0.95rem !important; font-weight: 500 !important; text-align: center; width: 100%; }
            .sgc-cc2-detail       { color: rgba(0,0,0,0.60) !important; text-align: center; width: 100%; }
            .sgc-cc2-maplink      { color: ${CAFE} !important; width: 100%; justify-content: center; }
          }
        `}</style>

        <div className="sgc-cc2-outer">

          {/* CTA — solo escritorio */}
          <div className="sgc-cc2-cta">
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "2.6rem",
              fontStyle: "italic", fontWeight: 600, color: "#ffffff",
              lineHeight: 1.2, marginBottom: "16px",
            }}>Estamos para ayudarle.</h2>
            <div style={{ width: "48px", height: "2px", background: "rgba(255,255,255,0.40)", margin: "0 auto" }} />
          </div>

          {/* Tarjeta: panel izquierdo + mapa derecho */}
          <div className="sgc-cc2-card">

            {/* Panel izquierdo: info */}
            <div className="sgc-cc2-left">

              <h2 className="sgc-cc2-title">Contáctenos</h2>

              {/* Horarios */}
              <p className="sgc-cc2-sched-head">HORARIOS DE ATENCIÓN</p>
              {[
                { day: "Lun – Vie", h: "8:00 am – 6:00 pm" },
                { day: "Sábados",   h: "9:00 am – 1:00 pm" },
                { day: "Domingos",  h: "Cerrado" },
              ].map(({ day, h }) => (
                <p key={day} className="sgc-cc2-hour-p">
                  <span style={{ opacity: 0.65 }}>{day}:</span>{" "}
                  <span className={h === "Cerrado" ? "sgc-cc2-closed" : ""}
                    style={{ fontWeight: h === "Cerrado" ? 400 : 600,
                    color: h === "Cerrado" ? "rgba(255,255,255,0.40)" : "inherit" }}>{h}</span>
                </p>
              ))}

              <div className="sgc-cc2-divider-line" />

              {/* Ítems de contacto */}
              {[
                {
                  Icon: SvgLocation,
                  label: "Ubicación",
                  value: "Cl 12 B 8-23, Oficina 421",
                  detail: "Bogotá, Colombia",
                  linkHref: null,
                  linkText: null,
                  external: false,
                  mainHref: "https://maps.google.com/?q=Calle+12B+8-23,+Bogot%C3%A1,+Colombia",
                },
                {
                  Icon: SvgEmail,
                  label: "Correo electrónico",
                  value: "contacto@sgabogados.co",
                  detail: null,
                  linkHref: null,
                  linkText: null,
                  external: false,
                  mainHref: "mailto:contacto@sgabogados.co",
                },
                {
                  Icon: SvgPhone,
                  label: "Teléfono",
                  value: "+57 (300) 123-4567",
                  detail: null,
                  linkHref: null,
                  linkText: null,
                  external: false,
                  mainHref: "tel:+573001234567",
                },
                {
                  Icon: SvgWhatsApp,
                  label: "WhatsApp",
                  value: "+57 (300) 123-4567",
                  detail: null,
                  linkHref: null,
                  linkText: null,
                  external: true,
                  mainHref: "https://wa.me/573001234567",
                },
              ].map((item, i) => (
                <div key={i} className="sgc-cc2-item">
                  <div className="sgc-cc2-icon"><item.Icon /></div>
                  <div style={{ flex: 1 }}>
                    <p className="sgc-cc2-label">{item.label}</p>
                    <a href={item.mainHref} target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      style={{ textDecoration: "none" }}>
                      <p className="sgc-cc2-value">{item.value}</p>
                    </a>
                    {item.detail && <p className="sgc-cc2-detail">{item.detail}</p>}
                    {item.linkText && item.linkHref && (
                      <a href={item.linkHref} target="_blank" rel="noopener noreferrer"
                        className="sgc-cc2-maplink">
                        {item.linkText}
                        <svg width="9" height="9" viewBox="0 0 14 14" fill="none">
                          <path d="M2 2h10v10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Panel derecho: mapa */}
            <div className="sgc-cc2-map">
              <iframe
                title="Ubicación SGC Abogados"
                src="https://maps.google.com/maps?q=Calle+12B+%238-23,+Bogot%C3%A1,+Colombia&output=embed&z=16"
                width="100%" height="100%"
                style={{ border: 0, display: "block", height: "100%" }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER — oscuro, centrado, íconos en círculo
      ══════════════════════════════════════════════════════════ */}
      <motion.footer
        style={{ background: "#ffffff" }}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <style>{`
          @media (max-width:640px){
            .sgc-footer-top    { padding: 28px 20px 18px !important; }
            .sgc-footer-bottom { padding: 10px 20px 18px !important; }
            .sgc-footer-tagline { font-size: 0.92rem !important; }
            .sgc-footer-link { font-size: 0.58rem !important; letter-spacing: 0.10em !important; }
          }
        `}</style>
        <div className="sgc-footer-top flex flex-col items-center px-8 py-14">

          {/* Redes: WhatsApp, Instagram, LinkedIn, Facebook */}
          <div className="flex items-center gap-4 mb-7">
            {[
              { label: "WhatsApp",  Icon: SvgWhatsApp,  href: WA_HREF },
              { label: "Instagram", Icon: SvgInstagram, href: "#" },
              { label: "LinkedIn",  Icon: SvgLinkedIn,  href: "#" },
              { label: "Facebook",  Icon: SvgFacebook,  href: "#" },
            ].map(({ label, Icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: "#f0f4fa", color: CAFE }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = CAFE;
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#f0f4fa";
                  (e.currentTarget as HTMLElement).style.color = CAFE;
                }}
              ><Icon /></a>
            ))}
          </div>

          <p className="sgc-footer-tagline" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontSize: "1.15rem",
            color: "#111111",
          }}>Estrategia jurídica con carácter.</p>
        </div>

        <div style={{ width: "100%", height: "1px", background: "rgba(0,0,0,0.10)" }} />

        <div className="sgc-footer-bottom flex flex-col items-center gap-2 px-8 py-6">
          {/* Fila 1: Política de Cookies · Política de Privacidad */}
          <div className="flex items-center gap-4 justify-center">
            {[
              { label: "Política de Cookies",    to: "/cookies"    },
              { label: "Política de Privacidad", to: "/privacidad" },
            ].map(({ label, to }, i, arr) => (
              <span key={label} className="flex items-center gap-3">
                <Link href={to}
                  className="sgc-footer-link"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.68rem", color: "#111111", letterSpacing: "0.14em",
                    textDecoration: "none", whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#000000")}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#111111")}
                >{label}</Link>
                {i < arr.length - 1 && (
                  <span style={{ color: "rgba(0,0,0,0.35)", fontSize: "0.7rem" }}>·</span>
                )}
              </span>
            ))}
          </div>
          {/* Fila 2: Términos y Condiciones (centrado) */}
          <div className="flex justify-center">
            <Link href="/terminos"
              className="sgc-footer-link"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.68rem", color: "#111111", letterSpacing: "0.14em",
                textDecoration: "none", whiteSpace: "nowrap",
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

      {/* ── FLOATING WHATSAPP ─── */}
      <a
        href={WA_HREF}
        target="_blank" rel="noopener noreferrer"
        data-testid="link-whatsapp"
        className="fixed bottom-6 right-6 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-50 group"
        style={{ background: "#25D366" }}
        aria-label="Contactar por WhatsApp">
        {/* SVG oficial de WhatsApp */}
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#ffffff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {/* Tooltip — píldora blanca, siempre legible */}
        <span className="hidden sm:block absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          style={{
            fontFamily: "'Cinzel', serif", fontSize: "0.70rem", letterSpacing: "0.10em",
            color: "#111111", fontWeight: 600,
            background: "rgba(255,255,255,0.94)",
            padding: "7px 14px",
            borderRadius: "6px",
            boxShadow: "0 2px 14px rgba(0,0,0,0.18)",
            backdropFilter: "blur(6px)",
          }}>
          CHATEAR CON NOSOTROS
        </span>
      </a>
    </div>
  );
}

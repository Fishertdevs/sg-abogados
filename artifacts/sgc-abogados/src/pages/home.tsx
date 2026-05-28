import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import {
  Scale, CheckCircle, Menu, X,
  MessageCircle, Phone, Mail, MapPin,
  Facebook, Instagram,
} from "lucide-react";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import StatuePanel  from "@/components/statue-panel";

/* ─── Design tokens ─────────────────────────────────────── */
const BG    = "#06060E";
const BG2   = "#09091A";
const GOLD  = "#C49A18";
const GOLD2 = "#D4B03A";
const TEXT  = "#F0EBE0";
const MUTED = "rgba(240,235,224,0.56)";

/* ─── Framer Motion variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72 } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

/* ─── Practice areas ─────────────────────────────────────── */
const AREAS = [
  {
    title: "Derecho Penal",
    desc:  "Defensa y representación jurídica en procesos penales, denuncias, audiencias y protección de derechos fundamentales.",
    items: ["Defensa técnica", "Denuncias y querellas", "Audiencias preliminares", "Asistencia a víctimas", "Procesos ante Fiscalía"],
  },
  {
    title: "Derecho Laboral",
    desc:  "Asesoría integral para trabajadores y empleadores en conflictos laborales y protección de derechos.",
    items: ["Liquidaciones e indemnizaciones", "Despidos injustificados", "Acoso laboral", "Contratos laborales", "Conciliaciones y demandas"],
  },
  {
    title: "Derecho Administrativo",
    desc:  "Representación ante entidades públicas y defensa de derechos frente a decisiones administrativas.",
    items: ["Derechos de petición", "Acciones constitucionales", "Procesos contencioso-administrativos", "Reparación directa"],
  },
  {
    title: "Derecho Disciplinario Policivo",
    desc:  "Defensa y acompañamiento en investigaciones y procesos disciplinarios de carácter policivo.",
    items: ["Descargos y defensa técnica", "Recursos y apelaciones", "Acompañamiento en audiencias", "Asesoría preventiva"],
  },
  {
    title: "Derecho de Tránsito",
    desc:  "Asesoría y representación en asuntos relacionados con infracciones y procedimientos de tránsito.",
    items: ["Comparendos", "Audiencias de tránsito", "Impugnaciones", "Accidentes de tránsito", "Cobros coactivos"],
  },
  {
    title: "Derecho de Familia",
    desc:  "Acompañamiento en asuntos familiares con enfoque humano, conciliatorio y estratégico.",
    items: ["Cuota alimentaria", "Custodia y visitas", "Divorcios", "Sucesiones", "Unión marital de hecho"],
  },
  {
    title: "Derecho Civil",
    desc:  "Soluciones legales en conflictos patrimoniales, contractuales y obligaciones civiles.",
    items: ["Procesos ejecutivos", "Contratos", "Responsabilidad civil", "Cobro de cartera", "Declarativos civiles"],
  },
];

/* ─── Helper: section eyebrow label ─────────────────────── */
function SecLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div style={{ width: "26px", height: "1px", background: GOLD }} />
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.58rem", color: GOLD, letterSpacing: "0.42em",
      }}>{text}</span>
    </div>
  );
}

/* ─── Helper: area card (dark) ───────────────────────────── */
function AreaCard({ area }: { area: typeof AREAS[0] }) {
  return (
    <motion.div variants={fadeUp}
      className="flex flex-col p-6 group transition-colors duration-300"
      style={{
        background: "rgba(255,255,255,0.035)",
        borderTop: `1px solid ${GOLD}45`,
        minHeight: "260px",
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(196,154,24,0.06)")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.035)")}
    >
      <h3 className="font-serif mb-3" style={{ fontSize: "1.05rem", color: TEXT, fontWeight: 600 }}>
        {area.title}
      </h3>
      <div style={{ width: "22px", height: "1px", background: `${GOLD}55`, marginBottom: "16px" }} />
      <p className="font-serif mb-5" style={{ fontSize: "0.84rem", color: MUTED, lineHeight: 1.72 }}>
        {area.desc}
      </p>
      <ul className="flex flex-col gap-1.5 flex-1">
        {area.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle size={10} strokeWidth={1.5} className="shrink-0" style={{ color: GOLD, marginTop: "4px" }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.79rem", color: MUTED, lineHeight: 1.5,
            }}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Helper: form field (dark) ─────────────────────────── */
function FormField({
  id, label, placeholder, type = "text", required = false,
}: {
  id: string; label: string; placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.58rem", letterSpacing: "0.22em", color: `${GOLD}AA`,
      }}>
        {label}
      </label>
      <Input
        id={id} type={type} placeholder={placeholder} required={required}
        className="sg-input rounded-none border-0 border-b font-serif bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{
          borderBottom: `1px solid ${GOLD}35`,
          color: TEXT, fontSize: "0.9rem", boxShadow: "none",
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
  const navBg   = useTransform(scrollY, [0, 80], ["rgba(6,6,14,0.0)", "rgba(6,6,14,0.94)"]);
  const navBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(14px)"]);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  /* GSAP hero animation */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll<HTMLElement>(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 55, rotateX: -55 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.026, duration: 1.0 },
        0.45,
      );
    }
    if (subRef.current)
      tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 1.4);
    if (ctaRef.current)
      tl.fromTo(Array.from(ctaRef.current.children),
        { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.14, duration: 0.7 }, 1.65);
    if (statsRef.current)
      tl.fromTo(statsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9 }, 1.85);
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

  /* ─── Gold divider util ───────────────────────────────── */
  const GoldDivider = ({ mb = 8 }: { mb?: number }) => (
    <div className="flex items-center gap-3" style={{ marginBottom: `${mb}px` }}>
      <div style={{ width: "36px", height: "1px", background: `${GOLD}45` }} />
      <div style={{ width: "4px", height: "4px", background: `${GOLD}65`, transform: "rotate(45deg)" }} />
      <div style={{ width: "36px", height: "1px", background: `${GOLD}45` }} />
    </div>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: BG, color: TEXT }}>

      {/* ── FIXED STATUE PANEL ────────────────────────── */}
      <StatuePanel />

      {/* ═══════════════════════════════════════════════════
          NAVBAR — dark frosted on scroll, cream text always
      ══════════════════════════════════════════════════════ */}
      <motion.header
        style={{ backgroundColor: navBg, backdropFilter: navBlur }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between"
          style={{ borderBottom: `1px solid rgba(196,154,24,0.12)` }}>

          <a href="#inicio" className="flex items-center gap-2.5">
            <Scale strokeWidth={1.4} className="w-5 h-5" style={{ color: GOLD }} />
            <span className="font-serif" style={{ color: TEXT, letterSpacing: "0.22em", fontSize: "0.9rem", fontWeight: 600 }}>
              SG ABOGADOS
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(l => (
              <a key={l.name} href={l.href}
                className="font-serif transition-colors duration-300"
                style={{ fontSize: "0.74rem", letterSpacing: "0.18em", color: "rgba(240,235,224,0.78)", fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,235,224,0.78)")}
              >{l.name}</a>
            ))}
          </nav>

          <button className="md:hidden p-2" style={{ color: "rgba(240,235,224,0.82)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-8 py-6 flex flex-col gap-5" style={{ background: "#08091A", borderBottom: `1px solid ${GOLD}20` }}>
            {navLinks.map(l => (
              <a key={l.name} href={l.href} className="font-serif"
                style={{ fontSize: "0.78rem", letterSpacing: "0.22em", color: "rgba(240,235,224,0.78)" }}
                onClick={() => setMobileMenuOpen(false)}>{l.name}</a>
            ))}
          </div>
        )}
      </motion.header>

      {/* ─── SCROLLING CONTENT — pushed left on desktop ─── */}
      <main className="flex-1 pt-[72px] content-with-statue">

        {/* ═══════════════════════════════════════════════════
            HERO — full height, GSAP reveal
        ══════════════════════════════════════════════════════ */}
        <section id="inicio" className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-24 relative"
          style={{ minHeight: "100vh", background: BG }}>

          {/* Ambient underlighting */}
          <div className="absolute bottom-0 left-0 pointer-events-none" style={{
            width: "70%", height: "45%",
            background: `radial-gradient(ellipse 70% 80% at 20% 100%, rgba(15,33,80,0.28) 0%, transparent 70%)`,
          }} />

          {/* Top gold line */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
            className="absolute top-0 left-0" style={{
              transformOrigin: "left",
              width: "40%", height: "1px",
              background: `linear-gradient(to right, ${GOLD}50, transparent)`,
            }} />

          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-10">
            <Scale size={12} strokeWidth={1.3} style={{ color: GOLD }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.56rem", color: GOLD, letterSpacing: "0.48em" }}>
              SG ABOGADOS · BOGOTÁ, COLOMBIA
            </span>
          </motion.div>

          {/* GSAP headline */}
          <h1 ref={headlineRef} className="font-serif mb-8"
            style={{
              fontSize: "clamp(2rem, 4.2vw, 3.8rem)",
              color: TEXT, fontStyle: "italic", fontWeight: 500,
              lineHeight: 1.18, perspective: "600px",
              maxWidth: "540px",
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
          <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.85, ease: "easeOut" }}
            className="flex items-center gap-3 mb-8" style={{ transformOrigin: "left" }}>
            <div style={{ width: "44px", height: "1px", background: GOLD }} />
            <div style={{ width: "5px", height: "5px", background: GOLD, transform: "rotate(45deg)" }} />
            <div style={{ width: "18px", height: "1px", background: `${GOLD}55` }} />
          </motion.div>

          {/* Subtext */}
          <p ref={subRef} className="font-serif" style={{
            opacity: 0, fontSize: "1rem", color: MUTED, lineHeight: 1.92,
            maxWidth: "400px", marginBottom: "48px",
          }}>
            Derecho de familia, laboral y más — con la dedicación, rigor ético y
            presencia humana que su caso merece.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex items-center gap-8 flex-wrap">
            <a href="#contacto" className="font-serif relative group"
              style={{ fontSize: "0.78rem", color: TEXT, letterSpacing: "0.16em", paddingBottom: "4px", opacity: 0 }}>
              Agendar consulta
              <span className="absolute bottom-0 left-0 w-full" style={{ height: "1px", background: GOLD }} />
            </a>
            <a href="#areas" className="font-serif"
              style={{ fontSize: "0.78rem", color: "rgba(240,235,224,0.42)", letterSpacing: "0.16em", paddingBottom: "4px", borderBottom: "1px solid rgba(240,235,224,0.18)", opacity: 0 }}>
              Nuestras áreas
            </a>
          </div>

          {/* Stats strip */}
          <div ref={statsRef} className="flex items-center gap-10 flex-wrap mt-16"
            style={{ opacity: 0, borderTop: `1px solid ${GOLD}18`, paddingTop: "28px", maxWidth: "500px" }}>
            {[
              { num: "7",    label: "Especialidades" },
              { num: "+5",   label: "Años de experiencia" },
              { num: "100%", label: "Compromiso" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-serif" style={{ fontSize: "1.5rem", color: GOLD2, fontWeight: 600, lineHeight: 1 }}>{s.num}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.62rem", color: MUTED, letterSpacing: "0.12em", marginTop: "4px" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            ÁREAS DE PRÁCTICA — dark cards, 2-col grid
        ══════════════════════════════════════════════════════ */}
        <section id="areas" className="py-20 px-8 md:px-14 lg:px-20 relative" style={{ background: BG2 }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}40, transparent 70%)` }} />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <SecLabel text="ESPECIALIDADES" />
            <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.7rem)", color: TEXT, fontWeight: 500 }}>
              Áreas de Práctica
            </h2>
            <GoldDivider mb={0} />
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid sm:grid-cols-2 gap-4 mb-4">
            {AREAS.slice(0, 4).map((a, i) => <AreaCard key={i} area={a} />)}
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AREAS.slice(4).map((a, i) => <AreaCard key={i} area={a} />)}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            POR QUÉ ELEGIRNOS — numbered pillars, dark
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-8 md:px-14 lg:px-20 relative" style={{ background: BG }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}40, transparent 70%)` }} />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <SecLabel text="NUESTRA PROPUESTA" />
            <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.7rem)", color: TEXT, fontWeight: 500 }}>
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
                className="flex flex-col p-8 py-12"
                style={{
                  borderTop: `1px solid ${GOLD}22`,
                  borderRight: i % 2 === 0 ? `1px solid ${GOLD}14` : "none",
                }}>
                <span className="font-serif block mb-4"
                  style={{ fontSize: "2.8rem", color: `${GOLD}1E`, fontWeight: 700, lineHeight: 1 }}>
                  {f.num}
                </span>
                <div style={{ width: "18px", height: "1px", background: `${GOLD}55`, marginBottom: "18px" }} />
                <h3 className="font-serif mb-4" style={{ fontSize: "1.18rem", color: TEXT, fontWeight: 500 }}>
                  {f.title}
                </h3>
                <p className="font-serif" style={{ fontSize: "0.88rem", color: MUTED, lineHeight: 1.88 }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SOBRE NOSOTROS — text-only, dark
        ══════════════════════════════════════════════════════ */}
        <section id="nosotros" className="py-20 px-8 md:px-14 lg:px-20 relative" style={{ background: BG2 }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}40, transparent 70%)` }} />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <SecLabel text="QUIÉNES SOMOS" />
            <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.7rem)", color: TEXT, fontWeight: 500 }}>
              Sobre Nosotros
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <blockquote className="font-serif italic mb-10" style={{
              fontSize: "1.12rem", color: "rgba(240,235,224,0.82)", lineHeight: 1.82,
              borderLeft: `2px solid ${GOLD}`, paddingLeft: "20px", maxWidth: "520px",
            }}>
              "Un equipo de abogados dedicados a proteger sus derechos con responsabilidad y cercanía."
            </blockquote>

            <div className="flex flex-col gap-5 mb-10" style={{ maxWidth: "520px" }}>
              {[
                "SG Abogados nace de la convicción de que el ejercicio del derecho debe ser, ante todo, humano. Entendemos que detrás de cada expediente hay historias de vida, patrimonio y tranquilidad en juego.",
                "Nos alejamos de la frialdad corporativa para ofrecer un acompañamiento donde usted es escuchado y comprendido. Actuamos con total transparencia sobre las posibilidades reales de su caso.",
                "Su tranquilidad es nuestra prioridad. Confíe su caso a profesionales que combinan rigor académico con empatía humana.",
              ].map((txt, i) => (
                <p key={i} className="font-serif" style={{ fontSize: "0.95rem", color: MUTED, lineHeight: 1.9 }}>
                  {txt}
                </p>
              ))}
            </div>

            <a href="#contacto" className="font-serif relative"
              style={{ fontSize: "0.78rem", color: TEXT, letterSpacing: "0.14em", paddingBottom: "4px" }}
              data-testid="link-nosotros-contacto">
              Agendar una consulta
              <span className="absolute bottom-0 left-0 w-full" style={{ height: "1px", background: GOLD }} />
            </a>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CONTACTO — dark form + contact info
        ══════════════════════════════════════════════════════ */}
        <section id="contacto" className="py-20 px-8 md:px-14 lg:px-20 relative" style={{ background: BG }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${GOLD}40, transparent 70%)` }} />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <SecLabel text="CONTÁCTENOS" />
            <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.7rem)", color: TEXT, fontWeight: 500 }}>
              Contacto
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12">

            {/* INFO COLUMN */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="flex-none flex flex-col gap-8" style={{ width: "min(100%, 280px)" }}>

              <div className="flex flex-col gap-6">
                {[
                  { icon: Phone,         label: "TELÉFONO",  value: "+57 (300) 123-4567",    href: "tel:+573001234567"           },
                  { icon: Mail,          label: "CORREO",    value: "contacto@sgabogados.co", href: "mailto:contacto@sgabogados.co" },
                  { icon: MessageCircle, label: "WHATSAPP",  value: "+57 (300) 123-4567",    href: "https://wa.me/573001234567"  },
                ].map(({ icon: Icon, label, value, href }, i) => (
                  <a key={i} href={href} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0"
                      style={{ border: `1px solid ${GOLD}30` }}>
                      <Icon size={13} strokeWidth={1.5} style={{ color: GOLD }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.56rem", color: `${GOLD}88`, letterSpacing: "0.22em", marginBottom: "2px" }}>
                        {label}
                      </p>
                      <p className="font-serif" style={{ fontSize: "0.9rem", color: TEXT }}
                        onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                        onMouseLeave={e => (e.currentTarget.style.color = TEXT)}>
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Address */}
              <div style={{ borderLeft: `2px solid ${GOLD}45`, paddingLeft: "16px" }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={12} strokeWidth={1.5} style={{ color: GOLD }} />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.56rem", color: `${GOLD}88`, letterSpacing: "0.22em" }}>UBICACIÓN</span>
                </div>
                <p className="font-serif" style={{ fontSize: "0.9rem", color: TEXT, marginBottom: "2px" }}>Cl 12 B 8-23, Oficina 421</p>
                <p className="font-serif" style={{ fontSize: "0.88rem", color: MUTED }}>Bogotá, Colombia</p>
                <p className="font-serif mt-2" style={{ fontSize: "0.76rem", color: `${GOLD}70` }}>
                  Lun–Vie · 8am–6pm · Con cita previa
                </p>
              </div>
            </motion.div>

            {/* FORM */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 p-8"
              style={{ background: "rgba(255,255,255,0.03)", borderTop: `2px solid ${GOLD}55` }}>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6" data-testid="form-contact">
                <div className="grid grid-cols-2 gap-5">
                  <FormField id="name"  label="NOMBRE COMPLETO" placeholder="Juan Pérez"     required />
                  <FormField id="phone" label="TELÉFONO"        placeholder="300 123 4567"   required />
                </div>
                <FormField id="email" label="CORREO ELECTRÓNICO" type="email" placeholder="juan@ejemplo.com" required />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="area" style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.58rem", letterSpacing: "0.22em", color: `${GOLD}AA`,
                  }}>
                    ÁREA DE CONSULTA
                  </label>
                  <select id="area" required data-testid="select-area"
                    className="w-full py-2 font-serif text-sm border-0 border-b focus:outline-none"
                    style={{
                      borderBottom: `1px solid ${GOLD}35`,
                      color: TEXT, background: "transparent", boxShadow: "none",
                    }}>
                    <option value="" style={{ background: "#0A0D1A" }}>Seleccione un área</option>
                    {AREAS.map(a => <option key={a.title} value={a.title} style={{ background: "#0A0D1A" }}>{a.title}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.58rem", letterSpacing: "0.22em", color: `${GOLD}AA`,
                  }}>
                    SU CONSULTA
                  </label>
                  <Textarea id="message" required placeholder="Describa brevemente su situación..."
                    className="sg-input rounded-none border-0 border-b font-serif resize-none min-h-[90px] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{ borderBottom: `1px solid ${GOLD}35`, boxShadow: "none", color: TEXT, fontSize: "0.9rem" }}
                    data-testid="textarea-message" />
                </div>

                <button type="submit" data-testid="button-submit"
                  className="w-full py-4 font-serif transition-all"
                  style={{
                    background: `${GOLD}1A`, color: GOLD2,
                    fontSize: "0.67rem", letterSpacing: "0.28em",
                    border: `1px solid ${GOLD}40`, cursor: "pointer",
                  }}
                  onMouseEnter={e => { (e.currentTarget.style.background = `${GOLD}33`); (e.currentTarget.style.borderColor = GOLD); }}
                  onMouseLeave={e => { (e.currentTarget.style.background = `${GOLD}1A`); (e.currentTarget.style.borderColor = `${GOLD}40`); }}>
                  ENVIAR MENSAJE
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════
          FOOTER — full width, above statute panel
      ══════════════════════════════════════════════════════ */}
      <footer style={{ background: "#040406", borderTop: `1px solid ${GOLD}20`, position: "relative", zIndex: 10 }}>
        <div className="max-w-5xl mx-auto px-8 py-12 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <Scale strokeWidth={1.3} className="w-5 h-5" style={{ color: GOLD }} />
            <span className="font-serif" style={{ color: TEXT, letterSpacing: "0.24em", fontSize: "0.88rem", fontWeight: 500 }}>
              SG ABOGADOS
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ width: "48px", height: "1px", background: `${GOLD}45` }} />
            <div style={{ width: "4px", height: "4px", background: `${GOLD}65`, transform: "rotate(45deg)" }} />
            <div style={{ width: "48px", height: "1px", background: `${GOLD}45` }} />
          </div>

          <p className="font-serif italic mb-8"
            style={{ color: "rgba(240,235,224,0.46)", fontSize: "0.92rem" }}>
            Estrategia jurídica con carácter.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            {[
              { label: "Facebook",  icon: <Facebook size={17} />,      href: "#" },
              { label: "Instagram", icon: <Instagram size={17} />,     href: "#" },
              { label: "WhatsApp",  icon: <MessageCircle size={17} />, href: "https://wa.me/573001234567" },
            ].map(({ label, icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label} data-testid={`link-social-${label.toLowerCase()}`}
                className="w-9 h-9 flex items-center justify-center transition-all"
                style={{ border: `1px solid rgba(196,154,24,0.22)`, color: "rgba(240,235,224,0.5)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.color = GOLD2; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,24,0.22)"; (e.currentTarget as HTMLElement).style.color = "rgba(240,235,224,0.5)"; }}>
                {icon}
              </a>
            ))}
          </div>

          <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "16px" }} />

          <div className="flex items-center justify-center gap-4 flex-wrap">
            {["Política de Privacidad", "Términos de Servicio"].map(label => (
              <a key={label} href="#" className="font-serif transition-colors"
                style={{ fontSize: "0.7rem", color: "rgba(240,235,224,0.38)", letterSpacing: "0.05em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,235,224,0.65)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,235,224,0.38)")}>
                {label}
              </a>
            ))}
            <span style={{ color: "rgba(240,235,224,0.22)", fontSize: "0.6rem" }}>·</span>
            <span className="font-serif" style={{ fontSize: "0.7rem", color: "rgba(240,235,224,0.32)" }}>
              &copy; {new Date().getFullYear()} SG Abogados. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ─── */}
      <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer"
        data-testid="link-whatsapp"
        className="fixed bottom-6 right-6 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 z-50 group"
        style={{ background: "#25D366" }}
        aria-label="Contactar por WhatsApp">
        <MessageCircle size={22} className="text-white" />
        <span className="absolute right-full mr-4 text-xs py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-serif"
          style={{ background: "#08091A", color: "rgba(240,235,224,0.9)", letterSpacing: "0.04em" }}>
          Chatea con nosotros
        </span>
      </a>
    </div>
  );
}

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Scale,
  CheckCircle,
  Menu,
  X,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import heroNewImg from "@assets/generated_images/premium_law_firm_hero_023f.png";
import justiceDetailImg from "@assets/justice_detail.png";

/* ─── Design tokens ────────────────────────────────────── */
const N900 = "#0A1628";   /* darkest navy */
const N800 = "#0F2150";   /* deep navy    */
const N700 = "#1A2F6B";   /* mid navy     */
const GOLD  = "#C49A18";  /* primary gold */
const GOLD2 = "#D4B03A";  /* lighter gold */
const OFF   = "#F7F8FC";  /* off-white    */
const WARM  = "#F2EDE4";  /* warm cream   */

/* Fade-in-up variant */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

/* Stagger container */
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

/* ─── Practice areas (from Sofia Garavito reference) ─────── */
const AREAS = [
  {
    title: "Derecho Penal",
    desc: "Defensa y representación jurídica en procesos penales, denuncias, audiencias y protección de derechos fundamentales.",
    items: ["Defensa técnica", "Denuncias y querellas", "Audiencias preliminares", "Asistencia a víctimas", "Procesos ante Fiscalía y juzgados"]
  },
  {
    title: "Derecho Laboral",
    desc: "Asesoría integral para trabajadores y empleadores en conflictos laborales y protección de derechos.",
    items: ["Liquidaciones e indemnizaciones", "Despidos injustificados", "Acoso laboral", "Contratos laborales", "Conciliaciones y demandas"]
  },
  {
    title: "Derecho Administrativo",
    desc: "Representación en actuaciones ante entidades públicas y defensa de derechos frente a decisiones administrativas.",
    items: ["Derechos de petición", "Acciones constitucionales", "Procesos contencioso-administrativos", "Reparación directa", "Nulidad y restablecimiento"]
  },
  {
    title: "Derecho Disciplinario Policivo",
    desc: "Defensa y acompañamiento jurídico en investigaciones y procesos disciplinarios de carácter policivo.",
    items: ["Descargos y defensa técnica", "Recursos y apelaciones", "Acompañamiento en audiencias", "Asesoría preventiva disciplinaria"]
  },
  {
    title: "Derecho de Tránsito",
    desc: "Asesoría y representación en asuntos relacionados con infracciones y procedimientos de tránsito.",
    items: ["Comparendos", "Audiencias de tránsito", "Impugnaciones", "Accidentes de tránsito", "Cobros coactivos"]
  },
  {
    title: "Derecho de Familia",
    desc: "Acompañamiento en asuntos familiares con enfoque humano, conciliatorio y estratégico.",
    items: ["Cuota alimentaria", "Custodia y visitas", "Divorcios", "Sucesiones", "Unión marital de hecho"]
  },
  {
    title: "Derecho Civil",
    desc: "Soluciones legales en conflictos patrimoniales, contractuales y obligaciones civiles.",
    items: ["Procesos ejecutivos", "Contratos", "Responsabilidad civil", "Cobro de cartera", "Declarativos civiles"]
  }
];

/* ─── Component ─────────────────────────────────────────── */
export default function Home() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(247,248,252,0.0)", "rgba(247,248,252,0.97)"]);

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

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: OFF, color: N900 }}>

      {/* ═══════════════════════════════════════════════════
          NAVBAR — transparent → frosted on scroll
      ══════════════════════════════════════════════════════ */}
      <motion.header
        style={{ backgroundColor: navBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between" style={{ borderBottom: `1px solid ${N800}12` }}>
          <a href="#inicio" className="flex items-center gap-2.5">
            <Scale strokeWidth={1.4} className="w-5 h-5" style={{ color: GOLD }} />
            <span className="font-serif" style={{ color: N900, letterSpacing: "0.2em", fontSize: "0.92rem", fontWeight: 600 }}>
              SG ABOGADOS
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(l => (
              <a
                key={l.name} href={l.href}
                className="font-serif transition-colors duration-200"
                style={{ fontSize: "0.76rem", letterSpacing: "0.18em", color: N900, fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = N900)}
              >{l.name}</a>
            ))}
          </nav>

          <button className="md:hidden p-2" style={{ color: N800 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden p-6 flex flex-col gap-4 shadow-lg" style={{ background: OFF, borderBottom: `1px solid ${N800}20` }}>
            {navLinks.map(l => (
              <a key={l.name} href={l.href} className="font-serif text-xs tracking-widest" style={{ color: N800 }}
                onClick={() => setMobileMenuOpen(false)}>{l.name}</a>
            ))}
          </div>
        )}
      </motion.header>

      <main className="flex-1 pt-[72px]">

        {/* ═══════════════════════════════════════════════════
            HERO — split, next-level
        ══════════════════════════════════════════════════════ */}
        <section id="inicio" className="relative overflow-hidden" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #F7F8FC 0%, #EEF0F7 40%, #E8EAF2 100%)" }}>

          {/* Warm parchment blur circle — bottom left */}
          <div className="absolute pointer-events-none" style={{
            bottom: "-120px", left: "-80px", width: "520px", height: "520px", borderRadius: "50%",
            background: `radial-gradient(circle, ${WARM}CC 0%, transparent 70%)`,
            filter: "blur(40px)"
          }} />
          {/* Gold blur — top right corner of left col */}
          <div className="absolute pointer-events-none" style={{
            top: "60px", left: "30%", width: "300px", height: "300px", borderRadius: "50%",
            background: `radial-gradient(circle, ${GOLD}18 0%, transparent 70%)`,
            filter: "blur(30px)"
          }} />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "100vh" }}>

            {/* LEFT — centered editorial content */}
            <div className="flex flex-col justify-center items-center text-center px-12 lg:px-20 py-24 relative">

              {/* Welcome label */}
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <span className="font-serif" style={{ fontSize: "0.62rem", color: GOLD, letterSpacing: "0.42em" }}>
                  BIENVENIDO A SG ABOGADOS
                </span>
              </motion.div>

              {/* Ornament */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3 my-7">
                <div style={{ width: "44px", height: "1px", background: `${GOLD}55` }} />
                <div style={{ width: "5px", height: "5px", background: `${GOLD}80`, transform: "rotate(45deg)" }} />
                <div style={{ width: "44px", height: "1px", background: `${GOLD}55` }} />
              </motion.div>

              {/* Headline — single elegant size */}
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="font-serif mb-7"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", color: N800, fontWeight: 500, fontStyle: "italic", lineHeight: 1.2 }}>
                Justicia con<br />rostro humano.
              </motion.h1>

              {/* Body copy */}
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.02rem", color: N900, lineHeight: 1.88, maxWidth: "360px", marginBottom: "38px", opacity: 0.72 }}>
                Somos un estudio jurídico comprometido con proteger lo que más importa para usted y su familia. Cada caso recibe la dedicación que merece.
              </motion.p>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center gap-7">
                <a href="#contacto" data-testid="link-hero-contacto"
                  className="font-serif"
                  style={{ fontSize: "0.88rem", color: N800, letterSpacing: "0.08em", paddingBottom: "3px", borderBottom: `1px solid ${GOLD}BB` }}
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.color = N800)}>
                  Agendar consulta
                </a>
                <span style={{ color: `${N800}22`, fontSize: "0.8rem" }}>|</span>
                <a href="#areas" data-testid="link-hero-areas"
                  className="font-serif"
                  style={{ fontSize: "0.88rem", color: `${N800}88`, letterSpacing: "0.08em" }}
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.color = `${N800}88`)}>
                  Nuestras áreas
                </a>
              </motion.div>

              {/* Scroll cue */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                className="absolute bottom-10 flex items-center gap-2"
                style={{ color: `${N800}40` }}>
                <div style={{ width: "20px", height: "1px", background: "currentColor" }} />
                <ChevronDown size={14} />
              </motion.div>
            </div>

            {/* RIGHT — Lady Justice, warm-blended */}
            <div className="relative hidden md:block">
              {/* Warm parchment radial behind statue */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `radial-gradient(ellipse at 60% 60%, ${WARM}FF 0%, #EEF0F7 55%, transparent 100%)`
              }} />
              {/* Left fade blend */}
              <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{
                width: "42%",
                background: `linear-gradient(to right, #EEF0F7 0%, #EEF0F7CC 50%, transparent 100%)`
              }} />
              <img src={heroNewImg} alt="Balanza de la Justicia"
                data-testid="img-lady-justice-hero"
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
              {/* Subtle gold diamond watermark */}
              <div className="absolute bottom-12 right-12 z-20 opacity-20">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <rect x="4" y="4" width="10" height="10" transform="rotate(45 9 9)" fill={GOLD}/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            ÁREAS DE PRÁCTICA — 7 areas, compact premium grid
        ══════════════════════════════════════════════════════ */}
        <section id="areas" className="py-24 relative overflow-hidden">
          {/* Warm blur accent */}
          <div className="absolute pointer-events-none" style={{
            top: "-60px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%",
            background: `radial-gradient(circle, ${WARM}DD 0%, transparent 70%)`,
            filter: "blur(50px)"
          }} />

          <div className="max-w-7xl mx-auto px-8 relative z-10">
            {/* Section header — centered */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div style={{ width: "28px", height: "1px", background: GOLD }} />
                <span className="font-serif" style={{ fontSize: "0.78rem", color: GOLD, letterSpacing: "0.32em", fontWeight: 500 }}>ESPECIALIDADES</span>
                <div style={{ width: "28px", height: "1px", background: GOLD }} />
              </div>
              <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: N800, fontWeight: 500 }}>
                Áreas de Práctica
              </h2>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div style={{ width: "40px", height: "1px", background: `${GOLD}40` }} />
                <div style={{ width: "4px", height: "4px", background: `${GOLD}70`, transform: "rotate(45deg)" }} />
                <div style={{ width: "40px", height: "1px", background: `${GOLD}40` }} />
              </div>
            </motion.div>

            {/* 7-area grid: 4 top, 3 bottom */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
              {AREAS.slice(0, 4).map((area, i) => (
                <AreaCard key={i} area={area} index={i} />
              ))}
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {AREAS.slice(4).map((area, i) => (
                <AreaCard key={i} area={area} index={i + 4} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            POR QUÉ ELEGIRNOS — navy bg, visible text
        ══════════════════════════════════════════════════════ */}
        <section className="py-24 relative overflow-hidden" style={{ background: N800 }}>
          {/* Warm blur — bottom left */}
          <div className="absolute pointer-events-none" style={{
            bottom: "-80px", left: "-60px", width: "400px", height: "400px", borderRadius: "50%",
            background: `radial-gradient(circle, ${WARM}20 0%, transparent 70%)`,
            filter: "blur(40px)"
          }} />

          <div className="max-w-7xl mx-auto px-8 relative z-10">
            {/* Section header — centered */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div style={{ width: "28px", height: "1px", background: GOLD }} />
                <span className="font-serif" style={{ fontSize: "0.65rem", color: GOLD2, letterSpacing: "0.38em" }}>NUESTRA PROPUESTA</span>
                <div style={{ width: "28px", height: "1px", background: GOLD }} />
              </div>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem,3.8vw,3rem)", color: "#FFFFFF", fontWeight: 500, letterSpacing: "0.01em" }}>
                Por qué elegirnos
              </h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div style={{ width: "48px", height: "1px", background: `${GOLD}40` }} />
                <div style={{ width: "5px", height: "5px", background: `${GOLD}60`, transform: "rotate(45deg)" }} />
                <div style={{ width: "48px", height: "1px", background: `${GOLD}40` }} />
              </div>
            </motion.div>

            {/* Cards — premium editorial, no shadows or hover darkening */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-4">
              {[
                { num: "01", title: "Experiencia",    desc: "Años de práctica enfocada que nos permiten anticipar escenarios y construir estrategias sólidas para su caso." },
                { num: "02", title: "Compromiso",     desc: "Asumimos cada caso como propio, con la dedicación y el rigor ético que la ley exige y usted merece." },
                { num: "03", title: "Acompañamiento", desc: "Trato personalizado y humano. Usted siempre sabrá el estado real de su proceso, sin sorpresas." },
                { num: "04", title: "Resultados",     desc: "Nos enfocamos en la eficacia, buscando la resolución más favorable en el menor tiempo posible." }
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex flex-col items-center text-center px-8 py-14"
                  style={{
                    borderTop: `1px solid ${GOLD}35`,
                    borderRight: i < 3 ? `1px solid ${GOLD}15` : "none"
                  }}>
                  {/* Numeral — faint, decorative */}
                  <span className="font-serif block mb-5"
                    style={{ fontSize: "3rem", color: `${GOLD}22`, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>
                    {f.num}
                  </span>
                  {/* Thin gold rule */}
                  <div style={{ width: "20px", height: "1px", background: `${GOLD}55`, marginBottom: "22px" }} />
                  {/* Title */}
                  <h3 className="font-serif mb-5"
                    style={{ fontSize: "1.22rem", color: "#FFFFFF", fontWeight: 500, letterSpacing: "0.01em" }}>
                    {f.title}
                  </h3>
                  {/* Desc */}
                  <p className="font-serif"
                    style={{ fontSize: "0.9rem", color: "rgba(247,248,252,0.6)", lineHeight: 1.85 }}>
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SOBRE NOSOTROS — image LEFT, text RIGHT
        ══════════════════════════════════════════════════════ */}
        <section id="nosotros" className="py-24 relative overflow-hidden" style={{ background: OFF }}>
          {/* Warm parchment accent — right side */}
          <div className="absolute pointer-events-none" style={{
            top: "0", right: "-60px", width: "560px", height: "100%",
            background: `linear-gradient(to left, ${WARM}88 0%, transparent 60%)`
          }} />

          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* LEFT — image with premium border treatment */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, ease: "easeInOut" }}
                className="relative">
                {/* Outer gold border frame — offset */}
                <div className="absolute pointer-events-none" style={{
                  top: "16px", left: "16px", right: "-16px", bottom: "-16px",
                  border: `1px solid ${GOLD}30`,
                  zIndex: 0
                }} />
                {/* Inner frame */}
                <div className="relative" style={{
                  border: `1px solid ${GOLD}50`,
                  zIndex: 1
                }}>
                  {/* Gold corner accents */}
                  {[["top-0 left-0", "0,0 16,0 0,16"], ["top-0 right-0", "0,0 -16,0 0,16"], ["bottom-0 left-0", "0,0 16,0 0,-16"], ["bottom-0 right-0", "0,0 -16,0 0,-16"]].map(([pos, pts], ci) => (
                    <svg key={ci} width="20" height="20" viewBox="-2 -2 20 20"
                      className={`absolute ${pos} z-20`}>
                      <polyline points={pts} fill="none" stroke={GOLD} strokeWidth="2"/>
                    </svg>
                  ))}
                  <div className="overflow-hidden" style={{ aspectRatio: "4/5" }}>
                    <img src={justiceDetailImg} alt="SGC Abogados"
                      data-testid="img-lady-justice-nosotros"
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                      style={{ objectFit: "cover", objectPosition: "center top", filter: "brightness(1.02)" }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* RIGHT — text */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, ease: "easeInOut" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ width: "28px", height: "1px", background: GOLD }} />
                  <span className="font-serif" style={{ fontSize: "0.58rem", color: GOLD, letterSpacing: "0.38em" }}>QUIÉNES SOMOS</span>
                </div>
                <h2 className="font-serif mb-6" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: N800, fontWeight: 500 }}>
                  Sobre Nosotros
                </h2>
                <p className="font-serif italic mb-7" style={{ fontSize: "1.1rem", color: N700, lineHeight: 1.8, borderLeft: `2px solid ${GOLD}`, paddingLeft: "16px" }}>
                  "Un equipo de abogados dedicados a proteger sus derechos con responsabilidad y cercanía."
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    "SG Abogados nace de la convicción de que el ejercicio del derecho debe ser, ante todo, humano. Entendemos que detrás de cada expediente hay historias de vida, patrimonio y tranquilidad en juego.",
                    "Nos alejamos de la frialdad corporativa para ofrecer un acompañamiento donde usted es escuchado y comprendido. Actuamos con total transparencia sobre las posibilidades reales de su caso.",
                    "Su tranquilidad es nuestra prioridad. Confíe su caso a profesionales que combinan rigor académico con empatía humana."
                  ].map((txt, i) => (
                    <p key={i} className="font-serif" style={{ fontSize: "0.95rem", color: "#0A1628", lineHeight: 1.82 }}>
                      {txt}
                    </p>
                  ))}
                </div>
                <div className="mt-9">
                  <a href="#contacto" data-testid="link-nosotros-contacto"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem", color: N800, letterSpacing: "0.12em", paddingBottom: "2px", borderBottom: `1px solid ${GOLD}BB` }}
                    onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                    onMouseLeave={e => (e.currentTarget.style.color = N800)}>
                    Agendar una consulta
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CONTACTO — form + info + location
        ══════════════════════════════════════════════════════ */}
        <section id="contacto" className="py-24 relative overflow-hidden" style={{ background: "#F0F2F8" }}>
          {/* Warm blur — bottom right */}
          <div className="absolute pointer-events-none" style={{
            bottom: "-80px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%",
            background: `radial-gradient(circle, ${WARM}CC 0%, transparent 70%)`,
            filter: "blur(50px)"
          }} />

          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: "28px", height: "1px", background: GOLD }} />
                <span className="font-serif" style={{ fontSize: "0.58rem", color: GOLD, letterSpacing: "0.38em" }}>CONTÁCTENOS</span>
              </div>
              <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: N800, fontWeight: 500 }}>
                Contacto
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-10">

              {/* INFO + LOCATION — 2 cols */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="lg:col-span-2 flex flex-col gap-8">

                {/* Contact data */}
                <div>
                  <h3 className="font-serif mb-6" style={{ fontSize: "1.1rem", color: N800, fontWeight: 500 }}>
                    Información de contacto
                  </h3>
                  <div className="flex flex-col gap-5">
                    {[
                      { icon: Phone,  label: "Teléfono",           value: "+57 (300) 123-4567", href: "tel:+573001234567" },
                      { icon: Mail,   label: "Correo electrónico", value: "contacto@sgcabogados.co", href: "mailto:contacto@sgcabogados.co" },
                      { icon: MessageCircle, label: "WhatsApp",    value: "+57 (300) 123-4567", href: "https://wa.me/573001234567" },
                    ].map(({ icon: Icon, label, value, href }, i) => (
                      <a key={i} href={href} className="flex items-start gap-3 group">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: `${N800}10` }}>
                          <Icon size={14} strokeWidth={1.5} style={{ color: GOLD }} />
                        </div>
                        <div>
                          <p className="font-serif" style={{ fontSize: "0.72rem", color: "#0F215099", letterSpacing: "0.1em" }}>{label.toUpperCase()}</p>
                          <p className="font-serif transition-colors" style={{ fontSize: "0.92rem", color: N800 }}
                            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                            onMouseLeave={e => (e.currentTarget.style.color = N800)}>{value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Location — address card + map */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={14} strokeWidth={1.5} style={{ color: GOLD }} />
                    <span className="font-serif" style={{ fontSize: "0.72rem", color: "#0F215099", letterSpacing: "0.1em" }}>UBICACIÓN</span>
                  </div>

                  {/* OpenStreetMap embed — Bogotá centro */}
                  <div className="relative overflow-hidden mb-4" style={{ height: "180px", border: `1px solid ${GOLD}33` }}>
                    <iframe
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0780,-74.0700&layer=mapnik&marker=4.6093,-74.0721"
                      title="Ubicación SGC Abogados"
                      width="100%" height="100%"
                      style={{ border: 0, display: "block", filter: "grayscale(0.3) sepia(0.1)" }}
                      loading="lazy"
                    />
                    {/* Gradient overlay to match palette */}
                    <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
                  </div>

                  {/* Address details like Sofia Garavito flyer */}
                  <div className="p-4" style={{ background: `${N800}08`, borderLeft: `2px solid ${GOLD}` }}>
                    <p className="font-serif font-medium mb-0.5" style={{ fontSize: "0.92rem", color: N800 }}>
                      Oficina SGC Abogados
                    </p>
                    <p className="font-serif" style={{ fontSize: "0.85rem", color: `${N800}AA` }}>
                      Cl 12 B 8-23, Oficina 421
                    </p>
                    <p className="font-serif" style={{ fontSize: "0.85rem", color: `${N800}AA` }}>
                      Bogotá, Colombia
                    </p>
                    <p className="font-serif mt-1" style={{ fontSize: "0.72rem", color: "#0F215099" }}>
                      Atención con cita previa · Lun–Vie 8am–6pm
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* FORM — 3 cols */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-3 p-10"
                style={{ background: OFF, borderTop: `3px solid ${GOLD}` }}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" data-testid="form-contact">
                  <div className="grid grid-cols-2 gap-5">
                    <FormField id="name" label="NOMBRE COMPLETO" placeholder="Juan Pérez" required />
                    <FormField id="phone" label="TELÉFONO" placeholder="300 123 4567" required />
                  </div>
                  <FormField id="email" label="CORREO ELECTRÓNICO" type="email" placeholder="juan@ejemplo.com" required />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="area" className="font-serif"
                      style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: "#0F215099" }}>
                      ÁREA DE CONSULTA
                    </label>
                    <select id="area" required data-testid="select-area"
                      className="w-full py-2 font-serif text-sm bg-transparent border-0 border-b focus:outline-none"
                      style={{ borderBottom: `1px solid ${N800}28`, color: "#0A1628" }}>
                      <option value="">Seleccione un área</option>
                      {AREAS.map(a => <option key={a.title} value={a.title}>{a.title}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-serif"
                      style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: "#0F215099" }}>
                      SU CONSULTA
                    </label>
                    <Textarea id="message" required placeholder="Describa brevemente su situación..."
                      className="rounded-none border-0 border-b font-serif resize-none min-h-[90px] bg-transparent focus-visible:ring-0"
                      style={{ borderBottom: `1px solid ${N800}28`, boxShadow: "none", color: "#0A1628", fontSize: "0.92rem" }}
                      data-testid="textarea-message" />
                  </div>

                  <button type="submit" data-testid="button-submit"
                    className="w-full py-4 font-serif transition-all"
                    style={{ background: N800, color: GOLD2, fontSize: "0.7rem", letterSpacing: "0.25em", border: "none", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = N700)}
                    onMouseLeave={e => (e.currentTarget.style.background = N800)}>
                    ENVIAR MENSAJE
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════
          FOOTER — high contrast, fully visible
      ══════════════════════════════════════════════════════ */}
      <footer style={{ background: N900 }}>
        {/* Wave divider */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "48px" }}>
            <path d="M0,24 C360,48 1080,0 1440,24 L1440,0 L0,0 Z" fill={N800} />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-8 py-14 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <Scale strokeWidth={1.3} className="w-6 h-6" style={{ color: GOLD }} />
            <span className="font-serif" style={{ color: "#FFFFFF", letterSpacing: "0.24em", fontSize: "0.9rem", fontWeight: 500 }}>
              SG ABOGADOS
            </span>
          </div>

          {/* Gold rule */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ width: "60px", height: "1px", background: `${GOLD}55` }} />
            <div style={{ width: "5px", height: "5px", background: `${GOLD}77`, transform: "rotate(45deg)" }} />
            <div style={{ width: "60px", height: "1px", background: `${GOLD}55` }} />
          </div>

          {/* Tagline */}
          <p className="font-serif italic mb-9" style={{ color: "rgba(247,248,252,0.70)", fontSize: "0.92rem" }}>
            Estrategia jurídica con carácter.
          </p>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-4 mb-9">
            {[
              { label: "Facebook",  icon: <Facebook size={18} />,        href: "#" },
              { label: "Instagram", icon: <Instagram size={18} />,       href: "#" },
              { label: "WhatsApp",  icon: <MessageCircle size={18} />,   href: "https://wa.me/573001234567" },
            ].map(({ label, icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label} data-testid={`link-social-${label.toLowerCase()}`}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.10)", color: "rgba(247,248,252,0.75)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = `${GOLD}33`;
                  (e.currentTarget as HTMLElement).style.color = GOLD2;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(247,248,252,0.75)";
                }}>
                {icon}
              </a>
            ))}
          </div>

          {/* Contact quick strip */}
          <div className="flex items-center justify-center gap-6 flex-wrap mb-9">
            {[
              { icon: <Phone size={12} />, text: "+57 (300) 123-4567" },
              { icon: <Mail size={12} />, text: "contacto@sgcabogados.co" },
              { icon: <MapPin size={12} />, text: "Bogotá, Colombia" },
            ].map(({ icon, text }, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span style={{ color: GOLD }}>{icon}</span>
                <span className="font-serif" style={{ fontSize: "0.78rem", color: "rgba(247,248,252,0.65)" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "20px" }} />

          {/* Bottom links */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {["Política de Privacidad", "Términos de Servicio"].map(label => (
              <a key={label} href="#" className="font-serif transition-colors"
                style={{ fontSize: "0.72rem", color: "rgba(247,248,252,0.42)", letterSpacing: "0.05em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(247,248,252,0.75)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(247,248,252,0.42)")}>
                {label}
              </a>
            ))}
            <span style={{ color: "rgba(247,248,252,0.25)", fontSize: "0.6rem" }}>·</span>
            <span className="font-serif" style={{ fontSize: "0.72rem", color: "rgba(247,248,252,0.35)" }}>
              &copy; {new Date().getFullYear()} SG Abogados. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer"
        data-testid="link-whatsapp"
        className="fixed bottom-6 right-6 w-13 h-13 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 z-50 group"
        style={{ background: "#25D366", width: "52px", height: "52px" }}
        aria-label="Contactar por WhatsApp">
        <MessageCircle size={24} className="text-white" />
        <span className="absolute right-full mr-4 text-xs py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-serif"
          style={{ background: N900, color: "rgba(247,248,252,0.9)", letterSpacing: "0.04em" }}>
          Chatea con nosotros
        </span>
      </a>
    </div>
  );
}

/* ─── Creative thematic SVG icons (one per area, placed at card footer) ── */
const AREA_DECORATIONS = [
  /* 0 Penal — gavel + block */
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="7" width="13" height="8" rx="1.5" transform="rotate(-38 16.5 11)"/>
    <line x1="22" y1="18" x2="36" y2="33"/>
    <rect x="7" y="35" width="18" height="5" rx="1.5"/>
  </svg>,
  /* 1 Laboral — handshake */
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 28 L16 20 L22 22 L30 20 L42 28"/>
    <path d="M16 20 L20 14 L26 16 L30 20"/>
    <path d="M22 22 L24 30 M26 22 L27 30"/>
    <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none"/>
  </svg>,
  /* 2 Administrativo — building columns */
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="24,6 42,16 6,16"/>
    <line x1="6" y1="16" x2="42" y2="16"/>
    <rect x="6" y="38" width="36" height="4" rx="0.5"/>
    <line x1="12" y1="18" x2="12" y2="37"/>
    <line x1="20" y1="18" x2="20" y2="37"/>
    <line x1="28" y1="18" x2="28" y2="37"/>
    <line x1="36" y1="18" x2="36" y2="37"/>
  </svg>,
  /* 3 Disciplinario Policivo — shield + star */
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 5 L40 11 L40 26 C40 35 24 44 24 44 C24 44 8 35 8 26 L8 11 Z"/>
    <polygon points="24,15 26,20 31,20 27,23 28.5,29 24,26 19.5,29 21,23 17,20 22,20"/>
  </svg>,
  /* 4 Tránsito — steering wheel */
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="18"/>
    <circle cx="24" cy="24" r="5"/>
    <line x1="24" y1="6" x2="24" y2="19"/>
    <line x1="8.4" y1="33" x2="19.7" y2="26.5"/>
    <line x1="39.6" y1="33" x2="28.3" y2="26.5"/>
  </svg>,
  /* 5 Familia — house + heart */
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 24 L24 8 L42 24"/>
    <path d="M12 22 L12 40 L36 40 L36 22"/>
    <path d="M18 40 L18 30 L30 30 L30 40"/>
    <path d="M24 18 C22 15 18 16 18 20 C18 24 24 28 24 28 C24 28 30 24 30 20 C30 16 26 15 24 18Z" fill="currentColor" stroke="none" opacity="0.5"/>
  </svg>,
  /* 6 Civil — scroll with quill */
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8 C8 8 8 14 12 14 L36 14 C40 14 40 8 36 8 Z"/>
    <path d="M12 14 L12 38 C12 42 16 42 16 38 L16 14"/>
    <line x1="20" y1="20" x2="36" y2="20"/>
    <line x1="20" y1="26" x2="36" y2="26"/>
    <line x1="20" y1="32" x2="30" y2="32"/>
    <path d="M38 6 C44 12 42 22 36 26 L34 32 L32 28 C36 22 38 14 34 8 Z" fill="currentColor" stroke="none" opacity="0.4"/>
  </svg>,
];

/* ─── Sub-components ───────────────────────────────────── */
function AreaCard({ area, index }: { area: typeof AREAS[0]; index: number }) {
  const N800 = "#0F2150";
  const N900 = "#0A1628";
  const GOLD = "#C49A18";
  const OFF  = "#F7F8FC";
  return (
    <motion.div variants={fadeUp}
      className="group flex flex-col p-7 transition-all duration-300"
      style={{ background: OFF, borderTop: `2px solid ${GOLD}`, cursor: "default", minHeight: "320px" }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px ${N900}12`)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>

      {/* Title — centered */}
      <h3 className="font-serif text-center mb-3" style={{ fontSize: "1.15rem", color: N800, fontWeight: 600, letterSpacing: "0.01em" }}>
        {area.title}
      </h3>

      {/* Gold divider under title */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div style={{ width: "30px", height: "1px", background: `${GOLD}60` }} />
        <div style={{ width: "4px", height: "4px", background: `${GOLD}80`, transform: "rotate(45deg)" }} />
        <div style={{ width: "30px", height: "1px", background: `${GOLD}60` }} />
      </div>

      {/* Description — centered */}
      <p className="font-serif text-center mb-5" style={{ fontSize: "0.88rem", color: N900, lineHeight: 1.7, opacity: 0.75 }}>
        {area.desc}
      </p>

      {/* Items list */}
      <ul className="flex flex-col gap-1.5 flex-1">
        {area.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle size={12} strokeWidth={1.5} className="shrink-0" style={{ color: GOLD, marginTop: "4px" }} />
            <span className="font-serif" style={{ fontSize: "0.84rem", color: N900, opacity: 0.82, lineHeight: 1.5 }}>{item}</span>
          </li>
        ))}
      </ul>

    </motion.div>
  );
}

function FormField({ id, label, placeholder, type = "text", required = false }: {
  id: string; label: string; placeholder: string; type?: string; required?: boolean;
}) {
  const N800 = "#0F2150";
  const N900 = "#0A1628";
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-serif"
        style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: "#0F215099" }}>
        {label}
      </label>
      <Input id={id} type={type} required={required} placeholder={placeholder}
        data-testid={`input-${id}`}
        className="rounded-none border-0 border-b font-serif bg-transparent focus-visible:ring-0"
        style={{ borderBottom: `1px solid ${N800}28`, boxShadow: "none", color: "#0A1628", fontSize: "0.92rem" }}
      />
    </div>
  );
}

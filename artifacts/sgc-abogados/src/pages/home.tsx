import { useState } from "react";
import { motion } from "framer-motion";
import {
  Scale,
  Users,
  Briefcase,
  ShieldCheck,
  Award,
  Clock,
  HeartHandshake,
  CheckCircle,
  Menu,
  X,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import justiceHeroImg from "@assets/justice_hero.png";
import justiceDetailImg from "@assets/justice_detail.png";

/* ── Brand tokens ─────────────────────────────────────── */
const NAVY   = "hsl(220 62% 18%)";   /* deep navy  #0D1C49  */
const NAVY2  = "hsl(220 58% 26%)";   /* mid navy   #1A2F6B  */
const GOLD   = "hsl(43 72% 44%)";    /* gold       #C49A18  */
const GOLD2  = "hsl(41 65% 55%)";    /* light gold #D4B03A  */
const LIGHT  = "hsl(220 30% 97%)";   /* off-white            */
const DARK   = "hsl(220 65% 10%)";   /* very dark navy       */
const DARKBG = "hsl(220 65% 7%)";    /* footer bg            */

export default function Home() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">

      {/* ── NAVBAR ── */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: `${LIGHT}f7`,
          backdropFilter: "blur(6px)",
          borderBottom: `1px solid hsl(220 20% 82% / 0.5)`
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Scale className="h-6 w-6" strokeWidth={1.5} style={{ color: GOLD }} />
            <span
              className="font-serif tracking-widest"
              style={{ color: NAVY, letterSpacing: "0.18em", fontSize: "1rem" }}
            >
              SGC ABOGADOS
            </span>
          </div>

          {/* Desktop nav — no CTA button */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-serif text-xs transition-colors"
                style={{ color: `${NAVY}99`, letterSpacing: "0.18em" }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = `${NAVY}99`)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden p-2"
            style={{ color: NAVY }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden absolute top-20 left-0 w-full p-6 flex flex-col gap-5 shadow-lg"
            style={{ background: LIGHT, borderBottom: `1px solid hsl(220 20% 82%)` }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-serif text-sm tracking-widest"
                style={{ color: NAVY, letterSpacing: "0.15em" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* ── HERO ── */}
        <section
          id="inicio"
          className="relative overflow-hidden"
          style={{ minHeight: "calc(100vh - 80px)", background: LIGHT }}
        >
          {/* Subtle diagonal background accent */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${LIGHT} 0%, hsl(220 25% 93%) 50%, hsl(220 30% 90%) 100%)`
            }}
          />

          <div
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full"
            style={{ minHeight: "calc(100vh - 80px)" }}
          >
            {/* LEFT — content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col justify-center items-center text-center px-10 lg:px-20 py-16"
            >
              {/* Scale icon */}
              <div className="mb-4">
                <Scale className="w-14 h-14 mx-auto" strokeWidth={1} style={{ color: GOLD }} />
              </div>

              {/* S G C */}
              <div className="flex items-center justify-center gap-1 mb-1">
                <svg width="36" height="50" viewBox="0 0 36 50" fill="none">
                  <path d="M32 25C26 17,16 11,8 7 M32 25C26 33,16 39,8 43 M32 25C22 23,14 19,6 13 M32 25C22 27,14 31,6 37"
                    stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
                </svg>
                <h1
                  className="font-serif font-semibold leading-none px-1"
                  style={{ fontSize: "clamp(3.5rem,8vw,5.5rem)", color: NAVY, letterSpacing: "0.06em" }}
                >
                  SGC
                </h1>
                <svg width="36" height="50" viewBox="0 0 36 50" fill="none" style={{ transform: "scaleX(-1)" }}>
                  <path d="M32 25C26 17,16 11,8 7 M32 25C26 33,16 39,8 43 M32 25C22 23,14 19,6 13 M32 25C22 27,14 31,6 37"
                    stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
                </svg>
              </div>

              {/* Divider + diamond */}
              <div className="flex items-center justify-center gap-2 my-2 w-64">
                <div className="h-px flex-1" style={{ background: `${GOLD}55` }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: `${GOLD}88` }} />
                <div className="h-px flex-1" style={{ background: `${GOLD}55` }} />
              </div>

              <p
                className="font-serif tracking-widest mb-4"
                style={{ fontSize: "0.72rem", color: GOLD, letterSpacing: "0.55em" }}
              >
                ABOGADOS
              </p>

              <div className="w-64 h-px mb-4" style={{ background: `${NAVY}18` }} />

              <p
                className="font-serif tracking-widest mb-10"
                style={{ fontSize: "0.6rem", color: `${NAVY}60`, letterSpacing: "0.28em" }}
              >
                EXPERIENCIA &nbsp;|&nbsp; COMPROMISO &nbsp;|&nbsp; RESULTADOS
              </p>

              {/* Body copy */}
              <div className="max-w-xs mb-8">
                <p
                  className="font-serif leading-relaxed"
                  style={{ fontSize: "1.05rem", color: `${NAVY}BB` }}
                >
                  Abogados con experiencia en derecho de familia y laboral, enfocados en ofrecer{" "}
                  <strong style={{ color: NAVY }}>
                    acompañamiento jurídico responsable, cercano y eficaz.
                  </strong>
                </p>
              </div>

              {/* CTA label */}
              <p
                className="font-serif tracking-widest mb-6"
                style={{ fontSize: "0.6rem", color: `${NAVY}50`, letterSpacing: "0.25em" }}
              >
                CONSULTAS Y ACOMPAÑAMIENTO JURÍDICO:
              </p>

              {/* Text-only CTAs — no borders */}
              <div className="flex items-center gap-6">
                <a
                  href="#contacto"
                  data-testid="link-hero-contacto"
                  className="font-serif transition-all"
                  style={{
                    fontSize: "0.9rem",
                    color: NAVY,
                    letterSpacing: "0.08em",
                    paddingBottom: "2px",
                    borderBottom: `1px solid ${GOLD}88`
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.color = NAVY)}
                >
                  Agendar consulta
                </a>
                <span style={{ color: `${NAVY}25` }}>|</span>
                <a
                  href="#areas"
                  data-testid="link-hero-areas"
                  className="font-serif transition-all"
                  style={{ fontSize: "0.9rem", color: `${NAVY}70`, letterSpacing: "0.08em" }}
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.color = `${NAVY}70`)}
                >
                  Nuestras áreas
                </a>
              </div>

              <div className="mt-12 opacity-40">
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <rect x="3" y="3" width="8" height="8" transform="rotate(45 7 7)" fill={GOLD} />
                </svg>
              </div>
            </motion.div>

            {/* RIGHT — AI-generated Lady Justice */}
            <div className="relative hidden md:block">
              {/* Fade blend with left */}
              <div
                className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
                style={{
                  width: "45%",
                  background: `linear-gradient(to right, hsl(220 25% 93%) 0%, hsl(220 25% 93% / 0.7) 50%, transparent 100%)`
                }}
              />
              <img
                src={justiceHeroImg}
                alt="Diosa de la Justicia — SGC Abogados"
                data-testid="img-lady-justice-hero"
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "brightness(1.02)"
                }}
              />
            </div>
          </div>
        </section>

        {/* ── ÁREAS DE PRÁCTICA ── */}
        <section id="areas" className="py-28" style={{ background: "hsl(220 25% 94%)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p
                className="font-serif tracking-widest mb-4"
                style={{ fontSize: "0.62rem", color: GOLD, letterSpacing: "0.38em" }}
              >
                ESPECIALIDADES
              </p>
              <h2
                className="font-serif font-medium mb-5"
                style={{ fontSize: "clamp(2rem,4vw,2.8rem)", color: NAVY }}
              >
                Áreas de Práctica
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16" style={{ background: `${GOLD}55` }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: `${GOLD}77` }} />
                <div className="h-px w-16" style={{ background: `${GOLD}55` }} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Users,
                  title: "Derecho de Familia",
                  desc: "Acompañamiento sensible y firme en los procesos que involucran a sus seres queridos, protegiendo siempre el bienestar familiar.",
                  items: [
                    "Divorcios y cesación de efectos civiles",
                    "Custodia y cuidado personal",
                    "Fijación de cuotas alimentarias",
                    "Sucesiones y testamentos",
                    "Declaración de unión marital de hecho"
                  ]
                },
                {
                  icon: Briefcase,
                  title: "Derecho Laboral",
                  desc: "Defensa de los derechos de trabajadores y asesoría precisa para empleadores, buscando siempre la justicia en el ámbito laboral.",
                  items: [
                    "Despidos injustificados",
                    "Liquidaciones y prestaciones sociales",
                    "Acoso laboral (Ley 1010)",
                    "Procesos disciplinarios",
                    "Pensiones y seguridad social"
                  ]
                }
              ].map((area, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  className="p-10"
                  style={{
                    background: LIGHT,
                    borderTop: `3px solid ${GOLD}`
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                    style={{ background: `${NAVY}12` }}
                  >
                    <area.icon className="w-7 h-7" strokeWidth={1.3} style={{ color: NAVY }} />
                  </div>
                  <h3
                    className="font-serif font-medium mb-3"
                    style={{ fontSize: "1.6rem", color: NAVY }}
                  >
                    {area.title}
                  </h3>
                  <p
                    className="font-serif leading-relaxed mb-7"
                    style={{ color: `${NAVY}88`, fontSize: "0.97rem" }}
                  >
                    {area.desc}
                  </p>
                  <ul className="space-y-3">
                    {area.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle
                          className="w-4 h-4 shrink-0 mt-1"
                          strokeWidth={1.5}
                          style={{ color: GOLD }}
                        />
                        <span
                          className="font-serif"
                          style={{ color: `${NAVY}99`, fontSize: "0.95rem" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POR QUÉ ELEGIRNOS ── */}
        <section className="py-28" style={{ background: NAVY }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p
                className="font-serif tracking-widest mb-4"
                style={{ fontSize: "0.62rem", color: GOLD2, letterSpacing: "0.38em", opacity: 0.75 }}
              >
                NUESTRA PROPUESTA
              </p>
              <h2
                className="font-serif font-medium mb-5"
                style={{ fontSize: "clamp(2rem,4vw,2.8rem)", color: LIGHT }}
              >
                Por qué elegirnos
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16" style={{ background: `${GOLD}55` }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: `${GOLD}77` }} />
                <div className="h-px w-16" style={{ background: `${GOLD}55` }} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: Award,         title: "Experiencia",      desc: "Años de práctica enfocada que nos permiten anticipar escenarios y construir estrategias sólidas." },
                { icon: ShieldCheck,   title: "Compromiso",       desc: "Asumimos cada caso como propio, con la dedicación y el rigor ético que la ley exige." },
                { icon: HeartHandshake,title: "Acompañamiento",   desc: "Trato personalizado y humano. Usted siempre sabrá el estado real de su proceso." },
                { icon: Clock,         title: "Resultados",       desc: "Nos enfocamos en la eficacia, buscando la resolución más favorable en el menor tiempo posible." }
              ].map((f, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="text-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}33` }}
                  >
                    <f.icon className="w-7 h-7" strokeWidth={1.3} style={{ color: GOLD }} />
                  </div>
                  <h3 className="font-serif font-medium mb-3" style={{ fontSize: "1.2rem", color: LIGHT }}>
                    {f.title}
                  </h3>
                  <p className="font-serif leading-relaxed" style={{ color: `${LIGHT}88`, fontSize: "0.9rem" }}>
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOBRE NOSOTROS ── */}
        <section id="nosotros" className="py-28" style={{ background: LIGHT }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div
                  className="aspect-[4/5] relative overflow-hidden"
                  style={{ borderTop: `2px solid ${GOLD}55`, borderLeft: `2px solid ${GOLD}55` }}
                >
                  <img
                    src={justiceDetailImg}
                    alt="SGC Abogados — Diosa de la Justicia"
                    data-testid="img-lady-justice-nosotros"
                    className="w-full h-full"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center top",
                      filter: "brightness(1.0)"
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${NAVY}22, transparent 60%)` }}
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 w-full h-full pointer-events-none"
                  style={{ border: `2px solid ${GOLD}20`, zIndex: -1 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p
                  className="font-serif tracking-widest mb-5"
                  style={{ fontSize: "0.62rem", color: GOLD, letterSpacing: "0.38em" }}
                >
                  QUIÉNES SOMOS
                </p>
                <h2
                  className="font-serif font-medium mb-4"
                  style={{ fontSize: "clamp(2rem,4vw,2.6rem)", color: NAVY }}
                >
                  Sobre Nosotros
                </h2>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-16" style={{ background: `${GOLD}55` }} />
                  <div className="w-1.5 h-1.5 rotate-45" style={{ background: `${GOLD}77` }} />
                </div>
                <p
                  className="font-serif italic mb-6"
                  style={{ fontSize: "1.15rem", color: NAVY2, lineHeight: "1.8" }}
                >
                  "Un equipo de abogados dedicados a proteger sus derechos con responsabilidad y cercanía."
                </p>
                <div className="space-y-5" style={{ color: `${NAVY}BB`, fontSize: "1rem", lineHeight: "1.85" }}>
                  <p className="font-serif">
                    SGC Abogados nace de la convicción de que el ejercicio del derecho debe ser, ante todo, humano. Entendemos que detrás de cada expediente hay historias de vida, patrimonio y tranquilidad en juego.
                  </p>
                  <p className="font-serif">
                    Nos alejamos de la frialdad corporativa para ofrecer un acompañamiento donde usted es escuchado y comprendido. Actuamos con total transparencia, hablándole con la verdad sobre las posibilidades reales de su caso.
                  </p>
                  <p className="font-serif">
                    Su tranquilidad es nuestra prioridad. Confíe su caso a profesionales que combinan rigor académico con empatía humana.
                  </p>
                </div>
                <div className="mt-10">
                  <a
                    href="#contacto"
                    data-testid="link-nosotros-contacto"
                    className="font-serif transition-all"
                    style={{
                      fontSize: "0.85rem",
                      color: NAVY,
                      letterSpacing: "0.1em",
                      paddingBottom: "2px",
                      borderBottom: `1px solid ${GOLD}88`
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                    onMouseLeave={e => (e.currentTarget.style.color = NAVY)}
                  >
                    Agendar una consulta
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CONTACTO ── */}
        <section id="contacto" className="py-28" style={{ background: "hsl(220 25% 94%)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p
                className="font-serif tracking-widest mb-4"
                style={{ fontSize: "0.62rem", color: GOLD, letterSpacing: "0.38em" }}
              >
                CONTÁCTENOS
              </p>
              <h2
                className="font-serif font-medium mb-5"
                style={{ fontSize: "clamp(2rem,4vw,2.8rem)", color: NAVY }}
              >
                Contacto
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16" style={{ background: `${GOLD}55` }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: `${GOLD}77` }} />
                <div className="h-px w-16" style={{ background: `${GOLD}55` }} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-14">
              {/* Info */}
              <div className="md:col-span-2">
                <h3
                  className="font-serif font-medium mb-8"
                  style={{ fontSize: "1.3rem", color: NAVY }}
                >
                  Información de contacto
                </h3>
                <div className="space-y-7">
                  {[
                    { icon: Phone,  label: "Teléfono",            value: "+57 (300) 123-4567" },
                    { icon: Mail,   label: "Correo electrónico",  value: "contacto@sgcabogados.co" },
                    { icon: MapPin, label: "Oficina principal",   value: "Bogotá, Colombia", note: "Atención con cita previa" }
                  ].map(({ icon: Icon, label, value, note }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <Icon className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={1.4} style={{ color: GOLD }} />
                      <div>
                        <p className="font-serif text-sm font-medium" style={{ color: NAVY }}>{label}</p>
                        <p className="font-serif" style={{ color: `${NAVY}88`, fontSize: "0.95rem" }}>{value}</p>
                        {note && <p className="font-serif text-xs mt-0.5" style={{ color: `${NAVY}55` }}>{note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-3 p-10" style={{ background: LIGHT, borderTop: `3px solid ${GOLD}` }}>
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="font-serif text-xs tracking-widest"
                        style={{ color: `${NAVY}88`, letterSpacing: "0.12em" }}
                      >
                        NOMBRE COMPLETO
                      </label>
                      <Input
                        id="name" required placeholder="Juan Pérez"
                        className="rounded-none border-0 border-b font-serif bg-transparent"
                        style={{ borderBottom: `1px solid ${NAVY}30`, boxShadow: "none" }}
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="phone"
                        className="font-serif text-xs tracking-widest"
                        style={{ color: `${NAVY}88`, letterSpacing: "0.12em" }}
                      >
                        TELÉFONO
                      </label>
                      <Input
                        id="phone" required placeholder="300 123 4567"
                        className="rounded-none border-0 border-b font-serif bg-transparent"
                        style={{ borderBottom: `1px solid ${NAVY}30`, boxShadow: "none" }}
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="font-serif text-xs tracking-widest"
                      style={{ color: `${NAVY}88`, letterSpacing: "0.12em" }}
                    >
                      CORREO ELECTRÓNICO
                    </label>
                    <Input
                      id="email" type="email" required placeholder="juan@ejemplo.com"
                      className="rounded-none border-0 border-b font-serif bg-transparent"
                      style={{ borderBottom: `1px solid ${NAVY}30`, boxShadow: "none" }}
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="area"
                      className="font-serif text-xs tracking-widest"
                      style={{ color: `${NAVY}88`, letterSpacing: "0.12em" }}
                    >
                      ÁREA DE CONSULTA
                    </label>
                    <select
                      id="area" required
                      data-testid="select-area"
                      className="w-full py-2 font-serif text-sm bg-transparent border-0 border-b focus:outline-none"
                      style={{ borderBottom: `1px solid ${NAVY}30`, color: `${NAVY}CC` }}
                    >
                      <option value="">Seleccione un área</option>
                      <option value="familia">Derecho de Familia</option>
                      <option value="laboral">Derecho Laboral</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="font-serif text-xs tracking-widest"
                      style={{ color: `${NAVY}88`, letterSpacing: "0.12em" }}
                    >
                      SU CONSULTA
                    </label>
                    <Textarea
                      id="message" required
                      placeholder="Describa brevemente su situación..."
                      className="rounded-none border-0 border-b font-serif resize-none min-h-[90px] bg-transparent"
                      style={{ borderBottom: `1px solid ${NAVY}30`, boxShadow: "none" }}
                      data-testid="textarea-message"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      data-testid="button-submit"
                      className="w-full py-3.5 font-serif tracking-widest transition-all"
                      style={{
                        background: NAVY,
                        color: GOLD2,
                        fontSize: "0.75rem",
                        letterSpacing: "0.22em",
                        border: "none"
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = NAVY2)}
                      onMouseLeave={e => (e.currentTarget.style.background = NAVY)}
                    >
                      ENVIAR MENSAJE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER — inspired by reference: dark bg, social icons, tagline ── */}
      <footer style={{ background: DARKBG }}>
        {/* Gold wave divider */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z"
              fill={NAVY}
            />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <Scale className="w-7 h-7" strokeWidth={1.3} style={{ color: GOLD }} />
            <span
              className="font-serif tracking-widest"
              style={{ color: LIGHT, letterSpacing: "0.22em", fontSize: "1.1rem" }}
            >
              SGC ABOGADOS
            </span>
          </div>

          {/* Gold rule */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-20" style={{ background: `${GOLD}44` }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: `${GOLD}66` }} />
            <div className="h-px w-20" style={{ background: `${GOLD}44` }} />
          </div>

          {/* Tagline */}
          <p
            className="font-serif italic mb-10"
            style={{ color: `${LIGHT}88`, fontSize: "0.95rem" }}
          >
            Experiencia, compromiso y resultados a su servicio.
          </p>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-5 mb-10">
            {[
              {
                label: "Facebook",
                icon: <Facebook className="w-5 h-5" />,
                href: "#"
              },
              {
                label: "Instagram",
                icon: <Instagram className="w-5 h-5" />,
                href: "#"
              },
              {
                label: "WhatsApp",
                icon: <MessageCircle className="w-5 h-5" />,
                href: "https://wa.me/573001234567"
              }
            ].map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-testid={`link-social-${label.toLowerCase()}`}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                style={{ background: `${LIGHT}15`, color: `${LIGHT}BB` }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = `${GOLD}33`;
                  (e.currentTarget as HTMLElement).style.color = GOLD2;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = `${LIGHT}15`;
                  (e.currentTarget as HTMLElement).style.color = `${LIGHT}BB`;
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Bottom links */}
          <div
            className="flex items-center justify-center gap-2 flex-wrap"
            style={{ color: `${LIGHT}40`, fontSize: "0.75rem" }}
          >
            <a
              href="#"
              className="font-serif transition-colors"
              style={{ letterSpacing: "0.06em" }}
              onMouseEnter={e => (e.currentTarget.style.color = `${LIGHT}80`)}
              onMouseLeave={e => (e.currentTarget.style.color = `${LIGHT}40`)}
            >
              Política de Privacidad
            </a>
            <span style={{ color: `${LIGHT}25` }}>·</span>
            <a
              href="#"
              className="font-serif transition-colors"
              style={{ letterSpacing: "0.06em" }}
              onMouseEnter={e => (e.currentTarget.style.color = `${LIGHT}80`)}
              onMouseLeave={e => (e.currentTarget.style.color = `${LIGHT}40`)}
            >
              Términos de Servicio
            </a>
            <span style={{ color: `${LIGHT}25` }}>·</span>
            <span className="font-serif" style={{ letterSpacing: "0.04em" }}>
              &copy; {new Date().getFullYear()} SGC Abogados
            </span>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/573001234567"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="link-whatsapp"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 z-50 group"
        style={{ background: "#25D366" }}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span
          className="absolute right-full mr-4 text-sm py-1.5 px-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-serif"
          style={{ background: DARK, color: LIGHT, letterSpacing: "0.04em" }}
        >
          Chatea con nosotros
        </span>
      </a>
    </div>
  );
}

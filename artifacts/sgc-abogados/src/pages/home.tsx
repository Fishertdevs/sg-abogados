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
  MapPin
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import heroImg from "@assets/1779803380485_1779803501882.png";

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
    { name: "Inicio", href: "#inicio" },
    { name: "Áreas", href: "#areas" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/20">

      {/* ── NAVBAR ── */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{ background: "hsl(36 28% 87% / 0.97)", backdropFilter: "blur(6px)", borderBottom: "1px solid hsl(34 22% 68% / 0.35)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5" style={{ color: "hsl(22 55% 28%)" }}>
            <Scale className="h-6 w-6" strokeWidth={1.5} />
            <span className="font-serif text-xl tracking-widest" style={{ letterSpacing: "0.18em" }}>SGC ABOGADOS</span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-serif text-sm tracking-widest transition-colors"
                style={{ color: "hsl(22 52% 13% / 0.7)", letterSpacing: "0.15em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "hsl(22 55% 28%)")}
                onMouseLeave={e => (e.currentTarget.style.color = "hsl(22 52% 13% / 0.7)")}
              >
                {link.name.toUpperCase()}
              </a>
            ))}
            <a
              href="#contacto"
              data-testid="button-nav-cta"
              className="font-serif text-sm tracking-widest px-7 py-2.5 transition-all"
              style={{
                background: "hsl(22 55% 28%)",
                color: "hsl(36 28% 92%)",
                letterSpacing: "0.15em"
              }}
            >
              CONSULTA GRATUITA
            </a>
          </nav>

          <button
            className="md:hidden p-2"
            style={{ color: "hsl(22 52% 13%)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden absolute top-20 left-0 w-full shadow-lg p-6 flex flex-col gap-5"
            style={{ background: "hsl(36 28% 87%)", borderBottom: "1px solid hsl(34 22% 68% / 0.35)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-serif text-base tracking-widest"
                style={{ color: "hsl(22 52% 13%)", letterSpacing: "0.15em" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name.toUpperCase()}
              </a>
            ))}
            <a
              href="#contacto"
              className="font-serif text-sm tracking-widest py-3 text-center mt-2"
              style={{ background: "hsl(22 55% 28%)", color: "hsl(36 28% 92%)", letterSpacing: "0.15em" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              CONSULTA GRATUITA
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* ── HERO — recreated exactly from reference image ── */}
        <section
          id="inicio"
          className="relative overflow-hidden"
          style={{
            minHeight: "calc(100vh - 80px)",
            background: "linear-gradient(108deg, hsl(36 30% 85%) 0%, hsl(35 26% 80%) 55%, hsl(33 24% 76%) 100%)"
          }}
        >
          {/* Subtle linen texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='none'/%3E%3Ccircle cx='1' cy='1' r='0.4' fill='hsl(22,30%25,20%25)' opacity='0.04'/%3E%3Ccircle cx='3' cy='3' r='0.4' fill='hsl(22,30%25,20%25)' opacity='0.04'/%3E%3C/svg%3E")`,
              backgroundSize: "4px 4px"
            }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full" style={{ minHeight: "calc(100vh - 80px)" }}>

            {/* LEFT — content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1 }}
              className="flex flex-col justify-center items-center text-center px-10 lg:px-20 py-16"
            >
              {/* SGC Logo block */}
              <div className="mb-10 w-full max-w-sm">
                {/* Scale icon with decorative leaves */}
                <div className="flex items-center justify-center mb-3">
                  <Scale
                    className="w-12 h-12"
                    strokeWidth={1}
                    style={{ color: "hsl(22 55% 28%)" }}
                  />
                </div>

                {/* S G C */}
                <div className="relative flex items-center justify-center gap-1 mb-0.5">
                  {/* Left laurel */}
                  <svg width="38" height="52" viewBox="0 0 38 52" fill="none" className="opacity-60">
                    <path d="M34 26 C28 18, 18 12, 10 8 M34 26 C28 34, 18 40, 10 44 M34 26 C24 24, 16 20, 8 14 M34 26 C24 28, 16 32, 8 38" stroke="hsl(22,55%,28%)" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M30 26 C22 20, 14 15, 6 10 M30 26 C22 32, 14 37, 6 42" stroke="hsl(22,55%,28%)" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
                  </svg>

                  <h1
                    className="font-serif font-semibold leading-none px-2"
                    style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)", color: "hsl(22 55% 28%)", letterSpacing: "0.08em" }}
                  >
                    SGC
                  </h1>

                  {/* Right laurel (mirrored) */}
                  <svg width="38" height="52" viewBox="0 0 38 52" fill="none" className="opacity-60" style={{ transform: "scaleX(-1)" }}>
                    <path d="M34 26 C28 18, 18 12, 10 8 M34 26 C28 34, 18 40, 10 44 M34 26 C24 24, 16 20, 8 14 M34 26 C24 28, 16 32, 8 38" stroke="hsl(22,55%,28%)" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M30 26 C22 20, 14 15, 6 10 M30 26 C22 32, 14 37, 6 42" stroke="hsl(22,55%,28%)" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                </div>

                {/* Divider with diamond */}
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px flex-1" style={{ background: "hsl(22 55% 28% / 0.3)" }} />
                  <div
                    className="w-1.5 h-1.5 rotate-45"
                    style={{ background: "hsl(22 55% 28% / 0.6)" }}
                  />
                  <div className="h-px flex-1" style={{ background: "hsl(22 55% 28% / 0.3)" }} />
                </div>

                <p
                  className="font-serif tracking-widest mb-4"
                  style={{ fontSize: "0.8rem", color: "hsl(22 55% 28%)", letterSpacing: "0.5em" }}
                >
                  ABOGADOS
                </p>

                <div className="w-full h-px mb-4" style={{ background: "hsl(22 52% 13% / 0.12)" }} />

                <p
                  className="font-serif tracking-widest"
                  style={{ fontSize: "0.65rem", color: "hsl(22 52% 13% / 0.55)", letterSpacing: "0.3em" }}
                >
                  EXPERIENCIA &nbsp;|&nbsp; COMPROMISO &nbsp;|&nbsp; RESULTADOS
                </p>
              </div>

              {/* Body copy — exact from reference */}
              <div className="max-w-xs mb-8">
                <p
                  className="font-serif leading-relaxed"
                  style={{ fontSize: "1.05rem", color: "hsl(22 52% 13% / 0.85)" }}
                >
                  Abogados con experiencia en derecho de familia y laboral, enfocados en ofrecer{" "}
                  <strong style={{ color: "hsl(22 52% 13%)" }}>
                    acompañamiento jurídico responsable, cercano y eficaz.
                  </strong>
                </p>
              </div>

              {/* CTA label */}
              <p
                className="font-serif tracking-widest mb-6"
                style={{ fontSize: "0.65rem", color: "hsl(22 52% 13% / 0.5)", letterSpacing: "0.25em" }}
              >
                CONSULTAS Y ACOMPAÑAMIENTO JURÍDICO:
              </p>

              {/* CTA buttons — text only, no border */}
              <div className="flex items-center gap-6">
                <a
                  href="#contacto"
                  data-testid="link-hero-contacto"
                  className="font-serif transition-all"
                  style={{
                    fontSize: "0.9rem",
                    color: "hsl(22 55% 28%)",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                    borderBottom: "1px solid hsl(22 55% 28% / 0.4)"
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderBottomColor = "hsl(22 55% 28%)")}
                  onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "hsl(22 55% 28% / 0.4)")}
                >
                  Agendar consulta
                </a>
                <span style={{ color: "hsl(22 52% 13% / 0.25)" }}>|</span>
                <a
                  href="#areas"
                  data-testid="link-hero-areas"
                  className="font-serif transition-all"
                  style={{
                    fontSize: "0.9rem",
                    color: "hsl(22 52% 13% / 0.6)",
                    letterSpacing: "0.08em",
                    textDecoration: "none"
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "hsl(22 55% 28%)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "hsl(22 52% 13% / 0.6)")}
                >
                  Nuestras áreas
                </a>
              </div>

              {/* Decorative diamond bottom */}
              <div className="mt-12 opacity-30">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="4" y="4" width="8" height="8" rx="0" transform="rotate(45 8 8)" fill="hsl(22,55%,28%)" />
                </svg>
              </div>
            </motion.div>

            {/* RIGHT — Lady Justice statue */}
            <div className="relative hidden md:block">
              {/* Gradient fade on left edge to blend with left column */}
              <div
                className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
                style={{ width: "52%", background: "linear-gradient(to right, hsl(34 27% 79%) 0%, hsl(34 27% 79% / 0.85) 55%, transparent 100%)" }}
              />
              <img
                src={heroImg}
                alt="Diosa de la Justicia — SGC Abogados"
                data-testid="img-lady-justice-hero"
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: "cover",
                  objectPosition: "right center",
                  filter: "brightness(1.02) contrast(1.02)"
                }}
              />
            </div>
          </div>
        </section>

        {/* ── ÁREAS DE PRÁCTICA ── */}
        <section
          id="areas"
          className="py-28"
          style={{ background: "hsl(35 25% 83%)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p
                className="font-serif tracking-widest mb-4"
                style={{ fontSize: "0.65rem", color: "hsl(22 55% 28%)", letterSpacing: "0.35em" }}
              >
                ESPECIALIDADES
              </p>
              <h2
                className="font-serif font-medium mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "hsl(22 52% 13%)" }}
              >
                Áreas de Práctica
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16" style={{ background: "hsl(22 55% 28% / 0.35)" }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: "hsl(22 55% 28% / 0.5)" }} />
                <div className="h-px w-16" style={{ background: "hsl(22 55% 28% / 0.35)" }} />
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
                  style={{ background: "hsl(36 28% 87%)", borderTop: "2px solid hsl(22 55% 28% / 0.3)" }}
                >
                  <area.icon
                    className="w-9 h-9 mb-6"
                    strokeWidth={1.2}
                    style={{ color: "hsl(22 55% 28%)" }}
                  />
                  <h3
                    className="font-serif font-medium mb-3"
                    style={{ fontSize: "1.6rem", color: "hsl(22 52% 13%)" }}
                  >
                    {area.title}
                  </h3>
                  <p
                    className="font-serif leading-relaxed mb-7"
                    style={{ color: "hsl(22 52% 13% / 0.65)", fontSize: "1rem" }}
                  >
                    {area.desc}
                  </p>
                  <ul className="space-y-3">
                    {area.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle
                          className="w-4 h-4 shrink-0 mt-1"
                          strokeWidth={1.5}
                          style={{ color: "hsl(22 55% 28%)" }}
                        />
                        <span
                          className="font-serif"
                          style={{ color: "hsl(22 52% 13% / 0.8)", fontSize: "0.95rem" }}
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
        <section
          className="py-28"
          style={{ background: "hsl(22 52% 13%)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p
                className="font-serif tracking-widest mb-4"
                style={{ fontSize: "0.65rem", color: "hsl(36 28% 80%)", letterSpacing: "0.35em", opacity: 0.6 }}
              >
                NUESTRA PROPUESTA
              </p>
              <h2
                className="font-serif font-medium mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "hsl(36 28% 87%)" }}
              >
                Por qué elegirnos
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16" style={{ background: "hsl(22 55% 50% / 0.4)" }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: "hsl(22 55% 50% / 0.5)" }} />
                <div className="h-px w-16" style={{ background: "hsl(22 55% 50% / 0.4)" }} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: Award, title: "Experiencia", desc: "Años de práctica enfocada que nos permiten anticipar escenarios y construir estrategias sólidas." },
                { icon: ShieldCheck, title: "Compromiso", desc: "Asumimos cada caso como propio, con la dedicación y el rigor ético que la ley exige." },
                { icon: HeartHandshake, title: "Acompañamiento", desc: "Trato personalizado y humano. Usted siempre sabrá el estado real de su proceso." },
                { icon: Clock, title: "Resultados", desc: "Nos enfocamos en la eficacia, buscando la resolución más favorable en el menor tiempo posible." }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="text-center"
                >
                  <feature.icon
                    className="w-8 h-8 mx-auto mb-5"
                    strokeWidth={1.2}
                    style={{ color: "hsl(22 55% 55%)" }}
                  />
                  <h3
                    className="font-serif font-medium mb-3"
                    style={{ fontSize: "1.25rem", color: "hsl(36 28% 87%)" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="font-serif leading-relaxed"
                    style={{ color: "hsl(36 28% 75% / 0.65)", fontSize: "0.9rem" }}
                  >
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOBRE NOSOTROS ── */}
        <section
          id="nosotros"
          className="py-28"
          style={{ background: "hsl(36 28% 87%)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Decorative frame */}
                <div
                  className="aspect-[4/5] relative overflow-hidden"
                  style={{ borderTop: "2px solid hsl(22 55% 28% / 0.25)", borderLeft: "2px solid hsl(22 55% 28% / 0.25)" }}
                >
                  <img
                    src={heroImg}
                    alt="SGC Abogados — Diosa de la Justicia"
                    data-testid="img-lady-justice-nosotros"
                    className="w-full h-full"
                    style={{
                      objectFit: "cover",
                      objectPosition: "80% 20%",
                      filter: "brightness(0.97) sepia(0.08)"
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, hsl(35 25% 83% / 0.15), transparent 60%)" }}
                  />
                </div>
                {/* Offset decorative border */}
                <div
                  className="absolute -bottom-4 -right-4 w-full h-full pointer-events-none"
                  style={{ border: "2px solid hsl(22 55% 28% / 0.12)", zIndex: -1 }}
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
                  style={{ fontSize: "0.65rem", color: "hsl(22 55% 28%)", letterSpacing: "0.35em" }}
                >
                  QUIÉNES SOMOS
                </p>
                <h2
                  className="font-serif font-medium mb-4"
                  style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", color: "hsl(22 52% 13%)" }}
                >
                  Sobre Nosotros
                </h2>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-16" style={{ background: "hsl(22 55% 28% / 0.35)" }} />
                  <div className="w-1.5 h-1.5 rotate-45" style={{ background: "hsl(22 55% 28% / 0.5)" }} />
                </div>

                <p
                  className="font-serif italic mb-6"
                  style={{ fontSize: "1.15rem", color: "hsl(22 55% 28%)", lineHeight: "1.75" }}
                >
                  "Un equipo de abogados dedicados a proteger sus derechos con responsabilidad y cercanía."
                </p>

                <div className="space-y-5" style={{ color: "hsl(22 52% 13% / 0.72)", fontSize: "1rem", lineHeight: "1.8" }}>
                  <p className="font-serif">
                    SGC Abogados nace de la convicción de que el ejercicio del derecho debe ser, ante todo, humano. Entendemos que detrás de cada expediente hay historias de vida, patrimonio y tranquilidad en juego.
                  </p>
                  <p className="font-serif">
                    Nos alejamos de la frialdad corporativa para ofrecer un acompañamiento donde usted es escuchado y comprendido. Actuamos con total transparencia, hablándole con la verdad sobre las posibilidades reales de su caso.
                  </p>
                  <p className="font-serif">
                    Su tranquilidad es nuestra prioridad. Confíe su caso a profesionales que combinan el rigor académico con la empatía humana.
                  </p>
                </div>

                <div className="mt-10">
                  <a
                    href="#contacto"
                    data-testid="link-nosotros-contacto"
                    className="font-serif transition-all"
                    style={{
                      fontSize: "0.85rem",
                      color: "hsl(22 55% 28%)",
                      letterSpacing: "0.12em",
                      borderBottom: "1px solid hsl(22 55% 28% / 0.4)",
                      paddingBottom: "2px"
                    }}
                  >
                    Agendar una consulta
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CONTACTO ── */}
        <section
          id="contacto"
          className="py-28"
          style={{ background: "hsl(35 25% 83%)" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p
                className="font-serif tracking-widest mb-4"
                style={{ fontSize: "0.65rem", color: "hsl(22 55% 28%)", letterSpacing: "0.35em" }}
              >
                CONTÁCTENOS
              </p>
              <h2
                className="font-serif font-medium mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "hsl(22 52% 13%)" }}
              >
                Contacto
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16" style={{ background: "hsl(22 55% 28% / 0.35)" }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: "hsl(22 55% 28% / 0.5)" }} />
                <div className="h-px w-16" style={{ background: "hsl(22 55% 28% / 0.35)" }} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-14">
              {/* Contact info */}
              <div className="md:col-span-2">
                <h3
                  className="font-serif font-medium mb-8"
                  style={{ fontSize: "1.3rem", color: "hsl(22 52% 13%)" }}
                >
                  Información de contacto
                </h3>
                <div className="space-y-7">
                  {[
                    { icon: Phone, label: "Teléfono", value: "+57 (300) 123-4567" },
                    { icon: Mail, label: "Correo electrónico", value: "contacto@sgcabogados.co" },
                    { icon: MapPin, label: "Oficina principal", value: "Bogotá, Colombia", note: "Atención con cita previa" }
                  ].map(({ icon: Icon, label, value, note }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <Icon
                        className="w-5 h-5 shrink-0 mt-0.5"
                        strokeWidth={1.4}
                        style={{ color: "hsl(22 55% 28%)" }}
                      />
                      <div>
                        <p className="font-serif text-sm font-medium" style={{ color: "hsl(22 52% 13%)" }}>{label}</p>
                        <p className="font-serif" style={{ color: "hsl(22 52% 13% / 0.65)", fontSize: "0.95rem" }}>{value}</p>
                        {note && <p className="font-serif text-xs mt-0.5" style={{ color: "hsl(22 52% 13% / 0.4)" }}>{note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div
                className="md:col-span-3 p-10"
                style={{ background: "hsl(36 28% 87%)" }}
              >
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-serif text-sm" style={{ color: "hsl(22 52% 13% / 0.7)", letterSpacing: "0.05em" }}>Nombre completo</label>
                      <Input
                        id="name"
                        required
                        placeholder="Juan Pérez"
                        className="rounded-none border-0 border-b font-serif"
                        style={{ background: "transparent", borderBottom: "1px solid hsl(22 52% 13% / 0.25)", boxShadow: "none" }}
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="font-serif text-sm" style={{ color: "hsl(22 52% 13% / 0.7)", letterSpacing: "0.05em" }}>Teléfono</label>
                      <Input
                        id="phone"
                        required
                        placeholder="300 123 4567"
                        className="rounded-none border-0 border-b font-serif"
                        style={{ background: "transparent", borderBottom: "1px solid hsl(22 52% 13% / 0.25)", boxShadow: "none" }}
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="font-serif text-sm" style={{ color: "hsl(22 52% 13% / 0.7)", letterSpacing: "0.05em" }}>Correo electrónico</label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="juan@ejemplo.com"
                      className="rounded-none border-0 border-b font-serif"
                      style={{ background: "transparent", borderBottom: "1px solid hsl(22 52% 13% / 0.25)", boxShadow: "none" }}
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="area" className="font-serif text-sm" style={{ color: "hsl(22 52% 13% / 0.7)", letterSpacing: "0.05em" }}>Área de consulta</label>
                    <select
                      id="area"
                      required
                      data-testid="select-area"
                      className="w-full py-2 font-serif text-sm bg-transparent border-0 border-b focus:outline-none"
                      style={{ borderBottom: "1px solid hsl(22 52% 13% / 0.25)", color: "hsl(22 52% 13% / 0.8)" }}
                    >
                      <option value="">Seleccione un área</option>
                      <option value="familia">Derecho de Familia</option>
                      <option value="laboral">Derecho Laboral</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="font-serif text-sm" style={{ color: "hsl(22 52% 13% / 0.7)", letterSpacing: "0.05em" }}>Su consulta</label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Describa brevemente su situación..."
                      className="rounded-none border-0 border-b font-serif resize-none min-h-[100px]"
                      style={{ background: "transparent", borderBottom: "1px solid hsl(22 52% 13% / 0.25)", boxShadow: "none" }}
                      data-testid="textarea-message"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      data-testid="button-submit"
                      className="w-full py-3.5 font-serif tracking-widest transition-all"
                      style={{
                        background: "hsl(22 55% 28%)",
                        color: "hsl(36 28% 92%)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.2em",
                        border: "none"
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "hsl(22 55% 23%)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "hsl(22 55% 28%)")}
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

      {/* ── FOOTER ── */}
      <footer
        className="py-12"
        style={{ background: "hsl(22 52% 10%)", borderTop: "1px solid hsl(22 52% 18%)" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5" style={{ color: "hsl(22 55% 55%)" }}>
            <Scale className="h-5 w-5" strokeWidth={1.4} />
            <span className="font-serif tracking-widest" style={{ color: "hsl(36 28% 80%)", letterSpacing: "0.18em", fontSize: "0.9rem" }}>
              SGC ABOGADOS
            </span>
          </div>

          <p className="font-serif text-sm text-center" style={{ color: "hsl(36 28% 60% / 0.5)" }}>
            &copy; {new Date().getFullYear()} SGC Abogados. Todos los derechos reservados.
          </p>

          <div className="flex gap-6">
            {["Aviso de Privacidad", "Términos de Servicio"].map((label) => (
              <a
                key={label}
                href="#"
                className="font-serif text-sm transition-colors"
                style={{ color: "hsl(36 28% 60% / 0.45)", letterSpacing: "0.04em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "hsl(22 55% 55%)")}
                onMouseLeave={e => (e.currentTarget.style.color = "hsl(36 28% 60% / 0.45)")}
              >
                {label}
              </a>
            ))}
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
          style={{ background: "hsl(22 52% 13%)", color: "hsl(36 28% 87%)", letterSpacing: "0.04em" }}
        >
          Chatea con nosotros
        </span>
      </a>
    </div>
  );
}

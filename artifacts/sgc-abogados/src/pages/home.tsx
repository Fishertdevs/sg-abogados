import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
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
import { Button } from "@/components/ui/button";
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
    { name: "Áreas de Práctica", href: "#areas" },
    { name: "Por qué elegirnos", href: "#por-que-elegirnos" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/30">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Scale className="h-8 w-8" />
            <span className="font-serif text-2xl font-bold tracking-wide">SGC Abogados</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button asChild className="font-serif text-lg tracking-wide rounded-none px-6">
              <a href="#contacto">Consulta Gratuita</a>
            </Button>
          </nav>

          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border/40 shadow-lg p-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-base font-medium text-foreground py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button asChild className="w-full font-serif text-lg mt-2">
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Consulta Gratuita</a>
            </Button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden">
          {/* Background image full bleed with overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImg} 
              alt="SGC Abogados Hero" 
              className="w-full h-full object-cover object-center opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-12 bg-primary"></div>
                <span className="text-primary font-semibold tracking-widest text-sm uppercase">
                  EXPERIENCIA | COMPROMISO | RESULTADOS
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold font-serif text-foreground leading-tight mb-6"
              >
                Acompañamiento jurídico <span className="text-primary italic">responsable</span> y <span className="text-primary italic">cercano</span>.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed font-light"
              >
                Especialistas en Derecho de Familia y Laboral. Un equipo humano dedicado a proteger sus derechos con profesionalismo, empatía y la confianza que usted merece.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" asChild className="font-serif text-xl h-14 px-8 rounded-none shadow-xl shadow-primary/20">
                  <a href="#contacto">Agenda tu consulta</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="font-serif text-xl h-14 px-8 rounded-none border-primary text-primary hover:bg-primary/5">
                  <a href="#areas">Nuestras áreas</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Áreas de Práctica */}
        <section id="areas" className="py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Áreas de Práctica</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-foreground/70">
                Nos especializamos en brindar soluciones efectivas en los momentos más importantes de su vida personal y profesional.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-background border border-border/50 p-10 shadow-lg hover:border-primary/30 transition-colors group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4 text-foreground">Derecho de Familia</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Acompañamiento sensible y firme en los procesos que involucran a sus seres queridos, protegiendo siempre el bienestar familiar.
                </p>
                <ul className="space-y-3">
                  {[
                    "Divorcios y cesación de efectos civiles",
                    "Custodia y cuidado personal",
                    "Fijación de cuotas alimentarias",
                    "Sucesiones y testamentos",
                    "Declaración de unión marital de hecho"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-background border border-border/50 p-10 shadow-lg hover:border-primary/30 transition-colors group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4 text-foreground">Derecho Laboral</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Defensa férrea de los derechos de los trabajadores y asesoría precisa para empleadores, buscando siempre la justicia en el ámbito laboral.
                </p>
                <ul className="space-y-3">
                  {[
                    "Despidos injustificados",
                    "Liquidaciones y prestaciones sociales",
                    "Acoso laboral (Ley 1010)",
                    "Procesos disciplinarios",
                    "Pensiones y seguridad social"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section id="por-que-elegirnos" className="py-24 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Por qué elegirnos</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-background/70">
                No somos un despacho corporativo frío. Somos sus aliados de confianza en los momentos decisivos.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: "Experiencia",
                  desc: "Años de práctica enfocada que nos permiten anticipar escenarios y construir estrategias sólidas."
                },
                {
                  icon: ShieldCheck,
                  title: "Compromiso",
                  desc: "Asumimos cada caso como propio, con la dedicación y el rigor ético que la ley exige."
                },
                {
                  icon: HeartHandshake,
                  title: "Acompañamiento",
                  desc: "Trato personalizado y humano. Usted siempre sabrá el estado real de su proceso."
                },
                {
                  icon: Clock,
                  title: "Resultados",
                  desc: "Nos enfocamos en la eficacia, buscando la resolución más favorable en el menor tiempo posible."
                }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">{feature.title}</h3>
                  <p className="text-background/70 font-light text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre Nosotros */}
        <section id="nosotros" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-card relative overflow-hidden flex items-center justify-center p-8 border-8 border-background shadow-2xl">
                  {/* Decorative placeholder if image isn't loaded */}
                  <div className="absolute inset-0 bg-primary/5"></div>
                  <Scale className="w-32 h-32 text-primary/20 absolute -right-8 -bottom-8" />
                  <div className="relative z-10 text-center">
                    <h3 className="font-serif text-4xl text-primary font-bold mb-2">SGC</h3>
                    <div className="h-px w-16 bg-primary/50 mx-auto mb-2"></div>
                    <p className="tracking-widest text-sm text-foreground/60 uppercase">Abogados</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Sobre Nosotros</h2>
                <h3 className="text-xl text-primary italic font-serif mb-6">"Un equipo de abogados dedicados a proteger sus derechos con responsabilidad y cercanía."</h3>
                <div className="space-y-4 text-foreground/80 font-light leading-relaxed text-lg">
                  <p>
                    SGC Abogados nace de la convicción de que el ejercicio del derecho debe ser, ante todo, humano. Entendemos que detrás de cada expediente hay historias de vida, patrimonio y tranquilidad en juego.
                  </p>
                  <p>
                    Nos alejamos de la frialdad corporativa para ofrecer un acompañamiento donde usted es escuchado y comprendido. Actuamos con total transparencia, hablándole con la verdad sobre las posibilidades reales de su caso y diseñando estrategias legales a la medida de sus necesidades.
                  </p>
                  <p>
                    Su tranquilidad es nuestra prioridad. Confíe su caso a profesionales que combinan el rigor académico con la empatía humana.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-24 bg-card">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Contacto</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-foreground/70">
                Dé el primer paso hacia la solución de su situación legal. Agende su consulta.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-12">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">Información de contacto</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Teléfono</p>
                        <p className="text-foreground/70">+57 (300) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Correo electrónico</p>
                        <p className="text-foreground/70">contacto@sgcabogados.co</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Oficina principal</p>
                        <p className="text-foreground/70">Bogotá, Colombia</p>
                        <p className="text-sm text-foreground/50 mt-1">Atención con cita previa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 bg-background p-8 border border-border/50 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">Nombre completo</label>
                      <Input id="name" required placeholder="Ej. Juan Pérez" className="bg-card" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">Teléfono</label>
                      <Input id="phone" required placeholder="Ej. 300 123 4567" className="bg-card" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Correo electrónico</label>
                    <Input id="email" type="email" required placeholder="juan@ejemplo.com" className="bg-card" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="area" className="text-sm font-medium text-foreground">Área de consulta</label>
                    <select 
                      id="area" 
                      className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Seleccione un área</option>
                      <option value="familia">Derecho de Familia</option>
                      <option value="laboral">Derecho Laboral</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">Mensaje o caso breve</label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="Describa brevemente su situación..." 
                      className="min-h-[120px] bg-card"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full font-serif text-lg h-12 rounded-none">
                    Enviar mensaje
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background/80 py-12 border-t border-background/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-primary">
            <Scale className="h-6 w-6" />
            <span className="font-serif text-xl font-bold tracking-wide text-background">SGC Abogados</span>
          </div>
          
          <div className="text-sm text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} SGC Abogados. Todos los derechos reservados.</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Aviso de Privacidad</a>
            <span className="text-background/30">|</span>
            <a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/573001234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20bd5a] hover:scale-110 transition-all z-50 group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-background text-foreground text-sm py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">
          Chatea con nosotros
        </span>
      </a>
    </div>
  );
}

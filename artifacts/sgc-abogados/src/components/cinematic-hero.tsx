import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { Scale, ChevronDown } from "lucide-react";
import justiceStatueImg from "@assets/image_1779927370844.png";

const GOLD   = "#C49A18";
const GOLD_L = "#D4B03A";
const BG     = "#06060E";

/* ─── Particle system ────────────────────────────────── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number; maxAlpha: number;
  life: number; maxLife: number;
}

function initParticles(w: number, h: number): Particle[] {
  return Array.from({ length: 90 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -(Math.random() * 0.55 + 0.15),
    size: Math.random() * 1.6 + 0.4,
    alpha: 0,
    maxAlpha: Math.random() * 0.55 + 0.1,
    life: Math.floor(Math.random() * 240),
    maxLife: Math.floor(Math.random() * 180 + 120),
  }));
}

/* ─── Component ──────────────────────────────────────── */
export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);

  /* ── Mouse spring ──────────────────────────────────── */
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const sx   = useSpring(rawX, { stiffness: 35, damping: 22 });
  const sy   = useSpring(rawY, { stiffness: 35, damping: 22 });

  const statueX  = useTransform(sx, [0, 1], [-22, 22]);
  const statueY  = useTransform(sy, [0, 1], [-12, 12]);
  const glowX    = useTransform(sx, [0, 1], [18, -18]);
  const glowY    = useTransform(sy, [0, 1], [10, -10]);
  const textX    = useTransform(sx, [0, 1], [6, -6]);
  const textY    = useTransform(sy, [0, 1], [4, -4]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width);
    rawY.set((e.clientY - r.top) / r.height);
  }, [rawX, rawY]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* ── GSAP entrance timeline ────────────────────────── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    if (eyebrowRef.current) {
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, x: -28 },
        { opacity: 1, x: 0, duration: 0.9 },
        0.3
      );
    }

    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll<HTMLElement>(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 56, rotateX: -48 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.028, duration: 1.1 },
        0.6
      );
    }

    if (dividerRef.current) {
      tl.fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: "expo.out" },
        1.5
      );
    }

    if (subRef.current) {
      tl.fromTo(subRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.7
      );
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.95
      );
    }
  }, []);

  /* ── Canvas particles ───────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = initParticles(canvas.width, canvas.height);
    let raf: number;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        if (progress < 0.2)       p.alpha = p.maxAlpha * (progress / 0.2);
        else if (progress > 0.75) p.alpha = p.maxAlpha * ((1 - progress) / 0.25);
        else                      p.alpha = p.maxAlpha;

        if (p.life >= p.maxLife) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.vx = (Math.random() - 0.5) * 0.35;
          p.vy = -(Math.random() * 0.55 + 0.15);
          p.size = Math.random() * 1.6 + 0.4;
          p.maxAlpha = Math.random() * 0.55 + 0.1;
          p.life = 0;
          p.maxLife = Math.floor(Math.random() * 180 + 120);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,154,24,${p.alpha.toFixed(3)})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Headline text split ────────────────────────────── */
  const headline = "Nuestra prioridad es tu tranquilidad legal.";
  const words    = headline.split(" ");

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative overflow-hidden"
      style={{ height: "100vh", minHeight: "640px", background: BG }}
    >
      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2, opacity: 0.35,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Deep blue ambient — bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: "radial-gradient(ellipse 90% 55% at 50% 110%, rgba(15,33,80,0.45) 0%, transparent 65%)",
        }}
      />

      {/* Left edge vignette */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{ width: "12%", zIndex: 4, background: `linear-gradient(to right, ${BG} 0%, transparent 100%)` }}
      />
      {/* Right edge vignette */}
      <div
        className="absolute inset-y-0 right-0 pointer-events-none"
        style={{ width: "12%", zIndex: 4, background: `linear-gradient(to left, ${BG} 0%, transparent 100%)` }}
      />
      {/* Top vignette */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "18%", zIndex: 4, background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)` }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "22%", zIndex: 5, background: `linear-gradient(to top, ${BG} 0%, transparent 100%)` }}
      />

      {/* ─ Main layout ─────────────────────────────────── */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-8 md:px-16 flex items-center">

        {/* TEXT — left */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="flex-1 flex flex-col justify-center z-20 relative py-20"
        >
          {/* Eyebrow */}
          <div ref={eyebrowRef} style={{ opacity: 0 }} className="flex items-center gap-3 mb-9">
            <Scale size={13} strokeWidth={1.2} style={{ color: GOLD }} />
            <span style={{
              fontSize: "0.58rem", color: GOLD, letterSpacing: "0.44em",
              fontFamily: "'Cormorant Garamond', serif",
            }}>
              SGC ABOGADOS · BOGOTÁ, COLOMBIA
            </span>
          </div>

          {/* Headline — GSAP char split */}
          <h1
            ref={headlineRef}
            className="font-serif mb-8"
            style={{
              fontSize: "clamp(2rem, 4.2vw, 3.8rem)",
              color: "#F0EBE0",
              fontStyle: "italic",
              fontWeight: 500,
              lineHeight: 1.18,
              perspective: "600px",
              maxWidth: "520px",
            }}
          >
            {words.map((word, wi) => (
              <span key={wi} className="inline-block" style={{ marginRight: wi < words.length - 1 ? "0.28em" : 0 }}>
                {word.split("").map((ch, ci) => (
                  <span key={ci} className="char inline-block">{ch}</span>
                ))}
              </span>
            ))}
          </h1>

          {/* Gold divider */}
          <div
            ref={dividerRef}
            className="flex items-center gap-3 mb-7"
            style={{ opacity: 0, transformOrigin: "left" }}
          >
            <div style={{ width: "52px", height: "1px", background: GOLD }} />
            <div style={{ width: "5px", height: "5px", background: GOLD, transform: "rotate(45deg)" }} />
            <div style={{ width: "20px", height: "1px", background: `${GOLD}60` }} />
          </div>

          {/* Body copy */}
          <p
            ref={subRef}
            style={{
              opacity: 0, fontSize: "1rem",
              color: "rgba(240,232,218,0.6)", lineHeight: 1.92,
              maxWidth: "380px", marginBottom: "48px",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Derecho de familia, laboral y más — con la dedicación, rigor ético y presencia humana que su caso merece.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} style={{ opacity: 0 }} className="flex items-center gap-8">
            <a
              href="#contacto"
              className="font-serif relative group"
              style={{ fontSize: "0.8rem", color: "#F0EBE0", letterSpacing: "0.14em", paddingBottom: "4px" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD_L; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#F0EBE0"; }}
            >
              Agendar consulta
              <span
                className="absolute bottom-0 left-0 w-full"
                style={{ height: "1px", background: GOLD }}
              />
            </a>
            <a
              href="#areas"
              className="font-serif"
              style={{
                fontSize: "0.8rem", color: "rgba(240,232,218,0.45)", letterSpacing: "0.14em",
                paddingBottom: "4px", borderBottom: "1px solid rgba(240,232,218,0.2)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(240,232,218,0.8)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(240,232,218,0.45)"; }}
            >
              Nuestras áreas
            </a>
          </div>
        </motion.div>

        {/* STATUE — right */}
        <div className="hidden md:flex flex-1 items-center justify-center relative h-full pointer-events-none">

          {/* Outer gold ambient glow */}
          <motion.div
            style={{ x: glowX, y: glowY }}
            className="absolute"
          >
            <div style={{
              width: "700px", height: "700px", borderRadius: "50%",
              background: `radial-gradient(circle, ${GOLD}1A 0%, ${GOLD}08 35%, transparent 65%)`,
              filter: "blur(70px)",
              transform: "translate(-50%,-50%)",
              position: "absolute", top: "50%", left: "50%",
            }} />
          </motion.div>

          {/* Inner hot glow */}
          <motion.div
            style={{ x: glowX, y: glowY }}
          >
            <div style={{
              width: "320px", height: "320px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,200,80,0.12) 0%, rgba(196,154,24,0.06) 50%, transparent 75%)",
              filter: "blur(32px)",
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
            }} />
          </motion.div>

          {/* Cinematic light ray — diagonal */}
          <div style={{
            position: "absolute", top: "8%", right: "18%",
            width: "1px", height: "45%",
            background: `linear-gradient(to bottom, transparent 0%, ${GOLD}28 40%, ${GOLD}18 70%, transparent 100%)`,
            transform: "rotate(12deg)",
            filter: "blur(1.5px)",
          }} />
          <div style={{
            position: "absolute", top: "12%", right: "28%",
            width: "1px", height: "35%",
            background: `linear-gradient(to bottom, transparent 0%, ${GOLD}15 50%, transparent 100%)`,
            transform: "rotate(-8deg)",
            filter: "blur(2px)",
          }} />

          {/* Statue — parallax layer */}
          <motion.div
            style={{ x: statueX, y: statueY, position: "relative", zIndex: 10 }}
          >
            <img
              src={justiceStatueImg}
              alt="Estatua de la Justicia — SGC Abogados"
              style={{
                width: "clamp(340px, 36vw, 540px)",
                height: "auto",
                objectFit: "contain",
                filter: "brightness(1.08) contrast(1.05) drop-shadow(0 0 60px rgba(196,154,24,0.18))",
                display: "block",
              }}
            />
          </motion.div>

          {/* Glassmorphism info card — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.9 }}
            style={{
              position: "absolute", bottom: "14%", right: "4%",
              padding: "18px 24px",
              background: "rgba(255,255,255,0.035)",
              backdropFilter: "blur(12px)",
              border: `1px solid rgba(196,154,24,0.18)`,
              borderRadius: "2px",
            }}
          >
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: GOLD, letterSpacing: "0.3em", marginBottom: "6px" }}>
              FUNDADO EN BOGOTÁ
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#F0EBE0", fontWeight: 500, fontStyle: "italic" }}>
              7 Especialidades jurídicas
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
        style={{ color: `${GOLD}55` }}
      >
        <div style={{ width: "1px", height: "32px", background: `linear-gradient(to bottom, transparent, ${GOLD}60)` }} />
        <ChevronDown size={13} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}

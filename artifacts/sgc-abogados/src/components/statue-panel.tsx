import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import justiceStatueImg from "@assets/image_1779927370844.png";

const GOLD = "#d4af37";
const BG   = "#050b1a";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number; maxAlpha: number;
  life: number; maxLife: number;
}

function mkP(w: number, h: number): Particle {
  return {
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.30,
    vy: -(Math.random() * 0.52 + 0.12),
    size: Math.random() * 1.8 + 0.3,
    alpha: 0, maxAlpha: Math.random() * 0.55 + 0.08,
    life: Math.floor(Math.random() * 260),
    maxLife: Math.floor(Math.random() * 200 + 140),
  };
}

export default function StatuePanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const sx = useSpring(rawX, { stiffness: 28, damping: 18 });
  const sy = useSpring(rawY, { stiffness: 28, damping: 18 });

  const statueX = useTransform(sx, [0, 1], [-24, 24]);
  const statueY = useTransform(sy, [0, 1], [-14, 14]);
  const glowX   = useTransform(sx, [0, 1], [18, -18]);
  const glowY   = useTransform(sy, [0, 1], [10, -10]);

  const onMove = useCallback((e: MouseEvent) => {
    rawX.set(e.clientX / window.innerWidth);
    rawY.set(e.clientY / window.innerHeight);
  }, [rawX, rawY]);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

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

    const W = () => canvas.width  || 600;
    const H = () => canvas.height || 900;
    const ps: Particle[] = Array.from({ length: 100 }, () => mkP(W(), H()));

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.life++;
        const prog = p.life / p.maxLife;
        p.alpha = prog < 0.18 ? p.maxAlpha * prog / 0.18 :
                  prog > 0.72 ? p.maxAlpha * (1 - prog) / 0.28 :
                                 p.maxAlpha;
        if (p.life >= p.maxLife) {
          p.x = Math.random() * W(); p.y = H() + 12;
          p.vx = (Math.random() - 0.5) * 0.30;
          p.vy = -(Math.random() * 0.52 + 0.12);
          p.size = Math.random() * 1.8 + 0.3;
          p.maxAlpha = Math.random() * 0.55 + 0.08;
          p.life = 0; p.maxLife = Math.floor(Math.random() * 200 + 140);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div
      className="hidden md:block"
      style={{
        position: "fixed", right: 0, top: 0, bottom: 0,
        width: "clamp(300px, 44vw, 680px)",
        zIndex: 2, pointerEvents: "none", overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Film grain texture */}
      <div className="absolute inset-0" style={{
        opacity: 0.22,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
      }} />

      {/* Deep blue background gradient */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(160deg, rgba(10,17,40,0.15) 0%, rgba(3,7,20,0.08) 100%)",
        zIndex: 0,
      }} />

      {/* Left edge fade — seamless blend with page */}
      <div className="absolute inset-y-0 left-0" style={{
        width: "45%",
        background: `linear-gradient(to right, ${BG} 0%, ${BG}CC 40%, transparent 100%)`,
      }} />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0" style={{
        height: "16%",
        background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)`,
      }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: "20%",
        background: `linear-gradient(to top, ${BG} 0%, transparent 100%)`,
      }} />

      {/* Outer ambient gold glow */}
      <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 flex items-center justify-center">
        <div style={{
          width: "640px", height: "640px", borderRadius: "50%", flexShrink: 0,
          background: `radial-gradient(circle, rgba(212,175,55,0.13) 0%, rgba(212,175,55,0.05) 38%, transparent 65%)`,
          filter: "blur(72px)",
        }} />
      </motion.div>

      {/* Inner hot core glow */}
      <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 flex items-center justify-center">
        <div style={{
          width: "280px", height: "280px", borderRadius: "50%", flexShrink: 0,
          background: "radial-gradient(circle, rgba(255,215,90,0.20) 0%, rgba(212,175,55,0.08) 45%, transparent 70%)",
          filter: "blur(30px)",
        }} />
      </motion.div>

      {/* Blue ambient — heraldic undertone */}
      <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 flex items-center justify-center">
        <div style={{
          width: "500px", height: "500px", borderRadius: "50%", flexShrink: 0,
          background: "radial-gradient(circle, rgba(15,50,130,0.10) 0%, transparent 60%)",
          filter: "blur(50px)",
          transform: "translateY(120px)",
        }} />
      </motion.div>

      {/* Cinematic light ray — primary diagonal */}
      <div style={{
        position: "absolute", top: "6%", right: "20%",
        width: "1.5px", height: "50%",
        background: `linear-gradient(to bottom, transparent 0%, ${GOLD}30 35%, ${GOLD}20 70%, transparent 100%)`,
        transform: "rotate(13deg)",
        filter: "blur(1.2px)",
      }} />

      {/* Cinematic light ray — secondary */}
      <div style={{
        position: "absolute", top: "14%", right: "34%",
        width: "1px", height: "36%",
        background: `linear-gradient(to bottom, transparent 0%, ${GOLD}14 50%, transparent 100%)`,
        transform: "rotate(-9deg)",
        filter: "blur(2px)",
      }} />

      {/* Subtle rim light — right edge */}
      <div style={{
        position: "absolute", inset: 0, right: 0,
        width: "3px",
        background: `linear-gradient(to bottom, transparent 20%, ${GOLD}15 50%, transparent 80%)`,
        filter: "blur(4px)",
      }} />

      {/* The Goddess of Justice */}
      <motion.div
        style={{ x: statueX, y: statueY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src={justiceStatueImg}
          alt="Diosa de la Justicia, Themis — SG Abogados"
          style={{
            width: "clamp(270px, 32vw, 510px)",
            height: "auto",
            objectFit: "contain",
            filter: [
              "brightness(1.10)",
              "contrast(1.08)",
              "saturate(0.95)",
              `drop-shadow(0 0 70px rgba(212,175,55,0.28))`,
              `drop-shadow(0 0 28px rgba(212,175,55,0.18))`,
              `drop-shadow(0 20px 60px rgba(3,7,20,0.6))`,
            ].join(" "),
            flexShrink: 0,
          }}
        />
      </motion.div>
    </div>
  );
}

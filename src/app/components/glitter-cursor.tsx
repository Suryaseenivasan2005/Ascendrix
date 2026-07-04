import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: "star" | "diamond" | "circle";
}

const COLORS = [
  "#D4AF37", // gold
  "#FFD700", // bright gold
  "#FFF8DC", // cornsilk
  "#F5C842", // warm gold
  "#E8C96B", // light gold
  "#C8960C", // deep gold
  "#7A0019", // crimson (accent)
];

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  const spikes = 4;
  const outerR = size;
  const innerR = size * 0.4;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / spikes;
    if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
    else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.restore();
}

function drawDiamond(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.5, 0);
  ctx.lineTo(0, size);
  ctx.lineTo(-size * 0.5, 0);
  ctx.closePath();
  ctx.restore();
}

export function GlitterCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -200, y: -200 });
  const cursorRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      if (now - lastSpawnRef.current > 20) {
        lastSpawnRef.current = now;
        const count = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.8 + 0.4;
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.6,
            alpha: Math.random() * 0.6 + 0.6,
            size: Math.random() * 4 + 2,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            shape: (["star", "diamond", "circle"] as const)[Math.floor(Math.random() * 3)],
          });
        }
        // cap particles
        if (particlesRef.current.length > 180) {
          particlesRef.current = particlesRef.current.slice(-180);
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth cursor lag
      cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) * 0.15;
      cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) * 0.15;

      // Draw outer ring
      const { x, y } = cursorRef.current;
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212,175,55,0.55)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#D4AF37";
      ctx.fill();

      // Golden glow on inner dot
      const grad = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 12
      );
      grad.addColorStop(0, "rgba(212,175,55,0.25)");
      grad.addColorStop(1, "rgba(212,175,55,0)");
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Update & draw particles
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.01);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha *= 0.93;
        p.rotation += p.rotationSpeed;
        p.size *= 0.985;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;

        if (p.shape === "star") {
          drawStar(ctx, p.x, p.y, p.size, p.rotation);
          ctx.fill();
        } else if (p.shape === "diamond") {
          drawDiamond(ctx, p.x, p.y, p.size, p.rotation);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

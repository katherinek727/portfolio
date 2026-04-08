import { Suspense, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import ResumeSection from '../components/ResumeSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import ThreeBackground from '../components/ThreeBackground';
import AnimatedBackground from '../components/AnimatedBackground';
import SectionReveal from '../components/SectionReveal';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; });

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number; hue: number;
    };

    const particles: Particle[] = [];
    let hue = 0;

    const spawn = () => {
      const { x, y } = mouseRef.current;
      if (x < 0) return;
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2 + 0.3;
        const life = Math.random() * 40 + 30;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          life, maxLife: life,
          size: Math.random() * 3.5 + 1.5,
          hue: (hue + Math.random() * 60 - 30 + 360) % 360,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hue = (hue + 0.8) % 360;
      spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gentle gravity
        p.life--;

        if (p.life <= 0) { particles.splice(i, 1); continue; }

        const alpha = (p.life / p.maxLife) * 0.75;
        const size = p.size * (p.life / p.maxLife);

        // Draw a 4-pointed star sparkle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.life * 0.05);
        ctx.beginPath();
        for (let j = 0; j < 8; j++) {
          const r = j % 2 === 0 ? size * 2.2 : size * 0.8;
          const a = (j / 8) * Math.PI * 2;
          j === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
                  : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${alpha})`;
        ctx.shadowColor = `hsl(${p.hue}, 90%, 70%)`;
        ctx.shadowBlur = size * 4;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Rainbow wave cursor trail */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9998 }}
      />

      <Suspense fallback={null}><ThreeBackground /></Suspense>
      <AnimatedBackground />
      <Navigation />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <SectionReveal effect="fadeUp"><AboutSection /></SectionReveal>
        <SectionReveal effect="fadeRight"><SkillsSection /></SectionReveal>
        <SectionReveal effect="scaleUp"><ProjectsSection /></SectionReveal>
        <SectionReveal effect="fadeLeft"><EducationSection /></SectionReveal>
        <SectionReveal effect="flipUp"><ExperienceSection /></SectionReveal>
        <SectionReveal effect="fadeRight"><ResumeSection /></SectionReveal>
        <SectionReveal effect="fadeUp"><ContactSection /></SectionReveal>
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
};

export default Index;

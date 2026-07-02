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
    // Function to hide/show cursor based on modal state
    const updateCursor = () => {
      // Check if any modal is open (Bootstrap adds 'modal-open' class to body)
      const isModalOpen = document.body.classList.contains('modal-open');
      // Also check for any visible modal element as backup
      const visibleModal = document.querySelector('.modal.show');
      const hasModal = isModalOpen || visibleModal;
      const canvas = canvasRef.current;
      
      if (hasModal && canvas) {
        // When modal is open: Hide canvas completely using visibility
        // visibility: hidden removes element from accessibility tree and it doesn't affect cursor
        canvas.style.visibility = 'hidden';
        canvas.style.pointerEvents = 'none';
        // Also set display: none for good measure
        canvas.style.display = 'none';
      } else if (canvas) {
        // When no modal: Normal state - show canvas with custom cursor
        canvas.style.visibility = 'visible';
        canvas.style.display = 'block';
        canvas.style.pointerEvents = 'none'; // Already set in JSX
        canvas.style.zIndex = '99999'; // Normal z-index
        canvas.style.cursor = 'none';
      }
    };

    // Initial update
    updateCursor();

    // Create a MutationObserver to watch for modal-open class changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          updateCursor();
        }
      }
    });

    // Start observing the body for class changes
    observer.observe(document.body, { attributes: true });

    // Also listen for Bootstrap modal events as backup
    const handleModalShow = () => updateCursor();
    const handleModalHide = () => updateCursor();
    
    document.addEventListener('show.bs.modal', handleModalShow);
    document.addEventListener('hide.bs.modal', handleModalHide);
    document.addEventListener('shown.bs.modal', handleModalShow);
    document.addEventListener('hidden.bs.modal', handleModalHide);

    return () => {
      observer.disconnect();
      document.removeEventListener('show.bs.modal', handleModalShow);
      document.removeEventListener('hide.bs.modal', handleModalHide);
      document.removeEventListener('shown.bs.modal', handleModalShow);
      document.removeEventListener('hidden.bs.modal', handleModalHide);
      
      const canvas = canvasRef.current;
      if (canvas) {
        // Reset all styles
        canvas.style.visibility = '';
        canvas.style.display = '';
        canvas.style.pointerEvents = '';
        canvas.style.zIndex = '';
        canvas.style.cursor = '';
      }
    };
  }, []);

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

    const drawCursor = (cx: number, cy: number, hue: number) => {
      ctx.save();
      ctx.translate(cx, cy);

      // Wand stick — longer diagonal line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(22, 22);
      ctx.strokeStyle = `hsl(${hue}, 85%, 88%)`;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = `hsl(${hue}, 100%, 75%)`;
      ctx.shadowBlur = 14;
      ctx.stroke();

      // Glowing dot at wand end
      ctx.beginPath();
      ctx.arc(22, 22, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue}, 90%, 85%)`;
      ctx.shadowBlur = 10;
      ctx.fill();

      // Star tip at the top of the wand
      ctx.translate(-1, -1);
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      for (let j = 0; j < 8; j++) {
        const r = j % 2 === 0 ? 10 : 4;
        const a = (j / 8) * Math.PI * 2 - Math.PI / 2;
        j === 0
          ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
          : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fillStyle = `hsl(${hue}, 100%, 88%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 80%)`;
      ctx.shadowBlur = 22;
      ctx.fill();

      ctx.restore();
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

      // Draw star cursor at mouse position
      if (mouseRef.current.x > 0) {
        drawCursor(mouseRef.current.x, mouseRef.current.y, hue);
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
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99999 }}
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

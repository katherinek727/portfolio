import { Container, Row, Col } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const aboutContent = [
  "I'm a Senior Full-Stack Developer with 6+ years of experience building scalable, high-performance web applications and AI-driven solutions. I specialize in the MERN stack and have a strong track record of delivering reliable, production-ready systems from concept to deployment.",
  "I enjoy working across the full development lifecycle—designing efficient architectures, building intuitive user interfaces, and developing robust backend services. My experience includes integrating modern AI technologies, such as LLMs, into real-world applications to create smarter and more impactful products.",
  "I'm passionate about writing clean, maintainable code and following best practices. I thrive on solving complex problems, continuously improving my skills, and turning ideas into meaningful digital experiences that deliver real value.",
];

const highlights = [
  { label: 'Projects Completed', target: 20, suffix: '+' },
  { label: 'Technologies',        target: 20, suffix: '+' },
  { label: 'Years Experience',    target: 6,  suffix: '+' },
  { label: 'Lines of Code',       target: 50, suffix: 'K+' },
];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const useCountUp = (target: number, active: boolean, duration: number) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(easeOut(p) * target));
      if (p < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
};

const CountCard = ({ item, index, isInView }: { item: typeof highlights[0]; index: number; isInView: boolean }) => {
  const count = useCountUp(item.target, isInView, 1800 + index * 250);
  return (
    <motion.div
      className="glass-card text-center"
      whileHover={{ scale: 1.07, boxShadow: '0 12px 40px rgba(232,196,184,0.22)' }}
      initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(6px)' }}
      transition={{ duration: 0.8, delay: 0.4 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 style={{
        fontSize: '3rem',
        fontWeight: 600,
        fontFamily: 'var(--font-heading)',
        fontStyle: 'italic',
        background: 'var(--accent-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.4rem',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {count}{item.suffix}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {item.label}
      </p>
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -80, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="section" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-5"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Building scalable web applications and AI-driven solutions.</p>
        </motion.div>

        <Row className="align-items-center">
          <Col lg={7}>
            <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
              {aboutContent.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={itemVariants}
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.05rem',
                    marginBottom: '1.25rem',
                    paddingLeft: '1rem',
                    borderLeft: index === 0 ? '2px solid var(--accent-cyan)' : 'none',
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </Col>

          <Col lg={5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
              animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Row className="g-3">
                {highlights.map((item, index) => (
                  <Col xs={6} key={index}>
                    <CountCard item={item} index={index} isInView={isInView} />
                  </Col>
                ))}
              </Row>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;

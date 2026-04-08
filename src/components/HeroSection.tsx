import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import developerPhoto from '@/assets/developer-photo.png';

const roles = [
  'Software Engineer',
  'Senior Full Stack Developer',
  'Web Developer',
];

const NAME = 'Katherine';

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [typedName, setTypedName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typingRef = useRef<ReturnType<typeof setTimeout>>();

  // Typing effect — type → pause → delete → pause → repeat
  useEffect(() => {
    let i = 0;
    let deleting = false;

    const tick = () => {
      if (!deleting) {
        i++;
        setTypedName(NAME.slice(0, i));
        if (i === NAME.length) {
          // pause before deleting
          typingRef.current = setTimeout(() => { deleting = true; tick(); }, 2000);
          return;
        }
      } else {
        i--;
        setTypedName(NAME.slice(0, i));
        if (i === 0) {
          // pause before retyping
          typingRef.current = setTimeout(() => { deleting = false; tick(); }, 600);
          return;
        }
      }
      typingRef.current = setTimeout(tick, deleting ? 70 : 110);
    };

    typingRef.current = setTimeout(tick, 800);
    return () => clearTimeout(typingRef.current);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const handleMouseMove = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg={5} className="text-center text-lg-start mb-5 mb-lg-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={itemVariants}
                style={{
                  color: 'var(--accent-cyan)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  marginBottom: '1rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Hello, I'm
              </motion.p>

              <motion.h1
                variants={itemVariants}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                <span style={{ color: 'var(--text-primary)' }}> </span>
                <span
                  style={{
                    background: 'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {typedName}
                </span>
                <span
                  style={{
                    background: 'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: showCursor && typedName.length <= NAME.length ? 1 : 0,
                    marginLeft: '2px',
                  }}
                >
                  |
                </span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                style={{
                  height: '3rem',
                  marginBottom: '1.5rem',
                  overflow: 'hidden',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={currentRole}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                      fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                      color: 'var(--text-secondary)',
                      fontWeight: 400,
                    }}
                  >
                    {roles[currentRole]}
                  </motion.h2>
                </AnimatePresence>
              </motion.div>

              <motion.p
                variants={itemVariants}
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '1.1rem',
                  maxWidth: '500px',
                  marginBottom: '2.5rem',
                  lineHeight: 1.8,
                }}
              >
                Computer Science & Engineering graduate focused on creating intelligent, scalable web applications by combining AI capabilities with modern full-stack technologies like React and Node.js.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap"
              >
                <Button
                  href="#resume"
                  className="btn-accent"
                  size="lg"
                >
                  View Resume
                </Button>
                <Button
                  href="#contact"
                  className="btn-outline-accent"
                  size="lg"
                >
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>
          </Col>

          <Col lg={5} className="d-flex justify-content-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              style={{ position: 'relative', perspective: '1000px' }}
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
              {/* Glowing ring behind photo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '-15px',
                  right: '-15px',
                  bottom: '-15px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, var(--accent-cyan), var(--accent-purple), var(--accent-cyan))',
                  opacity: 0.6,
                  filter: 'blur(3px)',
                }}
              />
              {/* Photo container */}
              <div
                style={{
                  position: 'relative',
                  width: '350px',
                  height: '360px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid var(--bg-dark)',
                }}
              >
                <img
                  src={developerPhoto}
                  alt="Developer Profile Photo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              {/* Floating elements around photo */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '10%',
                  right: '-20px',
                  background: 'var(--bg-card)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>⚛️</span>
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '15%',
                  left: '-25px',
                  background: 'var(--bg-card)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🤖</span>
              </motion.div>
              </motion.div>
            </motion.div>
          </Col>
        </Row>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-5"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              display: 'inline-block',
              color: 'var(--text-muted)',
              textDecoration: 'none',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default HeroSection;

import { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { motion, useAnimationFrame } from 'framer-motion';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
];

const ActiveNavLink = ({ label, href, onClick }: { label: string; href: string; onClick: () => void }) => {
  const hueRef = useRef(0);
  const [hue, setHue] = useState(0);

  useAnimationFrame(() => {
    hueRef.current = (hueRef.current + 1.2) % 360;
    setHue(hueRef.current);
  });

  return (
    <a
      href={href}
      onClick={onClick}
      style={{
        display: 'inline-block',
        padding: '0.6rem 1.1rem',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase' as const,
        color: `hsl(${hue}, 90%, 72%)`,
        textShadow: `0 0 12px hsl(${hue}, 90%, 65%), 0 0 24px hsl(${(hue+60)%360}, 90%, 60%)`,
      }}
    >
      {label}
    </a>
  );
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = [...navLinks].map(l => l.href.substring(1)).reverse();
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setExpanded(false);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
    >
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={(v) => setExpanded(v)}
        className={`navbar-dark-custom ${scrolled ? 'scrolled' : ''}`}
        style={{
          background: scrolled ? 'rgba(13,10,16,0.95)' : 'rgba(13,10,16,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 4px 30px rgba(232,196,184,0.12)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(232,196,184,0.2)' : '1px solid rgba(232,196,184,0.08)',
          transition: 'all 0.4s ease',
        }}
      >
        <Container>
          <Navbar.Brand href="#hero" onClick={handleLinkClick} style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}>
            <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }} style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{'<'}</motion.span>
            <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Portfolio</span>
            <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{'/>'}</motion.span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav">
            <motion.div style={{ width: '26px', height: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {[0, 1, 2].map(i => (
                <motion.span key={i}
                  animate={i === 1
                    ? (expanded ? { opacity: 0 } : { opacity: 1 })
                    : (expanded ? { rotate: i === 0 ? 45 : -45, y: i === 0 ? 9 : -9 } : { rotate: 0, y: 0 })}
                  transition={{ duration: 0.25 }}
                  style={{ width: i === 1 ? '70%' : '100%', height: '2px', background: 'var(--accent-gradient)', borderRadius: '2px' }}
                />
              ))}
            </motion.div>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              {navLinks.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.08 }}>
                  {activeSection === link.href.substring(1)
                    ? <ActiveNavLink label={link.label} href={link.href} onClick={handleLinkClick} />
                    : <Nav.Link href={link.href} onClick={handleLinkClick}>{link.label}</Nav.Link>
                  }
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} style={{ marginLeft: '0.5rem' }}>
                <a href="#contact" onClick={handleLinkClick}
                  style={{ display: 'inline-block', padding: '0.5rem 1.25rem', background: 'rgba(232,196,184,0.08)', border: '1px solid rgba(232,196,184,0.3)', borderRadius: '50px', color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,196,184,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,196,184,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >Hire Me</a>
              </motion.div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Navigation;

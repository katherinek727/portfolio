import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--bg-dark)',
        borderTop: '1px solid var(--glass-border)',
        padding: '2rem 0',
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p
            style={{
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
            }}
          >
            Designed & Built by{' '}
            <span
              style={{
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
              }}
            >
              Senior Full Stack Developer
            </span>
          </p>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              marginBottom: 0,
            }}
          >
            © {currentYear} All rights reserved. Built with React, Bootstrap & Framer Motion
          </p>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;

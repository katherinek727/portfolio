import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const highlights = [
  'Web & Full-Stack Development',
  'Frontend Expertise',
  'Backend Expertise',
  'Performance & Optimization',
  'Problem Solving',
  'End‑to‑End Ownership',
  'Cross‑Functional Collaboration',
  'Code Quality & Maintainability',
  'Scalable Architecture'
];

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      window.open('https://drive.google.com/file/d/1Pro0xuxXbGtD-rco847loM2-qiSSnK78/view', '_blank');
    }, 500);
  };

  return (
    <section id="resume" className="section" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-5"
        >
          <h2 className="section-title">Resume</h2>
          <p className="section-subtitle">
            Download my ATS-optimized resume
          </p>
        </motion.div>

        <Row className="justify-content-center">
          <Col lg={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.75, filter: 'blur(12px)' }}
              animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card text-center"
              style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(0, 212, 255, 0.05) 100%)',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--accent-gradient)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 2rem',
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--bg-dark)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>

              <h4
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '1rem',
                }}
              >
                 Senior Full Stack Developer - Software Engineer
              </h4>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  maxWidth: '500px',
                  margin: '0 auto 2rem',
                }}
              >
                Computer Science graduate with 6+ years of experience building scalable, high‑performance SaaS platforms using FastAPI, Node.js, React, TypeScript, and AWS. I specialize in designing clean system architectures, optimizing API and SQL performance, and delivering production‑ready features end‑to‑end. I work fast, communicate clearly, and take full ownership of complex technical problems — from backend services and data modeling to frontend rendering and deployment automation.
              </p>

              <div className="mb-4">
                <h6 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
                  Key Highlights
                </h6>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {highlights.map((highlight, index) => (
                    <motion.span
                      key={index}
                      className="tech-badge"
                      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {highlight}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="btn-accent"
                  size="lg"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  style={{
                    minWidth: '200px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {isDownloading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Preparing...
                    </>
                  ) : (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download Resume
                    </>
                  )}
                </Button>
              </motion.div>

              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  marginTop: '1rem',
                }}
              >
                PDF format • ATS-optimized • Last updated 2026
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ResumeSection;

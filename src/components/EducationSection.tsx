import { Container, Row, Col } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  location: string;
  score: string;
  description: string;
  icon: string;
}

const educationData: EducationItem[] = [
  {
    year: '2015 - 2019',
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Bapuji Institute of Engineering & Technology',
    location: 'Beijing University of Technology',
    score: '',
    description: "Bachelor of Science in Computer Science, Beijing University of Technology, 2019. Established a strong foundation in software engineering, algorithms, and system design, which supports my work today as a Senior Full-Stack Developer building scalable, high-performance applications.",
    icon: '🎓',
  },
  // {
  //   year: '2020 - 2022',
  //   degree: 'Higher Secondary Education (12th)',
  //   institution: 'Smt. Vidya P. Hanchinmani Science College, Dharwad',
  //   location: 'Dharwad, Karnataka',
  //   score: 'Percentage: 89.16%',
  //   description: 'Science stream with Physics, Chemistry, and Mathematics. Developed strong foundation in analytical and problem-solving skills.',
  //   icon: '📚',
  // },
  // {
  //   year: '2019 - 2020',
  //   degree: 'Secondary Education (10th)',
  //   institution: 'S F S High School ,Savanuru',
  //   location: 'Savanuru, Karnataka',
  //   score: 'Percentage: 88.48%',
  //   description: 'Achieved distinction in academics. ',
  //   icon: '🏫',
  // },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section
      id="education"
      className="section"
      ref={ref}
      style={{ 
        background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-card) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-5"
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            My academic journey and qualifications
          </p>
        </motion.div>

        <Row className="justify-content-center">
          {educationData.map((item, index) => (
            <Col lg={10} key={index} className="mb-4">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120, filter: 'blur(10px)' }}
                animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="glass-card"
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'flex-start',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'var(--transition-smooth)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.2)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent-cyan)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--glass-border)';
                  }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                      width: '80px',
                      height: '80px',
                      minWidth: '80px',
                      background: 'rgba(232, 196, 184, 0.08)',
                      borderRadius: 'var(--border-radius)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      border: '1px solid rgba(232, 196, 184, 0.2)',
                      boxShadow: '0 0 16px rgba(232, 196, 184, 0.1)',
                    }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                      <div>
                        <h4
                          style={{
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--text-primary)',
                            marginBottom: '0.25rem',
                            fontSize: '1.25rem',
                          }}
                        >
                          {item.degree}
                        </h4>
                        <p
                          style={{
                            color: 'var(--accent-cyan)',
                            marginBottom: '0.25rem',
                            fontSize: '1rem',
                            fontWeight: 500,
                          }}
                        >
                          {item.institution}
                        </p>
                        <p
                          style={{
                            color: 'var(--text-muted)',
                            marginBottom: 0,
                            fontSize: '0.9rem',
                          }}
                        >
                          {item.location}
                        </p>
                      </div>
                      <div className="text-end">
                        <span
                          style={{
                            display: 'inline-block',
                            background: 'rgba(232, 196, 184, 0.08)',
                            color: 'var(--text-secondary)',
                            padding: '0.35rem 1rem',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            marginBottom: '0.5rem',
                            border: '1px solid rgba(232, 196, 184, 0.2)',
                          }}
                        >
                          {item.year}
                        </span>
                        <p
                          style={{
                            color: 'var(--accent-purple)',
                            marginBottom: 0,
                            fontSize: '0.95rem',
                            fontWeight: 600,
                          }}
                        >
                          {item.score}
                        </p>
                      </div>
                    </div>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        marginBottom: 0,
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5"
        >
          <Row className="justify-content-center">
            <Col lg={10}>
              <div
                className="glass-card"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <h5
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.8rem',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  🏆{' '}
                  <span style={{
                    background: 'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 12px rgba(232, 196, 184, 0.4))',
                  }}>
                    Academic Achievements
                  </span>
                </h5>
                <Row className="align-items-stretch">
                  {[
                    { label: 'Coding Competition', value: '3 Wins' },
                    { label: 'Hackathon Wins', value: '2 Awards' },
                    { label: 'Research Paper', value: '1 Published' },
                    { label: 'Certifications', value: '5+ Completed' },
                  ].map((achievement, idx) => (
                    <Col sm={6} md={3} key={idx} className="text-center mb-3 mb-md-0 d-flex">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{
                          padding: '1.75rem 1rem',
                          borderRadius: 'var(--border-radius-sm)',
                          background: 'rgba(0, 0, 0, 0.2)',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            background: 'var(--accent-gradient)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '0.25rem',
                            fontSize: '2.2rem',
                          }}
                        >
                          {achievement.value}
                        </h3>
                        <p
                          style={{
                            color: 'var(--text-secondary)',
                            marginBottom: 0,
                            fontSize: '0.9rem',
                          }}
                        >
                          {achievement.label}
                        </p>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default EducationSection;
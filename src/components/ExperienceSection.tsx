import { Container } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'experience' | 'project';
  skills: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: '07/2022 - 08/2025',
    title: 'Senior Full Stack Developer',
    organization: 'Shanghai SaaS Technology Company',
    description: 'Led the development of scalable SaaS applications, designing full-stack architectures, building high-performance APIs and services, and optimizing system performance. Experienced in cloud deployment, team collaboration, and mentoring, with a proven impact on efficiency and user experience.',
    type: 'experience',
    skills: ['React', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'REST APIs', 'Microservices', 'Full-Stack Architecture'],
  },
  {
    year: '2024',
    title: 'Alloy',
    organization: 'Minecraft Modding, Rebuilt from Scratch',
    description:
      'A from-scratch Minecraft modding ecosystem. Not a fork — every layer from bytecode manipulation to the launcher is built from the ground up. One unified stack where loader, API, mappings, IDE, and launcher are all engineered together.',
    type: 'project',
    skills: ['macOS', 'Windows', 'Linux'],
  },
  {
    year: '12/2020 - 06/2022',
    title: 'Full Stack Developer',
    organization: 'Hangzhou Hikvision Digital Technology',
    description:
      'Developed and maintained internal platforms using React, Node.js, and Python. Built reusable front-end components, optimized rendering, and refactored backend systems for performance and stability. Worked closely with product teams to deliver features efficiently while ensuring high code quality.',
    type: 'experience',
    skills: ['React', 'Node.js', 'Python', 'Front-End Development', 'Backend Development'],
  },
  {
    year: '2021',
    title: 'Globanix',
    organization: 'Global Intelligence at a Glance',
    description:
      'A real-time OSINT news visualization app featuring an interactive 3D globe. Watch breaking news unfold across the world with critical alerts, location-based filtering, and a sleek cyberpunk aesthetic.',
    type: 'project',
    skills: ['iOS', 'iPadOS'],
  },

  {
    year: '09/2019 - 11/2020',
    title: 'Frontend Developer',
    organization: 'Hangzhou Hikvision Digital Technology',
    description:
      'Developed user interfaces and interactive features using modern frontend technologies. Built reusable components, optimized rendering performance, and collaborated with designers and backend teams to deliver responsive and user-friendly applications.',
    type: 'experience',
    skills: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS', 'Gemini API'],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'experience': return '#e8c4b8';
      case 'project': return '#c49ab0';
      default: return '#e8c4b8';
    }
  };

  return (
    <section
      id="experience"
      className="section"
      ref={ref}
      style={{ background: 'var(--bg-card)' }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-5"
        >
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            My personal growth and professional journey in software development
          </p>
        </motion.div>

        <div className="d-flex justify-content-center mb-4">
          <div className="d-flex gap-4 flex-wrap justify-content-center">
            {[
              { type: 'experience', label: 'Work Experience' },
              { type: 'project', label: 'Key Projects' },
            ].map((item) => (
              <div key={item.type} className="d-flex align-items-center gap-2">
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: getTypeColor(item.type),
                    boxShadow: `0 0 10px ${getTypeColor(item.type)}50`,
                  }}
                />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="timeline">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, y: -100, scale: 1.08, filter: 'blur(10px)' }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.9, delay: index * 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="glass-card"
                  style={{
                    borderLeft: `3px solid ${getTypeColor(item.type)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'var(--transition-smooth)',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateX(6px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${getTypeColor(item.type)}30`;
                    (e.currentTarget as HTMLDivElement).style.borderColor = getTypeColor(item.type);
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateX(0)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLDivElement).style.borderColor = getTypeColor(item.type);
                  }}
                >
                  {/* Glow effect */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100px',
                      height: '100%',
                      background: `linear-gradient(90deg, ${getTypeColor(item.type)}15, transparent)`,
                      pointerEvents: 'none',
                    }}
                  />
                  
                  <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap gap-2">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: getTypeColor(item.type),
                            boxShadow: `0 0 8px ${getTypeColor(item.type)}`,
                          }}
                        />
                        <span
                          style={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: getTypeColor(item.type),
                            fontWeight: 600,
                          }}
                        >
                          {item.type === 'experience' ? 'Work' : 'Project'}
                        </span>
                      </div>
                      <h5
                        style={{
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-heading)',
                          marginBottom: '0.25rem',
                          fontSize: '1.15rem',
                        }}
                      >
                        {item.title}
                      </h5>
                      <p
                        style={{
                          color: getTypeColor(item.type),
                          fontSize: '0.95rem',
                          marginBottom: 0,
                          fontWeight: 500,
                        }}
                      >
                        {item.organization}
                      </p>
                    </div>
                    <span
                      style={{
                        background: 'rgba(232, 196, 184, 0.08)',
                        color: 'var(--accent-cyan)',
                        padding: '0.35rem 0.9rem',
                        borderRadius: '50px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        border: '1px solid rgba(232, 196, 184, 0.18)',
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      marginBottom: '1rem',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    {item.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(232, 196, 184, 0.06)',
                          color: 'var(--accent-purple)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '50px',
                          fontSize: '0.78rem',
                          fontWeight: 400,
                          border: '1px solid rgba(196, 154, 176, 0.2)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExperienceSection;

import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Project1 from '@/assets/1.png';
import Project2 from '@/assets/2.png';
import Project3 from '@/assets/3.png';
import Project4 from '@/assets/4.png';
import Project5 from '@/assets/5.png';
import Project6 from '@/assets/6.png';

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  techStack: string[];
  problem: string;
  solution: string;
  outcomes: string[];
  featured?: boolean;
  image?: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AIDA – AI-Based Health Assistant',
    shortDescription:
      'AI-powered health assistant that provides symptom-based insights, disease information, and healthcare guidance.',
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AI APIs'],
    problem:
      'Many users lack access to quick, preliminary health information and guidance before consulting medical professionals.',
    solution:
      'Developed a full-stack AI-based health assistant that analyzes user symptoms through prompts and images, provides disease-related information, suggests nearby hospitals based on location, and supports multiple languages.',
    outcomes: [
      'AI-integrated symptom analysis and health guidance',
      'Multi-language support for wider accessibility',
      'Location-based hospital recommendations',
    ],
    featured: true,
    image: Project1,
    link: 'https://www.gvhrconstruction.com/',
  },
  {
    id: 2,
    title: 'Online Food Delivery Web Application',
    shortDescription:
      'Responsive food ordering web application with dynamic menus and cart-based ordering.',
    techStack: ['React', 'JavaScript', 'REST APIs', 'CSS', 'Git & GitHub'],
    problem:
      'Users need a simple and intuitive platform to browse restaurants, select food items, and place orders online.',
    solution:
      'Built a React-based food delivery application enabling users to browse menus, manage carts, and place orders using API-driven data handling and dynamic UI components.',
    outcomes: [
      'Responsive and user-friendly UI',
      'Dynamic cart and order flow',
      'Real-world food ordering workflow simulation',
    ],
    image: Project2,
    link: 'https://w9164.proweaversite9.com/',
  },
  {
    id: 3,
    title: 'KISAN VISION INDIA – Smart Crop Analytics Dashboard',
    shortDescription:
      'Interactive dashboard visualizing crop yield trends with AI-assisted farmer support.',
    techStack: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS', 'Gemini API'],
    problem:
      'Farmers often lack accessible, data-driven insights for crop planning and decision-making.',
    solution:
      'Developed an interactive analytics dashboard displaying crop yield data across 28 Indian states and integrated an AI chatbot to assist farmers in multiple Indian languages.',
    outcomes: [
      'State-wise crop yield visualization',
      'Interactive charts and maps',
      'AI chatbot assistance for farmers',
    ],
    image: Project3,
    link: 'https://www.tandttransportationllc.com/',
  },
  {
    id: 4,
    title: 'StudyMate – AI-Powered PDF Analyzer',
    shortDescription:
      'AI-driven document analysis platform for interactive question answering from PDFs.',
    techStack: ['React', 'Node.js', 'Python', 'Hugging Face', 'Tailwind CSS'],
    problem:
      'Students struggle to quickly extract meaningful information from large academic documents.',
    solution:
      'Built an AI-powered PDF analyzer that allows users to upload documents and ask context-aware questions, using AI models to generate accurate, document-based responses.',
    outcomes: [
      'AI-based document understanding',
      'Secure file upload and processing',
      'Improved study efficiency through interactive Q&A',
    ],
    image: Project4,
    link: 'https://www.yemallabanquethall.com/',
  },
  {
    id: 5,
    title: 'Trivia Quiz Application',
    shortDescription:
      'Real-time quiz application with authentication, leaderboards, and interactive visuals.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Three.js'],
    problem:
      'Traditional quiz platforms lack engagement and real-time competitive features.',
    solution:
      'Created a trivia quiz application with Firebase authentication and real-time leaderboards, enhanced with 3D animations to improve user engagement.',
    outcomes: [
      'Real-time leaderboard system',
      'Secure authentication',
      'Enhanced user engagement through 3D effects',
    ],
    image: Project5,
    link: 'https://www.delmaus.com/',
  },
  {
    id: 6,
    title: 'Portfolio Generator',
    shortDescription:
      'SaaS tool that helps developers create stunning portfolios with customizable templates.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    problem: 'Developers often lack time to build and maintain personal portfolio websites.',
    solution:
      'Created a portfolio generator SaaS with multiple professional templates, drag-and-drop customization, and one-click deployment.',
    outcomes: [
      '10+ customizable templates',
      'One-click deployment to Vercel',
      'SEO optimization built-in',
    ],
    image: Project6,
    link: 'https://www.luxbrandcostores.com/',
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="projects" className="section" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of my recent work and personal projects
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Row className="g-4">
            {projects.map((project) => (
              <Col md={6} lg={4} key={project.id}>
                <motion.div variants={cardVariants} className="h-100">
                  <div
                    className="glass-card h-100"
                    onClick={() => project.link && window.open(project.link, '_blank')}
                    style={{
                      padding: 0,
                      cursor: 'pointer',
                      borderLeft: '3px solid rgba(74, 144, 164, 0.9)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 4px 24px rgba(74, 144, 164, 0.15)',
                      background: 'rgba(74, 144, 164, 0.05)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(74, 144, 164, 0.35)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(74, 144, 164, 1)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(74, 144, 164, 0.1)';
                      const img = (e.currentTarget as HTMLDivElement).querySelector('.project-card-img') as HTMLImageElement;
                      if (img) img.style.transform = 'scale(2.2) rotate(45deg)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(74, 144, 164, 0.15)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(74, 144, 164, 0.9)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(74, 144, 164, 0.05)';
                      const img = (e.currentTarget as HTMLDivElement).querySelector('.project-card-img') as HTMLImageElement;
                      if (img) img.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    {/* Left-edge glow accent */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '80px',
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(74,144,164,0.18), transparent)',
                        pointerEvents: 'none',
                        zIndex: 0,
                      }}
                    />

                    {/* Image */}
                    <div style={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-card-img"
                          style={{
                            width: '100%',
                            height: '190px',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        />
                      )}
                      {/* Gradient fade into card bg */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '60px',
                          background: 'linear-gradient(to top, var(--glass-bg), transparent)',
                          pointerEvents: 'none',
                        }}
                      />
                      {project.featured && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '0.75rem',
                            right: '0.75rem',
                            background: 'var(--accent-gradient)',
                            color: 'var(--bg-dark)',
                            padding: '0.2rem 0.65rem',
                            borderRadius: '50px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                          }}
                        >
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Text content */}
                    <div style={{ padding: '1.25rem 1.5rem', position: 'relative', zIndex: 1, flex: 1 }}>
                      <h5
                        style={{
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          marginBottom: '0.5rem',
                          lineHeight: 1.3,
                        }}
                      >
                        {project.title}
                      </h5>
                      <p
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.875rem',
                          margin: 0,
                          lineHeight: 1.65,
                        }}
                      >
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <Modal
              show={!!selectedProject}
              onHide={() => setSelectedProject(null)}
              centered
              size="lg"
              className="modal-dark"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Modal.Header closeButton style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <Modal.Title
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {selectedProject.title}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="mb-4">
                    <h6 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                      Tech Stack
                    </h6>
                    <div className="d-flex flex-wrap">
                      {selectedProject.techStack.map((tech, index) => (
                        <span key={index} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h6 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                      Problem Statement
                    </h6>
                    <p style={{ color: 'var(--text-secondary)' }}>{selectedProject.problem}</p>
                  </div>
                  <div className="mb-4">
                    <h6 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                      Solution
                    </h6>
                    <p style={{ color: 'var(--text-secondary)' }}>{selectedProject.solution}</p>
                  </div>
                  <div>
                    <h6 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                      Key Outcomes
                    </h6>
                    <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.25rem' }}>
                      {selectedProject.outcomes.map((outcome, index) => (
                        <li key={index} style={{ marginBottom: '0.5rem' }}>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '1px solid var(--glass-border)' }}>
                  <Button
                    className="btn-outline-accent"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default ProjectsSection;

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
    title: 'G&V Home Remodel & Construction LLC — Website Redesign',
    shortDescription:
      'Corporate website for a construction company with service listings, project showcases, and lead‑generation forms.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Node.js (API layer)', 'Vercel', 'Image Optimization Pipeline'],
    problem:
      'The previous site was slow, poorly structured, and had inconsistent UI spacing.',
    solution:
      'I rebuilt the frontend using Next.js for SSR, optimized images, and created reusable UI components with Tailwind. I also added a lightweight Node.js API for form handling.',
    outcomes: [
      '40–60% faster page loads',
      'Clean, consistent UI with reusable components',
      'Higher conversion from improved form handling'
    ],
    featured: true,
    image: Project1,
    link: 'https://www.gvhrconstruction.com/',
  },
  {
    id: 2,
    title: 'Proweaver Demo Site — Template Reconstruction',
    shortDescription:
      'A demo template that needed to be reconstructed without access to the original source.',
    techStack: ['HTML5', 'SCSS', 'Bootstrap Grid', 'Vanilla JS', 'Node.js (templating)', 'Static Deployment'],
    problem:
      'The original template was unavailable, so no structure or assets could be extracted.',
    solution:
      'I rebuilt the layout from scratch using Bootstrap‑style grids, modular SCSS, and a small Node.js templating setup to generate reusable sections.',
    outcomes: [
      'Fully reconstructed template with clean modular code',
      'Easy to extend for future client demos',
      'Pixel‑close match to Proweaver’s design language'
    ],
    image: Project2,
    link: 'https://w9164.proweaversite9.com/',
  },
  {
    id: 3,
    title: 'T&T Transportation LLC — NEMT Services Website',
    shortDescription:
      'A modern site for a medical transportation company with multiple service categories.',
    techStack: ['Angular.js', 'TypeScript', 'Styled Components', 'Python', 'Django', 'Formspree/SendGrid Integration'],
    problem:
      'Service sections looked repetitive and lacked structure, making navigation confusing.',
    solution:
      'I built a dynamic service schema, created reusable service components, and integrated a backend API for booking requests.',
    outcomes: [
      'Clear, structured service presentation',
      'Higher user engagement',
      'Automated booking request handling',
    ],
    image: Project3,
    link: 'https://www.tandttransportationllc.com/',
  },
  {
    id: 4,
    title: 'Yemalla Banquet Hall — Event Venue Website',
    shortDescription:
      'A visually rich website for an event venue with galleries and service packages.',
    techStack: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Cloudinary (image optimization)', 'Node.js backend'],
    problem:
      'Large images and text blocks created layout imbalance and slow load times.',
    solution:
      'I implemented Cloudinary optimization, redesigned the gallery with lazy loading, and restructured content into modular Vue components.',
    outcomes: [
      'Faster load times despite heavy imagery',
      'Elegant, balanced visual layout',
      'Improved UX and mobile responsiveness',
    ],
    image: Project4,
    link: 'https://www.yemallabanquethall.com/',
  },
  {
    id: 5,
    title: 'Delma Us LLC — NEMT Provider in Virginia',
    shortDescription:
      'A transportation service website with multiple service types and booking flows.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Python', 'MongoDB (service data)', 'Form Integration'],
    problem:
      'Dense text and unclear hierarchy made it hard for users to understand the service offerings.',
    solution:
      'I created a structured service model stored in MongoDB, built dynamic pages, and improved the booking flow with a backend API.',
    outcomes: [
      'Clearer service structure',
      'More intuitive navigation',
      'Higher booking completion rate',
    ],
    image: Project5,
    link: 'https://www.delmaus.com/',
  },
  {
    id: 6,
    title: 'Luxury Brand Consignment Stores — E‑commerce',
    shortDescription:
      'A luxury consignment e‑commerce site with product listings, categories, and checkout.',
    techStack: ['Angular.js', 'WooCommerce REST API', 'Tailwind CSS', 'Custom Product Grid', 'Node.js Middleware'],
    problem: 'Product cards were inconsistent, breaking the premium feel of the brand.',
    solution:
      'I built a custom product grid, normalized product images, and integrated WooCommerce via REST API for dynamic product loading.',
    outcomes: [
      'Cohesive, premium storefront',
      'Better product presentation and trust',
      'Faster product browsing and filtering',
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
                    onClick={() => setSelectedProject(project)}
                    style={{
                      padding: 0,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      const img = (e.currentTarget as HTMLDivElement).querySelector('.project-card-img') as HTMLImageElement;
                      if (img) img.style.transform = 'scale(2.2) rotate(45deg)';
                    }}
                    onMouseLeave={(e) => {
                      const img = (e.currentTarget as HTMLDivElement).querySelector('.project-card-img') as HTMLImageElement;
                      if (img) img.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >

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
              dialogClassName="modal-top-space"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Modal.Header closeButton style={{ 
                  borderBottom: '1px solid var(--glass-border)', 
                  padding: '1.5rem 1.5rem 1rem 1.5rem' 
                }}>
                  <Modal.Title
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--text-primary)',
                      fontSize: '1.5rem',
                      fontWeight: 500,
                    }}
                  >
                    {selectedProject.title}
                    {selectedProject.featured && (
                      <span style={{
                        marginLeft: '0.75rem',
                        background: 'var(--accent-gradient)',
                        color: 'var(--bg-dark)',
                        padding: '0.2rem 0.75rem',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        verticalAlign: 'middle',
                        letterSpacing: '0.04em',
                      }}>
                        Featured
                      </span>
                    )}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ paddingTop: '0.5rem', paddingBottom: '1.5rem' }}>
                  {selectedProject.image && (
                    <div className="mb-4" style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--border-radius-sm)' }}>
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        style={{
                          width: '100%',
                          height: '220px',
                          objectFit: 'cover',
                          borderRadius: 'var(--border-radius-sm)',
                          boxShadow: 'var(--shadow-sm)',
                          marginBottom: '1.5rem'
                        }}
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {selectedProject.shortDescription}
                    </p>
                    <h6 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
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
                    <h6 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                      Problem Statement
                    </h6>
                    <p style={{ color: 'var(--text-secondary)' }}>{selectedProject.problem}</p>
                  </div>
                  <div className="mb-4">
                    <h6 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                      Solution
                    </h6>
                    <p style={{ color: 'var(--text-secondary)' }}>{selectedProject.solution}</p>
                  </div>
                  <div>
                    <h6 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
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
                <Modal.Footer style={{ 
                  borderTop: '1px solid var(--glass-border)',
                  padding: '1rem 1.5rem'
                }}>
                  <Button
                    className="btn-outline-accent"
                    onClick={() => setSelectedProject(null)}
                    style={{ marginRight: 'auto' }}
                  >
                    Close
                  </Button>
                  {selectedProject.link && (
                    <Button
                      className="btn-accent"
                      onClick={() => {
                        window.open(selectedProject.link, '_blank');
                      }}
                    >
                      View Site
                    </Button>
                  )}
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

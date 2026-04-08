import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TechLogos from './TechLogos';

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
 {
  title: 'Programming Languages',
  icon: '💻',
  skills: ['JavaScript', 'TypeScript', 'Python', 'Java (Basic)', 'C (Basic)'],
},
{
  title: 'Frameworks & Libraries',
  icon: '⚛️',
  skills: ['React.js', 'Next.js', 'Vue.js', 'Angular.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap', 'Three.js', 'React Native'],
},
{
  title: 'Databases',
  icon: '🗄️',
  skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
},
{
  title: 'AI & Cloud Tools',
  icon: '🤖',
  skills: ['Hugging Face', 'Gemini API', 'AWS (Basics)', 'Vercel', 'Appwrite'],
},
{
  title: 'Development Tools',
  icon: '🛠️',
  skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
},
{
  title: 'Concepts & Practices',
  icon: '📐',
  skills: ['REST APIs', 'Full-Stack Development', 'AI Integration', 'Problem Solving', 'OOP'],
},

];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.85, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="skills"
      className="section"
      ref={ref}
      style={{ background: 'var(--bg-card)' }}    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-5"
        >
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Row className="g-4">
            {skillCategories.map((category, index) => (
              <Col md={6} lg={4} key={index}>
                <motion.div variants={cardVariants}>
                  <Card
                    className="h-100"
                    style={{
                      background: 'var(--bg-dark)',
                      border: '1px solid var(--glass-border)',                      borderRadius: 'var(--border-radius)',
                      transition: 'var(--transition-smooth)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.25)';
                      e.currentTarget.style.background = 'var(--bg-card-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--glass-border)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'var(--bg-dark)';
                    }}
                  >
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <span style={{ fontSize: '2rem', marginRight: '1rem' }}>
                          {category.icon}
                        </span>
                        <h5
                          style={{
                            color: 'var(--text-primary)',
                            marginBottom: 0,
                            fontFamily: 'var(--font-heading)',
                          }}
                        >
                          {category.title}
                        </h5>
                      </div>
                      <TechLogos
                        skills={category.skills}
                        isInView={isInView}
                        baseDelay={0.3 + index * 0.1}
                      />
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default SkillsSection;

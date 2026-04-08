import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/katherinek727',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/guruprasad-parashuram-pishe-78755425b/',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
 {
  name: 'LeetCode',
  url: 'https://leetcode.com/u/Gurupishe/',
  icon: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.88 3.549a1.25 1.25 0 0 0-1.768 0L6.01 12.652a3.75 3.75 0 0 0 0 5.303l2.033 2.033a3.75 3.75 0 0 0 5.303 0l2.033-2.033a1.25 1.25 0 1 0-1.768-1.768l-2.033 2.033a1.25 1.25 0 0 1-1.768 0l-2.033-2.033a1.25 1.25 0 0 1 0-1.768l9.102-9.103a1.25 1.25 0 0 0 0-1.767z" />
      <path d="M9.197 5.368a1.25 1.25 0 1 0 0 2.5h3.303a1.25 1.25 0 0 0 0-2.5H9.197z" />
    </svg>
  ),
},

];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section
      id="contact"
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
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <Row className="justify-content-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
              animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="form-control-dark"
                    value={formState.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="form-control-dark"
                    value={formState.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="Subject (Optional)"
                    className="form-control-dark"
                    value={formState.subject}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="Your Message"
                    className="form-control-dark"
                    value={formState.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="btn-accent w-100"
                    size="lg"
                    disabled={isSubmitting || submitted}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        />
                        Sending...
                      </>
                    ) : submitted ? (
                      <>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="me-2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Message Sent!
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </motion.div>
              </Form>
            </motion.div>
          </Col>

          <Col lg={5} className="offset-lg-1">
            <motion.div
              initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
              animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-card mb-4">
                <h5
                  style={{
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Contact Information
                </h5>

                <div className="mb-3">
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      marginBottom: '0.25rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:john@developer.com"
                    style={{
                      color: 'var(--accent-cyan)',
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                    }}
                  >
                    katherinek0727@outlook.com
                  </a>
                </div>

                <div className="mb-3">
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      marginBottom: '0.25rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    Location
                  </p>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                    Available for remote work worldwide
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    Connect with me
                  </p>
                  <div className="d-flex gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, color: 'var(--accent-cyan)' }}
                        style={{
                          color: 'var(--text-secondary)',
                          transition: 'var(--transition-fast)',
                        }}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                }}
              >
                I typically respond within 24 hours
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;

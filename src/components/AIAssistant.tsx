import { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  
  "skills": "I specialize in full-stack development using the MERN Stack (MongoDB, Express.js, React.js, Node.js) and building AI-integrated web applications. I am proficient in JavaScript, TypeScript, Python, RESTful APIs, and modern UI frameworks like Tailwind CSS and Bootstrap. I also have experience with cloud platforms and tools such as Firebase, AWS, Appwrite, GitHub, and Vercel, along with data visualization and 3D libraries like D3.js and Three.js.",

  "projects": "My featured projects include KISAN VISION INDIA, a smart crop analytics and advisory dashboard with interactive maps and an AI chatbot supporting multiple Indian languages, and StudyMate, an AI-powered PDF analyzer that enables users to ask questions and receive document-based answers. I have also built a real-time Trivia Quiz application with Firebase authentication, leaderboards, and engaging 3D animations. These projects demonstrate strong full-stack development, AI integration, and problem-solving skills.",

  "experience": "I am a Computer Science & Engineering undergraduate with hands-on experience in building production-ready full-stack applications. My experience includes developing React dashboards, Node.js backend APIs, AI-powered systems, and cloud-deployed applications. I actively participate in hackathons and competitive programming and continuously improve through self-driven learning and real-world projects.",

  "resume": "My resume highlights expertise in MERN Stack development, AI-powered applications, data visualization, and cloud deployment. It includes projects focused on agriculture analytics, intelligent document processing, and interactive web applications, along with achievements in state-level hackathons. Would you like to view or download my resume?",

  "contact": "You can reach Guruprasad Parashuram Pishe at guruprasadpishe@gmail.com. I am open to internships and entry-level software engineering or full-stack developer roles. You can also connect with me via LinkedIn or GitHub through the contact section below.",

  "hello": "Hello! I'm Guruprasad’s AI Portfolio Assistant 🤖. I can help you explore his skills, projects, experience, certifications, or resume. What would you like to know?",

  "default": "I can help you learn more about Guruprasad’s skills, projects, experience, resume, or contact details. Try asking about 'skills', 'projects', 'experience', 'resume', or 'contact'."


};

const getAIResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
    return predefinedResponses.skills;
  }
  if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('built')) {
    return predefinedResponses.projects;
  }
  if (lowerInput.includes('experience') || lowerInput.includes('journey') || lowerInput.includes('background')) {
    return predefinedResponses.experience;
  }
  if (lowerInput.includes('resume') || lowerInput.includes('cv') || lowerInput.includes('download')) {
    return predefinedResponses.resume;
  }
  if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
    return predefinedResponses.contact;
  }
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    return predefinedResponses.hello;
  }
  
  return predefinedResponses.default;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm the AI Portfolio Assistant. Ask me about Guruprasd's skills, projects, or experience!",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: getAIResponse(inputValue),
      sender: 'ai',
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'What are your skills?',
    'Tell me about your projects',
    'What is your experience?',
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)',
          }}
          aria-label="Open AI Assistant"
        >
          <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--bg-dark)"
            strokeWidth="2"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="10" r="1" fill="var(--bg-dark)" />
                <circle cx="8" cy="10" r="1" fill="var(--bg-dark)" />
                <circle cx="16" cy="10" r="1" fill="var(--bg-dark)" />
              </>
            )}
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '2rem',
              width: '380px',
              maxWidth: 'calc(100vw - 2rem)',
              height: '500px',
              maxHeight: 'calc(100vh - 10rem)',
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 999,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1rem 1.25rem',
                background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--bg-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>🤖</span>
              </div>
              <div>
                <h6
                  style={{
                    margin: 0,
                    color: 'var(--bg-dark)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  AI Portfolio Assistant
                </h6>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(10, 10, 15, 0.7)',
                  }}
                >
                  Ask me anything about John
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '0.75rem 1rem',
                      borderRadius: message.sender === 'user'
                        ? 'var(--border-radius) var(--border-radius) 4px var(--border-radius)'
                        : 'var(--border-radius) var(--border-radius) var(--border-radius) 4px',
                      background: message.sender === 'user'
                        ? 'var(--accent-gradient)'
                        : 'var(--bg-dark)',
                      color: message.sender === 'user'
                        ? 'var(--bg-dark)'
                        : 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--border-radius)',
                      background: 'var(--bg-dark)',
                      display: 'flex',
                      gap: '4px',
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: 'var(--accent-cyan)',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div
                style={{
                  padding: '0 1rem 0.5rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(question);
                      setTimeout(handleSend, 100);
                    }}
                    style={{
                      padding: '0.375rem 0.75rem',
                      borderRadius: '50px',
                      background: 'transparent',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      e.currentTarget.style.color = 'var(--accent-cyan)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--glass-border)';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              style={{
                padding: '1rem',
                borderTop: '1px solid var(--glass-border)',
                display: 'flex',
                gap: '0.75rem',
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--bg-dark)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <Button
                onClick={handleSend}
                className="btn-accent"
                disabled={!inputValue.trim() || isTyping}
                style={{
                  padding: '0.75rem 1rem',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;

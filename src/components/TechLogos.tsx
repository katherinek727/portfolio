import { motion } from 'framer-motion';

interface TechLogo {
  name: string;
  icon: string;
  color: string;
}

interface TechLogosProps {
  skills: string[];
  isInView: boolean;
  baseDelay?: number;
}

const techLogosMap: Record<string, TechLogo> = {
  // Programming Languages
'JavaScript': {
  name: 'JavaScript',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  color: '#F7DF1E',
},
'TypeScript': {
  name: 'TypeScript',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  color: '#3178C6',
},
'Python': {
  name: 'Python',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  color: '#3776AB',
},
'Java (Basic)': {
  name: 'Java',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  color: '#007396',
},
'C (Basic)': {
  name: 'C',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  color: '#A8B9CC',
},

// Frameworks & Libraries
'React.js': {
  name: 'React',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  color: '#61DAFB',
},
'Node.js': {
  name: 'Node.js',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  color: '#339933',
},
'Express.js': {
  name: 'Express.js',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  color: '#FFFFFF',
},
'Tailwind CSS': {
  name: 'Tailwind CSS',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  color: '#38BDF8',
},
'Bootstrap': {
  name: 'Bootstrap',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  color: '#7952B3',
},
'Three.js': {
  name: 'Three.js',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
  color: '#FFFFFF',
},

// Databases
'MongoDB': {
  name: 'MongoDB',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  color: '#47A248',
},
'MySQL': {
  name: 'MySQL',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  color: '#4479A1',
},
'Firebase': {
  name: 'Firebase',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  color: '#FFCA28',
},

// AI & Cloud Tools
'Hugging Face': {
  name: 'Hugging Face',
  icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
  color: '#FFD21E',
},
'Gemini API': {
  name: 'Gemini API',
  icon: 'https://cdn.simpleicons.org/google/4285F4',
  color: '#4285F4',
},
'AWS (Basics)': {
  name: 'AWS',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  color: '#FF9900',
},
'Vercel': {
  name: 'Vercel',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  color: '#FFFFFF',
},
'Appwrite': {
  name: 'Appwrite',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/appwrite/appwrite-original.svg',
  color: '#F02E65',
},

// Development Tools
'Git': {
  name: 'Git',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  color: '#F05032',
},
'GitHub': {
  name: 'GitHub',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  color: '#FFFFFF',
},
'VS Code': {
  name: 'VS Code',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  color: '#007ACC',
},
'Postman': {
  name: 'Postman',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  color: '#FF6C37',
},

// Concepts
'REST APIs': {
  name: 'REST APIs',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  color: '#009688',
},
'OOP': {
  name: 'OOP',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  color: '#007396',
},
'Full-Stack Development': {
  name: 'Full-Stack',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  color: '#339933',
},
'AI Integration': {
  name: 'AI Integration',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  color: '#3776AB',
},
'Next.js': {
  name: 'Next.js',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  color: '#000000',
},
'Vue.js': {
  name: 'Vue.js',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  color: '#4FC08D',
},
'Angular.js': {
  name: 'Angular',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  color: '#DD0031',
},
'PostgreSQL': {
  name: 'PostgreSQL',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  color: '#336791',
},
'Problem Solving': {
  name: 'Problem Solving',
  icon: 'https://cdn.simpleicons.org/hackerrank/00EA64',
  color: '#00EA64',
},
'React Native': {
  name: 'React Native',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  color: '#61DAFB',
},

};

const TechLogos = ({ skills, isInView, baseDelay = 0 }: TechLogosProps) => {
  return (
    <div className="d-flex flex-wrap gap-2">
      {skills.map((skill, index) => {
        const logo = techLogosMap[skill];
        
        return (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: baseDelay + index * 0.08,
              ease: 'easeOut',
            }}
            whileHover={{ 
              scale: 1.15, 
              y: -5,
              transition: { duration: 0.2 } 
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
              minWidth: '70px',
            }}
          >
            {logo ? (
              <>
                <img
                  src={logo.icon}
                  alt={logo.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    filter: skill === 'Express.js' || skill === 'Next.js' || skill === 'Vercel' || skill === 'GitHub' 
                      ? 'invert(1)' 
                      : 'none',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    textAlign: 'center',
                  }}
                >
                  {logo.name}
                </span>
              </>
            ) : (
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--accent-cyan)',
                  fontWeight: 500,
                }}
              >
                {skill}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechLogos;

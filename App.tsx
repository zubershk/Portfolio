import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Mail, Linkedin, MapPin, Menu, X, Briefcase, Code, GraduationCap, ChevronLeft, ChevronRight, ExternalLink, FileText, ChevronDown, ChevronUp, Github, Crown, BarChart3, Award, Download } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ProjectCard from './components/ProjectCard';
import { Project, Experience } from './types';
import './index.css';

// Portfolio Data
const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Nyay Sahayak',
    category: 'AI/ML',
    tech: 'Python • FastAPI • React • LangChain',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop',
    description: 'Co-developed an AI-powered legal aid platform for Indian citizens. Integrated Groq\'s Llama 3.3 70B model for instant legal counsel, implemented Whisper-large-v3 for multilingual voice pipeline (Hindi/English/Hinglish), and built a full-stack architecture with React 18, FastAPI, and ChromaDB. Simplifies FIR filing as an AI "Station House Officer".',
    githubLink: 'https://github.com/zubershk/Nyay-Sahayak-react-UI',
    liveLink: 'https://nyay-sahayak-gray.vercel.app/'
  },
  {
    id: '2',
    name: 'UIDAI Analytics',
    category: 'Data Science',
    tech: 'Python • Streamlit • ARIMA • Plotly',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    description: 'Developed a production-grade analytical system for UIDAI Data Hackathon 2026. Engineered Mann-Kendall trend tests and ARIMA forecasting to detect declining Aadhaar updates. Processed 1.2M+ records and built interactive dashboards with geospatial heatmaps for 36 states/UTs. Identified 26 states with significant declining trends.',
    githubLink: 'https://github.com/zubershk/UIDAI-Analytical-Dashboard',
    liveLink: 'https://uidai-analytical-dash.streamlit.app/'
  },
  {
    id: '3',
    name: 'TechTeenz Club',
    category: 'Leadership',
    tech: 'Community • Events • Tech',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    description: 'Founded and scaled TechTeenz Technical Club at TSPDC, establishing a Project-First, Peer-Led learning model for 100+ students with hackathons, bootcamps, and career readiness programs.',
    linkedinLink: 'https://www.linkedin.com/company/techteenz',
    liveLink: 'https://techteenz.netlify.app/'
  },
  {
    id: '4',
    name: 'Data Analytics',
    category: 'Data Science',
    tech: 'Python • SQL • Power BI',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    description: 'Conducted exploratory data analysis at Cognify Technologies, developed interactive dashboards and predictive models, improving marketing targeting by 25% and revenue forecast accuracy by 20%.'
  },
];

const EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: 'President',
    company: 'TechTeenz',
    location: 'Mumbai, India',
    period: 'Oct 2025 - Present',
    highlights: [
      'Founded and scaled TechTeenz Technical Club of TSPDC',
      'Led Project-First, Peer-Led learning model for 100+ students',
      'Managed hackathons, bootcamps, and career readiness programs'
    ]
  },
  {
    id: '2',
    role: 'Frontend Developer Intern',
    company: 'Humble Walking',
    location: 'Mumbai, India',
    period: 'Jun 2025 - Jul 2025',
    highlights: [
      'Developed 5+ responsive web pages with React & Tailwind CSS',
      'Improved load times by 25% and user engagement by 15%',
      'Created 10+ reusable UI components reducing dev time by 20%'
    ]
  },
  {
    id: '3',
    role: 'Data Analysis Intern',
    company: 'Cognify Technologies',
    location: 'Mumbai, India',
    period: 'Jun 2025 - Jul 2025',
    highlights: [
      'Improved marketing campaign targeting by 25%',
      'Increased revenue forecast accuracy by 20%',
      'Reduced manual data entry by 40% through automation'
    ]
  },
];

// Skills categorized
const SKILLS = [
  {
    category: 'Languages & Frameworks',
    items: ['Python', 'JavaScript', 'React.js', 'FastAPI', 'HTML5', 'CSS', 'Streamlit']
  },
  {
    category: 'AI & Data Science',
    items: ['Machine Learning', 'Generative AI', 'LangChain', 'NLP', 'Pandas', 'NumPy', 'ARIMA', 'Predictive Modeling']
  },
  {
    category: 'Tools & Platforms',
    items: ['Docker', 'Git', 'GitHub', 'MySQL', 'ChromaDB', 'VS Code', 'Power BI', 'Tableau', 'Plotly']
  },
  {
    category: 'Soft Skills',
    items: ['Leadership', 'Communication', 'Problem Solving', 'Collaboration', 'Critical Thinking']
  },
];

// Curated Relevant Certifications (sorted by relevance & date)
const ALL_CERTIFICATIONS = [
  { name: 'GenAI Powered Data Analytics', org: 'Tata iQ (Forage)', year: '2025' },
  { name: 'Data Science Job Simulation', org: 'British Airways (Forage)', year: '2025' },
  { name: 'Data Analytics Job Simulation', org: 'Deloitte (Forage)', year: '2025' },
  { name: 'Generative AI Mastermind', org: 'Outskill', year: '2025' },
  { name: 'Generative AI Industry Connect', org: 'HCL GUVI', year: '2025' },
  { name: 'AI Agents Bootcamp', org: 'LetsUpgrade', year: '2025' },
  { name: 'Resume Review Agentic System', org: 'Analytics Vidhya', year: '2025' },
  { name: 'Text Classification with NLP', org: 'Analytics Vidhya', year: '2025' },
  { name: 'Python Data Science Fundamentals', org: 'Udemy', year: '2025' },
  { name: 'Data Analyst Certification', org: 'OneRoadmap', year: '2025' },
  { name: 'Mastering SQL with MySQL', org: 'Udemy', year: '2025' },
  { name: 'Power BI Workshop', org: 'Office Master', year: '2025' },
  { name: 'React Bootcamp', org: 'LetsUpgrade', year: '2025' },
  { name: 'Python Certification', org: 'OneRoadmap', year: '2025' },
  { name: 'Git & GitHub Bootcamp', org: 'LetsUpgrade', year: '2025' },
  { name: 'N8N Automation Course', org: 'LetsUpgrade', year: '2025' },
  { name: 'Firebase Studio Bootcamp', org: 'LetsUpgrade', year: '2025' },
  { name: 'Responsive Web Design', org: 'freeCodeCamp', year: '2022' },
  { name: 'Fundamentals of Digital Marketing', org: 'Google', year: '2021' },
];

// Typing Animation Component
const TypeWriter: React.FC<{ text: string; delay?: number }> = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay]);

  useEffect(() => {
    if (isComplete) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(cursorTimer);
    }
  }, [isComplete]);

  return (
    <span>
      {displayText}
      <span className={`typing-cursor ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
};

// Get icon for experience role
const getRoleIcon = (role: string) => {
  if (role.toLowerCase().includes('president')) return Crown;
  if (role.toLowerCase().includes('frontend') || role.toLowerCase().includes('developer')) return Code;
  if (role.toLowerCase().includes('data')) return BarChart3;
  return Briefcase;
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllCerts, setShowAllCerts] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'ArrowLeft') navigateProject('prev');
      if (e.key === 'ArrowRight') navigateProject('next');
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % PROJECTS.length;
    } else {
      nextIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    }
    setSelectedProject(PROJECTS[nextIndex]);
  };

  const displayedCerts = showAllCerts ? ALL_CERTIFICATIONS : ALL_CERTIFICATIONS.slice(0, 6);

  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-6 mix-blend-difference">
        <div className="font-heading text-lg sm:text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">ZUBER</div>

        <div className="hidden md:flex gap-6 lg:gap-10 text-sm font-bold tracking-widest uppercase">
          {['Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com/zubershk" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#a8fbd3] transition-colors" data-hover="true">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/zubershk" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#a8fbd3] transition-colors" data-hover="true">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:zubershaikh7232@gmail.com" className="text-white hover:text-[#a8fbd3] transition-colors" data-hover="true">
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://drive.google.com/file/d/13V8wqoLc9JdkMkvslfTgYXIhWoDTy9Xq/view"
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-btn inline-flex items-center gap-2 border border-white px-6 lg:px-8 py-2 lg:py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
            data-hover="true"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <a
            href="https://drive.google.com/file/d/13V8wqoLc9JdkMkvslfTgYXIhWoDTy9Xq/view"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent rounded-full"
            data-hover="true"
          >
            <Download className="w-3 h-3" />
            <span className="hidden xs:inline">Resume</span>
          </a>
          <button
            className="text-white z-50 relative w-10 h-10 flex items-center justify-center type-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#31326f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl sm:text-4xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <a
              href="https://drive.google.com/file/d/13V8wqoLc9JdkMkvslfTgYXIhWoDTy9Xq/view"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-2 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>

            <div className="absolute bottom-10 flex gap-6">
              <a href="https://github.com/zubershk" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/zubershk" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:zubershaikh7232@gmail.com" className="text-white/50 hover:text-white transition-colors">Email</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-2 sm:gap-3 md:gap-6 text-[10px] sm:text-xs md:text-base font-mono text-[#a8fbd3] tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/20 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <span>Full Stack Developer</span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-[#4fb7b3] rounded-full animate-pulse" />
            <span>Mumbai</span>
          </motion.div>

          <div className="relative w-full flex justify-center items-center">
            <GradientText
              text="ZUBER"
              as="h1"
              className="text-[18vw] sm:text-[15vw] md:text-[14vw] leading-[0.9] font-black tracking-tighter text-center"
            />
            <motion.div
              className="absolute -z-20 w-[50vw] h-[50vw] bg-white/5 blur-[40px] rounded-full pointer-events-none will-change-transform"
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ transform: 'translateZ(0)' }}
            />
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          {/* Typing Animation Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl font-normal max-w-xl mx-auto text-white leading-relaxed drop-shadow-lg text-center h-[2em] sm:h-auto"
          >
            <TypeWriter text="Building scalable solutions with data-driven insights" delay={40} />
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-0 left-0 w-full py-3 sm:py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(255,255,255,0.4)]">
          <motion.div
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-2xl sm:text-3xl md:text-7xl font-heading font-black px-4 sm:px-8 flex items-center gap-2 sm:gap-4">
                    ZUBER SHAIKH <span className="text-black text-xl sm:text-2xl md:text-4xl">●</span>
                    FULL STACK DEV <span className="text-black text-xl sm:text-2xl md:text-4xl">●</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="relative z-10 py-16 sm:py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        <div className="absolute top-1/2 right-[-20%] w-[50vw] h-[50vw] bg-[#4fb7b3]/20 rounded-full blur-[40px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute bottom-0 left-[-10%] w-[30vw] h-[30vw] bg-[#a8fbd3]/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg"
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Journey</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/60 font-mono uppercase tracking-widest mt-4 text-xs sm:text-sm"
            >
              Where I've made an impact
            </motion.p>
          </div>

          {/* Experience Cards */}
          <div className="space-y-6 md:space-y-8">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                {/* Animated Gradient Border */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#4fb7b3] via-[#a8fbd3] to-[#4fb7b3] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#4fb7b3] via-[#a8fbd3] to-[#4fb7b3] opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Card Content */}
                <div className="relative p-6 sm:p-8 md:p-10 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-transparent transition-all duration-500 overflow-hidden">

                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white group-hover:text-[#a8fbd3] transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-[#4fb7b3] font-semibold text-lg sm:text-xl mt-1">{exp.company}</p>
                    </div>

                    <div className="flex flex-row md:flex-col md:items-end gap-3 md:gap-2">
                      <span className="px-4 py-2 rounded-full bg-[#4fb7b3]/10 border border-[#4fb7b3]/30 text-[#a8fbd3] font-mono text-xs sm:text-sm whitespace-nowrap">
                        {exp.period}
                      </span>
                      <span className="text-white/50 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

                  {/* Highlights */}
                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 + i * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4 text-gray-300"
                      >
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3] mt-2 shrink-0" />
                        <span className="text-sm sm:text-base leading-relaxed">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-10 py-16 sm:py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg">
              Featured <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="relative z-10 py-16 sm:py-20 md:py-32 px-4 md:px-6 bg-black/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-8xl font-heading font-bold uppercase drop-shadow-lg"
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Skills</span>
            </motion.h2>
            <p className="text-[#a8fbd3] font-mono uppercase tracking-widest mt-4 text-xs sm:text-sm md:text-base">
              Technologies I work with
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SKILLS.map((skillGroup, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-5 sm:p-6 md:p-8 border border-white/10 backdrop-blur-md bg-black/20 rounded-xl hover:border-[#4fb7b3]/30 transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-heading font-bold mb-4 sm:mb-6 text-[#4fb7b3]">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, j) => (
                    <span
                      key={j}
                      className="skill-tag px-3 py-1.5 text-xs sm:text-sm border border-white/20 rounded-full text-white/80 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION & CERTIFICATIONS */}
      <section className="relative z-10 py-16 sm:py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 leading-tight">
              <GradientText text="EDUCATION" className="text-4xl sm:text-5xl md:text-7xl" />
            </h2>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 sm:gap-6 p-6 md:p-8 border border-white/10 bg-black/20 backdrop-blur-md max-w-xl rounded-xl hover:border-[#4fb7b3]/30 transition-colors"
            >
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-[#a8fbd3]/20 to-[#4fb7b3]/20 backdrop-blur-md border border-white/10 shrink-0">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-[#a8fbd3]" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 font-heading">B.Sc. Data Science</h4>
                <p className="text-sm sm:text-base text-[#4fb7b3]">Thakur Specialized Degree College</p>
                <p className="text-xs sm:text-sm text-gray-400">University of Mumbai • Expected 2027</p>
              </div>
            </motion.div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white flex items-center gap-3">
                <Award className="w-8 h-8 text-[#4fb7b3] hidden sm:block" />
                Certifications
              </h3>
              <span className="text-[#a8fbd3] font-mono text-xs sm:text-sm">{ALL_CERTIFICATIONS.length} Featured</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {displayedCerts.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className="p-4 sm:p-5 border border-white/10 bg-black/20 hover:bg-black/40 transition-all duration-300 rounded-xl hover:border-[#4fb7b3]/30 group"
                >
                  <p className="font-medium text-white text-sm sm:text-base line-clamp-1 group-hover:text-[#a8fbd3] transition-colors">{cert.name}</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">{cert.org} • {cert.year}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => setShowAllCerts(!showAllCerts)}
              className="shimmer-btn mt-6 sm:mt-8 w-full py-3 sm:py-4 border border-[#4fb7b3]/50 text-[#a8fbd3] font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-[#4fb7b3]/10 transition-colors flex items-center justify-center gap-2 rounded-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {showAllCerts ? (
                <>
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  View All {ALL_CERTIFICATIONS.length} Certifications
                </>
              )}
            </motion.button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-16 sm:py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-heading font-bold mb-6 sm:mb-8">
            Let's <GradientText text="Connect" className="text-4xl sm:text-5xl md:text-8xl" />
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Got a project in mind? Let's build something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="mailto:zubershaikh7232@gmail.com"
              className="shimmer-btn w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#a8fbd3] transition-colors rounded-xl"
              data-hover="true"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/zubershk"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-white text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors rounded-xl"
              data-hover="true"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              LinkedIn
            </a>
            <a
              href="https://github.com/zubershk"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-white text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors rounded-xl"
              data-hover="true"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              GitHub
            </a>
          </div>

          <div className="mt-8 sm:mt-12 flex items-center justify-center gap-4 text-gray-400 text-sm sm:text-base">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Mumbai, Maharashtra, India</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-8 sm:py-12 md:py-16 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-2 sm:mb-4 text-white">ZUBER SHAIKH</div>
            <div className="flex gap-2 text-xs font-mono text-gray-400 justify-center md:justify-start">
              <span>Full Stack Developer • Data Science Student</span>
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
            <a href="https://github.com/zubershk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/zubershk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              LinkedIn
            </a>
            <a href="mailto:zubershaikh7232@gmail.com" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Email
            </a>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {
          selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-md cursor-auto"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#1a1b3b] border border-white/10 flex flex-col md:flex-row shadow-2xl shadow-[#4fb7b3]/10 rounded-2xl"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                  data-hover="true"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); navigateProject('prev'); }}
                  className="absolute left-2 sm:left-4 bottom-4 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                  data-hover="true"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); navigateProject('next'); }}
                  className="absolute right-2 sm:right-4 bottom-4 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                  data-hover="true"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-auto relative overflow-hidden shrink-0 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedProject.id}
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3b] via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                <div className="w-full md:w-1/2 p-6 pb-20 sm:p-8 sm:pb-24 md:p-12 flex flex-col justify-center relative">
                  <motion.div
                    key={selectedProject.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3 text-[#4fb7b3] mb-3 sm:mb-4">
                      <Code className="w-4 h-4" />
                      <span className="font-mono text-xs sm:text-sm tracking-widest uppercase">{selectedProject.category}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold uppercase leading-none mb-2 text-white">
                      {selectedProject.name}
                    </h3>

                    <p className="text-sm sm:text-base text-[#a8fbd3] font-medium tracking-widest uppercase mb-4 sm:mb-6">
                      {selectedProject.tech}
                    </p>

                    <div className="h-px w-20 bg-white/20 mb-4 sm:mb-6" />

                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light">
                      {selectedProject.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8">
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#a8fbd3] transition-colors rounded-xl"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      )}

                      {selectedProject.linkedinLink && (
                        <a
                          href={selectedProject.linkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-[#0a66c2] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#004182] transition-colors rounded-xl"
                        >
                          <Linkedin className="w-4 h-4" />
                          Company Page
                        </a>
                      )}

                      {selectedProject.liveLink && (
                        <a
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-xl"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  );
};

export default App;

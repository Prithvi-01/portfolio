import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import {
  ArrowDown, ArrowUpRight, BookOpen, Bot, BrainCircuit, Braces, Boxes,
  ChevronRight, CircuitBoard, Code2, Cpu, GitBranch, Mail, Menu, Network,
  Orbit, Sparkles, X, Zap,
} from 'lucide-react'
import './App.css'

type Project = {
  number: string
  title: string
  category: string
  description: string
  result: string
  tags: string[]
  color: string
  github?: string
  paper?: string
  icon: typeof Bot
}

const projects: Project[] = [
  {
    number: '01',
    title: 'NexusAI',
    category: 'Multi-LLM orchestration / RAG',
    description: 'A production-grade enterprise AI platform connecting multiple models, private knowledge, and intelligent agents through a single orchestration layer.',
    result: 'Deployed on AWS EC2 with automated zero-downtime delivery.',
    tags: ['FastAPI', 'Next.js', 'ChromaDB', 'LangChain', 'Terraform'],
    color: '#72f6ff',
    github: 'https://github.com/Prithvi-01/nexusai',
    icon: Network,
  },
  {
    number: '02',
    title: 'ME-UP',
    category: 'Agentic commerce / semantic search',
    description: 'An AI-native hyperlocal marketplace where natural-language discovery, buyer-seller agents, and generative tools reshape local commerce.',
    result: 'Sub-200 ms conversational product discovery.',
    tags: ['GPT-4o', 'LangGraph', 'Pinecone', 'MongoDB', 'Flutter'],
    color: '#b892ff',
    github: 'https://github.com/Prithvi-01/ME-UP',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'FlowSpace AI',
    category: 'AI productivity / browser extension',
    description: 'A unified intelligent workspace that brings tasks, email, calendars, and workflow organization into one responsive Chrome extension.',
    result: 'Designed for low-friction focus and reduced context switching.',
    tags: ['React', 'TypeScript', 'Vite', 'Chrome API', 'Framer Motion'],
    color: '#ff9f6e',
    github: 'https://github.com/Prithvi-01/flowspace-ai',
    icon: Orbit,
  },
  {
    number: '04',
    title: 'Conveyor Defect Detection',
    category: 'Edge AI / industrial vision',
    description: 'A real-time inspection pipeline benchmarking four CNN architectures and optimizing inference for production conveyor environments.',
    result: '73% smaller model, 61% lower latency, at least 98% accuracy.',
    tags: ['PyTorch', 'ONNX', 'TensorRT', 'INT8', 'Weights & Biases'],
    color: '#ffcc66',
    icon: Cpu,
  },
  {
    number: '05',
    title: 'Poultry Lameness Detection',
    category: 'Computer vision / gait analysis',
    description: 'An early-warning system combining movement features, video gait analysis, and heredity attributes to detect mobility impairment.',
    result: 'Improved prediction consistency by 37% across annotated samples.',
    tags: ['Transformers', 'Transfer Learning', 'Optuna', 'Computer Vision'],
    color: '#75e6a4',
    icon: BrainCircuit,
  },
  {
    number: '06',
    title: 'Brain Tumour Diagnosis',
    category: 'Published research / explainable AI',
    description: 'A ResNet-50 medical imaging system classifying five diagnostic categories with explainable AI highlighting decision-critical MRI regions.',
    result: 'Peer-reviewed and published through IEEE.',
    tags: ['ResNet-50', 'XAI', 'Medical Imaging', 'Deep Learning'],
    color: '#ff7fa8',
    paper: 'https://ieeexplore.ieee.org/document/10493599',
    icon: BookOpen,
  },
]

type EvidenceLevel = 'Production' | 'Applied' | 'Research' | 'Certified'
type SkillEvidence = { level: EvidenceLevel; source: string; detail: string; metric?: string; link?: string }
type SkillCategory = { name: string; short: string; color: string; description: string; skills: string[]; evidence: SkillEvidence[] }

const skillCategories: SkillCategory[] = [
  {
    name: 'Generative AI & LLMs', short: 'Gen AI', color: '#72f6ff',
    description: 'Grounded, tool-using, multi-agent applications designed for reliable production workflows.',
    skills: ['Large Language Models', 'Generative AI', 'RAG', 'Agentic AI', 'AI Agents', 'Multi-Agent Systems', 'Function Calling', 'Tool Calling', 'Prompt Engineering', 'Prompt Chaining', 'Semantic Caching', 'Hybrid Retrieval', 'Semantic Reranking', 'LLM Evaluation', 'Hallucination Mitigation', 'Guardrails', 'Conversational AI', 'Multimodal AI', 'Vision-Language Models', 'GPT-4o', 'Claude', 'Gemini Pro', 'Ollama', 'DALL-E', 'NotebookLM', 'LangChain', 'LangGraph', 'LlamaIndex', 'LangSmith', 'SentenceTransformers'],
    evidence: [
      { level: 'Production', source: 'OooWee LLC', detail: 'Built Gemini-powered multi-agent pipelines, prompt chains, fallback routing, and tool orchestration.', metric: '40% less recurring manual workload' },
      { level: 'Production', source: 'NexusAI', detail: 'Deployed a multi-LLM orchestration and RAG platform with retrieval, caching, and LLMOps monitoring.', link: 'https://github.com/Prithvi-01/nexusai' },
      { level: 'Applied', source: 'ME-UP', detail: 'Built conversational product discovery and buyer-seller agent workflows with RAG and semantic search.', metric: 'Sub-200 ms query latency', link: 'https://github.com/Prithvi-01/ME-UP' },
    ],
  },
  {
    name: 'Machine Learning & Deep Learning', short: 'ML / DL', color: '#b892ff',
    description: 'Model development, experimentation, optimization, and evaluation across structured and unstructured data.',
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'Transformers', 'BERT', 'CNNs', 'Reinforcement Learning', 'Transfer Learning', 'Fine-Tuning', 'Optuna', 'Classification', 'Regression', 'Clustering', 'Anomaly Detection', 'Natural Language Processing', 'Named Entity Recognition', 'Time-Series Analysis', 'Recommendation Systems', 'Feature Engineering', 'Data Preprocessing', 'Model Evaluation', 'Hyperparameter Tuning', 'Pandas', 'NumPy', 'SciPy', 'spaCy', 'NLTK', 'Matplotlib'],
    evidence: [
      { level: 'Production', source: 'Coherent Pixels Systems', detail: 'Developed and shipped deep-learning pipelines for gait analysis, anomaly detection, and industrial automation.', metric: '3 production AI systems' },
      { level: 'Applied', source: 'Driver Fatigue Detection', detail: 'Built a CNN-based fatigue detector using TensorFlow and live video features.', metric: '94% detection accuracy' },
      { level: 'Applied', source: 'Poultry Lameness Detection', detail: 'Applied transfer learning, Transformers, Optuna tuning, and experiment tracking to gait analysis.', metric: '37% better prediction consistency' },
    ],
  },
  {
    name: 'Computer Vision & Edge AI', short: 'Vision', color: '#ffcc66',
    description: 'Real-time visual intelligence optimized for edge hardware, industrial inspection, and interpretable imaging.',
    skills: ['Computer Vision', 'OpenCV', 'Object Detection', 'Image Classification', 'Gait Analysis', 'Medical Imaging', 'Explainable AI', 'Real-Time Video Processing', 'Surface Defect Detection', 'Eye Tracking', 'Blink Detection', 'Head Pose Estimation', 'ONNX Runtime', 'TensorRT', 'INT8 Quantization', 'Edge Inference', 'Model Compression', 'Latency Optimization', 'MobileNetV2', 'ResNet', 'ResNet-50', 'EfficientNet', 'FAISS Feature Stores', 'NVIDIA Isaac Sim'],
    evidence: [
      { level: 'Production', source: 'Conveyor Defect Detection', detail: 'Benchmarked CNNs and optimized the winning model with ONNX, TensorRT, and INT8 quantization.', metric: '73% smaller · 61% faster · ≥98% accuracy' },
      { level: 'Production', source: 'Coherent Pixels Systems', detail: 'Delivered a TensorRT-optimized anomaly detection pipeline for real-time industrial inspection.', metric: '<100 ms inference' },
      { level: 'Research', source: 'IEEE Brain Tumour Diagnosis', detail: 'Built a ResNet-50 diagnostic classifier with explainable AI for interpretable MRI predictions.', link: 'https://ieeexplore.ieee.org/document/10493599' },
    ],
  },
  {
    name: 'MLOps, Cloud & Infrastructure', short: 'MLOps', color: '#75e6a4',
    description: 'Repeatable deployment, monitoring, experimentation, and cloud infrastructure for production AI.',
    skills: ['Docker', 'Docker Compose', 'MLflow', 'DVC', 'AWS EC2', 'AWS S3', 'AWS Lambda', 'AWS SageMaker', 'Databricks', 'Nginx', 'Terraform', 'GitHub Actions', 'CI/CD', 'Zero-Downtime Deployment', 'Model Serving', 'Model Monitoring', 'Data Drift Detection', 'Automated Retraining', 'Experiment Tracking', 'Weights & Biases', 'Hugging Face Hub', 'Linux', 'Bash', 'Infrastructure as Code'],
    evidence: [
      { level: 'Production', source: 'Coherent Pixels Systems', detail: 'Containerized ML pipelines, tracked experiments, hosted models on SageMaker, and automated retraining.', metric: '52% lower false-negative rate' },
      { level: 'Production', source: 'NexusAI', detail: 'Deployed to AWS EC2 using Terraform, Nginx, Docker Compose, and GitHub Actions.', metric: 'Automated zero-downtime deployment', link: 'https://github.com/Prithvi-01/nexusai' },
      { level: 'Certified', source: 'Databricks & AWS', detail: 'Generative AI Engineer Associate and AWS Cloud Practitioner certifications.' },
    ],
  },
  {
    name: 'Robotics & Autonomous Systems', short: 'Robotics', color: '#ff9f6e',
    description: 'Perception, planning, control, simulation, and coordination for autonomous robots and UAVs.',
    skills: ['ROS2', 'PX4 Autopilot', 'MicroDDS', 'Gazebo', 'RViz', 'NVIDIA Isaac Sim', 'Multi-Robot Coordination', 'UAV Coordination', 'Vision-Language Navigation', 'Reinforcement Learning Locomotion', 'Perception', 'Trajectory Planning', 'A* Pathfinding', 'Finite State Machines', 'Control Systems', 'Arduino', 'MATLAB', 'Simulink', 'PI Control', 'Sensor Filtering', 'Digital Twins', 'ENU-NED Transformations', 'Offboard Control', 'Collision Avoidance'],
    evidence: [
      { level: 'Applied', source: 'Autonomous Multi-Drone Irrigation', detail: 'Built ROS2-PX4 offboard control, fleet task allocation, collision avoidance, and custom Gazebo simulation.' },
      { level: 'Applied', source: 'Quadruped Vision-Language Navigation', detail: 'Integrated semantic instructions, visual memory, and reinforcement-learning locomotion policies.' },
      { level: 'Applied', source: 'MyCobot Pro 600', detail: 'Combined computer vision, A* pathfinding, ROS2 digital twins, and real robotic actuation.' },
      { level: 'Applied', source: 'Arduino Motor Control', detail: 'Implemented sensor filtering and closed-loop PI motor control in Simulink.' },
    ],
  },
  {
    name: 'Backend & APIs', short: 'Backend', color: '#ff7fa8',
    description: 'Reliable services, integrations, and orchestration layers that turn AI models into usable products.',
    skills: ['Python', 'C++', 'Java', 'FastAPI', 'Flask', 'REST APIs', 'WebSockets', 'Authentication', 'API Integration', 'Function Orchestration', 'Tool Orchestration', 'Microservices', 'Backend Architecture', 'PyTest', 'Automated Testing', 'OpenAI API', 'Anthropic API', 'Google Gemini API', 'Business Logic', 'Async Workflows'],
    evidence: [
      { level: 'Production', source: 'OooWee LLC', detail: 'Integrated CRM, project-management, and web APIs through function calling and intelligent task routing.' },
      { level: 'Production', source: 'NexusAI', detail: 'Built FastAPI services, authentication, LLM routing, and document-processing APIs.', link: 'https://github.com/Prithvi-01/nexusai' },
      { level: 'Applied', source: 'ME-UP', detail: 'Developed scalable marketplace backend services and AI-powered buyer-seller workflows.', link: 'https://github.com/Prithvi-01/ME-UP' },
    ],
  },
  {
    name: 'Data, Databases & Vector Search', short: 'Data', color: '#8ba8ff',
    description: 'Operational and vector data systems for retrieval, recommendations, analytics, and AI memory.',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Elasticsearch', 'Meilisearch', 'Supabase', 'Pinecone', 'FAISS', 'ChromaDB', 'pgvector', 'Weaviate', 'Qdrant', 'Vector Indexing', 'Similarity Search', 'Embeddings', 'Semantic Search', 'ETL Pipelines', 'Metadata Stores', 'Data Cleaning', 'Data Preprocessing', 'Hybrid Search', 'Caching'],
    evidence: [
      { level: 'Production', source: 'NexusAI', detail: 'Implemented ChromaDB retrieval, semantic caching, SQLite authentication, and document knowledge pipelines.', link: 'https://github.com/Prithvi-01/nexusai' },
      { level: 'Applied', source: 'ME-UP', detail: 'Combined Pinecone, MongoDB, Redis, ChromaDB, and semantic reranking for commerce discovery.', link: 'https://github.com/Prithvi-01/ME-UP' },
      { level: 'Production', source: 'Conveyor Defect Detection', detail: 'Stored and retrieved visual feature representations using FAISS-indexed stores on AWS S3.' },
    ],
  },
  {
    name: 'Frontend & Product Engineering', short: 'Frontend', color: '#d6f36b',
    description: 'Responsive interfaces and visual systems that make technically complex products clear and intuitive.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite', 'Streamlit', 'Flutter', 'Android Studio', 'Chrome Extension APIs', 'D3.js', 'Mapbox', 'Scrollama', 'Framer Motion', 'Responsive Design', 'UI/UX Design', 'Interactive Visualization', 'Dashboard Design'],
    evidence: [
      { level: 'Production', source: 'FlowSpace AI', detail: 'Built an animated Chrome extension workspace with React, TypeScript, Vite, and Chrome APIs.', link: 'https://github.com/Prithvi-01/flowspace-ai' },
      { level: 'Production', source: 'NexusAI', detail: 'Developed a Next.js LLMOps dashboard for real-time latency and cache metrics.', link: 'https://github.com/Prithvi-01/nexusai' },
      { level: 'Applied', source: 'Vegan Rebellion Visualization', detail: 'Created scroll-driven D3.js and Mapbox data stories using real-world sustainability datasets.' },
    ],
  },
  {
    name: 'Automation & Business Tools', short: 'Automation', color: '#f5b9ff',
    description: 'AI-enabled workflows that connect business systems, reduce handoffs, and accelerate decision-making.',
    skills: ['Make.com', 'GoHighLevel', 'CRM Automation', 'Workflow Automation', 'Trello', 'Jira', 'Wix', 'Business Intelligence Reporting', 'Research Automation', 'Analytics Automation', 'Lead Qualification', 'Client Communication', 'Task Routing', 'Project Management', 'Technical Documentation'],
    evidence: [
      { level: 'Production', source: 'OooWee LLC', detail: 'Automated lead qualification, client communication, reporting, analytics synthesis, and research summarization.', metric: '40% less recurring manual workload' },
      { level: 'Applied', source: 'FlowSpace AI', detail: 'Centralized tasks, calendars, email monitoring, and workflow organization in an intelligent workspace.', link: 'https://github.com/Prithvi-01/flowspace-ai' },
    ],
  },
]

const roles = [
  {
    date: 'JUN 2026 — NOW',
    role: 'AI Engineer Intern',
    company: 'OooWee LLC',
    text: 'Engineering multi-agent Gemini pipelines, tool orchestration, and LLM-powered automation for production client accounts.',
  },
  {
    date: 'DEC 2023 — JUL 2024',
    role: 'Artificial Intelligence Engineer',
    company: 'Coherent Pixels Systems',
    text: 'Shipped three production AI systems spanning computer vision, industrial inspection, MLOps, and optimized edge inference.',
  },
  {
    date: 'NOV 2022 — FEB 2023',
    role: 'AI/ML Intern',
    company: 'Coherent Pixels Systems',
    text: 'Built a CNN-based driver fatigue detection system with 94% accuracy and reduced CPU utilization by 40%.',
  },
]

function AnimatedBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let frame = 0
    let width = 0
    let height = 0
    const pointer = { x: -999, y: -999 }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const count = reduced ? 20 : window.innerWidth < 700 ? 34 : 72
    const points = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: i % 9 === 0 ? 1.8 : 1,
    }))
    const resize = () => {
      width = canvas.width = window.innerWidth * devicePixelRatio
      height = canvas.height = window.innerHeight * devicePixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }
    const move = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move)
    const draw = () => {
      const vw = width / devicePixelRatio
      const vh = height / devicePixelRatio
      ctx.clearRect(0, 0, vw, vh)
      points.forEach((point) => {
        point.x += point.vx
        point.y += point.vy
        if (point.x < -20 || point.x > vw + 20) point.vx *= -1
        if (point.y < -20 || point.y > vh + 20) point.vy *= -1
        const dx = pointer.x - point.x
        const dy = pointer.y - point.y
        const mouseDistance = Math.hypot(dx, dy)
        if (!reduced && mouseDistance < 180) {
          point.x -= dx * 0.0016
          point.y -= dy * 0.0016
        }
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2)
        ctx.fillStyle = mouseDistance < 180 ? 'rgba(114,246,255,.9)' : 'rgba(174,190,255,.35)'
        ctx.fill()
      })
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const distance = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y)
          if (distance < 130) {
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.strokeStyle = `rgba(114,246,255,${0.09 * (1 - distance / 130)})`
            ctx.stroke()
          }
        }
      }
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return <canvas ref={ref} className="network-canvas" aria-hidden="true" />
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [activeSkillCategory, setActiveSkillCategory] = useState(0)
  const [selectedSkill, setSelectedSkill] = useState(skillCategories[0].skills[0])
  const [evidenceFilter, setEvidenceFilter] = useState<'All' | EvidenceLevel>('All')
  const publicAsset = (name: string) => `${import.meta.env.BASE_URL}${name}`
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const activeSkills = skillCategories[activeSkillCategory]
  const visibleEvidence = activeSkills.evidence.filter((item) => evidenceFilter === 'All' || item.level === evidenceFilter)

  return (
    <>
      <AnimatedBackground />
      <motion.div className="progress" style={{ scaleX }} />
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Prithvi Sasikumar home">PS<span>/</span>AI</a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <a className="nav-cta" href="mailto:prithvi.s.official@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
          <motion.div className="hero-side-line hero-side-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <span>AI ENGINEER</span><i />
          </motion.div>
          <motion.div className="hero-side-line hero-side-right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            <i /><span>ROBOTICS · GEN AI</span>
          </motion.div>
          <div className="hero-columns">
            <div className="hero-copy-column">
              <motion.div className="hero-intro" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>HELLO, I&apos;M</motion.div>
              <motion.h1 initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <span>Prithvi</span><span>Sasikumar</span>
              </motion.h1>
              <motion.div className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65 }}>
                <i /> AI/ML ENGINEER · GENERATIVE AI · AGENTIC SYSTEMS <i />
              </motion.div>
              <motion.blockquote className="hero-quote" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.72 }}>
                “I turn ambitious ideas into intelligent systems that perform beyond the prototype.”
              </motion.blockquote>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
                <a className="button primary" href="#projects">Explore my work <ArrowDown size={17} /></a>
                <a className="button ghost" href="https://github.com/Prithvi-01" target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub</a>
                <a className="button ghost" href={publicAsset('Prithvi_Sasikumar_Resume.pdf')} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={17} /></a>
              </motion.div>
            </div>
            <motion.div className="hero-portrait-column" initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
              <div className="portrait-shell">
                <div className="portrait-orbit orbit-a" /><div className="portrait-orbit orbit-b" />
                <img src={publicAsset('prithvi-profile-full.jpeg')} alt="Prithvi Sasikumar" />
                <span className="portrait-tag"><span className="status-dot" /> OPEN TO WORK</span>
              </div>
              <span className="portrait-caption">BUILDING INTELLIGENT SYSTEMS<br />FROM RESEARCH TO REALITY</span>
            </motion.div>
          </div>
          <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <span>Tempe, Arizona</span><span>AI Engineer / Robotics</span><span>Scroll to explore</span>
          </motion.div>
        </section>

        <section id="about" className="section">
          <Reveal className="section-heading"><span className="eyebrow">01 / About</span><h2>Engineering AI beyond the prototype.</h2></Reveal>
          <div className="about-grid">
            <Reveal className="about-copy">
              <p>I design and deploy intelligent systems that are measurable, resilient, and genuinely useful. My work connects modern LLM applications with the discipline of production ML, real-time vision, and autonomous systems.</p>
              <p>From an enterprise multi-agent platform to edge-optimized industrial inspection, I enjoy the moment a difficult research problem becomes something people can actually use.</p>
            </Reveal>
            <div className="metrics-grid">
              {[['73%', 'model compression'], ['<100 ms', 'real-time inference'], ['45%', 'less manual inspection'], ['3.87', 'graduate GPA']].map(([value, label], index) => (
                <Reveal className="metric" delay={index * 0.08} key={label}><strong>{value}</strong><span>{label}</span></Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <Reveal className="section-heading"><span className="eyebrow">02 / Experience</span><h2>Building across the AI stack.</h2></Reveal>
          <div className="timeline">
            {roles.map((role, index) => (
              <Reveal className="timeline-row" key={role.role} delay={index * 0.1}>
                <span className="timeline-index">0{index + 1}</span><div className="timeline-date">{role.date}</div>
                <div><h3>{role.role}</h3><span className="company">{role.company}</span></div><p>{role.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <Reveal className="section-heading project-heading">
            <div><span className="eyebrow">03 / Selected work</span><h2>Systems with a pulse.</h2></div>
            <p>Six projects across agents, vision, research, and human-centered AI.</p>
          </Reveal>
          <div className="project-layout">
            <div className="project-list" role="tablist" aria-label="Featured projects">
              {projects.map((project, index) => {
                const Icon = project.icon
                return (
                  <button role="tab" aria-selected={activeProject === index} className={activeProject === index ? 'project-tab active' : 'project-tab'} onClick={() => setActiveProject(index)} onMouseEnter={() => setActiveProject(index)} key={project.title}>
                    <span>{project.number}</span><Icon size={20} /><strong>{project.title}</strong><ChevronRight size={18} />
                  </button>
                )
              })}
            </div>
            <motion.article className="project-stage" key={projects[activeProject].title} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} style={{ '--project-color': projects[activeProject].color } as React.CSSProperties}>
              <div className="stage-grid" />
              <div className="stage-topline"><span>{projects[activeProject].category}</span><span>FEATURED / {projects[activeProject].number}</span></div>
              <div className="project-symbol">{(() => { const Icon = projects[activeProject].icon; return <Icon size={72} strokeWidth={1} /> })()}</div>
              <div className="project-content">
                <h3>{projects[activeProject].title}</h3><p>{projects[activeProject].description}</p>
                <div className="result-line"><Zap size={17} /> {projects[activeProject].result}</div>
                <div className="tag-row">{projects[activeProject].tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                {(projects[activeProject].github || projects[activeProject].paper) && (
                  <a className="project-link" href={projects[activeProject].github || projects[activeProject].paper} target="_blank" rel="noreferrer">
                    {projects[activeProject].paper ? 'Read IEEE publication' : 'Explore repository'} <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
            </motion.article>
          </div>
        </section>

        <section id="skills" className="section">
          <Reveal className="section-heading skills-heading">
            <span className="eyebrow">04 / Capabilities</span><h2>A connected technical universe.</h2>
            <p>Explore {skillCategories.reduce((count, category) => count + category.skills.length, 0)} skills backed by evidence from production work, completed projects, research, and certifications.</p>
          </Reveal>
          <div className="skills-explorer">
            <div className="skill-category-list" role="tablist" aria-label="Skill categories">
              {skillCategories.map((category, index) => (
                <button
                  key={category.name}
                  role="tab"
                  aria-selected={activeSkillCategory === index}
                  className={activeSkillCategory === index ? 'skill-category active' : 'skill-category'}
                  style={{ '--skill-color': category.color } as React.CSSProperties}
                  onClick={() => { setActiveSkillCategory(index); setSelectedSkill(category.skills[0]); setEvidenceFilter('All') }}
                >
                  <span>0{index + 1}</span><strong>{category.short}</strong><em>{category.skills.length}</em><ChevronRight size={16} />
                </button>
              ))}
            </div>
            <motion.div className="skill-detail-panel" key={activeSkills.name} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} style={{ '--skill-color': activeSkills.color } as React.CSSProperties}>
              <div className="skill-panel-top">
                <div><span className="skill-panel-label">SELECTED DOMAIN</span><h3>{activeSkills.name}</h3><p>{activeSkills.description}</p></div>
                <div className="skill-count"><strong>{activeSkills.skills.length}</strong><span>SKILLS</span></div>
              </div>
              <div className="skill-node-grid">
                {activeSkills.skills.map((skill) => (
                  <button key={skill} onClick={() => setSelectedSkill(skill)} className={selectedSkill === skill ? 'skill-node active' : 'skill-node'}>{skill}</button>
                ))}
              </div>
              <div className="evidence-section">
                <div className="evidence-header">
                  <div><span className="skill-panel-label">EVIDENCE FOR</span><h4>{selectedSkill}</h4></div>
                  <div className="evidence-filters">
                    {(['All', 'Production', 'Applied', 'Research', 'Certified'] as const).map((filter) => (
                      <button key={filter} className={evidenceFilter === filter ? 'active' : ''} onClick={() => setEvidenceFilter(filter)}>{filter}</button>
                    ))}
                  </div>
                </div>
                <div className="evidence-grid">
                  {visibleEvidence.length ? visibleEvidence.map((item) => (
                    <article className="evidence-card" key={`${item.source}-${item.level}`}>
                      <div><span className={`evidence-level ${item.level.toLowerCase()}`}>{item.level}</span>{item.metric && <strong>{item.metric}</strong>}</div>
                      <h5>{item.source}</h5><p>{item.detail}</p>
                      {item.link && <a href={item.link} target="_blank" rel="noreferrer">View evidence <ArrowUpRight size={13} /></a>}
                    </article>
                  )) : <div className="empty-evidence">No evidence in this filter. Select “All” to view every application.</div>}
                </div>
              </div>
            </motion.div>
          </div>
          <div className="discipline-grid">
            {[
              [Bot, 'Generative AI', 'LLM orchestration, RAG, agents, evaluation, and multimodal experiences.'],
              [CircuitBoard, 'Production ML', 'MLOps, model serving, monitoring, optimization, and cloud infrastructure.'],
              [Boxes, 'Autonomous Systems', 'ROS2, PX4, perception, control, simulation, and multi-robot coordination.'],
              [Braces, 'Full-stack Delivery', 'FastAPI, React, TypeScript, data stores, APIs, and thoughtful interfaces.'],
            ].map(([Icon, title, text], index) => {
              const ItemIcon = Icon as typeof Bot
              return <Reveal className="discipline-card" delay={index * 0.08} key={title as string}><ItemIcon size={24} /><h3>{title as string}</h3><p>{text as string}</p></Reveal>
            })}
          </div>
        </section>

        <section className="section education-section">
          <Reveal className="section-heading"><span className="eyebrow">05 / Foundation</span><h2>Research, robotics, and continuous learning.</h2></Reveal>
          <div className="education-grid">
            <Reveal className="education-card featured"><span>2024 — 2026</span><h3>M.S. Robotics & Autonomous Systems</h3><p>Artificial Intelligence concentration · Arizona State University</p><strong>CGPA 3.87 / 4</strong></Reveal>
            <Reveal className="education-card"><span>2020 — 2024</span><h3>B.E. Computer Science</h3><p>Easwari Engineering College · Chennai, India</p><strong>CGPA 3.33 / 4</strong></Reveal>
            <Reveal className="education-card"><span>CERTIFICATIONS</span><h3>Built to keep learning</h3><p>Databricks Generative AI Engineer · Google Generative AI · AWS Cloud Practitioner</p></Reveal>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-glow" />
          <Reveal><span className="eyebrow">06 / Contact</span><h2>Let&apos;s build what&apos;s next.</h2><p>I&apos;m interested in ambitious AI engineering opportunities where research meets real-world impact.</p><a className="contact-email" href="mailto:prithvi.s.official@gmail.com">prithvi.s.official@gmail.com <ArrowUpRight /></a></Reveal>
          <div className="social-row">
            <a href="https://github.com/Prithvi-01" target="_blank" rel="noreferrer"><GitBranch size={18} /> GitHub</a>
            <a href="https://linkedin.com/in/prithvi-sasikumar" target="_blank" rel="noreferrer"><Code2 size={18} /> LinkedIn</a>
            <a href="mailto:prithvi.s.official@gmail.com"><Mail size={18} /> Email</a>
          </div>
        </section>
      </main>
      <footer><span>Designed & built by Prithvi Sasikumar</span><span>Tempe, AZ · 2026</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></footer>
    </>
  )
}

export default App

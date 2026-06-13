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

const skills = ['Generative AI', 'Agentic AI', 'RAG', 'Computer Vision', 'LLM Evaluation', 'PyTorch', 'TensorFlow', 'LangGraph', 'FastAPI', 'AWS', 'Docker', 'TensorRT', 'ROS2', 'PX4', 'React', 'TypeScript']

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
  const publicAsset = (name: string) => `${import.meta.env.BASE_URL}${name}`
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

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
          <motion.div className="portrait-shell" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <div className="portrait-orbit orbit-a" /><div className="portrait-orbit orbit-b" />
            <img src={publicAsset('prithvi-profile.jpg')} alt="Prithvi Sasikumar" />
            <span className="portrait-tag"><span className="status-dot" /> OPEN TO WORK</span>
          </motion.div>
          <motion.div className="hero-intro" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            HELLO, I&apos;M
          </motion.div>
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
          <Reveal className="section-heading"><span className="eyebrow">04 / Capabilities</span><h2>A connected technical universe.</h2></Reveal>
          <div className="skills-layout">
            <Reveal className="skill-core"><div className="core-rings"><BrainCircuit size={74} strokeWidth={1} /></div><span>AI Systems Engineering</span></Reveal>
            <div className="skill-cloud">{skills.map((skill, index) => <Reveal key={skill} delay={(index % 6) * 0.04}><span className="skill-chip">{skill}</span></Reveal>)}</div>
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

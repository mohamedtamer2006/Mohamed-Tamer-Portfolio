// Edit everything on the site from this file. Replace any text in [BRACKETS] with your own details.

export const profile = {
  name: 'Mohamed Tamer',
  title: 'AI / ML / Software Engineer',
  email: 'mohammed.tamer.mot@gmail.com',
  phone: '+20 1200660007',
  github: 'https://github.com/mohamedtamer2006',
  linkedin: 'https://www.linkedin.com/in/mohamed-tamer-53113a230/',
  // Drop your CV into /public and keep this path in sync.
  cvUrl: '/Mohamed-Tamer-CV.pdf',
  // Drop your photos into /public/images and set the paths, e.g. '/images/cover-photo.jpg'.
  coverPhoto: '/images/cover-portrait.webp' as string | null,
  aboutPhoto: '/images/about-photo.webp' as string | null,
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'why-me', label: 'Why Me' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

export const aboutLines = [
  {
    tag: 'Identity',
    text: 'I’m Mohamed Tamer, in my third year of Software Engineering at Cairo University’s Faculty of Computing and Artificial Intelligence.',
  },
  {
    tag: 'Capabilities',
    text: 'I design and build AI-powered products: RAG systems, ML models, Computer Vision applications, and production-ready backends with FastAPI.',
  },
  {
    tag: 'Statistics',
    text: 'Backed by rigorous mathematical and statistical training in probability distributions, hypothesis testing, and exploratory data analysis to ensure models are accurate and reliable.',
  },
  {
    tag: 'Allies',
    text: 'I help startups, businesses, and recruiters turn ideas into reliable, working software.',
  },
  {
    tag: 'Edge',
    text: 'I combine solid software engineering with hands-on machine learning, so my solutions are not just smart but deployable.',
  },
  {
    tag: 'Training',
    text: 'Completed 250+ hours in the Microsoft ML Engineer track at DEPI (with AMIT Learning), mastering end-to-end ML, Deep Learning, and Azure MLOps, alongside freelancing on Upwork, Mostaql, and Kafeel.',
  },
  {
    tag: 'Leadership',
    text: 'I’ve led two 5-member teams directing architecture and delivery, and reached the regional finals in Alexandria after completing all three phases of the AI for All Hackathon.',
  },
  {
    tag: 'Origin',
    text: 'I’m driven by building technology that protects and helps people, like early-warning systems for disasters.',
  },
  {
    tag: 'Next',
    text: 'Let’s build something remarkable together.',
  },
]

export const stats = [
  { value: '5+', label: 'Shipped projects' },
  { value: '250+', label: 'ML Training Hours' },
  { value: '2', label: 'Teams led (5 members)' },
  { value: '12+', label: 'Certificates earned' },
  { value: '2.9', label: 'Cumulative GPA' },
  { value: '3rd', label: 'Year at Cairo University' },
]

export const usps = [
  {
    title: 'AI + Engineering in One Person',
    text: 'I design the model and build the system around it, so there are no hand-off gaps between “smart” and “shipped”.',
    icon: 'brain',
    accent: 'arc',
  },
  {
    title: 'Production-Minded',
    text: 'APIs, databases, and deployment are part of the plan from day one, not an afterthought.',
    icon: 'server',
    accent: 'stark',
  },
  {
    title: 'Fast Learner, Real Shipped Projects',
    text: 'Live demos and public code you can check yourself, not just notebooks and screenshots.',
    icon: 'zap',
    accent: 'gold',
  },
  {
    title: 'Clear Communication',
    text: 'Regular updates, honest timelines, and plain-English explanations for every freelance client.',
    icon: 'message',
    accent: 'cap',
  },
] as const

export const education: {
  period: string
  title: string
  org: string
  status: string
  image?: string | null
  points: string[]
}[] = [
  {
    period: '2024 — Expected 2028',
    title: 'B.Sc. Software Engineering',
    org: 'Cairo University — Faculty of Computing and Artificial Intelligence',
    status: 'Third year · Cumulative GPA: 2.9 / 4.0',
    image: '/images/cairo-university.jpg',
    points: [
      'Academic Coursework: Data Structures & Algorithms, OOP, Database Systems, Discrete Mathematics, Probability & Statistics, and Software Engineering principles.',
      'Applied AI Foundations: Built full-stack database-driven platforms, team collaboration workflows, and practiced competitive programming.',
    ],
  },
  {
    period: 'Jul 2026 — Dec 2026',
    title: 'Microsoft Machine Learning Engineer Track',
    org: 'DEPI (MCIT) · Delivered with AMIT Learning & Microsoft',
    status: 'Round 5 · 250+ Hours Intensive Track',
    image: '/images/amit-ml-track.jpg',
    points: [
      'Comprehensive 250+ hour diploma covering end-to-end Machine Learning, Deep Learning, and MLOps deployment.',
      'Technical Mastery (180+ hrs): Applied Mathematics & Statistics (Linear Algebra, Calculus, Probability Distributions, Hypothesis Testing), Python scientific stack (NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn), Supervised/Unsupervised ML, Deep Learning & PyTorch, Natural Language Processing (NLP, Transformers, Hugging Face), Computer Vision (CNNs, Transfer Learning), and Cloud MLOps with Microsoft Azure ML & MLflow.',
      'Professional & Soft Skills (70+ hrs): Team leadership, presentation & pitch delivery, emotional intelligence, business proposal writing & Business English (by OTO Courses), and freelance market operations on Upwork, Mostaql, and Kafeel.',
    ],
  },
]

export const skillGroups = [
  { category: 'Languages', stone: 'Space Stone', color: 'var(--color-stone-space)', skills: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'PHP'] },
  { category: 'AI / ML', stone: 'Mind Stone', color: 'var(--color-stone-mind)', skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'Agentic AI', 'RAG', 'LLM APIs', 'Embeddings', 'Prompt Engineering', 'Hugging Face', 'Google Cloud Generative AI Studio', 'Microsoft Azure', 'MLOps', 'MLflow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
  { category: 'Software Engineering', stone: 'Power Stone', color: 'var(--color-stone-power)', skills: ['SDLC', 'Agile / Scrum', 'OOP & SOLID Principles', 'Design Patterns', 'Data Structures & Algorithms', 'System Design', 'Requirements Analysis', 'UML Diagrams', 'Code Review', 'Competitive Programming', 'API Design', 'Software Testing (ISTQB concepts)', 'CI/CD Concepts', 'Docker (basics)'] },
  { category: 'Backend & APIs', stone: 'Reality Stone', color: 'var(--color-stone-reality)', skills: ['FastAPI', 'Flask', 'Node.js', 'Express', 'REST APIs', 'SQLAlchemy', 'Maven', 'Vercel'] },
  { category: 'Databases', stone: 'Time Stone', color: 'var(--color-stone-time)', skills: ['ChromaDB', 'FAISS', 'PostgreSQL', 'SQL Server', 'SQLite', 'ERD Design', 'DB Systems'] },
  { category: 'Tools & Testing', stone: 'Soul Stone', color: 'var(--color-stone-soul)', skills: ['Selenium', 'Manual Testing', 'Automation Testing', 'SonarQube', 'Postman', 'Git', 'GitHub', 'Jupyter', 'IntelliJ IDEA', 'Visual Studio', 'CLion', 'VS Code'] },
]

export const softSkills = ['Team Leadership', 'Communication', 'Presentation', 'Problem Solving', 'Time Management']

export const spokenLanguages = [
  { name: 'Arabic', level: 'Mother tongue' },
  { name: 'English', level: 'B1 · Intermediate' },
  { name: 'German', level: 'A2 · Beginner' },
]

export type ProjectLink = { label: string; href: string; kind: 'code' | 'live' }

export const projects: {
  codename: string
  title: string
  tagline: string
  description: string
  tags: string[]
  role: string
  status: string
  image: string | null
  fit?: 'cover' | 'contain'
  links: ProjectLink[]
}[] = [
  {
    codename: 'Mission 01',
    title: 'SafePath AI',
    tagline: 'Disaster early-warning system',
    description:
      'An AI-powered disaster early-warning and evacuation route guidance platform engineered across 3 phases of the AI for All Hackathon. Transforms multi-source hazard data into real-time risk scores (hazard, exposure, vulnerability), predicts risk escalation, provides safe evacuation paths, and features a multilingual crisis-calm chatbot.',
    tags: ['Python', 'Flask', 'PostgreSQL', 'OpenAI API', 'SMS Alerts', 'Next.js', 'TypeScript', 'Computer Vision'],
    role: 'AI/ML Developer, Team ResiliAfrica · AI for All Hackathon (Phase 1 Ideation → Phase 2 Prototyping → Phase 3 Regional Finals, Alexandria)',
    status: 'Deployed',
    image: '/images/projects/safepath-ai.png',
    links: [
      { label: 'Backend Code', href: 'https://github.com/mohamedtamer2006/SafePath_AI_Backend', kind: 'code' },
      { label: 'Frontend Code', href: 'https://github.com/mohamedtamer2006/SafePath_AI_Frontend', kind: 'code' },
      { label: 'Live Demo', href: 'https://safepathai-eight.vercel.app/', kind: 'live' },
    ],
  },
  {
    codename: 'Mission 02',
    title: 'Renewable Energy Grid Maintenance Network',
    tagline: 'Data-safe maintenance operations',
    description:
      'A full-stack app for managing renewable energy sites, power units, technicians, and maintenance inspections. Raw SQL on a SQL Server schema, 6+ analytical queries, a dashboard summary view, and a light/dark vanilla JS frontend.',
    tags: ['Node.js', 'Express', 'SQL Server', 'mssql', 'ERD Design', 'JavaScript', 'HTML/CSS'],
    role: 'Team Lead · led 5 members, owned timeline, architecture, and technical decisions · May 2026',
    status: 'Deployed',
    image: '/images/projects/grid-maintain.png',
    links: [
      {
        label: 'View Code',
        href: 'https://github.com/mohamedtamer2006/Renewable-Energy-Grid-Maintenance-Network',
        kind: 'code',
      },
      { label: 'Live Demo', href: 'https://code-analysis-bot--motamer.replit.app/', kind: 'live' },
    ],
  },
  {
    codename: 'Mission 03',
    title: 'Quizer',
    tagline: 'Online exams for students',
    description:
      'A full-stack exam platform with quiz creation, quiz-taking, exam history, profile pages, and sign-in / registration flows, deployed on Vercel.',
    tags: ['Node.js', 'Express', 'EJS', 'SQLite', 'Vercel'],
    role: 'Team Member · Cairo University · May 2026',
    status: 'Deployed',
    image: '/images/projects/quizer.png',
    links: [
      { label: 'View Code', href: 'https://github.com/Mahmoud-Hashim-pro/Online-exam-platform', kind: 'code' },
      { label: 'Live Demo', href: 'https://online-exam-platform-delta.vercel.app/', kind: 'live' },
    ],
  },
  {
    codename: 'Mission 04',
    title: 'Soccer League',
    tagline: 'League management app',
    description:
      'A Java desktop app for managing teams, players, and matches, backed by a SQL Server database with its own schema and seed script.',
    tags: ['Java', 'OOP', 'IntelliJ', 'Microsoft SQL Server'],
    role: 'Individual project · DEPI · Sep 2025',
    status: 'Code available',
    image: '/images/projects/soccer-league.png',
    fit: 'contain',
    links: [{ label: 'View Code', href: 'https://github.com/mohamedtamer2006/SOCCER', kind: 'code' }],
  },
  {
    codename: 'Mission 05',
    title: 'PHP Travel Booking System',
    tagline: 'Software testing project',
    description:
      'Designed and ran test cases for the booking, search, and payment workflows of a travel booking web app, logged functional defects, and verified fixes with the dev team using manual and automated testing.',
    tags: ['Selenium', 'Java', 'Maven', 'IntelliJ', 'Excel', 'Manual Testing'],
    role: 'Team Lead · led 5 members, owned timeline and architecture · DEPI, Nov–Dec 2025',
    status: 'Completed',
    image: '/images/projects/phptravels.png',
    links: [
      {
        label: 'View Repository',
        href: 'https://github.com/mohamedtamer2006/php-Travel-Booking-System-Testing',
        kind: 'code',
      },
    ],
  },
]

export const experience = [
  {
    period: 'Jul 2026 — Dec 2026',
    role: 'Microsoft Machine Learning Intern',
    org: 'DEPI — Digital Egypt Pioneers Initiative, MCIT (AMIT Learning)',
    points: [
      'Graduated from the intensive 250+ hour Machine Learning track: mathematical foundations, advanced data science, Deep Learning, Computer Vision, and NLP.',
      'Developed end-to-end ML & Deep Learning pipelines with Scikit-learn, PyTorch, and Hugging Face, deploying and tracking models on Microsoft Azure ML with MLflow.',
      'Completed comprehensive professional development covering technical presentation, Business English (OTO Courses), and freelance client management.',
    ],
  },
  {
    period: 'Freelance',
    role: 'Freelance AI / Backend Developer',
    org: 'Upwork · Mostaql · Kafeel · Khamsat · Nafzly',
    points: [
      'Build RAG systems that let clients chat with their own documents, using ChromaDB and FAISS for fast vector search.',
      'Design and ship production-ready REST APIs with FastAPI, from data models to deployment.',
      'Turn client requirements into clear milestones and deliver complete, documented solutions across Upwork, Mostaql, and Kafeel.',
    ],
  },
  {
    period: 'Jun — Dec 2025',
    role: 'Software Testing Intern (Blended)',
    org: 'DEPI — Ministry of Communications and Information Technology',
    points: [
      'Software Development track specializing in manual and automation testing, under a nationally sponsored program.',
      'Practiced structured test-case design and defect identification on a full-stack sample application.',
      'Completed a parallel Business English track for technical communication and documentation.',
    ],
  },
]

export const leadership: {
  period: string
  title: string
  text: string
  photos?: string[]
}[] = [
  {
    period: 'Aug — Sep 2026',
    title: 'AI for All Hackathon — Regional Finalist (Alexandria)',
    text: 'Completed all 3 phases with Team ResiliAfrica: Phase 1 (Virtual Boot Camp & Ideation on disaster risk reduction), Phase 2 (Technical Solution Development & Prototyping SafePathAI with hazard risk scoring, evacuation routing, and AI crisis chat), and Phase 3 (Regional Finals in Alexandria, presenting our live pitch and demo to African Union AYAB-DRR judges).',
    photos: [
      '/images/hackathon/hackathon-delegates.jpg',
      '/images/hackathon/hackathon-team-1.jpg',
      '/images/hackathon/hackathon-mentor.jpg',
      '/images/hackathon/hackathon-selfie.jpg',
      '/images/hackathon/hackathon-speakers.jpg',
    ],
  },
  {
    period: 'Feb 2026',
    title: 'Nile University Competitive Programming Arena (NUCPA)',
    text: 'Participant in the online round with team "Erorr 404", solving algorithmic and data structure problems under competitive time constraints.',
  },
]

export const services = [
  {
    title: 'RAG & AI Chatbot Development',
    benefit: 'Give your customers and team instant, accurate answers drawn from your own documents.',
    icon: 'bot',
  },
  {
    title: 'FastAPI / Backend API Development',
    benefit: 'Fast, secure, well-documented APIs that are ready to scale with your product.',
    icon: 'server',
  },
  {
    title: 'Machine Learning & Computer Vision',
    benefit: 'Turn your data and visual feeds into reliable predictions you can actually use in production.',
    icon: 'brain',
  },
  {
    title: 'Full-Stack Web App Support',
    benefit: 'Fix, extend, and ship features across your frontend and backend without the chaos.',
    icon: 'layers',
  },
] as const

export type Certificate = { title: string; issuer: string; year: string; image: string | null }
export const certificates: Certificate[] = [
  { title: 'HCIA-AI V4.0', issuer: 'Huawei ICT Academy', year: 'Sep 2026', image: '/images/certs/huawei.png' },
  { title: 'AI for All Hackathon — Regional Final', issuer: 'AYAB-DRR, African Union', year: 'Sep 2026', image: '/images/certs/hack-final.png' },
  { title: 'AI for All Hackathon — Virtual Boot Camp', issuer: 'AYAB-DRR, African Union', year: 'Aug 2026', image: '/images/certs/hack-boot.png' },
  { title: 'Introduction to Modern AI', issuer: 'Cisco Networking Academy', year: 'Jul 2026', image: '/images/certs/cisco.png' },
  { title: 'Nile University Competitive Programming Arena (NUCPA)', issuer: 'Nile University & ICPCNU Community (Team Erorr 404)', year: 'Feb 2026', image: '/images/certs/nucpa.png' },
  { title: 'Introduction to Generative AI Studio', issuer: 'Google Cloud', year: 'Mar 2026', image: '/images/certs/gen-ai.png' },
  { title: 'Introduction to Responsible AI', issuer: 'Google Cloud', year: 'Mar 2026', image: '/images/certs/responsible-ai.png' },
  { title: 'Business English Track (Round 3)', issuer: 'MCIT — Digital Egypt Pioneers (OTO Courses)', year: 'Jun — Dec 2025', image: '/images/certs/business-english.png' },
  { title: 'DEPI — Software Development, Software Tester', issuer: 'MCIT, Digital Egypt Pioneers', year: '2025', image: '/images/certs/depi-testing.png' },
]

export const testimonials = [
  {
    quote:
      '[CLIENT QUOTE — e.g. “Mohamed built our document chatbot quickly and explained every step clearly. The result just works.”]',
    name: '[CLIENT NAME]',
    role: '[ROLE] · Upwork',
  },
  {
    quote:
      '[CLIENT QUOTE — e.g. “Clean FastAPI backend, solid documentation, and great communication throughout the project.”]',
    name: '[CLIENT NAME]',
    role: '[ROLE] · Upwork',
  },
  {
    quote:
      '[CLIENT QUOTE — e.g. “He understood what we needed before we finished explaining it. I’d hire him again.”]',
    name: '[CLIENT NAME]',
    role: '[ROLE] · Upwork',
  },
]

export const currentlyLearning = ['MLOps', 'LLM Agents', 'Azure Machine Learning', 'Deep Learning', 'Docker']

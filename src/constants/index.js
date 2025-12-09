const navLinks = [
    {
        name: "About",
        link: "#about",
    },
    {
        name: "Skills",
        link: "#skills",
    },
  {
    name: "Experience",
    link: "#experience",
  },
    {
        name: "Projects",
        link: "#work",
    },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Performance & UX First",
    desc: "Optimizing Lighthouse scores, reducing bundle sizes, and keeping interactions smooth.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Clear Collaboration",
    desc: "Transparent async updates, proactive risk flags, and design-dev alignment.",
  },
  {
    imgPath: "/images/time.png",
    title: "Delivery Discipline",
    desc: "Shipping incrementally with clean architecture so teams can scale fast.",
  },
];

const MY_STACK = {
    frontend: [
        { name: "JavaScript", icon: "/images/logos/js.png" },
        { name: "TypeScript", icon: "/images/logos/ts.png" },
        { name: "React", icon: "/images/logos/react.png" },
        { name: "Next.js", icon: "/images/logos/next.png" },
        { name: "Redux", icon: "/images/logos/redux.png" },
        { name: "Tailwind CSS", icon: "/images/logos/tailwind.png" },
        { name: "GSAP", icon: "/images/logos/gsap.png" },
        { name: "Framer Motion", icon: "/images/logos/framer-motion.png" },
        { name: "Sass", icon: "/images/logos/sass.png" },
        { name: "Bootstrap", icon: "/images/logos/bootstrap.svg" },
    ],

    backend: [
        { name: "Node.js", icon: "/images/logos/node.png" },
        { name: "NestJS", icon: "/images/logos/nest.svg" },
        { name: "Express.js", icon: "/images/logos/express.png" },
    ],

    database: [
        { name: "MySQL", icon: "/images/logos/mysql.svg" },
        { name: "PostgreSQL", icon: "/images/logos/postgreSQL.png" },
        { name: "MongoDB", icon: "/images/logos/mongodb.svg" },
        { name: "Prisma", icon: "/images/logos/prisma.png" },
    ],

    tools: [
        { name: "Git", icon: "/images/logos/git.svg" },
        { name: "Docker", icon: "/images/logos/docker.svg" },
        { name: "AWS", icon: "/images/logos/aws.png" },
    ],
};


const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review: "Building full-stack solutions for startups: CMS sites, shopping apps, and subscription products with React, Node, Firebase, and Vercel/Play Store delivery.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Contract-Based & Freelance Developer",
    date: "Jul 2025 – Present",
    responsibilities: [
      "Delivered responsive websites & mobile apps for startups with React.js, Node.js, Firebase.",
      "Built CMS-based BPO company website and Patel Masala shopping app.",
      "Launched template-based subscription app with full-stack deployments to Vercel/Play Store.",
    ],
  },
  {
    review: "Contributed to GlobalTradePlaza and enterprise apps with React/Next.js, Electron, Node, Tailwind, and SEO/performance improvements.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Full Stack Engineer Trainee – Qualzee Consultancy",
    date: "Nov 2024 – Jul 2025",
    responsibilities: [
      "Built discussion board & calendar scheduler modules for GlobalTradePlaza and work-log systems.",
      "Improved SEO & performance for GlobalTradePlaza using SSR and asset optimizations.",
      "Developed for Dubai law firm and SaaS apps using React.js, Electron.js, Next.js, Node.js, Tailwind CSS.",
    ],
  },
  {
    review: "Built gaming platforms (Royal Mega, betting apps) with live results and responsive dashboards.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Software Developer Intern (React.js) – Codes For Tomorrow",
    date: "Jul 2024 – Sep 2024",
    responsibilities: [
      "Developed gaming/betting platforms with Redux state and API integrations (Royal Mega).",
      "Designed responsive UI and optimized dashboards for speed and stability.",
      "Integrated real-time result APIs to boost engagement and reduce UI lag.",
    ],
  },
  {
    review: "Strengthened Java/MySQL backends with faster queries and improved client-facing UI.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Java Backend Trainee – Ypsilon IT Solutions",
    date: "Feb 2023 – Jul 2023",
    responsibilities: [
      "Implemented backend logic in Java + MySQL and optimized SQL queries for 50% faster execution.",
      "Elevated UI/UX for client portals, increasing satisfaction by ~25%.",
      "Collaborated with cross-functional teams to keep delivery timelines predictable.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Product Manager, B2B Marketplace",
    mentions: "@globaltradeplaza",
    review:
      "Dheeraj lifted our SEO and performance while building new modules. Pages feel faster, and his communication kept the roadmap clear.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Founder, Gaming Platform",
    mentions: "@royalmega",
    review:
      "We shipped faster with Dheeraj. He integrated live results, stabilized dashboards, and kept performance solid under traffic spikes.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Ops Lead, Services Startup",
    mentions: "@bpo-cms",
    review:
      "He delivered a CMS-driven site with clean UI, docs, and handoff. Zero surprises in production — great engineering discipline.",
    imgPath: "/images/client2.png",
  },
];

const projectsShowcase = [
  {
    id: 1,
    title: "GlobalTradePlaza",
    shortDescription: "B2B marketplace with SEO-first SSR and API-driven modules.",
    fullDescription:
      "Comprehensive marketplace connecting importers/exporters. SSR for SEO uplift, REST integrations, and uptime-focused deployments.",
    tech: ["React.js", "Next.js", "Node.js", "Tailwind CSS"],
    url: "https://globaltradeplaza.com/",
    type: "B2B Marketplace",
    features: ["SSR SEO boost", "Supplier directory", "API integrations", "99% uptime"],
  },
  {
    id: 2,
    title: "Royal Mega",
    shortDescription: "Gaming platform with live results and responsive dashboards.",
    fullDescription:
      "Interactive gaming experience with Redux-driven state, live result APIs, and responsive UI for web and mobile.",
    tech: ["React.js", "Redux", "Tailwind CSS"],
    url: "https://www.royalmega.com/",
    type: "Gaming Platform",
    features: ["Live result APIs", "Responsive UI", "State management", "Engagement boost"],
  },
  {
    id: 3,
    title: "Qampus",
    shortDescription: "Communication & work tracking SaaS (Electron + React).",
    fullDescription:
      "Cross-platform desktop app with messaging, calendars, leave management, and productivity tracking.",
    tech: ["React.js", "Node.js", "PostgreSQL", "Electron.js"],
    url: "",
    type: "Desktop SaaS",
    features: ["Real-time messaging", "Calendars", "Meetings", "Lag reduction"],
  },
  {
    id: 4,
    title: "Samaagum",
    shortDescription: "Cross-platform mobile + web app with real-time features.",
    fullDescription:
      "React Native + React.js build with Node/Express backend; responsive layouts and live functionality across devices.",
    tech: ["React Native", "React.js", "Node.js", "Express.js"],
    url: "https://play.google.com/store/apps/details?id=com.samagam",
    type: "Mobile & Web",
    features: ["Cross-platform", "Real-time", "User management", "Responsive design"],
  },
  {
    id: 5,
    title: "Law Firms Management System",
    shortDescription: "Enterprise legal management with invoices and PDF flows.",
    fullDescription:
      "Enterprise platform with responsive UI, invoice systems, complex calculation logic, and PDF viewing/printing (NDA-limited details).",
    tech: ["React.js", "Node.js", "Express.js", "PDF.js", "MySQL"],
    url: "",
    type: "Enterprise",
    features: ["Invoice management", "PDF generation", "Document handling", "Responsive UI"],
  },
];

const certifications = [
  { title: "Foundations of UX Design – Google", year: "2023" },
  { title: "Java Certification – Universal Informatics", year: "2023" },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

export {
  words,
  abilities,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  MY_STACK,
  navLinks,
  projectsShowcase,
  certifications,
};

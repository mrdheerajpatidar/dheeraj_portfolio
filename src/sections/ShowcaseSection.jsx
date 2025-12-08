import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "GlobalTradePlaza – B2B Marketplace",
    cover: "/images/project1.png",
    description:
      "SEO-first B2B marketplace with SSR, resilient API integrations, and uptime-focused deployments.",
    contributions: [
      "Implemented Next.js SSR and caching to boost visibility by ~35% and speed by ~28%.",
      "Integrated REST APIs with error-hardened data fetching and graceful fallbacks.",
      "Built modular UI for catalogs, search, and onboarding to ship new features faster.",
    ],
    tech: ["React.js", "Next.js", "Node.js", "Tailwind CSS"],
    liveUrl: "https://globaltradeplaza.com",
  },
  {
    name: "Royal Mega – Gaming Platform",
    cover: "/images/project2.png",
    description:
      "Responsive gaming platform with live result feeds, Redux state, and optimized dashboards.",
    contributions: [
      "Integrated live-result APIs with Redux for stable real-time updates.",
      "Optimized dashboards for mobile/desktop, cutting UI lag by ~25%.",
      "Hardened error states and loading sequences for uninterrupted gameplay.",
    ],
    tech: ["React.js", "Redux", "Tailwind CSS"],
    liveUrl: null,
  },
  {
    name: "Qampus – Communication & Work Tracking (Electron + React)",
    cover: "/images/project3.png",
    description:
      "Cross-platform desktop app for messaging, meetings, leaves, and productivity tracking.",
    contributions: [
      "Built real-time messaging, calendar, and leave workflows with React + Node.",
      "Reduced app lag by ~30% through profiling, memoization, and IPC optimizations.",
      "Designed modular UI for quick feature additions without regressions.",
    ],
    tech: ["Electron.js", "React.js", "Node.js", "PostgreSQL"],
    liveUrl: null,
  },
];

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [selected, setSelected] = useState(null);

  useGSAP(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 });

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.2 * (index + 1),
          scrollTrigger: { trigger: card, start: "top bottom-=100" },
        }
      );
    });
  }, []);

  const closeModal = () => setSelected(null);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div className="first-project-wrapper">
            <div className="image-wrapper">
              <img src={projects[0].cover} alt={projects[0].name} />
            </div>
            <div className="text-content">
              <h2>{projects[0].name}</h2>
              <p className="text-white-50 md:text-xl">{projects[0].description}</p>
              <div className="flex flex-wrap gap-2">
                {projects[0].tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelected(projects[0])}
                className="mt-4 px-4 py-2 rounded-lg bg-white text-black hover:bg-white/80 transition"
              >
                View details
              </button>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            {projects.slice(1).map((project, idx) => (
              <div
                key={project.name}
                className="project"
                ref={(el) => (cardsRef.current[idx] = el)}
              >
                <div className="image-wrapper bg-[#0f1625]">
                  <img src={project.cover} alt={project.name} />
                </div>
                <h2>{project.name}</h2>
                <p className="text-white-50 text-sm mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelected(project)}
                  className="mt-4 px-4 py-2 rounded-lg bg-white text-black hover:bg-white/80 transition"
                >
                  View details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur" onClick={closeModal}>
          <div
            className="relative max-w-3xl w-[90%] bg-black-100 border border-white/10 rounded-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white-50 hover:text-white"
              onClick={closeModal}
              aria-label="Close project details"
            >
              ✕
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h3 className="text-2xl font-semibold">{selected.name}</h3>
                {selected.liveUrl ? (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-white text-black hover:bg-white/80 transition"
                  >
                    Live
                  </a>
                ) : (
                  <span className="px-4 py-2 rounded-lg border border-white/20 text-white-50 text-sm">
                    Live link on request
                  </span>
                )}
              </div>

              <p className="text-white-50">{selected.description}</p>

              <div className="flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                    {t}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                {selected.contributions.map((item) => (
                  <p key={item} className="text-sm text-white-50">• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShowcase;

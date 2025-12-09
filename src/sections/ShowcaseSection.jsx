import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader";
import { projectsShowcase } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    gsap.utils.toArray(".showcase-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.1 * index,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  const handleOpen = (project) => setSelected(project);
  const handleClose = () => setSelected(null);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <TitleHeader title="Projects Built with Impact" sub="🚀 Live products across B2B, gaming, SaaS, and enterprise" />
        <div className="mt-12 grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projectsShowcase.map((project) => (
            <button
              key={project.id}
              className="project showcase-card text-left card-border bg-black/70 backdrop-blur rounded-2xl p-4 md:p-5 transition-transform duration-300 hover:-translate-y-2 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              onClick={() => handleOpen(project)}
            >
              <div className="relative overflow-hidden rounded-xl bg-[#0f1624] aspect-video">
                <img
                  src={`/images/project${project.id <= 3 ? project.id : 3}.png`}
                  alt={project.title}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg md:text-xl font-semibold">{project.title}</h2>
                  <span className="text-xs uppercase tracking-[0.15em] text-blue-50">{project.type}</span>
                </div>
                <p className="text-white-50 text-sm md:text-base leading-relaxed">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur" onClick={handleClose} />
          <div className="relative max-w-3xl w-full card-border bg-black/85 rounded-3xl p-6 md:p-8 space-y-4 overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-blue-50 uppercase tracking-[0.2em]">{selected.type}</p>
                <h3 className="text-2xl font-semibold">{selected.title}</h3>
                <p className="text-white-50 mt-2">{selected.shortDescription}</p>
              </div>
              <button onClick={handleClose} className="text-white-50 hover:text-white text-xl">✕</button>
            </div>
            <div className="rounded-2xl overflow-hidden bg-[#0f1624]">
              <img
                src={`/images/project${selected.id <= 3 ? selected.id : 3}.png`}
                alt={selected.title}
                className="w-full h-64 object-cover"
              />
            </div>
            <p className="text-white leading-relaxed">{selected.fullDescription}</p>
            <div className="flex flex-wrap gap-2">
              {selected.tech.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                  {tech}
                </span>
              ))}
            </div>
            {selected.features && (
              <div className="flex flex-wrap gap-2">
                {selected.features.map((feature) => (
                  <span key={feature} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white-50">
                    {feature}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-3 flex-wrap">
              {selected.url && (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-white text-black font-semibold"
                >
                  Live
                </a>
              )}
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border border-white/30 text-white-50 hover:border-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShowcase;

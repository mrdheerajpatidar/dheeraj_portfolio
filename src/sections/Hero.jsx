import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "../components/Button";
import HeroExperience from "../components/models/hero_models/HeroExperience";
import { DecryptedText, StarBorder } from "../components/reactBits/ReactBits.jsx";

const keySkills = [
  "React & Next.js",
  "TypeScript",
  "High-performance UI",
  "API Integrations",
  "SEO-first builds",
];

const Hero = () => {
  const [disabled, setDisabled] = useState(false);
  const glowOne = useRef(null);
  const glowTwo = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-headline",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: "power3.out" },
    );

    gsap.fromTo(
      ".hero-chip",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: "power2.out", delay: 0.4 },
    );
  }, []);

  useEffect(() => {
    const handleParallax = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;

      if (glowOne.current) gsap.to(glowOne.current, { x: x * 0.6, y: y * 0.4, duration: 0.8, ease: "power3.out" });
      if (glowTwo.current) gsap.to(glowTwo.current, { x: -x * 0.4, y: -y * 0.3, duration: 0.9, ease: "power3.out" });
      if (cardRef.current) gsap.to(cardRef.current, { x: x * 0.2, y: y * 0.2, duration: 0.8, ease: "power2.out" });
    };

    window.addEventListener("pointermove", handleParallax);
    return () => window.removeEventListener("pointermove", handleParallax);
  }, []);

  const handleClick = () => {
    if (disabled) return;
    setDisabled(true);
    setTimeout(() => setDisabled(false), 2000);
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <div ref={glowOne} className="hero-glow hero-glow--one" aria-hidden />
      <div ref={glowTwo} className="hero-glow hero-glow--two" aria-hidden />

      <div className="hero-layout">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 gap-6">
          <div className="hero-badge magnet">
            <span className="text-sm">Indore, India · Frontend-focused Full Stack Developer</span>
          </div>

          <div className="hero-text gap-3">
            <h1 className="hero-headline">Hi, I’m <span className="gradient-text">Dheeraj Patidar</span></h1>
            <h1 className="hero-headline">I build fast, reliable product experiences</h1>
            <h1 className="hero-headline">with modern web tech.</h1>
          </div>

          <div className="text-white-50 md:text-xl relative z-10 leading-relaxed max-w-3xl">
            <DecryptedText
              text="Frontend-focused Full Stack developer with 1.5+ years delivering scalable, resilient, and design-forward web apps."
              className="text-white-50 md:text-xl relative z-10"
              encryptedClassName="encrypted"
              parentClassName="inline-block"
              animateOn="view"
              sequential
            />
            <br />
            <DecryptedText
              text="I ship production-ready experiences in React/Next.js, optimize performance by up to 40%, and keep teams unblocked with clean architectures."
              className="text-white-50 md:text-xl relative z-10"
              encryptedClassName="encrypted"
              parentClassName="inline-block"
              animateOn="view"
              sequential
            />
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4">
            {keySkills.map((item) => (
              <span key={item} className="hero-chip">
                {item}
              </span>
            ))}
          </div>

          <div className="flex md:flex-row flex-col gap-4 md:gap-6 items-start md:items-center">
            <StarBorder as="button" className="custom-class" color="cyan" speed="5s">
              <a
                href="/resume/Dheeraj_Patidar_Resume.pdf"
                download="Dheeraj-Resume"
                onClick={handleClick}
                className={`${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="inner md:py-1 md:px-3.5">
                  {!disabled ? <span className="inline">Download Resume</span> : <span className="animate-pulse py-1 px-6">Please wait...</span>}
                </div>
              </a>
            </StarBorder>

            <Button text="See My Work" className="w-64 h-14 md:inline flex magnet" href="#work" />
          </div>

          <div
            ref={cardRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-3xl mt-2 card-border rounded-2xl p-4 md:p-6 bg-black/60 backdrop-blur"
          >
            <div className="stat-chip">
              <p className="stat-number">1.5+</p>
              <p className="stat-label">Years building web apps</p>
            </div>
            <div className="stat-chip">
              <p className="stat-number">10+</p>
              <p className="stat-label">Products shipped (gaming, B2B, SaaS)</p>
            </div>
            <div className="stat-chip">
              <p className="stat-number">40%</p>
              <p className="stat-label">Performance gains on recent projects</p>
            </div>
          </div>
        </header>

        <figure className="relative">
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Hero;

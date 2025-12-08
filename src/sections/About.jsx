import React from "react";
import { BlurText } from "../components/reactBits/ReactBits.jsx";

const summary = [
  "Frontend-focused Full Stack Developer with 1.5+ years building scalable, high-performance products.",
  "Specialized in React/Next.js, performant UI, and API-driven experiences with clean architecture.",
  "Delivered 10+ launches across gaming, B2B, and SaaS; improved app performance by up to 40%.",
];

const primarySkills = [
  "React.js", "Next.js", "Redux", "TypeScript", "Tailwind CSS", "Bootstrap",
  "Java", "REST APIs", "MySQL", "Sequelize", "Git", "Postman",
];

const additionalSkills = [
  "Node.js", "Express.js", "PostgreSQL", "Firebase", "Electron.js",
  "C / C++ / Java", "Responsive design", "SEO optimization", "Agile execution",
];

const education = [
  { label: "B.Sc. Computer Science – 2022", place: "Mahatma Gandhi College, Sehore" },
  { label: "Higher Secondary – 2018", place: "Sahara Public School, Kalapipal (MP Board)" },
  { label: "High School – 2016", place: "Sahara Public School, Kalapipal (CBSE)" },
];

const certifications = [
  { name: "Foundations of UX Design – Google (2023)" },
  { name: "Java Certification – Universal Informatics (2023)" },
];

const About = () => {
  return (
    <section id="about" className="relative w-full px-5 md:px-16 xl:px-24 py-16 md:py-24">
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(64,255,170,0.1),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(64,121,255,0.12),transparent_26%)]" />

      <div className="relative">
        <div className="w-full mb-10">
          <BlurText
            text="I build fast, reliable, and purposeful interfaces backed by clean engineering."
            delay={50}
            animateBy="words"
            direction="top"
            className="md:text-4xl text-2xl leading-8 md:leading-[3rem] space-x-1"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-1">
            <div className="about-photo">
              <div className="about-photo__frame">
                <img src="/images/me/img1.jpg" alt="Dheeraj Patidar" className="about-photo__img" />
              </div>
              <div className="about-photo__meta">
                <p className="text-sm text-blue-50 uppercase tracking-[0.25em]">Dheeraj Patidar</p>
                <p className="text-lg font-semibold">Frontend-focused Full Stack Developer</p>
                <p className="text-blue-50">Indore, India · Open to remote</p>
                <p className="text-white-50 mt-2">📧 dheerajpatidar.developer@gmail.com</p>
                <p className="text-white-50">📞 7389276575</p>
                <p className="text-white-50">🔗 linkedin.com/in/dheerajpatidar1712</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="card-border rounded-2xl p-6 md:p-8 bg-black/60 backdrop-blur">
              <h3 className="text-2xl font-semibold mb-4">Summary</h3>
              <div className="flex flex-col gap-3 text-white-50 leading-relaxed">
                {summary.map((point) => (
                  <p key={point} className="text-base md:text-lg">{point}</p>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-border rounded-2xl p-6 bg-black/60 backdrop-blur">
                <h4 className="text-xl font-semibold mb-3">Primary Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {primarySkills.map((item) => (
                    <span key={item} className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-border rounded-2xl p-6 bg-black/60 backdrop-blur">
                <h4 className="text-xl font-semibold mb-3">Additional Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {additionalSkills.map((item) => (
                    <span key={item} className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-border rounded-2xl p-6 bg-black/60 backdrop-blur">
                <h4 className="text-xl font-semibold mb-3">Education</h4>
                <div className="flex flex-col gap-3 text-white-50">
                  {education.map((item) => (
                    <div key={item.label}>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-sm text-blue-50">{item.place}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-border rounded-2xl p-6 bg-black/60 backdrop-blur">
                <h4 className="text-xl font-semibold mb-3">Certifications</h4>
                <div className="flex flex-col gap-3 text-white-50">
                  {certifications.map((cert) => (
                    <p key={cert.name}>{cert.name}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

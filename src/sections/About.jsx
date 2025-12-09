import React from "react";
import { BlurText } from "../components/reactBits/ReactBits.jsx";
import { certifications } from "../constants";

const summaryPoints = [
  "Frontend-focused Full Stack Developer (Indore, India) with 1.5+ years experience.",
  "Shipped 10+ real products across gaming, B2B, and SaaS with React/Next.js and Node.",
  "Performance-minded: improved app speed by up to 40% via clean architecture and profiling.",
  "Strong in responsive UI, API integration, state management, and client communication.",
];

const About = () => {
  return (
    <section id="about" className="relative w-full px-5 md:px-16 xl:px-24 py-16 md:py-24">
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(64,255,170,0.1),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(64,121,255,0.12),transparent_26%)]" />

      <div className="relative">
        <div className="w-full mb-10">
          <BlurText
            text="Clean, fast, and purposeful experiences that feel premium and stay reliable."
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
              <div className="about-photo__meta space-y-2">
                <p className="text-sm text-blue-50 uppercase tracking-[0.25em]">Dheeraj Patidar</p>
                <p className="text-lg font-semibold">Frontend-focused Full Stack Developer</p>
                <div className="text-white-50 text-sm space-y-1">
                  <p>📞 7389276575</p>
                  <p>📧 dheerajpatidar.developer@gmail.com</p>
                  <p>📍 Indore, India</p>
                  <p>🔗 linkedin.com/in/dheerajpatidar1712</p>
                  <p>🌐 dheeraj-portfolio-one.vercel.app</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="card-border rounded-2xl p-6 md:p-8 bg-black/60 backdrop-blur">
              <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
              <div className="flex flex-col gap-3 text-white-50 leading-relaxed">
                {summaryPoints.map((point) => (
                  <p key={point} className="text-base md:text-lg">{point}</p>
                ))}
              </div>
            </div>

            <div className="card-border rounded-2xl p-6 bg-black/60 backdrop-blur">
              <h4 className="text-xl font-semibold mb-3">Education & Certifications</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold">B.Sc. Computer Science – 2022</p>
                  <p className="text-sm text-white-50">Mahatma Gandhi College, Sehore</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold">Higher Secondary – 2018</p>
                  <p className="text-sm text-white-50">Sahara Public School, Kalapipal (MP Board)</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold">High School – 2016</p>
                  <p className="text-sm text-white-50">Sahara Public School, Kalapipal (CBSE)</p>
                </div>
                {certifications.map((cert) => (
                  <div key={cert.title} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-semibold">{cert.title}</p>
                    <p className="text-sm text-white-50">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

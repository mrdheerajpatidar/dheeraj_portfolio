import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";
import {DecryptedText, StarBorder} from "../components/reactBits/ReactBits.jsx";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });
    const [disabled, setDisabled] = useState(false);

    const handleClick = () => {
        if (disabled) return;

        setDisabled(true);

        // Re-enable after 2 sec (enough for browser to start download)
        setTimeout(() => setDisabled(false), 2000);
    };

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>



              <div className="text-white-50 md:text-xl relative z-10 leading-relaxed">
                  <DecryptedText
                      text="Hi, I’m Dheeraj, a developer committed to building reliable, "
                      className="text-white-50 md:text-xl relative z-10"
                      encryptedClassName="encrypted"
                      parentClassName="inline-block"
                      animateOn="view"
                      sequential
                  />
                  <br/>
                  <DecryptedText
                      text="scalable,and beautifully crafted digital products."
                      className="text-white-50 md:text-xl relative z-10"
                      encryptedClassName="encrypted"
                      parentClassName="inline-block"
                      animateOn="view"
                      sequential
                  />
              </div>

              <span className="flex md:flex-row flex-col gap-3 md:gap-7 ps-2 ">
    <StarBorder
        as="button"
        className="custom-class"
        color="cyan"
        speed="5s"
    >
<a
    href="/resume/Dheeraj_Patidar_Resume.pdf"
    download="Dheeraj-Resume"
    onClick={handleClick}
    className={`
        
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
>
      <div className="inner md:py-1 md:px-3.5">
        {!disabled ? (
            <>

                <span className="inline ">Download Resume</span>
            </>
        ) : (
            <span className="animate-pulse py-1 px-6">Please wait...</span>
        )}
      </div>
    </a>
</StarBorder>

    <Button
              text="See My Work"
              className=" w-64 h-14 md:inline hidden"
              href="#work"

            />

</span>
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>


    </section>
  );
};

export default Hero;

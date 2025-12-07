import React from 'react'
import {BlurText, DecayCard, ScrollVelocity} from "../components/reactBits/ReactBits.jsx";


const About = () => {
    return (
        <>
            <div id="about"  className="about-section font-serif">
                <div className="w-full">
                    <BlurText
                        text="❝ I believe in a user centered design approach, ensuring that every project I work on is tailored to meet the specific needs of its users ❞"
                        delay={50}
                        animateBy="words"
                        direction="top"
                        className="md:text-3xl text-2xl leading-8 md:leading-12 space-x-1"
                    />
                </div>
                <div className="self-intro ">
                    <span className="its-me">
                        <ScrollVelocity
                            texts={["🙏🏼 Namaskaram i'm."]}
                            velocity={100}
                            className="custom-scroll-text "
                        />
                        </span>
                    <div className="self-seprater"></div>
                    <div className="self-profile">
                        <div className="self-profile-img">
                            <span className="name">
                            {/*<DecayCard width={200} height={300} image="/images/me/img1.jpg" alt="Dheeraj's Photo"></DecayCard>*/}
                            <DecayCard width={400} height={300} image="/images/me/img1.jpg">
                                <h2 className="name-inside-card">Dheeraj<br/>Patidar</h2>
                            </DecayCard>
                                 </span>
                        </div>

                        <div className="self-desc">
                            <span className="self-bio">a frontend web developer dedicated to turning ideas into creative solutions. I specialize in creating seamless and intuitive user experiences.
                            <br/>
                            <br/>
                            My approach focuses on creating scalable, high-performing solutions tailored to both user needs and business objectives. By prioritizing performance, accessibility, and responsiveness, I strive to deliver experiences that not only engage users but also drive tangible results.
                            </span>

                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
export default About

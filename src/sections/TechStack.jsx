import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {MY_STACK} from "../constants/index.js";
import TitleHeader from "../components/TitleHeader.jsx";

gsap.registerPlugin(ScrollTrigger);
const TechStack = () => {
    const containerRef = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 80%",
                    scrub: 0.5,
                },
            });

            tl1.from(".slide-up", {
                opacity: 0,
                y: 40,
                stagger: 0.3,
                ease: "none",
            });

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "bottom 50%",
                    end: "bottom 10%",
                    scrub: 1,
                },
            });

            tl2.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);


    return (

            <section className="skill-section"  id="my-stack" ref={containerRef}>
                <div className="container mx-auto px-4">

                    <div className="skill-title">
                        <TitleHeader
                            title="How I Can Contribute & My Key Skills"
                            sub="🤝 What I Bring to the Table"
                        />
                    </div>
                    <div className="space-y-20">
                        {Object.entries(MY_STACK).map(([category, items]) => (
                            <div className="grid sm:grid-cols-12" key={category}>
                                {/* Category Title */}
                                <div className="sm:col-span-5">
                                    <p className="slide-up text-5xl font-bold text-gray-400 uppercase">
                                        {category}
                                    </p>
                                </div>

                                {/* Items */}
                                <div className="sm:col-span-7 flex flex-wrap gap-x-11 gap-y-9">
                                    {items.map((item) => (
                                        <div
                                            className="slide-up flex gap-3.5 items-center"
                                            key={item.name}
                                        >
                                            <img
                                                src={item.icon}
                                                alt={item.name}
                                                width="40"
                                                height="40"
                                                className="max-h-10"
                                            />

                                            <span className="text-2xl capitalize">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


    );
};

export default TechStack;

import React from 'react'

import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiRedux,
    SiHtml5,
    SiCss3,
    SiBootstrap,
    SiMysql,
    SiSequelize,
    SiGithub,
    SiPostman,
    SiVercel,
    SiNetlify,
} from "react-icons/si";
import {LogoLoop} from "../components/reactBits/ReactBits.jsx";


const LogoShowcase = () => {


    const techLogos = [
        { node: <SiReact />, title: "React", href: "https://react.dev" },
        { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
        { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
        { node: <SiRedux />, title: "Redux", href: "https://redux.js.org" },
        { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { node: <SiBootstrap />, title: "Bootstrap", href: "https://getbootstrap.com" },
        { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
        { node: <SiSequelize />, title: "Sequelize", href: "https://sequelize.org" },
        { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
        { node: <SiPostman />, title: "Postman", href: "https://www.postman.com" },
        { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
        { node: <SiNetlify />, title: "Netlify", href: "https://www.netlify.com" },
    ];



    // const imageLogos = [
    //     { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
    //     { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
    //     { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
    // ];
    return (
        <div className="logo-showcase-sider">
            <div style={{ height: '80px', position: 'relative', overflow: 'hidden'}}>

                <LogoLoop
                    logos={techLogos}
                    speed={120}
                    direction="left"
                    logoHeight={48}
                    gap={40}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#000000"
                    ariaLabel="Technology partners"
                />
            </div>
        </div>
    )
}
export default LogoShowcase

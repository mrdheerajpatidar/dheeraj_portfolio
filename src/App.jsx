import { useState } from "react";

import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import About from "./sections/About.jsx";
import Preloader from "./components/Preloader.jsx";
import CustomCursor from "./components/CustomCursor.jsx";


const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            <CustomCursor disabled={isLoading} />
            <Navbar locked={isLoading} />
            <Hero />
            <About />
            <LogoShowcase />
            <TechStack />
            <ShowcaseSection />
            <FeatureCards />
            <Experience />
            <Testimonials />
            <Contact />
            <Footer />
        </>
    );
};

export default App;

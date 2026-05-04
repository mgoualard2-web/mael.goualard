import React, { useEffect } from "react";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Passions from "./sections/Passions";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const Portfolio = () => {
  useEffect(() => {
    // Simple intersection observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F1B2D]">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Passions />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;

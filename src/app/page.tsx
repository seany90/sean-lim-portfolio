import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-primaryBg selection:bg-accent/30 selection:text-textMain">
      <Navigation />
      
      {/* Sections */}
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certificates />
      <Contact />
      
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-volumetric-gradient opacity-60"></div>
    </main>
  );
}

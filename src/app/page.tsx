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
    <main className="relative min-h-screen bg-black selection:bg-accent/30 selection:text-textMain">
      <Navigation />
      
      {/* Global Background Effects for Main Content */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-volumetric-gradient opacity-60"></div>

      {/* 
        MAIN CONTENT WRAPPER 
        Sits on top (z-10), has a solid background to hide the footer.
        Scrolls normally and eventually reveals the sticky footer underneath.
      */}
      <div className="relative z-10 bg-primaryBg pb-12 shadow-[0_30px_60px_rgba(0,0,0,1)] rounded-b-[40px] md:rounded-b-[80px]">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certificates />
      </div>

      {/* 
        CURTAIN REVEAL FOOTER 
        Sticks to the bottom of the screen (z-0), waiting to be revealed 
        when the main content wrapper scrolls completely past it.
      */}
      <div className="sticky bottom-0 left-0 w-full z-0 h-screen">
        <Contact />
      </div>
      
    </main>
  );
}

'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const skills = [
  "React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", 
  "Firebase", "Git/GitHub", "Linux", 
  "Software System Testing", "Data Validation", "Workflow Optimization", "SAP",
  "AI", "UX"
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const bubbles = containerRef.current.children;
      
      Array.from(bubbles).forEach((bubble, i) => {
        gsap.to(bubble, {
          y: "-=20",
          duration: 2 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random() * 2
        });
      });
    }
  }, []);

  return (
    <section id="skills" className="relative min-h-screen py-32 px-8 md:px-24 flex flex-col items-center justify-center">
      <h2 className="font-heading text-4xl md:text-6xl mb-24 text-center">Core Competencies</h2>
      
      <div ref={containerRef} className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto perspective-[1000px]">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="glass-panel px-6 py-4 rounded-full font-display text-sm tracking-widest text-textMain hover:text-primaryBg hover:bg-accent transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(113,231,255,0)] hover:shadow-[0_0_25px_rgba(113,231,255,0.6)] transform hover:scale-110"
            style={{
              transform: `translateZ(${(index * 17) % 50}px)`
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && lidRef.current && laptopRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 1,
        }
      });

      // Animate lid opening
      tl.fromTo(lidRef.current, 
        { rotateX: 90 },
        { rotateX: 0, duration: 1, ease: "power2.inOut" }
      );

      // Scale up laptop
      tl.to(laptopRef.current, {
        scale: 1.1,
        y: -50,
        duration: 1,
        ease: "power2.out"
      }, "<");
    }
  }, []);

  return (
    <section id="projects" className="relative min-h-screen py-32 px-8 md:px-24 flex flex-col items-center justify-center overflow-hidden">
      <h2 className="font-heading text-4xl md:text-6xl mb-24 text-center">Selected Work</h2>
      
      <div ref={containerRef} className="w-full max-w-5xl flex flex-col items-center">
        
        {/* Project Info */}
        <div className="w-full text-center mb-16 z-10">
          <h3 className="font-heading text-3xl md:text-5xl text-accent mb-4 tracking-widest">AUTOAPPLYAI</h3>
          <p className="font-body text-textSecondary max-w-2xl mx-auto mb-8">
            Independently engineered and shipped a functional software application from concept to product. 
            Demonstrated strong capability in system logic, software testing, and data validation.
          </p>
          <div className="flex gap-4 justify-center">
            <span className="glass-panel px-4 py-2 rounded-full text-xs font-display tracking-wider">Google AI Studio</span>
            <span className="glass-panel px-4 py-2 rounded-full text-xs font-display tracking-wider">Firebase</span>
          </div>
        </div>

        {/* CSS 3D Laptop Mockup */}
        <div ref={laptopRef} className="relative w-full max-w-3xl aspect-video perspective-[1500px]">
          
          {/* Laptop Lid */}
          <div ref={lidRef} className="absolute inset-0 origin-bottom transform-style-3d bg-secondaryBg border-2 border-white/10 rounded-t-3xl overflow-hidden shadow-[0_-20px_50px_rgba(113,231,255,0.1)] flex flex-col">
            <div className="w-full h-4 bg-primaryBg/50 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
            </div>
            <div className="flex-1 bg-black relative p-2">
              <div className="absolute inset-2 border border-white/5 rounded overflow-hidden">
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-primaryBg to-primaryBg flex flex-col items-center justify-center text-center p-4 sm:p-8">
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
                    <div className="font-heading text-2xl sm:text-3xl text-textMain animate-pulse">System Active</div>
                    <div className="glass-panel px-3 py-1.5 rounded-lg text-left border border-accent/20 bg-accent/5">
                      <div className="text-[10px] text-textSecondary uppercase tracking-wider mb-0.5">Response Rate</div>
                      <div className="text-sm font-display font-bold text-accent leading-none">98.4%</div>
                    </div>
                  </div>

                  <div className="font-mono text-[10px] sm:text-xs text-success/70 max-w-md text-left">
                    <div>{'>'} Initializing AI Engine...</div>
                    <div>{'>'} Connecting to Firebase...</div>
                    <div>{'>'} Workflow optimization: 100%</div>
                    <div>{'>'} Status: Operational</div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Base */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-white/5 rounded-b-xl translate-y-full transform-style-3d shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-white/10 rounded-b-md"></div>
          </div>

        </div>

      </div>
    </section>
  );
}

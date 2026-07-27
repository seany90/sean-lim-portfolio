'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  // AUTOAPPLYAI Refs
  const containerRef1 = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);

  // GOD'S EYE Refs
  const containerRef2 = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // --- AUTOAPPLYAI Animation ---
    if (containerRef1.current && lidRef.current && laptopRef.current) {
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef1.current,
          start: "top 60%",
          end: "center center",
          scrub: 1,
        }
      });

      tl1.fromTo(lidRef.current, 
        { rotateX: 90 },
        { rotateX: 0, duration: 1, ease: "power2.inOut" }
      );

      tl1.to(laptopRef.current, {
        scale: 1.1,
        y: -50,
        duration: 1,
        ease: "power2.out"
      }, "<");
    }

    // --- GOD'S EYE Animation ---
    if (containerRef2.current && videoCardRef.current && videoRef.current) {
      
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef2.current,
          start: "top bottom", // Starts as soon as it enters the bottom of the screen
          end: "bottom top", // Ends only when it completely leaves the top of the screen
          scrub: 1,
          onEnter: () => videoRef.current?.play(),
          onLeave: () => videoRef.current?.pause(),
          onEnterBack: () => videoRef.current?.play(),
          onLeaveBack: () => videoRef.current?.pause(),
        }
      });

      tl2.fromTo(videoCardRef.current,
        { scale: 0.9, rotateX: 15, y: 50, opacity: 0.8 },
        { scale: 1.1, rotateX: 0, y: -20, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <section id="projects" className="relative min-h-screen py-32 px-8 md:px-24 flex flex-col items-center justify-center overflow-hidden">
      <h2 className="font-heading text-4xl md:text-6xl mb-24 text-center">Selected Work</h2>
      
      {/* =========================================
          PROJECT 1: AUTOAPPLYAI
      ========================================= */}
      <div ref={containerRef1} className="w-full max-w-5xl flex flex-col items-center mb-40">
        
        {/* Project Info */}
        <div className="w-full text-center mb-16 z-10">
          <h3 className="font-heading text-3xl md:text-5xl text-accent mb-4 tracking-widest">AUTOAPPLYAI</h3>
          <p className="font-body text-textSecondary max-w-2xl mx-auto mb-8">
            Independently engineered and shipped a functional software application from concept to product. 
            Demonstrated strong capability in system logic, software testing, and data validation.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <span className="glass-panel px-4 py-2 rounded-full text-xs font-display tracking-wider">Google AI Studio</span>
            <span className="glass-panel px-4 py-2 rounded-full text-xs font-display tracking-wider">Firebase</span>
          </div>
        </div>

        {/* CSS 3D Laptop Mockup */}
        <div ref={laptopRef} className="relative w-full max-w-3xl aspect-[4/3] sm:aspect-video perspective-[1500px]">
          {/* Laptop Lid */}
          <div ref={lidRef} className="absolute inset-0 origin-bottom transform-style-3d bg-secondaryBg border-2 border-white/10 rounded-t-xl sm:rounded-t-3xl overflow-hidden shadow-[0_-20px_50px_rgba(113,231,255,0.1)] flex flex-col">
            <div className="w-full h-3 sm:h-4 bg-primaryBg/50 flex items-center justify-center">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/20"></div>
            </div>
            <div className="flex-1 bg-black relative p-1 sm:p-2">
              <div className="absolute inset-1 sm:inset-2 border border-white/5 rounded overflow-hidden">
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-primaryBg to-primaryBg flex flex-col items-center justify-center text-center p-2 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6 mb-2 sm:mb-6">
                    <div className="font-heading text-lg sm:text-3xl text-textMain animate-pulse">System Active</div>
                    <div className="glass-panel px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-left border border-accent/20 bg-accent/5">
                      <div className="text-[8px] sm:text-[10px] text-textSecondary uppercase tracking-wider mb-0.5">Response Rate</div>
                      <div className="text-xs sm:text-sm font-display font-bold text-accent leading-none">98.4%</div>
                    </div>
                  </div>
                  <div className="font-mono text-[9px] sm:text-xs text-success/70 max-w-md text-left leading-tight sm:leading-normal">
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

      {/* =========================================
          PROJECT 2: GOD'S EYE
      ========================================= */}
      <div ref={containerRef2} className="w-full max-w-5xl flex flex-col items-center mt-20">
        
        {/* Project Info */}
        <div className="w-full text-center mb-16 z-10">
          <h3 className="font-heading text-3xl md:text-5xl text-accent mb-4 tracking-widest uppercase">GOD'S EYE</h3>
          <p className="font-body text-textSecondary max-w-2xl mx-auto mb-8">
            Architected a state-of-the-art cybersecurity Software as a Service (SaaS) landing page template. 
            Engineered immersive WebGL 3D visualizations, interactive data nodes, and fluid scroll-triggered animations 
            to deliver a premium, high-tech user experience that commands trust and authority.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <span className="glass-panel px-4 py-2 rounded-full text-xs font-display tracking-wider">React</span>
            <span className="glass-panel px-4 py-2 rounded-full text-xs font-display tracking-wider">Three.js</span>
            <span className="glass-panel px-4 py-2 rounded-full text-xs font-display tracking-wider">Framer Motion</span>
            <span className="glass-panel px-4 py-2 rounded-full text-xs font-display tracking-wider">Tailwind CSS</span>
          </div>
          
          <a 
            href="https://seany90.github.io/godseye-landing-page/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block glass-panel px-8 py-4 rounded-lg font-display tracking-widest text-textMain hover:text-accent hover:border-accent/50 transition-all duration-300"
          >
            LAUNCH TEMPLATE
          </a>
        </div>

        {/* Floating Video Card */}
        <div className="perspective-[1500px] w-full max-w-4xl">
          <div ref={videoCardRef} className="relative w-full glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col">
            
            {/* Header bar */}
            <div className="w-full h-8 sm:h-10 bg-primaryBg/80 backdrop-blur flex items-center px-4 shrink-0 border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              </div>
              <div className="mx-auto text-[10px] sm:text-xs font-display tracking-widest text-textSecondary/50 uppercase">
                seany90.github.io/godseye-landing-page/
              </div>
            </div>

            {/* Video Container */}
            <div className="w-full bg-black relative">
              {/* Very subtle glow overlay, reduced so it doesn't hide text */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(113,231,255,0.1)] z-10" />
              
              <video 
                ref={videoRef}
                src="/GOD's EYE.mp4" 
                muted 
                playsInline
                loop
                className="w-full h-auto block opacity-90"
              />
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

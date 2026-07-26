'use client'
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Certificates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      return; // Disable 3D tilt on touch devices
    }

    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="certificates" className="relative min-h-screen py-32 px-8 md:px-24 flex flex-col items-center justify-center">
      <h2 className="font-heading text-4xl md:text-6xl mb-12 md:mb-24 text-center">Accreditations</h2>
      
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        onClick={() => setIsModalOpen(true)}
        className="relative w-full max-w-xl h-auto md:aspect-[1.414] glass-panel rounded-xl cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="relative md:absolute md:inset-0 p-8 md:p-12 flex flex-col items-center justify-center text-center border border-white/5 rounded-xl bg-gradient-to-br from-white/5 to-transparent w-full h-auto md:h-full"
        >
          <div className="w-16 h-16 md:w-16 md:h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(113,231,255,0.4)] md:group-hover:scale-110 transition-transform duration-500">
            <span className="font-display text-accent text-2xl font-bold">G</span>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl mb-2 text-textMain tracking-wide">Google AI Professional</h3>
          <p className="font-body text-accent tracking-widest uppercase text-xs mb-8">Certificate by Coursera</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-2 text-xs font-body text-textSecondary opacity-70">
            <div>• AI Fundamentals</div>
            <div>• Content Creation</div>
            <div>• Brainstorming & Planning</div>
            <div>• Data Analysis</div>
            <div>• Research & Insights</div>
            <div>• App Building</div>
            <div>• Writing & Communicating</div>
          </div>
          
          <div className="mt-8 text-xs font-display tracking-widest text-textSecondary opacity-50 uppercase">
            Completed Jul 7, 2026
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-8"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl h-[80vh] bg-secondaryBg rounded-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-textMain hover:text-accent z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <iframe 
              src="/Coursera R2RLUQWTLD22.pdf" 
              className="w-full h-full"
              title="Google AI Professional Certificate"
            />
          </div>
        </div>
      )}
    </section>
  );
}

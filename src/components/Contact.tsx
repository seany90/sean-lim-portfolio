'use client'
import { FiMail, FiLinkedin, FiDownload } from 'react-icons/fi';

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-screen py-32 px-8 md:px-24 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Abstract Animated Globe Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 animate-[spin_60s_linear_infinite] opacity-30 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 w-[2px] h-[600px] bg-white/5 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 w-[600px] h-[2px] bg-white/5 -translate-y-1/2"></div>
        <div className="absolute inset-10 rounded-full border border-accent/20 border-dashed animate-[spin_40s_linear_infinite_reverse]"></div>
        <div className="absolute inset-20 rounded-full border border-white/5"></div>
      </div>

      <div className="relative z-10 glass-panel p-6 sm:p-12 md:p-24 rounded-3xl max-w-3xl w-full text-center">
        <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl mb-8">Let&apos;s build something <span className="text-accent">extraordinary.</span></h2>
        
        <p className="font-body text-textSecondary text-lg max-w-xl mx-auto mb-16">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a href="mailto:contact@seanlim.com" className="group flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-accent transition-all duration-300">
            <FiMail className="text-textSecondary group-hover:text-accent transition-colors" />
            <span className="font-display tracking-widest text-sm uppercase">Email Me</span>
          </a>
          
          <a href="#" className="group flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-accent transition-all duration-300">
            <FiLinkedin className="text-textSecondary group-hover:text-accent transition-colors" />
            <span className="font-display tracking-widest text-sm uppercase">LinkedIn</span>
          </a>
          
          <a href="/SEAN LIM YUAN JIN.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-accent text-primaryBg rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(113,231,255,0.4)]">
            <FiDownload />
            <span className="font-display tracking-widest text-sm uppercase font-bold">Resume</span>
          </a>
        </div>
      </div>
      
      <footer className="absolute bottom-8 text-xs font-display tracking-widest text-textSecondary opacity-50 uppercase">
        © {new Date().getFullYear()} Sean Lim. All rights reserved.
      </footer>
    </section>
  );
}

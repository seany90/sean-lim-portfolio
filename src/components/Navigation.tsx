'use client'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Magnetic hover effect
    linksRef.current.forEach((link) => {
      if (!link) return;
      
      const xTo = gsap.quickTo(link, "x", {duration: 0.4, ease: "power3"});
      const yTo = gsap.quickTo(link, "y", {duration: 0.4, ease: "power3"});

      const handleMouseMove = (e: MouseEvent) => {
        const rect = link.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        
        xTo(relX * 0.2);
        yTo(relY * 0.2);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      link.addEventListener("mousemove", handleMouseMove);
      link.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        link.removeEventListener("mousemove", handleMouseMove);
        link.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b border-transparent ${
        scrolled ? 'py-4 glass-panel border-white/5' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-24 flex items-center justify-between">
        
        <a href="#" className="font-heading text-2xl tracking-widest text-textMain relative group">
          S. LIM
          <div className="absolute -bottom-2 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"></div>
        </a>

        <div className="hidden md:flex items-center gap-12 font-display text-sm tracking-widest uppercase">
          {['About', 'Projects', 'Experience', 'Certificates', 'Contact'].map((item, i) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="relative text-textSecondary hover:text-textMain transition-colors py-2 group"
              ref={el => { linksRef.current[i] = el; }}
            >
              {item}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300 origin-left"></div>
            </a>
          ))}
        </div>

        {/* Mobile menu button could go here */}
      </div>
    </nav>
  );
}

'use client'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    // Magnetic hover effect (desktop only)
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      return;
    }

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  const navItems = ['About', 'Projects', 'Experience', 'Certificates', 'Contact'];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b border-transparent ${
        scrolled ? 'py-4 glass-panel border-white/5' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-24 flex items-center justify-between relative z-[110]">
        
        <a href="#" className="font-heading text-2xl tracking-widest text-textMain relative group" onClick={() => setIsMobileMenuOpen(false)}>
          S. LIM
          <div className="absolute -bottom-2 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"></div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12 font-display text-sm tracking-widest uppercase">
          {navItems.map((item, i) => (
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

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-textMain hover:text-accent transition-colors p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-primaryBg/98 backdrop-blur-2xl z-[100] transition-all duration-500 flex flex-col items-center justify-center md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center gap-10 font-display text-2xl tracking-widest uppercase">
          {navItems.map((item, i) => (
            <a 
              key={`mobile-${item}`}
              href={`#${item.toLowerCase()}`} 
              className="text-textSecondary hover:text-accent transition-colors p-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

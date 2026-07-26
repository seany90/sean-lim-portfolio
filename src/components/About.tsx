'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX1 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rotateY1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  
  const rotateX2 = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const rotateY2 = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const rotateX3 = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const rotateY3 = useTransform(scrollYProgress, [0, 1], [-10, 30]);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden glass-panel">
            <Image 
              src="/hero-portrait.png" 
              alt="Sean Lim Portrait" 
              fill
              className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 ref={textRef} className="font-heading text-4xl md:text-6xl leading-tight mb-8">
              I don&apos;t just build interfaces.<br/>
              <span className="text-accent">I build experiences.</span>
            </h2>
            <p className="font-body text-textSecondary text-lg leading-relaxed max-w-xl">
              Focusing on digital experiences that communicate through storytelling, motion, and interaction. 
              My journey merges precise front-end execution with high-end aesthetic vision, transforming 
              traditional web applications into immersive interactive environments.
            </p>
          </div>
        </div>

        {/* Principles Section */}
        <div className="pt-24 pb-12 perspective-[2000px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div style={{ rotateX: rotateX1, rotateY: rotateY1 }} className="glass-panel p-12 rounded-3xl flex items-center justify-center h-80 hover:scale-105 transition-transform duration-500 cursor-pointer">
              <h3 className="font-heading text-4xl text-textMain tracking-wide">Vision</h3>
            </motion.div>
            <motion.div style={{ rotateX: rotateX2, rotateY: rotateY2 }} className="glass-panel p-12 rounded-3xl flex items-center justify-center h-80 hover:scale-105 transition-transform duration-500 cursor-pointer mt-12 md:mt-24">
              <h3 className="font-heading text-4xl text-textMain tracking-wide">Inspiration</h3>
            </motion.div>
            <motion.div style={{ rotateX: rotateX3, rotateY: rotateY3 }} className="glass-panel p-12 rounded-3xl flex items-center justify-center h-80 hover:scale-105 transition-transform duration-500 cursor-pointer mt-24 md:mt-0">
              <h3 className="font-heading text-4xl text-textMain tracking-wide">Creativity</h3>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

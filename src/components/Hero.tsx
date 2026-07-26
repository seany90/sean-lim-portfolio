'use client'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intro sequence
    const tl = gsap.timeline();
    
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.5,
      delay: 0.5, // Simulate initial black screen
    });

    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    gsap.to(videoRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    });
    
    // Fade in text
    gsap.to(textRef.current?.children || [], {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });
  };

  useEffect(() => {
    // Initial Text state setup
    if (textRef.current) {
      gsap.set(textRef.current.children, { opacity: 0, y: 30 });
    }

    const handleScroll = () => {
      // Replay video when user scrolls back to the very top
      if (window.scrollY <= 10 && !isVideoPlaying && videoRef.current) {
        setIsVideoPlaying(true);
        videoRef.current.currentTime = 0;
        videoRef.current.play();

        // Fade video back in
        gsap.to(videoRef.current, {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
        });

        // Fade text back out
        gsap.to(textRef.current?.children || [], {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: 'power2.in',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVideoPlaying]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Initial Black Screen Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-primaryBg z-50 flex flex-col items-center justify-center">
        <h1 className="font-heading text-4xl mb-4 tracking-wider">SEAN LIM</h1>
        <div className="flex gap-4 font-body text-textSecondary tracking-widest text-sm uppercase">
          <span>Frontend Developer</span>
          <span>&bull;</span>
          <span>UX Designer</span>
          <span>&bull;</span>
          <span>AI Builder</span>
        </div>
      </div>

      {/* Cinematic Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover z-20 ${!isVideoPlaying ? 'pointer-events-none' : ''}`}
        src="/hero-video.mp4"
        muted
        autoPlay
        playsInline
        onEnded={handleVideoEnded}
      />

      {/* WebGL Canvas */}
      <div className="absolute inset-0 z-10">
        <HeroCanvas startAnimation={!isVideoPlaying} />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center items-start px-8 md:px-24 pointer-events-none">
        <div ref={textRef} className="max-w-3xl opacity-0">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight mb-8">
            <div className="block">Vision.</div>
            <div className="block text-textSecondary">Inspired by Curiosity.</div>
            <div className="block">Built Through Creativity.</div>
          </h1>
          
          <p className="font-body text-xl text-textSecondary max-w-xl mb-12">
            I design meaningful digital experiences where design, technology and imagination work together.
          </p>

          <div className="flex gap-6 pointer-events-auto">
            <button className="group relative px-8 py-4 bg-transparent border border-textMain rounded-full overflow-hidden transition-all duration-300 hover:border-accent">
              <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 font-display uppercase tracking-widest text-sm group-hover:text-primaryBg transition-colors duration-300">
                Explore
              </span>
            </button>
            <button className="group px-8 py-4 font-display uppercase tracking-widest text-sm text-textSecondary hover:text-accent transition-colors duration-300">
              View Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

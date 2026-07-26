'use client'
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronDown } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Frontend Developer",
    company: "Kyndryl (SingHealth EUP)",
    period: "02/2025 to Present",
    bullets: [
      "Transformed complex product requirements and legacy logic into optimized, user-friendly system interfaces.",
      "Actively participated in user workflow validation and system logic testing.",
      "Integrated AI/LLM services and advanced digital tools to streamline complex data workflows and processing.",
      "Collaborated closely with backend engineering teams to ensure accurate API and secure cross-system integrations."
    ]
  },
  {
    role: "Cybersecurity Training and Internship",
    company: "Oeson Learning",
    period: "08/2024 to 11/2024",
    bullets: [
      "Conducted rigorous system data validation and risk mitigation protocols to protect digital environments.",
      "Maintained structured frameworks for network scanning and digital tracking."
    ]
  },
  {
    role: "Senior Administrative Assistant",
    company: "Chirotherapy",
    period: "02/2023 to 06/2024",
    bullets: [
      "Directed and managed patient workflows, daily operational scheduling, and personnel logistics.",
      "Acted as a central point of contact to investigate and resolve scheduling conflicts and operational bottlenecks."
    ]
  },
  {
    role: "Administrative Assistant",
    company: "Total Health Chiropractic",
    period: "06/2022 to 12/2022",
    bullets: [
      "Maintained complete accuracy across high-volume digital client profile records and precise asset data entry."
    ]
  },
  {
    role: "Senior Functional Wellness Therapist",
    company: "Natrahea",
    period: "09/2020 to 06/2021",
    bullets: [
      "Coordinated multi-tier rehabilitation plans and managed client coordination.",
      "Produced cross-team educational media content."
    ]
  }
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' });
      } else {
        gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, [index]);

  return (
    <div ref={cardRef} className={`relative flex items-center w-full my-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-accent z-10 shadow-[0_0_15px_rgba(113,231,255,0.8)]"></div>
      
      <div className={`w-full md:w-5/12 glass-panel rounded-2xl p-6 md:p-8 cursor-pointer group hover:border-accent/50 transition-colors duration-300 ${index % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`} onClick={() => setIsOpen(!isOpen)}>
        <h3 className="font-heading text-2xl text-textMain group-hover:text-accent transition-colors">{exp.role}</h3>
        <p className="font-body text-textSecondary uppercase tracking-widest text-sm mt-2">{exp.company}</p>
        <p className="font-body text-textSecondary text-xs mt-1 mb-4 opacity-50">{exp.period}</p>
        
        <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
          <ul className={`flex flex-col gap-3 font-body text-sm text-textSecondary ${index % 2 === 0 ? 'items-start' : 'md:items-end items-start'}`}>
            {exp.bullets.map((bullet, i) => (
              <li key={i} className={`relative max-w-sm ${index % 2 === 0 ? 'pl-4 before:content-[""] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full' : 'md:pr-4 md:before:content-none before:content-[""] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full pl-4 md:pl-0 md:after:content-[""] md:after:absolute md:after:right-0 md:after:top-2 md:after:w-1.5 md:after:h-1.5 md:after:bg-accent md:after:rounded-full text-left md:text-right'}`}>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className={`mt-4 flex ${index % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
          <FiChevronDown className={`text-textSecondary transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`} size={20} />
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current.parentElement,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        }
      );
    }
  }, []);

  return (
    <section id="experience" className="relative min-h-screen py-32 px-8 md:px-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-4xl md:text-6xl mb-24 text-center">Journey & Experience</h2>
        
        <div className="relative w-full">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform md:-translate-x-1/2 origin-top">
            <div ref={lineRef} className="absolute top-0 w-full h-full bg-accent origin-top shadow-[0_0_15px_rgba(113,231,255,0.5)]"></div>
          </div>

          <div className="flex flex-col pl-8 md:pl-0">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

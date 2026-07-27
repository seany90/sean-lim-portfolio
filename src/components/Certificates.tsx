'use client'
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Certificate3DModal from './Certificate3DModal';

interface CertData {
  id: string;
  title: string;
  issuer: string;
  icon: string;
  iconImage?: string;
  bullets: string[];
  date: string;
  pdfUrl: string;
}

const certificates: CertData[] = [
  {
    id: "google-ai",
    title: "Google AI Professional",
    issuer: "Certificate by Coursera",
    icon: "G",
    iconImage: "/google.png",
    bullets: ["• AI Fundamentals", "• Content Creation", "• Brainstorming & Planning", "• Data Analysis", "• Research & Insights", "• App Building", "• Writing & Communicating"],
    date: "Completed Jul 7, 2026",
    pdfUrl: "/Coursera R2RLUQWTLD22.pdf"
  },
  {
    id: "oeson-appreciation",
    title: "Certificate of Appreciation",
    issuer: "Issued by Oeson Learning",
    icon: "O",
    iconImage: "/oeson learning.ico",
    bullets: ["• Outstanding Contribution", "• Dedication to Excellence", "• Professional Growth", "• Collaboration", "• Continuous Learning"],
    date: "Completed Nov 14, 2024",
    pdfUrl: "/internship-output.pdf"
  },
  {
    id: "oeson-achievement",
    title: "Certificate of Achievement",
    issuer: "Issued by Oeson Learning",
    icon: "O",
    iconImage: "/oeson learning.ico",
    bullets: ["• Skill Mastery", "• Goal Achievement", "• Practical Application", "• Exceptional Performance", "• Industry Standards"],
    date: "Completed Nov 14, 2024",
    pdfUrl: "/training-output.pdf"
  },
  {
    id: "oeson-recommendation",
    title: "Letter of Recommendation",
    issuer: "Issued by Oeson Learning",
    icon: "O",
    iconImage: "/oeson learning.ico",
    bullets: ["• Strong Work Ethic", "• Problem Solving", "• Adaptability", "• Leadership Potential", "• Team Player"],
    date: "Completed Nov 14, 2024",
    pdfUrl: "/lor-output.pdf"
  },
  {
    id: "vertical-institute",
    title: "Vertical Institute Certification",
    issuer: "Issued by Vertical Institute",
    icon: "V",
    iconImage: "/vertical institute.ico",
    bullets: ["• Professional Certification", "• Specialized Training", "• Practical Assessment", "• Skill Development", "• Industry Ready"],
    date: "Completed Jul 29, 2024",
    pdfUrl: "/vertical institute.pdf"
  }
];

function CertificateCard({ cert, onClick }: { cert: CertData, onClick: () => void }) {
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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
      className="relative w-full max-w-xl h-auto md:aspect-[1.414] glass-panel rounded-xl cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.5)] mx-auto"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative md:absolute md:inset-0 p-8 flex flex-col items-center justify-center text-center border border-white/5 rounded-xl bg-gradient-to-br from-white/5 to-transparent w-full h-auto md:h-full"
      >
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(113,231,255,0.4)] md:group-hover:scale-110 transition-transform duration-500 shrink-0 overflow-hidden border border-white/10">
          {cert.iconImage ? (
            <img src={cert.iconImage} alt={cert.title} className="w-full h-full object-cover" />
          ) : (
            <span className="font-display text-accent text-2xl font-bold">{cert.icon}</span>
          )}
        </div>
        <h3 className="font-heading text-xl md:text-2xl mb-1 text-textMain tracking-wide leading-tight">{cert.title}</h3>
        <p className="font-body text-accent tracking-widest uppercase text-[10px] mb-4">{cert.issuer}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-body text-textSecondary opacity-70 w-full mb-auto text-left pl-4 sm:pl-8">
          {cert.bullets.map((bullet, idx) => (
            <div key={idx}>{bullet}</div>
          ))}
        </div>
        
        <div className="mt-4 text-[10px] font-display tracking-widest text-textSecondary opacity-50 uppercase shrink-0">
          {cert.date}
        </div>
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const [activeCert, setActiveCert] = useState<CertData | null>(null);

  return (
    <section id="certificates" className="relative min-h-screen py-32 px-4 md:px-12 lg:px-24 flex flex-col items-center justify-center">
      <h2 className="font-heading text-4xl md:text-6xl mb-12 md:mb-24 text-center">Accreditations</h2>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
        {certificates.map((cert) => (
          <CertificateCard 
            key={cert.id} 
            cert={cert} 
            onClick={() => setActiveCert(cert)} 
          />
        ))}
      </div>

      {/* 3D Certificate Modal */}
      <Certificate3DModal 
        isOpen={activeCert !== null} 
        onClose={() => setActiveCert(null)} 
        title={activeCert?.title || ""}
        pdfUrl={activeCert?.pdfUrl || ""}
      />
    </section>
  );
}

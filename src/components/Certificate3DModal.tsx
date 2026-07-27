'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface PdfTab {
  label: string;
  url: string;
}

interface Certificate3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl?: string; // Standard single PDF
  pdfTabs?: PdfTab[]; // Multiple PDFs with tabs
}

export default function Certificate3DModal({ isOpen, onClose, title, pdfUrl, pdfTabs }: Certificate3DModalProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Reset tab index when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTabIndex(0);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      // Small threshold to prevent accidental closes on slight trackpad movements
      if (Math.abs(e.deltaY) > 10) {
        onClose();
      }
    };

    const handleTouchMove = () => {
      onClose();
    };

    const timer = setTimeout(() => {
      window.addEventListener('wheel', handleWheel, { capture: true, passive: true });
      window.addEventListener('touchmove', handleTouchMove, { capture: true, passive: true });
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
    };
  }, [isOpen, onClose]);

  // Determine which URL to show based on if tabs are provided
  const activeUrl = pdfTabs && pdfTabs.length > 0 
    ? pdfTabs[activeTabIndex].url 
    : pdfUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8" style={{ perspective: '1200px' }}>
          
          {/* Background overlay that closes modal on click */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />
          
          {/* Helper text */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-8 right-8 text-textSecondary text-sm tracking-widest uppercase font-display animate-pulse pointer-events-none z-10 hidden sm:block"
          >
            Scroll or Click to Close
          </motion.div>
          
          {/* 3D-styled Framer Motion Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 25, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: -15, y: -30 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="relative w-full max-w-4xl h-[70vh] sm:h-[85vh] bg-secondaryBg rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="w-full h-14 bg-primaryBg/90 backdrop-blur border-b border-white/5 flex items-center justify-between px-4 z-20 shrink-0">
              
              {/* Tabs or Title */}
              <div className="flex items-center gap-2">
                {pdfTabs && pdfTabs.length > 0 ? (
                  <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
                    {pdfTabs.map((tab, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTabIndex(idx)}
                        className={`relative px-4 py-1.5 text-xs font-display tracking-widest uppercase rounded-md transition-colors ${
                          activeTabIndex === idx ? 'text-black' : 'text-textSecondary hover:text-white'
                        }`}
                      >
                        {activeTabIndex === idx && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-accent rounded-md"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs font-display tracking-widest text-textSecondary uppercase pl-2">
                    {title}
                  </div>
                )}
              </div>

              <button 
                className="text-textMain hover:text-accent w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                onClick={onClose}
              >
                ✕
              </button>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(113,231,255,0.05)] z-10" />

            {/* Desktop PDF Viewer (Hidden on mobile because mobile browsers often block or fail to render iframes) */}
            <div className="hidden md:block flex-1 w-full bg-[#323639] relative z-0">
              <iframe 
                key={activeUrl}
                src={`${activeUrl}#view=FitH`} 
                className="w-full h-full"
                title={title}
              />
            </div>

            {/* Mobile Fallback UI (Shown only on small screens) */}
            <div className="md:hidden flex-1 w-full bg-primaryBg flex flex-col items-center justify-center p-8 text-center relative z-0">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(113,231,255,0.2)] border border-accent/20">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl mb-4 text-textMain">Certificate Ready</h3>
              <p className="font-body text-textSecondary text-sm mb-8 max-w-[250px]">
                Mobile browsers require certificates to be opened securely in a new tab.
              </p>
              <a 
                href={activeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-accent/10 border border-accent rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(113,231,255,0.4)]"
              >
                <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 font-display uppercase tracking-widest text-xs font-bold text-accent group-hover:text-primaryBg transition-colors duration-300">
                  Open Certificate
                </span>
              </a>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}

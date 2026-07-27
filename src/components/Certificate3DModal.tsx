'use client'
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Certificate3DModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Certificate3DModal({ isOpen, onClose }: Certificate3DModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      // Small threshold to prevent accidental closes on slight trackpad movements
      // But large enough to catch a deliberate scroll
      if (Math.abs(e.deltaY) > 10) {
        onClose();
      }
    };

    const handleTouchMove = () => {
      onClose();
    };

    // Delay attaching listeners slightly so the opening click doesn't immediately close it
    const timer = setTimeout(() => {
      // Use capture phase so we catch the wheel even if iframe tries to eat it
      window.addEventListener('wheel', handleWheel, { capture: true, passive: true });
      window.addEventListener('touchmove', handleTouchMove, { capture: true, passive: true });
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
    };
  }, [isOpen, onClose]);

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
            {/* Header bar with close button */}
            <div className="w-full h-12 bg-primaryBg/80 backdrop-blur border-b border-white/5 flex items-center justify-between px-4 z-20 shrink-0">
              <div className="text-xs font-display tracking-widest text-textSecondary uppercase">
                Google AI Professional
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

            {/* The Certificate PDF. Added #view=FitH to force it to fit perfectly inside the frame! */}
            <div className="flex-1 w-full bg-[#323639] relative z-0">
              <iframe 
                src="/Coursera R2RLUQWTLD22.pdf#view=FitH" 
                className="w-full h-full"
                title="Google AI Professional Certificate"
              />
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}

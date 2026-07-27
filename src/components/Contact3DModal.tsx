'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

function Tesseract({ isSending, onAnimationComplete }: { isSending: boolean, onAnimationComplete: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isSending) {
        // Spin fast and fly away when sending
        meshRef.current.rotation.x += delta * 5;
        meshRef.current.rotation.y += delta * 5;
        meshRef.current.position.y += delta * 2;
        meshRef.current.scale.subScalar(delta * 0.5);
        
        if (meshRef.current.scale.x < 0.1) {
          onAnimationComplete();
        }
      } else {
        // Slow float rotation
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 3, 3]} />
        <meshPhysicalMaterial 
          color="#050505" 
          transmission={0.9} 
          opacity={1} 
          metalness={0} 
          roughness={0.1} 
          ior={1.5} 
          thickness={0.5} 
          transparent={true}
        />
        <Edges scale={1.0} threshold={15} color="#71E7FF" />
      </mesh>
    </Float>
  );
}

interface Contact3DModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Contact3DModal({ isOpen, onClose }: Contact3DModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSending(false);
      setFormData({ name: '', message: '' });
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
  };

  const handleAnimationComplete = () => {
    // Open mailto link after animation finishes
    const subject = encodeURIComponent(`New Contact from ${formData.name}`);
    const body = encodeURIComponent(formData.message);
    window.location.href = `mailto:seanlimyuanjin@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Background overlay */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-primaryBg/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#71E7FF" />
          <Tesseract isSending={isSending} onAnimationComplete={handleAnimationComplete} />
        </Canvas>
      </div>

      {/* HTML Form UI placed carefully on top */}
      <AnimatePresence>
        {!isSending && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotateX: 10 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: -10 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="relative z-10 glass-panel p-8 rounded-2xl w-[90%] max-w-md border border-accent/20 shadow-[0_0_50px_rgba(113,231,255,0.15)] pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-2xl text-accent">Initialize Link</h3>
              <button onClick={onClose} className="text-textSecondary hover:text-accent transition-colors text-xl">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-display text-xs tracking-widest uppercase text-textSecondary mb-2">Identifier</label>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-textMain font-body focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              
              <div>
                <label className="block font-display text-xs tracking-widest uppercase text-textSecondary mb-2">Transmission Data</label>
                <textarea 
                  required
                  placeholder="Your Message..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-textMain font-body focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              
              <button 
                type="submit" 
                className="mt-4 w-full py-4 bg-accent text-primaryBg font-display font-bold tracking-widest uppercase rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(113,231,255,0.4)] transition-all duration-300"
              >
                Transmit Data
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

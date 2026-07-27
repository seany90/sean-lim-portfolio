'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

function Monolith({ isClosing, onAnimationComplete }: { isClosing: boolean, onAnimationComplete: () => void }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isClosing) {
        // Tilt backward and fall away when closing
        meshRef.current.rotation.x -= delta * 3;
        meshRef.current.position.y -= delta * 5;
        meshRef.current.position.z -= delta * 10;
        
        if (meshRef.current.position.y < -10) {
          onAnimationComplete();
        }
      } else {
        // Slow float rotation for the monolith
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* The 3D Glass Slab */}
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[4.2, 3.2, 0.1]} />
          <meshPhysicalMaterial 
            color="#050505" 
            transmission={0.9} 
            opacity={1} 
            metalness={0.2} 
            roughness={0.1} 
            ior={1.5} 
            thickness={0.5} 
            transparent={true}
          />
          <Edges scale={1.0} threshold={15} color="#71E7FF" />
        </mesh>

        {/* The PDF Overlay placed perfectly on the front face */}
        <Html 
          transform 
          position={[0, 0, 0]} 
          zIndexRange={[100, 0]}
        >
          <div 
            className="w-[800px] h-[600px] bg-secondaryBg rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(113,231,255,0.2)]"
            style={{ 
              pointerEvents: 'auto', // allow interacting with PDF
            }}
          >
            <iframe 
              src="/Coursera R2RLUQWTLD22.pdf" 
              className="w-full h-full pointer-events-auto"
              title="Google AI Professional Certificate"
            />
          </div>
        </Html>
      </group>
    </Float>
  );
}

interface Certificate3DModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Certificate3DModal({ isOpen, onClose }: Certificate3DModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isClosing) return;

    const triggerClose = () => {
      setIsClosing(true);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 20) {
        triggerClose();
      }
    };

    const handleTouchMove = () => {
      triggerClose();
    };

    // Delay attaching listeners slightly so the initial click to open doesn't immediately close it
    const timer = setTimeout(() => {
      window.addEventListener('wheel', handleWheel);
      window.addEventListener('touchmove', handleTouchMove);
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen, isClosing]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Background overlay that closes modal on click */}
      <AnimatePresence>
        {!isClosing && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primaryBg/90 backdrop-blur-md cursor-pointer"
            onClick={() => setIsClosing(true)}
          >
            <div className="absolute top-8 right-8 text-textSecondary text-sm tracking-widest uppercase font-display animate-pulse">
              Scroll or Click to Close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#71E7FF" />
          
          <AnimatePresence>
            <group>
              <Monolith 
                isClosing={isClosing} 
                onAnimationComplete={() => {
                  setIsClosing(false);
                  onClose();
                }} 
              />
            </group>
          </AnimatePresence>
        </Canvas>
      </div>
    </div>
  );
}

'use client'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouse = { x: 0, y: 0 };
    let delayedMouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const ticker = gsap.ticker.add(() => {
      delayedMouse.x += (mouse.x - delayedMouse.x) * 0.1;
      delayedMouse.y += (mouse.y - delayedMouse.y) * 0.1;

      // Stretch effect based on velocity
      const deltaX = mouse.x - delayedMouse.x;
      const deltaY = mouse.y - delayedMouse.y;
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      
      const scaleX = 1 + Math.min(velocity * 0.01, 1);
      const scaleY = 1 - Math.min(velocity * 0.005, 0.5);

      gsap.set(cursor, {
        x: delayedMouse.x,
        y: delayedMouse.y,
        rotation: angle,
        scaleX,
        scaleY
      });
    });

    // Handle hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      gsap.ticker.remove(ticker);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}

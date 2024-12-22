"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, animate } from 'framer-motion';

const COLORS = [
  '#FF3A99', // Pink
  '#AFE9C6', // Mint
  '#FEF6AA', // Yellow
  '#CEA6F5', // Purple
  '#ECBE2D', // Gold
];

interface Polygon {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  speed: number;
  baseX: number;
  baseY: number;
}

const REPULSION_DISTANCE = 200; // Distance at which polygons start being repelled
const REPULSION_STRENGTH = 100; // Strength of the repulsion force

export const FloatingPolygons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    // Create more spread out polygons
    const newPolygons: Polygon[] = Array.from({ length: 32 }, (_, i) => {
      const x = Math.random() * (width + 400) - 200; // Spread beyond viewport
      const y = Math.random() * (height + 400) - 200;
      return {
        id: i,
        x,
        y,
        baseX: x,
        baseY: y,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speed: 0.3 + Math.random() * 1.5
      };
    });
    
    setPolygons(newPolygons);
  }, []);

  const handleMouseMove = async (e: React.MouseEvent) => {
    const { left, top } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    const mouseXPos = e.clientX - left;
    const mouseYPos = e.clientY - top;
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    // Update each polygon's position based on mouse position
    polygons.forEach((polygon, index) => {
      const dx = mouseXPos - polygon.baseX;
      const dy = mouseYPos - polygon.baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < REPULSION_DISTANCE) {
        const force = (REPULSION_DISTANCE - distance) / REPULSION_DISTANCE;
        const angle = Math.atan2(dy, dx);
        const repulsionX = -Math.cos(angle) * force * REPULSION_STRENGTH;
        const repulsionY = -Math.sin(angle) * force * REPULSION_STRENGTH;
        
        animate(`.polygon-${polygon.id}`, {
          x: polygon.baseX + repulsionX,
          y: polygon.baseY + repulsionY,
        }, {
          type: "spring",
          stiffness: 100,
          damping: 10,
          restDelta: 0.001
        });
      } else {
        animate(`.polygon-${polygon.id}`, {
          x: polygon.baseX,
          y: polygon.baseY,
        }, {
          type: "spring",
          stiffness: 50,
          damping: 10,
          restDelta: 0.001
        });
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {polygons.map((polygon) => (
        <motion.div
          key={polygon.id}
          className={`absolute polygon-${polygon.id}`}
          initial={{ 
            x: polygon.baseX, 
            y: polygon.baseY, 
            rotate: polygon.rotation, 
            scale: polygon.scale 
          }}
          animate={{
            rotate: [polygon.rotation, polygon.rotation + 360],
          }}
          transition={{
            rotate: {
              duration: 20 * polygon.speed,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <svg width="109" height="106" viewBox="0 0 109 106" fill="none">
            <path
              d="M101.847 11.5194L72.0062 96.5032C71.1136 99.0454 67.8037 99.6679 66.0485 97.6238L7.37091 29.2886C5.61568 27.2445 6.73148 24.0668 9.37936 23.5688L97.8982 6.92008C100.546 6.42207 102.74 8.97722 101.847 11.5194Z"
              stroke={polygon.color}
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

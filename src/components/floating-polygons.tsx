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

const REPULSION_DISTANCE = 200;
const REPULSION_STRENGTH = 100;
const MIN_DISTANCE = 150; // Minimum distance between polygons

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

const generatePolygonPosition = (
  width: number,
  height: number,
  existingPolygons: Polygon[],
  padding: number = 50
): { x: number; y: number } => {
  let attempts = 0;
  const maxAttempts = 50;
  
  while (attempts < maxAttempts) {
    const x = padding + Math.random() * (width - 2 * padding);
    const y = padding + Math.random() * (height - 2 * padding);
    
    // Check distance from all existing polygons
    const isFarEnough = existingPolygons.every(polygon => {
      const dx = polygon.x - x;
      const dy = polygon.y - y;
      return Math.sqrt(dx * dx + dy * dy) > MIN_DISTANCE;
    });
    
    if (isFarEnough || attempts === maxAttempts - 1) {
      return { x, y };
    }
    
    attempts++;
  }
  
  // Fallback position if we couldn't find a good spot
  return {
    x: padding + Math.random() * (width - 2 * padding),
    y: padding + Math.random() * (height - 2 * padding)
  };
};

export const FloatingPolygons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();
  const isTabletOrLarger = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const polygonCount = isTabletOrLarger ? 24 : 8;
    const polygonsPerColor = Math.ceil(polygonCount / COLORS.length);
    
    const newPolygons: Polygon[] = [];
    
    // Ensure at least two polygons of each color
    COLORS.forEach((color, colorIndex) => {
      const colorCount = Math.max(2, Math.floor(polygonsPerColor));
      
      for (let i = 0; i < colorCount && newPolygons.length < polygonCount; i++) {
        const position = generatePolygonPosition(width, height, newPolygons);
        newPolygons.push({
          id: newPolygons.length,
          x: position.x,
          y: position.y,
          baseX: position.x,
          baseY: position.y,
          rotation: Math.random() * 360,
          scale: 0.3 + Math.random() * 0.4,
          color: color,
          speed: 0.3 + Math.random() * 1.5
        });
      }
    });
    
    // Fill remaining slots if any
    while (newPolygons.length < polygonCount) {
      const position = generatePolygonPosition(width, height, newPolygons);
      newPolygons.push({
        id: newPolygons.length,
        x: position.x,
        y: position.y,
        baseX: position.x,
        baseY: position.y,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speed: 0.3 + Math.random() * 1.5
      });
    }
    
    setPolygons(newPolygons);
  }, [isTabletOrLarger]);

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

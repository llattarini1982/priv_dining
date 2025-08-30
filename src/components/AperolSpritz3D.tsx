import React, { useState } from 'react';
import { Wine } from 'lucide-react';

export default function AperolSpritz3D() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const rotateX = ((y / rect.height) - 0.5) * 30;
    const rotateY = ((x / rect.width) - 0.5) * 30;
    
    setRotateX(-rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative h-[500px] w-full max-w-lg mx-auto perspective-1000">
      <div
        className="relative w-full h-full transform-style-3d transition-transform duration-300 ease-out cursor-pointer"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glass */}
        <div className="absolute inset-0 transform-style-3d">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-64 h-80 transform translate-z-20"
               style={{ transformStyle: 'preserve-3d' }}>
            {/* Glass body */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full transform translate-z-10"
                 style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}>
            </div>
            
            {/* Liquid layers */}
            <div className="absolute inset-0 bg-orange-500/80 rounded-full transform translate-z-20"
                 style={{ clipPath: 'polygon(25% 20%, 75% 20%, 90% 90%, 10% 90%)' }}>
            </div>
            <div className="absolute inset-0 bg-red-600/70 rounded-full transform translate-z-30"
                 style={{ clipPath: 'polygon(30% 30%, 70% 30%, 85% 85%, 15% 85%)' }}>
            </div>
            
            {/* Prosecco bubbles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full animate-bubble"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Orange slice */}
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-16 h-16 transform translate-z-40 rotate-x-60">
              <div className="w-full h-full bg-orange-400 rounded-full border-4 border-orange-500"></div>
            </div>
            
            {/* Ice cubes */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 bg-white/30 backdrop-blur-sm transform translate-z-30"
                style={{
                  top: `${30 + i * 20}%`,
                  left: `${30 + Math.random() * 30}%`,
                  transform: `translateZ(30px) rotate(${Math.random() * 45}deg)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Reflections */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent transform translate-z-0"></div>
      </div>
      
      {/* Drink details */}
      <div className="absolute bottom-0 left-0 right-0 text-center text-cream bg-wine/90 p-6 rounded-lg transform translate-z-0">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Wine className="w-6 h-6 text-terracotta" />
          <h3 className="text-2xl font-serif">Aperol Spritz</h3>
        </div>
        <p className="font-serif italic text-cream/90">
          The perfect Italian aperitivo: Aperol, Prosecco, and a splash of soda
        </p>
      </div>
    </div>
  );
}
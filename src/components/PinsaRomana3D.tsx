import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

export default function PinsaRomana3D() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
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
    <div className="relative h-[400px] w-full max-w-lg mx-auto perspective-1000">
      <div
        className="relative w-full h-full transform-style-3d transition-transform duration-300 ease-out cursor-pointer"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Pinsa Base */}
        <div className="absolute inset-0 transform-style-3d">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-80 h-64 transform translate-z-10">
            {/* Crust */}
            <div className="absolute inset-0 bg-amber-100 rounded-full transform translate-z-0"
                 style={{ 
                   clipPath: 'ellipse(50% 40% at 50% 50%)',
                   filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                 }}>
            </div>
            
            {/* Toppings Layer */}
            <div className="absolute inset-0 transform translate-z-10">
              {/* Mortadella */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-16 bg-pink-200/80 rounded-full transform translate-z-20"
                  style={{
                    left: `${20 + Math.random() * 40}%`,
                    top: `${20 + Math.random() * 40}%`,
                    transform: `translateZ(20px) rotate(${Math.random() * 360}deg)`,
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  }}
                />
              ))}
              
              {/* Burrata */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-12 h-12 bg-white/90 rounded-full transform translate-z-30 shadow-lg"
                  style={{
                    left: `${25 + Math.random() * 50}%`,
                    top: `${25 + Math.random() * 50}%`,
                  }}
                />
              ))}
              
              {/* Pistacchio Pesto Drizzle */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1 bg-green-700/60 rounded-full transform translate-z-40"
                  style={{
                    width: `${20 + Math.random() * 40}px`,
                    left: `${10 + Math.random() * 60}%`,
                    top: `${10 + Math.random() * 60}%`,
                    transform: `translateZ(40px) rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Steam effect */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-8 bg-white/20 rounded-full animate-steam"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: '20%',
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Dish details */}
      <div className="absolute bottom-0 left-0 right-0 text-center text-cream bg-wine/90 p-6 rounded-lg transform translate-z-0">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Utensils className="w-6 h-6 text-terracotta" />
          <h3 className="text-2xl font-serif">Pinsa Romana Baciata</h3>
        </div>
        <p className="font-serif italic text-cream/90">
          72-hour fermented dough with mortadella, burrata, and pistacchio pesto
        </p>
      </div>
    </div>
  );
}
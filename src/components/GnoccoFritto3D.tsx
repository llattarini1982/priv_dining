import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

export default function GnoccoFritto3D() {
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
        {/* Plate */}
        <div className="absolute inset-0 transform-style-3d">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-80 h-64 transform translate-z-0">
            {/* Plate base */}
            <div className="absolute inset-0 bg-white/90 rounded-full transform translate-z-0 shadow-xl"></div>
            
            {/* Gnocco Fritto */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute transform-style-3d">
                {/* Main pillow */}
                <div
                  className="absolute w-20 h-16 bg-amber-200 transform translate-z-20"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${30 + (i % 2) * 20}%`,
                    transform: `translateZ(20px) rotate(${Math.random() * 45}deg)`,
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1))',
                  }}
                >
                  {/* Air pockets effect */}
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="absolute w-3 h-3 bg-amber-300/50 rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Cold cuts */}
                <div
                  className="absolute w-24 h-20 bg-rose-200/80 transform translate-z-30"
                  style={{
                    left: `${18 + (i * 10)}%`,
                    top: `${28 + (i % 2) * 20}%`,
                    transform: `translateZ(30px) rotate(${Math.random() * 30}deg)`,
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  }}
                />
              </div>
            ))}
            
            {/* Stracchino cheese dollops */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 bg-gray-100/90 rounded-full transform translate-z-40 shadow-sm"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                  transform: `translateZ(40px) scale(${0.8 + Math.random() * 0.4})`,
                }}
              />
            ))}
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
          <h3 className="text-2xl font-serif">Gnocco Fritto</h3>
        </div>
        <p className="font-serif italic text-cream/90">
          Crispy fried dough pillows served with premium cold cuts and stracchino
        </p>
      </div>
    </div>
  );
}
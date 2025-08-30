import React from 'react';
import { Heart } from 'lucide-react';
import iLoveItalianMenu from '../data/i-love-italian-menu.json';
import italianFeasts from '../data/italian-feasts.json';
import italianStreetFood from '../data/italian-street-food-menu.json';
import type { Menu as MenuType } from '../types/menu';

export default function Menu() {
  const allCourses = [
    ...iLoveItalianMenu.courses,
    ...italianStreetFood.courses
  ];

  return (
    <div className="min-h-screen bg-cream pt-16">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-serif text-center mb-4 text-wine">Our Menu</h1>
        <p className="text-center text-wine/80 mb-16 font-serif italic max-w-2xl mx-auto">
          Discover our carefully curated selection of authentic Italian dishes, 
          crafted with passion and tradition
        </p>
        
        <div className="grid gap-16">
          {/* Italian Feasts Section */}
          <div className="bg-cream-light rounded-lg p-8 shadow-md">
            <h2 className="text-3xl font-serif mb-8 text-center text-wine border-b-2 border-terracotta/20 pb-4">
              Italian Feasts
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {italianFeasts.feasts.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="bg-white rounded-lg overflow-hidden shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-serif text-wine">{item.name}</h3>
                      {item.signature && (
                        <Heart className="w-5 h-5 text-terracotta fill-terracotta" />
                      )}
                    </div>
                  </div>
                  <p className="text-wine/70 font-serif">{item.description}</p>
                  {item.signature && (
                    <div className="mt-2">
                      <span className="text-sm text-terracotta font-serif italic">Chef's Signature</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Regular Menu Sections */}
          {allCourses.map((section, index) => (
            <div key={index} className="bg-cream-light rounded-lg p-8 shadow-md">
              <h2 className="text-3xl font-serif mb-8 text-center text-wine border-b-2 border-terracotta/20 pb-4">
                {section.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className="bg-white rounded-lg overflow-hidden shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-serif text-wine">{item.name}</h3>
                        {item.signature && (
                          <Heart className="w-5 h-5 text-terracotta fill-terracotta" />
                        )}
                      </div>
                    </div>
                    <p className="text-wine/70 font-serif">{item.description}</p>
                    {item.signature && (
                      <div className="mt-2">
                        <span className="text-sm text-terracotta font-serif italic">Chef's Signature</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-wine/70 font-serif italic">
            All our dishes are prepared fresh to order with the finest ingredients.
            <br />
            Please inform us of any dietary requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
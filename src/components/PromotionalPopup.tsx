import React, { useState, useEffect } from 'react';
import { X, Package, Calendar, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromotionalPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('promotionalPopupShown');
    
    if (!popupShown) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('promotionalPopupShown', 'true');
    }, 300);
  };

  const handleBookNow = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('promotionalPopupShown', 'true');
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${
      isClosing ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className={`bg-gradient-to-br from-cream to-cream-light rounded-xl sm:rounded-2xl shadow-2xl max-w-lg sm:max-w-xl w-full max-h-[90vh] overflow-y-auto relative border-2 border-terracotta/20 transition-all duration-300 ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-wine text-cream hover:bg-wine-dark rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl z-20 border-2 border-cream hover:scale-110"
          aria-label="Close popup"
        >
          <X className="w-3 h-3 sm:w-5 sm:h-5" />
        </button>

        {/* Enhanced Header with background image */}
        <div className="relative h-32 sm:h-40 rounded-t-xl sm:rounded-t-2xl overflow-hidden">
          <img 
            src="https://res.cloudinary.com/dbctsaxnu/image/upload/v1754446293/DALL_E_2025-08-06_10.10.39_-_A_festive_digital_illustration_celebrating_Singapore_s_60th_National_Day._The_image_features_a_vibrant_skyline_of_Singapore_with_iconic_landmarks_like_o49ws0.webp" 
            alt="Singapore National Day celebration with Italian cuisine special offers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-wine/60 via-wine/70 to-wine/80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-cream">
              <div className="animate-pulse">
                <Star className="w-8 h-8 sm:w-10 sm:h-10 text-terracotta mx-auto mb-1 sm:mb-2 drop-shadow-lg" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-serif mb-1 drop-shadow-lg">Special Offers</h2>
              <p className="text-sm sm:text-base font-serif italic text-terracotta drop-shadow-md">Limited Time Only</p>
              <div className="mt-1 sm:mt-2 w-12 sm:w-16 h-1 bg-terracotta mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Special Orders Section */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-terracotta/20">
              <div className="flex flex-col items-start gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-terracotta/30 to-terracotta/20 p-2 sm:p-3 rounded-lg shadow-md">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-terracotta" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:gap-2 mb-2">
                    <h3 className="text-base sm:text-lg md:text-xl font-serif text-wine leading-tight">🍕 Take Home Italian Specialties</h3>
                    <div className="bg-terracotta text-cream px-2 py-1 rounded-full text-xs font-serif font-bold self-start">
                      Min $200
                    </div>
                  </div>
                  <p className="text-wine/80 font-serif mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed bg-gradient-to-r from-terracotta/5 to-wine/5 p-2 sm:p-3 rounded-lg border-l-2 border-terracotta">
                    🎯 <strong>Perfect for parties, events & meal prep!</strong> Order our famous 72-hour fermented Pinsa bases, 
                    homemade lasagna, and Italian sharing platters. Mix & match to reach $200 minimum.
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-cream to-cream-light rounded-lg shadow-sm border border-terracotta/20">
                      <p className="font-serif text-wine font-bold text-xs sm:text-sm">🍕 Pinsa Base</p>
                      <p className="text-terracotta font-serif font-semibold text-xs sm:text-sm">$18 each</p>
                      <p className="text-wine/60 text-xs sm:text-sm"></p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-cream to-cream-light rounded-lg shadow-sm border border-terracotta/20">
                      <p className="font-serif text-wine font-bold text-xs sm:text-sm">🍝 Lasagna Large</p>
                      <p className="text-terracotta font-serif font-semibold text-xs sm:text-sm">$230 (16 ppl)</p>
                      <p className="text-wine/60 text-xs sm:text-sm"></p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3 sm:mb-4">
                    <div className="text-center p-2 bg-gradient-to-br from-cream to-cream-light rounded-lg shadow-sm border border-terracotta/20">
                      <p className="font-serif text-wine font-bold text-xs">🍽️ Platter S</p>
                      <p className="text-terracotta font-serif text-xs sm:text-sm font-semibold">$72</p>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-br from-cream to-cream-light rounded-lg shadow-sm border border-terracotta/20">
                      <p className="font-serif text-wine font-bold text-xs">🍕 Pizzette</p>
                      <p className="text-terracotta font-serif text-xs sm:text-sm font-semibold">$27-77</p>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-br from-cream to-cream-light rounded-lg shadow-sm border border-terracotta/20">
                      <p className="font-serif text-wine font-bold text-xs">🧁 Maritozzi</p>
                      <p className="text-terracotta font-serif text-xs sm:text-sm font-semibold">$36-134</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-terracotta/15 to-wine/15 p-2 sm:p-3 rounded-lg border-2 border-terracotta/30">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta" />
                      <p className="text-wine font-serif font-bold text-sm sm:text-base text-center">Minimum Order: $200 SGD</p>
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta" />
                    </div>
                    <p className="text-wine font-serif italic text-center text-xs flex flex-wrap items-center justify-center gap-1">
                      ⏰ 48-hour notice • 📍 Singapore pickup • 🎉 Perfect for events
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Private Dining Highlight */}
            <div className="bg-gradient-to-r from-wine/5 to-terracotta/5 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-wine/20 shadow-lg">
              <div className="text-center">
                <h3 className="text-base sm:text-lg md:text-xl font-serif text-wine mb-2 sm:mb-3">Private Dining Experiences</h3>
                <p className="text-wine/80 font-serif text-xs sm:text-sm mb-3 sm:mb-4">
                  Bring the authentic taste of Italy to your home with our exclusive private dining experiences. 
                  Perfect for special occasions and intimate gatherings.
                  </p>
                <div className="grid grid-cols-1 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                    <h4 className="font-serif text-wine font-bold text-xs sm:text-sm">I Love Italian Food</h4>
                    <p className="text-terracotta font-serif text-xs sm:text-sm">From $1700 (Up to 25 pax)</p>
                  </div>
                  <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                    <h4 className="font-serif text-wine font-bold text-xs sm:text-sm">Italian Street Food</h4>
                    <p className="text-terracotta font-serif text-xs sm:text-sm">From $1500 (Up to 25 pax)</p>
                  </div>
                  <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                    <h4 className="font-serif text-wine font-bold text-xs sm:text-sm">Pinsa Romana</h4>
                    <p className="text-terracotta font-serif text-xs sm:text-sm">From $1300 (Up to 25 pax)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-3 sm:space-y-4 bg-gradient-to-br from-wine/5 to-terracotta/5 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl">
              <p className="text-wine/80 font-serif italic text-sm sm:text-base">
                Don't miss out on these exclusive offers!
              </p>
              <div className="flex flex-col gap-2 sm:gap-3 justify-center">
                <Link
                  to="/booking"
                  onClick={handleBookNow}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-terracotta to-terracotta-dark text-cream px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:from-terracotta-dark hover:to-terracotta transition-all shadow-lg hover:shadow-xl font-serif text-xs sm:text-sm transform hover:scale-105"
                >
                  <span>Book Private Dining</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
                <Link
                  to="/booking"
                  onClick={handleBookNow}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-wine to-wine-dark text-cream px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:from-wine-dark hover:to-wine transition-all shadow-lg hover:shadow-xl font-serif text-xs sm:text-sm transform hover:scale-105"
                >
                  <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Start $200 Order Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
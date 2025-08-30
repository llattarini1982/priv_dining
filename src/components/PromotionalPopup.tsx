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
      <div className={`bg-gradient-to-br from-cream to-cream-light rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative border-2 sm:border-4 border-terracotta/20 transition-all duration-300 ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-wine text-cream hover:bg-wine-dark rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl z-20 border-2 border-cream hover:scale-110"
          aria-label="Close popup"
        >
          <X className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Enhanced Header with background image */}
        <div className="relative h-48 sm:h-56 md:h-64 rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
          <img 
            src="https://res.cloudinary.com/dbctsaxnu/image/upload/v1754446293/DALL_E_2025-08-06_10.10.39_-_A_festive_digital_illustration_celebrating_Singapore_s_60th_National_Day._The_image_features_a_vibrant_skyline_of_Singapore_with_iconic_landmarks_like_o49ws0.webp" 
            alt="Singapore National Day celebration with Italian cuisine special offers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-wine/60 via-wine/70 to-wine/80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-cream">
              <div className="animate-pulse">
                <Star className="w-12 h-12 sm:w-16 sm:h-16 text-terracotta mx-auto mb-2 sm:mb-4 drop-shadow-lg" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-2 drop-shadow-lg">Special Offers</h2>
              <p className="text-base sm:text-lg md:text-xl font-serif italic text-terracotta drop-shadow-md">Limited Time Only</p>
              <div className="mt-2 sm:mt-4 w-16 sm:w-24 h-1 bg-terracotta mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="space-y-6 sm:space-y-8">
            {/* Special Orders Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-terracotta/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-terracotta/30 to-terracotta/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md">
                  <Package className="w-8 h-8 sm:w-10 sm:h-10 text-terracotta" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-wine leading-tight">🍕 Take Home Italian Specialties</h3>
                    <div className="bg-terracotta text-cream px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-serif font-bold self-start">
                      Min $200
                    </div>
                  </div>
                  <p className="text-wine/80 font-serif mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed bg-gradient-to-r from-terracotta/5 to-wine/5 p-3 sm:p-4 rounded-lg border-l-4 border-terracotta">
                    🎯 <strong>Perfect for parties, events & meal prep!</strong> Order our famous 72-hour fermented Pinsa bases, 
                    homemade lasagna, and Italian sharing platters. Mix & match to reach $200 minimum.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-cream to-cream-light rounded-xl shadow-sm border border-terracotta/20 hover:shadow-md transition-all">
                      <p className="font-serif text-wine font-bold text-base sm:text-lg">🍕 Pinsa Base</p>
                      <p className="text-terracotta font-serif font-semibold">$18 each</p>
                      <p className="text-wine/60 text-xs sm:text-sm"></p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-cream to-cream-light rounded-xl shadow-sm border border-terracotta/20 hover:shadow-md transition-all">
                      <p className="font-serif text-wine font-bold text-base sm:text-lg">🍝 Lasagna Large</p>
                      <p className="text-terracotta font-serif font-semibold">$230 (Serve 16 people)</p>
                      <p className="text-wine/60 text-xs sm:text-sm"></p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-cream to-cream-light rounded-xl shadow-sm border border-terracotta/20 hover:shadow-md transition-all">
                      <p className="font-serif text-wine font-bold text-sm sm:text-base">🍽️ Platter S</p>
                      <p className="text-terracotta font-serif text-xs sm:text-sm font-semibold">$72</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-cream to-cream-light rounded-xl shadow-sm border border-terracotta/20 hover:shadow-md transition-all">
                      <p className="font-serif text-wine font-bold text-sm sm:text-base">🍕 Pizzette</p>
                      <p className="text-terracotta font-serif text-xs sm:text-sm font-semibold">$27-77</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-cream to-cream-light rounded-xl shadow-sm border border-terracotta/20 hover:shadow-md transition-all">
                      <p className="font-serif text-wine font-bold text-sm sm:text-base">🧁 Maritozzi</p>
                      <p className="text-terracotta font-serif text-xs sm:text-sm font-semibold">$36-134</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-terracotta/15 to-wine/15 p-3 sm:p-4 md:p-5 rounded-xl border-2 border-terracotta/30">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta" />
                      <p className="text-wine font-serif font-bold text-base sm:text-lg md:text-xl text-center">Minimum Order: $200 SGD</p>
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta" />
                    </div>
                    <p className="text-wine font-serif italic text-center text-xs sm:text-sm flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                      ⏰ 48-hour notice • 📍 Singapore pickup • 🎉 Perfect for events
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Private Dining Highlight */}
            <div className="bg-gradient-to-r from-wine/5 to-terracotta/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-wine/20 shadow-lg">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-wine mb-4">Private Dining Experiences</h3>
                <p className="text-wine/80 font-serif text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto">
                  Bring the authentic taste of Italy to your home with our exclusive private dining experiences. 
                  Perfect for special occasions and intimate gatherings.
                  </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                    <h4 className="font-serif text-wine font-bold text-sm sm:text-base">I Love Italian Food</h4>
                    <p className="text-terracotta font-serif">From $1700 (Up to 25 pax)</p>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                    <h4 className="font-serif text-wine font-bold text-sm sm:text-base">Italian Street Food</h4>
                    <p className="text-terracotta font-serif">From $1500 (Up to 25 pax)</p>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                    <h4 className="font-serif text-wine font-bold text-sm sm:text-base">Pinsa Romana</h4>
                    <p className="text-terracotta font-serif">From $1300  (Up to 25 pax)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-4 sm:space-y-6 bg-gradient-to-br from-wine/5 to-terracotta/5 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl">
              <p className="text-wine/80 font-serif italic text-base sm:text-lg md:text-xl">
                Don't miss out on these exclusive offers!
              </p>
              <div className="flex flex-col gap-4 sm:gap-6 justify-center">
                <Link
                  to="/booking"
                  onClick={handleBookNow}
                  className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-terracotta to-terracotta-dark text-cream px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full hover:from-terracotta-dark hover:to-terracotta transition-all shadow-lg hover:shadow-xl font-serif text-sm sm:text-base md:text-lg transform hover:scale-105"
                >
                  <span>Book Private Dining</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
                <Link
                  to="/booking"
                  onClick={handleBookNow}
                  className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-wine to-wine-dark text-cream px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-full hover:from-wine-dark hover:to-wine transition-all shadow-lg hover:shadow-xl font-serif text-sm sm:text-base md:text-lg lg:text-xl transform hover:scale-105"
                >
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
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
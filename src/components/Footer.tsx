import React from 'react';
import { Instagram, Phone, Send, Heart, MapPin, Mail } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  return (
    <footer className="bg-wine text-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Instagram Highlight */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-wine-dark rounded-xl p-4 sm:p-6 md:p-8 shadow-lg transform hover:scale-[1.02] transition-transform">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Instagram className="w-6 h-6 sm:w-8 sm:h-8 text-terracotta" />
                  <h3 className="text-xl sm:text-2xl font-serif">Follow My Journey</h3>
                </div>
                <p className="mb-4 sm:mb-6 text-cream/90 font-serif italic text-sm sm:text-base">
                  Join me on Instagram for daily culinary adventures, behind-the-scenes moments, 
                  and the latest updates on private dining experiences.
                </p>
                <a 
                  href="https://instagram.com/soundoflovewithluca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-terracotta text-cream px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-terracotta-dark transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  <span className="font-serif">@thesoundoflovewithluca</span>
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                <img 
                  src="https://res.cloudinary.com/dqfsqcl4s/image/upload/v1738137482/WhatsApp_Image_2025-01-29_at_3.52.23_PM_cgqpov.jpg" 
                  alt="Chef Luca's culinary journey"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact & Social */}
          <div className="bg-wine-dark rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-serif mb-4 sm:mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-terracotta" />
              Get In Touch
            </h3>
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <a 
                href="tel:+6597591439" 
                className="flex items-center gap-3 hover:text-terracotta transition-colors group"
              >
                <Phone className="w-5 h-5 group-hover:text-terracotta" />
                <span className="font-serif text-sm sm:text-base">+65 9759 1439</span>
              </a>
              <a 
                href="mailto:soundoflovewithluca@gmail.com" 
                className="flex items-center gap-3 hover:text-terracotta transition-colors group"
                aria-label="Email private Italian chef in Singapore"
              >
                <Mail className="w-5 h-5 group-hover:text-terracotta" />
                <span className="font-serif text-sm sm:text-base break-all">llattarini1982@soundoflovewithluca.com</span>
              </a>
              <a 
                href="https://instagram.com/soundoflovewithluca" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 hover:text-terracotta transition-colors group"
                aria-label="Follow Chef Luca on Instagram - Private Italian Chef Singapore"
              >
                <Instagram className="w-5 h-5 group-hover:text-terracotta" />
                <span className="font-serif text-sm sm:text-base">@thesoundoflovewithluca</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-terracotta" />
                <span className="font-serif text-sm sm:text-base">Singapore</span>
              </div>
            </div>
            
            {/* Telegram Section */}
            <div className="border-t border-cream/10 pt-4 sm:pt-6">
              <h4 className="text-base sm:text-lg font-serif mb-3 sm:mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-terracotta" />
                Join My Community
              </h4>
              <p className="mb-3 sm:mb-4 text-cream/90 font-serif italic text-xs sm:text-sm">
                Get exclusive recipes, cooking tips, and first access to special offers.
              </p>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://t.me/soundoflovewithluca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-terracotta text-cream px-3 sm:px-4 py-2 rounded-full hover:bg-terracotta-dark transition-all shadow-md hover:shadow-lg text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span className="font-serif">Telegram Channel</span>
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <NewsletterSignup />
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-cream/10 text-center">
          <p className="font-serif italic flex items-center justify-center gap-2 text-sm sm:text-base">
            Made with <Heart className="w-4 h-4 text-terracotta" /> by Sound of Love with Luca © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
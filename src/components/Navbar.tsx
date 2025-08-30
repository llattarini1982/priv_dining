import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Book', href: '/booking' }
  ];

  const isActive = (path: string) => {
    if (path.startsWith('#')) {
      return location.hash === path;
    }
    return location.pathname === path;
  };

  return (
    <nav className="bg-cream shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-olive hover:text-wine focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Centered Logo/Title */}
          <div className="flex-1 flex items-center justify-center">
            <Link to="/" className="flex flex-col items-center">
              <span className="text-lg sm:text-xl md:text-2xl font-serif text-wine text-center">
                Trattoria Italiana
              </span>
              <span className="text-xs sm:text-sm font-serif text-wine/80 text-center">
                by Sound of Love with Luca
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'text-wine font-semibold'
                    : 'text-olive hover:text-wine'
                } transition-colors duration-200 text-sm sm:text-base`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-cream shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'text-wine font-semibold'
                    : 'text-olive'
                } block px-3 py-3 rounded-md text-base hover:bg-cream-dark transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
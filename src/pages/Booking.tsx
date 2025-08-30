import React, { useState } from 'react';
import { Users, CheckCircle2, ArrowRight, Package, Calendar, MapPin, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createBooking } from '../lib/bookingService';
import specialOrdersMenu from '../data/special-orders-menu.json';
import iLoveItalianMenu from '../data/i-love-italian-menu.json';
import italianFeasts from '../data/italian-feasts.json';
import italianStreetFood from '../data/italian-street-food-menu.json';
import pinsaRomanaMenu from '../data/pinsa-romana-menu.json';
import type { Package as MenuPackage } from '../types/menu';

const menuData = {
  packages: [
    {
      id: "i-love-italian",
      name: "I love Italian Food",
      description: "Perfect for intimate gatherings and family dinners",
      price: 1700,
      minSpending: 1700,
      minGuests: 6,
      maxGuests: 25,
      courses: 5,
      includes: [
        "4 - courses traditional Italian meal (Antipasto, Starter, Main Course, Dessert)",
        "1 - Italian Feast course"
      ],
      category: "standard",
      menuFile: "i-love-italian-menu.json",
      availableFrom: "2025-08-29"
    },
    {
      id: "italian-sharing",
      name: "I love Italian Street Food",
      description: "Experience Italian street food from different Italian regions",
      price: 1500,
      minSpending: 1500,
      minGuests: 6,
      maxGuests: 25,
      courses: 6,
      includes: [
        "6 - Italian Street Food items at your choice"
      ],
      category: "standard",
      menuFile: "italian-street-food-menu.json",
      availableFrom: "2025-08-29"
    }
    ,
    {
      id: "italian-pizza",
      name: "The Pinsa Romana",
      description: "Experience the Real Pinsa Romana. Ideal for Pizza Lovers. ",
      price: 1300,
      minSpending: 1300,
      minGuests: 6,
      maxGuests: 25,
      courses: 5,
      includes: [
        "4 - Pinsa Romana at  your choice",
        "1- Special Pinsa Romana of the day"
      ],
      category: "standard",
      menuFile: "pinsa-romana-menu.json",
      availableFrom: "2025-08-29"
    },
      {
      id: "special-orders",
      name: "Special Orders",
      description: "Choose your Pizza Romana Base, Homemade Lasagna and Sharing Platter",
      minSpending: 200,
      category: "standard",
      menuFile: "special-orders-menu.json"
    }
  ],
  addons: [
    {
      id: "aperol-spritz",
      name: "Italian Happy Hour Vibe with Aperol Spritz",
      description: "Welcome your guests with our signature Aperol Spritz service",
      image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80"
    },
    {
      id: "wine-pairing",
      name: "Curated Wine Pairing",
      description: "Expert-selected Italian wines paired with each course",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80"
    }
  ],
  sections: []
};

function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});
  const [specialOrders, setSpecialOrders] = useState<Array<{
    itemType: 'pinsa_base' | 'lasagna' | 'pizzette' | 'sharing_platter';
    size: 'XS' | 'S' | 'M' | 'L';
    quantity: number;
    price: number;
    name: string;
  }>>([]);
  const [menuSelectionError, setMenuSelectionError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState({
    package: '',
    date: '',
    guests: '',
    venue: '',
    contact: '',
    email: '',
    pickupTime: ''
  });
  
  const [formData, setFormData] = useState({
    package: '',
    bookingDate: '',
    pickupTime: '',
    guestCount: 2,
    venueType: '' as 'home' | 'rental' | '',
    venueAddress: '',
    selectedAreas: [] as string[],
    name: '',
    email: '',
    phone: '',
    notes: '',
    dietaryRequirements: ''
  });

  const isSpecialOrder = formData.package === 'special-orders';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'pickupTime') {
      const selectedDateTime = new Date(value);
      const now = new Date();
      const minDateTime = new Date();
      minDateTime.setHours(now.getHours() + 48);
      
      // Check for blackout period (August 20-27, 2025) for special orders
      if (isSpecialOrder) {
        const blackoutStart = new Date('2025-08-20');
        const blackoutEnd = new Date('2025-08-27T23:59:59');
        
        if (selectedDateTime >= blackoutStart && selectedDateTime <= blackoutEnd) {
          setFormErrors(prev => ({
            ...prev,
            pickupTime: 'Special orders are not available from August 20-27, 2025. Please select a different date.'
          }));
          return;
        }
      }
      
      // Check if time is between 11 AM and 10 PM
      const selectedHour = selectedDateTime.getHours();
      const isValidTime = selectedHour >= 11 && selectedHour <= 22;
      
      if (selectedDateTime < minDateTime) {
        setFormErrors(prev => ({
          ...prev,
          pickupTime: 'Please select a time at least 48 hours in advance'
        }));
      } else if (!isValidTime) {
        setFormErrors(prev => ({
          ...prev,
          pickupTime: 'Pickup time must be between 11:00 AM and 10:00 PM'
        }));
      } else {
        setFormErrors(prev => ({
          ...prev,
          pickupTime: ''
        }));
      }
    }
    
    if (name === 'bookingDate') {
      const selectedDate = new Date(value);
      const today = new Date();
      
      // Get the selected package to determine minimum date
      const selectedPackage = menuData.packages.find(pkg => pkg.id === formData.package);
      let minDate = new Date();
      
      if (selectedPackage?.availableFrom) {
        // For restricted packages, minimum date is availability date
        minDate = new Date(selectedPackage.availableFrom);
      } else {
        // For unrestricted packages, minimum date is today + 10 days
        minDate.setDate(today.getDate() + 10);
      }
      
      if (selectedDate < minDate) {
        setFormErrors(prev => ({
          ...prev,
          date: selectedPackage?.availableFrom
            ? `Please select a date from ${minDate.toLocaleDateString('en-SG', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })} onwards`
            : 'Please select a date at least 10 days in advance'
        }));
      } else {
        setFormErrors(prev => ({
          ...prev,
          date: ''
        }));
      }
    }
    
    if (name === 'phone') {
      const hasEightDigits = (value.match(/\d/g) || []).length >= 8;
      setFormErrors(prev => ({
        ...prev,
        contact: hasEightDigits ? '' : 'Please enter a valid phone number (minimum 8 digits)'
      }));
      setFormData(prev => ({ ...prev, [name]: value }));
      return;
    }
    
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setFormErrors(prev => ({
        ...prev,
        email: emailRegex.test(value) ? '' : 'Please enter a valid email address'
      }));
    }
    
    if (name === 'guestCount') {
      const count = parseInt(value);
      setFormErrors(prev => ({
        ...prev,
        guests: count > 25 ? 'Maximum 25 guests allowed' : 
               count < 1 ? 'At least 1 guest required' : ''
      }));
      if (count >= 1 && count <= 25) {
        setFormData(prev => ({ ...prev, guestCount: count }));
      } else {
        return;
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePackageSelect = (packageId: string) => {
    setFormData(prev => ({
      ...prev,
      package: packageId,
      bookingDate: '',
      pickupTime: '',
      guestCount: 2,
      venueType: '',
      venueAddress: '',
      selectedAreas: [],
      name: '',
      email: '',
      phone: '',
      notes: '',
      dietaryRequirements: ''
    }));
    setSelectedItems({});
    setSpecialOrders([]);
    setMenuSelectionError(null);
    setFormErrors({
      package: '',
      date: '',
      guests: '',
      venue: '',
      contact: '',
      email: '',
      pickupTime: ''
    });
  };

  const handleVenueTypeSelect = (type: 'home' | 'rental') => {
    setFormData(prev => ({
      ...prev,
      venueType: type,
      venueAddress: type === 'rental' ? '' : prev.venueAddress,
      selectedAreas: type === 'rental' ? prev.selectedAreas : []
    }));
  };

  const handleAreaSelect = (areaId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAreas: prev.selectedAreas.includes(areaId)
        ? prev.selectedAreas.filter(id => id !== areaId)
        : prev.selectedAreas.length < 2
          ? [...prev.selectedAreas, areaId]
          : prev.selectedAreas
    }));
  };

  const getMenuForPackage = () => {
    switch (formData.package) {
      case 'i-love-italian':
        return iLoveItalianMenu;
      case 'italian-sharing':
        return italianStreetFood;
      case 'italian-pizza':
        return pinsaRomanaMenu;
      default:
        return null;
    }
  };

  const handleItemSelect = (itemName: string) => {
    const selectedMenu = getMenuForPackage();
    if (!selectedMenu) return;

    const currentSelectedCount = Object.values(selectedItems).filter(Boolean).length;
    let requiredSelections = 4;

    switch (formData.package) {
      case 'italian-pizza':
        requiredSelections = 4;
        break;
      case 'i-love-italian':
        requiredSelections = 4;
        break;
      case 'italian-sharing':
        requiredSelections = 5;
        break;
    }

    const isCurrentlySelected = selectedItems[itemName];
    if (!isCurrentlySelected && currentSelectedCount >= requiredSelections) {
      toast.error(`You can only select ${requiredSelections} items`);
      return;
    }

    setSelectedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const validateStep = (step: number) => {
    if (isSpecialOrder) {
      switch (step) {
        case 1:
          return !!formData.package;
        case 2:
          return !!formData.pickupTime && !formErrors.pickupTime;
        case 3:
          return specialOrders.reduce((total, order) => total + (order.price * order.quantity), 0) >= 200;
        case 4:
          return (
            !!formData.name &&
            !!formData.email && !formErrors.email &&
            !!formData.phone &&
            !formErrors.contact
          );
        default:
          return false;
      }
    } else {
      switch (step) {
        case 1:
          return !!formData.package;
        case 2:
          return (
            !!formData.venueType &&
            !!formData.bookingDate &&
            !formErrors.date &&
            !formErrors.guests &&
            (formData.venueType === 'home' ? !!formData.venueAddress : true) &&
            (formData.venueType === 'rental' ? formData.selectedAreas.length > 0 : true)
          );
        case 3:
          return Object.values(selectedItems).filter(Boolean).length > 0;
        case 4:
          return (
            !!formData.name &&
            !!formData.email && !formErrors.email &&
            !!formData.phone &&
            !formErrors.contact
          );
        default:
          return false;
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const validSpecialOrders = specialOrders.filter(order => 
        order.quantity > 0 && 
        typeof order.price === 'number' && 
        order.price > 0 && 
        !isNaN(order.price)
      );
      
      // Format selected items properly
      const formattedSelectedItems = Object.entries(selectedItems)
        .filter(([_, selected]) => selected)
        .map(([name]) => ({ name, quantity: 1 }));

      const bookingData = {
        specialOrders: validSpecialOrders,
        bookingType: isSpecialOrder ? 'special_order' : 'dining',
        ...formData,
        selectedItems: formattedSelectedItems
      };

      const result = await createBooking(bookingData);

      if (result.success) {
        if (result.booking) {
          toast.success('Booking submitted successfully! We will contact you shortly to confirm your booking.');
          setCurrentStep(1);
          setFormData({
            package: '',
            bookingDate: '',
            pickupTime: '',
            guestCount: 2,
            venueType: '',
            venueAddress: '',
            selectedAreas: [],
            name: '',
            email: '',
            phone: '',
            notes: '',
            dietaryRequirements: ''
          });
          setSpecialOrders([]);
          setSelectedItems({});
        }
      } else {
        toast.error(result.error || 'Failed to submit booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const getMinPickupDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 48);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="min-h-screen bg-cream pt-16" itemScope itemType="https://schema.org/ReservationAction">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-3 sm:mb-4 text-wine px-4" itemProp="name">Book Private Chef Singapore | Authentic Italian Cuisine</h1>
        <p className="text-center text-wine/80 mb-6 sm:mb-8 font-serif italic max-w-2xl mx-auto px-4" itemProp="description">
          Book Chef Luca for authentic Italian private dining in Singapore. Choose from traditional packages or special orders. Minimum 48-hour notice required.
        </p>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          {/* Step 1: Package Selection */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif text-wine mb-4 sm:mb-6">Choose Your Italian Experience</h2>
              <div className="grid gap-4 sm:gap-6">
                {menuData.packages.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handlePackageSelect(option.id)}
                    className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all relative ${
                      formData.package === option.id ? 'border-wine bg-wine/5' : 'border-wine/20 hover:border-wine/40'
                    }`}
                  >
                    {option.availableFrom && (
                      <div className="absolute top-2 right-2 bg-terracotta text-cream px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-serif">
                        Calendar from {new Date(option.availableFrom).toLocaleDateString('en-SG', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    )}
                    <h3 className="text-lg sm:text-xl font-serif text-wine mb-2">
                      {option.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-terracotta" />
                      <p className="text-base sm:text-lg text-wine font-serif">${option.minSpending}</p>
                    </div>
                    <p className="text-sm text-wine/70 mb-2">
                      Minimum spending required
                    </p>
                    <p className="text-sm text-wine/70 mb-4 font-serif italic">
                      {option.description}
                    </p>
                    <div className="space-y-2">
                      {option.includes?.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-wine/80">
                          <CheckCircle2 className="w-4 h-4 text-terracotta flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                      {option.maxGuests && (
                        <div className="flex items-center gap-2 text-sm text-wine/80 mt-4">
                          <Users className="w-4 h-4 text-terracotta flex-shrink-0" />
                          <span>Up to {option.maxGuests} guests</span>
                        </div>
                      )}
                     {option.availableFrom && (
                       <div className="mt-4 p-2 sm:p-3 bg-cream rounded-lg border border-terracotta/20">
                         <p className="text-sm text-wine/70 font-serif italic">
                           Calendar dates available from {new Date(option.availableFrom).toLocaleDateString('en-SG', {
                             day: 'numeric',
                             month: 'short',
                             year: 'numeric'
                           })} onwards
                         </p>
                       </div>
                     )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => validateStep(1) && setCurrentStep(2)}
                disabled={!validateStep(1)}
                className="w-full bg-wine text-cream px-4 sm:px-6 py-3 sm:py-4 rounded font-serif hover:bg-wine-dark transition-colors flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Special Orders - Pickup Time OR Regular - Venue & Date */}
          {currentStep === 2 && isSpecialOrder && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif text-wine mb-4 sm:mb-6">Select Pickup Time</h2>
              <div>
                <label className="block text-wine font-serif mb-2">Pickup Date & Time</label>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-terracotta" />
                  <span className="text-xs sm:text-sm text-wine/70">Minimum 48 hours notice required • Available 11:00 AM - 10:00 PM • Not available Aug 20-27, 2025</span>
                </div>
                <input
                  type="datetime-local"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  min={getMinPickupDateTime()}
                  className="w-full px-4 py-2 rounded border border-wine/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none"
                />
                {formErrors.pickupTime && (
                  <p className="mt-2 text-terracotta text-xs sm:text-sm">{formErrors.pickupTime}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setFormData(prev => ({
                      ...prev,
                      pickupTime: ''
                    }));
                  }}
                  className="w-full bg-cream-dark text-wine px-6 py-3 sm:py-4 rounded font-serif hover:bg-cream transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => validateStep(2) && setCurrentStep(3)}
                  disabled={!validateStep(2)}
                  className={`w-full bg-wine text-cream px-6 py-3 rounded font-serif hover:bg-wine-dark transition-colors ${
                    !validateStep(2) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Regular Packages - Venue & Date */}
          {currentStep === 2 && !isSpecialOrder && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif text-wine mb-4 sm:mb-6">Select Venue & Date</h2>
              <div>
                <label className="block text-wine font-serif mb-2">Select Venue Type</label>
                <div>
                  <div 
                    onClick={() => handleVenueTypeSelect('home')}
                    className={`
                      p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${formData.venueType === 'home' 
                        ? 'border-wine bg-wine/5' 
                        : 'border-wine/20 hover:border-wine/40'}
                    `}
                  >
                    <h4 className="font-serif text-wine text-lg">Your Home</h4>
                    <p className="text-wine/70 text-xs sm:text-sm">I'll bring the restaurant experience to your place</p>
                  </div>
                </div>
              </div>

              {formData.venueType && (
                <>
                  {formData.venueType === 'home' && (
                    <div>
                      <label className="block text-wine font-serif mb-2">Venue Address</label>
                      <textarea
                        name="venueAddress"
                        rows={2}
                        placeholder="Enter complete address..."
                        value={formData.venueAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded border border-wine/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-wine font-serif mb-2">Select Date</label>
                    <input
                      type="date"
                      name="bookingDate"
                      value={formData.bookingDate}
                      onChange={handleInputChange}
                      min={(() => {
                        const selectedPackage = menuData.packages.find(pkg => pkg.id === formData.package);
                        
                        if (selectedPackage?.availableFrom) {
                          // For restricted packages, use the availability date
                          const availableDate = new Date(selectedPackage.availableFrom);
                          return availableDate.toISOString().split('T')[0];
                        } else {
                          // For unrestricted packages, use current date + 10 days
                          const date = new Date();
                          date.setDate(date.getDate() + 10);
                          return date.toISOString().split('T')[0];
                        }
                      })()}
                      className="w-full px-4 py-2 rounded border border-wine/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none"
                    />
                    {formErrors.date && (
                      <p className="mt-2 text-terracotta text-xs sm:text-sm">{formErrors.date}</p>
                    )}
                    {(() => {
                      const selectedPackage = menuData.packages.find(pkg => pkg.id === formData.package);
                      if (selectedPackage?.availableFrom) {
                        return (
                          <p className="mt-2 text-wine/70 text-xs sm:text-sm font-serif italic">
                            📅 Calendar available from {new Date(selectedPackage.availableFrom).toLocaleDateString('en-SG', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })} onwards
                          </p>
                        );
                      }
                      return null;
                    })()}
                  </div>
                  <div>
                    <label className="block text-wine font-serif mb-2">Number of Guests</label>
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      min={1}
                      max={25}
                      className="w-full px-4 py-2 rounded border border-wine/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none"
                    />
                    {formErrors.guests && (
                      <p className="mt-2 text-terracotta text-xs sm:text-sm">{formErrors.guests}</p>
                    )}
                  </div>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setFormData(prev => ({
                      ...prev,
                      venueType: '',
                      venueAddress: '',
                      selectedAreas: [],
                      bookingDate: '',
                      guestCount: 2
                    }));
                  }}
                  className="w-full bg-cream-dark text-wine px-6 py-3 sm:py-4 rounded font-serif hover:bg-cream transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => validateStep(2) && setCurrentStep(3)}
                  disabled={!validateStep(2)}
                  className={`w-full bg-wine text-cream px-6 py-3 rounded font-serif hover:bg-wine-dark transition-colors ${
                    !validateStep(2) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Special Orders - Menu Selection */}
          {currentStep === 3 && isSpecialOrder && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-wine mb-4">🍕 Order Authentic Italian Specialties</h2>
                <div className="bg-gradient-to-r from-terracotta/10 to-wine/10 p-4 sm:p-6 rounded-xl border-2 border-terracotta/30">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Package className="w-6 h-6 sm:w-8 sm:h-8 text-terracotta" />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-wine">Minimum Order: $200 SGD</h3>
                  </div>
                  <p className="text-wine/80 font-serif italic text-base sm:text-lg mb-4">
                    🎯 Perfect for parties, events, or stocking up on authentic Italian favorites!
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                    <div className="bg-white/50 p-2 sm:p-3 rounded-lg">
                      <p className="font-serif text-wine font-bold text-sm sm:text-base">🍕 Pizza Bases</p>
                      <p className="text-terracotta text-xs sm:text-sm">From $18</p>
                    </div>
                    <div className="bg-white/50 p-2 sm:p-3 rounded-lg">
                      <p className="font-serif text-wine font-bold text-sm sm:text-base">🍝 Lasagna</p>
                      <p className="text-terracotta text-xs sm:text-sm">From $20</p>
                    </div>
                    <div className="bg-white/50 p-2 sm:p-3 rounded-lg">
                      <p className="font-serif text-wine font-bold text-sm sm:text-base">🍽️ Platters</p>
                      <p className="text-terracotta text-xs sm:text-sm">From $72</p>
                    </div>
                    <div className="bg-white/50 p-2 sm:p-3 rounded-lg">
                      <p className="font-serif text-wine font-bold text-sm sm:text-base">🧁 Desserts</p>
                      <p className="text-terracotta text-xs sm:text-sm">From $36</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-wine/5 to-terracotta/5 p-4 sm:p-6 rounded-xl border border-wine/20 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-terracotta" />
                  <h3 className="text-lg sm:text-xl font-serif text-wine">📦 How Special Orders Work</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-terracotta text-cream rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span className="text-wine/80 font-serif">Choose items (min $200)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-terracotta text-cream rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span className="text-wine/80 font-serif">48-hour preparation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-terracotta text-cream rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span className="text-wine/80 font-serif">Pickup fresh & ready</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 max-h-[400px] overflow-y-auto pr-2 sm:pr-4">
                {specialOrdersMenu.categories.map((category, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-serif text-wine">{category.name}</h3>
                    <p className="text-wine/70 font-serif italic">{category.description}</p>
                    <div className="grid gap-3 sm:gap-4 mt-4">
                      {category.items.map((item, itemIndex) => {
                        const itemPrice = parseFloat(item.price.toString());
                        if (isNaN(itemPrice) || itemPrice <= 0) {
                          console.error(`Invalid price for item: ${item.name}`);
                          return null;
                        }

                        const getItemType = (categoryName: string): 'pinsa_base' | 'lasagna' | 'pizzette' | 'sharing_platter' => {
                          const typeMap: Record<string, 'pinsa_base' | 'lasagna' | 'pizzette' | 'sharing_platter'> = {
                            'Pinsa Romana Base': 'pinsa_base',
                            'Lasagna': 'lasagna',
                            'Pizzette': 'pizzette',
                            'Sharing Plattler': 'sharing_platter'
                          };
                          return typeMap[categoryName] || 'pinsa_base';
                        };

                        const getSize = (itemName: string): 'XS' | 'S' | 'M' | 'L' => {
                          if (itemName.includes('XS')) return 'XS';
                          if (itemName.includes('S')) return 'S';
                          if (itemName.includes('M')) return 'M';
                          if (itemName.includes('L')) return 'L';
                          return 'M';
                        };

                        return (
                          <div key={itemIndex} className="p-3 sm:p-4 rounded-lg border-2 border-wine/20 hover:border-wine/40 transition-all">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-serif text-wine text-sm sm:text-base">{item.name}</h4>
                                <p className="text-xs sm:text-sm text-wine/70">{item.description}</p>
                                {item.servings && (
                                  <p className="text-xs sm:text-sm text-terracotta font-serif italic mt-1">Serves {item.servings} people</p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="font-serif text-wine text-base sm:text-lg">${itemPrice.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3 sm:mt-4">
                              <input
                                type="number"
                                min="0"
                               value={specialOrders.find(order => 
                                 order.itemType === getItemType(category.name) && 
                                 order.size === getSize(item.name)
                               )?.quantity || 0}
                                className="w-16 sm:w-20 px-2 sm:px-4 py-2 rounded border border-wine/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none text-sm"
                                onChange={(e) => {
                                  const quantity = parseInt(e.target.value) || 0;
                                  const itemType = getItemType(category.name);
                                  const size = getSize(item.name);
                                  
                                  if (quantity > 0) {
                                    setSpecialOrders(prev => {
                                      const filtered = prev.filter(order => 
                                        !(order.itemType === itemType && order.size === size)
                                      );
                                      
                                      return [...filtered, { 
                                        itemType,
                                        size,
                                        quantity,
                                        price: itemPrice,
                                        name: item.name
                                      }];
                                    });
                                  } else {
                                    setSpecialOrders(prev => 
                                      prev.filter(order => 
                                        !(order.itemType === itemType && order.size === size)
                                      )
                                    );
                                  }
                                }}
                              />
                              <span className="text-wine/70 font-serif text-sm">Quantity</span>
                            </div>
                           {(() => {
                             const currentOrder = specialOrders.find(order => 
                               order.itemType === getItemType(category.name) && 
                               order.size === getSize(item.name)
                             );
                             return currentOrder && currentOrder.quantity > 0;
                           })() && (
                              <div className="mt-2 text-right">
                                <p className="text-terracotta font-serif text-sm">
                                 Total: ${(((specialOrders.find(order => 
                                   order.itemType === getItemType(category.name) && 
                                   order.size === getSize(item.name)
                                 )?.quantity || 0) * itemPrice)).toFixed(2)}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Show total amount for special orders */}
              {specialOrders.length > 0 && (
                <div className="bg-gradient-to-r from-terracotta/10 to-wine/10 p-4 sm:p-6 rounded-xl border-2 border-terracotta/30 sticky bottom-0">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-wine font-serif text-lg sm:text-xl">💰 Total Amount:</span>
                    <span className="text-terracotta font-serif text-xl sm:text-2xl font-bold">
                      ${specialOrders.reduce((total, order) => total + (order.price * order.quantity), 0).toFixed(2)} SGD
                    </span>
                  </div>
                  {(() => {
                    const currentTotal = specialOrders.reduce((total, order) => total + (order.price * order.quantity), 0);
                    const remaining = 200 - currentTotal;
                    
                    if (currentTotal < 200) {
                      return (
                        <div className="bg-wine/10 p-3 sm:p-4 rounded-lg">
                          <p className="text-wine font-serif text-center">
                            🎯 Add ${remaining.toFixed(2)} more to reach minimum order of $200 SGD
                          </p>
                          <div className="w-full bg-cream mt-2 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-terracotta to-wine h-3 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((currentTotal / 200) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-center text-wine/70 text-xs sm:text-sm mt-1 font-serif italic">
                            {((currentTotal / 200) * 100).toFixed(0)}% towards minimum order
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div className="bg-green-100 p-4 rounded-lg text-center">
                          <p className="text-green-800 font-serif">
                            ✅ Minimum order requirement met! Ready to proceed.
                          </p>
                        </div>
                      );
                    }
                  })()}
                </div>
              )}
              
              {specialOrders.length === 0 && (
                <div className="bg-cream-light p-4 sm:p-6 md:p-8 rounded-xl text-center border-2 border-dashed border-wine/30">
                  <Package className="w-16 h-16 text-wine/40 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-serif text-wine mb-2">Start Building Your Order</h3>
                  <p className="text-wine/70 font-serif italic">
                    Select quantities for your favorite Italian specialties above to get started!
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    setCurrentStep(2);
                    setSpecialOrders([]);
                  }}
                  className="w-full bg-cream-dark text-wine px-6 py-3 sm:py-4 rounded font-serif hover:bg-cream transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => validateStep(3) && setCurrentStep(4)}
                  disabled={!validateStep(3)}
                  className={`w-full bg-wine text-cream px-6 py-3 rounded font-serif hover:bg-wine-dark transition-colors text-lg ${
                    !validateStep(3) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  {specialOrders.reduce((total, order) => total + (order.price * order.quantity), 0) >= 200 
                    ? '🎉 Continue to Checkout' 
                    : 'Next Step (Min $200 required)'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Regular Packages - Menu Selection */}
          {currentStep === 3 && !isSpecialOrder && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif text-wine mb-4 sm:mb-6">Menu Selection</h2>
              
              <div className="bg-cream-light p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-wine font-serif">Selected Items: </span>
                    <span className="text-terracotta font-serif">
                      {Object.values(selectedItems).filter(Boolean).length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 max-h-[400px] overflow-y-auto pr-2 sm:pr-4">
                {getMenuForPackage()?.courses?.map((course, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-serif text-wine">{course.title}</h3>
                    {course.description && (
                      <p className="text-wine/70 font-serif italic">{course.description}</p>
                    )}
                    <div className="grid gap-3 sm:gap-4">
                      {course.items?.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          onClick={() => handleItemSelect(item.name)}
                          className={`
                            p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all
                            ${selectedItems[item.name]
                              ? 'border-wine bg-wine/5'
                              : 'border-wine/20 hover:border-wine/40'}
                          `}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-serif text-wine text-sm sm:text-base">{item.name}</h4>
                              <p className="text-wine/70 text-xs sm:text-sm">{item.description}</p>
                            </div>
                            {selectedItems[item.name] && (
                              <CheckCircle2 className="w-5 h-5 text-terracotta" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    setCurrentStep(2);
                    setSelectedItems({});
                    setMenuSelectionError(null);
                  }}
                  className="w-full bg-cream-dark text-wine px-6 py-3 sm:py-4 rounded font-serif hover:bg-cream transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => validateStep(3) && setCurrentStep(4)}
                  disabled={!validateStep(3)}
                  className={`w-full bg-wine text-cream px-6 py-3 rounded font-serif hover:bg-wine-dark transition-colors ${
                    !validateStep(3) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact Information & Final Booking */}
          {currentStep === 4 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif text-wine mb-4 sm:mb-6">Contact Information & Final Details</h2>
              <div>
                <label className="block text-wine font-serif mb-2">Contact Information</label>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded border border-wine/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded border border-wine/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none"
                  />
                  {formErrors.email && (
                    <p className="mt-2 text-terracotta text-xs sm:text-sm">{formErrors.email}</p>
                  )}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded border border-wine/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none"
                    />
                    {formErrors.contact && (
                      <p className="mt-2 text-terracotta text-xs sm:text-sm">{formErrors.contact}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-wine font-serif mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Any special requests..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded border border-wine/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none"
                />
              </div>

              {!isSpecialOrder && (
                <div>
                  <label className="block text-wine font-serif mb-2">Dietary Requirements</label>
                  <textarea
                    name="dietaryRequirements"
                    rows={2}
                    placeholder="List any allergies or restrictions..."
                    value={formData.dietaryRequirements}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded border border-wine/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    setCurrentStep(3);
                    setFormData(prev => ({
                      ...prev,
                      name: '',
                      email: '',
                      phone: '',
                      notes: '',
                      dietaryRequirements: ''
                    }));
                    setFormErrors(prev => ({
                      ...prev,
                      contact: '',
                      email: ''
                    }));
                  }}
                  className="w-full bg-cream-dark text-wine px-6 py-3 sm:py-4 rounded font-serif hover:bg-cream transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => validateStep(4) && handleSubmit()}
                  disabled={!validateStep(4)}
                  className={`w-full bg-wine text-cream px-6 py-3 rounded font-serif hover:bg-wine-dark transition-colors ${
                    !validateStep(4) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  {isSpecialOrder ? 'Submit Order' : 'Submit Booking'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
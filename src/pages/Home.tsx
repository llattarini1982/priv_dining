import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChefHat,
  Star,
  Heart,
  Music,
  Utensils,
  Pizza,
  Home as HomeIcon,
  ArrowRight,
  Package,
  MapPin
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import {
  getSEOPageBySlug,
  getFAQsByPage,
  getAllLocations,
  generateFAQSchema,
  SEOPage,
  SEOFAQ,
  SEOLocation
} from '../lib/seoService';

export default function Home() {
  const [seoData, setSeoData] = useState<SEOPage | null>(null);
  const [faqs, setFaqs] = useState<SEOFAQ[]>([]);
  const [locations, setLocations] = useState<SEOLocation[]>([]);

  useEffect(() => {
    const fetchSEOData = async () => {
      const [pageData, faqData, locationData] = await Promise.all([
        getSEOPageBySlug('home'),
        getFAQsByPage('home'),
        getAllLocations()
      ]);

      setSeoData(pageData);
      setFaqs(faqData);
      setLocations(locationData);
    };

    fetchSEOData();
  }, []);

  const schemas = [];
  if (faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  return (
    <>
      {seoData && (
        <SEOHead
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords}
          ogTitle={seoData.og_title}
          ogDescription={seoData.og_description}
          ogImage={seoData.og_image}
          canonicalUrl={seoData.canonical_url}
          geoLocality={seoData.geo_locality}
          geoCoordinates={seoData.geo_coordinates as { lat: number; lng: number }}
          schemas={schemas}
        />
      )}
      <div className="min-h-screen bg-cream pt-16">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80" 
            alt="Private Chef Experience in Singapore - Authentic Italian Cuisine" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-wine/70"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-cream px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-center mb-4 sm:mb-6" itemProp="name">
            <span className="text-lg sm:text-xl md:text-2xl block mb-2 sm:mb-4 font-serif italic text-terracotta">Welcome to</span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-terracotta" />
              <span className="text-center leading-tight">Sound of Love with Luca</span>
              <Music className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-terracotta" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl block mt-2 sm:mt-4 text-terracotta">Private Italian Chef Singapore</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-center max-w-3xl font-serif italic px-4">
            Authentic Italian cuisine brought to your Singapore home. 72-hour fermented pizza, handmade pasta & traditional recipes. Better than restaurants - personalized, intimate, all Singapore.
          </p>
          <Link 
            to="/booking" 
            className="bg-terracotta text-cream px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-terracotta-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Book private Italian chef service - Chef Luca"
          >
            Book Private Chef - From $1170
          </Link>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-cream" itemScope itemType="https://schema.org/AboutPage">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dqfsqcl4s/image/upload/v1738133875/WhatsApp_Image_2025-01-29_at_2.55.25_PM_ehmbnn.jpg" 
                  alt="Chef Luca - Private Italian Chef in Singapore preparing authentic Italian cuisine"
                  className="w-full h-full object-cover"
                  itemProp="image"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-wine text-cream p-3 sm:p-4 rounded-lg shadow-lg">
                <HomeIcon className="w-8 h-8 mb-2" />
                <p className="font-serif italic">Authentic Italian</p>
              </div>
            </div>
            
            <div className="space-y-6" itemProp="about">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-terracotta" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-wine" itemProp="headline">About Chef Luca</h2>
              </div>
              
              <div className="space-y-4 font-serif text-wine/80">
                <p className="italic text-lg leading-relaxed">
                  Born in Italy, I bring authentic culinary traditions to Singapore. I create unforgettable dining experiences in your home.
                </p>
                
                <p className="leading-relaxed">
                  My culinary journey began in my grandmother's kitchen, learning traditional techniques for handmade pasta and authentic pizza. Every recipe carries generations of Italian tradition.
                </p>
                
                <p className="leading-relaxed">
                  I specialize in bringing authentic Italian flavors to your home using traditional techniques and finest ingredients.
                </p>
                
                <p className="italic text-lg leading-relaxed text-wine">
                  Book your private Italian chef experience today. 48-hour notice required.
                </p>
              </div>

              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-terracotta text-cream px-6 py-3 rounded-full hover:bg-terracotta-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                aria-label="Book private Italian chef service - Chef Luca"
              >
                <span className="font-serif">Book Private Chef</span>
                <ChefHat className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Sections */}
      <section className="py-20 bg-cream-light" itemScope itemType="https://schema.org/Menu">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-4 text-wine" itemProp="name">Signature Italian Dishes</h2>
          <p className="text-center text-wine/80 mb-12 sm:mb-16 font-serif italic" itemProp="description">Authentic Italian pizza and pasta made fresh in your home</p>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Pizza Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all" itemScope itemType="https://schema.org/MenuItem">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-64 sm:h-80 overflow-hidden relative p-4">
                <div className="h-full rounded-lg overflow-hidden">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    aria-label="Chef Luca making authentic Italian Pinsa Romana pizza in Singapore"
                    className="w-full h-full object-cover"
                  >
                    <source 
                      src="https://res.cloudinary.com/dqfsqcl4s/video/upload/v1738071316/WhatsApp_Video_2025-01-28_at_8.47.54_PM_1_v4mzd5.mp4" 
                      type="video/mp4" 
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="h-full rounded-lg overflow-hidden">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    aria-label="Authentic Italian pizza making process by private chef in Singapore"
                    className="w-full h-full object-cover"
                  >
                    <source 
                      src="https://res.cloudinary.com/dqfsqcl4s/video/upload/v1738071316/WhatsApp_Video_2025-01-28_at_8.47.54_PM_h9gxwb.mp4" 
                      type="video/mp4" 
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Pizza className="w-8 h-8 text-terracotta" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-wine" itemProp="name">Pinsa Romana</h3>
                </div>
                <p className="text-wine/80 font-serif italic mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed" itemProp="description">
                  Authentic Italian Pinsa Romana with 72-hour fermented dough - longer than most restaurants for superior flavor and texture. Made fresh in your home using traditional Roman-style techniques. Crispy exterior, light airy interior. 🍕✨
                </p>
                <Link 
                  to="/booking" 
                  className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-serif italic text-base sm:text-lg"
                  aria-label="Book private chef for authentic Italian pizza"
                >
                  Book Pizza Experience
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Pasta Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all" itemScope itemType="https://schema.org/MenuItem">
              <div className="h-64 sm:h-80 overflow-hidden relative">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  aria-label="Chef Luca making handmade Italian pasta in Singapore"
                  className="w-full h-full object-cover"
                >
                  <source 
                    src="https://res.cloudinary.com/dqfsqcl4s/video/upload/v1738136104/WhatsApp_Video_2025-01-26_at_2.35.11_PM_1_i6fx6w.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Utensils className="w-8 h-8 text-terracotta" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-wine" itemProp="name">Handmade Italian Pasta</h3>
                </div>
                <p className="text-wine/80 font-serif italic mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed" itemProp="description">


                  Authentic handmade pasta crafted fresh in your home using traditional techniques. Fresh pasta made from scratch including Golden Ravioli, Carbonara, and regional specialties. 🍝✨
                </p>
                <Link 
                  to="/booking" 
                  className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-serif italic text-base sm:text-lg"
                  aria-label="Book private chef for handmade Italian pasta"
                >
                  Book Pasta Experience
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Orders Section */}
      <section className="py-20 bg-cream" itemScope itemType="https://schema.org/Service">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-wine" itemProp="name">🍕 Take Home Authentic Italian Specialties</h2>
            <div className="bg-gradient-to-r from-terracotta/10 to-wine/10 p-4 sm:p-6 md:p-8 rounded-2xl border-2 border-terracotta/30 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Package className="w-10 h-10 text-terracotta" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-wine">Minimum Order: $200 SGD</h3>
                <Package className="w-10 h-10 text-terracotta" />
              </div>
              <p className="text-wine/80 font-serif italic text-base sm:text-lg md:text-xl mb-6">
                🎯 Perfect for parties, events, meal prep, or sharing authentic Italian flavors with family & friends!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/70 p-3 sm:p-4 rounded-xl shadow-sm">
                  <p className="font-serif text-wine font-bold text-base sm:text-lg">🍕 Pizza Bases</p>
                  <p className="text-terracotta font-serif">72-hour fermented</p>
                  <p className="text-wine/70 text-xs sm:text-sm">From $18</p>
                </div>
                <div className="bg-white/70 p-3 sm:p-4 rounded-xl shadow-sm">
                  <p className="font-serif text-wine font-bold text-base sm:text-lg">🍝 Lasagna</p>
                  <p className="text-terracotta font-serif">Homemade sheets</p>
                  <p className="text-wine/70 text-xs sm:text-sm">From $20</p>
                </div>
                <div className="bg-white/70 p-3 sm:p-4 rounded-xl shadow-sm">
                  <p className="font-serif text-wine font-bold text-base sm:text-lg">🍽️ Platters</p>
                  <p className="text-terracotta font-serif">Perfect for sharing</p>
                  <p className="text-wine/70 text-xs sm:text-sm">From $72</p>
                </div>
                <div className="bg-white/70 p-3 sm:p-4 rounded-xl shadow-sm">
                  <p className="font-serif text-wine font-bold text-base sm:text-lg">🧁 Desserts</p>
                  <p className="text-terracotta font-serif">Sweet Maritozzi</p>
                  <p className="text-wine/70 text-xs sm:text-sm">From $36</p>
                </div>
              </div>
              <div className="mt-6 p-3 sm:p-4 bg-wine/10 rounded-xl">
                <p className="text-wine font-serif text-center text-sm sm:text-base">
                  ⏰ <strong>48-hour notice required</strong> • 📍 <strong>Singapore pickup/delivery</strong> • 🎉 <strong>Perfect for events & gatherings</strong>
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Pinsa Romana Base */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all" itemScope itemType="https://schema.org/Product">
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src="https://res.cloudinary.com/dbctsaxnu/image/upload/v1746454518/WhatsApp_Image_2025-05-05_at_10.14.44_PM_qfpcpz.jpg" 
                  alt="Authentic Italian Pinsa Romana base for pickup in Singapore"
                  className="w-full h-full object-cover"
                  itemProp="image"
                />
                <div className="absolute inset-0 bg-wine/20 group-hover:bg-wine/10 transition-colors"></div>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Pizza className="w-8 h-8 text-terracotta" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-wine" itemProp="name">72-Hour Fermented Pinsa Base - Singapore Pickup</h3>
                </div>
                <p className="text-wine/80 font-serif italic mb-4 sm:mb-6 text-base sm:text-lg" itemProp="description">
                  Authentic Italian Pinsa base with 72-hour fermentation, available for pickup in Singapore. Made using traditional Italian techniques and premium ingredients.
                </p>
                <div className="bg-cream p-3 sm:p-4 rounded-lg mb-4 sm:mb-6" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <div className="flex justify-between items-center">
                    <span className="text-wine font-serif">Starting from:</span>
                    <span className="text-terracotta font-serif text-lg sm:text-xl font-bold">
                      $<span itemProp="price">18</span> <span itemProp="priceCurrency">SGD</span>
                    </span>
                  </div>
                  <p className="text-wine/70 text-xs sm:text-sm mt-2 font-serif italic">
                    💡 Order 11+ bases to reach $200 minimum
                  </p>
                </div>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-terracotta to-terracotta-dark text-cream px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full hover:from-terracotta-dark hover:to-terracotta transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                  aria-label="Order authentic Italian Pinsa base for pickup in Singapore"
                >
                  <span className="font-serif">🍕 Order Pinsa Bases</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Lasagna */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all" itemScope itemType="https://schema.org/Product">
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src="https://res.cloudinary.com/dbctsaxnu/image/upload/v1746455119/WhatsApp_Image_2025-05-05_at_10.24.30_PM_jaxth4.jpg" 
                  alt="Authentic Italian homemade lasagna available for pickup in Singapore"
                  className="w-full h-full object-cover"
                  itemProp="image"
                />
                <div className="absolute inset-0 bg-wine/20 group-hover:bg-wine/10 transition-colors"></div>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Utensils className="w-8 h-8 text-terracotta" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-wine" itemProp="name">Authentic Italian Lasagna - Singapore Pickup</h3>
                </div>
                <p className="text-wine/80 font-serif italic mb-4 sm:mb-6 text-base sm:text-lg" itemProp="description">
                  Authentic Italian lasagna made with handmade pasta sheets, traditional Bolognese, and creamy béchamel. Available for pickup in Singapore in various sizes.
                </p>
                <div className="bg-cream p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      <p className="font-serif text-wine font-bold">Single (XS)</p>
                      <p className="text-terracotta font-serif">$<span itemProp="price">20</span></p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      <p className="font-serif text-wine font-bold">Family (L) serve 16 people</p>
                      <p className="text-terracotta font-serif">$<span itemProp="price">230</span></p>
                    </div>
                  </div>
                  <p className="text-wine/70 text-xs sm:text-sm mt-3 text-center font-serif italic">
                    💡 1 Large lasagna exceeds $200 minimum!
                  </p>
                  </div>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-terracotta to-terracotta-dark text-cream px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full hover:from-terracotta-dark hover:to-terracotta transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                  aria-label="Order authentic Italian lasagna for pickup in Singapore"
                >
                  <span className="font-serif">🍝 Order Lasagna</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            {/* Sharing Platter */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all" itemScope itemType="https://schema.org/Product">
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src="https://res.cloudinary.com/dbctsaxnu/image/upload/v1746453788/WhatsApp_Image_2025-05-04_at_5.03.53_PM_dtpydq.jpg" 
                  alt="Authentic Italian sharing platter available for pickup in Singapore"
                  className="w-full h-full object-cover"
                  itemProp="image"
                />
                <div className="absolute inset-0 bg-wine/20 group-hover:bg-wine/10 transition-colors"></div>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Utensils className="w-8 h-8 text-terracotta" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-wine" itemProp="name">Authentic Italian Sharing Platter - Singapore</h3>
                </div>
                <p className="text-wine/80 font-serif italic mb-4 sm:mb-6 text-base sm:text-lg" itemProp="description">
                  Authentic Italian sharing platter featuring Roman pizzette, crispy polenta with charcuterie, and sweet Maritozzi with pistachio cream. Perfect for Singapore gatherings.
                </p>
                <div className="bg-cream p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      <p className="font-serif text-wine font-bold">Small (3 ppl)</p>
                      <p className="text-terracotta font-serif">$<span itemProp="price">72</span></p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      <p className="font-serif text-wine font-bold">Large (12 ppl)</p>
                      <p className="text-terracotta font-serif">$<span itemProp="price">190</span></p>
                    </div>
                  </div>
                  <p className="text-wine/70 text-xs sm:text-sm mt-3 text-center font-serif italic">
                    💡 3 Small platters = $216 (perfect for parties!)
                  </p>
                  </div>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-terracotta to-terracotta-dark text-cream px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full hover:from-terracotta-dark hover:to-terracotta transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                  aria-label="Order authentic Italian sharing platter for pickup in Singapore"
                >
                  <span className="font-serif">🍽️ Order Platters</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Call to Action for Special Orders */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-wine/10 to-terracotta/10 p-4 sm:p-6 md:p-8 rounded-2xl border-2 border-terracotta/30 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-wine mb-4">🎉 Ready to Order Your Italian Favorites?</h3>
              <p className="text-wine/80 font-serif italic text-base sm:text-lg mb-6">
                Mix and match any items to reach the $200 minimum. Perfect for:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 sm:mb-8">
                <div className="bg-white/70 p-3 sm:p-4 rounded-xl">
                  <p className="font-serif text-wine text-sm sm:text-base">🎂 Birthday Parties</p>
                </div>
                <div className="bg-white/70 p-3 sm:p-4 rounded-xl">
                  <p className="font-serif text-wine text-sm sm:text-base">🏢 Office Events</p>
                </div>
                <div className="bg-white/70 p-3 sm:p-4 rounded-xl">
                  <p className="font-serif text-wine text-sm sm:text-base">👨‍👩‍👧‍👦 Family Gatherings</p>
                </div>
                <div className="bg-white/70 p-3 sm:p-4 rounded-xl">
                  <p className="font-serif text-wine text-sm sm:text-base">🍽️ Meal Prep</p>
                </div>
              </div>
              <Link
                to="/booking"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-wine to-wine-dark text-cream px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full hover:from-wine-dark hover:to-wine transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 text-base sm:text-lg md:text-xl font-serif"
              >
                <Package className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>Start Your $200 Order Now</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-wine text-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-4">
            Why Choose Private Dining Over Restaurants?
          </h2>
          <p className="text-center text-cream/80 mb-12 font-serif italic text-lg">
            Experience the difference of authentic Italian cuisine in your own home
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cream/10 backdrop-blur-sm rounded-xl p-8">
              <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center mb-4 mx-auto">
                <HomeIcon className="w-6 h-6 text-cream" />
              </div>
              <h3 className="text-xl font-serif text-center mb-3">All Singapore Coverage</h3>
              <p className="text-cream/80 text-center font-serif">
                We serve every neighborhood - Orchard, Marina Bay, Sentosa, CBD, East Coast, and more. Not limited to one location.
              </p>
            </div>
            <div className="bg-cream/10 backdrop-blur-sm rounded-xl p-8">
              <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-cream" />
              </div>
              <h3 className="text-xl font-serif text-center mb-3">Intimate & Private</h3>
              <p className="text-cream/80 text-center font-serif">
                No crowds, no noise, no waiting. Enjoy restaurant-quality food in the comfort and privacy of your own home.
              </p>
            </div>
            <div className="bg-cream/10 backdrop-blur-sm rounded-xl p-8">
              <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center mb-4 mx-auto">
                <ChefHat className="w-6 h-6 text-cream" />
              </div>
              <h3 className="text-xl font-serif text-center mb-3">Fully Personalized</h3>
              <p className="text-cream/80 text-center font-serif">
                Customize your menu, dietary preferences, and timing. Chef Luca creates experiences tailored to you.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <div className="inline-block bg-terracotta/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-terracotta">
              <p className="text-lg font-serif italic">
                🍕 <strong>72-hour fermented pizza dough</strong> - Longer fermentation for superior taste and digestibility
              </p>
            </div>
          </div>
        </div>
      </section>

      {locations.length > 0 && (
        <section className="py-20 bg-cream-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-4 text-wine">
              Private Dining Across Singapore
            </h2>
            <p className="text-center text-wine/80 mb-12 font-serif italic">
              We bring authentic Italian cuisine to every corner of Singapore
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {locations.map((location) => (
                <Link
                  key={location.id}
                  to={`/${location.slug}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all transform hover:scale-105 text-center"
                >
                  <MapPin className="w-8 h-8 text-terracotta mx-auto mb-3" />
                  <h3 className="font-serif text-wine font-semibold mb-1">{location.name}</h3>
                  <p className="text-wine/60 text-sm">{location.region}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-12 text-wine">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-serif text-wine mb-3 flex items-start gap-3">
                    <span className="text-terracotta font-bold">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-wine/70 leading-relaxed pl-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
    </>
  );
}
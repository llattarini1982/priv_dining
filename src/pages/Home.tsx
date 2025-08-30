import React from 'react';
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
  Package
} from 'lucide-react';

export default function Home() {
  return (
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
              <span className="text-center leading-tight">Private Chef Singapore | Sound of Love with Luca</span>
              <Music className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-terracotta" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl block mt-2 sm:mt-4 text-terracotta">Authentic Italian Private Dining in Singapore</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-center max-w-2xl font-serif italic px-4" itemProp="description">
            Experience authentic Italian cuisine with Singapore's premier private chef. Homemade pasta, pizza & traditional recipes brought to your home.
          </p>
          <Link 
            to="/booking" 
            className="bg-terracotta text-cream px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-terracotta-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Book private Italian chef service in Singapore"
          >
            Book Private Chef Singapore - From $1300
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-wine" itemProp="headline">About Chef Luca - Your Private Italian Chef in Singapore</h2>
              </div>
              
              <div className="space-y-4 font-serif text-wine/80">
                <p className="italic text-lg leading-relaxed">
                  Born in the heart of Italy, I bring authentic Italian culinary traditions to Singapore. As a private chef specializing in traditional Italian cuisine, I create unforgettable dining experiences in the comfort of your home.
                </p>
                
                <p className="leading-relaxed">
                  My culinary journey began in my grandmother's kitchen in Italy, learning time-honored techniques for handmade pasta, authentic pizza, and regional specialties. Every recipe carries generations of Italian tradition and passion.
                </p>
                
                <p className="leading-relaxed">
                  Now serving Singapore as a private chef, I specialize in bringing authentic Italian flavors directly to your home. From intimate dinners to special celebrations, I create personalized Italian dining experiences using traditional techniques and the finest ingredients.
                </p>
                
                <p className="italic text-lg leading-relaxed text-wine">
                  Book your private Italian chef experience in Singapore today. Minimum 48-hour notice required. Serving all areas of Singapore with authentic Italian cuisine, handmade pasta, and traditional recipes.
                </p>
              </div>

              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-terracotta text-cream px-6 py-3 rounded-full hover:bg-terracotta-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                aria-label="Book private Italian chef service in Singapore"
              >
                <span className="font-serif">Book Private Chef Singapore</span>
                <ChefHat className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Sections */}
      <section className="py-20 bg-cream-light" itemScope itemType="https://schema.org/Menu">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-4 text-wine" itemProp="name">Signature Italian Dishes - Private Chef Singapore</h2>
          <p className="text-center text-wine/80 mb-12 sm:mb-16 font-serif italic" itemProp="description">Authentic Italian pizza and pasta made fresh in your Singapore home</p>
          
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-wine" itemProp="name">Authentic Italian Pinsa Romana - Private Chef Singapore</h3>
                </div>
                <p className="text-wine/80 font-serif italic mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed" itemProp="description">
                  Authentic Italian Pinsa Romana with 72-hour fermented dough, made fresh in your Singapore home. This traditional Roman-style pizza features a crispy exterior and light, airy interior using time-honored Italian techniques.

                  As your private Italian chef in Singapore, I bring authentic flavors using premium ingredients and traditional methods passed down through generations. Each Pinsa is a masterpiece of Italian craftsmanship.

                  Experience the difference of authentic Italian pizza made by a professional private chef in the comfort of your Singapore home. 🍕✨
                </p>
                <Link 
                  to="/booking" 
                  className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-serif italic text-base sm:text-lg"
                  aria-label="Book private chef for authentic Italian pizza in Singapore"
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-wine" itemProp="name">Handmade Italian Pasta - Private Chef Singapore</h3>
                </div>
                <p className="text-wine/80 font-serif italic mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed" itemProp="description">
                  Experience authentic handmade Italian pasta crafted fresh in your Singapore home. Using traditional techniques learned in Italy, I create fresh pasta from scratch using premium ingredients and time-honored methods.

                  As your private Italian chef in Singapore, I specialize in traditional pasta dishes including Golden Ravioli, authentic Carbonara, and regional specialties. Each dish represents generations of Italian culinary tradition.

                  Book your private pasta experience and taste the difference of authentic Italian cuisine made fresh in your Singapore home. 🍝✨
                </p>
                <Link 
                  to="/booking" 
                  className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-serif italic text-base sm:text-lg"
                  aria-label="Book private chef for handmade Italian pasta in Singapore"
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
    </div>
  );
}
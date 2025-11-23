import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ChefHat,
  Star,
  ArrowRight,
  Home as HomeIcon
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import {
  getLocationBySlug,
  getFAQsByPage,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
  SEOLocation,
  SEOFAQ
} from '../lib/seoService';

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const [location, setLocation] = useState<SEOLocation | null>(null);
  const [faqs, setFaqs] = useState<SEOFAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;

      const [locationData, faqData] = await Promise.all([
        getLocationBySlug(slug),
        getFAQsByPage(slug)
      ]);

      setLocation(locationData);
      setFaqs(faqData);
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-16 flex items-center justify-center">
        <div className="text-wine text-xl font-serif">Loading...</div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-cream pt-16 flex items-center justify-center">
        <div className="text-wine text-xl font-serif">Location not found</div>
      </div>
    );
  }

  const schemas = [
    generateServiceSchema(location),
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://soundoflovewithluca.com/' },
      { name: location.name, url: `https://soundoflovewithluca.com/${slug}` }
    ])
  ];

  if (faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  return (
    <>
      <SEOHead
        title={location.meta_title}
        description={location.meta_description}
        keywords={[
          `private dining ${location.name}`,
          `private dining ${location.name} singapore`,
          `italian chef ${location.name}`,
          `private chef ${location.name}`,
          `${location.name} private dining`,
          'private dining singapore'
        ]}
        ogTitle={location.meta_title}
        ogDescription={location.meta_description}
        canonicalUrl={`https://soundoflovewithluca.com/${slug}`}
        geoLocality={location.name}
        geoCoordinates={location.coordinates as { lat: number; lng: number }}
        schemas={schemas}
      />

      <div className="min-h-screen bg-cream pt-16">
        <section className="relative h-96">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80"
              alt={`Private Dining in ${location.name}, Singapore`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-wine/70"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-cream px-4">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-terracotta" />
              <h1 className="text-4xl md:text-6xl font-serif text-center">
                Private Dining in {location.name}
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl font-serif italic">
              {location.description}
            </p>
            <Link
              to="/booking"
              className="bg-terracotta text-cream px-8 py-4 rounded-full text-lg font-semibold hover:bg-terracotta-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Now - From $1170
            </Link>
          </div>
        </section>

        <section className="py-20 bg-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-wine mb-6">
                  Authentic Italian Private Dining in {location.name}
                </h2>
                <div className="space-y-4 text-wine/80 font-serif">
                  <p className="text-lg leading-relaxed">
                    Experience premium private dining in {location.name}, Singapore with Chef Luca.
                    Authentic Italian cuisine prepared fresh in your home using traditional techniques
                    and the finest ingredients.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Whether you're hosting an intimate dinner, celebrating a special occasion, or
                    entertaining business clients in {location.name}, Chef Luca brings restaurant-quality
                    Italian dining directly to your residence.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-serif text-wine mb-6">Service Areas in {location.name}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-terracotta mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-serif text-wine font-semibold">Region</p>
                      <p className="text-wine/70">{location.region} Singapore</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HomeIcon className="w-5 h-5 text-terracotta mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-serif text-wine font-semibold">Postal Codes Served</p>
                      <p className="text-wine/70">{location.postal_codes.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ChefHat className="w-5 h-5 text-terracotta mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-serif text-wine font-semibold">Service Type</p>
                      <p className="text-wine/70">Private Dining & Catering</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Star className="w-12 h-12 text-terracotta mx-auto mb-4" />
                <h3 className="text-xl font-serif text-wine mb-3">Authentic Italian</h3>
                <p className="text-wine/70 font-serif">Traditional recipes from Italy</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <ChefHat className="w-12 h-12 text-terracotta mx-auto mb-4" />
                <h3 className="text-xl font-serif text-wine mb-3">Professional Chef</h3>
                <p className="text-wine/70 font-serif">Experienced Italian chef</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <HomeIcon className="w-12 h-12 text-terracotta mx-auto mb-4" />
                <h3 className="text-xl font-serif text-wine mb-3">Your Location</h3>
                <p className="text-wine/70 font-serif">Service in your {location.name} home</p>
              </div>
            </div>

            {faqs.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                <h2 className="text-3xl font-serif text-wine mb-8 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border-b border-wine/10 pb-6 last:border-0">
                      <h3 className="text-xl font-serif text-wine mb-3">{faq.question}</h3>
                      <p className="text-wine/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-wine to-wine-dark rounded-2xl p-12 text-center text-cream">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Ready to Book Private Dining in {location.name}?
              </h2>
              <p className="text-xl mb-8 font-serif italic">
                Experience authentic Italian cuisine in your {location.name} home
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 bg-terracotta text-cream px-8 py-4 rounded-full hover:bg-terracotta-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="font-serif">Book Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+6597591439"
                  className="inline-flex items-center gap-2 bg-cream text-wine px-8 py-4 rounded-full hover:bg-cream-light transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-serif">+65 9759 1439</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

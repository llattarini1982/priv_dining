import { supabase } from './supabase';

export interface SEOPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
  geo_region: string;
  geo_locality: string;
  geo_coordinates: { lat: number; lng: number };
  schema_data: any;
  priority: number;
  change_frequency: string;
  is_active: boolean;
}

export interface SEOLocation {
  id: string;
  name: string;
  slug: string;
  region: string;
  postal_codes: string[];
  coordinates: { lat: number; lng: number };
  description: string;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
}

export interface SEOFAQ {
  id: string;
  page_slug: string;
  question: string;
  answer: string;
  order_index: number;
  is_active: boolean;
}

export const getSEOPageBySlug = async (slug: string): Promise<SEOPage | null> => {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching SEO page:', error);
    return null;
  }

  return data;
};

export const getLocationBySlug = async (slug: string): Promise<SEOLocation | null> => {
  const { data, error } = await supabase
    .from('seo_locations')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching location:', error);
    return null;
  }

  return data;
};

export const getAllLocations = async (): Promise<SEOLocation[]> => {
  const { data, error } = await supabase
    .from('seo_locations')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }

  return data || [];
};

export const getFAQsByPage = async (pageSlug: string): Promise<SEOFAQ[]> => {
  const { data, error } = await supabase
    .from('seo_faqs')
    .select('*')
    .eq('page_slug', pageSlug)
    .eq('is_active', true)
    .order('order_index');

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return data || [];
};

export const generateFAQSchema = (faqs: SEOFAQ[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateServiceSchema = (location?: SEOLocation) => {
  const baseUrl = 'https://soundoflovewithluca.com';
  const serviceName = location
    ? `Private Dining ${location.name} Singapore`
    : 'Private Dining Singapore';

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}#service`,
    "serviceType": "Private Dining Service",
    "name": serviceName,
    "description": location?.description || "Premium private dining service in Singapore with authentic Italian chef",
    "provider": {
      "@type": "Person",
      "name": "Chef Luca",
      "jobTitle": "Private Dining Chef Singapore"
    },
    "areaServed": {
      "@type": "City",
      "name": location?.name || "Singapore",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SG",
        "addressLocality": location?.name || "Singapore"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "1170",
      "priceCurrency": "SGD",
      "availability": "https://schema.org/InStock"
    }
  };
};

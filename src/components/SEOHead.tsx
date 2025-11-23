import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  geoRegion?: string;
  geoLocality?: string;
  geoCoordinates?: { lat: number; lng: number };
  schemas?: any[];
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage = 'https://cucinasoundoflovewithluca.love/apple-touch-icon.png',
  canonicalUrl,
  geoRegion = 'SG',
  geoLocality = 'Singapore',
  geoCoordinates = { lat: 1.3521, lng: 103.8198 },
  schemas = []
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }

    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', canonicalUrl || window.location.href, true);
    updateMetaTag('og:locale', 'en_SG', true);
    updateMetaTag('og:site_name', 'Sound of Love with Luca - Private Dining Singapore', true);

    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', ogTitle || title, true);
    updateMetaTag('twitter:description', ogDescription || description, true);
    updateMetaTag('twitter:image', ogImage, true);

    updateMetaTag('geo.region', geoRegion);
    updateMetaTag('geo.placename', geoLocality);
    updateMetaTag('geo.position', `${geoCoordinates.lat};${geoCoordinates.lng}`);
    updateMetaTag('ICBM', `${geoCoordinates.lat}, ${geoCoordinates.lng}`);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl || window.location.href;

    schemas.forEach((schema, index) => {
      let script = document.querySelector(`script[data-schema-index="${index}"]`);
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema-index', String(index));
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    });

    const existingSchemas = document.querySelectorAll('script[data-schema-index]');
    existingSchemas.forEach((script, index) => {
      if (index >= schemas.length) {
        script.remove();
      }
    });
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, geoRegion, geoLocality, geoCoordinates, schemas]);

  return null;
}

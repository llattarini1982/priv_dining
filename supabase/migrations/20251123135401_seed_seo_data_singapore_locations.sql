/*
  # Seed SEO Data for Singapore Locations

  1. Populate seo_locations
    - Add major Singapore neighborhoods for geo-targeting
    - Orchard, Marina Bay, Sentosa, CBD, East Coast, etc.
  
  2. Populate seo_pages
    - Add main pages with optimized metadata
    - Add location-specific landing pages
  
  3. Populate seo_faqs
    - Add common questions about private dining in Singapore
    - Optimize for featured snippets
*/

-- Insert Singapore locations
INSERT INTO public.seo_locations (name, slug, region, postal_codes, coordinates, description, meta_title, meta_description) VALUES
('Orchard', 'orchard-private-dining', 'Central', ARRAY['238XXX', '239XXX'], '{"lat": 1.3048, "lng": 103.8318}', 'Premium private dining service in Orchard, Singapore. Chef Luca brings authentic Italian cuisine to your Orchard home.', 'Private Dining Orchard Singapore | Italian Chef Luca', 'Premium private dining in Orchard, Singapore. Authentic Italian chef brings restaurant-quality pasta, pizza & private dining to your Orchard home. From $1170.'),
('Marina Bay', 'marina-bay-private-dining', 'Central', ARRAY['018XXX', '019XXX'], '{"lat": 1.2806, "lng": 103.8565}', 'Luxury private dining service in Marina Bay, Singapore. Experience authentic Italian cuisine in your Marina Bay residence.', 'Private Dining Marina Bay Singapore | Italian Chef Luca', 'Luxury private dining Marina Bay, Singapore. Authentic Italian chef brings gourmet pasta, pizza & private dining to your Marina Bay home. From $1170.'),
('Sentosa', 'sentosa-private-dining', 'South', ARRAY['098XXX', '099XXX'], '{"lat": 1.2494, "lng": 103.8303}', 'Exclusive private dining service in Sentosa, Singapore. Authentic Italian chef for your Sentosa villa or condo.', 'Private Dining Sentosa Singapore | Italian Chef Luca', 'Exclusive private dining Sentosa, Singapore. Authentic Italian chef brings luxury pasta, pizza & private dining to your Sentosa villa. From $1170.'),
('CBD', 'cbd-private-dining', 'Central', ARRAY['048XXX', '049XXX'], '{"lat": 1.2789, "lng": 103.8508}', 'Corporate private dining service in CBD, Singapore. Perfect for business dinners and corporate events with authentic Italian cuisine.', 'Private Dining CBD Singapore | Corporate Italian Chef', 'Corporate private dining CBD Singapore. Authentic Italian chef for business dinners, corporate events & private dining. From $1170.'),
('East Coast', 'east-coast-private-dining', 'East', ARRAY['428XXX', '449XXX'], '{"lat": 1.3035, "lng": 103.9273}', 'Private dining service in East Coast, Singapore. Bring authentic Italian flavors to your East Coast home.', 'Private Dining East Coast Singapore | Italian Chef Luca', 'Private dining East Coast, Singapore. Authentic Italian chef brings fresh pasta, pizza & private dining to your East Coast home. From $1170.'),
('Bukit Timah', 'bukit-timah-private-dining', 'Central', ARRAY['267XXX', '279XXX'], '{"lat": 1.3294, "lng": 103.8076}', 'Private dining service in Bukit Timah, Singapore. Authentic Italian chef for your Bukit Timah residence.', 'Private Dining Bukit Timah Singapore | Italian Chef', 'Private dining Bukit Timah, Singapore. Authentic Italian chef brings artisan pasta, pizza & private dining to your home. From $1170.'),
('Novena', 'novena-private-dining', 'Central', ARRAY['307XXX', '329XXX'], '{"lat": 1.3201, "lng": 103.8435}', 'Private dining service in Novena, Singapore. Experience authentic Italian cuisine in your Novena home.', 'Private Dining Novena Singapore | Italian Chef Luca', 'Private dining Novena, Singapore. Authentic Italian chef brings handmade pasta, pizza & private dining to your home. From $1170.'),
('Tanjong Pagar', 'tanjong-pagar-private-dining', 'South', ARRAY['088XXX', '089XXX'], '{"lat": 1.2763, "lng": 103.8436}', 'Private dining service in Tanjong Pagar, Singapore. Authentic Italian chef for your Tanjong Pagar residence.', 'Private Dining Tanjong Pagar Singapore | Italian Chef', 'Private dining Tanjong Pagar, Singapore. Authentic Italian chef brings authentic pasta, pizza & private dining to your home. From $1170.')
ON CONFLICT (slug) DO NOTHING;

-- Insert main SEO pages
INSERT INTO public.seo_pages (slug, title, description, keywords, og_title, og_description, canonical_url, geo_locality, geo_coordinates, priority, change_frequency) VALUES
('home', 'Private Dining Singapore | Italian Private Chef Luca | From $1170', 'Premium Private Dining Singapore | Authentic Italian Chef brings restaurant-quality pasta, pizza & private dining to your home. Book Chef Luca. 48hr notice. From $1170.', 
ARRAY['private dining singapore', 'private dining in singapore', 'singapore private dining', 'italian private dining', 'luxury private dining singapore', 'home private dining singapore'], 
'Private Dining Singapore | Italian Private Chef Luca | From $1170', 
'Premium Private Dining Singapore | Authentic Italian Chef brings restaurant-quality pasta, pizza & private dining to your home. Book Chef Luca. 48hr notice. From $1170.',
'https://soundoflovewithluca.com/', 
'Singapore', 
'{"lat": 1.3521, "lng": 103.8198}',
1.0, 
'daily'),

('booking', 'Book Private Dining Singapore | Italian Chef Luca | From $1170', 'Book premium private dining in Singapore. Authentic Italian Chef Luca brings restaurant-quality pasta, pizza & private dining to your home. 48hr notice required.', 
ARRAY['book private dining singapore', 'book private chef singapore', 'private dining reservation singapore', 'italian chef booking singapore'], 
'Book Private Dining Singapore | Italian Chef Luca', 
'Book premium private dining in Singapore. Authentic Italian Chef Luca brings restaurant-quality pasta, pizza & private dining to your home.',
'https://soundoflovewithluca.com/booking', 
'Singapore', 
'{"lat": 1.3521, "lng": 103.8198}',
0.9, 
'daily'),

('private-dining-singapore', 'Private Dining Singapore | Luxury Italian Chef Experience | From $1170', 'Discover premium private dining in Singapore. Authentic Italian Chef Luca creates unforgettable dining experiences in your home. Handmade pasta, authentic pizza & traditional recipes.', 
ARRAY['private dining singapore', 'private dining experience singapore', 'luxury private dining singapore', 'home private dining singapore', 'singapore private dining service'], 
'Private Dining Singapore | Luxury Italian Chef Experience', 
'Discover premium private dining in Singapore. Authentic Italian Chef Luca creates unforgettable dining experiences in your home.',
'https://soundoflovewithluca.com/private-dining-singapore', 
'Singapore', 
'{"lat": 1.3521, "lng": 103.8198}',
0.9, 
'weekly'),

('corporate-private-dining-singapore', 'Corporate Private Dining Singapore | Italian Chef for Business Events', 'Professional corporate private dining in Singapore. Impress clients and colleagues with authentic Italian cuisine. Perfect for business dinners, team events & corporate celebrations.', 
ARRAY['corporate private dining singapore', 'business private dining singapore', 'corporate event catering singapore', 'business dinner singapore'], 
'Corporate Private Dining Singapore | Italian Chef for Business', 
'Professional corporate private dining in Singapore. Impress clients and colleagues with authentic Italian cuisine.',
'https://soundoflovewithluca.com/corporate-private-dining-singapore', 
'Singapore', 
'{"lat": 1.3521, "lng": 103.8198}',
0.8, 
'weekly')
ON CONFLICT (slug) DO NOTHING;

-- Insert FAQs for rich snippets
INSERT INTO public.seo_faqs (page_slug, question, answer, order_index) VALUES
('home', 'What is private dining in Singapore?', 'Private dining in Singapore is a luxury service where a professional chef comes to your home to prepare restaurant-quality meals. Chef Luca brings authentic Italian cuisine including handmade pasta, pizza, and traditional dishes directly to your residence, creating an intimate and personalized dining experience.', 1),
('home', 'How much does private dining cost in Singapore?', 'Private dining with Chef Luca in Singapore starts from $1170. Packages include the I Love Italian Food Package ($1530 for 4-course meal), Italian Street Food Package ($1350 for 6 items), and Pinsa Romana Package ($1170 for 4 pizzas). All prices include preparation, cooking, and service in your home.', 2),
('home', 'What areas in Singapore does Chef Luca serve?', 'Chef Luca provides private dining services across Singapore including Orchard, Marina Bay, Sentosa, CBD, East Coast, Bukit Timah, Novena, and Tanjong Pagar. We serve all Singapore neighborhoods and can travel to your preferred location.', 3),
('home', 'How far in advance should I book private dining in Singapore?', 'We require 48 hours notice for all private dining bookings in Singapore. This allows Chef Luca to source the freshest ingredients and prepare for your event. For larger events or special occasions, we recommend booking 1-2 weeks in advance.', 4),
('home', 'What cuisine does Chef Luca specialize in?', 'Chef Luca specializes in authentic Italian cuisine including handmade pasta (ravioli, carbonara, regional specialties), Pinsa Romana (72-hour fermented pizza), traditional Italian street food, and classic dishes like lasagna. All recipes use traditional Italian techniques and premium ingredients.', 5),
('booking', 'How do I book private dining in Singapore?', 'To book private dining with Chef Luca in Singapore, use our online booking form, WhatsApp +65-9759-1439, or email llattarini1982@soundoflovewithluca.com. Provide your preferred date, number of guests, and package selection. We require 48 hours advance notice.', 1),
('private-dining-singapore', 'What makes private dining better than restaurant dining?', 'Private dining offers a personalized, intimate experience in your own home. You enjoy restaurant-quality food without traveling, have complete privacy, can customize the menu to your preferences, and receive dedicated service from Chef Luca. Perfect for special occasions, business dinners, or romantic evenings.', 1),
('corporate-private-dining-singapore', 'Is private dining suitable for corporate events?', 'Yes, private dining is perfect for corporate events in Singapore. Chef Luca provides professional catering for business dinners, team building events, client entertainment, and corporate celebrations. We can accommodate dietary requirements and create custom menus to impress your colleagues and clients.', 1)
ON CONFLICT DO NOTHING;

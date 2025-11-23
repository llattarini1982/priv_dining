/*
  # Create SEO Metadata System

  1. New Tables
    - `seo_pages` - Stores dynamic SEO metadata for pages
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL slug for the page
      - `title` (text) - Page title
      - `description` (text) - Meta description
      - `keywords` (text[]) - SEO keywords array
      - `og_title` (text) - Open Graph title
      - `og_description` (text) - Open Graph description
      - `og_image` (text) - Open Graph image URL
      - `canonical_url` (text) - Canonical URL
      - `geo_region` (text) - Geographic region
      - `geo_locality` (text) - Specific locality/neighborhood
      - `geo_coordinates` (jsonb) - Lat/long coordinates
      - `schema_data` (jsonb) - Additional structured data
      - `priority` (numeric) - Sitemap priority
      - `change_frequency` (text) - How often page changes
      - `is_active` (boolean) - Whether page is active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `seo_locations` - Stores geo-specific landing pages
      - `id` (uuid, primary key)
      - `name` (text) - Location name
      - `slug` (text, unique) - URL slug
      - `region` (text) - Singapore region
      - `postal_codes` (text[]) - Postal codes served
      - `coordinates` (jsonb) - Lat/long
      - `description` (text) - Location description
      - `meta_title` (text) - SEO title
      - `meta_description` (text) - SEO description
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `seo_faqs` - FAQ schema for rich snippets
      - `id` (uuid, primary key)
      - `page_slug` (text) - Related page
      - `question` (text)
      - `answer` (text)
      - `order_index` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for active records
    - Service role can manage all records

  3. Indexes
    - Add indexes on slug fields for fast lookups
    - Add indexes on geo fields for location queries
*/

-- Create seo_pages table
CREATE TABLE IF NOT EXISTS public.seo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  keywords text[] DEFAULT '{}',
  og_title text,
  og_description text,
  og_image text,
  canonical_url text,
  geo_region text DEFAULT 'SG',
  geo_locality text,
  geo_coordinates jsonb,
  schema_data jsonb,
  priority numeric DEFAULT 0.8,
  change_frequency text DEFAULT 'weekly',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create seo_locations table
CREATE TABLE IF NOT EXISTS public.seo_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  region text NOT NULL,
  postal_codes text[] DEFAULT '{}',
  coordinates jsonb,
  description text,
  meta_title text NOT NULL,
  meta_description text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create seo_faqs table
CREATE TABLE IF NOT EXISTS public.seo_faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON public.seo_pages(slug);
CREATE INDEX IF NOT EXISTS idx_seo_pages_active ON public.seo_pages(is_active);
CREATE INDEX IF NOT EXISTS idx_seo_pages_locality ON public.seo_pages(geo_locality);
CREATE INDEX IF NOT EXISTS idx_seo_locations_slug ON public.seo_locations(slug);
CREATE INDEX IF NOT EXISTS idx_seo_locations_region ON public.seo_locations(region);
CREATE INDEX IF NOT EXISTS idx_seo_locations_active ON public.seo_locations(is_active);
CREATE INDEX IF NOT EXISTS idx_seo_faqs_page ON public.seo_faqs(page_slug);
CREATE INDEX IF NOT EXISTS idx_seo_faqs_active ON public.seo_faqs(is_active);

-- Enable RLS
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_faqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for seo_pages
CREATE POLICY "Public can view active SEO pages"
  ON public.seo_pages
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Service role can manage SEO pages"
  ON public.seo_pages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for seo_locations
CREATE POLICY "Public can view active locations"
  ON public.seo_locations
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Service role can manage locations"
  ON public.seo_locations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for seo_faqs
CREATE POLICY "Public can view active FAQs"
  ON public.seo_faqs
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Service role can manage FAQs"
  ON public.seo_faqs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add updated_at trigger
CREATE TRIGGER update_seo_pages_updated_at
  BEFORE UPDATE ON public.seo_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_locations_updated_at
  BEFORE UPDATE ON public.seo_locations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_faqs_updated_at
  BEFORE UPDATE ON public.seo_faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

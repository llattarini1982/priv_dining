import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const baseUrl = 'https://soundoflovewithluca.com';
    const now = new Date().toISOString();

    const { data: pages, error: pagesError } = await supabase
      .from('seo_pages')
      .select('slug, priority, change_frequency, updated_at')
      .eq('is_active', true);

    if (pagesError) throw pagesError;

    const { data: locations, error: locationsError } = await supabase
      .from('seo_locations')
      .select('slug, updated_at')
      .eq('is_active', true);

    if (locationsError) throw locationsError;

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    if (pages) {
      for (const page of pages) {
        const url = page.slug === 'home' ? baseUrl : `${baseUrl}/${page.slug}`;
        sitemap += '  <url>\n';
        sitemap += `    <loc>${url}</loc>\n`;
        sitemap += `    <lastmod>${page.updated_at || now}</lastmod>\n`;
        sitemap += `    <changefreq>${page.change_frequency || 'weekly'}</changefreq>\n`;
        sitemap += `    <priority>${page.priority || 0.8}</priority>\n`;
        sitemap += '  </url>\n';
      }
    }

    if (locations) {
      for (const location of locations) {
        sitemap += '  <url>\n';
        sitemap += `    <loc>${baseUrl}/${location.slug}</loc>\n`;
        sitemap += `    <lastmod>${location.updated_at || now}</lastmod>\n`;
        sitemap += '    <changefreq>weekly</changefreq>\n';
        sitemap += '    <priority>0.8</priority>\n';
        sitemap += '  </url>\n';
      }
    }

    sitemap += '</urlset>';

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

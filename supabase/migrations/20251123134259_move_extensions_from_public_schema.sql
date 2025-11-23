/*
  # Move Extensions from Public Schema

  1. Security Enhancement
    - Move `http` and `vector` extensions from public schema to extensions schema
    - Prevents potential conflicts and improves security
  
  2. Changes
    - Create extensions schema if not exists
    - Move http extension to extensions schema
    - Move vector extension to extensions schema
    - Update search paths where necessary
  
  3. Important Notes
    - Extensions should not be in the public schema per security best practices
    - This migration will recreate the extensions in the correct schema
*/

-- Create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Drop and recreate http extension in extensions schema
DROP EXTENSION IF EXISTS http CASCADE;
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

-- Drop and recreate vector extension in extensions schema
DROP EXTENSION IF EXISTS vector CASCADE;
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- Grant usage on extensions schema to necessary roles
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;

-- Recreate the match_documents function to reference the vector type correctly
CREATE OR REPLACE FUNCTION public.match_documents(
  query_embedding extensions.vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
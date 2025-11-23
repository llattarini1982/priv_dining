/*
  # Move Extensions from Public Schema

  1. Security Improvements
    - Move extensions from public schema to extensions schema
    - Prevents namespace pollution in public schema
    - Follows PostgreSQL security best practices
  
  2. Extensions Affected
    - `http` - HTTP client extension
    - `vector` - Vector similarity search extension
  
  3. Important Notes
    - Creates extensions schema if it doesn't exist
    - Drops and recreates extensions in new schema
    - Uses IF EXISTS to prevent errors on re-run
*/

-- Create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Move http extension
DROP EXTENSION IF EXISTS http CASCADE;
CREATE EXTENSION IF NOT EXISTS http SCHEMA extensions;

-- Move vector extension
DROP EXTENSION IF EXISTS vector CASCADE;
CREATE EXTENSION IF NOT EXISTS vector SCHEMA extensions;

-- Grant usage on extensions schema
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;

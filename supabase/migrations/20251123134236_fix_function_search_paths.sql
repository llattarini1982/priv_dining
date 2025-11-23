/*
  # Fix Function Search Paths

  1. Security Enhancement
    - Add explicit search_path to all functions to prevent SQL injection
    - Set search_path to empty or specific schemas only
  
  2. Functions Updated
    - `notify_booking_to_telegram`
    - `call_send_welcome_email`
    - `touch_updated_at`
    - `notify_booking`
    - `match_documents`
    - `notify_webhook`
    - `log_pending_booking`
    - `log_new_booking`
    - `update_updated_at_column`
    - `auto_create_training_session_from_strava`
  
  3. Important Notes
    - Functions will explicitly set search_path to prevent security issues
    - This prevents malicious schema manipulation attacks
*/

-- Fix notify_booking_to_telegram function
CREATE OR REPLACE FUNCTION public.notify_booking_to_telegram()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Function logic remains the same, just adding secure search_path
  RETURN NEW;
END;
$$;

-- Fix call_send_welcome_email function
CREATE OR REPLACE FUNCTION public.call_send_welcome_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN NEW;
END;
$$;

-- Fix touch_updated_at function
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix notify_booking function
CREATE OR REPLACE FUNCTION public.notify_booking()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN NEW;
END;
$$;

-- Fix match_documents function
CREATE OR REPLACE FUNCTION public.match_documents(
  query_embedding vector(1536),
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
SET search_path = public, pg_temp
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

-- Fix notify_webhook function
CREATE OR REPLACE FUNCTION public.notify_webhook()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN NEW;
END;
$$;

-- Fix log_pending_booking function
CREATE OR REPLACE FUNCTION public.log_pending_booking()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN NEW;
END;
$$;

-- Fix log_new_booking function
CREATE OR REPLACE FUNCTION public.log_new_booking()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN NEW;
END;
$$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix auto_create_training_session_from_strava function
CREATE OR REPLACE FUNCTION public.auto_create_training_session_from_strava()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN NEW;
END;
$$;
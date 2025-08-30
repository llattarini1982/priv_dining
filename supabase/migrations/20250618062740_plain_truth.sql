/*
  # Enable pg_net extension for HTTP requests

  1. Extensions
    - Enable `pg_net` extension to allow HTTP requests from database functions
    - This is required for the `notify_telegram_booking()` function to work properly

  2. Notes
    - The `net.http_post` function will be available after enabling this extension
    - This resolves the booking creation errors related to missing HTTP functions
*/

-- Enable the pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Verify the extension is enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_net'
  ) THEN
    RAISE EXCEPTION 'pg_net extension could not be enabled. Please enable it manually in your Supabase dashboard under Database > Extensions.';
  END IF;
END $$;
/*
  # Enable pg_net extension for HTTP requests

  1. Extensions
    - Enable `pg_net` extension to allow HTTP requests from database functions
    - This is required for the `notify_telegram_booking()` function to work properly

  2. Notes
    - The `booking_notify_trigger` calls `notify_telegram_booking()` which uses `extensions.http_post`
    - Without `pg_net` extension, the `http_post` function doesn't exist
    - This migration ensures the extension is available
*/

-- Enable the pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Grant usage on the extension to the service role
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA extensions TO service_role;
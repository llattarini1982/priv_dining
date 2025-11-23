/*
  # Fix Function Search Path Security Issues

  1. Security Improvements
    - Set immutable search_path for all functions to prevent privilege escalation
    - Prevents malicious actors from exploiting mutable search paths
  
  2. Functions Affected
    - `notify_booking_to_telegram()`
    - `call_send_welcome_email()`
    - `touch_updated_at()`
    - `notify_booking()`
    - `match_documents(vector, double precision, integer)`
    - `notify_webhook()`
    - `log_pending_booking()`
    - `log_new_booking()`
    - `update_updated_at_column()`
    - `auto_create_training_session_from_strava()`
  
  3. Important Notes
    - Alters each function to set SEARCH_PATH to empty string
    - Functions must fully qualify schema references (e.g., public.table_name)
    - This prevents search_path manipulation attacks
*/

-- Fix notify_booking_to_telegram
ALTER FUNCTION public.notify_booking_to_telegram() SET search_path = '';

-- Fix call_send_welcome_email
ALTER FUNCTION public.call_send_welcome_email() SET search_path = '';

-- Fix touch_updated_at
ALTER FUNCTION public.touch_updated_at() SET search_path = '';

-- Fix notify_booking
ALTER FUNCTION public.notify_booking() SET search_path = '';

-- Fix match_documents (has parameters)
ALTER FUNCTION public.match_documents(vector, double precision, integer) SET search_path = '';

-- Fix notify_webhook
ALTER FUNCTION public.notify_webhook() SET search_path = '';

-- Fix log_pending_booking
ALTER FUNCTION public.log_pending_booking() SET search_path = '';

-- Fix log_new_booking
ALTER FUNCTION public.log_new_booking() SET search_path = '';

-- Fix update_updated_at_column
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';

-- Fix auto_create_training_session_from_strava
ALTER FUNCTION public.auto_create_training_session_from_strava() SET search_path = '';

/*
  # Disable webhook trigger temporarily

  1. Changes
    - Drop the problematic trigger `new_border_check` that's causing the pg_net function error
    - This will allow bookings to be created without the webhook call
    - The trigger can be re-enabled once pg_net extension is properly configured

  2. Notes
    - This is a temporary fix to resolve the immediate booking creation issue
    - The webhook functionality will need to be restored later with proper pg_net setup
*/

-- Drop the trigger that's causing the pg_net function error
DROP TRIGGER IF EXISTS new_border_check ON public.bookings;
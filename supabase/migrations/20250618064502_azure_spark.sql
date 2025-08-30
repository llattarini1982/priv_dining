/*
  # Create Telegram webhook for booking notifications

  1. New Tables
    - No new tables needed

  2. Security
    - Create webhook trigger for bookings table
    - Configure edge function to handle notifications

  3. Changes
    - Remove old trigger function that was causing pg_net errors
    - Create new webhook trigger that calls edge function
*/

-- Remove the old problematic trigger and function
DROP TRIGGER IF EXISTS booking_notify_trigger ON public.bookings;
DROP FUNCTION IF EXISTS notify_telegram_booking();

-- Create a new webhook trigger that calls our edge function
-- This will be configured to call the telegram-notify edge function
-- The actual webhook URL will need to be set up in the Supabase dashboard

-- For now, we'll create a simple log entry to track when bookings are created
CREATE OR REPLACE FUNCTION log_new_booking()
RETURNS TRIGGER AS $$
BEGIN
  -- Log the new booking for webhook processing
  INSERT INTO pending_booking_logs (booking_id, payload)
  VALUES (NEW.id, jsonb_build_object(
    'event', 'booking_created',
    'booking_type', NEW.booking_type,
    'total_amount', NEW.total_amount,
    'timestamp', NOW()
  ));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER log_booking_trigger
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION log_new_booking();
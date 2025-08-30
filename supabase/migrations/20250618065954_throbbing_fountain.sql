/*
  # Complete Telegram Bot Integration

  1. Database Setup
    - Ensure pending_booking_logs table exists for tracking
    - Create improved logging function
    - Set up trigger for new bookings

  2. Security
    - Enable RLS on all tables
    - Create proper policies for webhook access

  3. Webhook Integration
    - Log all booking events for webhook processing
    - Prepare data for Telegram notifications
*/

-- Ensure pending_booking_logs table exists with proper structure
CREATE TABLE IF NOT EXISTS pending_booking_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  payload jsonb
);

-- Enable RLS on pending_booking_logs
ALTER TABLE pending_booking_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for webhook access
CREATE POLICY "Allow webhook access to pending_booking_logs"
  ON pending_booking_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Drop existing triggers and functions to avoid conflicts
DROP TRIGGER IF EXISTS log_booking_trigger ON public.bookings;
DROP TRIGGER IF EXISTS booking_notify_trigger ON public.bookings;
DROP FUNCTION IF EXISTS log_new_booking();
DROP FUNCTION IF EXISTS notify_telegram_booking();

-- Create enhanced logging function for webhook integration
CREATE OR REPLACE FUNCTION log_new_booking()
RETURNS TRIGGER AS $$
BEGIN
  -- Log the new booking with comprehensive data for webhook processing
  INSERT INTO pending_booking_logs (booking_id, payload)
  VALUES (NEW.id, jsonb_build_object(
    'event', 'booking_created',
    'booking_id', NEW.id,
    'booking_type', NEW.booking_type,
    'order_type', NEW.order_type,
    'booking_date', NEW.booking_date,
    'guest_count', NEW.guest_count,
    'phone_number', NEW.phone_number,
    'email', NEW.email,
    'selected_package', NEW.selected_package,
    'total_amount', NEW.total_amount,
    'estimated_total', NEW.estimated_total,
    'venue_type', NEW.venue_type,
    'venue_address', NEW.venue_address,
    'notes', NEW.notes,
    'dietary_requirements', NEW.dietary_requirements,
    'created_at', NEW.created_at,
    'timestamp', NOW()
  ));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger for new bookings
CREATE TRIGGER log_booking_trigger
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION log_new_booking();

-- Grant necessary permissions for webhook functionality
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON public.pending_booking_logs TO service_role;
GRANT ALL ON public.bookings TO service_role;
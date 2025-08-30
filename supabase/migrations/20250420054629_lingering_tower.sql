/*
  # Update bookings table constraints

  1. Changes
    - Update the check constraint for booking_type to include 'special_order'
    
  2. Details
    - Modifies the existing check constraint to allow 'special_order' as a valid booking type
    - This change supports the special orders feature in the application
*/

ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_booking_type_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_booking_type_check 
  CHECK (booking_type = ANY (ARRAY['dining'::text, 'collaboration'::text, 'special_order'::text]));
/*
  # Update phone number validation
  
  1. Changes
    - Remove existing phone number format constraint
    - Add less restrictive phone number validation
    - Remove unique constraint on phone numbers to allow multiple bookings
  
  2. Security
    - Maintain basic validation while being more permissive
*/

-- Drop existing constraints
ALTER TABLE bookings 
DROP CONSTRAINT IF EXISTS phone_number_basic_format,
DROP CONSTRAINT IF EXISTS unique_phone_number;

-- Add new basic phone number validation that just checks for digits and common symbols
ALTER TABLE bookings 
ADD CONSTRAINT phone_number_basic_format 
CHECK (phone_number ~ '^[0-9+][0-9 +()-]*$');
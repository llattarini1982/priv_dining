/*
  # Fix phone number validation
  
  1. Changes
    - Remove existing phone number format constraint
    - Add simpler phone number validation
    
  2. Security
    - Maintain existing RLS policies
    - Ensure basic phone number validation
*/

-- Drop existing phone number format constraint if it exists
ALTER TABLE bookings 
DROP CONSTRAINT IF EXISTS phone_number_basic_format;

-- Add simpler phone number validation that just checks for minimum digits
ALTER TABLE bookings 
ADD CONSTRAINT phone_number_basic_format 
CHECK (phone_number ~ '[0-9].*[0-9].*[0-9].*[0-9].*[0-9].*[0-9].*[0-9].*[0-9]');
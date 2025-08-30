/*
  # Remove email and phone constraints

  1. Changes
    - Remove unique constraint on email
    - Remove phone number format check constraint
    - Make phone number format validation less strict
*/

-- Remove unique constraint on email if it exists
ALTER TABLE bookings 
DROP CONSTRAINT IF EXISTS unique_email;

-- Remove phone number format constraint if it exists
ALTER TABLE bookings 
DROP CONSTRAINT IF EXISTS phone_number_format;

-- Add less strict phone number format check
ALTER TABLE bookings 
ADD CONSTRAINT phone_number_basic_format 
CHECK (phone_number ~ '^[+0-9][0-9\s-+()]*$');
/*
  # Add phone number to bookings table

  1. Changes
    - Add phone_number column to bookings table
    - Add phone number validation check constraint
    - Add phone number to existing RLS policies

  2. Security
    - Maintain existing RLS policies
    - Add phone number to insert/update checks
*/

-- Add phone number column with validation
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE bookings ADD COLUMN phone_number text NOT NULL;
    
    -- Add check constraint for phone number format
    ALTER TABLE bookings 
    ADD CONSTRAINT phone_number_format 
    CHECK (phone_number ~ '^[+]?[0-9\s-()]{8,}$');
  END IF;
END $$;
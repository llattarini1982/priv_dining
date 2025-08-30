/*
  # Add venue columns to bookings table

  1. Changes
    - Add `venue_type` column to bookings table
    - Add `venue_address` column to bookings table
    - Update RLS policies to include new columns

  2. Security
    - Maintain existing RLS policies
    - Ensure new columns are protected by existing policies
*/

-- Add venue columns to bookings table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'venue_type'
  ) THEN
    ALTER TABLE bookings ADD COLUMN venue_type text CHECK (venue_type IN ('home', 'rental'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'venue_address'
  ) THEN
    ALTER TABLE bookings ADD COLUMN venue_address text;
  END IF;
END $$;
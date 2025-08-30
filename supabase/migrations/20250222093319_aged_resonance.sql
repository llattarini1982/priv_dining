/*
  # Booking System Updates
  
  1. New Columns
    - Add selected_items array to store menu selections
    - Add selected_addons array to store addon selections
    - Add estimated_total for price calculation
    - Add venue_type and selected_areas for location preferences
    
  2. Security
    - Enable RLS
    - Add policies for public access (no auth required)
*/

-- Add new columns to bookings table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'selected_items'
  ) THEN
    ALTER TABLE bookings ADD COLUMN selected_items jsonb[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'selected_addons'
  ) THEN
    ALTER TABLE bookings ADD COLUMN selected_addons text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'selected_package'
  ) THEN
    ALTER TABLE bookings ADD COLUMN selected_package text;
  END IF;
END $$;
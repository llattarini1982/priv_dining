/*
  # Remove order_details column
  
  1. Changes
    - Remove order_details column from bookings table if it exists
    
  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  -- Remove order_details column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'order_details'
  ) THEN
    ALTER TABLE bookings DROP COLUMN order_details;
  END IF;
END $$;
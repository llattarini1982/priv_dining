/*
  # Align Database Schema with Application

  1. Changes
    - Add missing columns to bookings table
    - Update column types and constraints
    - Ensure all required fields exist
    
  2. Security
    - Maintain existing RLS policies
    - Add appropriate constraints
*/

-- Add missing columns and update constraints
DO $$ 
BEGIN
  -- Add selected_items column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'selected_items'
  ) THEN
    ALTER TABLE bookings ADD COLUMN selected_items jsonb[];
  END IF;

  -- Add selected_addons column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'selected_addons'
  ) THEN
    ALTER TABLE bookings ADD COLUMN selected_addons text[];
  END IF;

  -- Add selected_package column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'selected_package'
  ) THEN
    ALTER TABLE bookings ADD COLUMN selected_package text;
  END IF;

  -- Add order_type column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'order_type'
  ) THEN
    ALTER TABLE bookings ADD COLUMN order_type text NOT NULL DEFAULT 'dining';
  END IF;

  -- Add total_amount column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'total_amount'
  ) THEN
    ALTER TABLE bookings ADD COLUMN total_amount numeric(10,2) CHECK (total_amount >= 0);
  END IF;

  -- Update order_type constraint
  ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_order_type_check;
  ALTER TABLE bookings ADD CONSTRAINT bookings_order_type_check 
    CHECK (order_type IN ('dining', 'special_order'));

  -- Update booking_type constraint
  ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_booking_type_check;
  ALTER TABLE bookings ADD CONSTRAINT bookings_booking_type_check 
    CHECK (booking_type IN ('dining', 'collaboration', 'special_order'));
END $$;
/*
  # Fix booking schema

  1. Changes
    - Add order_type column if not exists
    - Add total_amount column if not exists
    - Add selected_items column if not exists
    - Add selected_addons column if not exists
    - Add selected_package column if not exists
    - Add check constraints for order_type
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'order_type'
  ) THEN
    ALTER TABLE bookings ADD COLUMN order_type text NOT NULL DEFAULT 'dining'
    CHECK (order_type IN ('dining', 'special_order'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'total_amount'
  ) THEN
    ALTER TABLE bookings ADD COLUMN total_amount numeric(10,2) CHECK (total_amount >= 0);
  END IF;

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
/*
  # Update bookings table for email authentication
  
  1. Changes
    - Add email column if not exists
    - Make email required and unique
    - Update RLS policies to use email-based authentication
    
  2. Security
    - Replace phone-based policies with email-based policies
*/

-- Add email column if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'email'
  ) THEN
    ALTER TABLE bookings ADD COLUMN email text;
  END IF;
END $$;

-- Make email NOT NULL and unique, checking if constraint exists first
DO $$ 
BEGIN
  -- Make email NOT NULL
  ALTER TABLE bookings ALTER COLUMN email SET NOT NULL;
  
  -- Add unique constraint if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'unique_email' AND conrelid = 'bookings'::regclass
  ) THEN
    ALTER TABLE bookings ADD CONSTRAINT unique_email UNIQUE (email);
  END IF;
EXCEPTION
  WHEN others THEN
    -- If there's an error (like constraint already exists), continue
    NULL;
END $$;

-- Update RLS policies to use email
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;

CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert their own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (email = auth.jwt() ->> 'email')
  WITH CHECK (email = auth.jwt() ->> 'email');
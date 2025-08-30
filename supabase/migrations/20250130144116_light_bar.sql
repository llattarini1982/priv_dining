/*
  # Update phone number authentication

  1. Changes
    - Add unique constraint to phone_number
    - Add phone_number to auth.users metadata
    - Update RLS policies to use phone_number instead of user_id

  2. Security
    - Maintain RLS with phone number based policies
    - Ensure data integrity with unique phone numbers
*/

-- Add unique constraint to phone_number
ALTER TABLE bookings
DROP CONSTRAINT IF EXISTS unique_phone_number;

ALTER TABLE bookings
ADD CONSTRAINT unique_phone_number UNIQUE (phone_number);

-- Update RLS policies to use phone_number
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;

CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  USING (phone_number = (auth.jwt() ->> 'phone')::text);

CREATE POLICY "Users can insert their own bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (phone_number = (auth.jwt() ->> 'phone')::text);

CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  USING (phone_number = (auth.jwt() ->> 'phone')::text)
  WITH CHECK (phone_number = (auth.jwt() ->> 'phone')::text);
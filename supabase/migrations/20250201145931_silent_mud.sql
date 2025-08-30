/*
  # Remove authentication and email requirements
  
  1. Changes
    - Drop email unique constraint and NOT NULL requirement
    - Update RLS policies to allow public access
    - Remove user_id foreign key constraint
  
  2. Security
    - Enable public access to bookings and related tables
    - Maintain basic data validation
*/

-- Remove email constraints
ALTER TABLE bookings 
  ALTER COLUMN email DROP NOT NULL,
  DROP CONSTRAINT IF EXISTS unique_email;

-- Remove user_id foreign key and make it nullable
ALTER TABLE bookings 
  DROP CONSTRAINT IF EXISTS bookings_user_id_fkey,
  ALTER COLUMN user_id DROP NOT NULL;

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;

-- Create new public access policies
CREATE POLICY "Public can insert bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view bookings"
  ON bookings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can update bookings"
  ON bookings FOR UPDATE
  TO public
  USING (true);

-- Update menu_selections policies
DROP POLICY IF EXISTS "Users can view their menu selections" ON menu_selections;
DROP POLICY IF EXISTS "Users can insert their menu selections" ON menu_selections;

CREATE POLICY "Public can view menu selections"
  ON menu_selections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert menu selections"
  ON menu_selections FOR INSERT
  TO public
  WITH CHECK (true);

-- Update collaborations policies
DROP POLICY IF EXISTS "Users can view their collaborations" ON collaborations;
DROP POLICY IF EXISTS "Users can insert their collaborations" ON collaborations;

CREATE POLICY "Public can view collaborations"
  ON collaborations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert collaborations"
  ON collaborations FOR INSERT
  TO public
  WITH CHECK (true);
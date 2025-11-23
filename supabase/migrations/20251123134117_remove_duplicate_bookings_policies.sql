/*
  # Remove Duplicate Permissive Policies on Bookings Table

  1. Security Fix
    - Remove duplicate SELECT policies on bookings table
    - Keep only one permissive policy per action to avoid confusion
    - Consolidate "Allow read to all" and "Public can view bookings" into single policy
  
  2. Changes
    - Drop redundant "Allow read to all" policy
    - Keep "Public can view bookings" policy as it's more descriptive
*/

-- Remove duplicate SELECT policy
DROP POLICY IF EXISTS "Allow read to all" ON public.bookings;

-- Ensure the remaining policy exists and is correct
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'bookings' 
    AND policyname = 'Public can view bookings'
  ) THEN
    CREATE POLICY "Public can view bookings"
      ON public.bookings
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;
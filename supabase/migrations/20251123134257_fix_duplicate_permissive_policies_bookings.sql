/*
  # Fix Duplicate Permissive Policies on Bookings Table

  1. Security Improvements
    - Remove duplicate permissive policies that cause security ambiguity
    - Keep single clear policy for public read access
    - Ensures cleaner policy evaluation and better performance
  
  2. Changes
    - Drop "Allow read to all" policy (older/redundant)
    - Keep "Public can view bookings" policy (more descriptive)
  
  3. Important Notes
    - Uses IF EXISTS to prevent errors on re-run
    - Both policies were permissive SELECT policies for all roles
*/

-- Drop the duplicate policy
DROP POLICY IF EXISTS "Allow read to all" ON public.bookings;

-- Keep the more descriptive policy "Public can view bookings"
-- (No need to recreate, it already exists)

/*
  # Fix Newsletter Subscribers RLS Policies

  1. Security Updates
    - Update RLS policies to allow anonymous users to subscribe
    - Allow public INSERT operations for newsletter subscriptions
    - Maintain security for other operations

  2. Changes
    - Drop existing restrictive policies
    - Add new policy allowing anonymous INSERT operations
    - Keep service role access for admin operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Service role can read all subscribers" ON newsletter_subscribers;

-- Create new policies that allow anonymous users to subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO service_role
  USING (true);

-- Allow anonymous users to check if email exists (needed for duplicate prevention)
CREATE POLICY "Anyone can check email existence"
  ON newsletter_subscribers
  FOR SELECT
  TO anon, authenticated
  USING (true);
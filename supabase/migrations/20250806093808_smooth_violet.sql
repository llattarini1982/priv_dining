/*
  # Create newsletter subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, unique, required)
      - `subscribed_at` (timestamp)
      - `is_active` (boolean, default true)

  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for public to insert subscriptions
    - Add policy for service role to read all subscriptions
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Service role can read all subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO service_role
  USING (true);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS newsletter_subscribers_email_idx ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS newsletter_subscribers_active_idx ON newsletter_subscribers(is_active);
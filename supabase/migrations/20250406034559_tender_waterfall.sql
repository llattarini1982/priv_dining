/*
  # Add order choices table
  
  1. New Tables
    - `order_choices`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `name` (text)
      - `quantity` (integer)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS
    - Add policies for public access
    - Add foreign key constraint to bookings table
*/

-- Create order_choices table
CREATE TABLE order_choices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE order_choices ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Public can insert order choices"
  ON order_choices FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view order choices"
  ON order_choices FOR SELECT
  TO public
  USING (true);

-- Create index for faster lookups
CREATE INDEX order_choices_booking_id_idx ON order_choices(booking_id);
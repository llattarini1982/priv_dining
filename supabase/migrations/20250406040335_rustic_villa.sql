/*
  # Add Special Orders Table

  1. New Table
    - `special_orders`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `item_type` (text) - 'pinsa_base', 'lasagna', 'pizzette'
      - `size` (text) - 'XS', 'S', 'M', 'L'
      - `quantity` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for public access
*/

-- Create special_orders table
CREATE TABLE special_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  item_type text NOT NULL CHECK (item_type IN ('pinsa_base', 'lasagna', 'pizzette')),
  size text NOT NULL CHECK (size IN ('XS', 'S', 'M', 'L')),
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE special_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Public can insert special orders"
  ON special_orders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view special orders"
  ON special_orders FOR SELECT
  TO public
  USING (true);

-- Create index for faster lookups
CREATE INDEX special_orders_booking_id_idx ON special_orders(booking_id);
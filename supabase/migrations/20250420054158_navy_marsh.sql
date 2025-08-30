/*
  # Update bookings table for special orders
  
  1. Changes
    - Add order_type column to distinguish between regular dining and special orders
    - Add check constraint for order_type
    - Update existing RLS policies
  
  2. Security
    - Maintain existing RLS policies
    - Add validation for order types
*/

-- Add order_type column
ALTER TABLE bookings
ADD COLUMN order_type text NOT NULL DEFAULT 'dining'
CHECK (order_type IN ('dining', 'special_order'));

-- Add total_amount column for special orders
ALTER TABLE bookings
ADD COLUMN total_amount numeric(10,2) CHECK (total_amount >= 0);

-- Create index for order type
CREATE INDEX bookings_order_type_idx ON bookings(order_type);
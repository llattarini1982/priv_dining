/*
  # Update Special Orders Table

  1. Changes
    - Add `sharing_platter` to item_type enum
    - Add price column to track order prices
    - Add name column for item identification
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add new item type to the check constraint
ALTER TABLE special_orders 
DROP CONSTRAINT IF EXISTS special_orders_item_type_check;

ALTER TABLE special_orders 
ADD CONSTRAINT special_orders_item_type_check 
CHECK (item_type IN ('pinsa_base', 'lasagna', 'pizzette', 'sharing_platter'));

-- Add price column
ALTER TABLE special_orders
ADD COLUMN price numeric(10,2) NOT NULL CHECK (price >= 0);

-- Add name column
ALTER TABLE special_orders
ADD COLUMN name text NOT NULL;
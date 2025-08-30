/*
  # Add quantities to menu selections and venue details
  
  1. Changes
    - Add quantity column to menu_selections table
    - Add selected_areas column to bookings table
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add quantity to menu_selections
ALTER TABLE menu_selections
ADD COLUMN quantity integer NOT NULL DEFAULT 1;

-- Add selected areas to bookings
ALTER TABLE bookings
ADD COLUMN selected_areas text[] DEFAULT '{}'::text[];
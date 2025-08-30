/*
  # Add quantity column to menu_selections

  1. Changes
    - Add quantity column to menu_selections table with default value of 1
    - Add check constraint to ensure quantity is positive
*/

-- Add quantity column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'menu_selections' AND column_name = 'quantity'
  ) THEN
    ALTER TABLE menu_selections 
    ADD COLUMN quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0);
  END IF;
END $$;
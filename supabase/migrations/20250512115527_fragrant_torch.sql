/*
  # Remove order insert trigger
  
  1. Changes
    - Drop the order_insert_trigger from bookings table
    - Drop the notify_new_order function if it exists
    
  2. Security
    - No security changes needed
*/

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS order_insert_trigger ON bookings;

-- Drop the trigger function if it exists
DROP FUNCTION IF EXISTS notify_new_order;
/*
  # Add booking timestamp and estimated total

  1. Changes
    - Add `booking_timestamp` column to store the exact time of the booking
    - Add `estimated_total` column to store the calculated total price
    - Make `booking_date` nullable since we'll use booking_timestamp as the primary time reference
    - Add check constraint to ensure estimated_total is non-negative

  2. Notes
    - booking_timestamp will be used as the primary key for time-based operations
    - estimated_total stores the calculated total from menu selections
*/

-- Add booking_timestamp column
ALTER TABLE bookings
ADD COLUMN booking_timestamp timestamptz NOT NULL DEFAULT now();

-- Add estimated_total column
ALTER TABLE bookings
ADD COLUMN estimated_total decimal(10,2) CHECK (estimated_total >= 0);

-- Make booking_date nullable since we have booking_timestamp
ALTER TABLE bookings
ALTER COLUMN booking_date DROP NOT NULL;
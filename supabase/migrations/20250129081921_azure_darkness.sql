/*
  # Initial Restaurant Schema

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `booking_date` (date)
      - `guest_count` (integer)
      - `booking_type` (text) - 'dining' or 'collaboration'
      - `status` (text) - 'pending', 'confirmed', 'cancelled'
      - `notes` (text)
      - `dietary_requirements` (text)
      
    - `menu_selections`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `item_name` (text)
      - `created_at` (timestamp)

    - `collaborations`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `collaboration_type` (text)
      - `project_description` (text)
      - `social_media` (text)
      - `timeline` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL,
  booking_date date NOT NULL,
  guest_count integer,
  booking_type text NOT NULL CHECK (booking_type IN ('dining', 'collaboration')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes text,
  dietary_requirements text
);

-- Create menu_selections table
CREATE TABLE menu_selections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings ON DELETE CASCADE NOT NULL,
  item_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create collaborations table
CREATE TABLE collaborations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings ON DELETE CASCADE NOT NULL,
  collaboration_type text NOT NULL,
  project_description text,
  social_media text,
  timeline text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborations ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for menu_selections
CREATE POLICY "Users can view their menu selections"
  ON menu_selections
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM bookings 
    WHERE bookings.id = menu_selections.booking_id 
    AND bookings.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their menu selections"
  ON menu_selections
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM bookings 
    WHERE bookings.id = menu_selections.booking_id 
    AND bookings.user_id = auth.uid()
  ));

-- Policies for collaborations
CREATE POLICY "Users can view their collaborations"
  ON collaborations
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM bookings 
    WHERE bookings.id = collaborations.booking_id 
    AND bookings.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their collaborations"
  ON collaborations
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM bookings 
    WHERE bookings.id = collaborations.booking_id 
    AND bookings.user_id = auth.uid()
  ));
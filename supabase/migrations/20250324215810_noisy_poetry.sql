/*
  # Create gyms database schema

  1. New Tables
    - `gyms`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `address` (text)
      - `neighborhood` (text)
      - `rating` (decimal)
      - `price_range` (text)
      - `image_url` (text)
      - `website` (text)
      - `phone` (text)
      - `email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `multisport` (boolean)
      - `facility_type` (text)
      - `latitude` (decimal)
      - `longitude` (decimal)
    
    - `gym_hours`
      - `gym_id` (uuid, references gyms)
      - `day` (text)
      - `open_time` (time)
      - `close_time` (time)
    
    - `gym_amenities`
      - `gym_id` (uuid, references gyms)
      - `amenity` (text)
    
    - `gym_classes`
      - `gym_id` (uuid, references gyms)
      - `class_name` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage their own gyms
*/

-- Create gyms table
CREATE TABLE IF NOT EXISTS gyms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address text NOT NULL,
  neighborhood text,
  rating decimal(3,2),
  price_range text,
  image_url text,
  website text,
  phone text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  multisport boolean DEFAULT false,
  facility_type text,
  latitude decimal(10,8),
  longitude decimal(11,8)
);

-- Create gym_hours table
CREATE TABLE IF NOT EXISTS gym_hours (
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  day text NOT NULL,
  open_time time NOT NULL,
  close_time time NOT NULL,
  PRIMARY KEY (gym_id, day)
);

-- Create gym_amenities table
CREATE TABLE IF NOT EXISTS gym_amenities (
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  amenity text NOT NULL,
  PRIMARY KEY (gym_id, amenity)
);

-- Create gym_classes table
CREATE TABLE IF NOT EXISTS gym_classes (
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  class_name text NOT NULL,
  PRIMARY KEY (gym_id, class_name)
);

-- Enable Row Level Security
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_classes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view gyms"
  ON gyms
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view gym hours"
  ON gym_hours
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view gym amenities"
  ON gym_amenities
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view gym classes"
  ON gym_classes
  FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated users
CREATE POLICY "Authenticated users can manage gyms"
  ON gyms
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gym hours"
  ON gym_hours
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gym amenities"
  ON gym_amenities
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gym classes"
  ON gym_classes
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gyms_neighborhood ON gyms(neighborhood);
CREATE INDEX IF NOT EXISTS idx_gyms_facility_type ON gyms(facility_type);
CREATE INDEX IF NOT EXISTS idx_gyms_rating ON gyms(rating);
CREATE INDEX IF NOT EXISTS idx_gyms_multisport ON gyms(multisport);
CREATE INDEX IF NOT EXISTS idx_gyms_location ON gyms(latitude, longitude);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_gyms_updated_at
  BEFORE UPDATE ON gyms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
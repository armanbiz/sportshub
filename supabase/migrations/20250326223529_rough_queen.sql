/*
  # Update gyms schema

  1. Changes
    - Restructure gyms table with new columns
    - Update related tables for working hours, classes, and amenities
    - Remove unused columns
    - Add appropriate indexes for performance

  2. New Structure
    - Main gyms table with core information
    - Related tables for:
      - Working hours
      - Classes offered
      - Amenities
*/

-- Drop existing tables
DROP TABLE IF EXISTS gym_hours CASCADE;
DROP TABLE IF EXISTS gym_classes CASCADE;
DROP TABLE IF EXISTS gym_amenities CASCADE;
DROP TABLE IF EXISTS gyms CASCADE;

-- Create new gyms table
CREATE TABLE IF NOT EXISTS gyms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_name text NOT NULL,
  full_address text NOT NULL,
  google_rating decimal(3,2),
  reviews integer,
  longitude decimal(11,8),
  latitude decimal(10,8),
  type text,
  price_range text,
  logo_link text,
  photo_link text,
  website_link text,
  country_code text,
  neighborhood text,
  postal_code text,
  phone text
);

-- Create gym_hours table
CREATE TABLE IF NOT EXISTS gym_hours (
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  day text NOT NULL,
  hours text NOT NULL,
  PRIMARY KEY (gym_id, day)
);

-- Create gym_classes table
CREATE TABLE IF NOT EXISTS gym_classes (
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  class_name text NOT NULL,
  PRIMARY KEY (gym_id, class_name)
);

-- Create gym_amenities table
CREATE TABLE IF NOT EXISTS gym_amenities (
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  amenity text NOT NULL,
  PRIMARY KEY (gym_id, amenity)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gyms_location ON gyms(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_gyms_neighborhood ON gyms(neighborhood);
CREATE INDEX IF NOT EXISTS idx_gyms_type ON gyms(type);
CREATE INDEX IF NOT EXISTS idx_gyms_rating ON gyms(google_rating);
CREATE INDEX IF NOT EXISTS idx_gyms_postal_code ON gyms(postal_code);

-- Enable Row Level Security
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_amenities ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Public can view gym classes"
  ON gym_classes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view gym amenities"
  ON gym_amenities
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

CREATE POLICY "Authenticated users can manage gym classes"
  ON gym_classes
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gym amenities"
  ON gym_amenities
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
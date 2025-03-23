/*
  # Update article policies

  1. Changes
    - Update the public article viewing policy to be more permissive
    - Add policy for public access without authentication requirement
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Public can view published articles" ON articles;

-- Create new more permissive policy
CREATE POLICY "Public can view published articles"
  ON articles
  FOR SELECT
  TO public
  USING (published = true);

-- Enable security by default
ALTER TABLE articles FORCE ROW LEVEL SECURITY;
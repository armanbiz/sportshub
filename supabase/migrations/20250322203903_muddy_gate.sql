/*
  # Create storage bucket for article images
  
  1. New Storage
    - Create a public bucket for article images
    - Set up security policies for image access
*/

-- Create a new public bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload article images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'article-images'
);

-- Allow public to view images
CREATE POLICY "Public can view article images"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'article-images'
);

-- Allow users to update and delete their own images
CREATE POLICY "Users can update their own article images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'article-images' AND
  auth.uid() = owner
);

CREATE POLICY "Users can delete their own article images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'article-images' AND
  auth.uid() = owner
);
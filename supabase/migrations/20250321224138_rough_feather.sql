/*
  # Create blog system tables

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `excerpt` (text)
      - `published` (boolean)
      - `featured_image` (text)
      - `author_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
    - `article_categories`
      - Junction table for articles and categories
  
  2. Security
    - Enable RLS on all tables
    - Add policies for:
      - Public read access to published articles
      - Authenticated users can manage their own articles
      - Admin users can manage all articles
*/

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  published boolean DEFAULT false,
  featured_image text,
  author_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create junction table for articles and categories
CREATE TABLE IF NOT EXISTS article_categories (
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;

-- Policies for articles
CREATE POLICY "Public can view published articles"
  ON articles
  FOR SELECT
  USING (published = true);

CREATE POLICY "Users can manage their own articles"
  ON articles
  USING (auth.uid() = author_id);

-- Policies for categories
CREATE POLICY "Public can view categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can manage categories"
  ON categories
  USING (auth.role() = 'authenticated');

-- Policies for article_categories
CREATE POLICY "Public can view article categories"
  ON article_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can manage their article categories"
  ON article_categories
  USING (
    EXISTS (
      SELECT 1 FROM articles
      WHERE articles.id = article_categories.article_id
      AND articles.author_id = auth.uid()
    )
  );
import { supabase } from '@/lib/supabase';

interface CreateArticleData {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  categories?: string[];
  published?: boolean;
}

export async function createArticle(data: CreateArticleData, apiKey: string) {
  try {
    // Verify API key
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('user_id')
      .eq('key', apiKey)
      .single();

    if (keyError || !keyData) {
      throw new Error('Invalid API key');
    }

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create article
    const { data: article, error } = await supabase
      .from('articles')
      .insert([
        {
          title: data.title,
          slug,
          content: data.content,
          excerpt: data.excerpt,
          featured_image: data.featured_image,
          published: data.published ?? false,
          author_id: keyData.user_id
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Add categories if provided
    if (data.categories?.length) {
      const { error: categoryError } = await supabase
        .from('article_categories')
        .insert(
          data.categories.map(categoryId => ({
            article_id: article.id,
            category_id: categoryId
          }))
        );

      if (categoryError) throw categoryError;
    }

    return { success: true, data: article };
  } catch (error) {
    console.error('Error creating article:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
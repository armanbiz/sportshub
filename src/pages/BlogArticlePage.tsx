import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { marked } from 'marked';
import { Article } from '@/types';
import { supabase } from '@/lib/supabase';
import AnimatedSection from '@/components/AnimatedSection';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  async function fetchArticle(slug: string) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center text-gray-400 pt-24">Loading article...</div>;
  }

  if (!article) {
    return <div className="text-center text-gray-400 pt-24">Article not found</div>;
  }

  return (
    <div className="pt-24 bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          {article.featured_image && (
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-[500px] object-cover rounded-xl mb-8"
            />
          )}
          <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-400 mb-8">
            <time>{format(new Date(article.created_at), 'MMMM d, yyyy')}</time>
            {article.categories && (
              <div className="flex gap-2">
                {article.categories.map((category) => (
                  <span
                    key={category.id}
                    className="px-3 py-1 text-sm bg-white/10 text-white rounded-full"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: marked(article.content) }}
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
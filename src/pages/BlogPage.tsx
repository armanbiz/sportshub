import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Article } from '@/types';
import { supabase } from '@/lib/supabase';
import AnimatedSection from '@/components/AnimatedSection';

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
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
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched articles:', data);
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Fitness & Lifestyle Blog
          </h1>
          {articles.length === 0 && !loading && (
            <p className="text-gray-400 mt-4">No articles found. Make sure articles are marked as published.</p>
          )}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert tips, workout guides, and healthy living advice
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="text-center text-gray-400">Loading articles...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <AnimatedSection
                key={article.id}
                className="bg-dark-card rounded-xl overflow-hidden border border-white/10 hover:border-neon-green/40 transition-all duration-300"
              >
                {article.featured_image && (
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    <Link to={`/blog/${article.slug}`} className="hover:text-neon-green">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    {format(new Date(article.created_at), 'MMMM d, yyyy')}
                  </p>
                  {article.excerpt && (
                    <p className="text-gray-300 mb-4">{article.excerpt}</p>
                  )}
                  {article.categories && (
                    <div className="flex flex-wrap gap-2">
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
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
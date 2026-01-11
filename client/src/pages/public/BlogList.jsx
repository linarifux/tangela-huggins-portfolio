import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiTag } from 'react-icons/fi';
import api from '../../utils/api';
import SEO from '../../components/layout/SEO';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/blog');
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-brand-white pt-32 pb-20 px-6 lg:px-20">
      
      <SEO
        title="The Journal" 
        description="Read the latest insights on leadership, resilience, and transformation. Practical strategies for the 'Grean Light Go' mindset."
      />

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-black mb-6">
          The Journal
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto font-light text-lg">
          Insights on leadership, resilience, and transformation.
        </p>
      </div>

      {/* Loading State */}
      {loading && <div className="text-center py-20">Loading articles...</div>}

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No articles published yet. Check back soon.
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {posts.map((post, index) => (
          <Link to={`/blog/${post._id}`} key={post._id}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              {/* Image Wrapper */}
              <div className="overflow-hidden rounded-xl mb-6 aspect-[4/3] bg-gray-100 relative">
                {post.media && post.media.url ? (
                  <img 
                    src={post.media.url} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No Image</div>
                )}
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-black">
                   {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  <FiClock size={12} /> 
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                
                <h3 className="text-2xl font-serif leading-tight group-hover:underline decoration-1 underline-offset-4 decoration-gray-400 mb-3">
                  {post.title}
                </h3>
                
                {/* Simple excerpt from content (first 100 chars) */}
                <p className="text-gray-500 font-light line-clamp-3 text-sm leading-relaxed">
                  {post.content.substring(0, 120)}...
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-black text-sm uppercase tracking-widest transition-colors"
        >
          <FiArrowLeft /> Back to Home
        </Link>
      </div>

    </div>
  );
};

export default BlogList;
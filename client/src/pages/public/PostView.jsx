import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // <--- Redux Hooks
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiTag } from 'react-icons/fi';
import { getPost, clearCurrentPost } from '../../features/blog/blogSlice'; // <--- Import Actions
import SEO from '../../components/layout/SEO';

const PostView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 1. Select state from Redux
  const { post, isLoading } = useSelector((state) => state.blog);

  // 2. Fetch Post via Redux
  useEffect(() => {
    dispatch(clearCurrentPost()); // Clear previous post data so we don't see a flash of old content
    dispatch(getPost(id));
  }, [dispatch, id]);

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading Article...</div>;
  if (!post) return <div className="h-screen flex items-center justify-center">Post not found.</div>;

  return (
    <article className="min-h-screen bg-brand-white pt-32 pb-20">
      
      <SEO 
        title={post.title} 
        description={post.content.substring(0, 150) + "..."} 
        image={post.media?.url} 
      />

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
        {/* Updated Back Link to point to the main Blog List */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-black mb-8 text-sm uppercase tracking-widest transition-colors">
          <FiArrowLeft /> Back to Journal
        </Link>
        
        <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
          <span className="flex items-center gap-1"><FiTag /> {post.category}</span>
          <span className="flex items-center gap-1"><FiClock /> {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif font-bold text-brand-black leading-tight"
        >
          {post.title}
        </motion.h1>
      </div>

      {/* Hero Image */}
      {post.media && post.media.url && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-6xl mx-auto h-[400px] md:h-[600px] rounded-2xl overflow-hidden mb-16 shadow-2xl px-6 lg:px-0"
        >
          <img src={post.media.url} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>
      )}

      {/* Content Body */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl mx-auto px-6"
      >
        <div className="prose prose-lg prose-neutral font-serif text-gray-700 leading-loose">
           {/* Simple whitespace handling. */}
           {post.content.split('\n').map((paragraph, idx) => (
             <p key={idx} className="mb-6">{paragraph}</p>
           ))}
        </div>
      </motion.div>

    </article>
  );
};

export default PostView;
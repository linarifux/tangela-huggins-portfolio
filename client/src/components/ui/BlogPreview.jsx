import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiClock, FiTag } from 'react-icons/fi';
import api from '../../utils/api'; // <--- Use our secure API utility

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/blog');
        // Take the first 3 posts only
        setPosts(data.slice(0, 3)); 
      } catch (error) {
        console.error("Failed to fetch posts for homepage", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // If no posts exist yet, hide the section or show a "Coming Soon" message
  if (!loading && posts.length === 0) return null; 

  return (
    <section id="journal" className="bg-brand-white py-20 lg:py-32 px-6 lg:px-20">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Journal</h2>
          <p className="text-4xl md:text-5xl font-serif text-brand-black">Latest Insights</p>
        </div>
        {/* We don't have a 'All Posts' page yet, so we can hide this or link to a future page */}
        <button className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-500 transition-colors border-b border-black pb-1">
          Read Journal <FiArrowUpRight />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map((post, index) => (
          <Link to={`/blog/${post._id}`} key={post._id}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              {/* Image Wrapper */}
              <div className="overflow-hidden rounded-xl mb-6 aspect-[4/3] bg-gray-100">
                {post.media && post.media.url ? (
                  <img 
                    src={post.media.url} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No Image</div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span className="flex items-center gap-1"><FiTag size={10} /> {post.category}</span>
                  <span className="flex items-center gap-1"><FiClock size={10} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-2xl font-serif leading-tight group-hover:underline decoration-1 underline-offset-4 decoration-gray-400 line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      
    </section>
  );
};

export default BlogPreview;
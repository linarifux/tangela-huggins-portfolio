import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="h-screen w-full bg-brand-white flex flex-col items-center justify-center px-6 text-center">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Big Editorial 404 */}
        <h1 className="text-[20vw] font-serif leading-none text-brand-black opacity-10 select-none">
          404
        </h1>
        
        <div className="-mt-12 md:-mt-24 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-black mb-6">
            Page not found.
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-10 font-light">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-brand-black text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
          >
            <FiArrowLeft /> Back to Home
          </Link>
        </div>
      </motion.div>

    </div>
  );
};

export default NotFound;
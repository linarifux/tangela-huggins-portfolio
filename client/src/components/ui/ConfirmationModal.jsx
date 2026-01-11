import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl z-10"
        >
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
            <FiAlertTriangle size={24} />
          </div>
          
          <h3 className="text-xl font-serif font-bold text-center mb-2">{title}</h3>
          <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
            >
              {isLoading ? 'Processing...' : 'Confirm'}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
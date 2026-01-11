import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiMail, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast'; // <--- Import Toast
import { submitInquiry, resetContact } from '../../features/contact/contactSlice';
import SEO from '../../components/layout/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Speaking',
    message: ''
  });

  const dispatch = useDispatch();

  // Select state from Redux
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.contact
  );

  // Handle Side Effects (Toasts & Form Reset)
  useEffect(() => {
    if (isSuccess) {
      toast.success("We've received your message!"); // <--- Success Toast
      setFormData({ name: '', email: '', service: 'Speaking', message: '' });
    }

    if (isError) {
      toast.error(message || "Something went wrong. Please try again."); // <--- Error Toast
    }
    
    // Cleanup: Reset Redux state when component unmounts
    return () => {
      if(isSuccess || isError) dispatch(resetContact());
    };
  }, [isSuccess, isError, message, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitInquiry(formData));
  };

  // Helper to manually reset view to send another message
  const handleReset = () => {
    dispatch(resetContact());
  };

  return (
    <div className="min-h-screen bg-brand-white pt-32 pb-20 px-6 lg:px-20">
      
      <SEO
        title="Contact & Booking" 
        description="Book Tangela Huggins for keynote speaking, executive coaching, or corporate workshops. Get in touch to start your transformation."
      />

      <div className="flex flex-col lg:flex-row gap-20 max-w-7xl mx-auto">
        
        {/* LEFT COLUMN: The "Ask" */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif text-brand-black mb-8 leading-tight">
              Let's start a <br/>
              <span className="italic text-gray-400">conversation.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-md font-light">
              Whether you're looking for a keynote speaker, a transformational coach, or just want to say hello—we'd love to hear from you.
            </p>

            <div className="flex flex-col gap-6 text-gray-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-black">
                  <FiMail />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold">Email</p>
                  <p className="text-lg text-black">hello@tangelahuggins.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-black">
                  <FiMapPin />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold">Base</p>
                  <p className="text-lg text-black">Atlanta, GA & Worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className="lg:w-1/2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
          
          {/* Success Overlay managed by Redux state */}
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-brand-black z-20 flex flex-col items-center justify-center text-white text-center p-10"
            >
              <FiCheckCircle size={60} className="mb-6 text-green-400" />
              <h3 className="text-3xl font-serif mb-2">Message Sent!</h3>
              <p className="text-gray-400">Thank you for reaching out. Tangela's team will be in touch shortly.</p>
              <button 
                onClick={handleReset}
                className="mt-8 text-xs uppercase tracking-widest border-b border-white pb-1 hover:text-gray-300"
              >
                Send another message
              </button>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
            
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Your Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full border-b border-gray-200 py-4 text-xl focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full border-b border-gray-200 py-4 text-xl focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200"
                required
              />
            </div>

            {/* Service Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400">I'm Interested In</label>
              <select 
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-4 text-xl focus:outline-none focus:border-black transition-colors bg-transparent cursor-pointer"
              >
                <option value="Speaking">Keynote Speaking</option>
                <option value="Coaching">Executive Coaching</option>
                <option value="Workshops">Corporate Workshops</option>
                <option value="Media">Media / Press</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your event or goals..."
                rows="4"
                className="w-full border-b border-gray-200 py-4 text-xl focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200 resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-4 bg-brand-black text-white py-5 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
              {!isLoading && <FiArrowUpRight />}
            </button>
            

          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
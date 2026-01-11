import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux'; // <--- Import Hooks
import { FiMenu, FiX, FiArrowUpRight, FiLogOut } from 'react-icons/fi';
import { logout, reset } from '../../features/auth/authSlice'; // <--- Import Actions

// Public Menu
const publicLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Journal", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

// Admin Menu
const adminLinks = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Create Post", path: "/admin/create-post" },
  { name: "Inbox", path: "/admin/inquiries" },
  { name: "All Posts", path: "/admin/posts" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // <--- Check for User

  // Determine which links to show
  const navLinks = user ? adminLinks : publicLinks;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-6 transition-all duration-300 pointer-events-none`}
      >
        <div 
          className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled 
              ? "bg-white/80 backdrop-blur-md shadow-lg w-full max-w-5xl border border-white/20" 
              : "bg-transparent w-full max-w-7xl"
          }`}
        >
          {/* Logo */}
          <Link to={user ? "/admin/dashboard" : "/"} className="text-2xl font-serif font-bold tracking-tighter z-50 relative">
            TH{user && <span className="text-blue-600 text-xs align-top ml-1">ADMIN</span>}.
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm uppercase tracking-widest font-medium transition-colors relative group ${
                  location.pathname === link.path ? "text-black font-bold" : "text-gray-600 hover:text-black"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-black transition-all duration-300 ${
                   location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
            
            {/* Show Logout if Admin */}
            {user && (
              <button 
                onClick={handleLogout}
                className="text-sm uppercase tracking-widest font-medium text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
              >
                <FiLogOut /> Logout
              </button>
            )}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            
            {/* CTA Button (Only show for Public) */}
            {!user && (
              <Link 
                to="/contact" 
                className="hidden md:flex items-center gap-2 px-5 py-2 bg-brand-black text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
              >
                Book Now <FiArrowUpRight />
              </Link>
            )}

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-50 relative"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-brand-white flex flex-col justify-center px-8 md:hidden"
          >
            {/* Menu Links */}
            <div className="flex flex-col gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={link.path} 
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-serif font-bold text-brand-black hover:text-gray-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Logout */}
              {user && (
                 <motion.div
                   initial={{ x: -50, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: navLinks.length * 0.1 }}
                 >
                   <button 
                     onClick={handleLogout}
                     className="text-3xl font-serif font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-2 mt-4"
                   >
                     <FiLogOut /> Logout
                   </button>
                 </motion.div>
              )}
            </div>

            {/* Mobile Bottom Info (Only for Public) */}
            {!user && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-20 border-t border-gray-200 pt-8"
              >
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Contact</p>
                <p className="text-lg">hello@tangelahuggins.com</p>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom'; // <--- Import Link
import { FaLinkedinIn, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-white pt-20 pb-10 px-6 lg:px-20 border-t border-white/10">
      
      {/* Top Section: CTA & Navigation */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
        
        {/* Left: Brand & CTA */}
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
            Ready to start your <br />
            <span className="italic text-gray-400">transformation?</span>
          </h2>
          <Link 
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-full font-bold"
          >
            Book Tangela
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex gap-12 md:gap-24 text-sm uppercase tracking-widest text-gray-400">
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold mb-2">Menu</span>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Journal</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold mb-2">Socials</span>
            <a href="https://linkedin.com/in/tangelahuggins" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://instagram.com/tangelahuggins" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://youtube.com/@thetransformationworkshop" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright & Social Icons */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
        
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Tangela Huggins. All rights reserved.
        </div>

        <div className="flex gap-6">
          <SocialLink href="https://linkedin.com/in/tangelahuggins" icon={<FaLinkedinIn />} />
          <SocialLink href="https://instagram.com/tangelahuggins" icon={<FaInstagram />} />
          <SocialLink href="https://youtube.com/@thetransformationworkshop" icon={<FaYoutube />} />
          <SocialLink href="#" icon={<FaTiktok />} />
        </div>

      </div>
    </footer>
  );
};

// Helper Component for Social Icons
const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
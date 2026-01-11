import React from 'react';
import Hero from '../../../components/ui/Hero';
import AboutSticky from '../../../components/ui/AboutSticky';
import ServicesAccordion from '../../../components/ui/ServicesAccordion';
import BlogPreview from '../../../components/ui/BlogPreview';
import SEO from '../../../components/layout/SEO';

const Home = () => {
  return (
    <div className="bg-brand-white selection:bg-brand-black selection:text-white">
      <SEO />
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Story Section */}
      <AboutSticky />
      
      {/* 3. Services Section */}
      <ServicesAccordion />
      
      {/* 4. Blog/News Section */}
      <BlogPreview />
    </div>
  );
};

export default Home;
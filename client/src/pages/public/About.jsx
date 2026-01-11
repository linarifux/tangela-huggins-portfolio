import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../../components/layout/SEO';

const About = () => {
  return (
    <div className="bg-brand-white min-h-screen pt-32 pb-20 px-6 lg:px-20 selection:bg-brand-black selection:text-white">
      <SEO 
        title="About The Story" 
        description="From corporate finance to transformational leadership. Learn about Tangela Huggins and the journey behind Grean Light Go."
      />
      {/* 1. HERO SECTION */}
      <section className="max-w-5xl mx-auto mb-24 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">The Story</h2>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-black leading-tight mb-8">
            Bridging the gap between <br />
            <span className="italic text-gray-500">corporate strategy</span> & <br />
            holistic transformation.
          </h1>
          <div className="h-[1px] w-24 bg-black"></div>
        </motion.div>
      </section>

      {/* 2. BIO & IMAGE SPLIT */}
      <section className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32 max-w-7xl mx-auto">
        
        {/* Left: Image (Portrait) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/3 relative"
        >
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 shadow-xl">
            {/* Replace with a high-quality portrait of Tangela */}
            <img 
              src="https://scontent.fdac183-1.fna.fbcdn.net/v/t39.30808-6/503874334_10236302692568152_8621278230970159716_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=d1qBJVHuD_IQ7kNvwGJ4K4j&_nc_oc=AdkdqiHokYost8mN9EsIvDdN3pCQLuyVXL7zHy-IyIz69GuSjHAhmmiuJJTLaIh6zCc&_nc_zt=23&_nc_ht=scontent.fdac183-1.fna&_nc_gid=vAXzF9zn5y9Kw1sN9fE-1A&oh=00_AfoFtAjj2-8lIzQpmVcV4gqXiEcTzxonWb966pAhvhnPqw&oe=6969B02D" 
              alt="Tangela Huggins" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-100 -z-10 rounded-full"></div>
        </motion.div>

        {/* Right: Detailed Text */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-2/3 flex flex-col justify-center"
        >
          <h3 className="text-3xl font-serif font-bold mb-6">From Ledgers to Leadership</h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
            Before the stage lights, there were spreadsheets. With a solid background in <strong>Accounting and Finance from Mercer University</strong>, I spent over 15 years navigating the corporate landscape. I understood the numbers, the bottom lines, and the strategies that drive profit.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
            But I also saw the human cost. I saw leaders burning out, potential being stifled by trauma, and teams disconnected from their purpose. I realized my true calling wasn't just managing assets—it was <strong>empowering people</strong>.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-10 font-light">
            Today, as the founder of <strong>Grean Light Go</strong> and the <strong>Transformation Foundation (501c3)</strong>, I combine my corporate acumen with deep emotional intelligence to help organizations and individuals bloom—no matter the circumstances.
          </p>

          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" // Placeholder signature
            alt="Signature" 
            className="w-48 opacity-50"
          />
        </motion.div>
      </section>

      {/* 3. STATS STRIP */}
      <section className="bg-brand-black text-white rounded-3xl p-12 md:p-20 mb-32 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <StatItem number="15+" label="Years Corporate Experience" />
          <StatItem number="501(c)(3)" label="Non-Profit Founder" />
          <StatItem number="1000s" label="Lives Impacted" />
        </div>
      </section>

      {/* 4. PHILOSOPHY GRID */}
      <section className="max-w-6xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold mb-4">Core Philosophies</h2>
          <p className="text-gray-500">The pillars that drive every keynote and workshop.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PhilosophyCard 
            title="Grean Light Go" 
            desc="Stop waiting for permission. Identify your blocks, green-light your own potential, and move forward with intentional speed."
          />
          <PhilosophyCard 
            title="Bloom Anyway" 
            desc="Adversity is not the end; it's the soil. We teach resilience strategies to grow and thrive even in hostile environments."
          />
          <PhilosophyCard 
            title="Holistic Wealth" 
            desc="True success isn't just financial. It's the balance of mental peace, emotional health, and professional achievement."
          />
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="text-center bg-gray-50 py-24 rounded-2xl border border-gray-100">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          Ready to write your next chapter?
        </h2>
        <p className="text-gray-500 mb-10 max-w-lg mx-auto">
          Whether for your team or yourself, transformation begins with a conversation.
        </p>
        <Link 
          to="/contact"
          className="inline-flex items-center gap-3 bg-brand-black text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
        >
          Work with Tangela <FiArrowUpRight />
        </Link>
      </section>

    </div>
  );
};

// Helper Components
const StatItem = ({ number, label }) => (
  <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
    <span className="text-5xl md:text-6xl font-serif font-bold mb-2">{number}</span>
    <span className="text-gray-400 text-xs uppercase tracking-widest">{label}</span>
  </div>
);

const PhilosophyCard = ({ title, desc }) => (
  <div className="p-8 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow bg-white">
    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-brand-black mb-6">
      <FiCheck size={24} />
    </div>
    <h3 className="text-xl font-bold font-serif mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">
      {desc}
    </p>
  </div>
);

export default About;
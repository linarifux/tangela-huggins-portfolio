import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCheck, FiMic, FiUsers, FiTrendingUp } from 'react-icons/fi';
import SEO from '../../components/layout/SEO';

const Services = () => {
  return (
    <div className="bg-brand-white min-h-screen pt-32 pb-20 px-6 lg:px-20">
      
      <SEO 
        title="Keynotes & Coaching" 
        description="Explore keynote speaking, executive coaching, and corporate workshops designed to drive performance and resilience."
      />

      {/* 1. HERO SECTION */}
      <section className="max-w-5xl mx-auto mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Our Expertise</h2>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-black leading-tight mb-8">
            Transforming potential into <br />
            <span className="italic text-gray-500">peak performance.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            From high-energy keynotes to intimate executive coaching, we provide the tools, strategies, and inspiration needed to navigate change and drive growth.
          </p>
        </motion.div>
      </section>

      {/* 2. KEYNOTE SPEAKING (Image Right) */}
      <ServiceSection 
        title="Keynote Speaking"
        subtitle="For Conferences & Corporate Events"
        desc="Tangela commands the stage with a unique blend of corporate savvy and raw, authentic storytelling. Her keynotes are designed not just to inspire, but to ignite immediate action."
        features={[
          "Customized to your event theme",
          "Actionable 'Grean Light Go' takeaways",
          "High-energy, interactive delivery",
          "Post-event resource guides"
        ]}
        icon={<FiMic />}
        img="https://images.unsplash.com/photo-1475721027760-f75cf6912151?q=80&w=2070&auto=format&fit=crop"
        reversed={false}
      />

      {/* 3. EXECUTIVE COACHING (Image Left) */}
      <ServiceSection 
        title="Executive Coaching"
        subtitle="1:1 Strategic Mentorship"
        desc="Leadership is lonely. Tangela acts as a strategic partner for C-Suite executives and emerging leaders, helping them identify blind spots, navigate transitions, and lead with empathy and authority."
        features={[
          "Bi-weekly strategic sessions",
          "Personalized growth roadmap",
          "On-call crisis support",
          "360-degree leadership assessment"
        ]}
        icon={<FiTrendingUp />}
        img="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
        reversed={true}
      />

      {/* 4. CORPORATE WORKSHOPS (Image Right) */}
      <ServiceSection 
        title="Corporate Workshops"
        subtitle="Interactive Team Building"
        desc="Move beyond standard training. Our workshops break down silos, foster emotional intelligence, and teach the 'Bloom Anyway' methodology to help teams thrive in high-pressure environments."
        features={[
          "Half-day or Full-day formats",
          "Interactive breakout sessions",
          "Team alignment exercises",
          "Focus on Conflict Resolution & Resilience"
        ]}
        icon={<FiUsers />}
        img="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
        reversed={false}
      />

      {/* 5. PROCESS SECTION */}
      <section className="bg-gray-50 rounded-3xl p-12 md:p-20 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold mb-4">How We Work</h2>
          <p className="text-gray-500">A seamless process from inquiry to impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProcessStep 
            number="01" 
            title="Discovery" 
            desc="We start with a consultation to understand your organization's specific challenges, goals, and audience dynamics." 
          />
          <ProcessStep 
            number="02" 
            title="Design" 
            desc="Tangela curates a bespoke experience—whether a speech or curriculum—tailored to drive the specific outcomes you need." 
          />
          <ProcessStep 
            number="03" 
            title="Delivery" 
            desc="We execute with precision and energy, followed by a debrief to measure impact and discuss next steps." 
          />
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/contact"
            className="bg-brand-black text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Start the Conversation <FiArrowUpRight />
          </Link>
        </div>
      </section>

    </div>
  );
};

// --- Helper Components ---

const ServiceSection = ({ title, subtitle, desc, features, icon, img, reversed }) => (
  <motion.section 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 mb-32 items-center`}
  >
    {/* Text Side */}
    <div className="lg:w-1/2">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-brand-black mb-6">
        {icon}
      </div>
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">{subtitle}</h3>
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{title}</h2>
      <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
        {desc}
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-10">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3 text-gray-700">
            <div className="min-w-[20px] text-brand-black"><FiCheck /></div>
            <span className="text-sm uppercase tracking-wider">{feature}</span>
          </div>
        ))}
      </div>

      <Link 
        to="/contact"
        className="text-brand-black border-b border-black pb-1 text-sm uppercase tracking-widest font-bold hover:text-gray-500 hover:border-gray-500 transition-colors inline-flex items-center gap-2"
      >
        Book This Service <FiArrowUpRight />
      </Link>
    </div>

    {/* Image Side */}
    <div className="lg:w-1/2 w-full">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative group">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
      </div>
    </div>
  </motion.section>
);

const ProcessStep = ({ number, title, desc }) => (
  <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
    <span className="text-6xl font-serif font-bold text-gray-100 mb-4 block">{number}</span>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">
      {desc}
    </p>
  </div>
);

export default Services;
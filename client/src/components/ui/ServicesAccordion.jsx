import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi'; // Arrow icon

const services = [
  {
    id: "01",
    title: "Keynote Speaking",
    category: "Speaker",
    description: "Empowering audiences with actionable insights on resilience, leadership, and personal transformation. Perfect for corporate events, conferences, and seminars.",
    img: "https://images.unsplash.com/photo-1475721027760-f75cf6912151?q=80&w=2070&auto=format&fit=crop" // Placeholder: Microphone/Stage
  },
  {
    id: "02",
    title: "Executive Coaching",
    category: "Coach",
    description: "One-on-one strategic guidance to help leaders and entrepreneurs navigate career transitions, overcome blocks, and unlock their highest potential.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" // Placeholder: Meeting
  },
  {
    id: "03",
    title: "Workshops",
    category: "Training",
    description: "Interactive 'Grean Light Go' workshops designed to build team cohesion, emotional intelligence, and actionable growth strategies for organizations.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" // Placeholder: Workshop/Group
  },
  {
    id: "04",
    title: "Books & Media",
    category: "Author",
    description: "Explore Tangela's best-selling works including 'Grean Light Go to Meditation' and other digital resources for self-paced transformation.",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop" // Placeholder: Books
  },
];

const ServicesAccordion = () => {
  const [active, setActive] = useState(0);

  return (
    <section id='services' className="bg-brand-black text-white py-20 lg:py-32 px-4 lg:px-20 overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/20 pb-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">What I Do</h2>
          <p className="text-4xl md:text-5xl font-serif leading-tight">
            Transforming potential into <span className="italic text-gray-400">performance</span>.
          </p>
        </div>
        <div className="mt-8 md:mt-0">
           <button className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-400 transition-colors">
             View All Services <FiArrowUpRight />
           </button>
        </div>
      </div>

      {/* Accordion Container */}
      <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px] w-full">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            layout
            onClick={() => setActive(index)}
            onHoverStart={() => setActive(index)}
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out group ${
              active === index ? 'lg:flex-[3]' : 'lg:flex-[1]'
            } h-[300px] lg:h-full`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
              
              {/* Top: ID and Category */}
              <div className="flex justify-between items-start">
                <span className={`text-xl font-bold border rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md ${active === index ? 'bg-white text-black border-white' : 'border-white/30 text-white'}`}>
                  {service.id}
                </span>
                <span className="text-xs uppercase tracking-widest border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">
                  {service.category}
                </span>
              </div>

              {/* Bottom: Title & Description */}
              <div>
                <motion.h3 
                  layout="position"
                  className={`text-2xl md:text-4xl font-serif mb-4 ${active === index ? 'text-white' : 'text-gray-300'}`}
                >
                  {service.title}
                </motion.h3>

                <AnimatePresence>
                  {active === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                        {service.description}
                      </p>
                      <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-gray-200 transition-colors">
                        Learn More <FiArrowUpRight />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default ServicesAccordion;
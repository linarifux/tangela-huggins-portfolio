import React, { useState } from 'react';
import { motion } from 'framer-motion';

const content = [
  {
    id: 0,
    title: "From Corporate to Calling",
    text: "Before the stage lights, there were spreadsheets. With a background in Accounting and Finance from Mercer University, Tangela built a successful corporate career. But her desire to empower others was stronger. She transitioned from numbers to narratives, founding 'Grean Light Go' to help others navigate their own professional and personal transformations.",
    img: "https://scontent.fdac183-1.fna.fbcdn.net/v/t39.30808-6/503874334_10236302692568152_8621278230970159716_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=d1qBJVHuD_IQ7kNvwGJ4K4j&_nc_oc=AdkdqiHokYost8mN9EsIvDdN3pCQLuyVXL7zHy-IyIz69GuSjHAhmmiuJJTLaIh6zCc&_nc_zt=23&_nc_ht=scontent.fdac183-1.fna&_nc_gid=vAXzF9zn5y9Kw1sN9fE-1A&oh=00_AfoFtAjj2-8lIzQpmVcV4gqXiEcTzxonWb966pAhvhnPqw&oe=6969B02D", 
  },
  {
    id: 1,
    title: "The Bloom Anyway Philosophy",
    text: "Tangela's journey wasn't without adversity. Drawing from her own experiences with childhood trauma, she developed the 'Bloom Anyway' methodology. Through her 501(c)(3) Transformation Foundation, she now provides the tools, strategies, and workshops needed for at-risk youth and aspiring entrepreneurs to rise above their circumstances.",
    img: "https://scontent.fdac183-1.fna.fbcdn.net/v/t39.30808-6/492419491_10235773018166623_5553866646224005407_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=qzAZz4Palu0Q7kNvwGiZROE&_nc_oc=AdlnFvSa_jsv2q1nEeyW5PCjT-9sVD_PjZf2kpES4qQkLSL4801Iv46l-OB6hWE-nGw&_nc_zt=23&_nc_ht=scontent.fdac183-1.fna&_nc_gid=7W32Rv_M98zowtc84mJoew&oh=00_Afp_bR0Gyoa2zr1_Rl-jvmgVHpcriFohFzVTMlwZLQrWrA&oe=6969B081", 
  },
  {
    id: 2,
    title: "Author & Thought Leader",
    text: "As the celebrated author of 'Grean Light Go to Meditation & Making Millions', Tangela bridges the gap between holistic health and career advancement. She isn't just a speaker; she is a mentor guiding emerging leaders worldwide to achieve their highest potential through empathy, resilience, and actionable guidance.",
    img: "https://scontent.fdac183-1.fna.fbcdn.net/v/t39.30808-6/507520371_10236479904838348_8352735799110724044_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=jFn_A92m0cYQ7kNvwHWkbQ0&_nc_oc=Adnfaa_nVwF526H4eNfP0d9vOO-1ZPfuKYSFRGbbZFONovYmpXZEN5FZhKWtGIv4PPo&_nc_zt=23&_nc_ht=scontent.fdac183-1.fna&_nc_gid=ZIxuN5TfDw7jEzzUZrJNlw&oh=00_AfpQwWY7ZnzsdYQm9qz_KU98E1rTtVXYzntEcyGPCnRJyg&oe=6969A97C", 
  },
];

const AboutSticky = () => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section id='about' className="relative bg-brand-white w-full px-6 lg:px-20 py-20">
      
      {/* Header Section */}
      <div className="max-w-3xl mb-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">About Tangela</h2>
        <p className="text-4xl md:text-5xl font-serif text-brand-black leading-tight">
          A journey defined by <span className="italic text-gray-700">resilience</span>, leadership, and the relentless pursuit of growth.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
        
        {/* LEFT: Scrollable Text Content */}
        <div className="flex flex-col">
          {content.map((item, index) => (
            <motion.div 
              key={item.id}
              className="min-h-[80vh] flex flex-col justify-center py-10"
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.5 }}
              onViewportEnter={() => setActiveCard(index)}
            >
              <h3 
                className={`text-3xl font-bold mb-6 transition-colors duration-500 ${
                  activeCard === index ? "text-black" : "text-gray-300"
                }`}
              >
                {item.title}
              </h3>
              <p className="text-xl text-gray-800 leading-relaxed font-light">
                {item.text}
              </p>
              
              {/* Mobile Only Image */}
              <div className="lg:hidden mt-8 w-full h-64 rounded-lg overflow-hidden shadow-lg">
                 <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>
          ))}
          
          <div className="h-[20vh]"></div>
        </div>

        {/* RIGHT: Sticky Image Container (Desktop) */}
        <div className="hidden lg:block relative">
          {/* FIX 1: Use 'items-start' and padding 'pt-32' to align it to the top */}
          <div className="sticky top-0 h-screen flex items-start justify-center pt-32 pb-20">
            {/* FIX 2: Set a large, fixed height like 'h-[70vh]' */}
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
               {content.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    // FIX 3: Add 'object-top' to ensure the top of the image is always visible
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  
                  <div className="absolute bottom-6 left-6 z-10">
                    <span className="text-8xl font-bold text-white opacity-25 font-serif">
                      0{index + 1}
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSticky;
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const Hero = () => {
  // Mouse Parallax Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // smooth spring animation for mouse movement
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    // Calculate center
    const xPos = clientX - left - width / 2;
    const yPos = clientY - top - height / 2;
    
    x.set(xPos * 0.05); // low sensitivity for subtle effect
    y.set(yPos * 0.05);
  }

  return (
    <section 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 lg:px-20 py-20"
      onMouseMove={handleMouseMove}
    >
      {/* Background Decor (Subtle 'Transformation' Text) */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[15vw] font-bold tracking-tighter text-brand-black leading-none whitespace-nowrap">
          TRANSFORMATION
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-7xl">
        
        {/* LEFT: Content */}
        <div className="flex flex-col gap-6 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold mb-2 block">
              The Transformation Workshop
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-brand-black tracking-tight leading-[1.1]">
              Tangela <br /> Huggins
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-[2px] w-24 bg-brand-black my-2"
          ></motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 max-w-lg font-light"
          >
            Speaker. Coach. Author. <br/>
            <span className="italic">Empowering you to reach your highest potential.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-4 flex gap-4"
          >
            <button className="px-8 py-4 bg-brand-black text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors duration-300">
              Book Tangela
            </button>
            <button className="px-8 py-4 border border-brand-black text-brand-black text-sm uppercase tracking-widest hover:bg-brand-black hover:text-white transition-colors duration-300">
              View Works
            </button>
          </motion.div>
        </div>

        {/* RIGHT: Interactive Image */}
        <div className="relative h-[600px] w-full flex items-center justify-center">
          <motion.div 
            style={{ x: mouseX, y: mouseY }}
            className="relative w-full h-full max-w-[500px] max-h-[600px]"
          >
             {/* Abstract Shape Background */}
             <div className="absolute inset-0 bg-gray-100 rotate-3 scale-95 z-0"></div>
             
             {/* Main Image Container */}
             <div className="relative w-full h-full overflow-hidden z-10 bg-gray-200">
               {/* Placeholder for Tangela's Image */}
               <img 
                 src="https://scontent.fdac183-1.fna.fbcdn.net/v/t39.30808-6/506117004_10236456239166721_7577556203421876386_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=XOWbNeCq0q4Q7kNvwHX2GAO&_nc_oc=Adl92ewwtOIvDG7iuVi854KfZSu5DYiVPPnumRyY6tPA3evL9YQe05OV_q33OnVMQko&_nc_zt=23&_nc_ht=scontent.fdac183-1.fna&_nc_gid=La5Ok603HLAaXfAsYrh1-g&oh=00_Afq7vrA4V5GW1rMD06h-LqEVZHVRYe6o1rU4Lv-Id4ph4g&oe=69699079" 
                 alt="Tangela Huggins" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out transform hover:scale-105"
               />
             </div>

             {/* Floating Badge */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="absolute -bottom-10 -left-10 bg-white p-6 shadow-xl z-20 max-w-[200px]"
             >
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Latest Book</p>
               <p className="text-lg font-serif italic leading-tight">"Grean Light Go to Meditation"</p>
             </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
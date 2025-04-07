import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HomeAbout = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const imageAnimation = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const decorativeBlockAnimation = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {  
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.7,
        delay: 0.3
      }
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-8">

        {/* Why Choose Us - Edited Section */}
        <motion.div 
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              variants={imageAnimation}
            >
              <div className="relative">
                <motion.div 
                  className="bg-blue-600 dark:bg-blue-700 absolute -top-4 -left-4 w-24 h-24 rounded-tl-lg z-0"
                  variants={decorativeBlockAnimation}
                ></motion.div>
                <motion.div 
                  className="relative z-10 rounded-lg overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <Image
                      src="/train.jpg"
                      alt="Epimech Engineering Team"
                      width={800}
                      height={500}
                      className="w-full object-cover"
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="bg-blue-600 dark:bg-blue-700 absolute -bottom-4 -right-4 w-24 h-24 rounded-br-lg z-0"
                  variants={decorativeBlockAnimation}
                ></motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="md:w-1/2"
              variants={fadeIn}
            >
              <motion.h3 
                className="text-7xl font-semibold mb-12 text-gray-800 dark:text-white uppercase about-title"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                Why Choose <span className="text-blue-600 dark:text-blue-400">Epimech</span>
              </motion.h3>

              <motion.div 
                className="space-y-4 mb-6"
                variants={staggerChildren}
              >
                <motion.div 
                  className="flex items-start"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800 dark:text-white">Trusted Industry Experience</h4>
                    <p className="text-gray-600 dark:text-gray-400">With over 25 years of hands-on manufacturing experience, we've built a strong reputation for delivering dependable mechanical parts backed by deep industry knowledge.</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800 dark:text-white">Fast Turnaround Time</h4>
                    <p className="text-gray-600 dark:text-gray-400">Our in-stock inventory for fast-moving parts helps clients avoid unnecessary delays and costly downtime.</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800 dark:text-white">Reliable Customer Service</h4>
                    <p className="text-gray-600 dark:text-gray-400">We support our clients with clear communication, dependable delivery, and fair pricing—locally and internationally.</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.p 
                className="text-gray-700 dark:text-gray-300 mb-6 italic border-l-4 border-blue-600 dark:border-blue-500 pl-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                At Epimech, we don't just manufacture parts—we help keep engines running, fleets moving, and businesses operating without interruption.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <Link href="/about" className="mt-8 inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-3 px-6 rounded-md transition-colors duration-300">
                  Learn More About Us
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Mission */}
        <motion.div 
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div 
              className="md:w-1/3"
              variants={fadeIn}
            >
              <motion.h6 
                className="text-5xl font-semibold mb-6 mission-title dark:text-white"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                OUR&nbsp;
                <span className='text-blue-600 dark:text-blue-400'>
                  MISSION
                </span>
              </motion.h6>
              
              <motion.h3 
                className="text-3xl font-bold mb-6 text-gray-800 dark:text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Engineering Reliability That Keeps the World Moving
              </motion.h3>

              <motion.div 
                className="relative h-[390px] w-full md:max-h-full mt-6 md:mt-0"
                variants={imageAnimation}
              >
                <Image
                  src="/mission.webp"
                  alt="Epimech Mission"
                  fill
                  className="object-cover rounded-lg mt-4 "
                />
              </motion.div>
            </motion.div>

            <div className="md:w-2/3">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={staggerChildren}
              >
                <motion.div 
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-semibold mb-3 text-gray-800 dark:text-white title">Quality Assurance</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    We maintain the highest standards of manufacturing and testing, ensuring every part
                    meets or exceeds OEM specifications for reliability in critical applications.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-semibold mb-3 text-gray-800 dark:text-white title">Engineering Innovation</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our R&D team continually develops improvements to standard components,
                    incorporating advanced materials and design techniques to extend service life.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-semibold mb-3 text-gray-800 dark:text-white title">Rapid Response</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    We understand that downtime is costly. Our global support network and
                    strategic inventory positioning ensures fast delivery when and where it's needed.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-semibold mb-3 text-gray-800 dark:text-white title">Expert Support</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our engineering team provides comprehensive technical support, from
                    installation guidance to troubleshooting and optimization recommendations.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HomeAbout;
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ChevronLeft, ChevronRight, Users, Building, Quote } from 'lucide-react';

const CustomerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25
      }
    }
  };

  const slideIn = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "James Wilson",
      position: "Operations Director",
      company: "Northern Rail Systems",
      image: "/train.jpg", // Replace with customer image
      content: "Epimech has been our trusted partner for over 8 years. Their components have proven to be exceptionally reliable even in the most demanding conditions. What really sets them apart is their willingness to work with us on custom solutions for our unique challenges.",
      rating: 5,
      industry: "Railway Transportation"
    },
    {
      id: 2,
      name: "Sarah Chen",
      position: "Chief Technical Officer",
      company: "GreenPower Innovations",
      image: "/mission.webp", // Replace with customer image
      content: "We approached Epimech with a complex engineering challenge for our renewable energy systems. Not only did they deliver components that exceeded our specifications, but they also suggested design improvements that significantly enhanced efficiency. Their engineering team's knowledge is truly impressive.",
      rating: 5,
      industry: "Energy Generation"
    },
    {
      id: 3,
      name: "Robert Patel",
      position: "Supply Chain Manager",
      company: "Midwest Manufacturing",
      image: "/mission.webp", // Replace with customer image
      content: "What impresses me most about Epimech is their consistency. In the five years we've worked with them, they've maintained impeccable quality standards and on-time delivery, even during supply chain disruptions. Their precision components are crucial to our production line efficiency.",
      rating: 5,
      industry: "Industrial Manufacturing"
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      position: "Engineering Lead",
      company: "AutoTech Solutions",
      image: "/train.jpg", // Replace with customer image
      content: "Epimech's ability to balance quality, cost, and innovation is unmatched in the industry. They've become an extension of our design team, offering valuable insights during development. The components they manufacture for our autonomous systems are critical to our success.",
      rating: 5,
      industry: "Automotive Technology"
    }
  ];

  // Case studies data
  const caseStudies = [
    {
      id: 1,
      title: "Custom Braking Systems for High-Speed Rail",
      client: "European Transit Authority",
      description: "Developed specialized braking components that reduced maintenance requirements by 40% while improving safety performance under extreme conditions.",
      image: "/train.jpg", // Replace with case study image
      results: ["40% reduction in maintenance frequency", "28% improvement in braking efficiency", "Zero failures after 2.5 million operational hours"]
    },
    {
      id: 2,
      title: "Precision Gearbox for Wind Turbine Applications",
      client: "GreenPower Innovations",
      description: "Designed and manufactured a custom gearbox solution that significantly extended the operational life of offshore wind turbines in harsh maritime environments.",
      image: "/mission.webp", // Replace with case study image
      results: ["35% increase in operational lifespan", "22% improvement in energy transfer efficiency", "Successful deployment in 87 offshore turbines"]
    },
    {
      id: 3,
      title: "Lightweight Components for Electric Vehicles",
      client: "NextGen Automotive",
      description: "Developed innovative lightweight yet durable components that helped reduce overall vehicle weight while maintaining structural integrity and safety standards.",
      image: "/train.jpg", // Replace with case study image
      results: ["18% weight reduction in key drivetrain components", "Extended battery range by 8%", "Passed all safety and durability tests with exceptional ratings"]
    }
  ];

  // Industry sectors data
  const sectors = [
    {
      name: "Railway Transportation",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7H6a2 2 0 00-2 2v9a1 1 0 001 1h1m8-10l-2-2m0 0l-2 2m2-2v10" />
      </svg>,
      count: 42
    },
    {
      name: "Renewable Energy",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
      count: 35
    },
    {
      name: "Industrial Manufacturing",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>,
      count: 28
    },
    {
      name: "Automotive",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17H4a2 2 0 01-2-2v-4a2 2 0 012-2h16a2 2 0 012 2v4a2 2 0 01-2 2h-1m-6 0v1a3 3 0 01-6 0v-1m6 0H9" />
      </svg>,
      count: 23
    },
    {
      name: "Maritime & Shipping",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>,
      count: 17
    }
  ];

  // Navigation handlers for testimonial carousel
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-white dark:bg-color-gray-900 transition-colors duration-300">
      {/* Hero Section with Black/Blue Gradient */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-blue-900 to-color-blue-600 dark:from-black dark:via-blue-900 dark:to-blue-700 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-25"></div>
        
        {/* Floating elements for visual interest */}
        <motion.div 
          className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full blur-md"
          animate={{ 
            y: [0, -20, 0], 
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-40 right-40 w-24 h-24 bg-color-blue-400/10 rounded-full blur-md"
          animate={{ 
            y: [0, 30, 0], 
            opacity: [0.6, 0.9, 0.6] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        ></motion.div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.h1 
            className="text-white text-5xl md:text-7xl font-bold text-center mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our <span className="text-color-blue-300">Customers</span>
          </motion.h1>
          <motion.p 
            className="text-color-gray-100 text-xl max-w-3xl text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Building partnerships and delivering exceptional results for over 20 years
          </motion.p>
          <motion.div 
            className="flex items-center text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Customers</span>
          </motion.div>
        </div>
      </div>

      {/* Customer Stats Section */}
      <section className="py-20 -mt-20 relative z-10 mt-0">
        <section className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="bg-white dark:bg-color-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <motion.div 
                className="p-6 rounded-xl"
                variants={fadeIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="h-20 w-20 bg-color-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <Building className="h-10 w-10 text-color-blue-600 dark:text-color-blue-400" />
                </div>
                <h3 className="text-4xl font-bold text-color-gray-900 dark:text-white mb-2">145+</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">Active Clients</p>
              </motion.div>

              <motion.div 
                className="p-6 rounded-xl"
                variants={fadeIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="h-20 w-20 bg-color-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-color-blue-600 dark:text-color-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-color-gray-900 dark:text-white mb-2">98%</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">Customer Satisfaction</p>
              </motion.div>

              <motion.div 
                className="p-6 rounded-xl"
                variants={fadeIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="h-20 w-20 bg-color-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-color-blue-600 dark:text-color-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-color-gray-900 dark:text-white mb-2">12</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">Countries Served</p>
              </motion.div>

              <motion.div 
                className="p-6 rounded-xl"
                variants={fadeIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="h-20 w-20 bg-color-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-color-blue-600 dark:text-color-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-color-gray-900 dark:text-white mb-2">8.2 yrs</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">Average Partnership Length</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Featured Testimonials */}
          <motion.div
            className="mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
          >
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-blue-50 dark:bg-blue-900/20 px-6 py-2 rounded-full mb-4">
                <span className="text-color-blue-600 dark:text-color-blue-400 font-medium">What Our Clients Say</span>
              </span>
            </motion.div>
            
            <motion.h2
              className="text-7xl font-bold mb-16 text-center text-color-gray-800 dark:text-white title"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Customer <span className="text-color-blue-600 dark:text-color-blue-400">Testimonials</span>
            </motion.h2>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-color-gray-800">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5 relative h-64 md:h-auto">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-10">
                      <p className="text-color-blue-300 mb-2">{testimonials[currentTestimonial].industry}</p>
                      <h3 className="text-white text-2xl font-bold mb-1">{testimonials[currentTestimonial].name}</h3>
                      <p className="text-gray-300 text-sm">{testimonials[currentTestimonial].position}</p>
                      <p className="text-gray-300 text-sm">{testimonials[currentTestimonial].company}</p>
                    </div>
                  </div>
                  <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="flex mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <div className="relative">
                        <Quote className="h-10 w-10 text-blue-200 dark:text-blue-900 absolute -top-4 -left-4 opacity-40" />
                        <p className="text-xl text-gray-700 dark:text-gray-300 relative z-10 pl-3">
                          {testimonials[currentTestimonial].content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Navigation */}
              <div className="flex justify-center mt-8 gap-4">
                <motion.button
                  onClick={prevTestimonial}
                  className="bg-white dark:bg-color-gray-800 p-3 rounded-full shadow-lg border border-color-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="h-6 w-6 text-color-blue-600 dark:text-color-blue-400" />
                </motion.button>
                <motion.button
                  onClick={nextTestimonial}
                  className="bg-white dark:bg-color-gray-800 p-3 rounded-full shadow-lg border border-color-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="h-6 w-6 text-color-blue-600 dark:text-color-blue-400" />
                </motion.button>
              </div>
              
              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-4 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? "bg-color-blue-600 dark:bg-color-blue-400"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Industry Sectors We Serve */}
          <motion.div
            className="mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
          >
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-blue-50 dark:bg-blue-900/20 px-6 py-2 rounded-full mb-4">
                <span className="text-color-blue-600 dark:text-color-blue-400 font-medium">Our Reach</span>
              </span>
            </motion.div>
            
            <motion.h2
              className="text-7xl font-bold mb-16 text-center text-color-gray-800 dark:text-white title"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Industries <span className="text-color-blue-600 dark:text-color-blue-400">We Serve</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {sectors.map((sector, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-color-gray-800 p-6 rounded-xl shadow-lg border border-color-gray-100 dark:border-gray-700 text-center"
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="h-16 w-16 bg-color-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {sector.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-color-gray-800 dark:text-white">{sector.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{sector.count} clients</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        
        </section>
      </section>
    </div>
  );
}



export default CustomerTestimonials
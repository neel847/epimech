"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Linkedin,
  Mail,
  Phone,
  Award,
  Users,
  Briefcase,
  Clock,
  ExternalLink,
  ChevronRight,
  Globe,
  Globe2,
} from "lucide-react";

const TeamMember = ({
  name,
  title,
  imageSrc,
  bio,
  credentials,
  contact,
  delay = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col bg-white dark:bg-color-gray-800/80 rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-square overflow-hidden">
        <Image
          src={imageSrc}
          alt={`${name} - ${title}`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 w-full p-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white">{name}</h3>
          <p className="text-color-blue-300 font-medium mt-1">{title}</p>

          <div className="flex mt-4 space-x-2">
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                className="group"
                aria-label={`${name}'s LinkedIn`}
              >
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full group-hover:bg-color-blue-600 transition-colors">
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="group"
                aria-label={`Email ${name}`}
              >
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full group-hover:bg-color-blue-600 transition-colors">
                  <Mail className="h-4 w-4 text-white" />
                </div>
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="group"
                aria-label={`Call ${name}`}
              >
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full group-hover:bg-color-blue-600 transition-colors">
                  <Phone className="h-4 w-4 text-white" />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
          {isExpanded ? bio : `${bio.substring(0, 120)}...`}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-color-blue-600 dark:text-color-blue-400 flex items-center text-sm font-medium"
        >
          {isExpanded ? "Show less" : "Read more"}
          <ChevronRight
            className={`h-4 w-4 ml-1 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>

        {credentials && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start">
              <div className="mr-3 mt-1 flex-shrink-0 bg-color-blue-100 dark:bg-blue-800 p-1.5 rounded-full">
                <ExternalLink className="h-4 w-4 text-color-blue-600 dark:text-color-blue-300" />
              </div>
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                {credentials}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const About = () => {
  // Animation variants with improved timings
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const imageAnimation = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const slideIn = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const teamMembers = [
    {
      name: "Neel Patel",
      title: "Chief Executive Officer",
      imageSrc: "/ceo.jpg",
      bio: "With over 30 years of engineering experience, Michael has guided Epimech's growth from a local supplier to an international industry leader. His background in mechanical engineering and executive leadership at major manufacturing firms has shaped our strategic vision and commitment to technical excellence. Michael is known for his forward-thinking approach to industrial challenges and his ability to bring together world-class talent.",
      credentials:
        "Michael holds a Master's in Mechanical Engineering from the University of Toronto and serves on the board of the Canadian Engineering Standards Association.",
      contact: {
        linkedin: "https://linkedin.com/in/michael-harrington",
        email: "michael@epimech.com",
        phone: "+16479754891",
      },
    },
    {
      name: "Samantha Chen",
      title: "Director of Engineering",
      imageSrc: "/md.jpg",
      bio: "Samantha leads our engineering division with passion and precision. Her innovative approach to complex mechanical challenges has resulted in numerous patented designs and manufacturing efficiencies that set Epimech apart from competitors. Before joining our team, Samantha worked at leading aerospace firms where she developed expertise in high-performance materials and precision engineering.",
      credentials:
        "Samantha earned her Ph.D. in Mechanical Systems Engineering from McGill University and is a frequent keynote speaker at international engineering forums.",
      contact: {
        linkedin: "https://linkedin.com/in/samantha-chen",
        email: "samantha@epimech.com",
        phone: "+16479754892",
      },
    },
  ];

  return (
    <div className="w-full bg-gray-50 dark:bg-color-gray-900 transition-colors duration-300">
      <div className="flex justify-center py-6">
        <span className="bg-blue-100 dark:bg-blue-900/20 px-10 py-2 rounded-full">
          <span className="text-color-blue-600 dark:text-color-blue-400 font-medium">
            Overview
          </span>
        </span>
      </div>

      {/* Who We Are Section - Enhanced */}
      <section className="pb-20 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="bg-indigo-50/50 dark:bg-color-gray-800 rounded-2xl shadow-md p-8 md:p-12 mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
          >
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <motion.div
                className="lg:w-1/2 order-2 lg:order-1"
                variants={fadeIn}
              >
                {/* <motion.div
                  className="inline-block bg-blue-50 dark:bg-blue-900/20 px-6 py-2 rounded-full mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <span className="text-color-blue-600 dark:text-color-blue-400 font-medium">Our Story</span>
                </motion.div> */}

                <motion.h2
                  className="text-4xl md:text-5xl lg:text-7xl title font-bold mb-8 text-black dark:text-color-blue-400 uppercase"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  Who We{" "}
                  <span className="text-color-blue-600 dark:text-white">
                    Are
                  </span>
                </motion.h2>

                <motion.div
                  className="space-y-6 text-gray-700 dark:text-gray-300"
                  variants={staggerChildren}
                >
                  <motion.p variants={fadeIn} className="text-lg text-justify">
                    At Epimech, we are a dedicated manufacturer of high-quality
                    replacement parts for EMD 567, EMD 645, and EMD 710 engines,
                    proudly serving both the locomotive and marine sectors. With
                    a strong focus on precision engineering and dependable
                    performance, we provide OEM-quality components that are
                    competitively priced and backed by reliability.
                  </motion.p>

                  <motion.p variants={fadeIn} className="text-lg text-justify">
                    As manufacturers, we combine technical know-how with modern
                    manufacturing practices to deliver consistent, durable, and
                    performance-driven parts. Our in-house capabilities also
                    allow us to offer customized solutions tailored to meet
                    specific customer needs and operational requirements.
                  </motion.p>

                  <motion.p variants={fadeIn} className="text-lg text-justify">
                    Flexibility and quality are at the heart of our approach.
                    Whether it's standard parts or specialized components,
                    Epimech ensures every product meets exacting
                    standards—because we understand how critical your equipment
                    is to your business.
                  </motion.p>
                  <motion.p variants={fadeIn} className="text-lg text-justify">
                    At Epimech, we don’t just supply parts—we build lasting
                    partnerships based on trust, quality, and commitment to your
                    success.{" "}
                  </motion.p>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12"
                  variants={staggerChildren}
                >
                  <motion.div
                    className="text-center"
                    variants={fadeIn}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className="bg-color-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Award className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400" />
                    </div>
                    <h4 className="font-bold text-color-gray-900 dark:text-white text-xl">
                      20+
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Years Experience
                    </p>
                  </motion.div>

                  <motion.div
                    className="text-center"
                    variants={fadeIn}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className="bg-color-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Briefcase className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400" />
                    </div>
                    <h4 className="font-bold text-color-gray-900 dark:text-white text-xl">
                      100+
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Custom Solutions
                    </p>
                  </motion.div>

                  <motion.div
                    className="text-center"
                    variants={fadeIn}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className="bg-color-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Globe2 className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400" />
                    </div>
                    <h4 className="font-bold text-color-gray-900 dark:text-white text-xl">
                      15+
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Countries
                    </p>
                  </motion.div>

                  <motion.div
                    className="text-center"
                    variants={fadeIn}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className="bg-color-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Clock className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400" />
                    </div>
                    <h4 className="font-bold text-color-gray-900 dark:text-white text-xl">
                      24/7
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Support Available
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="lg:w-1/2 order-1 lg:order-2"
                variants={imageAnimation}
              >
                <div className="relative">
                  <div className="z-10 rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src="/train1.jpg"
                      alt="Epimech Facility"
                      width={800}
                      height={600}
                      className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Our Values Section - Enhanced */}
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
              <span className="inline-block bg-blue-100 dark:bg-blue-900/20 px-6 py-2 rounded-full mb-4">
                <span className="text-color-blue-600 dark:text-color-blue-400 font-medium">
                  Our Core Principles
                </span>
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-16 text-center title text-color-gray-800 dark:text-white uppercase"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Our{" "}
              <span className="text-color-blue-600 dark:text-color-blue-400">
                Values
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                className="bg-white dark:bg-color-gray-800 p-8 rounded-xl shadow-lg border border-indigo-400 dark:border-indigo-200 relative overflow-hidden"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full"></div>
                <div className="h-16 w-16 bg-color-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 shadow-md relative z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-color-gray-800 dark:text-white relative z-10">
                  Excellence
                </h3>
                <p className="text-gray-600 dark:text-gray-400 relative z-10">
                  We pursue excellence in everything we do, from engineering
                  precision to customer service, aiming to exceed expectations
                  at every touchpoint.
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-color-gray-800 p-8 rounded-xl shadow-lg border border-indigo-400 dark:border-indigo-200 relative overflow-hidden"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full"></div>
                <div className="h-16 w-16 bg-color-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 shadow-md relative z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-color-gray-800 dark:text-white relative z-10">
                  Innovation
                </h3>
                <p className="text-gray-600 dark:text-gray-400 relative z-10">
                  We continuously seek new approaches and solutions, embracing
                  advanced technologies to solve complex engineering challenges.
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-color-gray-800 p-8 rounded-xl shadow-lg border border-indigo-400 dark:border-indigo-200 relative overflow-hidden"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full"></div>
                <div className="h-16 w-16 bg-color-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 shadow-md relative z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-color-gray-800 dark:text-white relative z-10">
                  Integrity
                </h3>
                <p className="text-gray-600 dark:text-gray-400 relative z-10">
                  We operate with transparency and honesty, building trust
                  through ethical business practices and reliable partnerships.
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-color-gray-800  p-8 rounded-xl shadow-lg border border-indigo-400 dark:border-indigo-200 relative overflow-hidden"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full"></div>
                <div className="h-16 w-16 bg-color-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 shadow-md relative z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-color-blue-600 dark:text-color-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-color-gray-800 dark:text-white relative z-10">
                  Responsibility
                </h3>
                <p className="text-gray-600 dark:text-gray-400 relative z-10">
                  We embrace our responsibility to employees, clients, and the
                  environment, ensuring sustainable practices throughout our
                  operations.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Leadership Section - Integrated */}
          {/* <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="mb-24"
          >
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-blue-50 dark:bg-blue-900/20 px-6 py-2 rounded-full mb-4">
                <span className="text-color-blue-600 dark:text-color-blue-400 font-medium">Meet Our Team</span>
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-center title text-color-gray-800 dark:text-white uppercase"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Our <span className="text-color-blue-600 dark:text-color-blue-400">Leadership</span>
            </motion.h2>
            
            <motion.p 
              className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our executive team brings decades of industry experience and a passion for engineering excellence to every project we undertake.
            </motion.p>

            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8"
            >
              {teamMembers.map((member, index) => (
                <TeamMember 
                  key={member.name}
                  {...member}
                  delay={index * 0.1}
                />
              ))}
            </motion.div>
          </motion.div> */}

          {/* CTA Section */}
          <motion.div
            className="bg-gradient-to-r from-color-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-700 rounded-2xl p-8 md:p-12 overflow-hidden relative mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-indigo-500 rounded-full opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 dark:bg-indigo-500 rounded-full opacity-30 transform translate-x-1/2 translate-y-1/2"></div>

            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 dark:bg-indigo-500 rounded-full opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 dark:bg-indigo-500 rounded-full opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Project?
              </h3>
              <p className="text-color-gray-200 mb-6">
                Contact us today to discuss how we can help you achieve your
                engineering goals.
              </p>
              <Link
                href="/contact"
                className="bg-white text-color-blue-600 dark:bg-blue-700 dark:text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

"use client";
import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import emailjs from "@emailjs/browser"; // ⬅️ Import EmailJS
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    hasError: false,
    message: "",
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, hasError: false });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Unknown error");

      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        hasError: false,
        message: data.message,
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        hasError: true,
        message: err.message,
      });
    }
  };

  return (
    <div className="bg-gray-50 transition-colors p-4 sm:p-10 duration-300 dark:bg-color-gray-900">
      <div className="flex justify-center">
        <div className="max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="title mt-3 text-gray-900 dark:text-white uppercase text-5xl font-bold mb-4 md:mb-6 tracking-tight"
          >
            Let's{" "}
            <span className="text-blue-600 dark:text-blue-400">Connect</span>
          </motion.h1>

          {/* Contact Section */}
          <div className=" mx-auto py-16 -mt-10 flex justify-between relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-color-gray-800 rounded-xl shadow-xl p-8 h-full transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl border border-color-gray-100 dark:border-color-gray-800">
                  <h2 className="title text-4xl font-bold text-black dark:text-white mb-6 border-b border-color-gray-200 dark:border-color-gray-800 pb-4 uppercase">
                    Get In{" "}
                    <span className="text-color-blue-600 dark:text-color-blue-400">
                      Touch
                    </span>
                  </h2>

                  {/* <p className="text-gray-600 dark:text-gray-400 mb-8">
                Have questions or need assistance? Our team of experts is ready to help you find the perfect engineering solutions for your needs.
              </p> */}

                  {/* Contact Cards with Hover Effects */}
                  <div className="space-y-6 contact-headers">
                    <div className="bg-gray-50 dark:bg-color-gray-900 p-6 rounded-lg flex transform transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-color-gray-100 dark:border-color-gray-800">
                      <div className="bg-color-blue-100 dark:bg-blue-900/30 p-3 rounded-full self-start">
                        <Mail className="h-6 w-6 text-color-blue-600 dark:text-color-blue-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg text-black dark:text-white ">
                          Email Us
                        </h3>
                        <a
                          href="mailto:sales@epimech.com"
                          className="mt-1 text-color-blue-600 dark:text-color-blue-400 hover:underline block transition-colors"
                        >
                          sales@epimech.com
                        </a>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-color-gray-900 p-6 rounded-lg flex transform transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-color-gray-100 dark:border-color-gray-800">
                      <div className="bg-color-blue-100 dark:bg-blue-900/30 p-3 rounded-full self-start">
                        <Phone className="h-6 w-6 text-color-blue-600 dark:text-color-blue-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-color-gray-900 dark:text-white">
                          Call Us
                        </h3>
                        <a
                          href="tel:+917777992562"
                          className="mt-1 text-color-blue-600 dark:text-color-blue-400 hover:underline block transition-colors"
                        >
                          +91 77779 92562
                        </a>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-color-gray-900 p-6 rounded-lg flex transform transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-color-gray-100 dark:border-color-gray-800">
                      <div className="bg-color-blue-100 dark:bg-blue-900/30 p-3 rounded-full self-start">
                        <MapPin className="h-6 w-6 text-color-blue-600 dark:text-color-blue-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-color-gray-900 dark:text-white">
                          Visit Us
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          B/178,Swarnim Industrial Park,   Phase -2 Bakrol to Dhamatvan Road, Bakrol Bujirang,Ahmedabad,Gujrat,382430
                        </p>
                        <a
                          href="https://www.google.com/maps/place/BILESHWAR+INDUSTRIAL+ESTATE,+A+-+161,+opp.+GVMM,+nr.+Sardar+Patel+Ring+Road,+G+V+M+M,+Odhav+Industrial+Estate,+Odhav,+Ahmedabad,+Kathwada,+Gujarat+382415,+India/@23.0272939,72.6760416,17z/data=!3m1!4b1!4m6!3m5!1s0x395e87a76a6bb035:0x92f2242669432d09!8m2!3d23.0272939!4d72.6786219!16s%2Fg%2F11fwtchwgt?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-color-blue-600 dark:text-color-blue-400 text-sm font-medium hover:underline inline-flex items-center"
                        >
                          View on map
                          <svg
                            className="ml-1 w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-color-gray-900 p-6 rounded-lg flex transform transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-color-gray-100 dark:border-color-gray-800">
                      <div className="bg-color-blue-100 dark:bg-blue-900/30 p-3 rounded-full self-start">
                        <Clock className="h-6 w-6 text-color-blue-600 dark:text-color-blue-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-color-gray-900 dark:text-white">
                          Working Hours
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          Mon - Sat: 9 AM - 5 PM
                        </p>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          Sun: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-color-gray-800 rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl border border-color-gray-100 dark:border-color-gray-800">
                  <h2 className="text-4xl font-bold dark:text-white mb-2 text-black title uppercase ">
                    Send Us a{" "}
                    <span className="text-color-blue-600 dark:text-color-blue-400">
                      Message
                    </span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>

                  {formStatus.isSubmitted && !formStatus.hasError && (
                    <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-color-blue-300 p-4 rounded-lg flex items-start border border-color-blue-100 dark:border-blue-800">
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{formStatus.message}</p>
                        <p className="mt-1 text-sm">We'll be in touch soon.</p>
                      </div>
                    </div>
                  )}

                  {formStatus.hasError && (
                    <div className="mb-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg flex items-start">
                      <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">
                          There was an error submitting your form.
                        </p>
                        <p className="mt-1 text-sm">
                          Please try again or contact us directly.
                        </p>
                      </div>
                    </div>
                  )}

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 contact-headers">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                        >
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-color-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-color-gray-900 text-color-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-color-blue-400 transition-all"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-color-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-color-gray-900 text-color-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-color-blue-400 transition-all"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 contact-headers">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-color-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-color-gray-900 text-color-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-color-blue-400 transition-all"
                          placeholder="john.doe@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-color-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-color-gray-900 text-color-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-color-blue-400 transition-all"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="contact-headers">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-color-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-color-gray-900 text-color-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-color-blue-400 transition-all resize-none"
                        placeholder="Please provide details about your inquiry..."
                        required
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={formStatus.isSubmitting}
                        className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-color-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {formStatus.isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                  <div className="mt-8 pt-6 border-t border-color-gray-200 dark:border-color-gray-800">
                    <h3 className="text-3xl font-bold text-black dark:text-white mb-8 title uppercase">
                      Connect With{" "}
                      <span className="text-color-blue-600 dark:text-color-blue-400">
                        Us
                      </span>
                    </h3>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="bg-color-gray-100 dark:bg-color-gray-900 hover:bg-color-blue-100 dark:hover:bg-blue-900/20 p-3 rounded-full transition-colors border border-color-gray-200 dark:border-gray-700"
                      >
                        <svg
                          className="h-5 w-5 text-color-blue-600 dark:text-color-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="bg-color-gray-100 dark:bg-color-gray-900 hover:bg-color-blue-100 dark:hover:bg-blue-900/20 p-3 rounded-full transition-colors border border-color-gray-200 dark:border-gray-700"
                      >
                        <svg
                          className="h-5 w-5 text-color-blue-600 dark:text-color-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="bg-color-gray-100 dark:bg-color-gray-900 hover:bg-color-blue-100 dark:hover:bg-blue-900/20 p-3 rounded-full transition-colors border border-color-gray-200 dark:border-gray-700"
                      >
                        <svg
                          className="h-5 w-5 text-color-blue-600 dark:text-color-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="bg-color-gray-100 dark:bg-color-gray-900 hover:bg-color-blue-100 dark:hover:bg-blue-900/20 p-3 rounded-full transition-colors border border-color-gray-200 dark:border-gray-700"
                      >
                        <svg
                          className="h-5 w-5 text-color-blue-600 dark:text-color-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Map Section */}
      {/* Map Section */}
      <div className="relative h-96 bg-gray-300 dark:bg-gray-700">
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9040794097077!2d72.6760416115092!3d23.027293879083604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87a76a6bb035%3A0x92f2242669432d09!2sBILESHWAR%20INDUSTRIAL%20ESTATE%2C%20A%20-%20161%2C%20opp.%20GVMM%2C%20nr.%20Sardar%20Patel%20Ring%20Road%2C%20G%20V%20M%20M%2C%20Odhav%20Industrial%20Estate%2C%20Odhav%2C%20Ahmedabad%2C%20Kathwada%2C%20Gujarat%20382415%2C%20India!5e0!3m2!1sen!2sca!4v1746298593413!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Add custom styles */}
      <style jsx>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientAnimation 15s ease infinite;
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .bg-grid-pattern {
          background-image: url("/path/to/grid-pattern.svg"); /* Replace with actual path to your grid pattern SVG */
          background-size: 100px 100px;
        }
      `}</style>
    </div>
  );
};

export default Contact;

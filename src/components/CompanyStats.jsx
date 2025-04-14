import React from 'react';
import { motion } from 'framer-motion';
import { Box, Globe, Rocket, Users } from 'lucide-react';
import Link from 'next/link';

const CompanyStats = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const statsData = [
        {
            title: "Countries Served",
            description: "Delivering high-quality parts to clients across the globe",
            value: "15+",
            icon: <Globe className='h-5 w-5' />,
            color: "bg-blue-600 dark:bg-blue-700"
        },
        {
            title: "Range of Products",
            description: "Precision-engineered components for diverse industries.",
            value: "70+",
            icon: <Box className='h-5 w-5' />,
            color: "bg-blue-600 dark:bg-blue-700"
        },
        {
            title: "Satisfied Clients",
            description: "Built lasting partnerships across marine and rail sectors.",
            value: "200+",
            icon: <Users className='h-5 w-5' />,
            color: "bg-blue-600 dark:bg-blue-700"
        },
        {
            title: "Industry Experience",
            description: "Over two decades of expertise in engineering solutions.",
            value: "20+ Years",
            icon: <Rocket className='h-5 w-5' />,
            color: "bg-blue-600 dark:bg-blue-700"
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">

            <div className='container mx-auto px-6 lg:px-8'>
                <h3 className='px-6 pb-8 title font-bold dark:text-white text-black text-7xl'><span className='text-blue-600 dark:text-blue-400'>EPIMECH</span> AT A GLANCE</h3>

                <section className="w-full bg-gray-100 dark:bg-gray-800 py-16 mx-auto rounded-lg">
                    <div className="container mx-auto px-6 lg:px-8">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={containerVariants}
                        >
                            {statsData.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="relative border-l-2 dark:border-blue-500 border-blue-200 pl-6 pr-4 p-6"
                                    variants={itemVariants}
                                >
                                    <div className='lg:min-h-[130px]'>
                                        <h4 className="text-2xl flex items-center lg:text-[20px] gap-x-2 font-bold text-black dark:text-white mb-2 ">
                                            {stat.icon}       {stat.title}
                                        </h4>
                                        <p className="dark:text-blue-200 text-blue-400 text-md mb-4 min-h-20">
                                            {stat.description}
                                        </p>
                                    </div>
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 + (index * 0.1), duration: 0.7 }}
                                        viewport={{ once: true }}
                                    >
                                        <h2 className="dark:text-white text-black text-5xl md:text-6xl lg:text-7xl font-bold title">
                                            {stat.value}
                                        </h2>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>
   

            <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className='py-32 container mx-auto px-6 lg:px-8'>
                    <motion.div
                        className='bg-[#eee] p-8 md:p-12 rounded-xl dark:bg-gray-800 flex justify-between items-center flex-col md:flex-row gap-8 shadow-lg relative overflow-hidden'
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Decorative element */}
                        <motion.div
                            className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 dark:bg-blue-400/10 rounded-full -mr-10 -mt-10"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            viewport={{ once: true }}
                        />

                        <motion.div
                            className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/10 dark:bg-blue-400/10 rounded-full -ml-8 -mb-8"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            viewport={{ once: true }}
                        />

                        <div className="relative z-10">
                            <motion.h3
                                className='title font-bold dark:text-white text-black text-4xl md:text-5xl'
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                ANY <span className='text-blue-600 dark:text-blue-400'> INQUIRIES?</span>
                            </motion.h3>

                            <motion.p
                                className='py-4 text-gray-600 text-md dark:text-gray-300 max-w-lg'
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                Contact us for any inquiries or to learn more about our products and services.
                                Our team of experts is ready to provide you with the information you need.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <Link href="/contact">
                                <motion.p
                                    className="inline-flex items-center bg-blue-600 text-xl hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-4 px-8 rounded-md transition-colors duration-300 text-center shadow-md"
                                    whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                                    whileTap={{ y: 0 }}
                                >
                                    Contact Us
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.p>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CompanyStats;
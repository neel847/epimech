import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomeAbout = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Who We Are */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-blue-600 dark:bg-blue-700 absolute -top-4 -left-4 w-24 h-24 rounded-tl-lg z-0"></div>
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="https://picsum.photos/900/500" 
                    alt="Epimech Engineering Team" 
                    width={800}
                    height={90}
                    className="w-full object-fit"
                  />
                </div>
                <div className="bg-blue-600 dark:bg-blue-700 absolute -bottom-4 -right-4 w-24 h-24 rounded-br-lg z-0"></div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h6 className="text-blue-600 dark:text-blue-400 font-semibold mb-2">WHO WE ARE</h6>
              <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Precision Engineering for Maritime Excellence</h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Since 1998, Epimech has been at the forefront of delivering OEM-quality engineering solutions 
                for maritime and industrial applications. With manufacturing facilities strategically located 
                in key shipping hubs, we provide critical parts and systems that keep vessels operational and 
                machinery running efficiently.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Our team of experienced engineers combines traditional craftsmanship with cutting-edge 
                technology to ensure every component meets or exceeds original specifications. From specialized 
                water pumps to complete hydraulic systems, we deliver reliability where it matters most.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-lg font-semibold text-gray-800 dark:text-white">ISO 9001 Certified</span>
                    <span className="text-gray-600 dark:text-gray-400">Quality Management</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-lg font-semibold text-gray-800 dark:text-white">25+ Years</span>
                    <span className="text-gray-600 dark:text-gray-400">Industry Experience</span>
                  </div>
                </div>
              </div>
              
              <Link href="/about" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-3 px-6 rounded-md transition-colors duration-300">
                Learn More About Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Our Projects */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h6 className="text-blue-600 dark:text-blue-400 font-semibold mb-2">OUR PROJECTS</h6>
            <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Engineering Solutions That Make an Impact</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From emergency repairs to long-term maintenance contracts, we've completed projects for some of the 
              world's most demanding maritime and industrial environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-60">
                <Image 
                  src="https://picsum.photos/800/400"
                  alt="Emergency Propulsion System Replacement" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 right-0 bg-blue-600 dark:bg-blue-700 text-white py-1 px-3 text-sm">
                  Maritime
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">Emergency Propulsion System Replacement</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Complete replacement of main propulsion components for a 240m container vessel, minimizing downtime 
                  and restoring full operational capability.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Rotterdam, Netherlands</span>
                  <Link href="/projects/propulsion-replacement" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-60">
                <Image 
                  src="https://picsum.photos/810/410" 
                  alt="Hydraulic System Modernization" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 right-0 bg-blue-600 dark:bg-blue-700 text-white py-1 px-3 text-sm">
                  Industrial
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">Hydraulic System Modernization</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Comprehensive upgrade of hydraulic control systems for a major petroleum refinery, 
                  improving efficiency and reducing maintenance needs.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Houston, USA</span>
                  <Link href="/projects/hydraulic-modernization" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-60">
                <Image 
                  src="https://picsum.photos/820/410"
                  alt="Cooling System Engineering" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 right-0 bg-blue-600 dark:bg-blue-700 text-white py-1 px-3 text-sm">
                  Maritime
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">Cooling System Engineering</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Custom design and implementation of advanced cooling systems for a fleet of 
                  LNG carriers, enhancing performance and reliability.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Singapore</span>
                  <Link href="/projects/cooling-systems" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/projects" className="inline-flex items-center border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white dark:hover:text-white py-3 px-6 rounded-md transition-colors duration-300">
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Our Mission */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h6 className="text-blue-600 dark:text-blue-400 font-semibold mb-2">OUR MISSION</h6>
              <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Engineering Reliability That Keeps the World Moving</h3>
              
              <div className="relative h-full max-h-64 md:max-h-full mt-6 md:mt-0">
                <Image 
                  src="https://picsum.photos/1200/1200" 
                  alt="Epimech Mission" 
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Quality Assurance</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    We maintain the highest standards of manufacturing and testing, ensuring every part 
                    meets or exceeds OEM specifications for reliability in critical applications.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Engineering Innovation</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our R&D team continually develops improvements to standard components, 
                    incorporating advanced materials and design techniques to extend service life.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Rapid Response</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    We understand that downtime is costly. Our global support network and 
                    strategic inventory positioning ensures fast delivery when and where it's needed.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Expert Support</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our engineering team provides comprehensive technical support, from 
                    installation guidance to troubleshooting and optimization recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HomeAbout;
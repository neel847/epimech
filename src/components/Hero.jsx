import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const Hero = () => {
    return (
        <div className="relative w-full h-64 md:h-96 lg:h-screen max-h-screen mx-auto">
            <Image 
                src="/hero_banner.png" 
                alt="Epimech Engineering Solutions" 
                fill
                priority
                className="object-cover" 
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center bg-gradient-to-r from-black to-transparent px-6 md:px-12 lg:px-24">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-left max-w-3xl leading-tight">
                    We are <span className="text-blue-400">Epimech</span>
                </h1>
                <h3 className="text-2xl md:text-3xl lg:text-3xl font-semibold mt-4 text-left max-w-2xl leading-tight text-white">
                Delivering <span>OEM-Quality Parts </span> Keep Ships Sailing & Engines Running
                </h3>
                <p className="text-white text-base md:text-lg lg:text-xl mt-4 text-left max-w-2xl">
                    Innovative solutions for modern engineering challenges, specializing in automation, precision manufacturing, and sustainable design.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                        Our Products
                    </Link>
                    <Link href="/contact" className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                        Contact Us
                    </Link>
                </div>
                <div className="mt-12 hidden md:flex gap-8">
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="ml-2 text-white">ISO 9001 Certified</span>
                    </div>
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="ml-2 text-white">20+ Years Experience</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
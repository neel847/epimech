import Image from 'next/image';
import React from 'react';

const Hero = () => {
    return (
        <div className="relative w-full h-[600px] mx-auto]">
            <Image 
                src="/hero_banner.png" 
                alt="Hero Image" 
                fill
                priority
                className="object-cover" 
            />
            <div className="absolute inset-0 flex flex-col items-left justify-center bg-black bg-opacity-50 pl-24">
                <h1 className="text-white text-4xl md:text-6xl font-bold text-left">
                    We are Epimech
                </h1>
                <p className="text-white text-lg md:text-xl mt-4 text-left max-w-3xl">
                    Innovative solutions for modern engineering challenges
                </p>
            </div>
        </div>
    );
};

export default Hero;
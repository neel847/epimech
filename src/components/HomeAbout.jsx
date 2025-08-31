import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "antd";

const HomeAbout = () => {
  const router = useRouter();

  // Animation variants
  const allImages = [
    {
      id: 1,
      name: "WATER PUMP ASSEMBLY LEFT 710",
      number: "40004234 / 9530407",
      image: "https://epimech.s3.us-east-2.amazonaws.com/IMG_8692.jpeg",
      url: "http://localhost:3000/products/40004234",
    },
    {
      id: 2,
      image: "https://epimech.s3.us-east-2.amazonaws.com/3.jpg",
      name: "BUSHING Water pump",
      number: "8052224",
      url: "http://localhost:3000/products/8052224",
    },
    {
      id: 3,
      image: "https://epimech.s3.us-east-2.amazonaws.com/5.jpg",
      name: "Support Water pump housing",
      number: "8329900 / 4008904",
      url: "http://localhost:3000/products/4008904",
    },
    {
      id: 4,
      image: "https://epimech.s3.us-east-2.amazonaws.com/6.jpg",
      name: "IMPELLER WATER PUMP BIG 710",
      number: "8248248",
      url: "http://localhost:3000/products/8248248",
    },
    {
      id: 5,
      image: "https://epimech.s3.us-east-2.amazonaws.com/IMG_8526.jpg",
      name: "IMPELLER WATER PUMP SMALL 645",
      number: "8060008",
      url: "http://localhost:3000/products/8060008",
    },
    {
      id: 6,
      image: "https://epimech.s3.us-east-2.amazonaws.com/7.jpg",
      name: "GEAR DRIVE 37 TOOTH",
      number: "8042976",
      url: "http://localhost:3000/products/8042976",
    },
    {
      id: 7,
      image: "https://epimech.s3.us-east-2.amazonaws.com/8.jpg",
      name: "SHAFT WATER PUMP",
      number: "8052246 / 40089902",
      url: "http://localhost:3000/products/8052246",
    },
    {
      id: 8,
      image:
        "https://epimech.s3.us-east-2.amazonaws.com/otherParts/otherparts_1.jpg",
      name: "ELBOW WATER OUT LET",
      number: "8414444",
      url: "http://localhost:3000/products/8414444",
    },
    {
      id: 9,
      image:
        "https://epimech.s3.us-east-2.amazonaws.com/otherParts/otherparts_5.jpg",
      name: "TEST VALVE ASSEMBLY CYLINDER",
      number: "40035242 / 8048880",
      url: "http://localhost:3000/products/40035242",
    },
    {
      id: 10,
      image:
        "https://epimech.s3.us-east-2.amazonaws.com/otherParts/otherparts_10.jpg",
      name: "BEARING ROTAR PLATE",
      number: "8206553",
      url: "http://localhost:3000/products/8206553",
    },
    {
      id: 11,
      image:
        "https://epimech.s3.us-east-2.amazonaws.com/otherParts/otherparts_11.jpg",
      name: "BEARING ASSEMBLY BLOWER",
      number: "8369675",
      url: "http://localhost:3000/products/8369675",
    },
    {
      id: 12,
      image:
        "https://epimech.s3.us-east-2.amazonaws.com/otherParts/otherparts_18.jpg",
      name: "COLLAR THRUST",
      number: "8028419",
      url: "http://localhost:3000/products/8028419",
    },
    {
      id: 13,
      image:
        "https://epimech.s3.us-east-2.amazonaws.com/otherParts/otherparts_20.jpg",
      name: "COLLAR THRUST",
      number: "8028006",
      url: "http://localhost:3000/products/8028006",
    },
    {
      id: 14,
      image:
        "https://epimech.s3.us-east-2.amazonaws.com/otherParts/otherparts_48.jpg",
      name: "RING CYLINDER HEAD SEAT VITON 645",
      number: "9581924 / 8419438",
      url: "http://localhost:3000/products/9581924",
    },
    {
      id: 15,
      image:
        "https://epimech.s3.us-east-2.amazonaws.com/otherParts/otherparts_14.jpg",
      name: "BUSHING OIL PUMP",
      number: "8039667",
      url: "http://localhost:3000/products/8039667",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageAnimation = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const decorativeBlockAnimation = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.3,
      },
    },
  };

  return (
    <section className="pt-20 bg-gray-50 dark:bg-color-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Why Choose Us - Edited Section */}
        <motion.div
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div className="lg:w-3/5" variants={imageAnimation}>
              <div className="relative">
                <motion.div
                  className="bg-color-blue-600 dark:bg-blue-700 absolute -top-3 -left-4 w-24 h-24 rounded-tl-lg z-0"
                  variants={decorativeBlockAnimation}
                ></motion.div>
                <motion.div
                  className="relative z-10 rounded-lg overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    {/* <Image
                      src="/train.jpg"
                      alt="Epimech Engineering Team"
                      width={800}
                      height={500}
                      className="w-full object-cover"
                    /> */}
                    {/* Loader logic for iframe */}
                    <div className="relative w-full h-full">
                      {/* Loader Spinner - perfectly centered */}
                      <div
                        id="iframe-loader"
                        className="absolute inset-0 flex items-center justify-center bg-white dark:bg-color-gray-900 z-20"
                      >
                        <div className="w-16 h-16 border-[6px] border-color-blue-600 border-t-transparent rounded-full animate-spin" />
                      </div>
                      <iframe
                        width={890}
                        height={500}
                        className="max-w-full rounded-lg h-[200px] sm:h-[300px] lg:h-[500px]"
                        src="https://www.youtube.com/embed/L55Ep7Woc7w?start=350"
                        title="Epimech Overview Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => {
                          const loader =
                            document.getElementById("iframe-loader");
                          if (loader) loader.style.display = "none";
                        }}
                      ></iframe>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-color-blue-600 dark:bg-blue-700 absolute -bottom-3 -right-4 w-24 h-24 rounded-br-lg z-0"
                  variants={decorativeBlockAnimation}
                ></motion.div>
              </div>
            </motion.div>

            <motion.div className="lg:w-2/5" variants={fadeIn}>
              <motion.h3
                className="text-5xl font-semibold mb-8 title text-color-gray-800 dark:text-white uppercase about-title"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                Why Choose{" "}
                <span className="text-color-blue-600 title dark:text-color-blue-400">
                  Epimech
                </span>
              </motion.h3>

              <motion.div className="mb-6" variants={staggerChildren}>
                <motion.div
                  className="flex items-start"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-10 w-10 rounded-full bg-color-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-color-blue-600 dark:text-color-blue-400"
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
                  <div>
                    <h4 className="font-medium text-lg text-color-gray-800 dark:text-white">
                      Trusted Industry Experience
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      With over 20 years of hands-on manufacturing experience,
                      we've built a strong reputation for delivering dependable
                      mechanical parts backed by deep industry knowledge.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-10 w-10 rounded-full bg-color-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-color-blue-600 dark:text-color-blue-400"
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
                  <div>
                    <h4 className="font-medium text-lg text-color-gray-800 dark:text-white">
                      Fast Turnaround Time
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our in-stock inventory for fast-moving parts helps clients
                      avoid unnecessary delays and costly downtime.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-10 w-10 rounded-full bg-color-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-color-blue-600 dark:text-color-blue-400"
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
                  <div>
                    <h4 className="font-medium text-lg text-color-gray-800 dark:text-white">
                      Reliable Customer Service
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      We support our clients with clear communication,
                      dependable delivery, and fair pricing—locally and
                      internationally.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.p
                className="text-gray-700 dark:text-gray-300 mb-6 italic border-l-4 border-color-blue-600 dark:border-blue-500 pl-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                At Epimech, we don't just manufacture parts—we help keep engines
                running, fleets moving, and businesses operating without
                interruption.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/about"
                  className="mt-8 inline-flex items-center bg-color-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-3 px-6 rounded-md transition-colors duration-300"
                >
                  Learn More About Us
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-8 w-full">
          <div className="mb-8">
            <motion.h2
              className="text-5xl title font-bold mb-5 text-black dark:text-white uppercase"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Top Selling{" "}
              <span className="text-color-blue-600 dark:text-color-blue-400">
                Products
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="text-xl"
            >
              Top-Quality Parts For EMD 710 , EMD 645 and ALCO
            </motion.p>
          </div>
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[
              Autoplay({ delay: 2000 }), // ✅ auto-scroll every 2s
            ]}
            className="w-full bg-gray-200 dark:bg-color-gray-800 p-5 rounded-lg"
          >
            <CarouselContent
              onWheel={(e) => {
                const container = e.currentTarget;
                if (e.deltaY < 0) {
                  container.scrollLeft -= 100;
                } else {
                  container.scrollLeft += 100;
                }
              }}
            >
              {allImages.map((data, index) => (
                <CarouselItem
                  key={index}
                  className="!basis-full sm:!basis-1/2 md:!basis-1/3 lg:!basis-1/4 xl:!basis-1/5"
                >
                  <div className="p-2 border-2 border-gray-400 dark:border-indigo-300 rounded-lg">
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="relative flex items-center justify-center bg-white group rounded-lg overflow-hidden"
                    >
                      <Image
                        src={data.image}
                        alt={`EMD Water Pump ${index + 1}`}
                        width={300}
                        height={300}
                        className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-contain rounded-lg"
                      />

                      {/* ✅ Overlay appears on hover */}
                      <div className="justify-center absolute inset-0 bg-black/80 text-white flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="max-w-[90%] flex items-center flex-col text-center justify-center gap-2">
                          <h3 className="text-lg leading-none font-semibold">
                            {data.name}
                          </h3>
                          <p className="text-sm">{data.number}</p>
                          <Button
                            onClick={() => {
                              if (data.url) router.push(data.url);
                            }}
                          >
                            View Product Details
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          className="bg-gray-200 dark:bg-color-gray-800 rounded-2xl p-4 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="flex flex-col  lg:flex-row gap-12">
            <motion.div className="lg:w-1/3" variants={fadeIn}>
              <motion.h6
                className="text-5xl font-semibold mb-6 mission-title dark:text-white"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                OUR{" "}
                <span className="text-color-blue-600 dark:text-color-blue-400">
                  MISSION
                </span>
              </motion.h6>

              <motion.h3
                className="text-2xl font-bold mb-6 text-color-gray-800 dark:text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Engineering Reliability That Keeps the World Moving
              </motion.h3>

              <motion.div
                className="relative h-[350px] w-full md:max-h-full mt-6 md:mt-0"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/mission.webp"
                  alt="Epimech Mission"
                  fill
                  className="object-cover rounded-lg mt-4"
                />
              </motion.div>
            </motion.div>

            <div className="lg:w-2/3">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={staggerChildren}
              >
                <motion.div
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-12 w-12 rounded-full bg-color-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-color-blue-600 dark:text-color-blue-400"
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
                  <h4 className="text-xl font-semibold mb-3 text-color-gray-800 dark:text-white">
                    Quality Assurance
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    We maintain the highest standards of manufacturing and
                    testing, ensuring every part meets or exceeds OEM
                    specifications for reliability in critical applications.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-12 w-12 rounded-full bg-color-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-color-blue-600 dark:text-color-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-color-gray-800 dark:text-white">
                    Engineering Innovation
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our R&D team continually develops improvements to standard
                    components, incorporating advanced materials and design
                    techniques to extend service life.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-12 w-12 rounded-full bg-color-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-color-blue-600 dark:text-color-blue-400"
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
                  <h4 className="text-xl font-semibold mb-3 text-color-gray-800 dark:text-white">
                    Rapid Response
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    We understand that downtime is costly. Our global support
                    network and strategic inventory positioning ensures fast
                    delivery when and where it's needed.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-12 w-12 rounded-full bg-color-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-color-blue-600 dark:text-color-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-color-gray-800 dark:text-white">
                    Expert Support
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our engineering team provides comprehensive technical
                    support, from installation guidance to troubleshooting and
                    optimization recommendations.
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

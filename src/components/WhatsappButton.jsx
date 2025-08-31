"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function WhatsAppButton() {
  const [showHelp, setShowHelp] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-center">
      {showHelp && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-2 flex bg-white border-green-600 border-2 transition-all duration-150 p-2 rounded-full text-sm font-semibold text-green-600 dark:text-green-400 drop-shadow"
        >
          Need Help?{" "}
          <button
            onClick={() => setShowHelp(false)}
            className="w-5 h-5 rounded-full border border-green-600 justify-center items-center flex ml-2 hover:bg-white hover:text-white transition"
          >
            <X className="w-5 h-5 text-green-600" />
          </button>
        </motion.p>
      )}
      <a
        href="https://wa.me/917777992562?text=Hello%20Epimech%2C%20I%20am%20interested%20in%20your%20EMD%20Water%20Pump%20products."
        target="_blank"
        rel="noopener"
        aria-label="Chat with Epimech on WhatsApp"
      >
        <Image
          className="w-[50px] h-[50px] drop-shadow-lg cursor-pointer"
          src="https://epimech.s3.us-east-2.amazonaws.com/whatsapp-icon.png"
          alt="WhatsApp Chat Icon"
          width={50}
          height={50}
        />
      </a>
    </div>
  );
}

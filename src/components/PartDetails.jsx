"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  Image,
  Modal,
  Form,
  Input,
  Select,
  Button,
  InputNumber,
} from "antd";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleCheck,
  Clipboard,
  Copy,
  Package,
  Mail,
  Youtube,
} from "lucide-react";
import toast from "react-hot-toast";
import Head from "next/head";
const { PreviewGroup } = Image;
const { TextArea } = Input;
const { Option } = Select;

const PartDetails = ({ part, onBack }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [carouselRef, setCarouselRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isValidImage, setIsValidImage] = useState(true);
  const fallbackImage = "/fallback.png";
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Quotation modal states
  const [isQuoteModalVisible, setIsQuoteModalVisible] = useState(false);
  const [form] = Form.useForm();

  const subImages = part.subimages ? Object.values(part.subimages) : [];
  const allMedia = [
    ...(part.image ? [{ type: "image", url: part.image }] : []),
    ...(part.video ? [{ type: "video", url: part.video }] : []),
    ...(subImages.length
      ? subImages.map((url) => ({ type: "image", url }))
      : []),
  ];

  const handleImageError = () => {
    setIsValidImage(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleThumbnailClick = (index) => {
    if (carouselRef) {
      carouselRef.goTo(index);
      setActiveIndex(index);
    }
  };

  const handleCarouselChange = (current) => {
    setActiveIndex(current);
  };

  const handleCopy = (text) => {
    setCopied(true);
    setCopiedText(text);
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  // Get the first available part number for the default comment
  const getDefaultPartNumber = () => {
    const partNumbers = Object.values(part.part_number);
    const validPartNumber =
      partNumbers.find((num) => num !== "-") || "this product";
    return validPartNumber;
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    quantity: 1,
    comment: `Quote for ${getDefaultPartNumber()}`,
  });
  // Handle quotation modal
  const showQuoteModal = () => {
    // Pre-fill the comment field with the part number

    setIsQuoteModalVisible(true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Please select your country";
    }

    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = "Please enter required quantity";
    }

    return newErrors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || "";
    setFormData((prev) => ({
      ...prev,
      quantity: value,
    }));

    if (errors.quantity) {
      setErrors((prev) => ({
        ...prev,
        quantity: null,
      }));
    }
  };
  const handleSubmit = async (values) => {
    values.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/send-quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          productName: part.part_name,
          partNumber: getDefaultPartNumber(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Quotation request sent successfully!");
        setIsQuoteModalVisible(false);
        form.resetFields();
      } else {
        toast.error(data.message || "Failed to send quotation request");
      }
    } catch (error) {
      toast.error("Error sending quotation request");
      console.error("Error sending quotation:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full bg-white dark:bg-color-gray-900 transition-colors duration-300">
        {/* Hero */}
        {/* <div className="relative w-full h-[400px] overflow-hidden bg-gradient-to-r from-gray-700 via-blue-900 to-color-blue-600 dark:from-black dark:via-blue-900 dark:to-blue-700">
          <motion.div
            className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full blur-md"
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-40 w-24 h-24 bg-color-blue-400/10 rounded-full blur-md"
            animate={{ y: [0, 30, 0], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <motion.h1
              className="text-white text-5xl md:text-6xl font-bold mb-4 tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-color-blue-300">Product</span>
            </motion.h1>
            <motion.p
              className="text-color-gray-100 text-lg md:text-xl max-w-3xl mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {part.part_name}
            </motion.p>
          </div>
        </div> */}

        {/* Main Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto px-6 lg:px-8 py-6"
        >
          {/* Back to Products */}
          {/* <div className="mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-lg font-medium text-color-blue-600 dark:text-color-blue-400 hover:underline transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </button>
          </div> */}

          <div className="bg-white shadow-md dark:bg-color-gray-800 rounded-xl border border-color-gray-100 dark:border-gray-700 overflow-hidden">
            <div className=" border-color-gray-100 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="text-blue-500 p-2 rounded-md mr-2 transition duration-200 hover:bg-blue-100"
                    onClick={onBack}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                  {/* <Package className="text-blue-500 mr-3" /> */}
                  <div>
                    <h2 className="text-2xl font-bold text-color-gray-800 dark:text-white">
                      {part.part_name}
                    </h2>
                  </div>
                </div>

                {/* Request Quotation Button */}
              </div>
            </div>

            <div className="bg-indigo-100/50 border-t dark:bg-indigo-900/50 h-full p-10 rounded-b-lg flex gap-6">
              {/* Image */}
              <div className="lg:w-[40%]">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className=" overflow-hidden h-full w-full rounded-lg"
                >
                  <Carousel
                    autoplay
                    ref={setCarouselRef}
                    afterChange={handleCarouselChange}
                    className="part-details-carousel"
                    dots={false} // ✅ Hide dots
                  >
                    {allMedia.map((media, index) => (
                      <div key={index}>
                        <div className="relative flex  items-center justify-center w-full h-[440px] bg-white aspect-square">
                          {media.type === "image" ? (
                            <Image
                              src={isValidImage ? media.url : fallbackImage}
                              onError={handleImageError}
                              alt={`${part.part_name} view ${index + 1}`}
                              preview={isValidImage}
                              className="w-full h-full object-contain rounded-lg" // ✅ full image shown
                            />
                          ) : (
                            <iframe
                              className="w-full h-full rounded-lg"
                              style={{ borderRadius: "0.75rem" }}
                              src={media.url.replace("watch?v=", "embed/")}
                              title={`Video ${index + 1}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          )}
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </motion.div>

                {/* Thumbnails */}
                {/* {allMedia.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
                    {allMedia.map((media, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleThumbnailClick(idx)}
                        className={`h-16 w-16 flex-shrink-0 rounded overflow-hidden border transition-all ${
                          activeIndex === idx
                            ? "ring-2 ring-blue-500 dark:ring-color-blue-400 opacity-100"
                            : "opacity-70 hover:opacity-100 border-color-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {media.type === "image" ? (
                          <Image
                            src={isValidImage ? media.url : fallbackImage}
                            alt={`Thumbnail ${idx + 1}`}
                            preview={false}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                        ) : (
                          <div className="w-full h-full bg-black text-white flex items-center justify-center text-xs font-medium">
                            <Youtube className="w-6 h-6" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )} */}
              </div>
              <div
                className="hidden md:flex flex-col justify-center items-center"
                style={{ minHeight: "100%", height: "auto" }}
              >
                <span
                  className="w-px bg-gray-300"
                  style={{
                    height: "100%",
                    minHeight: "350px",
                    alignSelf: "stretch",
                  }}
                />
              </div>
              {/* Info */}
              <div className="lg:w-[60%] flex flex-col gap-8 justify-between">
                {/* Part Numbers */}
                <motion.div
                  initial={{ opacity: 0, y: -30, x: 30 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-700 p-6 flex gap-4 flex-col rounded-lg shadow-md"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-color-gray-800 dark:text-white">
                      {part.part_name}
                    </h2>
                    <p>
                      {Object.entries(part.part_number).map(
                        ([type, number], idx) => (
                          <div className="flex items-center gap-4">
                            <p className="text-2xl text-color-gray-800 dark:text-white font-semibold">
                              {number !== "-" ? (
                                number
                              ) : (
                                <span className="text-color-gray-800 dark:text-white">
                                  Not Available
                                </span>
                              )}
                            </p>
                            <button
                              onClick={() => handleCopy(number)}
                              className="text-blue-500 hover:text-blue-700 transition"
                            >
                              {copiedText === number && copied ? (
                                <CircleCheck className="w-5 h-5 text-green-500" />
                              ) : (
                                <Copy className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        )
                      )}
                    </p>
                  </div>
                  <div className="w-full ">
                    {allMedia.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto py-2 pl-1 scrollbar-hide">
                        {allMedia.map((media, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleThumbnailClick(idx)}
                            className={`h-16 w-16 flex-shrink-0 rounded overflow-hidden border transition-all ${
                              activeIndex === idx
                                ? "ring-2 ring-blue-500 dark:ring-color-blue-400 opacity-100"
                                : "opacity-70 hover:opacity-100 ring-2 ring-gray-200"
                            }`}
                          >
                            {media.type === "image" ? (
                              <Image
                                src={isValidImage ? media.url : fallbackImage}
                                alt={`Thumbnail ${idx + 1}`}
                                preview={false}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                              />
                            ) : (
                              <div className="w-full h-full bg-black text-white flex items-center justify-center text-xs font-medium">
                                <Youtube className="w-6 h-6" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
                <div
                  className="flex flex-col justify-center bg-gray-300 items-center"
                  style={{ width: "100%", minHeight: "1px" }}
                />

                {/* Description */}
                {part.description && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3 text-color-gray-800 dark:text-white">
                      Description
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-color-gray-900 p-4 rounded-lg leading-relaxed">
                      {part.description}
                    </p>
                  </div>
                )}

                {/* Specs */}
                {part.specifications && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3 text-color-gray-800 dark:text-white">
                      Specifications
                    </h3>
                    <ul className="list-disc list-inside bg-gray-50 dark:bg-color-gray-900 text-gray-700 dark:text-gray-300 p-4 rounded-lg space-y-1">
                      {part.specifications.map((spec, idx) => (
                        <li key={idx}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <motion.div
                  className="bg-white shadow-md dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-700 rounded-2xl p-8 overflow-hidden relative"
                  initial={{ opacity: 0, y: 30, x: 30 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  {/* Background elements */}

                  <div className="relative z-10 text-left justify-start flex-col">
                    <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                      Intreseted in this Product?
                    </h3>
                    <button
                      onClick={showQuoteModal}
                      className="flex items-center border dark:border-none dark:text-white border-color-gray-800 hover:text-white text-color-gray-800 gap-2 bg-none hover:bg-gray-600 dark:bg-blue-600 dark:hover:bg-blue-700 py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      <Mail className="w-5 h-5" />
                      Request Quotation
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quotation Modal */}
        <AnimatePresence>
          {isQuoteModalVisible && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsQuoteModalVisible(false)}
              />

              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
              >
                <div
                  className="relative w-full max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsQuoteModalVisible(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>

                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Mail className="w-5 h-5" /> Request Quotation
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block mb-1 dark:text-white">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border dark:text-white rounded-md dark:bg-gray-700 dark:border-gray-600 ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1 dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md dark:text-white dark:bg-gray-700 dark:border-gray-600 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1 dark:text-white">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md dark:text-white dark:bg-gray-700 dark:border-gray-600 ${
                          errors.country ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1 dark:text-white">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleQuantityChange}
                        className={`w-full px-3 py-2 border rounded-md dark:text-white dark:bg-gray-700 dark:border-gray-600 ${
                          errors.quantity ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.quantity && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.quantity}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1 dark:text-white">
                        Comment
                      </label>
                      <textarea
                        name="comment"
                        rows="4"
                        value={formData.comment}
                        onChange={handleChange}
                        className="w-full px-3 py-2 dark:text-white border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsQuoteModalVisible(false)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        {submitting ? "Loading..." : "Submit Request"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PartDetails;

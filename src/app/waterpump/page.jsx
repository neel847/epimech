"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Carousel, Form, Image } from 'antd';
import { Mail, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { emdParts } from '@/helper/EmdParts';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function EMDWaterPumpPage() {
  // Product images
  const [activeIndex, setActiveIndex] = useState(0);
  const [isQuoteModalVisible, setIsQuoteModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [hoveredPart, setHoveredPart] = useState(null);
  const rowRefs = useRef({});
  const tableBodyRef = useRef(null);


  // const [form] = Form.useForm();

  const carouselRef = useRef(null);
  const allImages = [
    'https://epimech.s3.us-east-2.amazonaws.com/1.jpg',
    'https://epimech.s3.us-east-2.amazonaws.com/WATER+PUMP+ASSEMBLY+LEFT+BANK_2.jpg',
    'https://epimech.s3.us-east-2.amazonaws.com/WATER+PUMP+ASSEMBLY+LEFT+BANK_1.jpg',
    '/emd-waterpump/waterpump.jpg',
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    quantity: 1,
    comment: `Quote for EMD Waterpump`
  });

  // Form state

  // Image handling functions
  const setCarouselRef = (ref) => {
    carouselRef.current = ref;
  };

  const handleCarouselChange = (current) => {
    setActiveIndex(current);
  };

  const handleThumbnailClick = (index) => {
    carouselRef.current?.goTo(index);
    setActiveIndex(index);
  };

  // Form handling functions

  const showQuoteModal = () => {
    // Pre-fill the comment field with the part number

    setIsQuoteModalVisible(true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Please select your country';
    }

    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = 'Please enter required quantity';
    }

    return newErrors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || '';
    setFormData(prev => ({
      ...prev,
      quantity: value
    }));

    if (errors.quantity) {
      setErrors(prev => ({
        ...prev,
        quantity: null
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
      const response = await fetch('/api/send-quotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productName: 'EMD Water Pump',
          partNumber: '40004234/8058624'
        }),
      });


      const data = await response.json();

      if (response.ok) {
        toast.success('Quotation request sent successfully!');
        setIsQuoteModalVisible(false);
        // form.resetFields();
      } else {
        toast.error(data.message || 'Failed to send quotation request');
      }
    } catch (error) {
      toast.error('Error sending quotation request');
      console.error('Error sending quotation:', error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen transition-colors duration-300">
      {/* Hero Section with Gradient - Made responsive */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-blue-900 to-blue-700 dark:from-black dark:via-blue-900 dark:to-blue-800"></div>
        <div className="absolute inset-0 bg-opacity-20 bg-black"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6 tracking-tight">
            EMD <span className="text-blue-300">Water Pump</span>
          </h1>
          <p className="text-gray-100 text-base sm:text-lg md:text-xl max-w-3xl text-center mb-6 md:mb-8 px-2">
            High-quality aftermarket OEM standard locomotive & marine engine parts for
            <strong className="text-blue-300"> EMD 645</strong> &
            <strong className="text-blue-300"> EMD 710</strong> engines.
          </p>
          <div className="flex items-center text-gray-300 text-sm sm:text-base">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">EMD Water Pump</span>
          </div>
        </div>
      </div>

      {/* Main Content - Added responsive padding */}
      <div className="max-w-[90%] mx-auto px-4 py-8 sm:py-12 md:py-16 sm:px-6 lg:px-8 relative z-10">
        {/* Overview Section - Improved responsiveness */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 md:mb-16 transform transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-10">
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden mb-4">
                <Carousel
                  autoplay
                  ref={setCarouselRef}
                  afterChange={handleCarouselChange}
                  className="part-details-carousel"
                >
                  {allImages.map((img, index) => (
                    <div key={index} className="relative aspect-square">
                      <div className="relative aspect-square flex items-center justify-center bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-8">
                        <Image
                          src={img}
                          alt={`EMD Water Pump ${index + 1}`}
                          width={400}
                          height={400}
                          preview={img}
                          className="max-h-60 sm:max-h-80 max-w-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleThumbnailClick(idx)}
                      className={`h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 rounded overflow-hidden border transition-all ${activeIndex === idx
                        ? 'ring-2 ring-blue-500 dark:ring-blue-400 opacity-100'
                        : 'opacity-70 hover:opacity-100 border-gray-200 dark:border-gray-700'
                        }`}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="object-cover"
                          preview={false}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4 text-base sm:text-lg mt-6 lg:mt-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 sm:mb-6 border-b border-gray-200 dark:border-gray-700 pb-3 sm:pb-4 uppercase title">
                Premium <span className="text-blue-600 dark:text-blue-400">Quality Parts</span>
              </h2>

              <p className="text-gray-700 dark:text-gray-300">
                For fully machined <strong>EMD locomotive and marine engines</strong>, we ensure top-grade materials and precision manufacturing. Our advanced production methods combine traditional engineering know-how with state-of-the-art technology to deliver maximum performance.
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                All components undergo rigorous testing for long-term reliability and ease of installation. Each product is evaluated using high-precision measuring instruments and certified by ISO/QS Indian agencies.
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                We also specialize in parts that are obsolete or out of production using reverse engineering. Leveraging CAD design, prototype testing, and precision machining, we recreate legacy parts to exact OEM specifications.
              </p>
            </div>
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-x-4'>

          {/* Exploded Diagram Section - Added responsive sizing */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 md:mb-16 transform transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl sm:text-5xl font-bold text-black dark:text-white mb-6 md:mb-8 border-b border-gray-200 dark:border-gray-700 pb-3 sm:pb-4 title uppercase">
              Technical <span className="text-blue-600 dark:text-blue-400">Diagram</span>
            </h2>

            <div className="flex justify-center mb-6 md:mb-8">
              <div className="relative w-full max-w-xl md:max-w-2xl">
                <Image
                  src="/emd-waterpump/dig.jpeg"
                  preview={false}
                  alt="Exploded Diagram"
                  className="object-contain"
                />
                {[
                  { ref: '1', top: '73.6%', left: '9.2%', width: '4%', height: '3%' },
                  { ref: '2', top: '28.5%', left: '10.5%', width: '3%', height: '3%' },
                  { ref: '3', top: '21.8%', left: '22.5%', width: '3%', height: '3%' },
                  { ref: '4', top: '26.2%', left: '14.4%', width: '3%', height: '3%' },
                  { ref: '5', top: '23.9%', left: '18.6%', width: '3%', height: '3%' },
                  { ref: '6', top: '17.2%', left: '30.5%', width: '3%', height: '3%' },
                  { ref: '7', top: '14.8%', left: '34.5%', width: '3%', height: '3%' },
                  { ref: '8', top: '10.4%', left: '42.8%', width: '3%', height: '3%' },
                  { ref: '9', top: '8.2%', left: '46.6%', width: '3%', height: '3%' },
                  { ref: '10', top: '3.7%', left: '53.8%', width: '4%', height: '3%' },
                  { ref: '11', top: '6%', left: '49.6%', width: '4%', height: '3%' },
                  { ref: '12', top: '12.6%', left: '37.7%', width: '4%', height: '3%' },
                  { ref: '13', top: '19.4%', left: '25.6%', width: '4%', height: '3%' },
                  { ref: '14', top: '3.7%', left: '83.5%', width: '4%', height: '3%' },
                  { ref: '15', top: '3.7%', left: '73.2%', width: '4%', height: '3%' },
                  { ref: '16', top: '92.3%', left: '35.2%', width: '4%', height: '3%' },
                  { ref: '17', top: '69.5%', left: '22.4%', width: '4%', height: '3%' },
                  { ref: '18', top: '63.5%', left: '33%', width: '4%', height: '3%' },
                  { ref: '19', top: '89.7%', left: '40%', width: '4%', height: '3%' },
                  { ref: '20', top: '87%', left: '44.5%', width: '4%', height: '3%' },
                  { ref: '21', top: '81.7%', left: '54%', width: '4%', height: '3%' },
                  { ref: '22', top: '84.3%', left: '49.3%', width: '4%', height: '3%' },
                  { ref: '23', top: '78.9%', left: '58.5%', width: '4%', height: '3%' },
                  { ref: '24', top: '76.5%', left: '63.6%', width: '4%', height: '3%' },
                  { ref: '25', top: '73.8%', left: '68.4%', width: '4%', height: '3%' },
                  { ref: '26', top: '71.2%', left: '73%', width: '4%', height: '3%' },
                  { ref: '27', top: '68.3%', left: '78%', width: '4%', height: '3%' },
                  { ref: '28', top: '3.8%', left: '65.5%', width: '4%', height: '3%' },
                ].map((part, idx) => (
                  <div
                    key={idx}
                    className="absolute border border-blue-500 hover:bg-blue-400/40 cursor-pointer transition-all duration-200 rounded"
                    style={{
                      top: part.top,
                      left: part.left,
                      width: part.width,
                      height: part.height,
                    }}
                    onClick={() => {
                      setHoveredPart(part.ref);
                      const targetRow = rowRefs.current[part.ref];
                      if (targetRow) {
                        targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    
                    onMouseLeave={() => setHoveredPart(null)}
                    title={`Part ${part.ref}`}
                  />
                ))}


                {/* <div className="absolute inset-0 bg-blue-600 dark:bg-blue-800 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div> */}
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-center text-base sm:text-lg mb-4">
              Exploded Diagram - Assembly 24: Water Pump
            </p>
          </div>

          {/* Parts Reference Table Section - Made responsive */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 md:mb-16 transform transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl sm:text-5xl font-bold text-black dark:text-white mb-6 md:mb-8 border-b border-gray-200 dark:border-gray-700 pb-3 sm:pb-4 title uppercase">
              Parts <span className="text-blue-600 dark:text-blue-400">Reference</span>
            </h2>

            <div className="overflow-auto max-h-[90vh] -mx-4 sm:-mx-6 md:-mx-0">
              <div className="min-w-full inline-block align-middle p-4 sm:p-0">
                <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
                  <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="p-2 sm:p-4 border border-gray-300 dark:border-gray-600">Asm-Ref No.</th>
                      <th className="p-2 sm:p-4 border border-gray-300 dark:border-gray-600">Part Number</th>
                      <th className="p-2 sm:p-4 border border-gray-300 dark:border-gray-600">Qty.</th>
                      <th className="p-2 sm:p-4 border border-gray-300 dark:border-gray-600">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto">
                    {emdParts.map((part, index) => (
                      <tr
                        key={index}
                       
                        ref={(el) => (rowRefs.current[part["Asm Ref. No."]] = el)}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${hoveredPart === part["Asm Ref. No."] ? "bg-blue-100 dark:bg-blue-900/50" : ""
                          }`}
                      >

                        <td className="p-2 sm:p-4 border border-gray-300 dark:border-gray-600">
                          {part["Asm Ref. No."]}
                        </td>
                        <td className="p-2 sm:p-4 border border-gray-300 dark:border-gray-600 font-medium">
                          {part["Part Number"]}
                        </td>
                        <td className="p-2 sm:p-4 border border-gray-300 dark:border-gray-600">
                          {part["Qty."]}
                        </td>
                        <td className="p-2 sm:p-4 border border-gray-300 dark:border-gray-600">
                          {part["Description"]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>

        {/* Features Section - Made fully responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {/* Features Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:translate-y-1">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Quality Assured</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Every part undergoes rigorous testing and inspection before shipping to ensure reliability and performance.
            </p>
          </div>

          {/* Features Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:translate-y-1">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              With our extensive inventory and efficient logistics, we ensure timely delivery to minimize downtime.
            </p>
          </div>
        </div>

        {/* Contact Section - Improved mobile layout */}


        <motion.div
          className="bg-gradient-to-r from-color-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-700 rounded-2xl p-8 md:p-12 overflow-hidden relative mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-30 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-30 transform translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Custom Engineering Solutions?
            </h3>
            <p className="text-color-gray-200 mb-6">
              Our team can develop specialized components to meet your unique needs.
            </p>
            <button
              onClick={showQuoteModal}
              href="/contact"
              className="bg-white text-color-blue-600 dark:bg-blue-700 dark:text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-color-blue-600 transition-colors"
            >
              Request a Consultation
            </button>
          </div>
        </motion.div>
      </div>
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
                >✕</button>

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
                      className={`w-full px-3 py-2 border dark:text-white rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block mb-1 dark:text-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md dark:text-white dark:bg-gray-700 dark:border-gray-600 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block mb-1 dark:text-white">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md dark:text-white dark:bg-gray-700 dark:border-gray-600 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                  </div>

                  <div>
                    <label className="block mb-1 dark:text-white">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleQuantityChange}
                      className={`w-full px-3 py-2 border rounded-md dark:text-white dark:bg-gray-700 dark:border-gray-600 ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                  </div>

                  <div>
                    <label className="block mb-1 dark:text-white">Comment</label>
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
                    >Cancel</button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >{submitting ? 'Loading...' : 'Submit Request'}</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

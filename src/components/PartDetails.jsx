'use client';
import React, { useState, useEffect } from 'react';
import { Carousel, Image, Modal, Form, Input, Select, Button, InputNumber } from 'antd';
import { motion } from 'framer-motion';
import { CircleCheck, Clipboard, Copy, Package, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
const { PreviewGroup } = Image;
const { TextArea } = Input;
const { Option } = Select;

const PartDetails = ({ part, onBack }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [carouselRef, setCarouselRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isValidImage, setIsValidImage] = useState(true);
  const fallbackImage = '/fallback.png';
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  // Quotation modal states
  const [isQuoteModalVisible, setIsQuoteModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const subImages = part.subimages ? Object.values(part.subimages) : [];
  const allImages = [part.image, ...subImages];

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
      toast.success('Copied to clipboard!');
    });
  };

  // Get the first available part number for the default comment
  const getDefaultPartNumber = () => {
    const partNumbers = Object.values(part.part_number);
    const validPartNumber = partNumbers.find(num => num !== '-') || 'this product';
    return validPartNumber;
  };

  // Handle quotation modal
  const showQuoteModal = () => {
    // Pre-fill the comment field with the part number
    form.setFieldsValue({
      comment: `Quote for ${getDefaultPartNumber()}`
    });
    setIsQuoteModalVisible(true);
  };

  const handleQuoteCancel = () => {
    setIsQuoteModalVisible(false);
  };

  const handleQuoteSubmit = async (values) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/send-quotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          productName: part.part_name,
          partNumber: getDefaultPartNumber()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Quotation request sent successfully!');
        setIsQuoteModalVisible(false);
        form.resetFields();
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
    <div className="w-full bg-white dark:bg-color-gray-900 transition-colors duration-300">
      {/* Hero */}
      <div className="relative w-full h-[400px] overflow-hidden bg-gradient-to-r from-gray-700 via-blue-900 to-color-blue-600 dark:from-black dark:via-blue-900 dark:to-blue-700">
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
      </div>

      {/* Main Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 py-16"
      >
        {/* Back to Products */}
        <div className="mb-6">
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
        </div>

        <div className="bg-white dark:bg-color-gray-800 rounded-xl border border-color-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-color-gray-100 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="text-blue-500 mr-3" />
                <h2 className="text-2xl font-bold text-color-gray-800 dark:text-white">{part.part_name}</h2>
              </div>

              {/* Request Quotation Button */}

            </div>
          </div>

          <div className="p-6 lg:flex lg:gap-8">

            {/* Image */}
            <div className="lg:w-[40%]">
              <PreviewGroup preview={{
                visible: previewVisible,
                current: previewIndex,
                onVisibleChange: (vis) => setPreviewVisible(vis),
                onChange: (current) => setPreviewIndex(current),
                imageRender: (originalNode) => {
                  return (
                    <div className="relative">
                      {originalNode}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white text-2xl bg-black/30 px-4 py-2 rounded-md backdrop-blur-sm 
                select-none font-medium tracking-wide shadow-md">
                          © Epimech
                        </span>
                      </div>
                    </div>
                  );
                }
              }}
              >
                <div className="bg-gray-50 dark:bg-color-gray-900 rounded-lg overflow-hidden mb-4">
                  <Carousel
                    autoplay
                    ref={setCarouselRef}
                    afterChange={handleCarouselChange}
                    className="part-details-carousel"
                  >
                    {allImages.map((img, index) => (
                      <div key={index}>
                        <div className="relative aspect-square flex items-center justify-center bg-white dark:bg-color-gray-900 p-8">
                          <Image
                            src={isValidImage ? img : fallbackImage}
                            onError={handleImageError}
                            alt={`${part.part_name} view ${index + 1}`}
                            preview={isValidImage}
                            className="max-h-80 max-w-full object-contain"
                          />

                          {/* Watermark */}
                          {img !== '/fallback.png' && (
                            <div className="absolute mt-12 inset-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                              <span className="text-white text-sm md:text-base bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm 
                  pointer-events-none select-none font-medium tracking-wide shadow-md
                  dark:bg-black/50">
                                {'© Epimech'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </PreviewGroup>


              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleThumbnailClick(idx)}
                      className={`h-16 w-16 flex-shrink-0 rounded overflow-hidden border transition-all ${activeIndex === idx
                        ? 'ring-2 ring-blue-500 dark:ring-color-blue-400 opacity-100'
                        : 'opacity-70 hover:opacity-100 border-color-gray-200 dark:border-gray-700'
                        }`}
                    >
                      <Image
                        src={isValidImage ? img : fallbackImage}
                        alt={`Thumbnail ${idx + 1}`}
                        preview={false}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:w-[60%] mt-8 lg:mt-0 lg:ml-6">
              {/* Part Numbers */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-color-gray-800 dark:text-white">
                  Part Numbers
                </h3>
                <div className="overflow-x-auto rounded-xl shadow-sm border border-color-gray-200 dark:border-gray-700">
                  <table className="min-w-full divide-y divide-color-gray-200 dark:divide-gray-700">
                    <thead className="bg-color-gray-100 dark:bg-color-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-base font-medium text-gray-700 dark:text-gray-300 uppercase">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-base font-medium text-gray-700 dark:text-gray-300 uppercase">
                          Part Number
                        </th>
                        <th className="px-6 py-3 text-left text-base font-medium text-gray-700 dark:text-gray-300 uppercase">

                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-color-gray-900 divide-y divide-color-gray-200 dark:divide-gray-700">
                      {Object.entries(part.part_number).map(([type, number], idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 font-medium text-color-gray-800 dark:text-color-gray-200">
                            {type}
                          </td>
                          <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-300">
                            {number !== '-' ? number : <span className="text-gray-400">Not Available</span>}
                          </td>
                          <td className='px-6 py-4'>
                            <button
                              onClick={() => handleCopy(number)}
                              className="text-blue-500 hover:text-blue-700 transition"
                            >
                              {
                                copiedText === number && copied ? (
                                  <CircleCheck className='w-5 h-5 text-green-500' />
                                ) : (
                                  <Copy className='w-5 h-5' />
                                )
                              }
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>


              {/* Description */}
              {part.description && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3 text-color-gray-800 dark:text-white">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-color-gray-900 p-4 rounded-lg leading-relaxed">
                    {part.description}
                  </p>
                </div>
              )}

              {/* Specs */}
              {part.specifications && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3 text-color-gray-800 dark:text-white">Specifications</h3>
                  <ul className="list-disc list-inside bg-gray-50 dark:bg-color-gray-900 text-gray-700 dark:text-gray-300 p-4 rounded-lg space-y-1">
                    {part.specifications.map((spec, idx) => (
                      <li key={idx}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}
              <motion.div
                className="bg-gray-100 dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-700 rounded-2xl p-12 md:p-12 overflow-hidden mt-12 relative mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                {/* Background elements */}

                <div className="relative z-10 text-left justify-start flex-col">
                  <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">Intreseted in this Product?</h3>
                  <button
                    onClick={showQuoteModal}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
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
      <Modal
        title={
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Mail className="w-5 h-5" />
            <span>Request Quotation</span>
          </div>
        }
        open={isQuoteModalVisible}
        onCancel={handleQuoteCancel}
        footer={null}
        width={600}
        className="quotation-modal"
        // Add dark mode support for the modal overlay and content
        wrapClassName="dark:ant-modal-wrap-dark"
        modalRender={(modal) => (
          <div className="dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white rounded-lg overflow-hidden">
            {modal}
          </div>
        )}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleQuoteSubmit}
          initialValues={{
            comment: `Quote for ${getDefaultPartNumber()}`
          }}
          className="dark:text-gray-100"
        >
          {/* Product Info Banner - Dark mode compatible */}
          <div className="my-6 p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 
                   dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
            <h3 className="font-medium flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Requesting quote for: <span className="font-semibold">{part.part_name}</span></span>
            </h3>
          </div>

          {/* Responsive grid for form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label={<span className="dark:text-gray-100">Name</span>}
              rules={[{ required: true, message: 'Please enter your name' }]}
              className="mb-3"
            >
              <Input
                placeholder="Enter your full name"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="dark:text-gray-100">Email</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
              className="mb-3"
            >
              <Input
                placeholder="Enter your email address"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="country"
              label={<span className="dark:text-gray-100">Country</span>}
              rules={[{ required: true, message: 'Please select your country' }]}
              className="mb-3"
            >
              <Input
                min={1}
                placeholder="Enter your country"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </Form.Item>

            <Form.Item
              name="quantity"
              label={<span className="dark:text-gray-100">Quantity</span>}
              rules={[{ required: true, message: 'Please enter required quantity' }]}
              className="mb-3"
            >
              <InputNumber
                min={1}
                placeholder="Enter quantity"
                className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="comment"
            label={<span className="dark:text-gray-100">Comment</span>}
            className="mb-6"
          >
            <TextArea
              rows={4}
              placeholder="Enter any additional information"
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </Form.Item>

          <Form.Item className="mb-0 mt-6">
            <div className="flex flex-col-reverse xs:flex-row justify-end gap-3">
              <Button
                onClick={handleQuoteCancel}
                className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting}
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Submit Request
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PartDetails;
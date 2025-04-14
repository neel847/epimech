import { ExternalLink, Mail, Linkedin, Instagram, Facebook, Clock, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                        {/* Brand Column */}
                        <div className="flex flex-col">
                            <Link href="/" className="flex items-center mb-6">
                                <Image
                                    src="/fav.png"
                                    alt="Epimech Logo"
                                    width={28}
                                    height={28}
                                    className="mr-2"
                                />
                                <span className="nav-header text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                                    Epimech
                                </span>
                            </Link>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Innovative solutions for modern engineering challenges, providing quality products and services.
                            </p>
                            <div className="flex space-x-4 mt-auto">
                                <a href="https://www.linkedin.com/company/epimech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                                    <Linkedin size={20} />
                                </a>
                                <a href="https://www.instagram.com/epimech_"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                                    <Instagram size={20} />
                                </a>
                                <a href="https://www.facebook.com/epimech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                                    <Facebook size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="lg:ml-8">
                            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Quick Links</h3>
                            <ul className="space-y-4 list-none">
                                <li>
                                    <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                                        Products
                                    </Link>
                                </li>
                               
                                <li>
                                    <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Products</h3>
                            <ul className="space-y-4 list-none">
                                {products.map((product) => {
                                    return (
                                        <Link href={product.href} key={product.name} className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center cursor-pointer'>
                                            {product.name}
                                        </Link>
                                    );
                                })}


                            </ul>
                        </div>
                        {/* Contact Information */}
                        <div>
                            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Get In Touch</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Mail className="text-gray-400 dark:text-gray-500 mt-1 mr-3" size={18} />
                                    <a href='mailto:info@epimech.com' className="text-gray-600 dark:text-gray-400">info@epimech.com</a>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="text-gray-400 dark:text-gray-500 mt-1 mr-3" size={18} />
                                    <a href='tel:+16479754891' className="text-gray-600 dark:text-gray-400">+16479754891</a>
                                </div>
                                <div className="flex items-start">
                                    <Clock className="text-gray-400 dark:text-gray-500 mt-1 mr-3" size={18} />
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-400">Monday - Saturday: 9 AM - 6 PM</p>
                                        <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                       
                    </div>
                </div>

                {/* Copyright Bar */}
                <div className="border-t border-gray-100 dark:border-gray-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            © {new Date().getFullYear()} Epimech. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

const products = [
    { name: 'Water Pumps', href: '/products' },
    { name: 'Cylinder Test Valve', href: '/products' },
    { name: 'Cylinder Head and Liner', href: '/products' },
]
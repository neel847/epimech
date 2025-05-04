'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import Loader from './Loader';

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark');

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Catalog', path: '/product-list' },
    { label: 'Contact Us', path: '/contact' }

  ];

  const handleNavigation = (path) => {
    if (pathname === path) return; // Prevent navigation if already on the same page
    setLoading(true);
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setLoading(false); // stop when path changes
  }, [pathname]);
  
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md dark:bg-color-gray-900' : 'bg-transparent dark:bg-color-gray-900'
      }`}
    >
      {loading && <Loader />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigation('/')}>
            <Image src="/fav.png" alt="Logo" width={20} height={20} className="mr-2" />
            <span className="text-2xl pr-16 nav-header font-semibold text-color-gray-900 dark:text-white uppercase">
              Epimech
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.path
                    ? 'bg-blue-50 text-blue-700 dark:bg-color-gray-800 dark:text-color-gray-200'
                    : 'text-gray-700 hover:bg-color-gray-100 dark:text-color-gray-200 dark:hover:bg-color-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Google Translate */}
            <div id="google_translate_element" className="px-2"></div>
            
            {/* Theme Toggle */}
            <button
              onClick={handleToggleTheme}
              className="px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all duration-200 dark:text-white"
            >
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleToggleTheme}
              className="px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all duration-200 dark:text-white"
            >
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md dark:text-white text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg dark:bg-color-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.path || pathname.startsWith(item.path)
                    ? 'bg-blue-50 text-blue-700 dark:bg-color-gray-800 dark:text-color-gray-200'
                    : 'text-gray-700 hover:bg-color-gray-100 dark:text-color-gray-200 dark:hover:bg-color-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

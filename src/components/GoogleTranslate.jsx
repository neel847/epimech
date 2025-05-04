// src/components/GoogleTranslate.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

export default function GoogleTranslate() {
  const [langs, setLangs] = useState([]);
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Get stored language preference or default to English
  useEffect(() => {
    try {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      };
      const storedLang = getCookie('googtrans');
      if (storedLang) {
        const langParts = storedLang.split('/');
        if (langParts.length > 2) setCurrentLang(langParts[2]);
      }
    } catch (error) {
      console.error('Error reading language cookie:', error);
    }
  }, []);

  // Fetch available languages from Google API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch('/api/languages')
      .then((res) => res.ok ? res.json() : Promise.reject(`API ${res.status}`))
      .then(({ languages, error }) => {
        if (!isMounted) return;
        if (error) throw new Error(error);
        const hasEnglish = languages.some(l => l.language === 'en');
        const allLangs = hasEnglish ? languages : [{ language: 'en', name: 'English' }, ...languages];
        allLangs.sort((a, b) => a.name.localeCompare(b.name));
        setLangs(allLangs);
        setLoading(false);
      })
      .catch((e) => {
        if (!isMounted) return;
        console.error('Failed to load languages:', e);
        setLangs([{ language: 'en', name: 'English' }]);
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize Google Translate script
  useEffect(() => {
    let scriptEl;
    if (document.querySelector('script[src*="translate_a/element.js"]')) return;
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en', autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
      }
    };
    scriptEl = document.createElement('script');
    scriptEl.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    scriptEl.async = true;
    document.body.appendChild(scriptEl);
    return () => {
      scriptEl?.remove();
      delete window.googleTranslateElementInit;
    };
  }, []);

  // Change language via cookie and reload
  const changeLanguage = (langCode) => {
    if (langCode === currentLang) return setIsOpen(false);
    const domain = window.location.hostname;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970; path=/; domain=${domain}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970; path=/`;
    if (langCode !== 'en') {
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain}`;
      document.cookie = `googtrans=/en/${langCode}; path=/`;
    }
    setCurrentLang(langCode);
    setIsOpen(false);
    window.location.reload();
  };

  const currentName = langs.find(l => l.language === currentLang)?.name || 'English';

  return (
    <div className="relative notranslate w-full sm:w-auto" ref={dropdownRef}>
      {/* Hidden translate element */}
      <div id="google_translate_element" className="hidden" />

      {/* Selector button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="notranslate w-[30vw] sm:w-full flex items-center justify-between px-4 py-2
                   bg-blue-600 hover:bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-700
                   text-white font-medium rounded-md shadow-md transition-colors"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className="flex items-center max-w-[20vw]">
          <Globe className="h-4 w-4 mr-2 hidden sm:flex" strokeWidth={2} />
          <span className="truncate text-sm text-ellipsis">{currentName}</span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 flex-shrink-0 transition-transform duration-200 ml-2" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="notranslate absolute z-50 mt-1 left-0 sm:right-0 w-[30vw] sm:w-48 max-h-60 sm:max-h-96 overflow-y-auto bg-white rounded-md shadow-lg py-1 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:border-none">
          {langs.length === 0 ? (
            <div className="text-center py-2 text-gray-500">Loading...</div>
          ) : (
            langs.map(lang => (
              <button
                key={lang.language}
                onClick={() => changeLanguage(lang.language)}
                className={`notranslate block w-full text-left px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:text-black
                   ${currentLang === lang.language ? 'bg-blue-50 text-blue-600 font-medium dark:text-black' : ''}`}
              >
                {lang.name}
              </button>
            ))
          )}
        </div>
      )}

      {/* Prevent Google from translating this UI */}
      {/* <style jsx global>{`
        .notranslate { translate: no; }
        .goog-te-banner-frame, .skiptranslate { display: none !important; }
        body { top: 0px !important; }
      `}</style> */}
    </div>
  );
}

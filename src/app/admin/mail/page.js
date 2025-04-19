'use client';
import { useState, useEffect } from 'react';
import InquiryList from '@/components/InquiryList';

export default function MailAdminPage() {
  const [tab, setTab] = useState('CONTACT-US');
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      const filtered = data.filter((i) => i.type === tab);
      setInquiries(filtered);
    };
    fetchInquiries();
  }, [tab]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mail Inbox</h1>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setTab('CONTACT-US')} className={`px-4 py-2 rounded ${tab === 'CONTACT-US' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Contact Us
        </button>
        <button onClick={() => setTab('PRODUCT')} className={`px-4 py-2 rounded ${tab === 'PRODUCT' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Product Quotation
        </button>
      </div>
      <InquiryList inquiries={inquiries} />
    </div>
  );
}

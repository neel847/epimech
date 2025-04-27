'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import PartDetails from '@/components/PartDetails';
import { Spin } from 'antd';
import Head from 'next/head';

export default function PartSlugPage(props) {
  const router = useRouter();
  const [selectedPart, setSelectedPart] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = use(props.params); // ✅ unwrap promise safely

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const res = await fetch(`/api/part/${slug}`);
        if (!res.ok) {
          router.push('/products');
          return;
        }
        const data = await res.json();
        setSelectedPart(data);
      } catch (error) {
        console.error('Failed to fetch part', error);
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [slug]);

  if (loading || !selectedPart) return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-color-gray-900">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Spin size="large" className="text-color-blue-500" />
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      </div>      
    </div>
  );

  return (
    <>
        <meta
          name="description"
          content={`Buy ${selectedPart?.part_name} with part number ${Object.values(selectedPart?.part_number).join(', ')}. High quality locomotive parts available.`}
        />
        <meta
          property="og:image"
          content={`${selectedPart?.part_image}`}
        />
    <div>
      <PartDetails part={selectedPart} onBack={() => router.push('/products')} />
    </div>
    </>
  );
}

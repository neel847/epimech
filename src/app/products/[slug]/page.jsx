
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

  const { slug } = use(props.params);

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

  // Get part numbers for meta description
  const partNumbers = Object.values(selectedPart?.part_number || {}).join(', ');
  
  return (
    <>
      <Head>
        <title>{`${selectedPart.part_name} | EMD Locomotive Parts - Epimech`}</title>
        <meta
          name="description"
          content={`Buy ${selectedPart.part_name} (Part Numbers: ${partNumbers}) - High quality EMD locomotive engine spare part. Manufacturer and supplier of EMD 710 and EMD 645 parts.`}
        />
        <meta name="keywords" content={`${selectedPart.part_name}, ${partNumbers}, EMD parts, locomotive parts, EMD 710, EMD 645, ${selectedPart.main_product || ''}`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={`${selectedPart.part_name} | EMD Locomotive Parts`} />
        <meta property="og:description" content={`Buy ${selectedPart.part_name} (Part Numbers: ${partNumbers}) - High quality EMD locomotive engine spare part`} />
        <meta property="og:image" content={selectedPart.image} />
        <meta property="og:type" content="product" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="product" />
        <meta name="twitter:title" content={`${selectedPart.part_name} | EMD Locomotive Parts`} />
        <meta name="twitter:description" content={`Buy ${selectedPart.part_name} (Part Numbers: ${partNumbers}) - EMD locomotive spare part`} />
        <meta name="twitter:image" content={selectedPart.image} />
        
        {/* Product Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": selectedPart.part_name,
            "image": selectedPart.image,
            "description": `High quality ${selectedPart.part_name} for EMD locomotives. Part Numbers: ${partNumbers}`,
            "brand": {
              "@type": "Brand",
              "name": "Epimech"
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "Epimech Solutions Pvt. Ltd"
            },
            "sku": partNumbers,
            "category": selectedPart.main_product || "EMD Locomotive Parts"
          })}
        </script>
      </Head>
      <div>
        <PartDetails part={selectedPart} onBack={() => router.push('/products')} />
      </div>
    </>
  );
}

'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import PartDetails from '@/components/PartDetails';

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

  if (loading || !selectedPart) return null;

  return (
    <div>
      <PartDetails part={selectedPart} onBack={() => router.push('/products')} />
    </div>
  );
}


// inside /products/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const slug = params.slug;

  // Optional: fetch product data based on slug
  const res = await fetch(`https://www.epimech.com/api/products/${slug}`);
  const product = await res.json();

  return {
    title: `${product?.part_name || slug} | Epimech`,
    description: `Details and specifications for ${product?.part_name}, available from Epimech.`,
    openGraph: {
      title: `${product?.part_name} | Epimech`,
      description: `High-quality part available from Epimech for EMD 645 / 710 engines.`,
      url: `https://www.epimech.com/products/${slug}`,
      siteName: "Epimech",
      images: [
        {
          url: `https://www.epimech.com${product?.image || '/og-image.jpg'}`,
          width: 800,
          height: 600,
        }
      ],
      locale: "en_US",
      type: "product",
    },
  };
}

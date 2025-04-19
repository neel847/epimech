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

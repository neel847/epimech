'use client';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WaterPumpParts } from '@/helper/WaterPumpUtil';
import PartDetails from '@/components/PartDetails';
import { slugify } from '@/utils/slugify';

export default function PartSlugPage(props) {
  const router = useRouter();
  const [selectedPart, setSelectedPart] = useState(null);

  const { slug } = use(props.params); // ✅ use React.use()

  useEffect(() => {
    const allParts = [...WaterPumpParts];
    const match = allParts.find(
      (p) => slugify(p.part_name) === slug.toLowerCase()
    );
    if (match) {
      setSelectedPart(match);
    } else {
      router.push('/products');
    }
  }, [slug]);

  if (!selectedPart) return null;

  return (
    <div>
      <PartDetails part={selectedPart} onBack={() => router.push('/products')} />
    </div>
  );
}

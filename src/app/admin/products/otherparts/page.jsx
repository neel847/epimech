'use client';
import { useEffect, useState } from 'react';
import DragDropList from '@/components/DragDropList';

export default function OtherPartsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/otherparts');
      const data = await res.json();
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Other Parts</h1>
      {items.length === 0 ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <DragDropList items={items} category="OtherParts" />
      )}
    </div>
  );
}

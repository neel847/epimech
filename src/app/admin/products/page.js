'use client';
import { useState, useEffect } from 'react';
import DragDropList from '../../../components/DragDropList';

const categories = [
  { name: 'WaterPump', label: 'Water Pump', endpoint: '/api/waterpump' },
  { name: 'OtherParts', label: 'Other Parts', endpoint: '/api/otherparts' }
];

export default function ProductAdminPage() {
  const [tab, setTab] = useState('WaterPump');
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  console.log('🌀 Tab changed to:', tab);

// ✅ When tab or search changes
useEffect(() => {
  const fetchData = async () => {
    const cat = categories.find((c) => c.name === tab);
    const res = await fetch(`${cat.endpoint}?search=${encodeURIComponent(search)}`);
    const data = await res.json();
    setItems(data); // 🔥 force update
  };
  fetchData();
}, [tab, search]);


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Manager</h1>
      <div className="flex gap-4 mb-4">
        {categories.map((c) => (
          <button key={c.name} onClick={() => setTab(c.name)} className={`px-4 py-2 rounded ${tab === c.name ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            {c.label}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search by part name or number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-2 border border-gray-300 rounded w-full"
      />
      <DragDropList items={items} category={tab} />
    </div>
  );
}

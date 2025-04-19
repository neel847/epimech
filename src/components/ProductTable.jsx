'use client';
import { useState } from 'react';
import { GripVertical, Trash2, Pencil, EyeOff, Eye } from 'lucide-react';
import SortableRow from './SortableRow';
import ProductEditorModal from '@/components/ProductEditorModal';

export default function ProductTable({ items, category }) {
  const [products, setProducts] = useState(items);
  const [editing, setEditing] = useState(null);

  const handleSave = (updated) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    await fetch(`/api/${category.toLowerCase()}/${id}`, { method: 'DELETE' });
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleToggleHide = async (product) => {
    const updated = { ...product, is_hide: !product.is_hide };
    const res = await fetch(`/api/${category.toLowerCase()}/${product._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    const data = await res.json();
    handleSave(data);
  };

  return (
    <>
      <table className="w-full table-auto border-collapse border">
        <thead className="bg-gray-100 dark:bg-color-gray-700">
          <tr>
            <th className="p-2 border w-8 text-center">↕️</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Part Name</th>
            <th className="p-2 border">Part Number</th>
            <th className="p-2 border text-center">Rank</th>
            <th className="p-2 border text-center">Hidden</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <SortableRow key={item._id} item={item}>
              <td className="p-2">
                <img
                  src={item.image}
                  alt={item.part_name}
                  className="w-20 h-auto rounded shadow-sm"
                />
              </td>
              <td className="p-2 font-medium">{item.part_name}</td>
              <td className="p-2 text-sm">
                {Object.values(item.part_number || {}).join(', ')}
              </td>
              <td className="p-2 text-center">{item.rank}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleToggleHide(item)}
                  className={`px-2 py-1 text-xs rounded ${
                    item.is_hide ? 'bg-red-400' : 'bg-green-400'
                  }`}
                >
                  {item.is_hide ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </td>
              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => setEditing(item)}
                  className="px-2 py-1 bg-yellow-400 rounded text-xs inline-flex items-center"
                >
                  <Pencil size={14} className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs inline-flex items-center"
                >
                  <Trash2 size={14} className="mr-1" /> Delete
                </button>
              </td>
            </SortableRow>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <ProductEditorModal
        open={!!editing}
        onClose={() => setEditing(null)}
        product={editing}
        onSave={handleSave}
        category={category}
      />
    </>
  );
}

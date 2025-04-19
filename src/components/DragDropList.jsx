'use client';
import { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import ProductTable from './ProductTable';

export default function DragDropList({ items, category }) {
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    console.log("🔁 items updated:", items);
    setCurrentItems(items);
  }, [items]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = currentItems.findIndex((i) => i._id === active.id);
    const newIndex = currentItems.findIndex((i) => i._id === over.id);

    const reordered = arrayMove(currentItems, oldIndex, newIndex);
    setCurrentItems(reordered);

    await fetch(`/api/${category.toLowerCase()}/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: reordered.map((item, idx) => ({ id: item._id, rank: idx + 1 })),
      }),
    });
  };

  console.log("🧩 currentItems:", currentItems);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={currentItems.map((i) => i._id)}
        strategy={verticalListSortingStrategy}
      >
        {currentItems.length > 0 ? (
          <ProductTable items={currentItems} category={category} />
        ) : (
          <div className="text-center text-gray-400 mt-10">No products found</div>
        )}
      </SortableContext>
    </DndContext>
  );
}

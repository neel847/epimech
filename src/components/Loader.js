'use client';
export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gray-50 dark:bg-black/80 flex items-center justify-center">
      <div className="w-16 h-16 border-[6px] border-color-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

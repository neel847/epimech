'use client';
export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 dark:bg-black/80 flex items-center justify-center">
      <div className="w-16 h-16 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

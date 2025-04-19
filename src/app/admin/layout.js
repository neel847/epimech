import AdminNavbar from '@/components/AdminNavbar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-color-gray-900 text-black dark:text-white">
      <AdminNavbar />
      <main className="p-6">{children}</main>
    </div>
  );
}

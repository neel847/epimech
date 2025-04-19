'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Mail', href: '/admin/mail' },
  { label: 'Water Pump', href: '/admin/products/waterpump' },
  { label: 'Other Parts', href: '/admin/products/otherparts' }
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-color-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex space-x-6 text-lg font-semibold">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`transition-all ${
              pathname.startsWith(tab.href)
                ? 'underline underline-offset-4'
                : 'hover:opacity-80'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

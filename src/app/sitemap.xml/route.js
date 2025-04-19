// src/app/sitemap.xml/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.epimech.com';

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/products',
    '/customers',
    '/product-list'
  ];

  const dynamicProducts = await fetch(`${baseUrl}/api/all-products`).then(res => res.json());

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages.map(p => `
      <url>
        <loc>${baseUrl}${p}</loc>
      </url>
    `).join('')}
    ${dynamicProducts.map(p => `
      <url>
        <loc>${baseUrl}/products/${p.slug}</loc>
      </url>
    `).join('')}
  </urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' }
  });
}

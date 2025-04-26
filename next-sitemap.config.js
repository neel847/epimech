/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://epimech.com', // ✅ Your website domain
    generateRobotsTxt: true,        // ✅ Auto create robots.txt
    sitemapSize: 7000,              // ✅ Safe limit if you have many products
    changefreq: 'daily',            // ✅ Default: update frequency
    priority: 0.7,                  // ✅ Priority of all pages
    generateIndexSitemap: true,     // ✅ Will create a sitemap index if you have multiple sitemaps
  };
  
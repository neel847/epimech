import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const baseConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'epimech.s3.us-east-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
}

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development',
}

export default withPWA(pwaConfig)(baseConfig)

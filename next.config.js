/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // reactCompiler: false, // Enable React Compiler for Next.js 16

  // Security headers configuration (fallback for proxy.ts)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pro-section.ui-layouts.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

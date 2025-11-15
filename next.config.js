/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true, // Enable React Compiler for Next.js 16
  i18n: {
    locales: ['en', 'fa'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'picsum.photos'],
  },
  swcMinify: true,
}

module.exports = nextConfig

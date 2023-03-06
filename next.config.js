/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/jobs',
        permanent: false
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    HOST: process.env.HOST
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig

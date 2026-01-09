/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  redirects: async () => [
    {
      source: '/plan/respect-auburn',
      destination: '/plan/visitor-information',
      permanent: true,
    },
  ],
}

module.exports = nextConfig


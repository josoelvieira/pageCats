/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn2.thecatapi.com',
          port: '',
          pathname: '/images/**',
        },
      ],
    },
  }

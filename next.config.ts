import type { NextConfig } from 'next';

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'tailwindui.com',
        protocol: 'https',
      },
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
      },
      {
        hostname: 'bn-cdn-all.fra1.digitaloceanspaces.com',
        protocol: 'https',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);

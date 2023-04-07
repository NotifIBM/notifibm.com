/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    runtime: 'experimental-edge',
  },
  images: {
    domains: ['cdn.hashnode.com', 'supunsathsara.com'],
  },
};

module.exports = nextConfig;

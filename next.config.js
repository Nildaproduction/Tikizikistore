/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/store/:path*',
        destination: 'https://tikizikistore-y5g8-nildaproductions-projects.vercel.app/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

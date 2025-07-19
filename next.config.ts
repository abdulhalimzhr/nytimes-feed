import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nytimes.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'static01.nyt.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'c.nytimes.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'static01.nyt.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;

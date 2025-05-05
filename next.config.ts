import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Prevent ESLint errors from failing the production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Prevent TypeScript errors from failing the production build
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;
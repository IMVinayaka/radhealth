/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
  // Only enable output: 'export' in production
  ...(isProd ? { output: 'export' } : {}),
  // Remove basePath since we're using custom domain
  // Remove assetPrefix since we're using custom domain
  // ...(isProd ? { assetPrefix: '' } : {}),
  // Add custom domain configuration
  ...(isProd ? {
    assetPrefix: '',
    basePath: '',
    images: {
      domains: ['radhealthplus.com']
    }
  } : {}),
  reactStrictMode: true,
  images: {
    unoptimized: isProd, // Only unoptimize in production
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't3.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'admin.radiants.com',
      },
      {
        protocol: 'https',
        hostname: 'radhealthplus.com',
      },
    ],
  },
  trailingSlash: true,
  distDir: 'out',
  optimizeFonts: false,
  experimental: {
    // Disable optimizeCss as it's causing issues
    // optimizeCss: true,
  },
};

// Only add headers in development
if (!isProd) {
  nextConfig.headers = async () => {
    return [
      {
        source: '/:all*(woff|woff2|eot|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  };
}

module.exports = nextConfig;
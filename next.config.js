/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'radhealth';
const basePath = isProd ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  reactStrictMode: true,
  images: {
    unoptimized: true,
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
    ],
  },
  trailingSlash: true,
  distDir: 'out',
  optimizeFonts: false,
  experimental: {
    // Disable optimizeCss as it's causing issues with critters
    // optimizeCss: true,
  },
  // Disable headers for static export
  // headers: async () => {
  //   return [
  //     {
  //       source: '/(.*).woff2',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

// Only add headers in development
if (process.env.NODE_ENV === 'development') {
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
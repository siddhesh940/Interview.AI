/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during production builds (we'll fix errors later)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
  // Increase server actions body size limit for PDF uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Exclude large public folder files from serverless function bundles (250MB limit)
  outputFileTracingExcludes: {
    '*': [
      './public/InterviewPrep/**',
      './public/WIPRO/**',
      './public/TCS/**',
      './public/CAPGEMINI/**',
      './public/COGNIZANT/**',
      './public/INFOSYS/**',
      './public/ACCENTURE/**',
      './public/pdfs/**',
      './public/images/**',
    ],
  },
  // Landing page is now shown at "/" - no redirect to dashboard
  // Users will navigate to dashboard after signing in
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  webpack: (webpackConfig, { webpack }) => {
    webpackConfig.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      }),
    );

    return webpackConfig;
  },
};

module.exports = nextConfig;

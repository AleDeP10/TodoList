/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disables React's strict mode to avoid double rendering during development
  reactStrictMode: false,

  // Controls how long pages stay in memory and how many are buffered
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // Keep pages in memory for 1 minute
    pagesBufferLength: 5,      // Buffer up to 5 pages at a time
  },

  // Ignores ESLint errors during build to prevent blocking the build process
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Indicates that the app will be statically exported (e.g., for deployment to static hosts)
  output: "export",

  // Rewrites allow proxying API requests to the backend server
  async rewrites() {
    return [
      {
        // Match any request starting with /api/
        source: "/api/:path*",

        // Redirect it to the backend running on HTTPS localhost port 5000
        // This avoids CORS issues and lets Next.js handle the proxy server-side
        destination: "https://localhost:5000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;

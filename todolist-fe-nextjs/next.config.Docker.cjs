/** @type {import('next').NextConfig} */
const nextConfig = {
  // ──────────────────────────────────────────────────────────────
  // ✅ App Router activation
  // Ensures Next.js uses the `src/app/` directory instead of legacy `pages/`
  experimental: {
    appDir: true,
  },

  // ──────────────────────────────────────────────────────────────
  // ❌ Disables React Strict Mode
  // Prevents double rendering during development (useful for debugging and performance)
  reactStrictMode: false,

  // ──────────────────────────────────────────────────────────────
  // ⚙️ Development page caching
  // Keeps pages in memory for 60 seconds and buffers up to 5 pages
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // ──────────────────────────────────────────────────────────────
  // 🚫 Ignores ESLint errors during build
  // Prevents linting issues from blocking the production build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ──────────────────────────────────────────────────────────────
  // 🔁 API proxy rewrites
  // Redirects all `/api/*` requests to the backend running on HTTPS todolist-be-csharp:5000
  // Helps avoid CORS issues and centralizes routing logic
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://todolist-be-csharp:5000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;

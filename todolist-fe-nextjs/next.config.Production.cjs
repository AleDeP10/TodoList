/** @type {import('next').NextConfig} */
const nextConfig = {
  // ──────────────────────────────────────────────────────────────
  // ✅ Static export mode for Render deployment
  // This configuration enables full static export of the Next.js app.
  // It disables server-side features like rewrites and API routing,
  // making the app suitable for hosting on platforms like Render Static Sites.
  // All dynamic data must be fetched via client-side calls using NEXT_PUBLIC_API_URL.
  output: "export",

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
  // 🌍 Environment variable injection for client-side API calls
  // Ensures NEXT_PUBLIC_API_URL is embedded at build time,
  // allowing client-side fetches to target the correct backend.
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

};

module.exports = nextConfig;

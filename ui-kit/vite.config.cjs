const react = require("@vitejs/plugin-react");

/** @type {import('vite').UserConfig} */
module.exports = {
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
};

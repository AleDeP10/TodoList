const svgrImport = require("vite-plugin-svgr");
const svgr = svgrImport.default || svgrImport;
const react = require("@vitejs/plugin-react");
const path = require("path");

/** @type {import('vite').UserConfig} */
module.exports = {
  logLevel: "info",

  optimizeDeps: {
    exclude: ["next/image"],
  },

  resolve: {
    alias: [
      {
        find: "next/image",
        replacement: "./.storybook/mock/image.tsx",
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },

  plugins: [
    svgr(),
    {
      name: "strip-use-client-directive",
      transform(code) {
        return code.replace(/["']use client["'];?/g, "");
      },
    },
  ],

  build: {
    sourcemap: false,
  },

  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
      {
        extends: true,
        plugins: [react()],
        test: {
          name: "unit",
          environment: "jsdom",
          globals: true,
          setupFiles: ["./src/test/setup.ts"],
          include: ["src/**/*.test.{ts,tsx}"],
        },
      },
    ],
  },
};

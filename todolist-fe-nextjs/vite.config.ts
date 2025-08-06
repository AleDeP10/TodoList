import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";

export default defineConfig({
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
    ],
  },

});

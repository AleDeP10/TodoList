import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";

const isStorybook = process.env.STORYBOOK === "true";

// Plugin per rimuovere "use client"
const stripUseClient = {
  name: "strip-use-client-directive",
  transform(code: string) {
    return code.replace(/["']use client["'];?/g, "");
  },
};

export default defineConfig({
  logLevel: "info",
  plugins: [
    svgr(),
    ...(isStorybook ? [stripUseClient] : []),
    {
      name: "ignore-font-assets",
      load(id) {
        if (id.includes("nunito-sans") && id.endsWith(".woff2")) {
          console.log("⛔ Ignoro asset font:", id);
          return "export default undefined;";
        }
      },
    },
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      external: ["framer-motion"],
    },
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

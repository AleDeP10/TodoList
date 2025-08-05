import path from "path";

const useClientModules = [
  "src/app/page.tsx",
  "src/app/providers.tsx",
  // ... (puoi continuare con i moduli come nel tuo esempio)
  "framer-motion",
];

const Foo = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx|js|jsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: [path.resolve(__dirname, "../public")],
  viteFinal: async (config) => {
    // 🔥 Rimuove vite-plugin-next e virtual se presenti
    config.plugins = config.plugins?.filter((plugin) => {
      if (
        plugin.name?.includes("vite-plugin-next") ||
        plugin.name?.includes("virtual")
      ) {
        console.log("🧨 Rimozione plugin:", plugin.name);
        return false;
      }
      return true;
    });

    // 🔥 Rimuove vite-plugin-next se presente
    config.plugins = (config.plugins || []).filter(
      (plugin) => plugin.name !== "vite-plugin-next"
    );

    // 🔍 Log virtual modules (debug)
    config.plugins?.push({
      name: "log-virtual-imports",
      resolveId(id) {
        if (id.startsWith("virtual:")) {
          console.log("🔍 Modulo virtuale visto:", id);
        }
        return null;
      },
    });

    config.plugins?.push({
      name: "block-virtual-modules",
      resolveId(id: string) {
        if (id.includes("virtual:")) {
          console.log("⛔ Blocco modulo virtuale:", id);
          return id;
        }
        return null;
      },
      load(id: string) {
        if (id.includes("virtual:")) {
          return "export default undefined;";
        }
        return null;
      },
    });

    // ✅ Evita moduli problematici
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.external = [
      ...(Array.isArray(config.build.rollupOptions.external)
        ? config.build.rollupOptions.external
        : []),
      ...useClientModules.filter((m) => m !== "virtual:next-image"), // escludiamo manualmente
    ];

    return config;
  },
};

export default Foo;

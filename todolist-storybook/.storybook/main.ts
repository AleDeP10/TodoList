import path from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const storybookConf: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
  ],
  babel: async (options) => {
    if (options && Array.isArray(options.presets)) {
      options.presets.push(require.resolve("@babel/preset-typescript"));
    }
    return options;
  },
  framework: "@storybook/react-webpack5",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  staticDirs: [path.resolve(__dirname, "../public")],
  webpackFinal: async (config) => {
    if (config?.module?.rules) {
      config.module.rules.push({
        test: /\.css$/i,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
        include: [
          path.resolve(__dirname, "../public/styles"),
          path.resolve(__dirname, "../public/styles/themes"),
        ],
      });
    }

    config.optimization = {
      ...config.optimization,
      splitChunks: false,
      runtimeChunk: false,
    };

    return config;
  },
};

export default storybookConf;

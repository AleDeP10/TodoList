import type { Preview } from "@storybook/react";
import { UIKitProvider } from "../src/providers/UIKitProvider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <UIKitProvider>
        <Story />
      </UIKitProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: { test: "todo" },
    tags: ["autodocs"],
    docs: {
      toc: {
        contentsSelector: ".sbdocs-content",
        headingSelector: "h1, h2, h3",
        ignoreSelector: "#primary",
        title: "Table of Contents",
        disable: false,
        unsafeTocbotOptions: { orderedList: false },
      },
    },
  },
};

export default preview;

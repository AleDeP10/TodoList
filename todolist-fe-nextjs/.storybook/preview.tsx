import { JSX } from "react";
import type { Preview } from "@storybook/react";
import { Providers } from "../src/app/providers";
import "../src/app/globals.css";

const withProviders = (Story: () => JSX.Element) => (
  <Providers>
    <Story />
  </Providers>
);

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    //👇 Enables auto-generated documentation for all stories
    tags: ["autodocs"],
    docs: {
      // 👇 Enables the table of contents
      toc: {
        contentsSelector: ".sbdocs-content",
        headingSelector: "h1, h2, h3",
        ignoreSelector: "#primary",
        title: "Table of Contents",
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
  },
};

export default preview;

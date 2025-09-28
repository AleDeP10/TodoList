import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta = {
  title: "Access/Introduction",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

export const Welcome: Story = {
  render: () => (
    <div
      style={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "600px",
          textAlign: "center",
          gap: "10px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          Welcome to Storybook
        </h1>
        <p>
          This workspace is designed to support seamless collaboration between{" "}
          <strong>designers</strong> and <strong>developers</strong>. component
          is documented, styled, and rendered with care — but more importantly,{" "}
          <em>interactive</em>.
        </p>
        <p>
          Stories are not just visual snapshots: they demonstrate real behavior,
          allowing you to explore how components respond to user input, edge
          cases, and responsive layouts.
        </p>
        <p>
          You are encouraged to explore the <strong>sidebar</strong> and dive
          into each component’s stories — from basic usage to advanced
          scenarios.
        </p>
        <p>
          Whether you're validating a design, testing a prop, or reviewing
          mobile behavior, Storybook is your playground.
        </p>
      </div>
    </div>
  ),
};

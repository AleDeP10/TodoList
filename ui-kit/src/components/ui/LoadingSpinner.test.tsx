import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders with an accessible loading role", () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("applies the default color class to the icon", () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId("spinner-icon")).toHaveClass("text-yellow-400");
  });

  it("applies a custom color class when provided", () => {
    render(<LoadingSpinner color="text-red-500" />);
    expect(screen.getByTestId("spinner-icon")).toHaveClass("text-red-500");
  });

  it("applies the default size", () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId("spinner-icon")).toHaveAttribute("width", "64");
  });
});

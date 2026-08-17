import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import IconButton from "./IconButton";
import { Icons } from "../Icons";

describe("IconButton", () => {
  let onClickMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onClickMock = vi.fn(); 
  });

  it("renders with an accessible button role", () => {
    render(
      <IconButton
        icon={Icons.close}
        ariaLabel="Close"
        color="#047878"
        onClick={onClickMock}
      />,
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("applies the default --fg color class to the icon", () => {
    render(
      <IconButton icon={Icons.close} ariaLabel="Close" onClick={onClickMock} />,
    );
    expect(screen.getByRole("button", { name: "Close" })).toHaveStyle({
      color: "var(--fg)",
    });
  });

  it("applies a custom color class when provided", () => {
    render(
      <IconButton
        icon={Icons.close}
        ariaLabel="Close"
        color="#047878"
        onClick={onClickMock}
      />,
    );
    expect(screen.getByRole("button", { name: "Close" })).toHaveStyle({
      color: "#047878",
    });
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    render(
      <IconButton icon={Icons.close} ariaLabel="Close" onClick={onClickMock} />,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is true", () => {
    render(
      <IconButton
        icon={Icons.close}
        ariaLabel="Close"
        onClick={onClickMock}
        disabled={true}
      />,
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeDisabled();
  });

  it("does not call onClick when disabled and clicked", async () => {
    const user = userEvent.setup();
    render(
      <IconButton
        icon={Icons.close}
        ariaLabel="Close"
        onClick={onClickMock}
        disabled={true}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("does not submit a surrounding form when clicked", async () => {
  const onSubmitMock = vi.fn((e) => e.preventDefault());
  const user = userEvent.setup();

  render(
    <form onSubmit={onSubmitMock}>
      <IconButton icon={Icons.close} ariaLabel="Close" onClick={() => {}} />
    </form>
  );

  await user.click(screen.getByRole("button", { name: "Close" }));

  expect(onSubmitMock).not.toHaveBeenCalled();
});
});

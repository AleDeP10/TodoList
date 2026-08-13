import { beforeEach, describe, expect, it, vi } from "vitest";
import Switch from "./Switch";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Switch", () => {
    let onChangeMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        onChangeMock = vi.fn();
    });

    it("renders with an accessible switch role in the grid variant", () => {
        render(<Switch variant="grid" checked={false} onChange={onChangeMock} label="Test Switch" />);
        expect(screen.getByRole("switch", { name: "Test Switch" })).toBeInTheDocument();
    })

    it("reflects the checked state via aria-checked", () => {
        render(<Switch variant="grid" checked={true} onChange={onChangeMock} label="Test Switch" />);
        expect(screen.getByRole("switch", { name: "Test Switch" })).toHaveAttribute("aria-checked", "true");
    });

    it("calls onChange with the toggled value when clicked", async() => {
        const user = userEvent.setup();
        render(<Switch variant="grid" checked={false} onChange={onChangeMock} label="Test Switch" />);
        const switchButton = screen.getByRole("switch", { name: "Test Switch" });
        expect(switchButton).toHaveAttribute("aria-checked", "false");
        await user.click(switchButton);
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(true);
    });

    it("renders with an accessible switch role in the compact variant", () => {
        render(<Switch variant="compact" checked={false} onChange={onChangeMock} label="Test Switch" />);
        expect(screen.getByRole("switch", { name: "Test Switch" })).toBeInTheDocument();
    })
});
import { describe, expect, it, vi } from "vitest";
import TextField from "./TextField";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
// import { Icons } from "@/components/Icons";

describe("TextField", () => {

	function ControlledTextField({ onChangeSpy }: { onChangeSpy: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
	  const [value, setValue] = useState("");
	  return (
		<TextField
		  variant="text"
		  value={value}
		  onChange={(e) => {
			onChangeSpy(e);
			setValue(e.target.value);
		  }}
		  name="test-field"
		  label="Test Field"
		/>
	  );
	}

	it("renders with an accessible label linked to the input", () => { 
		render(
            <TextField
                variant="text"
                value=""
                onChange={() => {}}
                name="test-field"
                label="Test Field"
            />
        );
		
		const input = screen.getByRole("textbox", { name: "Test Field" });
		const label = screen.getByText("Test Field");

		expect(input).toBeInTheDocument();
		expect(label.tagName).toBe("LABEL");
		expect(label).toHaveAttribute("for", input.id);
	});
	
	it("calls onChange when the user types", async () => {
	  const onChangeMock = vi.fn();
	  const user = userEvent.setup();

	  render(<ControlledTextField onChangeSpy={onChangeMock} />);
	  await user.type(screen.getByRole("textbox", { name: "Test Field" }), "Hello");

	  expect(onChangeMock).toHaveBeenCalledTimes(5);
	  expect(screen.getByRole("textbox", { name: "Test Field" })).toHaveValue("Hello");
	});
	
	it("shows an error style when error is true", () => {
		render(
            <TextField
                variant="text"
                value=""
                onChange={() => {}}
                name="test-field"
                label="Test Field"
				error={true}
				helper={{type: "error", text: "mandatory field"}}
            />
        );
		const input = screen.getByRole("textbox", { name: "Test Field" });
		expect(input).toHaveClass("border-red-500");
		const helperText = screen.getByText("mandatory field");
		expect(helperText).toBeInTheDocument();
		expect(helperText).toHaveClass("text-red-500");
	});
	
	it("renders as a password input by default when variant is 'password'", () => {
		render(
            <TextField
                variant="password"
                value=""
                onChange={() => {}}
                name="password"
                label="Password"
            />
        );
		const input = screen.getByLabelText("Password") as HTMLInputElement;
		expect(input.type).toBe("password");
	});

	it("toggles icon button when it gets clicked", async () => {
		const user = userEvent.setup();
		render(
            <TextField
                variant="password"
                value=""
                onChange={() => {}}
                name="password"
                label="Password"
            />
        );

		const showButton = screen.getByLabelText("Show password");
		expect(showButton).toBeInTheDocument();
		expect(screen.queryByLabelText("Hide password")).toBe(null);
		expect(screen.getByTestId("show-password-icon")).toBeInTheDocument();
		expect(screen.queryByTestId("hide-password-icon")).toBe(null);
		
		await user.click(showButton);

		expect(screen.getByLabelText("Hide password")).toBeInTheDocument();
		expect(screen.queryByLabelText("Show password")).toBe(null);
		expect(screen.getByTestId("hide-password-icon")).toBeInTheDocument();
		expect(screen.queryByTestId("show-password-icon")).toBe(null);
	});

	it("toggles password visibility when the icon button is clicked", async () => {
		const user = userEvent.setup();
		render(
			<TextField
				variant="password"
				value=""
				onChange={() => {}}
				name="password"
				label="Password"
			/>
		);

		const showButton = screen.getByLabelText("Show password");
		const input = screen.getByLabelText( "Password" ) as HTMLInputElement;
		expect(input).toBeInTheDocument();
		expect(input.type).toBe("password");
		await user.click(showButton);
		expect(input.type).toBe("text");
	});
});
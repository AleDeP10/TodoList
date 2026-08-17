import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFieldValidation } from "./useFieldValidation";
import { LangProvider } from "../providers/i18n";

describe("useFieldValidation", () => {
  it("has no errors before any field is touched", () => {
    const { result } = renderHook(
      () => useFieldValidation({ username: "" }, ["username"]),
      { wrapper: LangProvider },
    );

    expect(result.current.hasError("username")).toBe(false);
  });

  it("marks a field as touched", () => {
    const { result } = renderHook(
      () => useFieldValidation({ username: "" }, ["username"]),
      { wrapper: LangProvider },
    );

    expect(result.current.touched.username).toBeUndefined();

    act(() => {
      result.current.markTouched("username");
    });

    expect(result.current.touched.username).toBe(true);
  });

  it("reports an error on a mandatory field left empty after being touched", () => {
    const { result } = renderHook(
      () => useFieldValidation({ username: "" }, ["username"]),
      { wrapper: LangProvider },
    );

    act(() => {
      result.current.markTouched("username");
    });

    expect(result.current.hasError("username")).toBe(true);
    expect(result.current.getHelper("username")?.type).toBe("error");
  });

  it("does not report an error on a mandatory field with a value", () => {
    const { result } = renderHook(
      () => useFieldValidation({ username: "Alice" }, ["username"]),
      { wrapper: LangProvider },
    );

    act(() => result.current.markTouched("username"));

    expect(result.current.hasError("username")).toBe(false);
  });

  it("applies a custom validation rule regardless of touched state", () => {
    const takenUsernames = ["admin", "aledep", "gabri"];
    const { result } = renderHook(
      () =>
        useFieldValidation({ username: "admin" }, ["username"], {
          username: {
            displayRule: (username) =>
              username.trim() !== "" &&
              takenUsernames.includes(username.trim().toLowerCase()),
            helper: { type: "error", text: "user.username.duplicate" },
          },
        }),
      { wrapper: LangProvider },
    );

    expect(result.current.hasError("username")).toBe(true);
    expect(result.current.getHelper("username")?.type).toBe("error");
  });

  it("computes isFormValid correctly across multiple fields", () => {
    const { result } = renderHook(
      () =>
        useFieldValidation({ username: "Alice", password: "" }, [
          "username",
          "password",
        ]),
      { wrapper: LangProvider },
    );

    expect(result.current.isFormValid).toBe(false);
  });

  it("does not block form validity when only a warning rule is triggered", () => {
    const { result } = renderHook(
      () =>
        useFieldValidation({ status: "BLOCKED" }, [], {
          status: {
            displayRule: (status) => status === "BLOCKED",
            helper: { type: "warning", text: "Blocked, 2 tasks in progress" },
          },
        }),
      { wrapper: LangProvider },
    );

    expect(result.current.hasError("status")).toBe(false);
    expect(result.current.getHelper("status")?.type).toBe("warning");
    expect(result.current.isFormValid).toBe(true);
  });
});

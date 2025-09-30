/**
 * useFieldValidation.ts
 *
 * 📌 Context:
 * Centralized hook for validating form fields with both mandatory and custom rules.
 * Tracks user interaction and returns helper messages for UI rendering.
 *
 * ✅ Solves:
 * - Tracks blur events to determine field interaction
 * - Validates required fields and applies custom logic per field
 * - Returns error flags and contextual helper messages
 * - Enables/disables save actions based on overall form validity
 *
 * ⚙️ Behavior:
 * - Accepts:
 *   - `fields`: object mapping field names to current string values
 *   - `mandatory`: array of field names that must be non-empty
 *   - `customRules`: object mapping field names to validation config
 *     - Each rule includes:
 *       - `displayRule(value: string): boolean`
 *       - `helper: { type: "error" | "warning", text: string }`
 * - Returns:
 *   - `isFormValid`: boolean indicating overall form validity
 *   - `touched`: record of fields marked as interacted
 *   - `markTouched(fieldName)`: marks a field as touched
 *   - `hasError(fieldName)`: returns true if field is invalid
 *   - `getHelper(fieldName)`: returns helper message if applicable
 *
 * 📦 Usage:
 * ```tsx
 * const { isFormValid, markTouched, hasError, getHelper } = useFieldValidation(
 *   {
 *     fullName: formState.fullName,
 *     username: formState.username,
 *     password: formState.password,
 *     status: formState.status,
 *   },
 *   ["fullName", "username", "password"],
 *   {
 *     username: {
 *       displayRule: (username) =>
 *         username.trim() !== "" &&
 *         !checkUsernameUnique(username, formState.id),
 *       helper: { type: "error", text: t("user.username.duplicate") },
 *     },
 *     status: {
 *       displayRule: (status) => status === "BLOCKED" && inProgress() > 0,
 *       helper: {
 *         type: "warning",
 *         text: t("user.status.blocked", { inProgress: inProgress() }),
 *       },
 *     },
 *   }
 * );
 * ```
 */

import { useState, useMemo } from "react";
import { useTranslation } from "./useTranslation";
import { Helper } from "../types/Validation";

// Defines a custom validation rule with a predicate and helper message
type CustomValidationRule = {
  displayRule: (value: string) => boolean; // Determines if the rule triggers
  helper: Helper | null; // Message to show if triggered
};

// Maps field names to their custom validation rules
type ValidationConfig = Record<string, CustomValidationRule>;

// Main validation hook
export function useFieldValidation(
  fields: Record<string, string>, // Current field values
  mandatory: string[] = [], // List of required fields
  customRules?: ValidationConfig // Optional custom rules
) {
  const t = useTranslation();

  // Tracks which fields have been interacted with
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Marks a field as touched (typically onBlur)
  const markTouched = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  // Determines if a field has a validation error
  const hasError = (fieldName: string): boolean => {
    const value = fields[fieldName]?.trim() ?? "";
    const touchedField = touched[fieldName];

    // Debug logging in non-production environments
    if (process.env.NEXT_PUBLIC_ENV !== "production") {
      console.log("useFieldValidation.hasError", {
        touched,
        fieldName,
        value,
        touchedField,
        customRule: customRules?.[fieldName],
        displayCustom:
          customRules?.[fieldName]?.displayRule(value) &&
          customRules?.[fieldName]?.helper?.type === "error",
        displayMandatory: mandatory.includes(fieldName) && value === "",
      });
    }

    // Custom rule check
    const rule = customRules?.[fieldName];
    if (rule?.displayRule(value) && rule?.helper?.type === "error") {
      return true;
    }

    // Prevent mandatory check if the field hasn't been touched
    if (!touchedField) return false;

    // Mandatory field check
    if (mandatory.includes(fieldName) && value === "") return true;

    return false;
  };

  // Returns helper message if field is invalid or has a warning
  const getHelper = (fieldName: string): Helper | null => {
    const value = fields[fieldName]?.trim() ?? "";
    const touchedField = touched[fieldName];

    // Debug logging
    if (process.env.NEXT_PUBLIC_ENV !== "production") {
      console.log("useFieldValidation.getHelper", {
        touched,
        fieldName,
        value,
        touchedField,
        customRule: customRules?.[fieldName],
        displayCustom: customRules?.[fieldName]?.displayRule(value),
        displayMandatory: mandatory.includes(fieldName) && value === "",
      });
    }
    // Custom rule helper
    const rule = customRules?.[fieldName];
    if (rule?.displayRule(value)) {
      return rule.helper;
    }
    
    // Skip mandatory check if field hasn't been touched
    if (!touchedField) return null;

    // Mandatory field error
    if (mandatory.includes(fieldName) && value === "") {
      return { type: "error", text: t("mandatory.field") };
    }

    return null;
  };

  // Determines if the entire form is valid
  const isFormValid = useMemo(() => {
    if (process.env.NEXT_PUBLIC_ENV !== "production") {
      console.log("useFieldValidation.isFormValid", {
        fields,
        mandatory,
        customRules,
      });
    }

    return Object.entries(fields).every(([fieldName, value]) => {
      const trimmed = value.trim();

      // Debug logging per field
      if (process.env.NEXT_PUBLIC_ENV !== "production") {
        console.log("useFieldValidation.isFormValid", {
          fieldName,
          trimmed,
          rule: customRules?.[fieldName],
          dispay: customRules?.[fieldName]?.displayRule(trimmed),
        });
      }

      // Mandatory check
      if (mandatory.includes(fieldName) && trimmed === "") return false;

      // Custom rule check
      const rule = customRules?.[fieldName];
      return !rule?.displayRule(trimmed) || rule?.helper?.type !== "error";
    });
  }, [fields, mandatory, customRules]);

  return {
    isFormValid, // Overall form validity
    touched, // Touched field map
    markTouched, // Mark field as touched
    hasError, // Check if field has error
    getHelper, // Get helper message for field
  };
}

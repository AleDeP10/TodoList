/**
 * useFieldValidation.ts
 *
 * 📌 Context:
 * This hook provides centralized validation logic for form fields,
 * supporting both mandatory and custom validation rules.
 *
 * ✅ Solves:
 * - Tracks user interaction (blur events)
 * - Validates only the fields explicitly listed
 * - Applies mandatory and/or custom validation per field
 * - Returns error flags and helper texts for UI components
 * - Enables/disables save actions based on overall form validity
 *
 * ⚙️ Behavior:
 * - Accepts:
 *   - `fields`: object mapping field names to current string values
 *   - `mandatory`: optional array of field names that must be non-empty
 *   - `customRules`: optional object mapping field names to validation config
 * - Returns:
 *   - `isFormValid`: boolean
 *   - `touched`: record of touched fields
 *   - `markTouched(fieldName)`: function to mark a field as interacted
 *   - `hasError(fieldName)`: boolean for error state
 *   - `getHelperText(fieldName)`: helper text if invalid
 *
 * 📦 Usage:
 * ```tsx
 * const {
 *   isFormValid,
 *   markTouched,
 *   hasError,
 *   getHelperText
 * } = useFieldValidation(
 *   { username, website },
 *   ["username"],
 *   {
 *     username: {
 *       validate: (val) => !taken.includes(val),
 *       helperText: "Username already exists",
 *     },
 *     website: {
 *       validate: (val) => val === "" || /^https?:\/\/.+\..+/.test(val),
 *       helperText: "Must be a valid URL",
 *     },
 *   }
 * );
 * ```
 */

import { useState, useMemo } from "react";
import { useT } from "./useTranslation";

type CustomValidationRule = {
  validate: (value: string) => boolean;
  helperText: string;
};

type ValidationConfig = Record<string, CustomValidationRule>;

export function useFieldValidation(
  fields: Record<string, string>,
  mandatory: string[] = [],
  customRules?: ValidationConfig
) {
  const t = useT();

  // Track which fields have been interacted with
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Mark a field as touched (typically onBlur)
  const markTouched = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  // Determine if a field has a validation error
  const hasError = (fieldName: string): boolean => {
    const value = fields[fieldName]?.trim() ?? "";
    const touchedField = touched[fieldName];

    if (!touchedField) return false;

    // Mandatory check
    if (mandatory.includes(fieldName) && value === "") return true;

    // Custom validation check
    const rule = customRules?.[fieldName];
    if (rule && !rule.validate(value)) return true;

    return false;
  };

  // Return helper text if field is invalid
  const getHelperText = (fieldName: string): string => {
    const value = fields[fieldName]?.trim() ?? "";
    const touchedField = touched[fieldName];

    if (!touchedField) return "";

    if (mandatory.includes(fieldName) && value === "") {
      return t("mandatory.field");
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("useFieldValidation.getHelperText", {
        value,
        rule: customRules?.[fieldName],
        isValid: customRules?.[fieldName]?.validate(value),
      });
    }

    const rule = customRules?.[fieldName];
    if (rule && !rule.validate(value)) {
      return rule.helperText;
    }

    return "";
  };

  // Determine if all fields are valid
  const isFormValid = useMemo(() => {
    return Object.entries(fields).every(([fieldName, value]) => {
      const trimmed = value.trim();

      if (mandatory.includes(fieldName) && trimmed === "") return false;

      const rule = customRules?.[fieldName];
      return rule ? rule.validate(trimmed) : true;
    });
  }, [fields, mandatory, customRules]);

  if (process.env.NODE_ENV !== "production") {
    console.log("useFieldValidation", {
      fields,
      mandatory,
      touched,
      isFormValid,
      hasErrorMap: Object.keys(fields).reduce((acc, key) => {
        acc[key] = hasError(key);
        return acc;
      }, {} as Record<string, boolean>),
    });
  }

  return {
    isFormValid,
    touched,
    markTouched,
    hasError,
    getHelperText,
  };
}

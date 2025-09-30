/**
 * Defines the severity level of a helper message.
 * Used to distinguish between validation errors and warnings.
 */
export type HelperType = "error" | "warning";

/**
 * Represents a helper message shown below a control.
 * Each message has a type and a localized text.
 */
export type HelperText = {
  type: HelperType;
  text: string;
};

/**
 * Base control type shared across all form components.
 * Includes validation flags and helper messages.
 */
export interface Control {
  error?: boolean;
  helperTexts?: HelperText[];
};
/**
 * Defines shared validation types used across form controls.
 *
 * Includes severity levels (error, warning) and the Helper structure
 * used to display contextual messages below inputs.
 *
 * Also defines the Control interface, which standardizes validation props
 * across components like TextField, Dropdown, and Switch.
 */

// Defines the severity level of a helper message (error or warning)
export type HelperType = "error" | "warning";

// Represents a helper message shown below a control
export type Helper = {
  type: HelperType; // Severity of the message
  text: string; // Localized message text
};

// Base control type shared across all form controls
export interface Control {
  error?: boolean; // Indicates if the control is in an error state
  helper?: Helper | null; // Optional helper message to display
}

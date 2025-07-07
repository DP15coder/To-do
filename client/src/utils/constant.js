// Validation error reasons
export const VALIDATION_REASONS = {
  EMPTY: "empty",
  NOT_TWO_PARTS: "not-two-parts",
  INVALID_FIRST: "invalid-first",
  INVALID_LAST: "invalid-last",
  INVALID: "invalid",
  WEAK: "weak",
  MISMATCH: "mismatch",
};

// Validation error messages
export const VALIDATION_MESSAGES = {
  NAME_EMPTY: "Name is required.",
  NAME_NOT_TWO_PARTS: "Please enter both first and last names .",
  NAME_INVALID_FIRST: "First name must be 3–30 letters, no symbols or numbers.",
  NAME_INVALID_LAST: "Last name must be 3–30 letters, no symbols or numbers.",
  NAME_INVALID: "Invalid name format.",
  EMAIL_EMPTY: "Email is required.",
  EMAIL_INVALID: "Please enter a valid email address.",
  EMAIL_GENERIC: "Invalid email.",
  PASSWORD_EMPTY: "Password is required.",
  PASSWORD_WEAK: "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.",
  PASSWORD_INVALID: "Invalid password.",
  CONFIRM_EMPTY: "Please confirm your password.",
  CONFIRM_MISMATCH: "Passwords do not match.",
  CONFIRM_FAILED: "Password confirmation failed.",
};

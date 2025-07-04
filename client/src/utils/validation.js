const nameRegex = /^[A-Za-z]{3,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateName = (name) => {
  const val = name.trim();
  if (!val) return { valid: false, reason: "empty" };

  const arr = val.split(/\s+/);
  if (arr.length !== 2) return { valid: false, reason: "not-two-parts" };

  const [firstName, lastName] = arr;

  if (!nameRegex.test(firstName))
    return { valid: false, reason: "invalid-first" };
  if (!nameRegex.test(lastName))
    return { valid: false, reason: "invalid-last" };

  return { valid: true };
};

export const validateEmail = (email) => {
  if (!email.trim()) return { valid: false, reason: "empty" };
  if (!emailRegex.test(email)) return { valid: false, reason: "invalid" };
  return { valid: true };
};

export const validatePassword = (password) => {
  if (!password.trim()) return { valid: false, reason: "empty" };
  if (!passwordRegex.test(password)) return { valid: false, reason: "weak" };
  return { valid: true };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword.trim()) return { valid: false, reason: "empty" };
  if (password !== confirmPassword) return { valid: false, reason: "mismatch" };
  return { valid: true };
};

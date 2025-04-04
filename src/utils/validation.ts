export const validateField = (
  name: string,
  value: string
): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!value) errors[name] = "This field is required";
  if (name === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
    errors[name] = "Invalid email format";
  }
  return errors;
};

import * as Yup from "yup";

export const signupValidationSchema = Yup.object({
  name: Yup.string()
  .required("Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(20, "Username must not exceed 20 characters")
  .matches(
    /^[a-zA-Z0-9_ ]+$/,
    "Name can only contain alphanumeric characters, underscores, and spaces"
  )
  .matches(
    /^[^\s].*[^\s]$/,
    "Name cannot start or end with spaces"
  ),


  email: Yup.string() 
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password cannot be longer than 40 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});
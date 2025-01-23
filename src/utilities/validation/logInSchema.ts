import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(40, "Password cannot exceed 40 characters")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/\d/, "Password must include at least one number")
    .matches(/[@$!%*?&#]/, "Password must include at least one special character"),
});

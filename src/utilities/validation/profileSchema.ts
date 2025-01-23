import * as Yup from "yup";

export const profileSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_ ]+$/,
      "First name can only contain alphanumeric characters, underscores, and spaces"
    ),

  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_ ]+$/,
      "Last name can only contain alphanumeric characters, underscores, and spaces"
    ),

  address: Yup.string()
    .trim()
    .required("Address is required")
    .min(2, "Address must be at least 2 characters")
    .max(200, "Address must not exceed 200 characters")
    .matches(
      /^[a-zA-Z0-9_ ]+$/,
      "Address can only contain alphanumeric characters, underscores, and spaces"
    ),

    cv: Yup.string()
    .trim()
    .when("role", (role, schema) => {
      // Check if role is an array
      if (Array.isArray(role)) {
        return role.includes("instructor")
          ? schema
              .required("CV is required for instructors")
              .min(2, "CV must be at least 2 characters")
              .max(20, "CV must not exceed 20 characters")
              .matches(
                /^[a-zA-Z0-9_ ]+$/,
                "CV can only contain alphanumeric characters, underscores, and spaces"
              )
          : schema.notRequired();
      }
  
      // If role is not an array, assume it's a string
      return role === "instructor"
        ? schema
            .required("CV is required for instructors")
            .min(2, "CV must be at least 2 characters")
            .max(20, "CV must not exceed 20 characters")
            .matches(
              /^[a-zA-Z0-9_ ]+$/,
              "CV can only contain alphanumeric characters, underscores, and spaces"
            )
        : schema.notRequired();
    }),
  

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .matches(/^[^\s].*[^\s]$/, "Phone number cannot start or end with spaces"),

  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .test(
      "age-greater-than-18",
      "You must be at least 18 years old",
      (value) => {
        if (!value) return false;
        const today = new Date();
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
        return value <= eighteenYearsAgo;
      }
    ),
});


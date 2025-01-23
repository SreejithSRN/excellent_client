import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
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
  

  

  
  profile: Yup.object().shape({
    dateOfBirth: Yup.date()
      .required("Date of birth is required")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be at least 18 years old"
      ),    
  }),

  contact: Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    address: Yup.string()
      .trim()
      .required("Address is required")
      .min(5, "Address must be at least 5 characters")
      .max(200, "Address must not exceed 200 characters"),
    social: Yup.object().shape({
      linkedin: Yup.string()
        .trim()
        .required("Linkedin is mandatory")
        .url("Invalid URL format"),
      github: Yup.string()
        .trim()
        .url("Invalid URL format")
        .optional(),
      instagram: Yup.string()
        .trim()
        .url("Invalid URL format")
        .optional(),
    }),
  }),
});

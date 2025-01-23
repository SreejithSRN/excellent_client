import * as Yup from "yup";

export const profileEditSchema = Yup.object().shape({
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
  qualification: Yup.string()
    .trim()
    .required("Qualification is required"),

  profession: Yup.string()
    .trim()
    .required("Profession is required"),

  cv: Yup.mixed()
    .required("CV is required")
    .test(
      "file-type",
      "Only PDF files are allowed",
      (value) => {
        if (!value) return false;
        const file = value as File;
        return file.type === "application/pdf";
      }
    )
    .test(
      "file-size",
      "File size must be less than 5MB",
      (value) => {
        if (!value) return false;
        const file = value as File;
        return file.size <= 5 * 1024 * 1024; // 5MB
      }
    ),
  profile: Yup.object().shape({
    dateOfBirth: Yup.date()
      .required("Date of birth is required")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be at least 18 years old"
      ),
    avatar: Yup.mixed()
      .required("Avatar is required")
      .test(
        "file-type",
        "Only JPG, JPEG, or PNG files are allowed",
        (value) => {
          if (!value) return false;
          const file = value as File;
          return (
            file.type === "image/jpeg" ||
            file.type === "image/jpg" ||
            file.type === "image/png"
          );
        }
      )
      .test(
        "file-size",
        "File size must be less than 5MB",
        (value) => {
          if (!value) return false;
          const file = value as File;
          return file.size <= 2* 1024 * 1024; // 2MB
        }
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

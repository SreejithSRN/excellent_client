import * as Yup from 'yup';

export const courseValidationSchema = Yup.object({
  title: Yup.string()
    .required("Course title is required")
    .min(3, "Course title must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  category: Yup.string().required("Category is required"),
  level: Yup.string().required("Level is required"),
  language: Yup.string().required("Language is required"),

  pricingType: Yup.string().required("Pricing type is required."),
  price: Yup.number()
    .typeError("Price must be a number.")
    .when("pricingType", {
      is: (pricingType: string) => pricingType === "free",
      then: (schema) => schema.oneOf([0], "Price must be 0 when pricing type is Free"),
      otherwise: (schema) => schema.min(1, "Price must be greater than 0 for paid courses."),
    })
    .integer("Price must be an integer.")
    .required("Price is required."),
  thumbnail: Yup.mixed().required("Course thumbnail is required."),

  lessons: Yup.array()
  .of(
    Yup.object().shape({
      title: Yup.string().required("Lesson title is required").max(100),
      description: Yup.string().required("Lesson description is required").max(500),
      video: Yup.mixed()
        .required("Video file is required")
        .test(
          "fileType",
          "Only video files are allowed",
          (value) =>
            typeof value === "string" || // ✅ Skip validation if already a string (URL or filename)
            (value &&
              value instanceof File &&
              ["video/mp4", "video/mov", "video/avi", "video/mkv"].includes(value.type))
        ),
      duration: Yup.string()
        .required("Duration is required")
        .matches(/^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$/, "Duration must be in HH:MM:SS format"),
    })
  )
  .min(1, "At least one lesson is required"),

  // lessons: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       title: Yup.string().required("Lesson title is required").max(100),
  //       description: Yup.string().required("Lesson description is required").max(500),
  //       video: Yup.mixed()
  //         .required("Video file is required")
  //         .test(
  //           "fileType",
  //           "Only video files are allowed",
  //           (value) =>
  //             value &&
  //             value instanceof File &&
  //             ["video/mp4", "video/mov", "video/avi", "video/mkv"].includes(value.type)
  //         ),
  //       duration: Yup.string()
  //         .required("Duration is required")
  //         .matches(/^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$/, "Duration must be in HH:MM:SS format"),
  //     })
  //   )
  //   .min(1, "At least one lesson is required"), 
});
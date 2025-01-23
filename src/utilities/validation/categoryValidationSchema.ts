import * as Yup from 'yup';

export const categoryValidationSchema = Yup.object({
    name: Yup.string().required("Category name is required").min(3, "Name should have at least 3 characters"),
    description: Yup.string().required("Description is required").min(10, "Description should have at least 10 characters"),
    image: Yup.string().required("Image is required"),
  });
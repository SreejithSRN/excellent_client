import React, { useEffect, useState } from "react";
import { Category } from "../../../types";
import { useAppDispatch } from "../../../hooks/accessHook";
import { getCategories } from "../../../redux/store/actions/course/getCategoriesAction";
import { RootState } from "../../../redux";
import { useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// Yup validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .required("Course title is required")
    .min(3, "Course title must be at least 3 characters")
    .matches(/^[^\s].*$/, "Course title cannot start with a space"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .matches(/^[^\s].*$/, "Description cannot start with a space"),
  category: Yup.string().required("Category is required"),
  level: Yup.string().required("Level is required"),
  language: Yup.string().required("Language is required"),
});

interface BasicCourseInfoProps {
  courseData: any;
  onCourseDataChange: (newData: any) => void;
}

const BasicCourseInfo: React.FC<BasicCourseInfoProps> = ({
  courseData,
  onCourseDataChange,
}) => {
  const { data } = useSelector((state: RootState) => state.user);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await dispatch(getCategories({ page: 1, limit: 1000 }));
        if (response.payload.success) {
          const filteredCategories = response.payload.data.filter(
            (category: Category) => !category.isBlocked
          );
          setCategories(filteredCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [dispatch]);

  return (
    <Formik
      initialValues={courseData}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize={true}
      onSubmit={(values) => {
        onCourseDataChange(values);
      }}
    >
      {({
        
        errors,
        touched,
        
      }) => (
        <Form className="space-y-4">
          {/* Course Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Title
            </label>
            <Field
              type="text"
              name="title"
              className="mt-1 block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
            />
            {touched.title && errors.title && typeof errors.title === "string" && (
  <p className="text-red-500 text-sm">{errors.title}</p>
)}

          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
            />
           {touched.description && errors.description && typeof errors.description === "string" && (
  <p className="text-red-500 text-sm">{errors.description}</p>
)}
          </div>
          


          {/* Category and Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Field
                as="select"
                name="category"
                className="mt-1 block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="" disabled>
                  {loadingCategories
                    ? "Loading categories..."
                    : "Select a category"}
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              {touched.category && errors.category && typeof errors.category === "string" && (
  <p className="text-red-500 text-sm">{errors.category}</p>
)}

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Level
              </label>
              <Field
                as="select"
                name="level"
                className="mt-1 block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a level
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Field>
              {touched.level && errors.level && typeof errors.level === "string" && (
                <p className="text-red-500 text-sm">{errors.level}</p>
              )}
            </div>
          </div>

          {/* Language and Instructor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <Field
                as="select"
                name="language"
                className="mt-1 block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a language
                </option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="malayalam">Malayalam</option>
              </Field>
              {touched.language && errors.language && typeof errors.language === "string" && (
                <p className="text-red-500 text-sm">{errors.language}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instructor Name
              </label>
              <input
                className="mt-1 block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
                value={data?.name}
                disabled
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BasicCourseInfo;

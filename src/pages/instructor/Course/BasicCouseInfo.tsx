import React, { useEffect, useState } from "react";
import { Category } from "../../../types";
import { useAppDispatch } from "../../../hooks/accessHook";
import { getCategories } from "../../../redux/store/actions/course/getCategoriesAction";
import { RootState } from "../../../redux";
import { useSelector } from "react-redux";
import { Field} from "formik";

interface BasicCourseInfoProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  touched: any;
  errors: any;
}

const BasicCourseInfo: React.FC<BasicCourseInfoProps> = ({

  touched,
  errors,
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
    <div className="space-y-4">
      {/* Course Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Title
        </label>
        <Field
          type="text"
          name="title"
          className={`mt-1 block w-full rounded-md border-2 shadow-md 
            ${touched.title && errors.title ? "border-red-500" : "border-gray-200"}`}
        />
        {touched.title && errors.title && (
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
          className={`mt-1 block w-full rounded-md border-2 shadow-md 
            ${touched.description && errors.description ? "border-red-500" : "border-gray-200"}`}
        />
        {touched.description && errors.description && (
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
            className={`mt-1 block w-full rounded-md border-2 shadow-md 
              ${touched.category && errors.category ? "border-red-500" : "border-gray-200"}`}
          >
            <option value="" disabled>
              {loadingCategories ? "Loading categories..." : "Select a category"}
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Field>
          {touched.category && errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <Field
            as="select"
            name="level"
            className={`mt-1 block w-full rounded-md border-2 shadow-md 
              ${touched.level && errors.level ? "border-red-500" : "border-gray-200"}`}
          >
            <option value="" disabled>
              Select a level
            </option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Advanced</option>
          </Field>
          {touched.level && errors.level && (
            <p className="text-red-500 text-sm">{errors.level}</p>
          )}
        </div>
      </div>

      {/* Language and Instructor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <Field
            as="select"
            name="language"
            className={`mt-1 block w-full rounded-md border-2 shadow-md 
              ${touched.language && errors.language ? "border-red-500" : "border-gray-200"}`}
          >
            <option value="" disabled>
              Select a language
            </option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="malayalam">Malayalam</option>
          </Field>
          {touched.language && errors.language && (
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
    </div>
  );
};

export default BasicCourseInfo;
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import ImageUpload from "../../utilities/axios/cloudinary";
import { categoryValidationSchema } from "../../utilities/validation/categoryValidationSchema";
import { addCategory } from "../../redux/store/actions/course/addCategoryAction";
import { useAppDispatch } from "../../hooks/accessHook";
import { Category } from "../../types";

const AddCategoryModal = ({
  isOpen,
  onClose,
  onSuccess,
  category,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  category: Category | null;
}) => {
  const [uploading, setUploading] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      _id: category?._id || "",
      name: category?.name || "",
      description: category?.description || "",
      image: category?.image || "",
    },
    validationSchema: categoryValidationSchema,
    validateOnBlur: true, // Enable validation when losing focus
    validateOnChange: false, // Disable validation on field change for better control
    onSubmit: async (values) => {
      // Trigger validation for all fields
      const errors = await formik.validateForm();
      if (Object.keys(errors).length > 0) {
        formik.setTouched({
          name: true,
          description: true,
          image: true,
        });
        return;
      }
      console.log(values); // Replace with API logic
      const result = await dispatch(addCategory(values));
      if (result.payload.data === "Category updated sucessfully.....") {
        // toast.success(result.payload.data)
        onSuccess(result.payload.data);
        onClose();
      } else {
        toast.error(result.payload.data);
      }

      console.log(result, "iam from addcategorymodal ... testing  ....");
      // Close modal after submission
    },
  });

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      // Handle cancel or no image selected case
      formik.setFieldValue("image", "");
      formik.setFieldTouched("image", false); // Reset touched state for image
      formik.validateField("image"); // Revalidate image field
      return;
    }

    const imageFile = e.target.files[0];
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];

    // Validate image format
    if (!validImageTypes.includes(imageFile.type)) {
      toast.error(
        "Invalid image format. Please upload a PNG, JPEG, or JPG file."
      );
      return;
    }

    try {
      setUploading(true); // Indicate uploading state
      const uploadedImageUrl = await ImageUpload(imageFile);
      if (uploadedImageUrl) {
        // Set the image URL in Formik and mark the field as touched
        formik.setFieldValue("image", uploadedImageUrl);
        formik.setFieldTouched("image", false); // Mark the field as touched

        // Manually trigger validation for the entire form
        await formik.validateForm(); // This will revalidate all fields
      } else {
        toast.error("Failed to upload the image. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to upload the image. Please try again.");
      console.error("Image upload error:", error);
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* <ToastContainer /> */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-1 p-2 border rounded-lg ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              } focus:outline-none focus:ring focus:ring-blue-300`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-1 p-2 border rounded-lg ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              } focus:outline-none focus:ring focus:ring-blue-300`}
              rows={3}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Image Upload Field */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Add Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              onBlur={() => formik.setFieldTouched("image", true)} // Mark as touched on blur
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              disabled={uploading}
            />
            {uploading && (
              <p className="text-sm text-gray-500 mt-2">Uploading image...</p>
            )}
            {formik.touched.image && formik.errors.image && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.image}</p>
            )}
          </div>

          {/* Image Preview */}
          {formik.values.image && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image Preview
              </label>
              <div className="mt-2">
                <img
                  src={formik.values.image}
                  alt="Category Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            {category ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                disabled={uploading}
              >
                Edit Category
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                disabled={uploading}
              >
                Add Category
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;

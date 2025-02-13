import React, { useState } from "react";
import { Upload } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormikErrors, FormikTouched } from "formik";

interface FormValues {
  thumbnail: File | null;
}

interface ThumbnailUploadProps {
  values: FormValues;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  touched: FormikTouched<FormValues>;
  errors: FormikErrors<FormValues>;
}

const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
  values,
  setFieldValue,
  touched,
  errors,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] || null;

    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("Unsupported file type! Please upload PNG, JPG, or GIF.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB! Please upload a smaller file.");
        return;
      }

      setFieldValue("thumbnail", file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    } else {
      setFieldValue("thumbnail", null);
      setImagePreview(null);
    }
  };

  return (
    <div>
      <ToastContainer />
      <label className="block text-sm font-medium text-gray-700">Thumbnail</label>

      {/* Dashed border upload area */}
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />

          <div className="flex text-sm text-gray-600 justify-center">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
              <span>Upload a file</span>
              <input
                type="file"
                className="sr-only"
                name="thumbnail"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Thumbnail Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}

          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      {/* Display error below the upload area */}
      {errors.thumbnail && touched.thumbnail && (
        <p className="mt-2 text-xs text-red-600">{errors.thumbnail}</p>
      )}
    </div>
  );
};

export default ThumbnailUpload;
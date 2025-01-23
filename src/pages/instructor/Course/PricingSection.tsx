import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const PricingSection: React.FC = () => {
  // Formik validation schema
  const validationSchema = Yup.object({
    pricingType: Yup.string().required("Pricing type is required."),
    price: Yup.number()
      .typeError("Price must be a number.")
      .positive("Price must be a positive number.")
      .integer("Price must be an integer.")
      .required("Price is required."),
  });

  const formik = useFormik({
    initialValues: {
      pricingType: "",
      price: "",
    },
    validationSchema,
    validateOnChange: true, // Validate fields as they are updated
    validateOnBlur: true, // Validate fields when they lose focus
    onSubmit: () => {}, // No action needed for submission
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Pricing Type
        </label>
        <select
          id="pricingType"
          name="pricingType"
          value={formik.values.pricingType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a pricing type
          </option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        {formik.touched.pricingType && formik.errors.pricingType && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.pricingType}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter price"
          className="mt-1 block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
        )}
      </div>
    </div>
  );
};

export default PricingSection;




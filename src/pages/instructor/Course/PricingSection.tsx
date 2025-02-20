import React, { useEffect } from "react";
import { Field, ErrorMessage } from "formik";

interface PricingSectionProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  touched: any;
  errors: any;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  values,
  setFieldValue,
  touched,
  errors,
}) => {
  // ✅ Handle setting price to 0 when editing and pricingType is free
  useEffect(() => {
    if (values.pricingType === "free" && values.price !== 0) {
      setFieldValue("price", 0);
    }
  }, [values.pricingType, values.price, setFieldValue]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Pricing Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Pricing Type
        </label>
        <Field
          as="select"
          name="pricingType"
          className={`mt-1 block w-full rounded-md border-2 shadow-md 
            ${touched.pricingType && errors.pricingType ? "border-red-500" : "border-gray-200"}`}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedValue = e.target.value;
            setFieldValue("pricingType", selectedValue);

            // ✅ If "free" is selected, set price to 0 automatically
            if (selectedValue === "free") {
              setFieldValue("price", 0);
            } else {
              setFieldValue("price", values.price || ""); // Restore existing price if available
            }
          }}
        >
          <option value="" disabled>
            Select a pricing type
          </option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </Field>
        <ErrorMessage name="pricingType" component="p" className="text-red-500 text-sm mt-1" />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <Field
          type="number"
          name="price"
          placeholder="Enter price"
          value={values.price ?? ""} // ✅ Ensure value is displayed properly
          disabled={values.pricingType === "free"} // Disable if pricing type is free
          className={`mt-1 block w-full rounded-md border-2 shadow-md 
            ${touched.price && errors.price ? "border-red-500" : "border-gray-200"} 
            ${values.pricingType === "free" ? "bg-gray-100 cursor-not-allowed" : ""}`}
        />
        <ErrorMessage name="price" component="p" className="text-red-500 text-sm mt-1" />
      </div>
    </div>
  );
};

export default PricingSection;






















// import React from "react";
// import { Field, ErrorMessage } from "formik";


// interface PricingSectionProps {
//   values: any;
//   setFieldValue: (field: string, value: any) => void;
//   touched: any;
//   errors: any;
// }

// const PricingSection: React.FC<PricingSectionProps> = ({
//   values,
//   setFieldValue,
//   touched,
//   errors,
// }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {/* Pricing Type */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Pricing Type
//         </label>
//         <Field
//           as="select"
//           name="pricingType"
//           className={`mt-1 block w-full rounded-md border-2 shadow-md 
//             ${touched.pricingType && errors.pricingType ? "border-red-500" : "border-gray-200"}`}
//           onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
//             const selectedValue = e.target.value;
//             setFieldValue("pricingType", selectedValue);

//             // If "free" is selected, set price to 0 automatically
//             if (selectedValue === "free") {
//               setFieldValue("price", 0);
//             } else {
//               setFieldValue("price", ""); // Reset price if paid is selected
//             }
//           }}
//         >
//           <option value="" disabled>
//             Select a pricing type
//           </option>
//           <option value="free">Free</option>
//           <option value="paid">Paid</option>
//         </Field>
//         <ErrorMessage name="pricingType" component="p" className="text-red-500 text-sm mt-1" />
//       </div>

//       {/* Price */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Price</label>
//         <Field
//           type="number"
//           name="price"
//           placeholder="Enter price"
//           disabled={values.pricingType === "free"} // Disable if pricing type is free
//           className={`mt-1 block w-full rounded-md border-2 shadow-md 
//             ${touched.price && errors.price ? "border-red-500" : "border-gray-200"} 
//             ${values.pricingType === "free" ? "bg-gray-100 cursor-not-allowed" : ""}`}
//         />
//         <ErrorMessage name="price" component="p" className="text-red-500 text-sm mt-1" />
//       </div>
//     </div>
//   );
// };

// export default PricingSection;
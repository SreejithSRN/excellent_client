// import React from "react";
// import { useSelector } from "react-redux";
// import { useFormik } from "formik";
// import { RootState } from "../../redux";
// import { profileSchema } from "../../utilities/validation/profileSchema";


// const StudentsEditProfile: React.FC = () => {
//   const { data } = useSelector((state: RootState) => state.user);

//   const formik = useFormik({
//     initialValues: {
//       username: data?.name || "",
//       email: data?.email || "",
//       firstName: data?.firstName || "",
//       lastName: data?.lastName || "",
//       gender: data?.profile?.gender || "male",
//       dateOfBirth: data?.profile?.dateOfBirth || "",
//       phone: data?.contact?.phone || "",
//       address: data?.contact?.address || "",
//       cv: "",
//       role:data?.role
//     },
//     validationSchema:  profileSchema,
//     onSubmit: (values) => {
//       console.log("Updated Profile Data:", values);


//       alert("Profile updated successfully!");
//     },
//   });

//   return (
//     <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
//         <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//           Edit Profile
//         </h1>
//         <form onSubmit={formik.handleSubmit} className="space-y-6">
//           {/* Username (Read-Only) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={formik.values.username}
//               readOnly
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 shadow-sm focus:outline-none"
//             />
//           </div>

//           {/* Email (Read-Only) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formik.values.email}
//               readOnly
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 shadow-sm focus:outline-none"
//             />
//           </div>

//           {/* Editable Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* First Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formik.values.firstName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               {formik.touched.firstName && formik.errors.firstName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.firstName}
//                 </p>
//               )}
//             </div>

//             {/* Last Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formik.values.lastName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               {formik.touched.lastName && formik.errors.lastName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.lastName}
//                 </p>
//               )}
//             </div>

//             {/* Gender */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Gender
//               </label>
//               <select
//                 name="gender"
//                 value={formik.values.gender}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             {/* Date of Birth */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formik.values.dateOfBirth}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 max={(() => {
//                   const today = new Date();
//                   today.setFullYear(today.getFullYear() - 18); // Subtract 18 years
//                   return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
//                 })()}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.dateOfBirth}
//                 </p>
//               )}
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Phone
//               </label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formik.values.phone}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               {formik.touched.phone && formik.errors.phone && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.phone}
//                 </p>
//               )}
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Address
//               </label>
//               <textarea
//                 name="address"
//                 value={formik.values.address}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               ></textarea>
//               {formik.touched.address && formik.errors.address && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.address}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* CV */}
//           {data?.role === "instructor" && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 CV
//               </label>
//               <input
//                 type="text"
//                 name="cv"
//                 value={formik.values.cv}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               {formik.touched.cv && formik.errors.cv && (
//                 <p className="text-red-500 text-sm mt-1">{formik.errors.cv}</p>
//               )}
//             </div>
//           )}

//           {/* Change Password Button */}
//           <div className="text-right">
//             <button
//               type="button"
//               className="text-indigo-600 hover:text-indigo-700 font-semibold transition duration-300"
//               onClick={() => alert("Navigate to Change Password")}
//             >
//               Change Password
//             </button>
//           </div>

//           {/* Save Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-indigo-600 text-white text-lg px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentsEditProfile;

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import logo from "../../assets/EXCELLENT LOGO.png";
import { signupValidationSchema } from "../../utilities/validation/signUpSchema";
import { useAppDispatch } from "../../hooks/accessHook";
import { signupAction } from "../../redux/store/actions/auth/signUpAction";
import { Role, SignupFormData } from "../../types/IForm";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux";
import { verifyOtpAction } from "../../redux/store/actions/auth/verifyOtpAction";
import { resendOtpAction } from "../../redux/store/actions/auth/resentOtpAction";
import OTPVerification from "../../components/auth/OTPVerification";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  setShowNavbar: (value: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({ setShowNavbar }) => {
  const dispatch = useAppDispatch();
  // const { data } = useSelector((state: RootState) => state.user);
  const pData = localStorage.getItem("userData");
const data= pData ? JSON.parse(pData) : null;



  // const data= JSON.parse(localStorage.getItem("userData"))
  
  // alert(data);
  const navigate = useNavigate();

  // Load OTP visibility and form data from localStorage
  const [isOTPVisible, setIsOTPVisible] = useState<boolean>(
    localStorage.getItem("isOTPVisible") === "true"
  );

  const savedFormData = localStorage.getItem("formData");
  const initialFormValues: SignupFormData = savedFormData
    ? JSON.parse(savedFormData)
    : {
        name: "",
        email: "",
        role: Role.Student,
        password: "",
        confirmPassword: "",
      };

  // Sync OTP visibility state with localStorage
  useEffect(() => {
    localStorage.setItem("isOTPVisible", JSON.stringify(isOTPVisible));
  }, [isOTPVisible]);

  // Track navbar visibility and persist in localStorage
  useEffect(() => {
    if (isOTPVisible) {
      setShowNavbar(false);
      localStorage.setItem("showNavbar", "false");
    } else {
      const storedNavbarState = localStorage.getItem("showNavbar");
      setShowNavbar(storedNavbarState !== "false");
    }
  }, [isOTPVisible, setShowNavbar]);

 // Ensure user data is correctly stored after signup:
const handleSignup = async (values: SignupFormData) => {
  try {
    const response = await dispatch(signupAction(values));
    if (response?.payload?.success) {
      toast.success("OTP sent successfully");
      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(response.payload.data));
      setIsOTPVisible(true);
    } else if (!response?.payload?.success) {
      toast.error(response?.payload?.message);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    toast.error(errorMessage);
  }
};


  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      handleSignup(values);
      // Persist form data to localStorage
      localStorage.setItem("formData", JSON.stringify(values));
    },
  });

  const handleOTPSubmit = async (otp: string) => {
    try {     
      const result = await dispatch(verifyOtpAction({ data, otp }));    
      if (result.payload.success) {
        setShowNavbar(true);
        toast.success("OTP Verified Successfully!");
        localStorage.clear()
        navigate("/", {
          state: {
            message: "Welcome! Please login using your credentials",
          },
        });
      } else {
        toast.error(result.payload.message || "OTP Verification Failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  const resendOTP = async (email: string | null) => {
    try {
      const result = await dispatch(resendOtpAction(email));
      if (result.payload.success) {
        toast.success("OTP resent successfully!");
      } else {
        toast.error("OTP resend failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <ToastContainer />
      {isOTPVisible ? (
        <OTPVerification
          onSubmit={handleOTPSubmit}
          resendOTP={() => resendOTP(data?.email || null)}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl flex flex-col lg:flex-row items-center p-6 lg:p-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 lg:space-y-0 lg:space-x-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <img src={logo} alt="Logo" className="w-48 mx-auto lg:mx-0" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-6">
                Join Excellent Today
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Sign up to access the best learning platform.
              </p>
            </div>
            <div className="w-full lg:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Signup</h2>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500"
                    {...formik.getFieldProps("role")}
                  >
                    <option value={Role.Student}>Student</option>
                    <option value={Role.Instructor}>Instructor</option>
                  </select>
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;








// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import logo from "../../assets/EXCELLENT LOGO.png";
// import { signupValidationSchema } from "../../utilities/validation/signUpSchema";
// import { useAppDispatch } from "../../hooks/accessHook";
// import { signupAction } from "../../redux/store/actions/auth/signUpAction";
// import { Role, SignupFormData } from "../../types/IForm";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux";
// import { verifyOtpAction } from "../../redux/store/actions/auth/verifyOtpAction";
// import { resendOtpAction } from "../../redux/store/actions/auth/resentOtpAction";
// import OTPVerification from "../../components/auth/OTPVerification";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// interface SignupProps {
//   setShowNavbar: (value: boolean) => void;
// }

// const Signup: React.FC<SignupProps> = ({ setShowNavbar }) => {
//   const dispatch = useAppDispatch();
//   const { data } = useSelector((state: RootState) => state.user);
//   const navigate = useNavigate();

//   // Load OTP visibility status from localStorage when component mounts
//   const [isOTPVisible, setIsOTPVisible] = useState<boolean>(() => {
//     const storedOTPVisible = localStorage.getItem("isOTPVisible");
//     return storedOTPVisible ? JSON.parse(storedOTPVisible) : false;
//   });

//   const handleSignup = async (values: SignupFormData) => {
//     try {
//       const response = await dispatch(signupAction(values));
//       if (response?.payload?.success) {
//         toast.success("OTP sent successfully");
//         setIsOTPVisible(true); // Show OTP form
//         setShowNavbar(false);
//         // Store OTP visibility in localStorage when OTP is shown
//         localStorage.setItem("isOTPVisible", "true");
//       } else {
//         toast.error(response?.payload?.message);
//         setIsOTPVisible(false); // Hide OTP form on failure
//         localStorage.removeItem("isOTPVisible"); // Clear OTP visibility from localStorage on failure
//       }
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An unknown error occurred.";
//       toast.error(errorMessage);
//       setIsOTPVisible(false); // Hide OTP form on failure
//       localStorage.removeItem("isOTPVisible"); // Clear OTP visibility from localStorage on failure
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       role: Role.Student,
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: signupValidationSchema,
//     onSubmit: handleSignup,
//   });

//   const handleOTPSubmit = async (otp: string) => {
//     try {
//       const result = await dispatch(verifyOtpAction({ data, otp }));
//       if (result.payload.success) {
//         setShowNavbar(true);
//         toast.success("OTP Verified Successfully!");
//         navigate("/", {
//           state: {
//             message: "Welcome! Please login using your credentials",
//           },
//         });
//         // Clear OTP visibility from localStorage after OTP is successfully verified
//         localStorage.removeItem("isOTPVisible");
//       } else {
//         toast.error(result.payload.message || "OTP Verification Failed");
//       }
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An unknown error occurred.";
//       toast.error(errorMessage);
//       // Clear OTP visibility from localStorage in case of failure
//       localStorage.removeItem("isOTPVisible");
//     }
//   };

//   const resendOTP = async (email: string | null) => {
//     try {
//       const result = await dispatch(resendOtpAction(email));
//       if (result.payload.success) {
//         toast.success("OTP resent successfully!");
//       } else {
//         toast.error("OTP resend failed");
//       }
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An unknown error occurred.";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       {isOTPVisible ? (
//         <OTPVerification
//           onSubmit={handleOTPSubmit}
//           resendOTP={() => resendOTP(data?.email || null)}
//         />
//       ) : (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900">
//           <div className="max-w-4xl flex flex-col lg:flex-row items-center p-6 lg:p-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 lg:space-y-0 lg:space-x-12">
//             <div className="w-full lg:w-1/2 text-center lg:text-left">
//               <img src={logo} alt="Logo" className="w-48 mx-auto lg:mx-0" />
//               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-6">
//                 Join Excellent Today
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 mt-2">
//                 Sign up to access the best learning platform.
//               </p>
//             </div>
//             <div className="w-full lg:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 p-8 rounded-lg">
//               <h2 className="text-2xl font-semibold text-white mb-4">Signup</h2>
//               <form onSubmit={formik.handleSubmit} className="space-y-4">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Username"
//                     className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500"
//                     {...formik.getFieldProps("name")}
//                   />
//                   {formik.touched.name && formik.errors.name && (
//                     <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
//                   )}
//                 </div>
//                 <div>
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500"
//                     {...formik.getFieldProps("email")}
//                   />
//                   {formik.touched.email && formik.errors.email && (
//                     <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
//                   )}
//                 </div>
//                 <div>
//                   <select
//                     className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500"
//                     {...formik.getFieldProps("role")}
//                   >
//                     <option value={Role.Student}>Student</option>
//                     <option value={Role.Instructor}>Instructor</option>
//                   </select>
//                 </div>
//                 <div>
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500"
//                     {...formik.getFieldProps("password")}
//                   />
//                   {formik.touched.password && formik.errors.password && (
//                     <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
//                   )}
//                 </div>
//                 <div>
//                   <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500"
//                     {...formik.getFieldProps("confirmPassword")}
//                   />
//                   {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                     <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
//                   )}
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
//                 >
//                   Signup
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Signup;


























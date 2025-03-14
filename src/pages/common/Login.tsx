import React, { useEffect } from "react";
import logo from "../../assets/EXCELLENT LOGO.png";
import { Link,  useLocation,  useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../utilities/validation/logInSchema"; // Update path as needed
import { useAppDispatch } from "../../hooks/accessHook";
import { loginAction } from "../../redux/store/actions/auth/loginAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate=useNavigate()
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      // Clear the message from history state after displaying
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit:async (values) => {
      const response= await dispatch(loginAction(values))
      if(response?.payload?.success){
        const userRole = response.payload.data.role.toLowerCase();
        // console.log(userRole,"haiiiiiiiiiiiiiiiiiiiiii")
        // toast.error(response?.payload?.message)
        navigate(`/${userRole}`, { replace: true });

      }else{
        toast.error(response?.payload?.message)        
      }
      // console.log(response, "araaaa avideeee.....")     
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900">
       <ToastContainer />
      <div className="max-w-4xl flex flex-col lg:flex-row items-center p-6 lg:p-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 lg:space-y-0 lg:space-x-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <img src={logo} alt="Logo" className="w-48 mx-auto lg:mx-0" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-6">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Log in to continue your journey.
          </p>
        </div>

        <div className="w-full lg:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/forgotpassword" className="text-sm text-blue-200 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="text-center mt-4 text-sm text-white">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-200 hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



































// import React from "react";
// import logo from "../../assets/EXCELLENT LOGO.png";
// import { Link } from "react-router-dom";
// import { useFormik } from "formik";
// import { loginValidationSchema } from "../../utilities/validation/logInSchema"; // Update path as needed

// const Login: React.FC = () => {
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: loginValidationSchema,
//     onSubmit: (values) => {
//       console.log("Form Submitted:", values);
//     },
//   });

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-red-300">
//       <div className="w-full max-w-screen-lg flex flex-row items-center space-x-10">
//         <div className="flex flex-col items-center w-1/2">
//           <img src={logo} alt="Excellent Logo" className="w-100 h-100 mb-4" />
//         </div>

//         <div className="bg-red-800 rounded-lg shadow-lg p-8 w-full max-w-md text-white">
//           <h2 className="text-2xl font-semibold mb-1">Login</h2>
//           <p className="text-sm mb-6">Glad you're back!</p>

//           <form onSubmit={formik.handleSubmit} className="space-y-4">
//             {/* Email Field */}
//             <div>
//               <input
//                 type="text"
//                 name="email"
//                 placeholder="Email"
//                 className={`w-full px-4 py-2 bg-red-700 border rounded-lg focus:outline-none ${
//                   formik.touched.email && formik.errors.email
//                     ? "border-red-500"
//                     : "border-red-600"
//                 }`}
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.email && formik.errors.email && (
//                 <div className="text-sm text-red-500 mt-1">
//                   {formik.errors.email}
//                 </div>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 className={`w-full px-4 py-2 bg-red-700 border rounded-lg focus:outline-none ${
//                   formik.touched.password && formik.errors.password
//                     ? "border-red-500"
//                     : "border-red-600"
//                 }`}
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.password && formik.errors.password && (
//                 <div className="text-sm text-red-500 mt-1">
//                   {formik.errors.password}
//                 </div>
//               )}
//             </div>
            
//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white"
//             >
//               Login
//             </button>

//             {/* Forgot Password */}
//             <div className="text-center mt-4">
//               <a href="#" className="text-sm text-blue-400 hover:underline">
//                 Forgot password?
//               </a>
//             </div>

//             {/* Divider */}
//             <div className="flex items-center justify-center my-4">
//               <hr className="w-full border-red-700" />
//               <span className="px-2 text-sm text-red-300">or</span>
//               <hr className="w-full border-red-700" />
//             </div>

//             {/* Google Login */}
//             <div className="flex items-center justify-center mt-4">
//               <button
//                 type="button"
//                 className="flex items-center space-x-2 text-red-300 hover:text-white"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M21.35 11.1h-9.4v2.9h5.65c-.25 1.6-1.4 2.95-3.15 3.4v2.85h5.05c2.95-2.75 3.8-6.85 1.85-10.55z" />
//                 </svg>
//                 <span>Sign in with Google</span>
//               </button>
//             </div>

//             {/* Signup Link */}
//             <div className="text-center mt-4 text-sm text-red-300">
//               <p>
//                 Don't have an account?{" "}
//                 <Link to="/signup" className="text-blue-400 hover:underline">
//                   Signup
//                 </Link>
//               </p>
              
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;














































// import React from "react"
// import logo from "../../assets/EXCELLENT LOGO.png"
// import { Link } from 'react-router-dom'
// import { useFormik } from "formik"

// const Login:React.FC=()=> {

//   const formik = useFormik({
//     initialValues:{
//       email:"",
//       password:""
//     }
//   }),
//   validationSchema:loginva
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-red-300">
//     <div className="w-full max-w-screen-lg flex flex-row items-center space-x-10">
//       <div className="flex flex-col items-center w-1/2">
//         <img src={logo} alt="Excellent Logo" className="w-100 h-100 mb-4" />
//       </div>

//       <div className="bg-red-800 rounded-lg shadow-lg p-8 w-full max-w-md text-white ">
//         <h2 className="text-2xl font-semibold mb-1">Login</h2>
//         <p className="text-sm mb-6">Glad you're back!</p>

//         <form className="space-y-4">
//           <div>
//             <input
//               type="text"
//               placeholder="Username"
//               className="w-full px-4 py-2 bg-red-700 border border-red-600 rounded-lg focus:outline-none focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-2 bg-red-700 border border-red-600 rounded-lg focus:outline-none focus:border-blue-400"
//             />
//           </div>

//           <div className="flex items-center">
//             <input type="checkbox" id="remember" className="mr-2" />
//             <label htmlFor="remember" className="text-sm">
//               Remember me
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white"
//           >
//             Login
//           </button>

//           <div className="text-center mt-4">
//             <a href="#" className="text-sm text-blue-400 hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           <div className="flex items-center justify-center my-4">
//             <hr className="w-full border-red-700" />
//             <span className="px-2 text-sm text-red-300">or</span>
//             <hr className="w-full border-red-700" />
//           </div>

//           <div className="flex items-center justify-center mt-4">
//             <button
//               type="button"
//               className="flex items-center space-x-2 text-red-300 hover:text-white"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M21.35 11.1h-9.4v2.9h5.65c-.25 1.6-1.4 2.95-3.15 3.4v2.85h5.05c2.95-2.75 3.8-6.85 1.85-10.55z" />
//               </svg>
//               <span>Sign in with Google</span>
//             </button>
//           </div>

//           <div className="text-center mt-4 text-sm text-red-300">
//             <p>
//               Don't have an account?{" "}
//               <Link to ="/signup"
//               className="text-blue-400 hover:underline">
//                 Signup
//               </Link>
//             </p>
//             <div className="flex justify-center space-x-4 mt-2">
//               <a href="#" className="hover:underline">
//                 Terms & Conditions
//               </a>
//               <a href="#" className="hover:underline">
//                 Support
//               </a>
//               <a href="#" className="hover:underline">
//                 Customer Care
//               </a>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>


//   )
// }

// export default Login

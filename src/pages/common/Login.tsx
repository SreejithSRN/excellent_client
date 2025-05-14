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
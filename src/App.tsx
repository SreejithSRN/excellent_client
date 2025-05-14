import Navbar from "./components/common/Navbar";
import { ThemeProvider } from "./hooks/ThemeContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Footer from "./components/common/Footer";
import Landing from "./components/common/Landing";
import ContactUs from "./pages/common/ContactUs";
import AboutUs from "./pages/common/AboutUs";
import Login from "./pages/common/Login";
import Signup from "./pages/common/Signup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux";
import StudentRoutes from "./routes/StudentRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import { useAppDispatch } from "./hooks/accessHook";
import { getUserDataAction, logoutAction } from "./redux/store/actions/auth";
import RegistrationForm from "./pages/admin/RegistrationForm";
import ForgotPassword from "./pages/common/ForgotPassword";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import CourseDetails from "./pages/common/CourseDetails";
import StudentSuccessPage from "./pages/student/StudentSuccessPage";
import StudentFailurePage from "./pages/student/StudentFailurePage";




function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthenticated = [
    "/",
    "/courses",
    "/contact",
    "/about",
    "/login",
    "/signup",
  ].some((path) => location.pathname.includes(path));

  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const [showNavbar, setShowNavbar] = useState(true);
  useEffect(() => {
    if (!data) {
      dispatch(getUserDataAction());
      console.log(data, "iam from app useEffect");
    } else if (data.isBlocked && data.isRejected) {
      dispatch(logoutAction());
    }
  }, [dispatch, data]);

  const isPaymentRoute = ["/payment/success", "/payment/failure"].some((path) =>
    location.pathname.includes(path)
  );


  const isProtectedRoute = ["/student", "/admin", "/instructor"].some((path) =>
    location.pathname.includes(path)
  );

  const shouldShowNavbar = isAuthenticated && !isProtectedRoute && !isPaymentRoute;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {showNavbar && shouldShowNavbar ? <Navbar /> : null}
      

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              data ? <Navigate to={getRedirectPath(data.role)} /> : <Landing />
            }
          />
          {/* <Route path="/courses" element={<Courses />} /> */}
          <Route path="/courses" element={<InstructorCourses/>} />
          <Route path="/detailcourses/:id" element={<CourseDetails/>} />
          {/* <Route path="/reviewbeforelogin/:id" element={<ReviewSection/>} /> */}
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/payment/success" element={<StudentSuccessPage/>} />
          <Route path="/payment/failure" element={<StudentFailurePage/>} />
          <Route
            path="/signup"
            element={<Signup setShowNavbar={setShowNavbar} />}
          />

          <Route
            path="/student/*"
            element={
              data && data.role === "student" ? (
                <StudentRoutes />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/*"
            element={
              data && data.role === "admin" ? (
                <AdminRoutes />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/instructor/*"
            element={
              data && data.role === "instructor" ? (
                data.isVerified && data.isRequested && !data.isRejected ? (
                  <InstructorRoutes />
                ) : (
                  <RegistrationForm />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function getRedirectPath(role: string | undefined) {
  switch (role) {
    case "admin":
      return "/admin";
    case "instructor":
      return "/instructor";
    case "student":
      return "/student";
    default:
      return "/";
  }
}

export default App;







// import Navbar from "./components/common/Navbar";
// import { ThemeProvider } from "./hooks/ThemeContext";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import "./index.css";
// import Footer from "./components/common/Footer";
// import Landing from "./components/common/Landing";
// import ContactUs from "./pages/common/ContactUs";
// import AboutUs from "./pages/common/AboutUs";
// import Login from "./pages/common/Login";
// import Signup from "./pages/common/Signup";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "./redux";
// import StudentRoutes from "./routes/StudentRoutes";
// import AdminRoutes from "./routes/AdminRoutes";
// import InstructorRoutes from "./routes/InstructorRoutes";
// import Courses from "./pages/common/Courses";
// import { useAppDispatch } from "./hooks/accessHook";
// import { getUserDataAction, logoutAction } from "./redux/store/actions/auth";
// import RegistrationForm from "./pages/admin/RegistrationForm";

// function App() {
//   return (
//     <ThemeProvider>
//       <Router>
//         <AppContent />
//       </Router>
//     </ThemeProvider>
//   );
// }

// function AppContent() {
//   const location = useLocation(); // Now it's inside the <Router>
//   const isAuthenticated = [
//     "/",
//     "/courses",
//     "/contact",
//     "/about",
//     "/login",
//     "/signup",
//   ].some((path) => location.pathname.includes(path));

//   const { data } = useSelector((state: RootState) => state.user);
//   const dispatch = useAppDispatch();

//   const [loading, setLoading] = useState(true); // Add loading state to ensure data is fetched

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!data) {
//         await dispatch(getUserDataAction());
//       }
//       setLoading(false); // Set loading to false after fetching
//     };
//     fetchData();
//   }, [dispatch, data]);

//   if (loading) {
//     return <div>Loading...</div>; // Render a loader until data is ready
//   }

//   const isProtectedRoute = ["/student", "/admin", "/instructor"].some((path) =>
//     location.pathname.includes(path)
//   );

//   const shouldShowNavbar = isAuthenticated && !isProtectedRoute;

//   return (
//     <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
//       {shouldShowNavbar ? <Navbar /> : null}

//       <div className="flex-grow">
//         <Routes>
//           {/* Public Routes */}
//           <Route
//             path="/"
//             element={
//               data ? <Navigate to={getRedirectPath(data)} /> : <Landing />
//             }
//           />
//           <Route path="/courses" element={<Courses />} />
//           <Route path="/contact" element={<ContactUs />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/signup"
//             element={<Signup />}
//           />

//           {/* Protected Routes */}
//           <Route
//             path="/student/*"
//             element={
//               data && data.role === "student" ? (
//                 <StudentRoutes />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/admin/*"
//             element={
//               data && data.role === "admin" ? (
//                 <AdminRoutes />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/instructor/*"
//             element={
//               data && data.role === "instructor" ? (
//                 data.isVerified && data.isRequested ? (
//                   <InstructorRoutes />
//                 ) : (
//                   <Navigate to="/instructor/registration" />
//                 )
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/instructor/registration"
//             element={<RegistrationForm />}
//           />
//         </Routes>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// function getRedirectPath(data: any) {
//   if (!data) return "/";
//   if (data.role === "instructor" && (!data.isVerified || !data.isRequested)) {
//     return "/instructor/registration"; // Redirect to registration if not verified/requested
//   }
//   switch (data.role) {
//     case "admin":
//       return "/admin";
//     case "student":
//       return "/student";
//     case "instructor":
//       return "/instructor";
//     default:
//       return "/";
//   }
// }

// export default App;

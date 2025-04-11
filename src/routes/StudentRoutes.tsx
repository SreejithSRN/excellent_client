// import { Route, Routes } from "react-router-dom";
// import StudentDash from "../pages/student/StudentDash";
// import StudentLayout from "../pages/student/StudentLayout";
// import StudentCourses from "../pages/student/StudentCourses";
// import StudentAssessments from "../pages/student/StudentAssessments";
// import StudentsChat from "../pages/student/StudentsChat";
// import StudentsSetting from "../pages/student/StudentsSetting";
// import StudentsProfile from "../pages/student/StudentsProfile";
// import StudentsEditProfile from "../pages/student/StudentsEditProfile";


// // import MyCourses from '../pages/student/MyCourses'; // Example route
// // import Assessments from '../pages/student/Assessments'; // Example route

// function StudentRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<StudentLayout />}>
//         <Route index element={<StudentDash />} />
//         <Route path="mycourses" element={<StudentCourses />} />
//         <Route path="assessments" element={<StudentAssessments />} />
//         <Route path="chat" element={<StudentsChat />} />
//         <Route path="settings" element={<StudentsSetting />} /> 
//         <Route path="profile" element={<StudentsProfile />} />
//         <Route path="edit" element={<StudentsEditProfile/>}/>        
        
//       </Route>
//     </Routes>
//   );
// }

// export default StudentRoutes;

import { Route, Routes } from "react-router-dom";
import StudentDash from "../pages/student/StudentDash";
import StudentLayout from "../pages/student/StudentLayout";
import StudentAssessments from "../pages/student/StudentAssessments";
import StudentsChat from "../pages/student/StudentsChat";
import ProfilePage from "../pages/common/ProfilePage";
import InstructorCourses from "../pages/instructor/InstructorCourses";
import CourseDetails from "../pages/common/CourseDetails";
import PaymentHistory from "../pages/student/PaymentHistory";
import MyCourseDetails from "../pages/common/MyCourseDetails";


function StudentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StudentLayout />}>
        <Route index element={<StudentDash />} />
        <Route path="mycourses" element={<InstructorCourses />} />
        {/* <Route path="courses" element={<InstructorCourses />} /> */}
        <Route path="allcourses" element={<InstructorCourses />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="mycourses/:id" element={<MyCourseDetails/>} />
        <Route path="assessments" element={<StudentAssessments />} />
        <Route path="chat" element={<StudentsChat />} />
        <Route path="purchase" element={<PaymentHistory />} />

     
        {/* <Route path="payment/failure" element={<StudentFailurePage />} />
        <Route path="payment/success" element={<StudentFailurePage />} /> */}
        {/* Profile Route and Nested Edit Profile Route */}
        <Route path="profile/*" >
          <Route index element={<ProfilePage/>}/>
          {/* <Route path="edit" element={<ProfileEditPage/>} /> */}
          
        </Route>
      </Route>
    </Routes>
  );
}

export default StudentRoutes;




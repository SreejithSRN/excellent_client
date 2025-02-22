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
import StudentCourses from "../pages/student/StudentCourses";
import StudentAssessments from "../pages/student/StudentAssessments";
import StudentsChat from "../pages/student/StudentsChat";
import StudentsSetting from "../pages/student/StudentsSetting";
import ProfilePage from "../pages/common/ProfilePage";
import InstructorCourses from "../pages/instructor/InstructorCourses";
import CourseDetails from "../pages/common/CourseDetails";
// import ProfileEditPage from "../pages/common/ProfileEditPage";

function StudentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StudentLayout />}>
        <Route index element={<StudentDash />} />
        <Route path="mycourses" element={<StudentCourses />} />
        <Route path="courses" element={<InstructorCourses />} />
        <Route path="allcourses" element={<InstructorCourses />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="assessments" element={<StudentAssessments />} />
        <Route path="chat" element={<StudentsChat />} />
        <Route path="settings" element={<StudentsSetting />} />
        
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




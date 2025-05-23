import { Route, Routes } from 'react-router-dom'
import InstructorDash from '../pages/instructor/InstructorDash'
import InstructorLayout from '../pages/instructor/InstructorLayout';
import InstructorCourses from '../pages/instructor/InstructorCourses';
import InstructorAssessments from '../pages/instructor/InstructorAssessments';


import ProfilePage from '../pages/common/ProfilePage';
import CreateCourse from '../pages/instructor/Course/CreateCourse';
import CourseDetails from '../pages/common/CourseDetails';
import CourseForm from '../pages/instructor/Course/CourseForm';
import PaymentHistory from '../pages/student/PaymentHistory';
import StudentAssesmentPage from '../pages/instructor/Assessments/StudentAssesmentPage';
import StudentsChat from '../pages/student/StudentsChat';
// import ProfileEditPage from '../pages/common/ProfileEditPage';

export default function InstructorRoutes() {
    return (
        <Routes>
          {/* Wrap all Instructor routes with InstructorLayout */}
          <Route path="/" element={<InstructorLayout />}>
            <Route index element={<InstructorDash />} />
            <Route path="courses" element={<InstructorCourses />} />
            <Route path="allcourses" element={<InstructorCourses />} />
            <Route path="assessments" element={< InstructorAssessments/>} />
            <Route path="messages" element={<StudentsChat/ >} />
            <Route path="payment" element={<PaymentHistory />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="courses/:id" element={<CourseDetails />} />
            <Route path="courseform/:id" element={<CourseForm />} /> 
            <Route path="student-assessment" element={<StudentAssesmentPage/>} /> 
            <Route path="profile/*" >
          <Route index element={<ProfilePage/>}/>
          {/* <Route path="edit" element={<ProfileEditPage/>} />*/}
        </Route>         
          </Route>
        </Routes>
      );
}





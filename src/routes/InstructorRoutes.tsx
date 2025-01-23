import { Route, Routes } from 'react-router-dom'
import InstructorDash from '../pages/instructor/InstructorDash'
import InstructorLayout from '../pages/instructor/InstructorLayout';
import InstructorCourses from '../pages/instructor/InstructorCourses';
import InstructorAssessments from '../pages/instructor/InstructorAssessments';
import InstructorChat from '../pages/instructor/InstructorChat';

import ProfilePage from '../pages/common/ProfilePage';
import CreateCourse from '../pages/instructor/Course/CreateCourse';
// import ProfileEditPage from '../pages/common/ProfileEditPage';

export default function InstructorRoutes() {
    return (
        <Routes>
          {/* Wrap all student routes with StudentLayout */}
          <Route path="/" element={<InstructorLayout />}>
            <Route index element={<InstructorDash />} />
            <Route path="courses" element={<InstructorCourses />} />
            <Route path="assessments" element={< InstructorAssessments/>} />
            <Route path="messages" element={<InstructorChat />} />
            <Route path="create-course" element={<CreateCourse />} />

            <Route path="profile/*" >
          <Route index element={<ProfilePage/>}/>
          {/* <Route path="edit" element={<ProfileEditPage/>} />*/}
        </Route>         
          </Route>
        </Routes>
      );
}





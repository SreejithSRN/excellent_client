
import { Route, Routes } from 'react-router-dom'
import AdminDash from '../pages/admin/AdminDash'
import AdminLayout from '../pages/admin/AdminLayout';
import StudentsPage from '../pages/admin/StudentsPage';
import InstructorsPage from '../pages/admin/InstructorsPage';
import SettingsPage from '../pages/admin/SettingsPage';
import ProfilePage from '../pages/common/ProfilePage';
import CategoriesPage from '../pages/admin/CategoriesPage';


function AdminRoutes() {
    return (
        <Routes>
          {/* Wrap all student routes with StudentLayout */}
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<AdminDash />} />
            <Route path='students' element={<StudentsPage/>} />
            <Route path='instructors' element ={<InstructorsPage/>}/>
            <Route path='categories' element ={<CategoriesPage/>}/>

            <Route path='settings' element ={<SettingsPage/>}/>
            <Route path='students/profile/:id' element ={<ProfilePage/>}/>
            
            {/* <Route path="dashboard" element={<StudentDash />} />
            <Route path="mycourses" element={<MyCourses />} />
            <Route path="assessments" element={<Assessments />} /> */}
            {/* Add more routes as needed */}
          </Route>
        </Routes>
      );
}

export default AdminRoutes

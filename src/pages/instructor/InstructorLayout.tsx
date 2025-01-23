import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';


const InstructorLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Render child routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default InstructorLayout;




// import React from 'react'
// import Sidebar from '../../components/common/Sidebar';
// import { Outlet } from 'react-router-dom';

// const InstructorLayout: React.FC = () => {
//     return (
//         <div className="flex min-h-screen">
//           {/* Sidebar */}
//           <Sidebar />
    
//           {/* Main Content */}
//           <div className="flex-1 ml-64 p-6">
//             <Outlet /> {/* Child routes will be rendered here */}
//           </div>
//         </div>
//       );
// }

// export default InstructorLayout

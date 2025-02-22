// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../../components/common/Sidebar';

// const InstructorLayout: React.FC = () => {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-auto">
//         {/* Render child routes */}
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default InstructorLayout;


import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import CommonHeader from "../../components/common/CommonHeader";

const InstructorLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1  overflow-auto">
        <CommonHeader />
        <Outlet />
      </div>
    </div>
  );
};
export default InstructorLayout;

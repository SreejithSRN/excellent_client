


import React from "react";
import { Outlet} from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import CommonHeader from "../../components/common/CommonHeader";

const StudentLayout: React.FC = () => { 
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content with Header */}
      <div className="flex-1  overflow-auto">
        <CommonHeader
          
        />
        <Outlet /> {/* Child routes will be rendered here */}
      </div>
    </div>
  );
};

export default StudentLayout;


import React from 'react';
import Sidebar from '../../components/common/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet /> {/* Child routes will be rendered here */}
      </div>
    </div>
  );
};

export default AdminLayout;


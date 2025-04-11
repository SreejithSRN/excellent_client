import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import to access Redux store
import {
  LayoutDashboard,
  BookOpen,
  UserCircle,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  MessageCircle,
  Users,
  UserCheck,
  FileText,
} from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import { RootState } from "../../redux";
import { useAppDispatch } from "../../hooks/accessHook";
import { logoutAction } from "../../redux/store/actions/auth";
import logo from "../../assets/EXCELLENT LOGO.png";

interface NavItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Fetch user role from Redux store
  const role = useSelector((state: RootState) => state.user.data?.role); // Replace 'auth' with your Redux slice name

  // Define menu items for different roles
  const studentMenuItems: NavItemProps[] = [
    { icon: LayoutDashboard, label: "Dashboard-student", path: "/student" },
    { icon: BookOpen, label: "My Courses", path: "/student/mycourses" },
    { icon: ClipboardList, label: "Assessments", path: "/student/assessments" },
    { icon: MessageCircle, label: "Chat Support", path: "/student/chat" },
    { icon: Settings, label: "Payment History", path: "/student/purchase" },
    { icon: UserCircle, label: "Profile", path: "/student/profile" },
  ];

  const adminMenuItems: NavItemProps[] = [
    { icon: LayoutDashboard, label: "Dashboard-admin", path: "/admin" },
    { icon: Users, label: "Students", path: "/admin/students" },
    { icon: UserCheck, label: "Instructors", path: "/admin/instructors" },
    { icon: BookOpen, label: "Categories", path: "/admin/categories" },
    // { icon: FileText, label: 'Reports', path: '/admin/reports' },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const instructorMenuItems: NavItemProps[] = [
    { icon: LayoutDashboard, label: "Dashboard-instr", path: "/instructor" },
    { icon: BookOpen, label: "Manage Courses", path: "/instructor/courses" },
    {
      icon: ClipboardList,
      label: "Assessments",
      path: "/instructor/assessments",
    },
    {
      icon: MessageCircle,
      label: "Chat Messages",
      path: "/instructor/messages",
    },
    { icon: UserCircle, label: "Profile", path: "/instructor/profile" },
    { icon: FileText, label: 'Payment History', path: '/instructor/payment' },
  ];

  // Conditionally set menu items based on role
  const menuItems =
    role === "admin"
      ? adminMenuItems
      : role === "instructor"
      ? instructorMenuItems
      : studentMenuItems;

  const toggleSidebar = (): void => {
    setIsOpen(!isOpen);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(logoutAction());
    navigate("/");
    setIsLogoutModalOpen(false);
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, path }) => (
    <NavLink
      to={path}
      className={({ isActive }) => `
        flex items-center px-4 py-3 text-gray-700
        transition-colors duration-200 gap-4 hover:bg-gray-100 rounded-lg
        ${isActive ? "bg-blue-50 text-blue-600" : ""}
      `}
      onClick={() => window.innerWidth < 768 && setIsMobileMenuOpen(false)}
    >
      <Icon width={20} height={20} />
      <span className={`${!isOpen && "hidden"} transition-all duration-200`}>
        {label}
      </span>
    </NavLink>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
        onClick={toggleSidebar}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 h-full bg-white shadow-xl transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 py-2">
            <div
              className={`${isOpen ? "active" : "hidden"} flex items-center`}
            >
              <img alt="Excellent" className="h-25 w-49" src={logo} />
            </div>
            <button onClick={toggleSidebar} className="hidden md:block">
              <Menu size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-1 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <button
              className="flex items-center w-full px-4 py-3 mt-2 gap-4
                text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span className={`${!isOpen && "hidden"}`}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
        isError={true}
      />
    </>
  );
};

export default Sidebar;

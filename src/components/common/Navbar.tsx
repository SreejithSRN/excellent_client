import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext";
// import { useAppSelector } from "../../hooks/accessHook";
// import { RootState } from "../../redux";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const { data } = useAppSelector((state: RootState) => state.user);

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Excellent
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {showSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-64 px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/"
              className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 font-medium"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 font-medium"
            >
              Courses
            </Link>
            <Link
              to="/contact"
              className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 font-medium"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 font-medium"
            >
              About Us
            </Link>

            <button
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <Link to="/login">
              <button className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 font-medium">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4">
           
                <Link
                  to="/"
                  className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/courses"
                  className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 font-medium"
                >
                  Courses
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 font-medium"
                >
                  Contact Us
                </Link>
                <Link
                  to="/about"
                  className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 font-medium"
                >
                  About Us
                </Link>
           

            <button
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

           
                <Link to="/login">
                  <button className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                    Sign Up
                  </button>
                </Link>
           
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;







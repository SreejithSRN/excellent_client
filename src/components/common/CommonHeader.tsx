import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux";

const capitalizeFirstLetter = (name: string | undefined) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const CommonHeader: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const avatarSrc = useMemo(() => {
    if (data?.profile.avatar instanceof File) {
      return URL.createObjectURL(data.profile.avatar);
    }
    return data?.profile.avatar as string | undefined;
  }, [data]);

  const handleViewCourses = () => {
    if (data?.role === "instructor") {
      navigate("/instructor/allcourses"); // 👨‍🏫 Instructor route
    } else if (data?.role === "student") {
      navigate("/student/allcourses"); // 🎓 Student route
    } else {
      navigate("/courses"); // Default fallback route
    }
  };

  return (
    <div className="flex items-center justify-between mb-8 bg-white p-4 shadow-md rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={avatarSrc}
          alt="User"
          className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
        />
        <div>
          <h1 className="text-1xl font-bold text-gray-900">
            Welcome{" "}
            <span className="text-2xl font-bold text-gray-900">
              {capitalizeFirstLetter(data?.name)}
            </span>
          </h1>
          <p className="text-gray-600 text-xs">Your learning journey continues!</p>
        </div>
      </div>
      <button
        onClick={handleViewCourses}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700"
      >
        View All Courses
      </button>
    </div>
  );
};

export default CommonHeader;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Plus, Search, Star, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useAppDispatch } from "../../hooks/accessHook";
import { CourseEntity } from "../../types/ICourse";
import { getCourses } from "../../redux/store/actions/course/getCoursesAction";

const InstructorCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.user);
  console.log(data);

  // State for courses, loading, and pagination
  const [courses, setCourses] = useState<CourseEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 1,
    categoryPerPage: 3,
  });

  // Fetch courses based on pagination
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await dispatch(
          getCourses({
            page: pagination.currentPage,
            limit: pagination.categoryPerPage,
          })
        );
        if (response.payload.success) {
          setCourses(response.payload.data);
          setPagination((prev) => ({
            ...prev,
            totalCount: response.payload.totalCount,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch Courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch, pagination.currentPage, pagination.categoryPerPage]);

  // Pagination controls
  const totalPages = Math.ceil(
    pagination.totalCount / pagination.categoryPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <Link
          to="/instructor/create-course"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Course
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search your courses..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-6">Loading...</div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No courses yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first course to start teaching.
          </p>
          <Link
            to="/instructor/create-course"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="w-full h-48 bg-gray-200">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 "
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">
                    {course.title}
                    <sup
                      className={`ml-1 text-xs font-semibold ${
                        course.isBlocked ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {course.isBlocked ? "Blocked" : "Active"}
                    </sup>
                  </h3>
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-300">
                    {course.level || "Beginner"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.lessons?.length || 0} lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {/* <span>{course.studentsEnrolled?.length || 0} students</span> */}
                    <span>{0} students</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    {/* <span>{course.rating|| "0.0"}</span> */}
                    <span>{"0.0"}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="font-semibold">
                    {course.pricing?.amount
                      ? `Rs ${course.pricing.amount}`
                      : "Free"}
                  </span>
                  <div className="space-x-2">
                    {/* <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      Edit
                    </button> */}

                    <Link
                      to={`/instructor/courseform/${course._id}`}
                      state={{ course }} // Passing the entire course object
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Edit
                    </Link>

                    <Link
                      to={`/instructor/courses/${course._id}`}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <div className="text-sm text-gray-500">
          Page {pagination.currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InstructorCourses;

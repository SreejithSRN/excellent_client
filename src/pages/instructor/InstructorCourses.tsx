import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, Plus, Search, Star, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useAppDispatch } from "../../hooks/accessHook";
import { CourseEntity, CourseFilterEntity } from "../../types/ICourse";
import { getCourses } from "../../redux/store/actions/course/getCoursesAction";
import { toggleBlockCourse } from "../../redux/store/actions/course/toggleBlockCourse";
import ConfirmationModal from "../../components/admin/ConfirmationModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCoursesForInstructor } from "../../redux/store/actions/course/getCoursesForInstructorAction";
import { getStudentMyCourses } from "../../redux/store/actions/course/getStudentMyCourses";
import { Category } from "../../types";
import { getCategories } from "../../redux/store/actions/course/getCategoriesAction";

const InstructorCourses = () => {

  const [currentCategory, setCurrentCategory] = useState<Category[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [pricing, setPricing] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [level, setLevel] = useState("all");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const [courses, setCourses] = useState<CourseEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 1,
    categoryPerPage: 3,
  });
  const filters: CourseFilterEntity = {
    level: level,
    search: searchQuery, // pass the search query here
    category: category,
    pricing: pricing,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    sort: sortOrder,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await dispatch(
              getCategories({ page: 0, limit: 100})
            );
      setCurrentCategory(response.payload.data);
    };
    fetchCategories();
  }, []);

  console.log("^^^^^^^^^^^^^^^^",currentCategory)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        let response;
        if (location.pathname === "/instructor/courses") {
          response = await dispatch(
            getCoursesForInstructor({
              page: pagination.currentPage,
              limit: pagination.categoryPerPage,
              id: data?._id || "",
              filters,
            })
          );
        } else if (location.pathname === "/student/mycourses") {
          response = await dispatch(
            getStudentMyCourses({
              page: pagination.currentPage,
              limit: pagination.categoryPerPage,
              id: data?._id || "",
              filters,
            })
          );
        } else {
          response = await dispatch(
            getCourses({
              page: pagination.currentPage,
              limit: pagination.categoryPerPage,
              filters,
            })
          );
        }

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
  }, [
    dispatch,
    pagination.currentPage,
    pagination.categoryPerPage,
    data?._id,
    location.pathname,
    searchQuery, 
    category, 
    level, 
    pricing, 
    minPrice, 
    maxPrice, 
    sortOrder, 
  ]);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);



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

  const handleBlockUnblock = async (id: string) => {
    try {
      const response = await dispatch(toggleBlockCourse(id));
      if (response.payload.success) {
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === id
              ? { ...course, isBlocked: !course.isBlocked }
              : course
          )
        );
      }
      toast.success(response.payload.message);
    } catch (error) {
      console.error("Failed to toggle course block:", error);
    }
  };

  return (
    <div className={location.pathname === "/courses" ? "pt-20 px-4" : "px-4"}>
      <ToastContainer />
      {data?.role === "instructor" && (
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
      )}

      {/* Search and Filter */}
      <div className="mb-6 flex items-center justify-end gap-4 flex-wrap">
        {/* Search Bar */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        {/* Filter Button with Dropdown */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center px-3 py-2 border rounded-md text-sm bg-gray-100 hover:bg-gray-200"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showFilter && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10 p-3 space-y-3">
              {/* Category */}
              <div>
  <label className="block text-sm font-medium">Category</label>
  <select
    className="w-full text-sm border rounded-md px-2 py-1"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="all">All</option>
    {currentCategory.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>


              {/* Level */}
              <div>
                <label className="block text-sm font-medium">Level</label>
                <select
                  className="w-full text-sm border rounded-md px-2 py-1"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium">Sort</label>
                <select
                  className="w-full text-sm border rounded-md px-2 py-1"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="all">Default</option>
                  <option value="asc">A - Z</option>
                  <option value="desc">Z - A</option>
                </select>
              </div>

              {/* Pricing */}
              <div>
                <label className="block text-sm font-medium">Pricing</label>
                <select
                  className="w-full text-sm border rounded-md px-2 py-1"
                  value={pricing}
                  onChange={(e) => setPricing(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              {/* Conditional Min & Max Price if "Paid" is selected */}
              {pricing === "paid" && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    className="w-full border rounded-md px-2 py-1 text-sm"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    className="w-full border rounded-md px-2 py-1 text-sm"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              )}

              <button
                className="text-sm text-blue-600 hover:underline mt-2"
                onClick={() => {
                  setPricing("all");
                  setMinPrice("");
                  setMaxPrice("");
                  setLevel("all");
                  setCategory("all");
                  setSortOrder("");
                  setSearchQuery(""); // Optionally reset search query as well
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Loading / Empty State */}
      {loading ? (
        <div className="text-center py-6">Loading...</div>
      ) : courses.length === 0 && location.pathname === "/courses" ? (
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
      ) : courses.length === 0 && location.pathname === "/student/mycourses" ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No courses purchased yet
          </h3>
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
                  className="w-full h-48 object-cover"
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
                    <span>{0} students</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    <span>{"0.0"}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="font-semibold">
                    {course.pricing?.amount
                      ? `Rs ${course.pricing.amount}`
                      : "Free"}
                  </span>
                  <div className="flex items-center space-x-2">
                    {data?.role === "instructor" &&
                      location.pathname === "/instructor/courses" && (
                        <Link
                          to={`/instructor/courseform/${course._id}`}
                          state={{ course }}
                          className="px-3 py-1 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
                        >
                          Edit
                        </Link>
                      )}

                    {location.pathname === "/student/mycourses" ? (
                      <Link
                        to={`/student/mycourses/${course._id}`}
                        state={{ isPassed: course.isTestCompleted }}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        View
                      </Link>
                    ) : (
                      <Link
                        to={
                          // data?.role === "instructor"
                          //   ? `/instructor/courses/${course._id}`
                          //   : data?.role === "student"
                          //   ? `/student/courses/${course._id}`
                          //   : `/detailcourses/${course._id}`

                          data?.role === "instructor"
                            ? `/instructor/courses/${course._id}`
                            : data?.role === "student" &&
                              location.pathname === "/student/mycourses"
                            ? `/student/myCourses/${course._id}`
                            : data?.role === "student"
                            ? `/student/courses/${course._id}`
                            : `/detailcourses/${course._id}`
                        }
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        View
                      </Link>
                    )}

                    {data?.role === "instructor" &&
                      location.pathname === "/instructor/courses" && (
                        <ConfirmationModal
                          triggerText={course.isBlocked ? "Unblock" : "Block"}
                          title={`${
                            course.isBlocked ? "Unblock" : "Block"
                          } Course`}
                          description={`Are you sure you want to ${
                            course.isBlocked ? "unblock" : "block"
                          } the course "${course.title}"?`}
                          status={course.isBlocked ? "unblock" : "block"}
                          onConfirm={() =>
                            course._id && handleBlockUnblock(course._id)
                          }
                        />
                      )}
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

export default InstructorCourses




//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// ********************* THIS IS MY ORIGINAL PAGE BEFOR ADDING SEARCH AND FILTER ON 22 APRIL 2025 **********************************

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Clock, Plus, Search, Star, Users } from "lucide-react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux";
// import { useAppDispatch } from "../../hooks/accessHook";
// import { CourseEntity } from "../../types/ICourse";
// import { getCourses } from "../../redux/store/actions/course/getCoursesAction";
// import { toggleBlockCourse } from "../../redux/store/actions/course/toggleBlockCourse";
// import ConfirmationModal from "../../components/admin/ConfirmationModal";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getCoursesForInstructor } from "../../redux/store/actions/course/getCoursesForInstructorAction";
// import { getStudentMyCourses } from "../../redux/store/actions/course/getStudentMyCourses";

// const InstructorCourses = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const dispatch = useAppDispatch();
//   const { data } = useSelector((state: RootState) => state.user);
//   const location = useLocation();
//   const [courses, setCourses] = useState<CourseEntity[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalCount: 1,
//     categoryPerPage: 3,
//   });

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       try {
//         let response;
//         if (location.pathname === "/instructor/courses") {
//           response = await dispatch(
//             getCoursesForInstructor({
//               page: pagination.currentPage,
//               limit: pagination.categoryPerPage,
//               id: data?._id || "",
//             })
//           );
//         } else if (location.pathname === "/student/mycourses") {
//           response = await dispatch(
//             getStudentMyCourses({
//               page: pagination.currentPage,
//               limit: pagination.categoryPerPage,
//               id: data?._id || "",
//             })
//           );
//         } else {
//           response = await dispatch(
//             getCourses({
//               page: pagination.currentPage,
//               limit: pagination.categoryPerPage,
//             })
//           );
//         }

//         if (response.payload.success) {
//           setCourses(response.payload.data);
//           setPagination((prev) => ({
//             ...prev,
//             totalCount: response.payload.totalCount,
//           }));
//         }
//       } catch (error) {
//         console.error("Failed to fetch Courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [
//     dispatch,
//     pagination.currentPage,
//     pagination.categoryPerPage,
//     data?._id,
//     location.pathname,
//   ]);

//   useEffect(() => {
//     if (location.state?.message) {
//       toast.success(location.state.message);
//     }
//   }, [location.state]);

//   const totalPages = Math.ceil(
//     pagination.totalCount / pagination.categoryPerPage
//   );

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPagination((prev) => ({
//         ...prev,
//         currentPage: newPage,
//       }));
//     }
//   };

//   const handleBlockUnblock = async (id: string) => {
//     try {
//       const response = await dispatch(toggleBlockCourse(id));
//       if (response.payload.success) {
//         setCourses((prevCourses) =>
//           prevCourses.map((course) =>
//             course._id === id
//               ? { ...course, isBlocked: !course.isBlocked }
//               : course
//           )
//         );
//       }
//       toast.success(response.payload.message);
//     } catch (error) {
//       console.error("Failed to toggle course block:", error);
//     }
//   };

//   return (
//     <div className={location.pathname === "/courses" ? "pt-20 px-4" : "px-4"}>
//       <ToastContainer />
//       {data?.role === "instructor" && (
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">My Courses</h1>
//           <Link
//             to="/instructor/create-course"
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             <Plus className="h-5 w-5 mr-2" />
//             Create Course
//           </Link>
//         </div>
//       )}

//       {/* Search Bar */}
//       <div className="mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search your courses..."
//             className="w-full pl-10 pr-4 py-2 border rounded-md"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div>
//       </div>

//       {/* Loading / Empty State */}
//       {loading ? (
//         <div className="text-center py-6">Loading...</div>
//       ) : courses.length === 0 && location.pathname === "/courses" ? (
//         <div className="text-center py-12 bg-white rounded-lg shadow">
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No courses yet
//           </h3>
//           <p className="text-gray-500 mb-4">
//             Create your first course to start teaching.
//           </p>
//           <Link
//             to="/instructor/create-course"
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             <Plus className="h-5 w-5 mr-2" />
//             Create Course
//           </Link>
//         </div>
//       ) : courses.length === 0 && location.pathname === "/student/mycourses" ? (
//         <div className="text-center py-12 bg-white rounded-lg shadow">
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No courses purchased yet
//           </h3>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <div
//               key={course._id}
//               className="bg-white rounded-lg shadow overflow-hidden"
//             >
//               <div className="w-full h-48 bg-gray-200">
//                 <img
//                   src={course.thumbnail}
//                   alt={course.title}
//                   className="w-full h-48 object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-lg font-semibold">
//                     {course.title}
//                     <sup
//                       className={`ml-1 text-xs font-semibold ${
//                         course.isBlocked ? "text-red-500" : "text-green-500"
//                       }`}
//                     >
//                       {course.isBlocked ? "Blocked" : "Active"}
//                     </sup>
//                   </h3>
//                   <span className="px-2 py-1 rounded-full text-xs bg-gray-300">
//                     {course.level || "Beginner"}
//                   </span>
//                 </div>

//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                   {course.description}
//                 </p>

//                 <div className="flex items-center justify-between text-sm text-gray-500">
//                   <div className="flex items-center">
//                     <Clock className="h-4 w-4 mr-1" />
//                     <span>{course.lessons?.length || 0} lessons</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Users className="h-4 w-4 mr-1" />
//                     <span>{0} students</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
//                     <span>{"0.0"}</span>
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-4 border-t flex justify-between items-center">
//                   <span className="font-semibold">
//                     {course.pricing?.amount
//                       ? `Rs ${course.pricing.amount}`
//                       : "Free"}
//                   </span>
//                   <div className="flex items-center space-x-2">
//                     {data?.role === "instructor" &&
//                       location.pathname === "/instructor/courses" && (
//                         <Link
//                           to={`/instructor/courseform/${course._id}`}
//                           state={{ course }}
//                           className="px-3 py-1 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
//                         >
//                           Edit
//                         </Link>

//                       )}

//                     {location.pathname === "/student/mycourses" ? (
//                       <Link
//                         to={`/student/mycourses/${course._id}`}
//                         state={{ isPassed: course.isTestCompleted }}
//                         className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//                       >
//                         View
//                       </Link>
//                     ) : (
//                       <Link
//                         to={
//                           // data?.role === "instructor"
//                           //   ? `/instructor/courses/${course._id}`
//                           //   : data?.role === "student"
//                           //   ? `/student/courses/${course._id}`
//                           //   : `/detailcourses/${course._id}`

//                           data?.role === "instructor"
//                             ? `/instructor/courses/${course._id}`
//                             : data?.role === "student" &&
//                               location.pathname === "/student/mycourses"
//                             ? `/student/myCourses/${course._id}`
//                             : data?.role === "student"
//                             ? `/student/courses/${course._id}`
//                             : `/detailcourses/${course._id}`
//                         }
//                         className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//                       >
//                         View
//                       </Link>

//                     )}

//                     {data?.role === "instructor" &&
//                       location.pathname === "/instructor/courses" && (
//                         <ConfirmationModal
//                           triggerText={course.isBlocked ? "Unblock" : "Block"}
//                           title={`${
//                             course.isBlocked ? "Unblock" : "Block"
//                           } Course`}
//                           description={`Are you sure you want to ${
//                             course.isBlocked ? "unblock" : "block"
//                           } the course "${course.title}"?`}
//                           status={course.isBlocked ? "unblock" : "block"}
//                           onConfirm={() =>
//                             course._id && handleBlockUnblock(course._id)
//                           }
//                         />
//                       )}

//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {/* Pagination Section */}
//       <div className="flex justify-between items-center mt-6">
//         <button
//           onClick={() => handlePageChange(pagination.currentPage - 1)}
//           disabled={pagination.currentPage === 1}
//           className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <div className="text-sm text-gray-500">
//           Page {pagination.currentPage} of {totalPages}
//         </div>
//         <button
//           onClick={() => handlePageChange(pagination.currentPage + 1)}
//           disabled={pagination.currentPage === totalPages}
//           className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InstructorCourses;

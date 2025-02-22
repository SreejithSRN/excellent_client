import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Clock, PlayCircle, Loader2 } from "lucide-react";
import { useAppDispatch } from "../../hooks/accessHook";
import { CourseEntity } from "../../types/ICourse";
import { getCoursesById } from "../../redux/store/actions/course/getCourseByIdAction";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();  
  const location=useLocation()
  const [course, setCourse] = useState<CourseEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const response = await dispatch(getCoursesById(id));
        
        if (response.payload.success) {
          setCourse(response.payload.data);
        } else {
          setError("Failed to load course details.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [dispatch, id]);

  
  console.log(course, " tatatatata");

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-6 text-red-600 font-semibold">{error}</div>
    );

  if (!course) return <div className="text-center py-6">Course not found</div>;

  return (
    <div className={location.pathname === `/detailcourses/${course._id}` ? "pt-28 px-4 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg" : "max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"}>


  
      {/* Course Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full md:w-64 rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{course.title} </h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
          <p className="mt-3 text-gray-700">
            <strong>Level:</strong>{" "}
            <span className="inline-block mt-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
              {course.level}
            </span>
          </p>

          <p className="mt-3 text-gray-700">
            <strong>Language:</strong> {course.language}
          </p>
          <p className="mt-1 text-gray-700">
            <strong>Price:</strong>{" "}
            {course.pricing?.amount && course.pricing?.amount > 0
              ? `Rs ${course.pricing.amount}`
              : "Free"}
          </p>

          <p className="mt-1 text-gray-700">
            <strong>Instructor:</strong>{" "}
            {course.instructorRef
              ? `${course.instructorRef.firstName ?? ""} ${
                  course.instructorRef.lastName?.trim() ?? ""
                }`.trim() || "Unknown"
              : data?.role === "instructor"
              ? `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim() ||
                "Unknown"
              : "Unknown"}
          </p>

          <p className="mt-1 text-gray-700">
            <strong>Category:</strong> {course.categoryRef?.name || "Unknown"}
          </p>
          <p className="mt-1 text-gray-700">
            <strong>Status: </strong>
            <span
              className={
                course.isBlocked
                  ? "text-red-500 text-lg"
                  : "text-green-500 text-lg"
              }
            >
              {course.isBlocked ? "Blocked" : "Active"}
            </span>
          </p>
        </div>
      </div>

      {/* Lessons Section */}
      <div className="mt-8">      
        <h2 className="text-2xl font-semibold text-gray-900">Course Lessons</h2>
        {course.lessons && course.lessons.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {(data?.role === "student" ||!data
              ? course.lessons.slice(0, 1)
              : course.lessons
            ).map((lesson) => (
              <li
                key={lesson._id}
                className="p-5 bg-gray-100 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold">{lesson.title}</h3>
                <p className="text-gray-600">{lesson.description}</p>
                <div className="flex items-center mt-2 text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{lesson.duration}</span>
                </div>
                <a
                  href={
                    lesson.video instanceof File
                      ? URL.createObjectURL(lesson.video)
                      : lesson.video || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Watch Lesson
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No lessons available.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;

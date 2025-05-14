import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Clock, PlayCircle, Loader2, X } from "lucide-react";
import { useAppDispatch } from "../../hooks/accessHook";
import { CourseEntity } from "../../types/ICourse";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { URL } from "../../common/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMyCoursesById } from "../../redux/store/actions/course/getMyCoursesByIdAction";
import { TakeAssessmentModal } from "../instructor/Assessments/TakeAssessmentModal";

const MyCourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Added
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [course, setCourse] = useState<CourseEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [showTestModal, setShowTestModal] = useState(false);

  const { data } = useSelector((state: RootState) => state.user);
  const AssessmentFlag = location.state?.isPassed;

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await dispatch(getMyCoursesById(id));
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

  const handleWatchLesson = (lessonNumber: number) => {
    setSelectedLesson(lessonNumber);
  };

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
    <div
      className={
        location.pathname === `/detailcourses/${course._id}`
          ? "pt-28 px-4 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
          : "max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      }
    >
      
      <ToastContainer />

      {/* Course Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full md:w-64 rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
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
            {course.pricing?.amount && course.pricing.amount > 0
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

      {/* Assessment Test Button */}
      <div className="mt-8 text-center">
        {AssessmentFlag === true ? (
          <p className="text-green-600 font-semibold">
            ✅ You have already passed the assessment!
          </p>
        ) : (
          <>
            <button
              onClick={() => setShowTestModal(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Take Assessment Test
            </button>
            {showTestModal && (
              <TakeAssessmentModal
                courseId={course._id!}
                onClose={() => setShowTestModal(false)}
              />
            )}
          </>
        )}
      </div>

      {/* Lessons Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">Course Lessons</h2>
        {course.lessons && course.lessons.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {course.lessons.map((lesson) => (
              <li
                key={lesson._id}
                className="p-5 bg-gray-100 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold">
                  Lesson Name : {lesson.title}
                </h3>
                <p className="text-gray-600">
                  Description: {lesson.description}
                </p>
                <div className="flex items-center mt-2 text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Duration : {lesson.duration}</span>
                </div>
                <button
                  onClick={() =>
                    handleWatchLesson(Number(lesson.lessonNumber))
                  }
                  className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Watch Lesson
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No lessons available.</p>
        )}

        {/* ✅ Review Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate(`/student/review-course/${course._id}`)}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Review / Rate Course
          </button>
        </div>
      </div>

      {/* Video Player */}
      {selectedLesson !== null && (
        <div className="mt-10 relative">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Now Playing - Lesson {selectedLesson}
          </h3>
          <button
            className="absolute top-0 right-0 bg-red-100 text-red-700 px-2 py-1 rounded-full hover:bg-red-200 transition"
            onClick={() => setSelectedLesson(null)}
          >
            <X className="w-4 h-4" />
          </button>
          <video
            controls
            width="100%"
            className="rounded-lg shadow-md mt-4"
            src={`${URL}/api/course/streamVideo/${course._id}/${selectedLesson}`}
            crossOrigin="use-credentials"
          />
        </div>
      )}
    </div>
  );
};

export default MyCourseDetails;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { commonRequest, URL } from "../../common/api";
import { config } from "../../common/config";
import { Loader2 } from "lucide-react";
import { AssessmentModal } from "./Assessments/AssessmentModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useNavigate } from "react-router-dom";

interface CourseData {
  _id: string;
  title: string;
  pricing?: { amount: number };
  lessons: Array<any>;
  assessment?: {
    _id: string;
    questions: any[];
  };
}

const InstructorAssessments = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate=useNavigate()

  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [editingQuestions, setEditingQuestions] = useState<any[] | undefined>(undefined);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(courses.length / itemsPerPage) || 1;

  const paginatedCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchInstructorCourses = async () => {
    setLoading(true);
    try {
      const response = await commonRequest<CourseData[]>(
        "GET",
        `${URL}/api/course/assessmentList/${data?._id}`,
        config
      );
      setCourses(response.data || []);
    } catch (err) {
      setError("Failed to load assessments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?._id) {
      fetchInstructorCourses();
    }
  }, [data]);

  const handleEdit = (course: CourseData) => {
    if (!course.assessment?._id) return;
    setSelectedCourseId(course._id);
    setEditingQuestions(course.assessment.questions || []);
    setShowModal(true);
  };

  const handleDeleteClick = (assessmentId: string) => {
    setSelectedAssessmentId(assessmentId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedAssessmentId) return;

    try {
      const res = await commonRequest(
        "DELETE",
        `${URL}/api/course/assessmentDelete/${selectedAssessmentId}`,
        config
      );
      if (res.success) {
        setCourses((prev) =>
          prev.map((course) =>
            course.assessment?._id === selectedAssessmentId
              ? { ...course, assessment: undefined }
              : course
          )
        );
        await fetchInstructorCourses();
      }
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setShowConfirm(false);
      setSelectedAssessmentId(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-6 text-red-600 font-semibold">{error}</div>
    );

  return (
    <div className="max-w-6xl mx-auto py-1 px-4">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">Instructor Assessments</h1>
  <button
    onClick={() => {       
       navigate('/instructor/student-assessment');
    }}
    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
  >
    View Student Assessments
  </button>
</div>


      {courses.length === 0 ? (
        <div className="text-center py-6">No assessments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 border">Course Title</th>
                <th className="px-4 py-3 border">Price</th>
                <th className="px-4 py-3 border">Lessons</th>
                <th className="px-4 py-3 border">Assessment</th>
                <th className="px-4 py-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((course) => (
                <tr key={course._id} className="border-t">
                  <td className="px-4 py-3">{course.title}</td>
                  <td className="px-4 py-3">
                    {course.pricing?.amount ? `Rs ${course.pricing.amount}` : "Free"}
                  </td>
                  <td className="px-4 py-3">{course.lessons.length}</td>
                  <td className="px-4 py-3">
                    {course.assessment?._id ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {course.assessment?._id ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(course)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteClick(course.assessment!._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                        >
                          Delete
                        </button>

                        <ConfirmDialog
                          open={showConfirm}
                          message="Are you sure you want to delete this assessment?"
                          onConfirm={confirmDelete}
                          onCancel={() => setShowConfirm(false)}
                        />
                      </div>
                    ) : (
                      <span className="italic text-gray-400">Not created</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination: Always show */}
      <div className="flex justify-center mt-6">
        <nav className="inline-flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? "text-gray-400 border-gray-300"
                : "text-gray-700 border-gray-400"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-700 border-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300"
                : "text-gray-700 border-gray-400"
            }`}
          >
            Next
          </button>
        </nav>
      </div>

      {/* Modal */}
      {showModal && selectedCourseId && (
        <AssessmentModal
          courseId={selectedCourseId}
          initialQuestions={editingQuestions}
          onClose={() => {
            setShowModal(false);
            setEditingQuestions(undefined);
            fetchInstructorCourses();
          }}
          onAssessmentCreated={fetchInstructorCourses}
        />
      )}
    </div>
  );
};

export default InstructorAssessments;

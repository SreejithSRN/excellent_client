import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { commonRequest } from "../../common/api";
import { config } from "../../common/config";
import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

type Assessment = {
  courseTitle: string;
  instructorName: string;
  lessonsCount: number;
  status: boolean;
  mark: number[] | null;
  studentName?: string;
};

const StudentAssessments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] =
    useState<Assessment | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const totalPages = Math.ceil(assessments.length / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = assessments.slice(indexOfFirstItem, indexOfLastItem);

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(currentItems, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  const openModal = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedAssessment(null);
    setIsOpen(false);
  };

  const handleDownload = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("certificate.pdf");
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchAssessments = async () => {
        try {
          setLoading(true);
          const res = await commonRequest(
            "GET",
            `/api/course/studentAssessmentsList?search=${searchTerm}`,
            null,
            config
          );

          if (res.success && Array.isArray(res.data)) {
            setAssessments(res.data as Assessment[]);
          } else {
            toast.error("Failed to fetch assessment data.");
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            // Now that we know it's an instance of Error, we can safely access 'name'
            if (err.name !== "AbortError") {
              console.error(err);
              toast.error("Error loading assessments.");
            }
          } else {
            // Handle the case where `err` is not an instance of Error
            console.error("An unknown error occurred:", err);
            toast.error("An unknown error occurred.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchAssessments();
    }, 500); // debounce delay

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [searchTerm]);
  

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading assessments...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Assessments</h2>
      <div className="flex justify-end mb-4">
  <input
    type="text"
    placeholder="Search by course title or instructor"
    className="border border-gray-300 rounded-l px-3 py-1 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  
</div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-4 py-3">Course Title</th>
              <th className="px-4 py-3">Instructor</th>
              <th className="px-4 py-3">Lessons</th>
              <th className="px-4 py-3">Attempts</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Mark</th>
              <th className="px-4 py-3">Certificate</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50 text-sm">
                <td className="px-4 py-3">{item.courseTitle}</td>
                <td className="px-4 py-3">{item.instructorName}</td>
                <td className="px-4 py-3">{item.lessonsCount}</td>
                <td className="px-4 py-3">{item.mark?.length}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status ? "Completed" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {item.status &&
                  Array.isArray(item.mark) &&
                  item.mark.length > 0
                    ? item.mark[item.mark.length - 1]
                    : "Not Applicable"}
                </td>

                <td className="px-4 py-3">
                  {item.status ? (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition"
                      onClick={() => openModal(item)}
                    >
                      View
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {assessments.length === 0 && (
          <p className="text-center text-gray-600 py-4">
            No assessments found.
          </p>
        )}

        {/* Always show pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages || 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Certificate Modal */}
      <Dialog open={isOpen} onClose={closeModal} as={Fragment}>
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded shadow-xl max-w-4xl w-full relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Certificate</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  className="bg-green-500 text-white px-4 py-1 rounded text-sm hover:bg-green-600"
                >
                  Download as PDF
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div
              ref={certificateRef}
              className="bg-gradient-to-r from-white to-gray-100 border border-gray-300 rounded-lg p-10 text-center"
            >
              <h1 className="text-4xl font-bold mb-6">
                Certificate of Completion
              </h1>
              <p className="text-xl mb-2">This is to certify that</p>
              <p className="text-2xl font-semibold mb-4">
                {selectedAssessment?.studentName
                  ? selectedAssessment.studentName.charAt(0).toUpperCase() +
                    selectedAssessment.studentName.slice(1)
                  : "Student"}
              </p>
              <p className="mb-2">has successfully completed the course</p>
              <p className="text-xl font-medium mb-2 italic">
                "{selectedAssessment?.courseTitle}"
              </p>
              <p className="mb-6">
                under instructor {selectedAssessment?.instructorName}
              </p>
              <p className="text-sm text-gray-500">
                Mark:{" "}
                {Array.isArray(selectedAssessment?.mark) &&
                selectedAssessment.mark.length > 0
                  ? selectedAssessment.mark[selectedAssessment.mark.length - 1]
                  : "N/A"}
              </p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default StudentAssessments;


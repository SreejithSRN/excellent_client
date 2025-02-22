import { useState, useEffect, useCallback } from "react";
import { Search, Filter } from "lucide-react";

import { useAppDispatch } from "../../hooks/accessHook";
import { getInstructors } from "../../redux/store/actions/auth/getInstructors"; // Replace with your actual action
import { SignupFormData } from "../../types";
import { blockUnblock } from "../../redux/store/actions/auth/blockUnblock";
import { approveReject } from "../../redux/store/actions/auth";
import ConfirmationModal from "../../components/admin/ConfirmationModal";

const InstructorsPage = () => {
  const [data, setData] = useState<SignupFormData[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    instructorsPerPage: 3,
  });
  const [status, setStatus] = useState({ loading: true, error: "" });

  const dispatch = useAppDispatch();

  const fetchInstructors = useCallback(async () => {
    setStatus((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      const { currentPage, instructorsPerPage } = pagination;
      const response = await dispatch(
        getInstructors({ page: currentPage, limit: instructorsPerPage })
      );

      if (response && response.payload) {
        setData(response.payload.data || []);
        setPagination((prev) => ({
          ...prev,
          totalCount: response.payload.totalCount || 0,
        }));
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, [dispatch, pagination.currentPage, pagination.instructorsPerPage]);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  const { currentPage, instructorsPerPage, totalCount } = pagination;
  const totalPages = Math.ceil(totalCount / instructorsPerPage);

  const handleApprovalToggle = async (email: string) => {
    if (!email) {
      console.error("Email not found for the selected student.");
      return;
    }
    try {
      const response = await dispatch(approveReject(email));
      console.log(response, "Response from blockUnblock handler");
      if (response.payload?.success) {
        setData((prevData) =>
          prevData.map((instructor) =>
            instructor.email === email
              ? { ...instructor, isRejected: !instructor.isRejected }
              : instructor
          )
        );
      } else {
        console.error("Failed to update student status");
      }
    } catch (error) {
      console.error("Error during block/unblock operation:", error);
    }
  };
  const handleBlockUnblockToggle = async (email: string) => {
    if (!email) {
      console.error("Email not found for the selected student.");
      return;
    }
    try {
      const response = await dispatch(blockUnblock(email));
      console.log(response, "Response from blockUnblock handler");
      if (response.payload?.success) {
        setData((prevData) =>
          prevData.map((instructor) =>
            instructor.email === email
              ? { ...instructor, isBlocked: !instructor.isBlocked }
              : instructor
          )
        );
      } else {
        console.error("Failed to update student status");
      }
    } catch (error) {
      console.error("Error during block/unblock operation:", error);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: page }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Instructors</h1>
        <p className="text-gray-600">
          Manage instructors' approvals and account statuses
        </p>
      </div>

      {/* Search and Filter */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search instructors..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      {/* Table or Loading/Error/Empty State */}
      <div className="overflow-x-auto mt-4">
        {status.error && (
          <p className="text-red-500 text-center mb-4">{status.error}</p>
        )}
        {status.loading ? (
          <div className="text-center text-gray-500 mt-6">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">
            No Instructors Found!
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profession
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approval
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-400">
              {data.map((instructor) => (
                <tr key={instructor._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {instructor.profile?.avatar ? (
                        typeof instructor.profile.avatar === "string" ? (
                          <img
                            src={instructor.profile.avatar}
                            alt={`${instructor.name || "Instructor"}'s avatar`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <img
                            src={URL.createObjectURL(instructor.profile.avatar)}
                            alt={`${instructor.name || "Instructor"}'s avatar`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-400 font-bold flex items-center justify-center text-white">
                          {instructor.name?.charAt(0).toUpperCase() || "N"}
                        </div>
                      )}

                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {instructor.firstName
                            ? `${instructor.firstName} ${
                                instructor.lastName || ""
                              }`
                            : instructor.name || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {instructor.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {instructor?.qualification || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {instructor?.profession || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                    {instructor.cv ? (
                      typeof instructor.cv === "string" ? (
                        <a
                          href={instructor.cv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        >
                          View CV
                        </a>
                      ) : (
                        <a
                          href={URL.createObjectURL(instructor.cv)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        >
                          View CV
                        </a>
                      )
                    ) : (
                      <span className="text-gray-400">No CV</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`w-20 inline-flex justify-center text-xs leading-5 font-semibold rounded-full px-2 ${
                        instructor.isRejected
                          ? "bg-red-200 text-red-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {instructor.isRejected ? "Rejected" : "Approved"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`w-20 inline-flex justify-center text-xs leading-5 font-semibold rounded-full px-2 ${
                        instructor.isBlocked
                          ? "bg-red-200 text-red-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {instructor.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 space-y-2">
                    {/* Approve/Reject Button with Confirmation Modal */}
                    <ConfirmationModal
                      triggerText={instructor.isRejected ? "Approve" : "Reject"}
                      title={`${
                        instructor.isRejected ? "Approve" : "Reject"
                      } Instructor`}
                      description={`Are you sure you want to ${
                        instructor.isRejected ? "approve" : "reject"
                      } ${
                        instructor.firstName ||
                        instructor.name ||
                        "this instructor"
                      }?`}
                      status={instructor.isRejected ? "approve" : "reject"}
                      onConfirm={() => handleApprovalToggle(instructor.email)}
                    />

                    {/* Block/Unblock Button with Confirmation Modal */}
                    <ConfirmationModal
                      triggerText={instructor.isBlocked ? "Unblock" : "Block"}
                      title={`${
                        instructor.isBlocked ? "Unblock" : "Block"
                      } Instructor`}
                      description={`Are you sure you want to ${
                        instructor.isBlocked ? "unblock" : "block"
                      } ${
                        instructor.firstName ||
                        instructor.name ||
                        "this instructor"
                      }?`}
                      status={instructor.isBlocked ? "unblock" : "block"}
                      onConfirm={() =>
                        handleBlockUnblockToggle(instructor.email)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InstructorsPage;

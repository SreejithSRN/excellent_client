import { useState, useEffect, useCallback } from "react";
import { Search} from "lucide-react";
import ConfirmationModal from "../../components/admin/ConfirmationModal";
import { useAppDispatch } from "../../hooks/accessHook";
import { getStudents } from "../../redux/store/actions/auth/getStudents";
import { SignupFormData } from "../../types";
import { blockUnblock } from "../../redux/store/actions/auth/blockUnblock";
import ProfileModal from "../../components/admin/UserDisplayModal";
import { useSocketContext } from "../../utilities/socket/SocketContext";

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [data, setData] = useState<SignupFormData[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    studentsPerPage: 3,
  });
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [selectedUser, setSelectedUser] = useState<SignupFormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {socket}=useSocketContext()

  const dispatch = useAppDispatch();
  const openModal = (user: SignupFormData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPagination((prev) => ({
        ...prev,
        currentPage: 1, // Reset to first page on new search
      }));
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce
  
    return () => clearTimeout(timer);
  }, [searchTerm]);
  

  const fetchStudents = useCallback(async () => {
    setStatus((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      const { currentPage, studentsPerPage } = pagination;
      const response = await dispatch(
        getStudents({
          page: currentPage,
          limit: studentsPerPage,
          search: searchTerm,
        })
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
  }, [
    dispatch,
    pagination.currentPage,
    pagination.studentsPerPage,
    debouncedSearchTerm
  ]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const { currentPage, studentsPerPage, totalCount } = pagination;
  const totalPages = Math.ceil(totalCount / studentsPerPage);

  const handleBlockUnblock = async (email: string) => {
    if (!email) {
      console.error("Email not found for the selected student.");
      return;
    }
    try {
      const response = await dispatch(blockUnblock(email));
      
      if (response.payload?.success) {
        setData((prevData) =>
          prevData.map((student) =>
            student.email === email
              ? { ...student, isBlocked: !student.isBlocked }
              : student
          )
        );


        // Find the user's _id based on the email
      const user = data.find((student) => student.email === email);
      console.log("arada neee moNNEEEEEEEE",user)

      // Emit socket event with _id and status
      if (socket && user?._id) {
        socket.emit("block-user", {
          userId: user._id,
          // isBlocked: !user.isBlocked, // updated status
        });
      }
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
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <p className="text-gray-600">Manage your students and their progress</p>
      </div>

      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchStudents(); // trigger search on Enter
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
       
      </div>

      <div className="overflow-x-auto mt-4">
        {status.error && (
          <p className="text-red-500 text-center mb-4">{status.error}</p>
        )}
        {status.loading ? (
          <div className="text-center text-gray-500 mt-6">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">
            No Students Found!
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
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-400">
              {data.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-400 font-bold flex items-center justify-center overflow-hidden">
                        {student.profile?.avatar ? (
                          typeof student.profile.avatar === "string" ? (
                            <img
                              src={student.profile.avatar}
                              alt={`${
                                student.firstName || student.name
                              }'s profile`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={URL.createObjectURL(student.profile.avatar)}
                              alt={`${
                                student.firstName || student.name
                              }'s profile`}
                              className="w-full h-full object-cover"
                            />
                          )
                        ) : (
                          <span>
                            {student.name?.charAt(0).toUpperCase() || "N"}
                          </span>
                        )}
                      </div>

                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.firstName
                            ? `${student.firstName} ${student.lastName || ""}`
                            : student.name || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => openModal(student)}
                      className="text-blue-500 hover:underline"
                    >
                      View Profile
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`w-20 inline-flex justify-center text-xs leading-5 font-semibold rounded-full px-2 ${
                        student.isBlocked
                          ? "bg-red-200 text-red-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {student.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <ConfirmationModal
                      triggerText={student.isBlocked ? "Unblock" : "Block"}
                      title={`${
                        student.isBlocked ? "Unblock" : "Block"
                      } Student`}
                      description={`Are you sure you want to ${
                        student.isBlocked ? "unblock" : "block"
                      } student ${student.email}?`}
                      status={student.isBlocked ? "unblock" : "block"}
                      onConfirm={() =>
                        student._id && handleBlockUnblock(student.email)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userData={selectedUser}
      />

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

export default StudentsPage;


























// import { useState, useEffect, useCallback } from "react";
// import { Search} from "lucide-react";
// import ConfirmationModal from "../../components/admin/ConfirmationModal";
// import { useAppDispatch } from "../../hooks/accessHook";
// import { getStudents } from "../../redux/store/actions/auth/getStudents";
// import { SignupFormData } from "../../types";
// import { blockUnblock } from "../../redux/store/actions/auth/blockUnblock";
// import ProfileModal from "../../components/admin/UserDisplayModal";

// const StudentsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//   const [data, setData] = useState<SignupFormData[]>([]);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalCount: 0,
//     studentsPerPage: 3,
//   });
//   const [status, setStatus] = useState({ loading: true, error: "" });
//   const [selectedUser, setSelectedUser] = useState<SignupFormData | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const dispatch = useAppDispatch();
//   const openModal = (user: SignupFormData) => {
//     setSelectedUser(user);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedUser(null);
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setPagination((prev) => ({
//         ...prev,
//         currentPage: 1, // Reset to first page on new search
//       }));
//       setDebouncedSearchTerm(searchTerm);
//     }, 500); // 500ms debounce
  
//     return () => clearTimeout(timer);
//   }, [searchTerm]);
  

//   const fetchStudents = useCallback(async () => {
//     setStatus((prev) => ({ ...prev, loading: true, error: "" }));

//     try {
//       const { currentPage, studentsPerPage } = pagination;
//       const response = await dispatch(
//         getStudents({
//           page: currentPage,
//           limit: studentsPerPage,
//           search: searchTerm,
//         })
//       );

//       if (response && response.payload) {
//         setData(response.payload.data || []);
//         setPagination((prev) => ({
//           ...prev,
//           totalCount: response.payload.totalCount || 0,
//         }));
//       } else {
//         throw new Error("Invalid response data");
//       }
//     } catch (error) {
//       setStatus((prev) => ({
//         ...prev,
//         error:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred",
//       }));
//     } finally {
//       setStatus((prev) => ({ ...prev, loading: false }));
//     }
//   }, [
//     dispatch,
//     pagination.currentPage,
//     pagination.studentsPerPage,
//     debouncedSearchTerm
//   ]);

//   useEffect(() => {
//     fetchStudents();
//   }, [fetchStudents]);

//   const { currentPage, studentsPerPage, totalCount } = pagination;
//   const totalPages = Math.ceil(totalCount / studentsPerPage);

//   const handleBlockUnblock = async (email: string) => {
//     if (!email) {
//       console.error("Email not found for the selected student.");
//       return;
//     }
//     try {
//       const response = await dispatch(blockUnblock(email));
//       if (response.payload?.success) {
//         setData((prevData) =>
//           prevData.map((student) =>
//             student.email === email
//               ? { ...student, isBlocked: !student.isBlocked }
//               : student
//           )
//         );
//       } else {
//         console.error("Failed to update student status");
//       }
//     } catch (error) {
//       console.error("Error during block/unblock operation:", error);
//     }
//   };

//   const handlePageChange = (page: number) => {
//     if (page > 0 && page <= totalPages) {
//       setPagination((prev) => ({ ...prev, currentPage: page }));
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-4">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Students</h1>
//         <p className="text-gray-600">Manage your students and their progress</p>
//       </div>

//       <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//         <div className="relative w-64">
//           <input
//             type="text"
//             placeholder="Email"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") fetchStudents(); // trigger search on Enter
//             }}
//             className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//           />

//           <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//         </div>
       
//       </div>

//       <div className="overflow-x-auto mt-4">
//         {status.error && (
//           <p className="text-red-500 text-center mb-4">{status.error}</p>
//         )}
//         {status.loading ? (
//           <div className="text-center text-gray-500 mt-6">Loading...</div>
//         ) : data.length === 0 ? (
//           <div className="text-center text-gray-500 mt-6">
//             No Students Found!
//           </div>
//         ) : (
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Profile
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-400">
//               {data.map((student) => (
//                 <tr key={student._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="w-8 h-8 rounded-full bg-blue-400 font-bold flex items-center justify-center overflow-hidden">
//                         {student.profile?.avatar ? (
//                           typeof student.profile.avatar === "string" ? (
//                             <img
//                               src={student.profile.avatar}
//                               alt={`${
//                                 student.firstName || student.name
//                               }'s profile`}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <img
//                               src={URL.createObjectURL(student.profile.avatar)}
//                               alt={`${
//                                 student.firstName || student.name
//                               }'s profile`}
//                               className="w-full h-full object-cover"
//                             />
//                           )
//                         ) : (
//                           <span>
//                             {student.name?.charAt(0).toUpperCase() || "N"}
//                           </span>
//                         )}
//                       </div>

//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {student.firstName
//                             ? `${student.firstName} ${student.lastName || ""}`
//                             : student.name || "N/A"}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {student.email || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <button
//                       onClick={() => openModal(student)}
//                       className="text-blue-500 hover:underline"
//                     >
//                       View Profile
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`w-20 inline-flex justify-center text-xs leading-5 font-semibold rounded-full px-2 ${
//                         student.isBlocked
//                           ? "bg-red-200 text-red-800"
//                           : "bg-green-200 text-green-800"
//                       }`}
//                     >
//                       {student.isBlocked ? "Blocked" : "Active"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                     <ConfirmationModal
//                       triggerText={student.isBlocked ? "Unblock" : "Block"}
//                       title={`${
//                         student.isBlocked ? "Unblock" : "Block"
//                       } Student`}
//                       description={`Are you sure you want to ${
//                         student.isBlocked ? "unblock" : "block"
//                       } student ${student.email}?`}
//                       status={student.isBlocked ? "unblock" : "block"}
//                       onConfirm={() =>
//                         student._id && handleBlockUnblock(student.email)
//                       }
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <ProfileModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         userData={selectedUser}
//       />

//       <div className="flex justify-between items-center mt-6">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <div className="text-sm text-gray-500">
//           Page {currentPage} of {totalPages}
//         </div>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentsPage;
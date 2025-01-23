// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { RootState } from "../../redux";

// const StudentsProfile: React.FC = () => {
//   const { data } = useSelector((state: RootState) => state.user);

//   function capitalizeFirstLetter(string: string) {
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//   }

//   function capitalizeLastName(lastName:any) {
//     return lastName
//       .split(" ")
//       .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl space-y-8">
//         {/* Profile Header */}
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src="https://www.pngkey.com/png/detail/72-729716_user-avatar-png-graphic-free-download-icon.png"
//               alt="Avatar"
//               className="w-40 h-40 mx-auto rounded-full border-4 border-indigo-500 transition-transform duration-300 hover:scale-105"
//             />
//             <button className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300">
//               Edit Image
//             </button>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-800 mt-4">
//             {data?.firstName  && data?.lastName 
//               ? 
//                `${capitalizeFirstLetter(
//                   data?.firstName ?? "hi"
//                 )} ${capitalizeLastName(data?.lastName ?? "")}`: `${capitalizeLastName(data?.name)}`}
//           </h1>

//           <h2 className="text-lg text-gray-500">Student</h2>
//         </div>

//         {/* Contact Information Card */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
//             Contact Information
//           </h3>
//           <div className="space-y-2">
//             <p className="text-md text-gray-600">
//               <strong>Username:</strong>
//               {data?.name}
//             </p>
//             <p className="text-md text-gray-600">
//               <strong>Email:</strong> {data?.email}
//             </p>
//             <p className="text-md text-gray-600">
//               <strong>Phone:</strong>{" "}
//               {data?.contact?.phone ? data?.contact?.phone : "N/A"}
//             </p>
//             <p className="text-md text-gray-600">
//               <strong>Address:</strong>{" "}
//               {data?.contact?.address ? data?.contact?.address : "N/A"}
//             </p>
//           </div>
//         </div>

//         {/* Additional Information Card */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
//             Additional Information
//           </h3>
//           <div className="space-y-2">
//             <p className="text-md text-gray-600">
//               <strong>First Name:</strong>{" "}
//               {data?.firstName ? data?.firstName : "N/A"}
//             </p>
//             <p className="text-md text-gray-600">
//               <strong>Last Name:</strong>{" "}
//               {data?.lastName ? data?.lastName : "N/A"}
//             </p>
//             <p className="text-md text-gray-600">
//               <strong>Gender:</strong>{" "}
//               {data?.profile?.gender ? data?.profile?.gender : "N/A"}
//             </p>
//             <p className="text-md text-gray-600">
//               <strong>Date of Birth:</strong>{" "}
//               {data?.profile?.dateOfBirth
//                 ? new Date(data.profile.dateOfBirth).toLocaleDateString(
//                     "en-GB",
//                     {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     }
//                   )
//                 : "N/A"}
//             </p>
//           </div>
//         </div>

//         {/* Edit Profile Button */}
//         <div className="text-center">
//           <Link to="edit">
//             <button className="bg-indigo-600 text-white text-lg px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300">
//               Edit Profile
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentsProfile;

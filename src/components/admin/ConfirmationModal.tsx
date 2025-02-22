// // import React from "react";

// // interface ConfirmationModalProps {
// //   triggerText: string;
// //   title: string;
// //   description: string;
// //   onConfirm: () => void;
// // }

// // const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
// //   triggerText,
// //   title,
// //   description,
// //   onConfirm,
// // }) => {
// //   const [isOpen, setIsOpen] = React.useState(false);

// //   const openModal = () => setIsOpen(true);
// //   const closeModal = () => setIsOpen(false);

// //   const handleConfirm = () => {
// //     onConfirm();
// //     closeModal();
// //   };

// //   return (
// //     <>
// //       <button
// //         onClick={openModal}
// //         className="px-3 py-1 text-sm border bg-orange-600 border-gray-300 rounded hover:bg-gray-50"
// //       >
// //         {triggerText}
// //       </button>

// //       {isOpen && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
// //           <div className="bg-white rounded-lg shadow-lg w-96 p-6">
// //             <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
// //             <p
// //               className="text-gray-600 mt-2 break-words"
// //               style={{
// //                 wordWrap: "break-word",
// //                 wordBreak: "break-word",
// //                 whiteSpace: "normal",
// //               }}
// //             >
// //               {description}
// //             </p>
// //             <div className="mt-4 flex justify-end space-x-4">
// //               <button
// //                 onClick={closeModal}
// //                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 onClick={handleConfirm}
// //                 className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
// //               >
// //                 Confirm
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default ConfirmationModal;

// import React from "react";

// interface ConfirmationModalProps {
//   triggerText: string;
//   title: string;
//   description: string;
//   onConfirm: () => void;
//   status: "block" | "unblock"|"approve"|"reject"; // Added status prop
// }

// const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
//   triggerText,
//   title,
//   description,
//   onConfirm,
//   status,
// }) => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const handleConfirm = () => {
//     onConfirm();
//     closeModal();
//   };

//   return (
//     <>
//       <button
//         onClick={openModal}
//         className={`px-3 py-1 text-sm border border-gray-300 rounded  ${
//           status === "block"  ? "bg-red-600 text-white" : "bg-green-600 text-white"
//         }`}
//       >
//         {triggerText}
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-96 p-6">
//             <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
//             <p
//               className="text-gray-600 mt-2 break-words"
//               style={{
//                 wordWrap: "break-word",
//                 wordBreak: "break-word",
//                 whiteSpace: "normal",
//               }}
//             >
//               {description}
//             </p>
//             <div className="mt-4 flex justify-end space-x-4">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleConfirm}
//                 className={`px-4 py-2 rounded-full ${
//                   status === "block"
//                     ? "bg-red-600 text-white hover:bg-red-700"
//                     : "bg-green-600 text-white hover:bg-green-700"
//                 }`}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ConfirmationModal;

import React from "react";

interface ConfirmationModalProps {
  triggerText: string;
  title: string;
  description: string;
  onConfirm: () => void;
  status: "block" | "unblock" | "approve" | "reject"; // Status prop extended
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  triggerText,
  title,
  description,
  onConfirm,
  status,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  // 🔥 Handle color dynamically based on status
  const buttonColor =
    status === "block" || status === "reject"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-green-600 text-white hover:bg-green-700";

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className={`px-3 py-1 text-sm border border-gray-300 rounded ${buttonColor}`}
      >
        {triggerText}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p
              className="text-gray-600 mt-2 break-words"
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {description}
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
              >
                Cancel
              </button>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-full ${buttonColor}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;


import React, { useState } from "react";

interface ConfirmationModalProps {
  triggerText: string;
  title: string;
  description: string;
  onConfirm: (reason?: string) => void;
  status: "block" | "unblock" | "approve" | "reject"; // Status prop extended
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  triggerText,
  title,
  description,
  onConfirm,
  status,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    onConfirm(status === "reject" ? reason : undefined);
    closeModal();
    setReason("");
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

            {/* Textarea only when status is "reject" */}
            {status === "reject" && (
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="w-full mt-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                rows={4}
              />
            )}

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
                disabled={status === "reject" && !reason.trim()}
                className={`px-4 py-2 rounded-full ${
                  status === "reject" && !reason.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : buttonColor
                }`}
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
